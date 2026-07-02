import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import FlashcardStudy from '@/components/features/FlashcardStudy'

export const metadata: Metadata = {
  title: 'MSC Learn',
  description:
    'Free flashcard mini-lessons for healthcare vocabulary and everyday communication — clinic basics, pharmacy terms, insurance vocabulary, and practical phrases.',
}

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool · MSC Learn"
        title="Mini-lessons that fit in a bus ride"
        description="Pick a deck, flip through the cards, and build vocabulary for real situations — no account, no streaks, no pressure. Each deck takes about five minutes."
      />

      <section className="py-16 bg-msc-cream/50">
        <div className="container max-w-4xl">
          <FlashcardStudy />

          <p className="text-center text-sm text-gray-500 mt-12">
            Prefer paper? Many decks have printable versions in the{' '}
            <Link href="/resources" className="text-msc-teal font-semibold hover:underline">
              Resource Hub
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Help us build the next deck"
        description="Volunteers propose and review every card. If you know the vocabulary a community needs, turn it into a deck."
        primary={{ label: 'Contribute a Deck', href: '/volunteer#contribute' }}
        secondary={{ label: 'Request a Topic', href: '/contact' }}
      />
    </>
  )
}
