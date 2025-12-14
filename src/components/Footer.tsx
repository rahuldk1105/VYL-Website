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

          {/* Contact */}
          <div>
            <h4 className="font-black uppercase mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <strong className="block text-white">General Inquiries:</strong>
                <a href="mailto:admin@cpsports.in" className="hover:text-gold block">admin@cpsports.in</a>
              </li>
              <li>
                <strong className="block text-white">Call Us:</strong>
                <span className="block">Priya: +91 79044 41579</span>
                <span className="block">Lokesh: +91 89255 15619</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-black uppercase mb-4">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a aria-label="Instagram" href="https://instagram.com/veeran_youth_league" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-gold hover:text-black transition-colors"><Instagram className="h-5 w-5" /></a>
              <a aria-label="Facebook" href="https://facebook.com/veeran_youth_league" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-gold hover:text-black transition-colors"><Facebook className="h-5 w-5" /></a>
              <a aria-label="YouTube" href="https://youtube.com" target="_blank" className="bg-white/10 p-2 rounded-full hover:red-600 hover:text-white transition-colors"><Youtube className="h-5 w-5" /></a>
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
