import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import PhraseLibrary from '@/components/features/PhraseLibrary'

export const metadata: Metadata = {
  title: 'Healthcare Phrase Library',
  description:
    'Free searchable Spanish–English phrase cards for clinic visits, pharmacy questions, insurance conversations, and appointments.',
}

export default function PhraseLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool"
        title="Healthcare Phrase Library"
        description="Searchable Spanish–English phrases for real healthcare moments: making appointments, describing symptoms, asking the pharmacist, and understanding a bill. Practice them before a visit or pull them up in the moment."
      />

      <section className="py-16 bg-msc-cream/50">
        <div className="container">
          <PhraseLibrary />

          <div className="max-w-2xl mx-auto mt-14 bg-white rounded-2xl border border-gray-100 shadow-sm p-7 text-center">
            <h2 className="text-lg font-bold text-msc-charcoal mb-2">A note on interpretation</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              These phrases are educational support for everyday communication. For medical
              conversations — diagnoses, consent, treatment decisions — you have the right to ask
              for a professional interpreter: <em>“Quisiera un intérprete, por favor.”</em> This
              library is never a substitute for one.
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Want printable phrase cards?{' '}
            <Link href="/resources?category=healthcare-spanish" className="text-msc-teal font-semibold hover:underline">
              Download them from the Resource Hub
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Know a phrase we're missing?"
        description="Bilingual volunteers grow this library one situation at a time. Suggest a phrase or join the review team."
        primary={{ label: 'Suggest a Phrase', href: '/contact' }}
        secondary={{ label: 'Join as a Translator', href: '/volunteer' }}
      />
    </>
  )
}
