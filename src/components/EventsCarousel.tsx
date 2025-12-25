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
  tagline: string
}

interface EventsCarouselProps {
  events: Event[]
  title?: string
  description?: string
}

const EventsCarousel = ({ events, title = "Upcoming Events", description = "Discover our next tournaments for 5–18 year olds across India" }: EventsCarouselProps) => {



  if (!events || events.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-white/80">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
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
                <Link href={`/tournaments/${event.slug}`} className="group block">
                  <div className="relative h-56 sm:h-64 overflow-hidden mb-4 sm:mb-6 rounded-lg">
                    <SafeImage
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      fallback="/window.svg"
                    />
                  </div>

                  <h3 className="font-black uppercase text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white/80 flex-shrink-0" />
                      <span className="line-clamp-1">{dateLine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleDot className="h-4 w-4 text-white/80 flex-shrink-0" />
                      <span className="line-clamp-1">{formatLine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/80 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 inline-flex flex-col items-start">
                    <span className="font-black uppercase tracking-wide text-sm">View More</span>
                    <span className="mt-1 block w-20 sm:w-24 border-b border-white" />
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
