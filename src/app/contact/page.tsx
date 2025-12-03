import SafeImage from '@/components/SafeImage'
import Link from 'next/link'
import ClientContactForm from '@/components/ClientContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div id="form" className="container pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <h2 className="font-black uppercase text-2xl">Contact Details</h2>
            <div className="space-y-2 text-white/90">
              <p>Email: info@vylleague.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Chennai, Tamil Nadu, India</p>
            </div>
          </div>

          <ClientContactForm />
        </div>
      </div>
    </div>
  )
}
