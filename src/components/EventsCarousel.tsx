'use client'

import SafeImage from '@/components/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, MapPin, CircleDot } from 'lucide-react'
import { format } from 'date-fns'

interface Event {
  _id: string
  title: string
  slug: string
  heroImage: string
  logo?: string
  startDate: string
  endDate: string
  location: string
  tier: string
  tagline: string
}

interface EventsCarouselProps {
  events: Event[]
}

const EventsCarousel = ({ events }: EventsCarouselProps) => {

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'lions':
        return 'bg-gold text-black'
      case 'tigers':
        return 'bg-orange-500 text-white'
      case 'panthers':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  if (!events || events.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-black text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Upcoming Events
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Discover our next tournaments for 5–18 year olds across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {events.map((event, index) => {
            const dateLine = `${format(new Date(event.startDate), 'd')}–${format(new Date(event.endDate), 'd MMMM yyyy')}`
            const formatLine = event.tagline || 'Full format matches'

            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/${event.slug}`} className="group block">
                  <div className="relative h-64 overflow-hidden mb-6">
                    <SafeImage
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      fallback="/window.svg"
                    />
                  </div>

                  <h3 className="font-black uppercase text-xl md:text-2xl mb-4">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white" />
                      <span>{dateLine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleDot className="h-4 w-4 text-white" />
                      <span>{formatLine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 inline-flex flex-col items-start">
                    <span className="font-black uppercase tracking-wide">View More</span>
                    <span className="mt-1 block w-24 border-b border-white" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EventsCarousel
