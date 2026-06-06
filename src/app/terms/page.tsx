import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Make Spanish Casual',
  description: 'Terms of Service for Make Spanish Casual — a free, open-access nonprofit language education platform.',
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-msc-teal pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Legal</p>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/80 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-14 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Make Spanish Casual ("MSC", "we", "our") is a 501(c)3 nonprofit organization. By using makespanishcasual.org or any MSC platform, you agree to these terms. Our programs are free and always will be.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">1. Free Access</h2>
            <p className="text-gray-600 leading-relaxed">
              All MSC resources, courses, and programs are provided free of charge. We will never charge for access to educational content. Donations are voluntary and tax-deductible.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">2. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              You may create a free account to track progress and access community features. You are responsible for maintaining the security of your account credentials. We do not sell user data.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">3. Content Use</h2>
            <p className="text-gray-600 leading-relaxed">
              MSC's educational content is for personal, non-commercial use. You may share MSC resources for educational purposes with attribution. You may not reproduce or redistribute content commercially.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">4. Community Standards</h2>
            <p className="text-gray-600 leading-relaxed">
              MSC is a community grounded in equity and respect. Harassment, discrimination, or conduct that undermines the safety or dignity of community members is grounds for removal.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">5. Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              MSC's healthcare Spanish content is educational and does not constitute medical advice. Clinical decisions should always involve qualified healthcare providers.
            </p>

            <h2 className="text-lg font-bold text-msc-charcoal mt-8 mb-3">6. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about these terms? Email{' '}
              <a href="mailto:jake@makespanishcasual.org" className="text-msc-teal hover:underline">
                jake@makespanishcasual.org
              </a>.
            </p>
          </div>

          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/privacy" className="text-msc-teal hover:underline font-medium">Privacy Policy</Link>
            <Link href="/contact" className="text-msc-teal hover:underline font-medium">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
