'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function EventGalleryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [eventTitle, setEventTitle] = useState(slug)

  useEffect(() => {
    fetchGallery()
  }, [slug])

  const fetchGallery = async () => {
    try {
      // 1. Fetch event details including r2_directory
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('title, r2_directory')
        .eq('slug', slug)
        .single()

      if (eventError || !eventData) {
        console.error('Event not found:', eventError)
        setIsLoading(false)
        return
      }

      setEventTitle(eventData.title)

      // 2. Check if event has an R2 directory configured
      if (!eventData.r2_directory) {
        console.log('No R2 directory configured for this event')
        setIsLoading(false)
        return
      }

      // 3. List all photos in the R2 directory
      const listResponse = await fetch('/api/r2/list-directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory: eventData.r2_directory }),
      })

      if (!listResponse.ok) {
        throw new Error('Failed to list directory')
      }

      const { keys } = await listResponse.json()

      if (!keys || keys.length === 0) {
        setIsLoading(false)
        return
      }

      // 4. Get signed URLs for all photos
      const signResponse = await fetch('/api/r2/sign-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys }),
      })

      if (!signResponse.ok) {
        throw new Error('Failed to get signed URLs')
      }

      const { urls } = await signResponse.json()

      // 5. Extract just the URLs
      const imageUrls = urls.map((item: { url: string }) => item.url)
      setImages(imageUrls)

    } catch (err) {
      console.error('Error fetching gallery:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />

      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-8 text-center px-4">
        <Link
          href="/gallery"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Albums
        </Link>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          {eventTitle}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Browse photos from this tournament
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">Loading photos...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Camera className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No photos uploaded for this tournament yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Configure an R2 directory path in the database to display photos.
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((imageUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="break-inside-avoid rounded-xl overflow-hidden bg-white/5 border border-white/10 group relative"
              >
                <img
                  src={imageUrl}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
