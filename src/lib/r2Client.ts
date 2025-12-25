import { S3Client } from '@aws-sdk/client-s3'

// Helper function to check if R2 is properly configured
export function isR2Configured(): boolean {
    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
    const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
    
    return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET_NAME)
}

// Create R2 client lazily - don't throw during module evaluation
function createR2Client(): S3Client {
    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
    
    // Use placeholder values during build time to avoid errors
    // Actual validation happens at request time in the API routes
    return new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID || 'placeholder'}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID || 'placeholder',
            secretAccessKey: R2_SECRET_ACCESS_KEY || 'placeholder',
        },
    })
}

export const r2 = createR2Client()
