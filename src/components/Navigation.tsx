'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])
  const menu = [
    { href: '/events', label: 'EVENTS' },
    { href: '/apps', label: 'APPS' },
    { href: '/gallery', label: 'GALLERIES' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isHome ? (isScrolled ? 'bg-black' : 'bg-black/30 backdrop-blur-sm') : 'bg-black'} py-10`}>
      <div className="container flex items-center justify-between text-white">
        <div className="flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden md:inline-block font-black uppercase text-base md:text-lg tracking-wide hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[1%]">
          <Link href="/">
            <span className="relative block h-33 w-33">
              <Image src="/veeran_logo.png" alt="Veeran Youth League logo" fill className="object-contain" priority />
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            href="/join"
            className="bg-white text-black font-black uppercase text-sm md:text-base px-6 py-3 rounded-full hover:bg-gray-200 transition-colors tracking-wide"
          >
            Join an Event
          </Link>
        </div>
      </div>
    </nav>
  )
}
