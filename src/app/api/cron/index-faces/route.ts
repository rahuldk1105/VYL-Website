import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const startTime = Date.now()
    console.log('🕐 Cron job started: Face indexing')

    try {
        // Dynamic imports to avoid build issues
        const { S3Client, ListObjectsV2Command, GetObjectCommand } = await import('@aws-sdk/client-s3')
        const { createClient } = await import('@supabase/supabase-js')

        const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
        const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
        const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
        const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
            return NextResponse.json({ error: 'R2 config missing' }, { status: 500 })
        }
        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            return NextResponse.json({ error: 'Supabase config missing' }, { status: 500 })
        }

        const s3Client = new S3Client({
            region: 'auto',
            endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
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

        // Dynamic import face detection libs
        const faceapi = await import('@vladmandic/face-api')
        const canvas = await import('canvas')

        const { Canvas, Image, ImageData } = canvas
        // @ts-ignore
        faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

        // Load models
        const modelPath = process.cwd() + '/public/models'
        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath),
            faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath),
            faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath),
        ])
        console.log('✅ Models loaded')

        let totalProcessed = 0
        let totalFaces = 0

        for (const event of events) {
            if (!event.r2_directory) continue
            console.log(`📂 Processing: ${event.slug}`)

            const prefix = event.r2_directory.endsWith('/') ? event.r2_directory : `${event.r2_directory}/`
            const listResult = await s3Client.send(new ListObjectsV2Command({
                Bucket: R2_BUCKET_NAME,
                Prefix: prefix,
                MaxKeys: 1000,
            }))

            const imageKeys = (listResult.Contents || [])
                .map(obj => obj.Key)
                .filter(key => key && /\.(jpg|jpeg|png|webp)$/i.test(key)) as string[]

            const { data: existing } = await supabase
                .from('face_embeddings')
                .select('r2_object_key')
                .eq('event_id', event.slug)

            const indexedSet = new Set(existing?.map(e => e.r2_object_key) || [])
            const newImages = imageKeys.filter(key => !indexedSet.has(key))
            console.log(`🆕 ${newImages.length} new images`)

            const batch = newImages.slice(0, 10)

            for (const key of batch) {
                try {
                    const response = await s3Client.send(new GetObjectCommand({
                        Bucket: R2_BUCKET_NAME,
                        Key: key,
                    }))
                    const buffer = await response.Body?.transformToByteArray()
                    if (!buffer) continue

                    const img = await canvas.loadImage(Buffer.from(buffer))
                    const detections = await faceapi
                        .detectAllFaces(img as unknown as HTMLImageElement)
                        .withFaceLandmarks()
                        .withFaceDescriptors()

                    if (detections.length > 0) {
                        const records = detections.map((d, i) => ({
                            r2_object_key: key,
                            event_id: event.slug,
                            face_embedding: Array.from(d.descriptor),
                            face_index: i,
                        }))

                        await supabase
                            .from('face_embeddings')
                            .upsert(records, { onConflict: 'r2_object_key,face_index' })

                        totalFaces += detections.length
                    }
                    totalProcessed++
                } catch (err) {
                    console.error(`Error: ${key}`, err)
                }

                if (Date.now() - startTime > 270000) {
                    console.log('⏰ Time limit')
                    break
                }
            }

            if (Date.now() - startTime > 270000) break
        }

        const duration = Math.round((Date.now() - startTime) / 1000)
        console.log(`✅ Done: ${totalProcessed} images, ${totalFaces} faces, ${duration}s`)

        return NextResponse.json({
            success: true,
            processed: totalProcessed,
            facesFound: totalFaces,
            duration: `${duration}s`,
        })

    } catch (error) {
        console.error('❌ Error:', error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
