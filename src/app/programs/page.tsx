import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Programs | Make Spanish Casual',
  description: 'Three free programs connecting authentic language education to health equity — Healthcare Spanish Initiative, Community Learning Platform, and Language Access Advocacy.',
}

const programs = [
  {
    name: 'Healthcare Spanish Initiative',
    tagline: 'The Spanish your patients are actually speaking.',
    description:
      'Authentic, culturally grounded Spanish training for the next generation of healthcare providers, students, and community health workers. Built on language acquisition research and designed for the clinical settings where communication failures cost lives.',
    audience: 'Pre-health students, nursing students, community health workers, providers',
    ctaLabel: 'Learn More',
    ctaHref: '/programs/healthcare-spanish',
    accent: '#1A6B72',
    bg: '#E8F4F5',
    highlights: [
      'Colloquial vs. clinical Spanish',
      'Culturally authentic patient communication',
      'Research-backed curriculum',
      'Free enrollment',
    ],
  },
  {
    name: 'Community Learning Platform',
    tagline: 'Real Spanish. Free. For everyone.',
    description:
      'Free courses, slang guides, and collaborative learning spaces for anyone who wants to speak Spanish the way it\'s actually spoken — with slang, cultural context, and real-world confidence.',
    audience: 'General learners, heritage speakers, students',
    ctaLabel: 'Start Learning',
    ctaHref: '/courses',
    accent: '#E8A020',
    bg: '#FEF3D0',
    highlights: [
      'Slang & street Spanish',
      'Conversational confidence',
      'Culture & identity',
      'Community practice spaces',
    ],
  },
  {
    name: 'Language Access Advocacy',
    tagline: 'Language access is a civil right.',
    description:
      'Policy resources, research, and community education on language rights. From Capitol Hill to the classroom, MSC advocates for the systemic changes that individual education alone can\'t achieve.',
    audience: 'Advocates, community organizations, policymakers, anyone who cares',
    ctaLabel: 'Get Involved',
    ctaHref: '/programs/advocacy',
    accent: '#E05C4B',
    bg: '#FDECEA',
    highlights: [
      'Language rights resources',
      'Capitol Hill advocacy',
      'Legislation we support',
      'Partnership opportunities',
    ],
  },
]

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#1A6B72' }} className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            Our Programs
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Three programs. One mission.
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Everything MSC does is free — and everything connects back to equitable language access.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F6F1' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-8">
            {programs.map((program, i) => (
              <div
                key={program.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-10">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: program.accent }}>
                      Program {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1E' }}>{program.name}</h2>
                    <p className="text-base italic font-medium mb-5" style={{ color: program.accent }}>
                      "{program.tagline}"
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed mb-5">{program.description}</p>
                    <p className="text-sm text-gray-500 mb-7">
                      <span className="font-semibold">For:</span> {program.audience}
                    </p>
                    <Link
                      href={program.ctaHref}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{ backgroundColor: program.accent }}
                    >
                      {program.ctaLabel}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="p-8 lg:p-10 flex items-center" style={{ backgroundColor: program.bg }}>
                    <div className="w-full">
                      <p className="text-sm font-semibold mb-4" style={{ color: program.accent }}>
                        What's included
                      </p>
                      <ul className="space-y-3">
                        {program.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: program.accent }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C1C1E' }}>
            All programs are free. Always.
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-lg mx-auto">
            Create one account to access every MSC program, course, and resource.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#1A6B72' }}
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  )
}
