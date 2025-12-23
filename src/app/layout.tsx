import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ContactCTA from "@/components/ContactCTA"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.veeranyouthleague.com'),
  title: {
    default: "Veeran Youth League (VYL) - Premium Football Experience in Chennai",
    template: "%s | Veeran Youth League"
  },
  description: "Official site of Veeran Youth League (VYL). We organize premium football tournaments, leagues, and grassroots development programs across India for young athletes.",
  keywords: [
    "veeran youth league", "VYL", "football tournaments India", "youth football leagues",
    "grassroots football development", "football events Chennai", "kids football tournament",
    "u13 football league", "u15 football tournament", "soccer tournaments India",
    "football academy matches", "youth sports events", "football competition registration"
  ],
  authors: [{ name: "Veeran Youth League" }],
  creator: "Veeran Youth League",
  publisher: "Veeran Youth League",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Veeran Youth League (VYL) - Developing Future Stars",
    description: "Join India's premier youth football league. Professional tournaments, expert coaching, and a platform for young talent to shine.",
    url: 'https://www.veeranyouthleague.com',
    siteName: 'Veeran Youth League',
    images: [
      {
        url: '/VYL-favicon.png', // We'll want to replace this with a proper OG image later if available
        width: 800,
        height: 600,
        alt: 'Veeran Youth League Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Veeran Youth League (VYL)",
    description: "Premium youth football tournaments and development leagues in India.",
    images: ['/VYL-favicon.png'], // consistent with OG
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/VYL-favicon.png',
    shortcut: '/VYL-favicon.png',
    apple: '/VYL-favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ContactCTA />
        <Footer />
      </body>
    </html>
  )
}
