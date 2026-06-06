import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partner With MSC | Make Spanish Casual',
  description: 'We work with healthcare systems, universities, schools, and community organizations that share our commitment to equitable language access.',
}

const partnerTypes = [
  {
    type: 'Healthcare Organizations',
    description: 'Co-develop culturally competent Spanish training for staff; promote the Healthcare Spanish Initiative to pre-health students and employees. Help us bring authentic language education to the clinical settings where it matters most.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accent: '#1A6B72',
    bg: '#E8F4F5',
  },
  {
    type: 'Universities & Medical Schools',
    description: 'Integrate MSC\'s curriculum into pre-health or public health coursework; pursue research partnerships on language acquisition and health outcomes. We bring the curriculum — you bring the students.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    accent: '#E8A020',
    bg: '#FEF3D0',
  },
  {
    type: 'K-12 Schools & Districts',
    description: 'Bring language access education and advocacy programming to students. MSC resources are designed to work alongside existing language instruction — not replace it — and our advocacy content is age-appropriate and engaging.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    accent: '#1A6B72',
    bg: '#E8F4F5',
  },
  {
    type: 'Community Organizations',
    description: 'Language access resources, volunteer language education, and bilingual service support. MSC can help your organization communicate more effectively with Spanish-speaking community members — and advocate alongside you for systemic change.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: '#E05C4B',
    bg: '#FDECEA',
  },
]

export default function PartnerPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#1A6B72' }} className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            Partnerships
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 max-w-2xl">
            Partner with MSC
          </h1>
          <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
            We work with healthcare systems, universities, schools, and community organizations that share our commitment to equitable language access.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F6F1' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
              What Partnership Looks Like
            </p>
            <h2 className="text-3xl font-bold" style={{ color: '#1C1C1E' }}>
              Every partner relationship is different. Here's how we work together.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerTypes.map((partner) => (
              <div key={partner.type} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-3 flex items-center" style={{ backgroundColor: partner.bg }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: partner.accent, color: 'white' }}>
                    {partner.icon}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#1C1C1E' }}>{partner.type}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
                Why MSC
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
                What MSC brings to a partnership
              </h2>
              <ul className="space-y-4">
                {[
                  'Research-backed curriculum grounded in language acquisition science',
                  'Free, accessible programming — no cost barrier for your community',
                  'National advocacy network through NNELL and ACTFL',
                  'A student-led perspective that resonates with young people',
                  'Flexible partnership models — curriculum integration, co-programming, research collaboration',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#1A6B72' }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#E8F4F5' }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1E' }}>Ready to explore a partnership?</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Every partnership starts with a conversation. Tell us about your organization and what you're trying to accomplish — we'll figure out the right fit together.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: '#1A6B72' }}
              >
                Get In Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-xs text-gray-400 mt-3">
                Contact: <a href="mailto:jake@makespanishcasual.org" className="hover:text-[#1A6B72] transition-colors">jake@makespanishcasual.org</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners/Affiliations */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F6F1' }}>
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-8" style={{ color: '#1A6B72' }}>
            Current Affiliations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'NNELL', 'ACTFL', 'Language Connects Foundation',
              'University of Wisconsin-Madison', 'MIT Sandbox', 'UT Southwestern Medical Center', 'Syracuse University',
            ].map((org) => (
              <span
                key={org}
                className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700"
              >
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
