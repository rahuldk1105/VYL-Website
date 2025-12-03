'use client'

import Link from 'next/link'
import SafeImage from '@/components/SafeImage'

export default function ContactCTA() {
  return (
    <section className="relative h-[60vh]">
      <SafeImage
        src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6"
        alt="Contact background"
        fill
        className="object-cover"
        fallback="/window.svg"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
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

