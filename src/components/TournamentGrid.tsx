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
  const tierFilter = searchParams.get('tier') || 'All Tiers'
  const monthFilter = searchParams.get('month') || 'All Months'

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm)
    
    const matchesSport = sportFilter === 'All Sports' || event.sport === sportFilter
    const matchesTier = tierFilter === 'All Tiers' || event.tier === tierFilter
    const matchesMonth = monthFilter === 'All Months' || 
      new Date(event.startDate).toLocaleString('default', { month: 'long' }) === monthFilter
    
    return matchesSearch && matchesSport && matchesTier && matchesMonth
  })

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Lions': return 'bg-red-100 text-red-800'
      case 'Tigers': return 'bg-orange-100 text-orange-800'
      case 'Panthers': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
        <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tournaments found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <Link
          key={event._id}
          href={`/tournaments/${event.slug.current}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(event.tier)}`}>
                {event.tier}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.maxTeams} teams max</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{event.registrationDeadline && 
                  `Register by ${formatDate(event.registrationDeadline)}`}
                </span>
              </div>
              
              <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                View Details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
