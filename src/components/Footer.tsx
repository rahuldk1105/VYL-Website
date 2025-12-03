import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="relative w-12 h-12">
                <Image src="/veeran_logo.png" alt="VYL logo" fill className="object-contain" />
              </span>
              <h3 className="text-2xl font-black uppercase">Veeran Youth League</h3>
            </div>
            <p className="text-white/80 max-w-sm">
              India’s biggest youth football events with grassroots leagues, tournaments and competitions for 5 to 18 year olds across the country.
            </p>
          </div>

          {/* Our brands */}
          <div>
            <h4 className="font-black uppercase mb-4">Our Brands</h4>
            <ul className="space-y-2">
              <li><span>VYL Chennai League</span></li>
              <li><span>VYL Winter Cup</span></li>
              <li><span>VYL Season 1</span></li>
              <li><span>VYL Season 2</span></li>
              <li><span>VYL Junior League</span></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black uppercase mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link href="/events" className="hover:underline">Events</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/gallery" className="hover:underline">Galleries</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Code of Conduct</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-black uppercase mb-4">Social</h4>
            <div className="flex items-center gap-4">
              <a aria-label="Instagram" href="#" className="hover:opacity-80"><Instagram className="h-6 w-6" /></a>
              <a aria-label="Facebook" href="#" className="hover:opacity-80"><Facebook className="h-6 w-6" /></a>
              <a aria-label="YouTube" href="#" className="hover:opacity-80"><Youtube className="h-6 w-6" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/30 pt-6 text-center">
          <p className="text-white/80">© Veeran Youth League · CP Sports</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
