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
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[80vh] relative">
        <img
          src={imageUrl}
          alt="Full size"
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/50 backdrop-blur-md rounded-full p-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gold hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition-colors"
          title="Download"
        >
          <Download className="w-5 h-5" />
          Download
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          title="Copy Link"
        >
          <LinkIcon className="w-5 h-5" />
          Copy Link
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          title="Share on WhatsApp"
        >
          <Share2 className="w-5 h-5" />
          WhatsApp
        </button>

        <button
          onClick={handleInstagramShare}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          title="Share on Instagram"
        >
          <Instagram className="w-5 h-5" />
          Instagram
        </button>
      </div>
    </div>
  )
}
