import { Calendar, MapPin, Users, Trophy, CheckCircle, Shield, AlertTriangle, Plane, Star, Info } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Madrid Spain International Youth Football Trials | Veeran Youth League',
  description: 'International Youth Football Trials in Madrid, Spain. Play against European academy teams, gain international exposure, and showcase your talent on a global stage.',
  openGraph: {
    title: 'Madrid Spain International Trials | Veeran Youth League',
    description: 'Play in Spain. Gain International Exposure. An International Youth Football Exposure Tournament in Madrid.',
    url: 'https://www.veerancup.in/trials/madrid-spain',
    siteName: 'Veeran Youth League',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Madrid Spain International Football Trials',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madrid Spain International Trials',
    description: 'Play in Spain. Gain International Exposure.',
    images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'],
  }
}

export default function MadridTrialsPage() {
  const registrationUrl = 'https://forms.zohopublic.in/trackmyacademy/form/InternationalYouthFootballTrialsRegistrationForm/formperma/qMTYCyvLig8nTS7xKw5FETuN0N9I1JBCG1aahovBaH4'

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsEvent',
            name: 'Madrid Spain International Youth Football Trials',
            description: 'International Youth Football Exposure Tournament in Madrid designed to give young players real match experience against European academy teams.',
            startDate: '2025-01-10',
            endDate: '2025-01-11',
            location: {
              '@type': 'Place',
              name: 'Coimbatore & Chennai',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
                streetAddress: 'Coimbatore & Chennai, Tamil Nadu',
              }
            },
            image: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'],
            organizer: {
              '@type': 'Organization',
              name: 'Veeran Youth League',
              url: 'https://www.veerancup.in'
            },
            offers: {
              '@type': 'Offer',
              price: 299,
              priceCurrency: 'INR',
              url: 'https://www.veerancup.in/trials/madrid-spain',
              availability: 'https://schema.org/LimitedAvailability'
            }
          })
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-br from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        </div>

        <div className="relative z-20 container h-full flex items-center px-4">
          <div className="max-w-4xl">
            {/* Limited Slots Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIMITED SLOTS AVAILABLE
            </div>

            <div className="flex items-center gap-3 mb-4">
              <img src="/veeran_logo.png" alt="Veeran" className="w-12 h-12" />
              <span className="text-gold font-black text-2xl">VEERAN TRIALS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              MADRID, SPAIN 🇪🇸
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-gold to-red-600 mb-6" />

            <h2 className="text-2xl md:text-3xl font-black text-gold mb-4 uppercase">
              International Youth Football Trials
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Play in Spain. Gain International Exposure. An International Youth Football Exposure Tournament in Madrid designed to give young players real match experience against European academy teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#register"
                className="px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all transform hover:scale-105 uppercase tracking-wide text-center"
              >
                Apply for Trials →
              </Link>
              <Link
                href="#details"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all text-center uppercase tracking-wide"
              >
                Learn More
              </Link>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Registration Fee: <span className="text-gold font-bold text-lg">₹299</span>
            </p>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div id="details" className="container py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Important Notice */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-r-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-orange-900 text-lg mb-2">Important Note</h3>
                  <p className="text-orange-800 leading-relaxed">
                    This is <strong>NOT a direct club signing trial</strong>. It is a performance-based exposure & experience program designed to give young players real match experience against European academy teams in Spain.
                  </p>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Trial Dates</h3>
                    <p className="text-gray-600">10th & 11th January 2025</p>
                    <p className="text-sm text-gray-500 mt-1">Selections for tournament representation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Trial Locations</h3>
                    <p className="text-gray-600">📍 Coimbatore - 10th January</p>
                    <p className="text-gray-600">📍 Chennai - 11th January</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Age Categories</h3>
                    <p className="text-gray-600">U12, U14, U16</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Plane className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Destination</h3>
                    <p className="text-gray-600">Madrid, Spain 🇪🇸</p>
                    <p className="text-sm text-gray-500 mt-1">Depends on selection & confirmation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Age Categories Detail */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-gold" />
                Age Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['U12', 'U14', 'U16'].map((age) => (
                  <div key={age} className="bg-gradient-to-br from-gold/20 to-gold/10 border-2 border-gold/50 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                    <p className="text-4xl font-black text-gold">{age}</p>
                    <p className="text-sm text-gray-600 mt-2">Category</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-gold" />
                What You Get
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Match experience vs European academy teams',
                  'International exposure tournament in Spain',
                  'Professional player report & certification',
                  'Real showcase opportunity in Madrid',
                  'Training with qualified coaches',
                  'Professional tournament environment',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Clarifications */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Clarifications</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Not a Direct Club Signing Trial</h3>
                    <p className="text-sm text-gray-600">This is an exposure and experience program, not a direct pathway to club contracts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Selections for Tournament Representation</h3>
                    <p className="text-sm text-gray-600">Selected players will represent Veeran in the international exposure tournament in Madrid.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Travel Depends on Selection & Confirmation</h3>
                    <p className="text-sm text-gray-600">Only selected players who confirm participation will travel to Spain for the tournament.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-gold" />
                Terms & Conditions
              </h2>

              <div className="space-y-6">
                {/* General Terms */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Trial Participation</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>All participants must provide accurate and truthful information regarding player age, eligibility, and personal details.</li>
                    <li>Participants must comply with all trial schedules, timings, and venue guidelines.</li>
                    <li>Sportsmanship and fair play must be maintained throughout the trials.</li>
                    <li>Decisions made by coaches, evaluators, and the organizing committee are final and binding.</li>
                    <li>Participation in sports events carries inherent risks. By registering, you acknowledge these risks.</li>
                    <li>Registration fee is non-refundable except in case of event cancellation by organizers.</li>
                  </ul>
                </div>

                {/* Age Fraud Protocol */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Age Fraud & Protest Protocol</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Veeran Youth League maintains strict policies to ensure fair competition. If you wish to protest against age fraud or suspect another participant of age misrepresentation:
                      </p>
                    </div>
                  </div>

                  <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-800">
                    <li>
                      <strong className="text-gray-900">Written Submission:</strong> Submit a formal written letter to the organizing committee detailing the complaint and suspected violations.
                    </li>
                    <li>
                      <strong className="text-gray-900">Verification Fee:</strong> Pay a verification fee of <strong className="text-orange-600">₹1,000 (One Thousand Indian Rupees)</strong> at the time of filing the protest.
                    </li>
                    <li>
                      <strong className="text-gray-900">Investigation:</strong> The organizing committee will conduct a thorough investigation, including document verification and identity checks.
                    </li>
                    <li>
                      <strong className="text-gray-900">Fee Refund Policy:</strong>
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>If the accused participant is found <strong className="text-green-600">guilty of age fraud</strong>, the ₹1,000 fee will be <strong>fully refunded</strong>.</li>
                        <li>If the accusation is proven <strong className="text-red-600">false or unsubstantiated</strong>, the verification fee will <strong>NOT be refunded</strong>.</li>
                      </ul>
                    </li>
                    <li>
                      <strong className="text-gray-900">Final Decision:</strong> The organizing committee's decision on all protests shall be final and binding.
                    </li>
                  </ol>

                  <p className="text-xs text-gray-600 italic mt-4">
                    This policy maintains integrity while discouraging frivolous complaints. All participants are expected to compete fairly and honestly.
                  </p>
                </div>

                {/* Link to Full Terms */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    By registering for these trials, you agree to our{' '}
                    <Link href="/terms" className="text-gold hover:text-yellow-600 font-semibold underline">
                      full Terms of Service
                    </Link>
                    . Last updated: December 18, 2025 at 5:33 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div id="register" className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl p-6 sticky top-6 border border-gold/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">Apply Now</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Registration Fee:</span>
                    <span className="text-2xl font-black text-gold">₹299</span>
                  </div>
                  <p className="text-xs text-gray-400">One-time registration fee</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Trial Dates:</span>
                    <span className="font-semibold text-white">10-11 Jan 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Availability:</span>
                    <span className="font-semibold text-red-400">Limited Slots</span>
                  </div>
                </div>
              </div>

              <Link
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all transform hover:scale-105 mb-3 uppercase tracking-wide"
              >
                Apply for Trials →
              </Link>

              <p className="text-xs text-gray-400 text-center">
                Limited slots available. Register early!
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span>📧</span>
                  <a href="mailto:contact@veerancup.in" className="hover:text-gold">contact@veerancup.in</a>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+91 7904441579</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+91 8925515619</span>
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-br from-gold/20 to-yellow-500/20 border border-gold/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Why Choose Veeran?</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>✓ Proven track record in youth development</p>
                <p>✓ Professional coaching staff</p>
                <p>✓ International exposure opportunities</p>
                <p>✓ Comprehensive player evaluations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
