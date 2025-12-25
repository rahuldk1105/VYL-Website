import { NextResponse } from 'next/server'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { r2, isR2Configured } from '@/lib/r2Client'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    if (!isR2Configured()) {
      console.error('R2 not configured')
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

    console.log('Attempting to list directory:', directory)
    console.log('Bucket name:', bucketName)
    console.log('Account ID:', process.env.R2_ACCOUNT_ID?.substring(0, 8) + '...')

    // List all objects in the directory
    const prefix = directory.endsWith('/') ? directory : `${directory}/`
    console.log('Using prefix:', prefix)

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: 1000,
    })

    const response = await r2.send(command)
    console.log('R2 response received:', response.KeyCount, 'objects found')

    // Get all image keys from the directory
    const keys = (response.Contents || [])
      .filter(item => {
        const key = item.Key || ''
        // Only include actual image files, not the directory itself
        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(key)
        const notDirectory = key !== directory && key !== `${directory}/`
        return isImage && notDirectory
      })
      .map(item => item.Key as string)

    console.log('Filtered images found:', keys.length)
    if (keys.length > 0) {
      console.log('First few images:', keys.slice(0, 3))
    }

    return NextResponse.json({ keys, total: keys.length })

  } catch (err) {
    console.error('R2 List Error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    const errorName = err instanceof Error ? err.name : 'UnknownError'
    console.error('Error name:', errorName)
    console.error('Error message:', errorMessage)

    return NextResponse.json({
      error: 'Failed to list directory',
      details: errorMessage,
      errorType: errorName
    }, { status: 500 })
  }
}
