import { NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/r2Client'

export const runtime = 'edge'

export async function POST(request: Request) {
    try {
        const { keys } = await request.json()

        if (!keys || !Array.isArray(keys)) {
            return NextResponse.json({ error: 'Missing keys array' }, { status: 400 })
        }

        // Generate signed URLs for all requested keys
        const signedUrls = await Promise.all(keys.map(async (key) => {
            const url = await getSignedUrl(r2, new GetObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
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
