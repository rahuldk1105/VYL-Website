'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from '@/components/SafeImage'

const backgroundImages = [
  '/images/footer/carousel-1.jpg',
  '/images/footer/carousel-2.jpg',
  '/images/footer/carousel-3.jpg'
]

export default function ContactCTA() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[60vh] overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            <SafeImage
              src={backgroundImages[currentImageIndex]}
              alt="Contact background"
              fill
              className="object-cover"
              fallback="/window.svg"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />

      {/* Content */}
      <div className="relative z-20 container h-full flex flex-col justify-center items-center text-center">
        <h2 className="font-black uppercase text-white text-4xl md:text-6xl lg:text-7xl tracking-tight mb-4">
          Get In Touch
        </h2>
        <p className="text-white/90 text-base md:text-lg max-w-2xl mb-8">
          Talk to us about competition entry, partnerships, event ideas and more
        </p>
        <Link
          href="/contact"
          className="bg-white text-black font-black uppercase text-sm px-8 py-4 rounded-full hover:bg-gray-200 transition-colors tracking-wide shadow-xl"
        >
          Contact Us
        </Link>
      </div>
    </section>
  )
}
