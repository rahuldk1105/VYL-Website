'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Loader2 } from 'lucide-react'
import { loadModels, getAllFaceDescriptors } from '@/utils/faceRecognition'
import { supabase } from '@/lib/supabaseClient'
import { resizeImage } from '@/utils/imageProcessing'

interface SimpleEvent {
    id: string
    title: string
    slug: string
}

export default function AdminIndexPage() {
    const [status, setStatus] = useState('Idle')
    const [logs, setLogs] = useState<string[]>([])
    const [modelLoaded, setModelLoaded] = useState(false)
    const [events, setEvents] = useState<SimpleEvent[]>([])
    const [selectedEvent, setSelectedEvent] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Load AI Models
    useEffect(() => {
        loadModels().then(() => {
            setModelLoaded(true)
            addLog("AI Models Loaded")
        }).catch((err) => {
            addLog(`Error loading models: ${err.message}`)
        })
    }, [])

    // Fetch Events for Dropdown
    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('id, title, slug')
                .order('start_date', { ascending: false })

            if (error) {
                addLog(`Error fetching events: ${error.message}`)
                return
            }

            if (data) {
                const mappedEvents = data.map((e: any) => ({
                    id: e.id,
                    title: e.title,
                    slug: e.slug
                }))
                setEvents(mappedEvents)
                if (mappedEvents.length > 0) {
                    setSelectedEvent(mappedEvents[0].slug)
                }
            }
        }
        fetchEvents()
    }, [])

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100))
    }

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        if (!selectedEvent) {
            addLog('Error: Please select an event first')
            return
        }

        setIsProcessing(true)
        const files = Array.from(e.target.files)

        // Validate file count
        if (files.length > 500) {
            addLog('Error: Maximum 500 files can be uploaded at once')
            setIsProcessing(false)
            return
        }

        addLog(`Selected ${files.length} files. Starting upload...`)

        let successCount = 0
        let errorCount = 0

        for (const [index, file] of files.entries()) {
            setStatus(`Processing ${index + 1}/${files.length}: ${file.name}`)

            try {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    addLog(`Skipping ${file.name}: Not an image file`)
                    errorCount++
                    continue
                }

                // Validate file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    addLog(`Skipping ${file.name}: File too large (max 10MB)`)
                    errorCount++
                    continue
                }

                // 1. Resize Image
                const resizedBlob = await resizeImage(file, 1920)

                // 2. Get Presigned URL
                const signRes = await fetch('/api/r2/sign-upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
                if (!signedUrl) throw new Error('No signed URL returned')

                // 3. Upload to R2
                const uploadRes = await fetch(signedUrl, {
                    method: 'PUT',
                    body: resizedBlob,
                    headers: { 'Content-Type': 'image/jpeg' }
                })

                if (!uploadRes.ok) {
                    throw new Error(`Upload failed: ${uploadRes.status}`)
                }

                addLog(`✓ Uploaded: ${file.name}`)

                // 4. Detect Faces
                const blobUrl = URL.createObjectURL(resizedBlob)
                const detections = await getAllFaceDescriptors(blobUrl)
                URL.revokeObjectURL(blobUrl)

                addLog(`  Found ${detections.length} face(s)`)

                // 5. Save to Database
                const { error: dbError } = await supabase
                    .from('face_embeddings')
                    .insert({
                        r2_object_key: r2Key,
                        event_id: selectedEvent,
                        image_url: signedUrl.split('?')[0],
                        face_count: detections.length
                    })

                if (dbError) {
                    throw new Error(`Database error: ${dbError.message}`)
                }

                successCount++

            } catch (err) {
                console.error(err)
                addLog(`✗ Error on ${file.name}: ${(err as Error).message}`)
                errorCount++
            }
        }

        setStatus('Idle')
        setIsProcessing(false)
        addLog(`\n=== Complete ===\nSuccess: ${successCount}, Errors: ${errorCount}`)

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin"
                        className="p-2 bg-gray-900 border border-white/10 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">Face Indexing</h1>
                        <p className="text-gray-400 text-sm mt-1">Upload and index photos with face recognition</p>
                    </div>
                </div>

                {/* Model Status */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${modelLoaded ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                        <span className="text-sm font-medium">
                            {modelLoaded ? 'AI Models Ready' : 'Loading AI Models...'}
                        </span>
                    </div>
                </div>

                {/* Upload Form */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Upload Images</h2>

                    {/* Event Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Select Event
                        </label>
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                            disabled={isProcessing}
                        >
                            {events.length === 0 && <option>Loading events...</option>}
                            {events.map(event => (
                                <option key={event.id} value={event.slug}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* File Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Select Images (Max 500 files, 10MB each)
                        </label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleBulkUpload}
                            disabled={!modelLoaded || isProcessing || !selectedEvent}
                            className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-3 file:px-6
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gold file:text-black
                                hover:file:bg-yellow-400
                                file:cursor-pointer
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Status */}
                    {isProcessing && (
                        <div className="mt-4 flex items-center gap-3 text-gold">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm font-medium">{status}</span>
                        </div>
                    )}
                </div>

                {/* Logs */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Activity Log</h2>
                    <div className="bg-black border border-white/5 rounded-lg p-4 h-96 overflow-y-auto font-mono text-xs">
                        {logs.length === 0 ? (
                            <p className="text-gray-500">No activity yet. Upload images to start.</p>
                        ) : (
                            logs.map((log, idx) => (
                                <div key={idx} className="text-gray-300 mb-1">{log}</div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
