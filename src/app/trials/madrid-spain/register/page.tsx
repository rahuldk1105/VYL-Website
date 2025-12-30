'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function MadridTrialsRegisterPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  const registrationUrl = 'https://forms.zohopublic.in/trackmyacademy/form/InternationalYouthFootballTrialsRegistrationForm/formperma/qMTYCyvLig8nTS7xKw5FETuN0N9I1JBCG1aahovBaH4'

  // Listen for form submission from Zoho iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        if (event.data.includes('zf_OnComplete') || event.data.includes('submitted')) {
          setIsSubmitted(true)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Countdown and redirect after successful submission
  useEffect(() => {
    if (isSubmitted && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isSubmitted && redirectCountdown === 0) {
      router.push('/')
    }
  }, [isSubmitted, redirectCountdown, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/trials/madrid-spain"
            className="flex items-center gap-1 md:gap-2 text-white hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold text-sm md:text-base">Back</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/veeran_logo.png" alt="Veeran" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-gold font-black text-sm md:text-xl">MADRID TRIALS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success Message
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4"
                >
                  Registration Successful!
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-6 md:mb-8 text-sm md:text-lg max-w-md mx-auto"
                >
                  Thank you for applying for the Madrid Spain International Trials. We've received your application and will contact you soon with further details.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <p className="text-gray-400 text-sm md:text-base">
                    Redirecting to homepage in{' '}
                    <span className="text-gold font-bold text-xl md:text-2xl">{redirectCountdown}</span>{' '}
                    seconds...
                  </p>

                  <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold px-6 py-3 md:px-8 md:py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all transform hover:scale-105 text-sm md:text-base"
                  >
                    Back to Home
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              // Registration Form
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 leading-tight px-2">
                    Madrid Spain Trials Registration
                  </h1>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg px-4">
                    Complete the form below to apply for the International Youth Football Trials
                  </p>
                  <div className="mt-3 md:mt-4 flex items-center justify-center gap-3 md:gap-4 text-sm">
                    <span className="text-gray-500">Registration Fee:</span>
                    <span className="text-gold font-black text-xl md:text-2xl">₹299</span>
                  </div>
                </div>

                {/* Form Container */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <iframe
                    src={registrationUrl}
                    className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] border-0"
                    title="Madrid Trials Registration Form"
                  />
                </div>

                <p className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-4">
                  Limited slots available. Register early to secure your spot!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
