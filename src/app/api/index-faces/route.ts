import { NextRequest, NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
    const logs: string[] = []
    const log = (msg: string) => {
        console.log(msg)
        logs.push(msg)
    }

    try {
        log('🚀 Starting face indexing API...')

        // Check environment variables
        const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
        const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
        const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
        const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

        log(`📋 R2_ACCOUNT_ID: ${R2_ACCOUNT_ID ? '✅ Set' : '❌ Missing'}`)
        log(`📋 R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID ? '✅ Set' : '❌ Missing'}`)
        log(`📋 R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY ? '✅ Set' : '❌ Missing'}`)
        log(`📋 R2_BUCKET_NAME: ${R2_BUCKET_NAME ? `✅ ${R2_BUCKET_NAME}` : '❌ Missing'}`)
        log(`📋 SUPABASE_URL: ${SUPABASE_URL ? '✅ Set' : '❌ Missing'}`)
        log(`📋 SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_KEY ? '✅ Set' : '❌ Missing'}`)

        if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
            return NextResponse.json({
                error: 'R2 configuration missing',
                logs,
                missingVars: {
                    R2_ACCOUNT_ID: !R2_ACCOUNT_ID,
                    R2_ACCESS_KEY_ID: !R2_ACCESS_KEY_ID,
                    R2_SECRET_ACCESS_KEY: !R2_SECRET_ACCESS_KEY,
                    R2_BUCKET_NAME: !R2_BUCKET_NAME,
                }
            }, { status: 500 })
        }

        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            return NextResponse.json({
                error: 'Supabase configuration missing',
                logs,
            }, { status: 500 })
        }

        const { directory, eventSlug } = await request.json()
        log(`📂 Directory requested: ${directory}`)
        log(`🏷️ Event slug: ${eventSlug || 'auto-detect'}`)

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

        // List objects in R2
        const prefix = directory.endsWith('/') ? directory : `${directory}/`
        log(`🔍 Listing objects with prefix: ${prefix}`)

        const listCommand = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: prefix,
            MaxKeys: 1000,
        })

        const listResult = await s3Client.send(listCommand)
        log(`📦 R2 returned ${listResult.KeyCount || 0} objects`)

        const allKeys = listResult.Contents?.map(obj => obj.Key).filter(Boolean) as string[] || []

        // Filter for image files only
        const imageKeys = allKeys.filter(key =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(key)
        )
        log(`📸 Found ${imageKeys.length} image files`)

        if (imageKeys.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No images found in directory',
                logs,
                total: 0,
                indexed: 0,
            })
        }

        // Check which images are already indexed
        log(`🔍 Checking database for existing indexes...`)
        const { data: existingIndexes, error: dbError } = await supabase
            .from('face_embeddings')
            .select('r2_object_key')
            .in('r2_object_key', imageKeys.slice(0, 100)) // Check first 100

        if (dbError) {
            log(`❌ Database error: ${dbError.message}`)
            return NextResponse.json({
                error: 'Database query failed',
                details: dbError.message,
                logs,
            }, { status: 500 })
        }

        const indexedKeys = new Set(existingIndexes?.map(e => e.r2_object_key) || [])
        const newImages = imageKeys.filter(key => !indexedKeys.has(key))
        log(`🆕 ${newImages.length} new images to index (${indexedKeys.size} already indexed)`)

        if (newImages.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'All images already indexed',
                logs,
                total: imageKeys.length,
                indexed: 0,
                skipped: imageKeys.length,
            })
        }

        // Return pending images for client-side processing
        const pendingImages = newImages.slice(0, 50).map(key => ({ // Limit to 50 at a time
            key,
            eventSlug: eventSlug || directory.split('/')[0],
        }))

        log(`✅ Returning ${pendingImages.length} images for client-side face detection`)

        return NextResponse.json({
            success: true,
            message: `Found ${newImages.length} new images to index`,
            logs,
            total: imageKeys.length,
            alreadyIndexed: indexedKeys.size,
            pendingImages,
        })

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        log(`❌ Error: ${errorMsg}`)
        console.error('Full error:', error)

        return NextResponse.json({
            error: 'Failed to process face indexing',
            details: errorMsg,
            logs,
        }, { status: 500 })
    }
}
