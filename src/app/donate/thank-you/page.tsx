import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/shared/Icons'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your donation to MLC was received.',
  robots: { index: false },
}

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-msc-teal-light/70 via-white to-msc-amber-light/40">
      <div className="animate-blob pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
      <div className="container relative py-24 md:py-32 text-center max-w-2xl">
        <span className="animate-enter w-16 h-16 rounded-2xl bg-msc-teal text-white flex items-center justify-center mx-auto mb-7">
          <Icon name="heart" className="w-8 h-8" />
        </span>
        <h1 className="animate-enter enter-delay-1 text-4xl md:text-5xl font-bold text-msc-charcoal mb-5">
          Thank you. Truly.
        </h1>
        <p className="animate-enter enter-delay-2 serif-lead text-lg text-gray-600 leading-relaxed mb-4">
          Your gift funds free multilingual resources, volunteer tutoring, and language tools
          for families who need them, and it goes to work right away.
        </p>
        <p className="animate-enter enter-delay-2 text-sm text-gray-500 mb-9">
          A receipt from Stripe is on its way to your inbox. {site.legalLine}
          {site.ein && ` · ${site.ein}`}. Questions?{' '}
          <a href={`mailto:${site.email}`} className="text-msc-teal font-semibold hover:underline">
            {site.email}
          </a>
        </p>
        <div className="animate-enter enter-delay-3 flex flex-wrap justify-center gap-3">
          <Link href="/impact" className="btn-secondary">See the impact</Link>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-msc-charcoal hover:text-msc-teal transition-colors">
            Back to home →
          </Link>
        </div>
      </div>
    </section>
  )
}
