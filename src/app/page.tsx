import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/shared/Icons'
import SectionHeading from '@/components/shared/SectionHeading'
import StatGrid from '@/components/shared/StatGrid'
import CtaBand from '@/components/shared/CtaBand'
import { site, stats } from '@/data/site'
import { programs } from '@/data/programs'
import { partnerLogoPlaceholders } from '@/data/partners'

export const metadata: Metadata = {
  title: `${site.name} (${site.acronym}) | Language Access & Health Communication`,
  description: site.subtagline,
}

// Sample phrase cards shown in the hero — pure decoration, edit freely.
const heroPhrases = [
  { en: 'I would like an interpreter, please.', es: 'Quisiera un intérprete, por favor.' },
  { en: 'How many times a day do I take this?', es: '¿Cuántas veces al día tomo esto?' },
  { en: 'What are the next steps?', es: '¿Cuáles son los siguientes pasos?' },
]

const whyItMatters = [
  {
    icon: 'heart',
    title: 'In healthcare',
    text: 'Language barriers are linked to missed appointments, medication errors, and less preventive care. Plain-language, multilingual support helps families understand and participate in their own care.',
  },
  {
    icon: 'academic-cap',
    title: 'In education',
    text: 'When families can’t read school communications or navigate conferences, students lose their strongest advocates. Accessible communication keeps parents in the conversation.',
  },
  {
    icon: 'globe',
    title: 'In community life',
    text: 'Forms, flyers, signs, and services all assume fluent English. Language access turns community resources from theoretical to usable — for everyone they were built for.',
  },
]

const featuredTools = [
  {
    icon: 'chat',
    title: 'Healthcare Phrase Library',
    description: 'Searchable Spanish–English phrase cards for clinic, pharmacy, insurance, and appointment situations.',
    href: '/phrase-library',
    cta: 'Search phrases',
  },
  {
    icon: 'sparkles',
    title: 'MSC Learn',
    description: 'Free flashcard mini-lessons that teach healthcare vocabulary and everyday communication, one deck at a time.',
    href: '/learn',
    cta: 'Start studying',
  },
  {
    icon: 'clipboard-check',
    title: 'Communication Access Scorecard',
    description: 'A 10-question self-assessment that shows organizations how language-accessible their materials really are.',
    href: '/scorecard',
    cta: 'Take the scorecard',
  },
]

export default function HomePage() {
  const featuredPrograms = programs.filter((p) => p.featured)

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-msc-teal-light/70 via-white to-msc-amber-light/40">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-msc-amber/10 blur-3xl" aria-hidden="true" />

        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="inline-block text-xs font-bold uppercase tracking-widest text-msc-teal bg-white/80 rounded-full px-3.5 py-1.5 mb-6">
                Youth-led · {site.legalLine}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-msc-charcoal mb-6">
                Bridging language gaps in{' '}
                <span className="text-msc-teal">healthcare</span>,{' '}
                <span className="text-msc-teal">education</span>, and community life.
              </h1>
              <p className="serif-lead text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                {site.subtagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/volunteer" className="btn-primary">Volunteer</Link>
                <Link href="/programs" className="btn-secondary">Explore Programs</Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-msc-charcoal hover:text-msc-teal transition-colors"
                >
                  Access Resources →
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Are you a school, clinic, or community organization?{' '}
                <Link href="/partners" className="text-msc-teal font-semibold hover:underline">
                  Partner with us
                </Link>
              </p>
            </div>

            {/* Hero visual: stacked sample phrase cards */}
            <div className="hidden lg:block" aria-hidden="true">
              <div className="relative max-w-md ml-auto">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-msc-teal/10 rotate-3" />
                <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-7">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-msc-teal">
                      Healthcare Phrase Library
                    </p>
                    <span className="w-8 h-8 rounded-lg bg-msc-teal-light text-msc-teal flex items-center justify-center">
                      <Icon name="chat" className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="space-y-4">
                    {heroPhrases.map((p) => (
                      <div key={p.en} className="rounded-2xl border border-gray-100 bg-msc-cream/60 p-4">
                        <p className="text-sm font-semibold text-msc-charcoal">{p.en}</p>
                        <p className="text-sm text-msc-teal font-medium mt-1">{p.es}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-5 text-center">
                    Free · Searchable · Built by student volunteers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-4">Our mission</p>
          <p className="serif-lead text-2xl md:text-3xl font-semibold text-msc-charcoal leading-snug max-w-4xl mx-auto">
            “{site.mission}”
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Our impact so far"
            title="Small team. Real reach."
            description="A snapshot of our work to date — see the Impact page for how we measure it."
          />
          <StatGrid items={stats} />
          <p className="text-center mt-8">
            <Link href="/impact" className="text-sm font-semibold text-msc-teal hover:underline">
              See our full impact →
            </Link>
          </p>
        </div>
      </section>

      {/* ================= FEATURED PROGRAMS ================= */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Programs built around real communication needs"
            description="From bilingual healthcare resources to free tutoring and inclusive learning support — every program starts with a gap someone told us about."
          />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {featuredPrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <span className="w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-5">
                  <Icon name={program.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{program.summary}</p>
                <span className="text-sm font-semibold text-msc-teal">Learn more →</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/programs" className="btn-secondary">View All 7 Programs</Link>
          </div>
        </div>
      </section>

      {/* ================= WHY LANGUAGE MATTERS ================= */}
      <section className="py-20 bg-msc-teal">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-msc-amber mb-3">Why this work matters</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Language is the front door to everything
            </h2>
            <p className="text-msc-teal-light/90 leading-relaxed">
              Healthcare, school, housing, work — every system runs on communication. When language
              is a barrier, access quietly disappears.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyItMatters.map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-7">
                <span className="w-11 h-11 rounded-xl bg-msc-amber text-msc-charcoal flex items-center justify-center mb-5">
                  <Icon name={item.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-msc-teal-light/90 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FREE TOOLS ================= */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Free tools"
            title="Use something today"
            description="No signup, no cost. These tools are built by student volunteers and free for everyone."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-msc-cream/70 rounded-2xl p-7 hover:bg-msc-teal-light transition-colors duration-200"
              >
                <span className="w-12 h-12 rounded-xl bg-white text-msc-teal flex items-center justify-center mb-5 shadow-sm">
                  <Icon name={tool.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-msc-charcoal mb-2 group-hover:text-msc-teal transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{tool.description}</p>
                <span className="text-sm font-semibold text-msc-teal">{tool.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= YOUTH-LED ================= */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">Youth-led, mentor-guided</p>
              <h2 className="text-3xl md:text-4xl font-bold text-msc-charcoal mb-5">
                Built by students who grew up between languages
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                MSC is run by student volunteers — many of whom interpreted for their own families
                at clinics, parent-teacher conferences, and pharmacy counters. We build the
                resources we wished our families had.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Youth-led doesn’t mean unserious. Our materials are reviewed by bilingual
                volunteers and guided by adult advisors in education, speech-language pathology,
                and healthcare.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="btn-secondary">Meet the Team</Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-msc-teal hover:underline"
                >
                  Join as a volunteer →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'users', label: 'Student volunteers leading real programs' },
                { icon: 'shield-check', label: 'Adult advisors reviewing every resource' },
                { icon: 'globe', label: 'Resources shared with schools and clinics' },
                { icon: 'heart', label: 'Free for every family, always' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                  <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-3">
                    <Icon name={item.icon} className="w-6 h-6" />
                  </span>
                  <p className="text-sm font-semibold text-msc-charcoal leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Partners & sponsors"
            title="Better together"
            description="We collaborate with schools, clinics, libraries, and community organizations — and we're actively growing our partner network."
          />
          {/* TODO: replace placeholder names with real partner logos (see src/data/partners.ts) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {partnerLogoPlaceholders.map((name) => (
              <div
                key={name}
                className="h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center px-3 text-center"
              >
                <span className="text-xs font-semibold text-gray-400">{name}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/partners" className="btn-primary">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <CtaBand
        title="Communication access starts with people like you"
        description="Tutor a learner. Translate a guide. Fund a program. Every contribution makes another conversation possible."
        primary={{ label: 'Become a Volunteer', href: '/volunteer' }}
        secondary={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  )
}
