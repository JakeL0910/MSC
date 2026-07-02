import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import Scorecard from '@/components/features/Scorecard'

export const metadata: Metadata = {
  title: 'Communication Access Scorecard',
  description:
    'A free 10-question self-assessment for schools, clinics, libraries, and nonprofits: how easy are your materials to understand, and how language-accessible are they?',
}

export default function ScorecardPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool · For organizations"
        title="Communication Access Scorecard"
        description="Ten yes-or-no questions that reveal how accessible your organization's communication really is — for multilingual families, busy parents, and readers at every level. Check what's true today, then see your score."
      />

      <section className="py-16 bg-msc-cream/50">
        <div className="container">
          <Scorecard />

          <p className="text-center text-sm text-gray-500 mt-10">
            Prefer a printable version?{' '}
            <Link
              href="/resources/communication-access-scorecard-guide"
              className="text-msc-teal font-semibold hover:underline"
            >
              Download the checklist PDF
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Scored lower than you hoped?"
        description="That's the normal result — and the fixable one. MSC partners with organizations on plain-language rewrites, translations, and quick wins."
        primary={{ label: 'Partner With MSC', href: '/partners' }}
        secondary={{ label: 'Get the Plain-Language Guide', href: '/resources/plain-language-writing-guide' }}
      />
    </>
  )
}
