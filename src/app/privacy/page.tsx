

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200">Last updated: January 2024</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Veeran Youth League (VYL), we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our website and services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree with any part of this policy,
                please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Date of birth and age verification</li>
                <li>Sports affiliation and team information</li>
                <li>Payment information for event registration</li>
                <li>Emergency contact information</li>
                <li>Medical information relevant to sports participation</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device and usage, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>IP address and browser information</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Processing event registrations and payments</li>
                <li>Communicating with you about events, updates, and important information</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Improving our website, services, and user experience</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Ensuring safety and compliance with event regulations</li>
                <li>Preventing fraud and maintaining security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our business</li>
                <li><strong>Event Partners:</strong> With sports organizations, venues, and sponsors for event coordination</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of business assets</li>
                <li><strong>With Your Consent:</strong> For any other purpose with your explicit permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Encryption of sensitive data during transmission and storage</li>
                <li>Secure payment processing through PCI-compliant providers</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication procedures</li>
                <li>Staff training on data protection and privacy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Objection to processing of your information</li>
                <li>Data portability</li>
                <li>Withdrawal of consent for marketing communications</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and processed within India. We ensure appropriate safeguards are in place for all processing activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal information
                from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting
                the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after
                any changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="text-gray-600 space-y-2">
                <p><strong>Email:</strong> contact@veerancup.in</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong></p>
                <p className="ml-4">
                  Veeran Youth League<br />
                  Chennai, Tamil Nadu<br />
                  India
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                For privacy-related inquiries, you may also contact our Data Protection Officer at <strong>contact@veerancup.in</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
