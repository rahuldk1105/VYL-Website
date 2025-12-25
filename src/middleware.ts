import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authToken = request.cookies.get('auth-token')?.value

  // Protect admin routes
  if (path.startsWith('/admin')) {
    if (!authToken || authToken !== 'sb-session-active') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next()

  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://api.web3forms.com https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com https://cdn.sanity.io https://*.cloudflarestorage.com; font-src 'self'; connect-src 'self' https://api.web3forms.com https://*.supabase.co https://*.cloudflarestorage.com https://vercel.live; frame-src 'self' https://forms.zohopublic.in;"
  )

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|models|images|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
}