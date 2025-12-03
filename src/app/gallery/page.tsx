import SafeImage from '@/components/SafeImage'
import Link from 'next/link'
import { Calendar, MapPin, Camera, Grid3x3 } from 'lucide-react'
import { mockGalleries } from '@/lib/galleryData'

export default function GalleryPage() {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const allCategories = Array.from(
    new Set(mockGalleries.flatMap(gallery => gallery.categories))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 container h-full flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-8 h-8 text-gold" />
              <span className="text-gold font-semibold text-lg">Photo Gallery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Event Photography
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Relive the excitement through our professional event photography.
              Browse galleries from VYL tournaments across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#galleries"
                className="px-8 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Browse Galleries
              </Link>
              <Link
                href="/"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-dark transition-colors"
              >
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white shadow-lg">
        <div className="container py-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Grid3x3 className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                All Categories
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div id="galleries" className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockGalleries.map((gallery) => (
            <Link
              key={gallery._id}
              href={`/gallery/${gallery.slug.current}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <SafeImage
                  src={gallery.thumbnail}
                  alt={gallery.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  fallback="/window.svg"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {gallery.images.length} photos
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {gallery.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {gallery.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{formatDate(gallery.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{gallery.location}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {gallery.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section removed as requested */}
    </div>
  )
}
