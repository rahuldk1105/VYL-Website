'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Search, ArrowLeft } from 'lucide-react'
import FaceSearchModal from '@/components/FaceSearchModal'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function EventGalleryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [images, setImages] = useState<{ id: string, image_url: string, event_id: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [eventTitle, setEventTitle] = useState(slug)

  useEffect(() => {
    fetchEventDetails()
    fetchImages()
  }, [slug])

  const fetchEventDetails = async () => {
    // Fetch event title for display
    const { data } = await supabase
      .from('events')
      .select('title')
      .eq('slug', slug)
      .single()

    if (data) setEventTitle(data.title)
  }

  const fetchImages = async () => {
    try {
      const { data: dbImages, error } = await supabase
        .from('face_embeddings')
        .select('image_url, event_id, id, r2_object_key')
        .eq('event_id', slug) // Filter by specific event
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error

      if (dbImages && dbImages.length > 0) {
        // 2. Get Signed URLs for them
        const keys = dbImages.map((img: { r2_object_key: string }) => img.r2_object_key)
        const signRes = await fetch('/api/r2/sign-read', {
          method: 'POST',
          body: JSON.stringify({ keys })
        })
        const { urls } = await signRes.json()

        // 3. Map back to state
        const resolvedImages = dbImages.map((img: { id: string, event_id: string, r2_object_key: string }) => {
          const signedUrlObj = urls.find((u: { key: string, url: string }) => u.key === img.r2_object_key)
          return {
            id: img.id,
            event_id: img.event_id,
            image_url: signedUrlObj ? signedUrlObj.url : ''
          }
        }).filter((img: { image_url: string }) => img.image_url !== '')

        setImages(resolvedImages)
      }
    } catch (err) {
      console.error("Error fetching gallery:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />

      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-8 text-center px-4">
        <Link href="/gallery" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Albums
        </Link>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          {eventTitle}
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold uppercase tracking-wide rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-8"
        >
          <Search className="w-5 h-5" />
          Find My Photos
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">Loading photos...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Camera className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No photos uploaded for this tournament yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="break-inside-avoid rounded-xl overflow-hidden bg-white/5 border border-white/10 group relative"
              >
                <img
                  src={img.image_url}
                  alt="Gallery"
                  className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <FaceSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
