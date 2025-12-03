'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search, Filter, Calendar, MapPin } from 'lucide-react'

const sports = ['All Sports', 'Football', 'Basketball', 'Tennis', 'Volleyball', 'Badminton', 'Swimming']
const tiers = ['All Tiers', 'Lions', 'Tigers', 'Panthers']
const months = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function TournamentFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || 'All Sports')
  const [selectedTier, setSelectedTier] = useState(searchParams.get('tier') || 'All Tiers')
  const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || 'All Months')
  const [showFilters, setShowFilters] = useState(false)

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'All Sports' || value === 'All Tiers' || value === 'All Months') {
      params.delete(name)
    } else {
      params.set(name, value)
    }
    return params.toString()
  }

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
    
    if (selectedTier !== 'All Tiers') {
      params.set('tier', selectedTier)
    } else {
      params.delete('tier')
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
    setSelectedTier('All Tiers')
    setSelectedMonth('All Months')
    router.push(pathname)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
        
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Sport
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tier Level
            </label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {tiers.map((tier) => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(searchTerm || selectedSport !== 'All Sports' || selectedTier !== 'All Tiers' || selectedMonth !== 'All Months') && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}