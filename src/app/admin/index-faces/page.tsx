'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, CheckCircle2, AlertCircle, Camera, Loader2, FolderOpen } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { loadModels, getAllFaceDescriptors } from '@/utils/faceRecognition'
import * as faceapi from 'face-api.js'

interface Event {
    slug: string
    title: string
    r2_directory: string | null
}

interface PendingImage {
    key: string
    url: string
    eventSlug: string
}

interface IndexingStatus {
    total: number
    processed: number
    indexed: number
    failed: number
    currentImage: string
}

export default function FaceIndexingPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [selectedEvent, setSelectedEvent] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isModelLoaded, setIsModelLoaded] = useState(false)
    const [status, setStatus] = useState<IndexingStatus | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [logs, setLogs] = useState<string[]>([])

    // Load events on mount
    useEffect(() => {
        fetchEvents()
        initModels()
    }, [])

    const initModels = async () => {
        try {
            addLog('Loading AI face detection models...')
            await loadModels()
            setIsModelLoaded(true)
            addLog('✅ AI models loaded successfully')
        } catch (err) {
            addLog('❌ Failed to load AI models')
            setError('Failed to load face detection models')
        }
    }

    const fetchEvents = async () => {
        const { data } = await supabase
            .from('events')
            .select('slug, title, r2_directory')
            .not('r2_directory', 'is', null)
            .order('title')

        if (data) {
            setEvents(data)
            if (data.length > 0) {
                setSelectedEvent(data[0].slug)
            }
        }
    }

    const addLog = (message: string) => {
        setLogs(prev => [...prev.slice(-50), `[${new Date().toLocaleTimeString()}] ${message}`])
    }

    const startIndexing = async () => {
        if (!selectedEvent || !isModelLoaded) return

        const event = events.find(e => e.slug === selectedEvent)
        if (!event?.r2_directory) {
            setError('No R2 directory configured for this event')
            return
        }

        setIsLoading(true)
        setError(null)
        setStatus({ total: 0, processed: 0, indexed: 0, failed: 0, currentImage: '' })

        try {
            // 1. Get list of images to index
            addLog(`📂 Scanning directory: ${event.r2_directory}`)

            const listResponse = await fetch('/api/index-faces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    directory: event.r2_directory,
                    eventSlug: event.slug,
                }),
            })

            const responseData = await listResponse.json()

            // Show API logs if available
            if (responseData.logs) {
                responseData.logs.forEach((log: string) => addLog(`[API] ${log}`))
            }

            if (!listResponse.ok) {
                addLog(`❌ API Error: ${responseData.error || 'Unknown error'}`)
                if (responseData.details) addLog(`   Details: ${responseData.details}`)
                throw new Error(responseData.error || 'Failed to list images')
            }

            const { pendingImages, total, alreadyIndexed } = responseData

            if (!pendingImages || pendingImages.length === 0) {
                addLog(`✅ All ${total || 0} images already indexed!`)
                setIsLoading(false)
                return
            }

            addLog(`📸 Found ${pendingImages.length} new images to index (${alreadyIndexed} already done)`)
            setStatus(prev => prev ? { ...prev, total: pendingImages.length } : null)

            // 2. Process each image
            const facesToSave: Array<{
                r2_object_key: string
                event_id: string
                face_embedding: number[]
                face_index: number
            }> = []

            for (let i = 0; i < pendingImages.length; i++) {
                const image = pendingImages[i] as PendingImage
                setStatus(prev => prev ? {
                    ...prev,
                    processed: i,
                    currentImage: image.key.split('/').pop() || image.key,
                } : null)

                try {
                    addLog(`🔍 Processing: ${image.key.split('/').pop()}`)

                    // Get signed URL for full image
                    const signResponse = await fetch('/api/r2/sign-read', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ keys: [image.key] }),
                    })

                    if (!signResponse.ok) {
                        throw new Error('Failed to get signed URL')
                    }

                    const { urls } = await signResponse.json()
                    const imageUrl = urls[0]?.url

                    if (!imageUrl) {
                        addLog(`⚠️ No URL for ${image.key}`)
                        continue
                    }

                    // Detect faces
                    const detections = await getAllFaceDescriptors(imageUrl)

                    if (detections && detections.length > 0) {
                        addLog(`👤 Found ${detections.length} face(s) in ${image.key.split('/').pop()}`)

                        detections.forEach((detection, faceIndex) => {
                            facesToSave.push({
                                r2_object_key: image.key,
                                event_id: image.eventSlug,
                                face_embedding: Array.from(detection.descriptor),
                                face_index: faceIndex,
                            })
                        })

                        setStatus(prev => prev ? { ...prev, indexed: prev.indexed + detections.length } : null)
                    } else {
                        addLog(`📷 No faces detected in ${image.key.split('/').pop()}`)
                    }

                } catch (err) {
                    addLog(`❌ Error processing ${image.key}: ${err}`)
                    setStatus(prev => prev ? { ...prev, failed: prev.failed + 1 } : null)
                }

                // Save faces in batches of 10
                if (facesToSave.length >= 10) {
                    await saveFaces(facesToSave.splice(0, 10))
                }
            }

            // Save remaining faces
            if (facesToSave.length > 0) {
                await saveFaces(facesToSave)
            }

            setStatus(prev => prev ? { ...prev, processed: pendingImages.length } : null)
            addLog(`✅ Indexing complete!`)

        } catch (err) {
            addLog(`❌ Error: ${err}`)
            setError(String(err))
        } finally {
            setIsLoading(false)
        }
    }

    const saveFaces = async (faces: Array<{
        r2_object_key: string
        event_id: string
        face_embedding: number[]
        face_index: number
    }>) => {
        try {
            const response = await fetch('/api/save-faces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ faces }),
            })

            if (response.ok) {
                addLog(`💾 Saved ${faces.length} face embeddings to database`)
            } else {
                addLog(`⚠️ Failed to save some face embeddings`)
            }
        } catch (err) {
            addLog(`❌ Error saving faces: ${err}`)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <Camera className="text-gold" />
                        Face Indexing
                    </h1>
                    <p className="text-gray-400">
                        Scan photos in R2 and index faces for the "Find My Photos" feature
                    </p>
                </div>

                {/* Event Selection */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Tournament
                    </label>
                    <div className="flex gap-4">
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                            disabled={isLoading}
                        >
                            {events.map(event => (
                                <option key={event.slug} value={event.slug}>
                                    {event.title} ({event.r2_directory})
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={startIndexing}
                            disabled={isLoading || !isModelLoaded || !selectedEvent}
                            className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <RefreshCw className="w-5 h-5" />
                            )}
                            {isLoading ? 'Indexing...' : 'Start Indexing'}
                        </button>
                    </div>

                    {!isModelLoaded && (
                        <div className="mt-4 flex items-center gap-2 text-yellow-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading AI models...
                        </div>
                    )}
                </div>

                {/* Progress */}
                {status && (
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4">Progress</h3>

                        {/* Progress Bar */}
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-gradient-to-r from-gold to-yellow-400"
                                initial={{ width: 0 }}
                                animate={{ width: status.total > 0 ? `${(status.processed / status.total) * 100}%` : '0%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold">{status.total}</p>
                                <p className="text-sm text-gray-400">Total</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold text-blue-400">{status.processed}</p>
                                <p className="text-sm text-gray-400">Processed</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold text-green-400">{status.indexed}</p>
                                <p className="text-sm text-gray-400">Faces Found</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold text-red-400">{status.failed}</p>
                                <p className="text-sm text-gray-400">Failed</p>
                            </div>
                        </div>

                        {status.currentImage && (
                            <p className="mt-4 text-sm text-gray-400">
                                Currently processing: <span className="text-white">{status.currentImage}</span>
                            </p>
                        )}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Logs */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FolderOpen className="w-5 h-5" />
                        Activity Log
                    </h3>
                    <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                        {logs.length === 0 ? (
                            <p className="text-gray-500">No activity yet. Select a tournament and start indexing.</p>
                        ) : (
                            logs.map((log, idx) => (
                                <div
                                    key={idx}
                                    className={`py-1 ${log.includes('✅') ? 'text-green-400' :
                                        log.includes('❌') ? 'text-red-400' :
                                            log.includes('⚠️') ? 'text-yellow-400' :
                                                log.includes('👤') ? 'text-blue-400' :
                                                    'text-gray-300'
                                        }`}
                                >
                                    {log}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
