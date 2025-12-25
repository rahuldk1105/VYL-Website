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
  const [images, setImages] = useState<{ image_url: string, event_id: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      // Select distinct image_urls (since one image might have multiple faces/rows)
      // Actually, Supabase .select with distinct is tricky. 
      // We'll just fetch all and deduplicate in JS for this scale.
      const { data, error } = await supabase
        .from('face_embeddings')
        .select('image_url, event_id')
        .order('created_at', { ascending: false })
        .limit(100) // Limit for now

      if (error) throw error

      if (data) {
        // Deduplicate by URL
        const uniqueImages = Array.from(new Map(data.map(item => [item.image_url, item])).values())
        setImages(uniqueImages)
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
      <div className="relative z-10 pt-24 sm:pt-28 pb-8 sm:pb-12 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 sm:mb-8 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Gallery
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gold text-black font-bold uppercase tracking-wide text-xs sm:text-sm rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-8 sm:mb-12"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Find My Photos</span>
        </button>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border ${activeTab === 'all'
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
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border ${activeTab === evt.slug.current
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600'
                }`}
            >
              <span className="hidden sm:inline">{evt.title}</span>
              <span className="sm:hidden">{evt.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-16 sm:pb-20 md:pb-24">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse py-12">Loading gallery...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white/5 rounded-2xl border border-white/10">
            <Camera className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-sm sm:text-base text-gray-400">No photos found for this category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
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
