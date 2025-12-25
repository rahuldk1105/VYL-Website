'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search, Filter, Calendar, MapPin } from 'lucide-react'

const sports = ['All Sports', 'Football']
const months = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function TournamentFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || 'All Sports')
  const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || 'All Months')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)

    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }

    if (selectedSport !== 'All Sports') {
      params.set('sport', selectedSport)
    } else {
      params.delete('sport')
    }

    if (selectedMonth !== 'All Months') {
      params.set('month', selectedMonth)
    } else {
      params.delete('month')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSport('All Sports')
    setSelectedMonth('All Months')
    router.push(pathname)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>

        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Sport
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              {sports.map((sport) => (
                <option key={sport} value={sport} className="bg-gray-900">{sport}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              {months.map((month) => (
                <option key={month} value={month} className="bg-gray-900">{month}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(searchTerm || selectedSport !== 'All Sports' || selectedMonth !== 'All Months') && (
        <button
          onClick={clearFilters}
          className="text-sm text-gold hover:text-yellow-400 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}