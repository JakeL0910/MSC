import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Downloads | Make Spanish Casual',
  description: 'Free downloadable resources from Make Spanish Casual — program guides, resource catalogs, partnership information, and donation impact sheets.',
}

const docs = [
  {
    title: 'MSC Overview',
    description: 'One-page organizational overview covering mission, all three programs, who we serve, and how to get involved. Perfect for sharing with colleagues, administrators, or community members.',
    filename: 'msc-overview.pdf',
    badge: 'Organization',
    badgeColor: 'bg-msc-teal text-white',
    pages: '1 page',
    useCase: 'General introduction, tabling events, partner outreach',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Healthcare Spanish Initiative',
    description: 'Comprehensive program guide covering the problem MSC solves, who the HSI is for, the five-module curriculum, learning outcomes, and how to enroll. Built for healthcare audiences.',
    filename: 'healthcare-spanish-initiative.pdf',
    badge: 'Program',
    badgeColor: 'bg-msc-coral text-white',
    pages: '1 page',
    useCase: 'Medical schools, hospitals, pre-health programs, clinical staff',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Free Resource Catalog',
    description: 'Complete catalog of all 12 free resources — lessons, activities, games, and quizzes — organized by type with difficulty level, duration, ratings, and descriptions for each.',
    filename: 'resource-catalog.pdf',
    badge: 'Resources',
    badgeColor: 'bg-msc-teal text-white',
    pages: '1 page',
    useCase: 'Classroom distribution, learner onboarding, program overviews',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Partnership Guide',
    description: 'Guide for healthcare systems, universities, K–12 schools, and community organizations interested in partnering with MSC. Covers partnership types, what MSC provides, and the engagement process.',
    filename: 'partnership-guide.pdf',
    badge: 'Partnerships',
    badgeColor: 'bg-msc-amber text-msc-charcoal',
    pages: '1 page',
    useCase: 'Institutional meetings, administrator presentations, grant applications',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Donation Impact Sheet',
    description: 'Fundraising one-pager showing the impact of donations at $25, $50, $100, and $250 levels. Includes organization facts, how to give, and MSC\'s 501(c)3 tax-deductible status.',
    filename: 'donation-impact.pdf',
    badge: 'Fundraising',
    badgeColor: 'bg-msc-amber text-msc-charcoal',
    pages: '1 page',
    useCase: 'Donor outreach, fundraising events, grant writing support',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function DownloadsPage() {
  return (
    <>
      <section className="bg-msc-teal pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Downloads</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Free printable guides &amp; resources.
          </h1>
          <p className="text-lg text-white/85 max-w-xl leading-relaxed">
            Everything about MSC — programs, resources, partnerships, and impact — in print-ready PDF format. Share them, hand them out, include them in applications.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-5">
            {docs.map((doc) => (
              <div key={doc.filename} className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col sm:flex-row gap-6 items-start">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center">
                  {doc.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${doc.badgeColor}`}>
                      {doc.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{doc.pages} · PDF</span>
                  </div>
                  <h2 className="text-lg font-bold text-msc-charcoal mb-2">{doc.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{doc.description}</p>
                  <p className="text-xs text-gray-400">
                    <span className="font-semibold text-gray-500">Best for:</span> {doc.useCase}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 flex flex-col gap-2 sm:items-end">
                  <a
                    href={`/downloads/${doc.filename}`}
                    download={doc.filename}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </a>
                  <a
                    href={`/downloads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold text-sm border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Usage note */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-7">
            <h3 className="text-base font-bold text-msc-charcoal mb-2">Use these freely.</h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              All MSC materials are free to download, print, share, and distribute — in classrooms, clinical settings, community events, grant applications, or wherever they're useful. Attribution to Make Spanish Casual is appreciated but not required.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/programs" className="text-sm font-semibold text-msc-teal hover:underline">
                Explore our programs →
              </Link>
              <Link href="/partner" className="text-sm font-semibold text-msc-teal hover:underline">
                Partner with us →
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-msc-teal hover:underline">
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
