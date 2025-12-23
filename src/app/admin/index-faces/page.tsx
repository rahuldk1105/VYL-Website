'use client'

import React, { useState } from 'react'
import * as faceapi from 'face-api.js'
import { loadModels, getAllFaceDescriptors } from '@/utils/faceRecognition'
import { supabase } from '@/lib/supabaseClient'

export default function AdminIndexPage() {
    const [imageUrl, setImageUrl] = useState('')
    const [status, setStatus] = useState('Idle')
    const [modelLoaded, setModelLoaded] = useState(false)

    React.useEffect(() => {
        loadModels().then(() => setModelLoaded(true))
    }, [])

    const handleIndex = async () => {
        if (!imageUrl) return
        setStatus('Processing...')

        try {
            // 1. Detect faces
            const detections = await getAllFaceDescriptors(imageUrl)
            if (detections.length === 0) {
                setStatus('No faces found in image.')
                return
            }

            // 2. Upload to Supabase
            const rows = detections.map(d => ({
                image_url: imageUrl,
                descriptor: Array.from(d.descriptor), // Convert Float32Array to number[]
                event_id: 'general' // Default
            }))

            const { error } = await supabase.from('face_embeddings').insert(rows)

            if (error) throw error
            setStatus(`Success! Indexed ${detections.length} faces.`)
        } catch (e) {
            console.error(e)
            setStatus('Error: ' + (e as Error).message)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-24">
            <h1 className="text-3xl font-bold mb-8">Admin Face Indexer</h1>

            <div className="max-w-xl space-y-4">
                <div className={`p-4 rounded ${modelLoaded ? 'bg-green-900' : 'bg-red-900'}`}>
                    Model Status: {modelLoaded ? "Loaded" : "Loading..."}
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter Cloudinary Image URL"
                        className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                    <button
                        onClick={handleIndex}
                        disabled={!modelLoaded || !imageUrl}
                        className="bg-gold text-black px-6 py-2 rounded font-bold disabled:opacity-50"
                    >
                        Index
                    </button>
                </div>

                {imageUrl && (
                    <div className="h-64 relative bg-gray-900 rounded overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imageUrl} alt="Preview" className="h-full w-full object-contain" />
                    </div>
                )}

                <div className="p-4 bg-gray-800 rounded">
                    Status: {status}
                </div>
            </div>
        </div>
    )
}
