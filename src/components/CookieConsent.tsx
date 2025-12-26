'use client'

import React, { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      // Show popup after a short delay
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-gray-900 to-black border border-gold/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Thin top accent bar */}
        <div className="h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold"></div>

        <div className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 md:w-6 md:h-6 text-gold" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-bold text-white mb-1.5">
                Cookie Notice
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                We use cookies to enhance your browsing experience and analyze site traffic.
                By continuing, you accept our use of cookies.
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-gold hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full transition-colors text-xs md:text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-full transition-colors text-xs md:text-sm"
                >
                  Decline
                </button>
              </div>
            </div>

            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
