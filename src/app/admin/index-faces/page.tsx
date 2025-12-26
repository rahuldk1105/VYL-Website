'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, CheckCircle2, AlertCircle, Camera, Loader2, FolderOpen, Database, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Event {
    slug: string
    title: string
    r2_directory: string | null
}

interface IndexStats {
    totalImages: number
    totalIndexed: number
    processed: number
    facesFound: number
    remaining: number
}

export default function FaceIndexingPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [selectedEvent, setSelectedEvent] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [stats, setStats] = useState<IndexStats | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [logs, setLogs] = useState<string[]>([])
    const [indexedCounts, setIndexedCounts] = useState<Record<string, number>>({})

    // Load events and indexed counts on mount
    useEffect(() => {
        fetchEvents()
        fetchIndexedCounts()
    }, [])

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

    const fetchIndexedCounts = async () => {
        const { data } = await supabase
            .from('face_embeddings')
            .select('event_id')

        if (data) {
            const counts: Record<string, number> = {}
            data.forEach(item => {
                counts[item.event_id] = (counts[item.event_id] || 0) + 1
            })
            setIndexedCounts(counts)
        }
    }

    const addLog = (message: string) => {
        setLogs(prev => [...prev.slice(-100), `[${new Date().toLocaleTimeString()}] ${message}`])
    }

    const startIndexing = async () => {
        if (!selectedEvent) return

        const event = events.find(e => e.slug === selectedEvent)
        if (!event?.r2_directory) {
            setError('No R2 directory configured for this event')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            addLog(`🚀 Starting server-side indexing for: ${event.title}`)
            addLog(`📂 R2 Directory: ${event.r2_directory}`)

            const response = await fetch('/api/index-faces-server', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    directory: event.r2_directory,
                    eventSlug: event.slug,
                    batchSize: 10, // Process 10 images per request
                }),
            })

            const data = await response.json()

            // Show API logs
            if (data.logs) {
                data.logs.forEach((log: string) => addLog(`[Server] ${log}`))
            }

            if (!response.ok) {
                addLog(`❌ Error: ${data.error}`)
                setError(data.error || 'Failed to process images')
            } else {
                setStats({
                    totalImages: data.totalImages || 0,
                    totalIndexed: data.totalIndexed || 0,
                    processed: data.processed || 0,
                    facesFound: data.facesFound || 0,
                    remaining: data.remaining || 0,
                })

                if (data.remaining > 0) {
                    addLog(`⏳ ${data.remaining} images remaining. Click "Continue Indexing" to process more.`)
                } else {
                    addLog(`✅ All images indexed!`)
                }

                // Refresh counts
                fetchIndexedCounts()
            }

        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err)
            addLog(`❌ Error: ${errorMsg}`)
            setError(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }

    const totalIndexed = Object.values(indexedCounts).reduce((a, b) => a + b, 0)

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
                        Server-side face detection for the "Find My Photos" feature
                    </p>
                </div>

                {/* Global Stats */}
                <div className="bg-gradient-to-r from-gold/10 to-yellow-500/10 border border-gold/20 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="text-gold" />
                        <h2 className="text-lg font-semibold">Total Indexed Faces</h2>
                    </div>
                    <div className="text-5xl font-bold text-gold">{totalIndexed.toLocaleString()}</div>
                    <p className="text-gray-400 mt-2">across all tournaments</p>
                </div>

                {/* Per-Event Stats */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Indexed by Tournament</h3>
                    <div className="space-y-3">
                        {events.map(event => (
                            <div key={event.slug} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                                <span className="text-white">{event.title}</span>
                                <span className="text-gold font-bold">
                                    {(indexedCounts[event.slug] || 0).toLocaleString()} faces
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indexing Controls */}
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Tournament to Index
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
                                    {event.title} ({indexedCounts[event.slug] || 0} indexed)
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={startIndexing}
                            disabled={isLoading || !selectedEvent}
                            className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Zap className="w-5 h-5" />
                            )}
                            {isLoading ? 'Processing...' : stats?.remaining ? 'Continue Indexing' : 'Start Indexing'}
                        </button>
                    </div>
                </div>

                {/* Progress Stats */}
                {stats && (
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4">Last Batch Results</h3>

                        {/* Progress Bar */}
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-gradient-to-r from-gold to-yellow-400"
                                initial={{ width: 0 }}
                                animate={{
                                    width: stats.totalImages > 0
                                        ? `${((stats.totalImages - stats.remaining) / stats.totalImages) * 100}%`
                                        : '100%'
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold">{stats.totalImages}</p>
                                <p className="text-sm text-gray-400">Total in R2</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold text-green-400">{stats.totalIndexed}</p>
                                <p className="text-sm text-gray-400">Indexed</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold text-blue-400">{stats.facesFound}</p>
                                <p className="text-sm text-gray-400">Faces Found</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-3">
                                <p className="text-2xl font-bold text-yellow-400">{stats.remaining}</p>
                                <p className="text-sm text-gray-400">Remaining</p>
                            </div>
                        </div>
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
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FolderOpen className="w-5 h-5" />
                            Activity Log
                        </h3>
                        <button
                            onClick={() => setLogs([])}
                            className="text-sm text-gray-400 hover:text-white"
                        >
                            Clear
                        </button>
                    </div>
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
                                                        log.includes('🚀') ? 'text-purple-400' :
                                                            'text-gray-300'
                                        }`}
                                >
                                    {log}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">💡 How it works</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Processes 10 images per batch (server-side)</li>
                        <li>• Click "Continue Indexing" to process more batches</li>
                        <li>• Each image is downloaded from R2 and analyzed for faces</li>
                        <li>• Face embeddings are stored in Supabase for search</li>
                        <li>• Users can then use "Find My Photos" to search by selfie</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
