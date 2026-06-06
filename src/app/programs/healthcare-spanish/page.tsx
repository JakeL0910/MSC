import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Healthcare Spanish Initiative | Make Spanish Casual',
  description: 'Free training in culturally authentic medical Spanish for pre-health students, nursing students, and community health workers — designed for the clinical settings where communication failures cost lives.',
}

const curriculumAreas = [
  {
    number: '01',
    title: 'Colloquial vs. Clinical Spanish',
    description: 'Why the gap between textbook medical Spanish and the Spanish patients actually speak matters clinically — and how to bridge it in real encounters.',
  },
  {
    number: '02',
    title: 'Patient Communication',
    description: 'Intake, history-taking, and informed consent in natural, culturally appropriate language. Beyond vocabulary: the phrasing, tone, and indirection that determine whether patients feel truly heard.',
  },
  {
    number: '03',
    title: 'Cultural Context in Clinical Settings',
    description: 'Regional and community variation in health beliefs, communication styles, and family dynamics — and how these shape the clinical encounter in ways a phrasebook will never capture.',
  },
  {
    number: '04',
    title: 'Sensitive Conversations',
    description: 'Mental health, reproductive health, and end-of-life discussions with the cultural and linguistic care these topics require. Includes navigating indirect communication and stigma.',
  },
  {
    number: '05',
    title: 'Community Navigation',
    description: 'Helping patients understand their rights, access systems, interpret discharge instructions, and follow care plans — in language they actually understand.',
  },
]

const audiences = [
  'Pre-med, pre-nursing, and pre-health students (high school and college)',
  'Medical and nursing students seeking to expand cultural competence',
  'Community health workers and patient navigators',
  'Healthcare volunteers and medical interpreters',
  'Practicing providers seeking continuing education in cultural communication',
]

export default function HealthcareSpanishPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#1A6B72' }} className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">
            Healthcare Spanish Initiative
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 max-w-3xl">
            The Spanish your patients are actually speaking.
          </h1>
          <p className="text-lg text-white/85 max-w-2xl leading-relaxed mb-10">
            Free training in culturally authentic medical Spanish for pre-health students, providers, and community health workers.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#E8A020', color: '#1C1C1E' }}
          >
            Enroll Free
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
              The Problem
            </p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
              Vocabulary isn't enough.
            </h2>
            <div className="prose prose-gray max-w-none text-base leading-relaxed text-gray-600 space-y-5">
              <p>
                Medical Spanish programs typically teach anatomical terms and clinical phrases. That's necessary — but it's not sufficient. When a patient says <em>"me cayó el estómago"</em> instead of <em>"me duele el estómago,"</em> they're communicating something culturally specific about their symptoms. When a patient defers to a family member instead of answering directly, or describes pain through metaphor rather than scale, or says <em>"sí"</em> to avoid confrontation rather than to signal understanding — a provider who only knows textbook Spanish will miss it entirely.
              </p>
              <p>
                Language barriers in healthcare are not primarily vocabulary problems. They are cultural communication problems. And they have measurable consequences: higher rates of adverse clinical events, lower patient satisfaction, worse adherence to care plans, and reduced trust in the healthcare system among Spanish-speaking patients.
              </p>
              <p>
                MSC's Healthcare Spanish Initiative addresses the layer that most programs skip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4" style={{ backgroundColor: '#E8F4F5' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 text-center shadow-sm">
              <div className="text-4xl font-bold mb-2" style={{ color: '#1A6B72' }}>~25M</div>
              <div className="text-sm text-gray-600">people in the U.S. with limited English proficiency</div>
            </div>
            <div className="bg-white rounded-2xl p-7 text-center shadow-sm">
              <div className="text-4xl font-bold mb-2" style={{ color: '#E05C4B' }}>2–3×</div>
              <div className="text-sm text-gray-600">higher rate of adverse clinical events with language barriers</div>
            </div>
            <div className="bg-white rounded-2xl p-7 text-center shadow-sm">
              <div className="text-4xl font-bold mb-2" style={{ color: '#1A6B72' }}>&lt;13%</div>
              <div className="text-sm text-gray-600">of U.S. physicians report proficiency in a second language</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F6F1' }}>
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
            Curriculum
          </p>
          <h2 className="text-3xl font-bold mb-10" style={{ color: '#1C1C1E' }}>
            What you'll learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {curriculumAreas.map((area) => (
              <div key={area.number} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#1A6B72]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#1A6B72' }}
                  >
                    {area.number}
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: '#1C1C1E' }}>{area.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
              Research Foundation
            </p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
              Built on real research
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              This program is informed by peer-reviewed language acquisition research, including work conducted at the University of Wisconsin-Madison's Language Acquisition and Bilingualism Laboratory on how colloquialisms affect cognitive processing and communication. It is also shaped by direct clinical experience at UT Southwestern Medical Center and completion of Rice University's{' '}
              <em>Spanish for Successful Communication in Healthcare Settings</em> curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4" style={{ backgroundColor: '#E8F4F5' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1A6B72' }}>
                Who It's For
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1C1E' }}>
                Built for anyone serving patients
              </h2>
              <ul className="space-y-3">
                {audiences.map((audience) => (
                  <li key={audience} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#1A6B72' }} />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1C1C1E' }}>It's free. Enroll today.</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Create one MSC account to access the Healthcare Spanish Initiative alongside all other MSC courses and resources. No cost, ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: '#1A6B72' }}
                >
                  Create Free Account
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: '#1A6B72', color: '#1A6B72' }}
                >
                  Partnership Inquiries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1C1C1E' }}>Explore other programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href="/programs/community"
              className="block rounded-2xl border-2 border-transparent p-6 hover:border-[#E8A020] transition-colors bg-[#FEF3D0]"
            >
              <p className="text-sm font-semibold mb-1" style={{ color: '#E8A020' }}>Community Learning Platform</p>
              <p className="text-sm text-gray-600">Free courses and slang guides for all learners.</p>
            </Link>
            <Link
              href="/programs/advocacy"
              className="block rounded-2xl border-2 border-transparent p-6 hover:border-[#E05C4B] transition-colors bg-[#FDECEA]"
            >
              <p className="text-sm font-semibold mb-1" style={{ color: '#E05C4B' }}>Language Access Advocacy</p>
              <p className="text-sm text-gray-600">Policy, rights resources, and systemic change.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Download strip */}
      <section className="py-10 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-msc-teal mb-1">Free Download</p>
              <h3 className="text-base font-bold text-msc-charcoal mb-1">Healthcare Spanish Initiative Guide (PDF)</h3>
              <p className="text-sm text-gray-600">Print-ready program overview with the full curriculum, learning outcomes, and enrollment information. Share with faculty, administrators, or colleagues.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="/downloads/healthcare-spanish-initiative.pdf"
                download="healthcare-spanish-initiative.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
              <Link href="/downloads" className="inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200">
                All Downloads
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
