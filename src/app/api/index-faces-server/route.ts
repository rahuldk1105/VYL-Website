import { NextRequest, NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'
import * as faceapi from '@vladmandic/face-api'
import * as canvas from 'canvas'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes max for Vercel

// Initialize face-api with node-canvas
const { Canvas, Image, ImageData } = canvas
// @ts-ignore - face-api expects browser APIs
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

let modelsLoaded = false

async function loadModels() {
    if (modelsLoaded) return

    const modelPath = process.cwd() + '/public/models'
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath),
        faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath),
        faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath),
    ])
    modelsLoaded = true
}

export async function POST(request: NextRequest) {
    const logs: string[] = []
    const log = (msg: string) => {
        console.log(msg)
        logs.push(msg)
    }

    try {
        log('🚀 Starting server-side face indexing...')

        const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
        const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
        const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
        const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
            return NextResponse.json({ error: 'R2 configuration missing', logs }, { status: 500 })
        }

        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            return NextResponse.json({ error: 'Supabase configuration missing', logs }, { status: 500 })
        }

        const { directory, eventSlug, batchSize = 10 } = await request.json()
        log(`📂 Directory: ${directory}, Event: ${eventSlug}, Batch: ${batchSize}`)

        if (!directory) {
            return NextResponse.json({ error: 'Directory is required', logs }, { status: 400 })
        }

        // Initialize clients
        const s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: R2_ACCESS_KEY_ID,
                secretAccessKey: R2_SECRET_ACCESS_KEY,
            },
        })

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

        // Load face detection models
        log('📦 Loading face detection models...')
        await loadModels()
        log('✅ Models loaded')

        // List objects in R2
        const prefix = directory.endsWith('/') ? directory : `${directory}/`
        const listCommand = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: prefix,
            MaxKeys: 1000,
        })

        const listResult = await s3Client.send(listCommand)
        const allKeys = listResult.Contents?.map(obj => obj.Key).filter(Boolean) as string[] || []
        const imageKeys = allKeys.filter(key => /\.(jpg|jpeg|png|webp)$/i.test(key))
        log(`📸 Found ${imageKeys.length} images in R2`)

        // Check which images are already indexed
        const { data: existingIndexes } = await supabase
            .from('face_embeddings')
            .select('r2_object_key')

        const indexedKeys = new Set(existingIndexes?.map(e => e.r2_object_key) || [])
        const newImages = imageKeys.filter(key => !indexedKeys.has(key))
        log(`🆕 ${newImages.length} new images to process`)

        if (newImages.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'All images already indexed',
                logs,
                totalImages: imageKeys.length,
                totalIndexed: indexedKeys.size,
                processed: 0,
            })
        }

        // Process images in batches
        const batch = newImages.slice(0, batchSize)
        let processed = 0
        let facesFound = 0

        for (const key of batch) {
            try {
                log(`🔍 Processing: ${key.split('/').pop()}`)

                // Download image from R2
                const getCommand = new GetObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: key,
                })

                const response = await s3Client.send(getCommand)
                const imageBuffer = await response.Body?.transformToByteArray()

                if (!imageBuffer) {
                    log(`⚠️ Empty image: ${key}`)
                    continue
                }

                // Load image with canvas
                const img = await canvas.loadImage(Buffer.from(imageBuffer))

                // Detect faces
                const detections = await faceapi
                    .detectAllFaces(img as unknown as HTMLImageElement)
                    .withFaceLandmarks()
                    .withFaceDescriptors()

                if (detections.length > 0) {
                    log(`👤 Found ${detections.length} face(s) in ${key.split('/').pop()}`)

                    // Save to database
                    const records = detections.map((detection, faceIndex) => ({
                        r2_object_key: key,
                        event_id: eventSlug || directory.split('/')[0],
                        face_embedding: Array.from(detection.descriptor),
                        face_index: faceIndex,
                    }))

                    const { error } = await supabase
                        .from('face_embeddings')
                        .upsert(records, { onConflict: 'r2_object_key,face_index' })

                    if (error) {
                        log(`❌ DB Error: ${error.message}`)
                    } else {
                        facesFound += detections.length
                    }
                } else {
                    log(`📷 No faces in ${key.split('/').pop()}`)
                }

                processed++
            } catch (err) {
                log(`❌ Error: ${key} - ${err}`)
            }
        }

        log(`✅ Batch complete: ${processed} images, ${facesFound} faces indexed`)

        return NextResponse.json({
            success: true,
            logs,
            totalImages: imageKeys.length,
            totalIndexed: indexedKeys.size + facesFound,
            processed,
            facesFound,
            remaining: newImages.length - processed,
        })

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        log(`❌ Error: ${errorMsg}`)
        return NextResponse.json({ error: errorMsg, logs }, { status: 500 })
    }
}
