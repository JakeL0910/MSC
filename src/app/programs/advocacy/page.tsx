import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Language Access Advocacy | Make Spanish Casual',
  description: 'MSC advocates for policy changes that make equitable communication possible — in healthcare, education, and beyond. Language access is a civil right.',
}

const legislation = [
  {
    name: 'World Language Advancement and Readiness Act',
    description: 'Expands access to language education in underserved schools, recognizing that language learning is a critical educational equity issue.',
  },
  {
    name: 'Bilingual Education Seal and Teaching Act',
    description: 'Creates a federal bilingual educator credential and supports bilingual instruction, strengthening language access at the classroom level.',
  },
  {
    name: 'Native American Language Resource Center Act',
    description: 'Supports the preservation and teaching of Native American languages, recognizing Indigenous language rights as part of broader language access.',
  },
]

const getInvolved = [
  {
    title: 'Follow advocacy updates',
    description: 'Stay informed on MSC\'s advocacy work and upcoming NNELL Language Advocacy Days events.',
  },
  {
    title: 'Attend advocacy events',
    description: 'Participate in NNELL\'s Language Advocacy Days, where advocates meet with legislators to advance language education policy.',
  },
  {
    title: 'Partner with MSC',
    description: 'Bring language access resources and advocacy programming to your organization, school, or community group.',
  },
  {
    title: 'Volunteer',
    description: 'Support MSC\'s advocacy work as a language advocate, educator, or event volunteer in the DFW area or online.',
  },
]

export default function AdvocacyPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#E05C4B' }} className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            Language Access Advocacy
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 max-w-3xl">
            Language access is a civil right.
          </h1>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            MSC advocates for the policy changes that make equitable communication possible — in healthcare, education, and beyond.
          </p>
        </div>
      </section>

      {/* The Legal Landscape */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#E05C4B' }}>
              Legal Framework
            </p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
              You have rights. Know them.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              Under Title VI of the Civil Rights Act of 1964 and Executive Order 13166, organizations receiving federal funding are required to provide meaningful access to people with limited English proficiency. In practice, these protections are unevenly enforced — and many patients and community members don't know their rights.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              MSC publishes plain-language resources on language access rights for patients, families, and community organizations.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-colors" style={{ borderColor: '#E05C4B', color: '#E05C4B' }}>
              Know Your Language Rights
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-2">Download coming soon — contact us to be notified.</p>
          </div>
        </div>
      </section>

      {/* Legislation */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FDECEA' }}>
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#E05C4B' }}>
            Policy
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#1C1C1E' }}>
            Legislation we support
          </h2>
          <p className="text-base text-gray-600 mb-10 max-w-2xl">
            MSC has advocated for these bills at Virtual Language Advocacy Days (2024) and on Capitol Hill (2025, 2026) through the National Network for Early Language Learning (NNELL).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {legislation.map((bill) => (
              <div key={bill.name} className="bg-white rounded-2xl p-7 shadow-sm border border-red-50">
                <div className="w-8 h-8 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: '#E05C4B' }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#1C1C1E' }}>{bill.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{bill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MSC Advocacy Work */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#E05C4B' }}>
                Our Work
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
                From the classroom to Capitol Hill
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-5">
                MSC founder Jake Li has advocated for language legislation alongside U.S. Representatives Lloyd Doggett and Jasmine Crockett and Senator Ted Cruz through NNELL's Language Advocacy Days — both virtually (2024) and in person on Capitol Hill (2025, 2026).
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                This work connects directly to MSC's mission: systemic change in language access policy creates the conditions in which individual education programs — like ours — can have real impact.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#FDECEA' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#E05C4B' }}>2024</div>
                <div className="text-sm text-gray-600 leading-tight">Virtual Language Advocacy Days with NNELL</div>
              </div>
              <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#FDECEA' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#E05C4B' }}>2025</div>
                <div className="text-sm text-gray-600 leading-tight">Capitol Hill advocacy, Washington D.C.</div>
              </div>
              <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#FDECEA' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#E05C4B' }}>2026</div>
                <div className="text-sm text-gray-600 leading-tight">Capitol Hill advocacy, Washington D.C.</div>
              </div>
              <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: '#FDECEA' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: '#E05C4B' }}>3</div>
                <div className="text-sm text-gray-600 leading-tight">bills supported in 116th–119th Congress</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F6F1' }}>
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#E05C4B' }}>
            Get Involved
          </p>
          <h2 className="text-3xl font-bold mb-10" style={{ color: '#1C1C1E' }}>
            How to take action
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {getInvolved.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h3 className="text-base font-bold mb-2" style={{ color: '#1C1C1E' }}>{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#E05C4B' }}
            >
              Contact Us
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: '#E05C4B', color: '#E05C4B' }}
            >
              Partner With MSC
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
