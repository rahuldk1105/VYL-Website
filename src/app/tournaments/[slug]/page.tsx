import SafeImage from '@/components/SafeImage'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Star, CheckCircle } from 'lucide-react'
import { getEventBySlug } from '@/lib/events'
import Link from 'next/link'

import { Metadata } from 'next'

interface TournamentPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TournamentPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return {
      title: 'Tournament Not Found | Veeran Youth League',
      description: 'The requested tournament could not be found.'
    }
  }

  const imageUrl = event.image.startsWith('http') ? event.image : `https://www.veeranyouthleague.com${event.image}`

  return {
    title: `${event.title} - Register Now | Veeran Youth League`,
    description: event.description.substring(0, 160),
    openGraph: {
      title: `${event.title} | Premium Youth Football Tournament`,
      description: event.description,
      url: `https://www.veeranyouthleague.com/tournaments/${event.slug.current}`,
      siteName: 'Veeran Youth League',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        }
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description.substring(0, 160),
      images: [imageUrl],
    }
  }
}


export default async function TournamentPage({ params }: TournamentPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsEvent',
            name: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            location: {
              '@type': 'Place',
              name: event.location, // Ideally split this into name and address if possible
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
                streetAddress: event.location,
              }
            },
            image: [event.image.startsWith('http') ? event.image : `https://www.veeranyouthleague.com${event.image}`],
            organizer: {
              '@type': 'Organization',
              name: 'Veeran Youth League',
              url: 'https://www.veeranyouthleague.com'
            },
            offers: {
              '@type': 'Offer',
              price: event.price,
              priceCurrency: event.currency || 'INR',
              url: `https://www.veeranyouthleague.com/tournaments/${event.slug.current}`,
              availability: new Date(event.registrationDeadline) >= new Date() ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut'
            }
          })
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-br from-primary-dark to-blue-900">
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

        <div className="relative z-10 container h-full flex items-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              {event.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl">
              {event.description}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
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
      <div className="container py-8 sm:py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
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
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 overflow-hidden">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Match Specifications</h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                    <table className="min-w-full text-xs sm:text-sm text-left">
                      <thead className="bg-gray-100 text-gray-700 font-bold uppercase">
                        <tr>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 rounded-tl-lg whitespace-nowrap">Category</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">Format</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">Time</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">Ball Size</th>
                          <th className="px-2 sm:px-4 py-2 sm:py-3 rounded-tr-lg whitespace-nowrap">Subs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {event.matchSpecifications.map((spec, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 whitespace-nowrap">{spec.category}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{spec.players}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{spec.time} (mins)</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">Size {spec.ballSize}</td>
                            <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{spec.subs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic px-2 sm:px-0">
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
                <p>📧 contact@veerancup.in</p>
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
