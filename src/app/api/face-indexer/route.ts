// Polyfill TextEncoder/TextDecoder for @vladmandic/face-api
import util from 'util'

// Ensure global TextEncoder/TextDecoder are available
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = util.TextEncoder as any
}
if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = util.TextDecoder as any
}

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function POST(request: NextRequest) {
    const logs: string[] = []
    const log = (msg: string) => { console.log(msg); logs.push(msg) }

    try {
        log('🚀 Face Indexer v3 - Server Side Processing')

        const { S3Client, ListObjectsV2Command, GetObjectCommand } = await import('@aws-sdk/client-s3')
        const { createClient } = await import('@supabase/supabase-js')

        const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
        const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
        const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
        const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

        log(`📋 R2: ${R2_ACCOUNT_ID ? '✅' : '❌'} | Supabase: ${SUPABASE_SERVICE_KEY ? '✅' : '❌'}`)

        if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
            return NextResponse.json({ error: 'R2 config missing', logs }, { status: 500 })
        }
        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            return NextResponse.json({ error: 'Supabase config missing', logs }, { status: 500 })
        }

        const { directory, eventSlug, batchSize = 5 } = await request.json()
        log(`📂 Dir: ${directory} | Event: ${eventSlug}`)

        if (!directory) {
            return NextResponse.json({ error: 'Directory required', logs }, { status: 400 })
        }

        const s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
        })

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

        log('📦 Loading AI models...')

        // Dynamic import face detection libs
        const faceapi = await import('@vladmandic/face-api')
        const canvas = await import('canvas')

        const { Canvas, Image, ImageData } = canvas
        // @ts-ignore
        faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

        const modelPath = process.cwd() + '/public/models'
        log('📂 Model path: ' + modelPath)

        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath),
            faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath),
            faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath),
        ])
        log('✅ Models ready')

        const prefix = directory.endsWith('/') ? directory : `${directory}/`
        const listResult = await s3Client.send(new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: prefix,
            MaxKeys: 1000,
        }))

        const allKeys = listResult.Contents?.map(obj => obj.Key).filter(Boolean) as string[] || []
        const imageKeys = allKeys.filter(key => /\.(jpg|jpeg|png|webp)$/i.test(key))
        log(`📸 ${imageKeys.length} images in R2`)

        const { data: existing } = await supabase.from('face_embeddings').select('r2_object_key')
        const indexedSet = new Set(existing?.map(e => e.r2_object_key) || [])
        const newImages = imageKeys.filter(key => !indexedSet.has(key))
        log(`🆕 ${newImages.length} to process (${indexedSet.size} done)`)

        if (newImages.length === 0) {
            return NextResponse.json({
                success: true, logs,
                totalImages: imageKeys.length,
                totalIndexed: indexedSet.size,
                processed: 0, facesFound: 0, remaining: 0,
            })
        }

        const batch = newImages.slice(0, batchSize)
        let processed = 0, facesFound = 0

        for (const key of batch) {
            try {
                log(`🔍 ${key.split('/').pop()}`)

                const response = await s3Client.send(new GetObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: key,
                }))
                const buffer = await response.Body?.transformToByteArray()
                if (!buffer) { log(`⚠️ Empty: ${key}`); continue }

                const img = await canvas.loadImage(Buffer.from(buffer))
                const detections = await faceapi
                    .detectAllFaces(img as unknown as HTMLImageElement)
                    .withFaceLandmarks()
                    .withFaceDescriptors()

                if (detections.length > 0) {
                    log(`👤 ${detections.length} face(s)`)
                    const records = detections.map((d, i) => ({
                        r2_object_key: key,
                        event_id: eventSlug || directory.split('/')[0],
                        face_embedding: Array.from(d.descriptor),
                        face_index: i,
                    }))

                    const { error } = await supabase
                        .from('face_embeddings')
                        .upsert(records, { onConflict: 'r2_object_key,face_index' })

                    if (error) log(`❌ DB: ${error.message}`)
                    else facesFound += detections.length
                }
                processed++
            } catch (err) {
                log(`❌ ${key}: ${err}`)
            }
        }

        log(`✅ Done: ${processed} images, ${facesFound} faces`)

        return NextResponse.json({
            success: true, logs,
            totalImages: imageKeys.length,
            totalIndexed: indexedSet.size + facesFound,
            processed, facesFound,
            remaining: newImages.length - processed,
        })

    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        log(`❌ ${msg}`)
        return NextResponse.json({ error: msg, logs }, { status: 500 })
    }
}
