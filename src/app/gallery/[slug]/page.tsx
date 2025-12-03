'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Camera, X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react'
import { mockGalleries } from '@/lib/galleryData'

interface GalleryPageProps {
  params: Promise<{ slug: string }>
}

export default function GalleryDetailPage({ params }: GalleryPageProps) {
  const { slug } = React.use(params)
  const gallery = mockGalleries.find(g => g.slug.current === slug)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  
  if (!gallery) {
    notFound()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % gallery.images.length)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + gallery.images.length) % gallery.images.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImageIndex !== null) {
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeLightbox()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-8 h-8 text-gold" />
              <span className="text-gold font-semibold text-lg">Photo Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {gallery.title}
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              {gallery.description}
            </p>
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(gallery.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{gallery.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {gallery.images.length} Professional Photos
            </h2>
            <p className="text-gray-600">
              Click on any image to view in full size and download
            </p>
          </div>
          <div className="flex gap-2">
            {gallery.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.images.map((image, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-16 aspect-h-12 relative h-64">
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium mb-1">{image.caption}</p>
                  {image.photographer && (
                    <p className="text-gray-300 text-xs">Photo by {image.photographer}</p>
                  )}
                </div>
              </div>
              
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery.images[selectedImageIndex].url}
              alt={gallery.images[selectedImageIndex].caption}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
              <div className="text-white">
                <p className="text-lg font-medium mb-2">{gallery.images[selectedImageIndex].caption}</p>
                {gallery.images[selectedImageIndex].photographer && (
                  <p className="text-gray-300 text-sm mb-4">
                    Photo by {gallery.images[selectedImageIndex].photographer}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>{selectedImageIndex + 1} of {gallery.images.length}</span>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
