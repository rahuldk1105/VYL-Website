'use client'

import Link from 'next/link'
import SafeImage from '@/components/SafeImage'

interface HeroCarouselProps {
  slides?: any[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  return (
    <div className="relative h-screen">
      <SafeImage
        src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
        alt="Football hero"
        fill
        className="object-cover"
        fallback="/window.svg"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
        <h1 className="flex flex-col items-center justify-center font-black italic tracking-tighter text-white leading-[0.9] mb-6">
          <span className="text-5xl md:text-7xl lg:text-9xl">INDIA'S</span>
          <span className="text-5xl md:text-7xl lg:text-9xl">BIGGEST YOUTH</span>
          <span className="text-5xl md:text-7xl lg:text-9xl">FOOTBALL EVENTS</span>
        </h1>
        
        <p className="text-white text-lg md:text-xl max-w-2xl mb-10 font-medium drop-shadow-md">
          Grassroots football leagues, tournaments, tours, camps and more for 5 to 18 year olds across Tamilnadu
        </p>
        <Link
          href="/events"
          className="bg-white text-black font-black uppercase text-sm px-8 py-4 rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 tracking-wide shadow-xl"
        >
          View Our Events
        </Link>
      </div>
    </div>
  )
}
