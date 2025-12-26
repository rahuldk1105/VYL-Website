import { NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { r2, isR2Configured } from '@/lib/r2Client'
import sharp from 'sharp'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    if (!isR2Configured()) {
      return NextResponse.json({ error: 'R2 is not configured' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Image key required' }, { status: 400 })
    }

    const bucketName = process.env.R2_BUCKET_NAME
    if (!bucketName) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Fetch image from R2
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })

    const response = await r2.send(command)

    if (!response.Body) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    // @ts-ignore - Body is a readable stream
    for await (const chunk of response.Body) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    // Resize image to thumbnail (400px width, auto height)
    // Auto-rotate based on EXIF orientation to preserve original orientation
    const thumbnail = await sharp(buffer)
      .rotate() // Auto-rotate based on EXIF orientation
      .resize(400, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toBuffer()

    // Return thumbnail with proper headers
    return new NextResponse(new Uint8Array(thumbnail), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })

  } catch (err) {
    console.error('Thumbnail generation error:', err)
    return NextResponse.json({ error: 'Failed to generate thumbnail' }, { status: 500 })
  }
}
