import { createClient } from '@supabase/supabase-js'

// Use a dummy URL for build time if env is missing to prevent crash
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.com'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Warn in development if keys are missing
if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
