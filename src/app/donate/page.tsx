import type { Metadata } from 'next'
import Link from 'next/link'
import DonateForm from './DonateForm'

export const metadata: Metadata = {
  title: 'Donate | Make Spanish Casual',
  description: "Support free, culturally authentic Spanish education and health equity programs. Every dollar keeps MSC's programs free for everyone.",
}

const impacts = [
  { amount: '$25', label: 'Keeps one learner enrolled in the Healthcare Spanish Initiative for a full semester' },
  { amount: '$50', label: 'Funds new slang guides and cultural content for the community platform' },
  { amount: '$100', label: 'Supports a community event or advocacy workshop in the DFW area' },
  { amount: '$250', label: 'Helps MSC develop a new curriculum module and release it free to all learners' },
]

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-msc-teal pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Support MSC</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 max-w-2xl text-balance">
            Help us keep it free.
          </h1>
          <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
            Every resource, course, and program MSC offers is free. Your donation keeps it that way — and helps us expand the Healthcare Spanish Initiative.
          </p>
          {/* Trust signals */}
          <div className="flex flex-wrap gap-4 mt-7">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <svg className="w-4 h-4 text-msc-amber" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-xs font-semibold">Secure Processing</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <svg className="w-4 h-4 text-msc-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-white text-xs font-semibold">501(c)3 Nonprofit</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <svg className="w-4 h-4 text-msc-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-xs font-semibold">100% Funds Programs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-msc-teal">
                Why donate
              </p>
              <h2 className="text-3xl font-bold mb-6 text-msc-charcoal text-balance">
                Language access shouldn't have a price tag.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-5">
                MSC was built on the belief that authentic, culturally grounded language education should be available to everyone — regardless of income, background, or zip code. That means no subscriptions, no paywalls, no premium tiers.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-5">
                But free programs aren't free to run. Donations fund curriculum development, community events, advocacy work, and the platform infrastructure that keeps everything accessible.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed italic border-l-4 border-msc-amber pl-4">
                MSC is a 501(c)3 nonprofit. Donations are tax-deductible to the extent permitted by law.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {impacts.map((item) => (
                <div key={item.amount} className="flex items-start gap-4 bg-msc-cream rounded-2xl p-5">
                  <div className="flex-shrink-0 w-16 h-12 rounded-xl bg-msc-teal flex items-center justify-center text-base font-bold text-white">
                    {item.amount}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate Form */}
      <section className="py-16 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-center text-msc-teal">
              Make a donation
            </p>
            <h2 className="text-3xl font-bold mb-10 text-center text-msc-charcoal">
              Choose an amount
            </h2>
            <DonateForm />
          </div>
        </div>
      </section>

      {/* Other Ways */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-msc-charcoal">Other ways to support MSC</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-gray-100 p-7">
              <div className="w-9 h-9 rounded-xl bg-msc-teal-light text-msc-teal mb-4 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-base font-bold mb-2 text-msc-charcoal">Spread the word</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Share MSC with students, educators, and healthcare workers in your network.</p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-7">
              <div className="w-9 h-9 rounded-xl bg-msc-amber-light text-msc-amber mb-4 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold mb-2 text-msc-charcoal">Partner with us</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bring MSC's programs to your organization, school, or healthcare system.{' '}
                <Link href="/partner" className="font-medium hover:underline text-msc-teal">Learn more →</Link>
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-7">
              <div className="w-9 h-9 rounded-xl bg-msc-coral-light text-msc-coral mb-4 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold mb-2 text-msc-charcoal">Volunteer</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Support MSC events and advocacy work in the DFW area or online.{' '}
                <Link href="/contact" className="font-medium hover:underline text-msc-teal">Get in touch →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
