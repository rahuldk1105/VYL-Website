

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using the Veeran Youth League (VYL) website and services, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our website or services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Your continued use of our services after any changes
                constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Services</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You must be at least 18 years old or have parental consent to use our services. By using our services,
                you represent and warrant that you meet these eligibility requirements.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Account</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities
                that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Conduct</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Upload or transmit viruses, malware, or other harmful code</li>
                <li>Impersonate any person or entity or falsely state your affiliation</li>
                <li>Collect or harvest personal information of other users</li>
                <li>Use our services to send spam or unsolicited communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Event Registration and Participation</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Registration Requirements</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When registering for events, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Meet all eligibility requirements for the specific event</li>
                <li>Pay all applicable fees and charges</li>
                <li>Comply with event rules and regulations</li>
                <li>Provide required medical information and waivers</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellation and Refunds</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cancellation policies vary by event and are specified during registration. Generally:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Cancellations made 30+ days before event: Full refund minus processing fees</li>
                <li>Cancellations made 15-29 days before event: 50% refund</li>
                <li>Cancellations made less than 15 days: No refund</li>
                <li>Event cancellations by organizer: Full refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fees and Charges</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                All fees are stated in the currency specified for each event. You are responsible for any applicable taxes,
                currency conversion fees, or bank charges.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Processing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use secure third-party payment processors. By providing payment information, you authorize us and our
                payment processors to charge the specified amounts.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Late Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Late payments may result in registration cancellation and additional fees. We reserve the right to
                suspend or terminate accounts with outstanding balances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Ownership</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content on our website and related to our services, including text, graphics, logos, images, and software,
                is the property of Veeran Youth League (VYL) or our licensors and is protected by intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Limited License</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal,
                non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Content</h3>
              <p className="text-gray-600 leading-relaxed">
                By submitting content to our services, you grant us a worldwide, royalty-free license to use, reproduce,
                modify, and display such content for promotional and operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimers and Limitation of Liability</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Disclaimers</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not guarantee
                that our services will be uninterrupted, error-free, or secure.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Disclaimers</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Participation in sports events involves inherent risks. You acknowledge and assume all risks associated
                with event participation. We are not responsible for injuries, damages, or losses resulting from event participation.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, Veeran Youth League (VYL) shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify and hold Veeran Youth League (VYL), its affiliates, officers, agents, and employees harmless
                from any claims, demands, losses, liabilities, and expenses (including attorneys&apos; fees) arising from your
                use of our services, violation of these terms, or infringement of any rights of another.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your access to our services at any time, with or without cause,
                and without prior notice. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of India.
                Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Chennai, Tamil Nadu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-600 space-y-2">
                <p><strong>Email:</strong> legal@vylleague.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong></p>
                <p className="ml-4">
                  Veeran Youth League<br />
                  Chennai, Tamil Nadu<br />
                  India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
