'use client'

import React, { useState } from 'react'
import { X, Download, Share2, Link as LinkIcon, Instagram } from 'lucide-react'
import Image from 'next/image'

interface ImageModalProps {
  imageUrl: string
  imageKey: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ imageUrl, imageKey, isOpen, onClose }: ImageModalProps) {
  if (!isOpen) return null

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = imageKey.split('/').pop() || 'photo.jpg'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const handleWhatsAppShare = () => {
    const text = `Check out this photo from Veeran Youth League!`
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + imageUrl)}`
    window.open(url, '_blank')
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have direct share URL, so we copy and inform user
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert('Link copied! Open Instagram app to share.')
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 md:top-4 md:right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[70vh] md:max-h-[80vh] relative mb-20 md:mb-0">
        <img
          src={imageUrl}
          alt="Full size"
          className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg"
        />
      </div>

      {/* Action buttons - Mobile: Grid layout, Desktop: Horizontal */}
      <div className="fixed bottom-2 left-2 right-2 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-auto bg-black/70 md:bg-black/50 backdrop-blur-md rounded-2xl md:rounded-full p-2 md:p-3">
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 md:gap-2 bg-gold hover:bg-yellow-400 text-black font-semibold px-3 py-2 md:px-6 md:py-3 rounded-full transition-colors text-sm md:text-base"
            title="Download"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 md:gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-full transition-colors text-sm md:text-base"
            title="Copy Link"
          >
            <LinkIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-1.5 md:gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-full transition-colors text-sm md:text-base"
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            onClick={handleInstagramShare}
            className="flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-3 py-2 md:px-6 md:py-3 rounded-full transition-colors text-sm md:text-base"
            title="Share on Instagram"
          >
            <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Instagram</span>
          </button>
        </div>
      </div>
    </div>
  )
}
