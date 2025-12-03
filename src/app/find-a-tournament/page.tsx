import { Suspense } from 'react'
import TournamentFilter from '@/components/TournamentFilter'
import TournamentGrid from '@/components/TournamentGrid'
import { mockEvents } from '@/lib/mockData'

export default function FindTournamentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 container h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Tournament
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover elite youth football tournaments across India. From grassroots to competitive levels,
              find the perfect VYL competition for your team.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container py-6">
          <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
            <TournamentFilter />
          </Suspense>
        </div>
      </div>

      {/* Tournament Grid */}
      <div className="container py-12">
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4" />
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>}>
          <TournamentGrid events={mockEvents} />
        </Suspense>
      </div>
    </div>
  )
}
