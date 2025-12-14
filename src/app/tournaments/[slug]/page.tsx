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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {event.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {new Date(event.endDate) >= new Date() && (
                <Link
                  href="#register"
                  className="px-8 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Register Now
                </Link>
              )}
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


              </div>
            </div>

            {/* Age Groups */}
            {event.ageGroups && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Age Groups</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {event.ageGroups.boys && (
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 mb-4 border-b pb-2">Boys Categories</h3>
                      <ul className="space-y-3">
                        {event.ageGroups.boys.map((group, idx) => (
                          <li key={idx} className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-gray-800">{group.category}</span>
                            <span className="text-gray-500">Born on/after {new Date(group.bornOnOrAfter).toLocaleDateString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {event.ageGroups.girls && (
                    <div>
                      <h3 className="text-lg font-bold text-pink-700 mb-4 border-b pb-2">Girls Categories</h3>
                      <ul className="space-y-3">
                        {event.ageGroups.girls.map((group, idx) => (
                          <li key={idx} className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-gray-800">{group.category}</span>
                            <span className="text-gray-500">{group.bornOnOrAfter === 'Open' ? 'Open Age' : `Born on/after ${new Date(group.bornOnOrAfter).toLocaleDateString()}`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Match Specifications */}
            {event.matchSpecifications && (
              <div className="bg-white rounded-lg shadow-lg p-8 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Match Specifications</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 font-bold uppercase">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">Category</th>
                        <th className="px-4 py-3">Format</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Ball Size</th>
                        <th className="px-4 py-3 rounded-tr-lg">Subs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {event.matchSpecifications.map((spec, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-semibold text-gray-900">{spec.category}</td>
                          <td className="px-4 py-3">{spec.players}</td>
                          <td className="px-4 py-3">{spec.time} (mins)</td>
                          <td className="px-4 py-3">Size {spec.ballSize}</td>
                          <td className="px-4 py-3">{spec.subs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">
                  * Note: Only U-7 and U-9 follow 5+3 format. All other categories are 7+5.
                </p>
              </div>
            )}

            {/* Features & Merchandise */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tournament Highlights & Merchandise</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Features */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Highlights</h3>
                  <div className="space-y-3">
                    {event.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Merchandise */}
                {event.merchandise && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Player Kit & Awards</h3>
                    <div className="space-y-3">
                      {event.merchandise.players.map((item, index) => (
                        <div key={`p-${index}`} className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-gold flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                      {event.merchandise.champions.map((item, index) => (
                        <div key={`c-${index}`} className="flex items-center space-x-3">
                          <Trophy className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          <span className="text-gray-900 font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rules */}
            {event.matchRules && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Rules</h2>
                <ul className="space-y-3 mb-6">
                  {event.matchRules.general.map((rule, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded mr-3 mt-1">
                        RULE {idx + 1}
                      </span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <p className="text-sm text-orange-800">
                    <strong>Standby Time:</strong> Teams must report {event.matchRules.standbyTime} minutes before their scheduled match time.
                  </p>
                </div>
              </div>
            )}

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
                  <span className="text-gray-600">Registration Deadline:</span>
                  <span className="font-semibold text-gray-900">{formatDate(event.registrationDeadline)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available Spots:</span>
                  <span className="font-semibold text-gray-900">{event.maxTeams} teams</span>
                </div>
              </div>

              {new Date(event.endDate) < new Date() ? (
                <button
                  disabled
                  className="w-full px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed mb-3"
                >
                  Event has ended already
                </button>
              ) : event.registrationUrl ? (
                <Link
                  href={event.registrationUrl}
                  className="block w-full text-center px-6 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors mb-3"
                >
                  Register Now !
                </Link>
              ) : (
                <button className="w-full px-6 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors mb-3">
                  Register Your Team
                </button>
              )}

              <p className="text-xs text-gray-500 text-center">
                Register Early to secure your spot!
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>📧 admin@veerancup.in</p>
                <p>📞 +91 7904441579</p>
                <p>💬 Live Chat Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
