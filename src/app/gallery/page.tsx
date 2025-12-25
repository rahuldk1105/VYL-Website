import { getEvents } from '@/lib/events'
import SafeImage from '@/components/SafeImage'
import Link from 'next/link'
import { Metadata } from 'next'
import { FolderOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gallery - Veeran Youth League',
  description: 'View photos from our past tournaments and events.'
}

export default async function GalleryAlbumsPage() {
  const events = await getEvents()

  // Show all events, or maybe filter for ones that strictly have photos? 
  // For now, we'll show all past events as likely candidates for albums.
  // Sorting by date descending.
  const albums = events
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-br from-primary-dark to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Photo Albums
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Relive the moments. Select a tournament to view the gallery and find your photos.
          </p>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((event) => (
            <Link
              key={event._id}
              href={`/gallery/${event.slug.current}`}
              className="group block bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all hover:transform hover:-translate-y-1"
            >
              <div className="relative h-64 w-full">
                <SafeImage
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  fallback="/window.svg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-gold mb-2 text-sm font-bold uppercase tracking-wider">
                    <FolderOpen className="w-4 h-4" />
                    <span>Album</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-gold transition-colors">
                    {event.title}
                  </h2>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span>{new Date(event.startDate).getFullYear()}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                      View Photos <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
