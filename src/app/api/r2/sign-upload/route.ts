import { NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2Client'

export const runtime = 'edge' // Optional: Use edge if compatible, or default to node

export async function POST(request: Request) {
    try {
        // Validate content type
        const contentTypeHeader = request.headers.get('content-type')
        if (contentTypeHeader !== 'application/json') {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
        }

        const { filename, contentType } = await request.json()

        // Validate required parameters
        if (!filename || !contentType) {
            return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 })
        }

        // Validate filename
        if (typeof filename !== 'string' || filename.length === 0 || filename.length > 200) {
            return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
        }

        // Validate content type
        const allowedContentTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (!allowedContentTypes.includes(contentType)) {
            return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 })
        }

        // Sanitize filename to prevent path traversal
        const sanitizedFilename = filename.replace(/[^a-zA-Z0-9\.\-_]/g, '_')
        const key = `uploads/${Date.now()}-${sanitizedFilename}`

        // Validate R2 bucket name
        const bucketName = process.env.R2_BUCKET_NAME
        if (!bucketName) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        const signedUrl = await getSignedUrl(r2, new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
        }), { expiresIn: 3600 })

        return NextResponse.json({ url: signedUrl, key })

    } catch (err) {
        console.error('R2 Sign Error:', err)
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 })
    }
}
