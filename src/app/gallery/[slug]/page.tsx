'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ImageModal from '@/components/ImageModal'

export default function EventGalleryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [images, setImages] = useState<{ url: string; key: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [eventTitle, setEventTitle] = useState(slug)
  const [selectedImage, setSelectedImage] = useState<{ url: string; key: string } | null>(null)

  useEffect(() => {
    fetchGallery()
  }, [slug])

  const fetchGallery = async () => {
    try {
      console.log('🔍 Starting gallery fetch for slug:', slug)

      // 1. Fetch event details including r2_directory
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('title, r2_directory')
        .eq('slug', slug)
        .single()

      if (eventError || !eventData) {
        console.error('❌ Event not found:', eventError)
        setIsLoading(false)
        return
      }

      console.log('✅ Event found:', eventData)
      setEventTitle(eventData.title)

      // 2. Check if event has an R2 directory configured
      if (!eventData.r2_directory) {
        console.warn('⚠️ No R2 directory configured for this event')
        setIsLoading(false)
        return
      }

      console.log('📁 R2 Directory:', eventData.r2_directory)

      // 3. List all photos in the R2 directory
      const listResponse = await fetch('/api/r2/list-directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory: eventData.r2_directory }),
      })

      console.log('📋 List response status:', listResponse.status)

      if (!listResponse.ok) {
        const errorData = await listResponse.json()
        console.error('❌ List directory failed:', errorData)
        throw new Error('Failed to list directory')
      }

      const { keys, total } = await listResponse.json()
      console.log('✅ Found', total || keys?.length || 0, 'images')

      if (!keys || keys.length === 0) {
        console.warn('⚠️ No images found in directory')
        setIsLoading(false)
        return
      }

      // 4. Get signed URLs for all photos (batch into chunks of 100)
      console.log('🔐 Getting signed URLs for', keys.length, 'images...')
      const BATCH_SIZE = 100
      const allUrls: { key: string; url: string }[] = []

      for (let i = 0; i < keys.length; i += BATCH_SIZE) {
        const batch = keys.slice(i, i + BATCH_SIZE)
        console.log(`🔐 Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(keys.length / BATCH_SIZE)}: ${batch.length} images`)

        const signResponse = await fetch('/api/r2/sign-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keys: batch }),
        })

        if (!signResponse.ok) {
          const errorData = await signResponse.json()
          console.error('❌ Sign URLs failed for batch:', errorData)
          throw new Error('Failed to get signed URLs')
        }

        const { urls } = await signResponse.json()
        allUrls.push(...urls)
        console.log(`✅ Batch complete: ${allUrls.length}/${keys.length} total`)
      }

      console.log('✅ All signed URLs retrieved:', allUrls.length)

      // 5. Set images with both URL and key
      setImages(allUrls)

    } catch (err) {
      console.error('❌ Error fetching gallery:', err)
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
          Click any photo to view full size and download
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">
            <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading photos...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Camera className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No photos uploaded for this tournament yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Configure an R2 directory path in the database to display photos.
            </p>
          </div>
        ) : (
          <>
            <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.02, 2) }}
                  className="break-inside-avoid rounded-xl overflow-hidden bg-white/5 border border-white/10 group relative cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                      Click to view
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image count */}
            <div className="mt-8 text-center text-gray-400">
              Showing {images.length} photos
            </div>
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          imageKey={selectedImage.key}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
