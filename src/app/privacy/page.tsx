import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Make Spanish Casual',
  description: 'Privacy Policy for Make Spanish Casual. We respect your privacy and will never sell your data.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-msc-teal pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Legal</p>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/80 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-14 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Make Spanish Casual is committed to your privacy. We collect minimal data, we never sell it, and we use it only to provide and improve our free educational programs.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              If you create an account: your name, email address, and the role you selected (e.g., "pre-health student"). We also collect usage data (which resources you access, progress on courses) to personalize your experience.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">How We Use It</h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to provide access to MSC programs, track your learning progress, and send occasional updates about new resources (if you opt in). We do not use your data for advertising.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">We Will Never Sell Your Data</h2>
            <p className="text-gray-600 leading-relaxed">
              MSC is a nonprofit. Our mission is language access, not monetizing your information. We do not sell, trade, or share your personal data with third parties for commercial purposes.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use essential cookies to keep you signed in and to understand aggregate site usage (e.g., Google Analytics in anonymized form). No tracking cookies for advertising.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You may request access to, correction of, or deletion of your data at any time by contacting us at{' '}
              <a href="mailto:jake@makespanishcasual.org" className="text-msc-teal hover:underline">
                jake@makespanishcasual.org
              </a>.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">Children</h2>
            <p className="text-gray-600 leading-relaxed">
              MSC's programs are available to users of all ages. We take particular care with accounts belonging to minors and do not knowingly collect sensitive personal information from children under 13 without parental consent.
            </p>
          </div>

          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/terms" className="text-msc-teal hover:underline font-medium">Terms of Service</Link>
            <Link href="/contact" className="text-msc-teal hover:underline font-medium">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
