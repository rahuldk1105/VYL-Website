import { NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2Client'

export const runtime = 'edge'

export async function POST(request: Request) {
    try {
        // Validate content type
        const contentType = request.headers.get('content-type')
        if (contentType !== 'application/json') {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
        }

        const { keys } = await request.json()

        // Validate keys parameter
        if (!keys || !Array.isArray(keys)) {
            return NextResponse.json({ error: 'Missing keys array' }, { status: 400 })
        }

        // Validate each key
        if (keys.length === 0) {
            return NextResponse.json({ error: 'Keys array cannot be empty' }, { status: 400 })
        }

        if (keys.length > 50) {
            return NextResponse.json({ error: 'Too many keys requested' }, { status: 400 })
        }

        // Validate key format (basic check)
        const invalidKeys = keys.filter(key => 
            typeof key !== 'string' || 
            key.length === 0 || 
            key.length > 500 ||
            key.includes('..') ||
            key.startsWith('/')
        )

        if (invalidKeys.length > 0) {
            return NextResponse.json({ error: 'Invalid key format' }, { status: 400 })
        }

        // Validate R2 bucket name
        const bucketName = process.env.R2_BUCKET_NAME
        if (!bucketName) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        // Generate signed URLs for all requested keys
        const signedUrls = await Promise.all(keys.map(async (key) => {
            const url = await getSignedUrl(r2, new GetObjectCommand({
                Bucket: bucketName,
                Key: key,
            }), { expiresIn: 3600 }) // Valid for 1 hour
            return { key, url }
        }))

        return NextResponse.json({ urls: signedUrls })

    } catch (err) {
        console.error('R2 Read Sign Error:', err)
        return NextResponse.json({ error: 'Failed to sign URLs' }, { status: 500 })
    }
}
