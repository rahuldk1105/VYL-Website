'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { motion, AnimatePresence } from 'framer-motion'

interface Slide {
  image: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

interface HeroCarouselProps {
  slides?: Slide[]
}

export default function HeroCarousel({ slides = [] }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)

  // Default fallbacks if no slides provided
  const activeSlides = slides.length > 0 ? slides : [
    {
      image: '/images/hero/hero-1.jpg',
      title: "INDIA'S BIGGEST YOUTH FOOTBALL EVENTS",
      subtitle: "Grassroots football leagues, tournaments, tours, camps and more for 5 to 18 year olds across Tamilnadu",
      ctaText: "View Our Events",
      ctaLink: "/tournaments"
    },
    {
      image: '/images/hero/hero-2.jpg',
      title: "COMPETE WITH THE BEST",
      subtitle: "Join thousands of young athletes showcasing their talent on the biggest stage",
      ctaText: "Join a League",
      ctaLink: "/tournaments"
    },
    {
      image: '/images/hero/hero-3.jpg',
      title: "PROFESSIONAL TRAINING CAMPS",
      subtitle: "Learn from expert coaches and take your game to the next level",
      ctaText: "Find a Camp",
      ctaLink: "/tournaments"
    },
    {
      image: '/images/hero/hero-4.jpg',
      title: "UNFORGETTABLE EXPERIENCES",
      subtitle: "Travel, play, and grow with our exclusive football tours and events",
      ctaText: "Explore Tours",
      ctaLink: "/tournaments"
    }
  ]

  useEffect(() => {
    if (activeSlides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeSlides.length])

  const slide = activeSlides[current]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <SafeImage
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={true}
            fallback="/window.svg"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 md:pt-32">
        <AnimatePresence mode="wait">
          <div key={current} className="flex flex-col items-center max-w-5xl w-full">
            {/* Animated Title */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center font-black italic tracking-tighter text-white leading-[0.9] mb-6 px-2"
            >
              {slide.title.split(' ').map((word, i) => (
                <span key={i} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl inline-block mx-1 sm:mx-2 uppercase">
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-10 font-medium drop-shadow-md px-4"
            >
              {slide.subtitle}
            </motion.p>

            {/* Animated Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href={slide.ctaLink}
                className="bg-gold text-black font-black uppercase text-xs sm:text-sm md:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white transition-all transform hover:scale-105 tracking-wide shadow-xl inline-block"
              >
                {slide.ctaText}
              </Link>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-gold' : 'w-2 bg-white/50 hover:bg-white'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
