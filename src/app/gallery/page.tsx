'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Search } from 'lucide-react'
import FaceSearchModal from '@/components/FaceSearchModal'
import { supabase } from '@/lib/supabaseClient'
import { mockEvents } from '@/lib/mockData'

export default function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [images, setImages] = useState<{ id: string, image_url: string, event_id: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      // Select distinct image_urls (since one image might have multiple faces/rows)
      // Actually, Supabase .select with distinct is tricky. 
      // We'll just fetch all and deduplicate in JS for this scale.
      const { data: dbImages, error } = await supabase
        .from('face_embeddings')
        .select('image_url, event_id, id, r2_object_key')
        .order('created_at', { ascending: false })
        .limit(50)

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

  const filteredImages = activeTab === 'all'
    ? images
    : images.filter(img => img.event_id === activeTab)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />

      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Gallery
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold uppercase tracking-wide rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-12"
        >
          <Search className="w-5 h-5" />
          Find My Photos
        </button>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all border ${activeTab === 'all'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600'
              }`}
          >
            All Photos
          </button>
          {mockEvents.map(evt => (
            <button
              key={evt._id}
              onClick={() => setActiveTab(evt.slug.current)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all border ${activeTab === evt.slug.current
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600'
                }`}
            >
              {evt.title}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">Loading gallery...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Camera className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No photos found for this category.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.image_url + idx}
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
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-mono text-white/70 uppercase border border-white/30 px-2 py-1 rounded">
                    {mockEvents.find(e => e.slug.current === img.event_id)?.title || 'General'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <FaceSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
