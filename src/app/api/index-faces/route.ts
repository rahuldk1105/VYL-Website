import { NextRequest, NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!

export async function POST(request: NextRequest) {
    try {
        const { directory, eventSlug } = await request.json()

        if (!directory) {
            return NextResponse.json({ error: 'Directory is required' }, { status: 400 })
        }

        console.log(`🔍 Starting face indexing for directory: ${directory}`)

        // 1. List all objects in the R2 directory
        const listCommand = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: directory.endsWith('/') ? directory : `${directory}/`,
        })

        const listResult = await s3Client.send(listCommand)
        const allKeys = listResult.Contents?.map(obj => obj.Key).filter(Boolean) as string[] || []

        // Filter for image files only
        const imageKeys = allKeys.filter(key =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(key)
        )

        console.log(`📸 Found ${imageKeys.length} images in R2`)

        // 2. Check which images are already indexed
        const { data: existingIndexes } = await supabase
            .from('face_embeddings')
            .select('r2_object_key')
            .in('r2_object_key', imageKeys)

        const indexedKeys = new Set(existingIndexes?.map(e => e.r2_object_key) || [])
        const newImages = imageKeys.filter(key => !indexedKeys.has(key))

        console.log(`🆕 ${newImages.length} new images to index`)

        if (newImages.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'All images already indexed',
                total: imageKeys.length,
                indexed: 0,
                skipped: imageKeys.length,
            })
        }

        // 3. For each new image, we need to detect faces
        // Since face detection requires browser APIs (face-api.js), 
        // we'll mark them for client-side processing
        const pendingImages = newImages.map(key => ({
            key,
            url: `/api/r2/thumbnail?key=${encodeURIComponent(key)}`,
            eventSlug: eventSlug || directory.split('/')[0],
        }))

        return NextResponse.json({
            success: true,
            message: `Found ${newImages.length} new images to index`,
            total: imageKeys.length,
            alreadyIndexed: indexedKeys.size,
            pendingImages,
        })

    } catch (error) {
        console.error('❌ Error in face indexing:', error)
        return NextResponse.json(
            { error: 'Failed to process face indexing', details: String(error) },
            { status: 500 }
        )
    }
}
