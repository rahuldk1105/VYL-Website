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
  title: "Veeran Youth League (VYL) - Chennai",
  description: "Official site of Veeran Youth League (VYL), a CP Sports division based in Chennai, organizing football tournaments year-round.",
  keywords: "veeran youth league, vyl, football, chennai, cp sports",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <ContactCTA />
        <Footer />
      </body>
    </html>
  )
}
