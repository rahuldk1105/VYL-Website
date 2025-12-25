import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Veeran Youth League',
  description: 'Privacy Policy for Veeran Youth League users and participants.'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,160,0,0.1),transparent_50%)] z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(25,118,210,0.1),transparent_50%)] z-0 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-12 px-4 border-b border-white/10 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider mb-6">
            <Shield className="w-4 h-4" />
            Legal Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Your privacy is critically important to us. This policy details how Veeran Youth League collects, uses, and protects your personal information.
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
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">1. Introduction</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    Welcome to Veeran Youth League ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regards to your personal information, please contact us at contact@veerancup.in.
                  </p>
                  <p>
                    When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">2. Information We Collect</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as registering for a tournament), or otherwise when you contact us.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li><strong>Personal Data:</strong> Name, email address, phone number, date of birth, and gender of participants.</li>
                    <li><strong>Media:</strong> Photos and videos taken during events which may include your likeness.</li>
                    <li><strong>Face Data:</strong> If you use our "Find My Photos" feature, we process your facial geometry to match your selfie with photos in our gallery. This biometric data is transient and is used solely for the purpose of searching for your photos.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">3. How We Use Your Data</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li>To facilitate account creation and logon process.</li>
                    <li>To send administrative information to you.</li>
                    <li>To fulfill and manage your orders and tournament registrations.</li>
                    <li>To post testimonials and event highlights.</li>
                    <li>To deliver and facilitate delivery of services to the user.</li>
                    <li>To respond to user inquiries/offer support to users.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gold">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">4. Contact & Security</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-left">
                  <p>
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                  </p>
                  <p>
                    If you have questions or comments about this policy, you may email us at <a href="mailto:contact@veerancup.in" className="text-gold hover:underline">contact@veerancup.in</a>.
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
