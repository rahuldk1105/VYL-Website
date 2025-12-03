import SafeImage from '@/components/SafeImage'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Star, CheckCircle } from 'lucide-react'
import { mockEvents } from '@/lib/mockData'
import Link from 'next/link'

interface TournamentPageProps {
  params: Promise<{ slug: string }>
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { slug } = await params
  const event = mockEvents.find(e => e.slug.current === slug)
  
  if (!event) {
    notFound()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Lions': return 'bg-red-100 text-red-800 border-red-200'
      case 'Tigers': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Panthers': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatINR = (amount: number) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
    } catch {
      return `₹${amount.toLocaleString('en-IN')}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0">
          <SafeImage
            src={event.image}
            alt={event.title}
            fill
            className="object-cover opacity-30"
            fallback="/window.svg"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 container h-full flex items-center">
          <div className="max-w-4xl">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getTierColor(event.tier)}`}>
              {event.tier} Tier
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {event.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#register"
                className="px-8 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Register Now
              </Link>
              <Link
                href="#details"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-dark transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Date</h3>
                    <p className="text-gray-600">{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Max Teams</h3>
                    <p className="text-gray-600">{event.maxTeams} teams</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Entry Fee</h3>
                    <p className="text-gray-600">{formatINR(event.price)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Formats */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tournament Format</h2>
              <div className="space-y-4">
                {event.matchFormats.map((format, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{format.name}</h3>
                    <p className="text-gray-600">{format.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div id="register" className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Registration</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Entry Fee:</span>
                  <span className="font-bold text-gray-900">{formatINR(event.price)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Registration Deadline:</span>
                  <span className="font-semibold text-gray-900">{formatDate(event.registrationDeadline)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available Spots:</span>
                  <span className="font-semibold text-gray-900">{event.maxTeams} teams</span>
                </div>
              </div>
              
              <button className="w-full px-6 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors mb-3">
                Register Your Team
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Secure payment processing • Instant confirmation
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>📧 info@vylleague.com</p>
                <p>📞 +91 98765 43210</p>
                <p>💬 Live Chat Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
