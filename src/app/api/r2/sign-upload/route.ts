import { NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2Client'

export const runtime = 'edge' // Optional: Use edge if compatible, or default to node

export async function POST(request: Request) {
    try {
        const { filename, contentType } = await request.json()

        if (!filename || !contentType) {
            return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 })
        }

        const key = `uploads/${Date.now()}-${filename}`

        const signedUrl = await getSignedUrl(r2, new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        }), { expiresIn: 3600 })

        return NextResponse.json({ url: signedUrl, key })

    } catch (err) {
        console.error('R2 Sign Error:', err)
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 })
    }
}
