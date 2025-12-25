'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, User } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    // 1. Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })

    // 2. Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
      // Sync cookie for middleware
      if (session) {
        document.cookie = `auth-token=sb-session-active; path=/; max-age=${session.expires_in}; SameSite=Lax`
      } else {
        document.cookie = 'auth-token=; path=/; max-age=0'
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const menu = [
    { href: '/tournaments', label: 'TOURNAMENTS' },
    { href: '/gallery', label: 'GALLERIES' },
    { href: '/contact', label: 'CONTACT' },
  ]

  // Admin menu items (only shown when authenticated)
  const adminMenu = [
    { href: '/admin', label: 'ADMIN DASHBOARD' },
    { href: '/admin/index-faces', label: 'FACE INDEXING' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome && !isScrolled && !isMenuOpen ? 'bg-transparent py-6 md:py-10' : 'bg-black py-4 md:py-6'}`}>
        <div className="container flex items-center justify-between text-white relative">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2 hover:text-gold transition-colors z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-3' : ''}`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-black uppercase text-sm lg:text-base tracking-wide hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && adminMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-black uppercase text-sm lg:text-base tracking-wide hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logo - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <div className="relative h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28 transition-all duration-300">
                <Image
                  src="/veeran_logo.png"
                  alt="Veeran Youth League logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Side CTA */}
          <div className="flex items-center gap-4 z-50">
            <Link
              href="/find-a-tournament"
              className="bg-gold text-black font-black uppercase text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-white hover:text-black transition-colors tracking-wide shadow-lg"
            >
              <span className="hidden sm:inline">Join Now !</span>
              <span className="sm:hidden">Join</span>
            </Link>

            {/* Authentication buttons */}
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  // Cookie is cleared by onAuthStateChange listener
                  router.push('/')
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Admin Login"
              >
                <User className="w-5 h-5 text-white" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-3xl font-black uppercase text-white tracking-wider hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && adminMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-3xl font-black uppercase text-white tracking-wider hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs text-center">
            <p className="text-gray-400 mb-4 text-sm uppercase tracking-widest">Connect With Us</p>
            <div className="flex justify-center gap-6">
              {/* Social placeholders could go here */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
