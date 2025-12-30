'use client'

import { useState } from 'react'
import { X, MapPin, Calendar, Users, Trophy, Check, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MadridTrialsProps {
  zohoFormUrl?: string
}

export default function MadridTrials({ zohoFormUrl = '' }: MadridTrialsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      {/* Featured Trials Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          {/* Limited Slots Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-6"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIMITED SLOTS AVAILABLE
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/veeran_logo.png" alt="Veeran" className="w-12 h-12" />
                  <span className="text-gold font-black text-2xl">VEERAN TRIALS</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                  MADRID, SPAIN 🇪🇸
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-gold to-red-600" />
              </div>

              <h2 className="text-3xl font-black text-gold mb-6 uppercase">
                International Youth Football Trials
              </h2>

              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Play in Spain. Gain International Exposure. An International Youth Football Exposure Tournament in Madrid designed to give young players real match experience against European academy teams.
              </p>

              {/* Important Notice */}
              <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-orange-300 font-semibold mb-1">Important Note:</p>
                    <p className="text-gray-400 text-sm">
                      This is NOT a direct club signing trial. It is a performance-based exposure & experience program.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Match experience vs European teams',
                  'International exposure tournament',
                  'Player report & certification',
                  'Real showcase opportunity in Spain'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="group relative bg-gradient-to-r from-gold to-yellow-500 text-black font-black text-lg px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all transform hover:scale-105 uppercase tracking-wide"
              >
                <span className="relative z-10">Apply for Trials →</span>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <p className="text-gray-500 text-sm mt-4">
                Registration Fee: <span className="text-gold font-bold">₹299</span>
              </p>
            </div>

            {/* Right Side - Details Cards */}
            <div className="space-y-6">
              {/* Age Groups Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-gold" />
                  <h3 className="text-xl font-bold text-white">Age Categories</h3>
                </div>
                <div className="flex gap-4">
                  {['U12', 'U14', 'U16'].map((age) => (
                    <div key={age} className="flex-1 bg-gold/20 border border-gold/50 rounded-xl p-3 text-center">
                      <p className="text-2xl font-black text-gold">{age}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trial Locations Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-gold" />
                  <h3 className="text-xl font-bold text-white">Trial Locations</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                    <span className="text-white font-semibold">📍 Coimbatore</span>
                    <span className="text-gray-400">10th January</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                    <span className="text-white font-semibold">📍 Chennai</span>
                    <span className="text-gray-400">11th January</span>
                  </div>
                </div>
              </div>

              {/* Important Clarifications */}
              <div className="bg-gradient-to-br from-red-900/20 to-red-900/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Important Clarifications</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">❌ Not a direct club signing trial</p>
                  <p className="text-gray-300">✅ Selections for tournament representation</p>
                  <p className="text-gray-300">✈️ Travel depends on selection & confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-bold text-white">Madrid Trials Application</h3>
                  <p className="text-gray-400 text-sm">Complete the form below to apply</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Zoho Form Iframe */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                {zohoFormUrl ? (
                  <iframe
                    src={zohoFormUrl}
                    className="w-full h-[600px] border-0 rounded-lg"
                    title="Madrid Trials Application Form"
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">
                      Please provide the Zoho form URL to embed the application form.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-gray-500 mb-2">Expected URL format:</p>
                      <code className="text-xs text-gold">
                        https://forms.zohopublic.in/...
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
