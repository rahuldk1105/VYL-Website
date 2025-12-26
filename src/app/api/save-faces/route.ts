import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
    try {
        const { faces } = await request.json()

        if (!faces || !Array.isArray(faces) || faces.length === 0) {
            return NextResponse.json({ error: 'Faces array is required' }, { status: 400 })
        }

        console.log(`💾 Saving ${faces.length} face embeddings to database`)

        // Prepare records for insertion
        const records = faces.map((face: {
            r2_object_key: string
            event_id: string
            face_embedding: number[]
            face_index?: number
        }) => ({
            r2_object_key: face.r2_object_key,
            event_id: face.event_id,
            face_embedding: face.face_embedding,
            face_index: face.face_index || 0,
            created_at: new Date().toISOString(),
        }))

        // Insert into database (upsert to handle duplicates)
        const { data, error } = await supabase
            .from('face_embeddings')
            .upsert(records, {
                onConflict: 'r2_object_key,face_index',
                ignoreDuplicates: true,
            })
            .select()

        if (error) {
            console.error('❌ Database error:', error)
            return NextResponse.json(
                { error: 'Failed to save face embeddings', details: error.message },
                { status: 500 }
            )
        }

        console.log(`✅ Saved ${records.length} face embeddings`)

        return NextResponse.json({
            success: true,
            saved: records.length,
        })

    } catch (error) {
        console.error('❌ Error saving faces:', error)
        return NextResponse.json(
            { error: 'Failed to save face embeddings', details: String(error) },
            { status: 500 }
        )
    }
}
