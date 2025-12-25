'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { resizeImage } from '@/utils/imageProcessing'

interface Event {
  id: string
  title: string
  slug: string
}

interface UploadLog {
  filename: string
  status: 'uploading' | 'success' | 'error'
  message?: string
}

export default function UploadPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEventId, setSelectedEventId] = useState('')
  const [uploading, setUploading] = useState(false)
  const [logs, setLogs] = useState<UploadLog[]>([])
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch events on mount
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('id, title, slug')
      .order('start_date', { ascending: false })

    if (!error && data) {
      setEvents(data)
      if (data.length > 0) {
        setSelectedEventId(data[0].id)
      }
    }
  }

  const addLog = (log: UploadLog) => {
    setLogs((prev) => [log, ...prev])
  }

  const updateLog = (filename: string, updates: Partial<UploadLog>) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.filename === filename ? { ...log, ...updates } : log
      )
    )
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (!selectedEventId) {
      alert('Please select an event first')
      return
    }

    setUploading(true)
    setLogs([])
    setProgress({ current: 0, total: files.length })

    const fileArray = Array.from(files)

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]
      setProgress({ current: i + 1, total: files.length })

      try {
        // Validate file
        if (!file.type.startsWith('image/')) {
          addLog({
            filename: file.name,
            status: 'error',
            message: 'Not an image file',
          })
          continue
        }

        if (file.size > 10 * 1024 * 1024) {
          addLog({
            filename: file.name,
            status: 'error',
            message: 'File too large (max 10MB)',
          })
          continue
        }

        addLog({
          filename: file.name,
          status: 'uploading',
          message: 'Processing...',
        })

        // 1. Resize image
        const resizedBlob = await resizeImage(file, 1920)

        // 2. Get signed upload URL from R2
        const signResponse = await fetch('/api/r2/sign-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            contentType: 'image/jpeg',
          }),
        })

        if (!signResponse.ok) {
          throw new Error('Failed to get upload URL')
        }

        const { url: signedUrl, key: r2Key } = await signResponse.json()

        // 3. Upload to R2
        const uploadResponse = await fetch(signedUrl, {
          method: 'PUT',
          body: resizedBlob,
          headers: { 'Content-Type': 'image/jpeg' },
        })

        if (!uploadResponse.ok) {
          throw new Error('Upload to R2 failed')
        }

        // 4. Save metadata to Supabase
        const { error: dbError } = await supabase.from('photos').insert({
          event_id: selectedEventId,
          r2_key: r2Key,
          filename: file.name,
          uploaded_at: new Date().toISOString(),
        })

        if (dbError) {
          throw new Error(`Database error: ${dbError.message}`)
        }

        updateLog(file.name, {
          status: 'success',
          message: 'Uploaded successfully',
        })
      } catch (error) {
        updateLog(file.name, {
          status: 'error',
          message: error instanceof Error ? error.message : 'Upload failed',
        })
      }
    }

    setUploading(false)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const successCount = logs.filter((l) => l.status === 'success').length
  const errorCount = logs.filter((l) => l.status === 'error').length

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="p-2 bg-gray-900 border border-white/10 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Upload Photos</h1>
            <p className="text-gray-400 mt-1">Upload photos to events in bulk</p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
          <div className="space-y-6">
            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Event
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                disabled={uploading}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
              >
                {events.length === 0 && <option>Loading events...</option>}
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Photos
              </label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading || !selectedEventId}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gold file:text-black
                  hover:file:bg-yellow-400
                  file:cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-2">
                Supported: JPEG, PNG, WebP, GIF • Max size: 10MB per file
              </p>
            </div>

            {/* Progress */}
            {uploading && (
              <div className="flex items-center gap-3 text-gold">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  Uploading {progress.current} of {progress.total}...
                </span>
              </div>
            )}

            {/* Summary */}
            {logs.length > 0 && !uploading && (
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-400">
                  ✓ Success: {successCount}
                </span>
                {errorCount > 0 && (
                  <span className="text-red-400">✗ Failed: {errorCount}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Upload Logs */}
        {logs.length > 0 && (
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Upload Log</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm p-3 bg-gray-800 rounded-lg"
                >
                  {log.status === 'uploading' && (
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
                  )}
                  {log.status === 'success' && (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  )}
                  {log.status === 'error' && (
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{log.filename}</p>
                    {log.message && (
                      <p className="text-gray-400 text-xs">{log.message}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
