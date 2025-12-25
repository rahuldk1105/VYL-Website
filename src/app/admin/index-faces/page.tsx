'use client'

import React, { useState, useRef } from 'react'
import { loadModels, getAllFaceDescriptors } from '@/utils/faceRecognition'
import { supabase } from '@/lib/supabaseClient'
import { mockEvents } from '@/lib/mockData'
import { resizeImage } from '@/utils/imageProcessing'

export default function AdminIndexPage() {
    const [status, setStatus] = useState('Idle')
    const [logs, setLogs] = useState<string[]>([])
    const [modelLoaded, setModelLoaded] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]?.slug?.current || 'general')
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        loadModels().then(() => {
            setModelLoaded(true)
            addLog("AI Models Loaded")
        })
    }, [])

    const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 10))

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        setIsProcessing(true)
        const files = Array.from(e.target.files)
        
        // Validate file count
        if (files.length > 50) {
            addLog('Error: Maximum 50 files can be uploaded at once')
            setIsProcessing(false)
            return
        }

        addLog(`Selected ${files.length} files. Starting R2 Pipeline...`)

        let successCount = 0

        for (const [index, file] of files.entries()) {
            setStatus(`Processing ${index + 1}/${files.length}: ${file.name}`)

            try {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    addLog(`Skipping ${file.name}: Not an image file`)
                    continue
                }

                // Validate file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    addLog(`Skipping ${file.name}: File too large (max 10MB)`)
                    continue
                }

                // 1. Resize Image (Client-side optimization)
                const resizedBlob = await resizeImage(file, 1920) // Max 1920px width

                // 2. Get Presigned URL
                const signRes = await fetch('/api/r2/sign-upload', {
                    method: 'POST',
                    body: JSON.stringify({
                        filename: file.name,
                        contentType: 'image/jpeg'
                    })
                })
                
                if (!signRes.ok) {
                    const errorData = await signRes.json()
                    throw new Error(errorData.error || 'Failed to get signed URL')
                }
                
                const { url: signedUrl, key: r2Key } = await signRes.json()
                if (!signedUrl) throw new Error('Resulted in failed signature')

                // 3. Upload to R2 (Direct PUT)
                const uploadRes = await fetch(signedUrl, {
                    method: 'PUT',
                    body: resizedBlob,
                    headers: { 'Content-Type': 'image/jpeg' }
                })
                
                if (!uploadRes.ok) {
                    throw new Error('Failed to upload to R2')
                }
                
                addLog(`Uploaded to R2: ${r2Key}`)

                // 4. Detect Faces (using local Blob to save bandwidth)
                const blobUrl = URL.createObjectURL(resizedBlob)
                const detections = await getAllFaceDescriptors(blobUrl)
                URL.revokeObjectURL(blobUrl)

                // 5. Save to Supabase (New Schema)
                // Step A: Insert Image Record
                const { data: imgData, error: imgError } = await supabase
                    .from('images')
                    .insert({
                        r2_object_key: r2Key,
                        event_id: selectedEvent,
                        image_type: 'original'
                    })
                    .select()
                    .single()

                if (imgError) throw imgError
                const imageId = imgData.id

                // Step B: Insert Faces (if any)
                if (detections.length > 0) {
                    for (const d of detections) {
                        const { data: playerData, error: playerError } = await supabase
                            .from('players')
                            .insert({
                                face_embedding: Array.from(d.descriptor)
                            })
                            .select()
                            .single()

                        if (playerError) throw playerError

                        await supabase
                            .from('player_images')
                            .insert({
                                player_id: playerData.id,
                                image_id: imageId
                            })
                    }
                    addLog(`Indexed ${detections.length} faces`)
                } else {
                    addLog('No faces detected, image saved.')
                }

                successCount++

            } catch (err) {
                console.error(err)
                addLog(`Error on ${file.name}: ${(err as Error).message}`)
            }
        }

        setStatus(`Finished! Successfully processed ${successCount}/${files.length}`)
        setIsProcessing(false)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <div className="min-h-screen bg-black text-white p-24">
            <h1 className="text-3xl font-bold mb-8">Admin Bulk Uploader (R2 Version)</h1>

            <div className="max-w-xl space-y-6">
                <div className={`p-4 rounded ${modelLoaded ? 'bg-green-900/50' : 'bg-red-900/50'} border border-white/10`}>
                    Status: {modelLoaded ? "AI Ready" : "Loading Models..."}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Select Tournament Tag</label>
                    <select
                        className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-white"
                        value={selectedEvent}
                        onChange={e => setSelectedEvent(e.target.value)}
                    >
                        <option value="general">General (No Event)</option>
                        {mockEvents.map(evt => (
                            <option key={evt._id} value={evt.slug.current}>{evt.title}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Upload Photos (Select Multiple)</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleBulkUpload}
                        disabled={isProcessing || !modelLoaded}
                        className="w-full bg-gray-800 p-4 rounded border-2 border-dashed border-gray-700 hover:border-gold transition-colors cursor-pointer"
                    />
                </div>

                {isProcessing && (
                    <div className="p-4 bg-blue-900/20 text-blue-200 rounded border border-blue-500/30 animate-pulse">
                        {status}
                    </div>
                )}

                <div className="bg-gray-900 p-4 rounded h-64 overflow-y-auto font-mono text-xs text-gray-400 border border-gray-800">
                    {logs.map((log, i) => (
                        <div key={i} className="border-b border-gray-800 py-1">{log}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
