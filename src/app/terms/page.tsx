import { Scale, Book, Ban, AlertTriangle, FileText } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Veeran Youth League',
  description: 'Terms of Service for Veeran Youth League users and participants.'
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,160,0,0.1),transparent_50%)] z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(25,118,210,0.1),transparent_50%)] z-0 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-12 px-4 border-b border-white/10 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-4 h-4" />
            Legal Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Please read these terms carefully before exploring our website or participating in our tournaments.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: December 25, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-16">

          {/* Section 1 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <Book className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">1. Agreement to Terms</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Veeran Youth League ("we," "us" or "our"), concerning your access to and use of our website and services.
                  </p>
                  <p>
                    By accessing the website or registering for our events, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the site and must discontinue use immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">2. User Registration</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    You may be required to register with the Site to participate in tournaments. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <Ban className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">3. Prohibited Activities</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
                    <li>Engage in unauthorized framing of or linking to the Site.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">4. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                  </p>
                  <p>
                    Participation in sports events carries inherent risks. By registering, you acknowledge these risks and agree that Veeran Youth League is not liable for injuries sustained during our events.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
