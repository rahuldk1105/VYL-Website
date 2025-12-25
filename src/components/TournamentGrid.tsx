'use client'

import { useSearchParams } from 'next/navigation'
import SafeImage from '@/components/SafeImage'
import Link from 'next/link'
import { Calendar, MapPin, Users, Trophy, Clock } from 'lucide-react'
import { Event } from '@/lib/types'

interface TournamentGridProps {
  events: Event[]
}

export default function TournamentGrid({ events }: TournamentGridProps) {
  const searchParams = useSearchParams()

  const searchTerm = searchParams.get('search')?.toLowerCase() || ''
  const sportFilter = searchParams.get('sport') || 'All Sports'
  const monthFilter = searchParams.get('month') || 'All Months'

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm ||
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm)

    const matchesSport = sportFilter === 'All Sports' || event.sport === sportFilter
    const matchesMonth = monthFilter === 'All Months' ||
      new Date(event.startDate).toLocaleString('default', { month: 'long' }) === monthFilter

    return matchesSearch && matchesSport && matchesMonth
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No tournaments found</h3>
        <p className="text-white/60">Try adjusting your search criteria or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => {
        const isRegistrationClosed = new Date() > new Date(event.registrationDeadline)

        return (
          <Link
            key={event._id}
            href={`/tournaments/${event.slug.current}`}
            className="group bg-white/10 border border-white/20 rounded-lg shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 hover:-translate-y-1 block overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <SafeImage
                src={event.image}
                alt={event.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fallback="/window.svg"
              />
              {isEventPassed ? (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-600 text-white">
                    Completed
                  </span>
                </div>
              ) : isRegistrationClosed && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white">
                    Registrations Closed
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
                {event.title}
              </h3>

              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-white/80">
                  <Calendar className="w-4 h-4 mr-2 text-white/60" />
                  <span className="line-clamp-1">{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                </div>

                <div className="flex items-center text-sm text-white/80">
                  <MapPin className="w-4 h-4 mr-2 text-white/60" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>

                <div className="flex items-center text-sm text-white/80">
                  <Users className="w-4 h-4 mr-2 text-white/60" />
                  <span>{event.maxTeams} teams max</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center text-sm">
                  {isEventPassed ? (
                    <span className="text-white/50 font-medium">Event Ended</span>
                  ) : isRegistrationClosed ? (
                    <span className="text-red-400 font-medium">Closed</span>
                  ) : (
                    <div className="flex items-center text-green-400 font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-xs sm:text-sm line-clamp-1">Register by {formatDate(event.registrationDeadline)}</span>
                    </div>
                  )}
                </div>

                <span className="text-sm font-semibold text-gold group-hover:text-yellow-400 whitespace-nowrap">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
