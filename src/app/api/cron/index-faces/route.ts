import { NextRequest, NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'
import * as faceapi from '@vladmandic/face-api'
import * as canvas from 'canvas'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes max

// Initialize face-api with node-canvas
const { Canvas, Image, ImageData } = canvas
// @ts-ignore
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

export async function GET(request: NextRequest) {
    // Verify cron secret for security (optional but recommended)
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const startTime = Date.now()
    console.log('🕐 Cron job started: Face indexing')

    try {
        const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
        const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
        const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
        const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            return NextResponse.json({ error: 'Missing configuration' }, { status: 500 })
        }

        const s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: R2_ACCESS_KEY_ID,
                secretAccessKey: R2_SECRET_ACCESS_KEY,
            },
        })

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

        // Get all events with r2_directory
        const { data: events } = await supabase
            .from('events')
            .select('slug, r2_directory')
            .not('r2_directory', 'is', null)

        if (!events || events.length === 0) {
            return NextResponse.json({ message: 'No events to process' })
        }

        // Load models
        await loadModels()
        console.log('✅ Models loaded')

        let totalProcessed = 0
        let totalFaces = 0

        // Process each event
        for (const event of events) {
            if (!event.r2_directory) continue

            console.log(`📂 Processing: ${event.slug}`)

            // List all images
            const prefix = event.r2_directory.endsWith('/') ? event.r2_directory : `${event.r2_directory}/`
            const listCommand = new ListObjectsV2Command({
                Bucket: R2_BUCKET_NAME,
                Prefix: prefix,
                MaxKeys: 1000,
            })

            const listResult = await s3Client.send(listCommand)
            const imageKeys = (listResult.Contents || [])
                .map(obj => obj.Key)
                .filter(key => key && /\.(jpg|jpeg|png|webp)$/i.test(key)) as string[]

            // Get already indexed
            const { data: existingIndexes } = await supabase
                .from('face_embeddings')
                .select('r2_object_key')
                .eq('event_id', event.slug)

            const indexedKeys = new Set(existingIndexes?.map(e => e.r2_object_key) || [])
            const newImages = imageKeys.filter(key => !indexedKeys.has(key))

            console.log(`🆕 ${newImages.length} new images for ${event.slug}`)

            // Process up to 20 new images per event
            const batch = newImages.slice(0, 20)

            for (const key of batch) {
                try {
                    // Download image
                    const getCommand = new GetObjectCommand({
                        Bucket: R2_BUCKET_NAME,
                        Key: key,
                    })

                    const response = await s3Client.send(getCommand)
                    const imageBuffer = await response.Body?.transformToByteArray()

                    if (!imageBuffer) continue

                    const img = await canvas.loadImage(Buffer.from(imageBuffer))
                    const detections = await faceapi
                        .detectAllFaces(img as unknown as HTMLImageElement)
                        .withFaceLandmarks()
                        .withFaceDescriptors()

                    if (detections.length > 0) {
                        const records = detections.map((detection, faceIndex) => ({
                            r2_object_key: key,
                            event_id: event.slug,
                            face_embedding: Array.from(detection.descriptor),
                            face_index: faceIndex,
                        }))

                        await supabase
                            .from('face_embeddings')
                            .upsert(records, { onConflict: 'r2_object_key,face_index' })

                        totalFaces += detections.length
                    }

                    totalProcessed++
                } catch (err) {
                    console.error(`Error processing ${key}:`, err)
                }

                // Check time limit (4.5 minutes to be safe)
                if (Date.now() - startTime > 270000) {
                    console.log('⏰ Time limit approaching, stopping')
                    break
                }
            }

            // Check time limit between events too
            if (Date.now() - startTime > 270000) break
        }

        const duration = Math.round((Date.now() - startTime) / 1000)
        console.log(`✅ Cron complete: ${totalProcessed} images, ${totalFaces} faces, ${duration}s`)

        return NextResponse.json({
            success: true,
            processed: totalProcessed,
            facesFound: totalFaces,
            duration: `${duration}s`,
        })

    } catch (error) {
        console.error('❌ Cron error:', error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
