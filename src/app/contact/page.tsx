import SafeImage from '@/components/SafeImage'
import ClientContactForm from '@/components/ClientContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh]">
        <SafeImage
          src="/images/headers/page-hero.jpg"
          alt="Contact hero"
          fill
          className="object-cover"
          fallback="/window.svg"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container h-full flex items-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-3 sm:mb-4">Contact Us</h1>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl">
              Get in touch with us for partnerships, inquiries, and more.
            </p>
          </div>
        </div>
      </div>
      <div id="form" className="container pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          <div className="space-y-6">
            <h2 className="font-black uppercase text-2xl">Contact Details</h2>
            <div className="space-y-2 text-white/90">
              <p>Email: contact@veerancup.in</p>
              <p>Phone: +91 7904441579</p>
              <p>Address: Pallavaram, Chennai, Tamil Nadu, India</p>
            </div>
          </div>

          <ClientContactForm />
        </div>
      </div>
    </div>
  )
}
