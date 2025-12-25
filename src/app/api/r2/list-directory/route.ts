import { NextResponse } from 'next/server'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { r2, isR2Configured } from '@/lib/r2Client'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    if (!isR2Configured()) {
      return NextResponse.json({ error: 'R2 is not configured' }, { status: 503 })
    }

    const { directory } = await request.json()

    if (!directory || typeof directory !== 'string') {
      return NextResponse.json({ error: 'Directory path required' }, { status: 400 })
    }

    const bucketName = process.env.R2_BUCKET_NAME
    if (!bucketName) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // List all objects in the directory
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: directory.endsWith('/') ? directory : `${directory}/`,
      MaxKeys: 1000, // Adjust as needed
    })

    const response = await r2.send(command)

    // Get all image keys from the directory
    const keys = (response.Contents || [])
      .filter(item => {
        const key = item.Key || ''
        // Only include actual image files, not the directory itself
        return key !== directory &&
               key !== `${directory}/` &&
               /\.(jpg|jpeg|png|gif|webp)$/i.test(key)
      })
      .map(item => item.Key as string)

    return NextResponse.json({ keys })

  } catch (err) {
    console.error('R2 List Error:', err)
    return NextResponse.json({ error: 'Failed to list directory' }, { status: 500 })
  }
}
