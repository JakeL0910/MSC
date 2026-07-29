import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import Illustration from '@/components/shared/Illustration'
import { site } from '@/data/site'
import { founder, advisors } from '@/data/team'
import { milestones } from '@/data/impact'

export const metadata: Metadata = {
  title: 'About MSC',
  description:
    'Make Spanish Casual is a nonprofit making language education more accessible for neurodivergent and multilingual individuals, families, and educators. Read our mission, evolution, and founder story.',
}

const values = [
  {
    icon: 'globe',
    title: 'Accessibility',
    text: 'Everything we make is free, plain-language, and designed for real people, not experts.',
  },
  {
    icon: 'chat',
    title: 'Respect for every voice',
    text: 'Many language styles are valid. We understand and respect differences rather than trying to change them.',
  },
  {
    icon: 'heart',
    title: 'Cultural humility',
    text: 'We learn from the communities we serve. Language is identity, and we treat it that way.',
  },
  {
    icon: 'shield-check',
    title: 'Credibility',
    text: 'We stay in our lane: educational, not clinical, and we point people to professionals when that’s what’s needed.',
  },
  {
    icon: 'hand-raised',
    title: 'Service',
    text: 'We do the real work: writing, translating, organizing, advocating, and showing up for our community.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        illustration="story"
        eyebrow="About MSC"
        title="A youth-led collective for language access"
        description="We make language education and everyday language more flexible, inclusive, and accessible for neurodivergent and multilingual people, families, and educators."
      />

      {/* ===================== MISSION ===================== */}
      <section id="mission" className="scroll-mt-20 py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading align="left" eyebrow="Our mission" title="Language, made more accessible" />
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{site.mission}</p>
              <p className="text-gray-600 leading-relaxed">
                We prioritize students and young people, and also serve families, educators, and
                communities. Language needs differ from person to person; there’s no single
                “right” way to use language.
              </p>
              <Illustration name="community" className="mt-10 hidden lg:block w-full max-w-sm" />
            </div>
            <div className="space-y-6">
              <div className="bg-msc-teal-light/60 rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">Mission</p>
                <p className="text-lg font-semibold text-msc-charcoal leading-relaxed">{site.mission}</p>
              </div>
              <div className="bg-msc-amber-light/60 rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-msc-amber mb-3">Vision</p>
                <p className="text-lg font-semibold text-msc-charcoal leading-relaxed">{site.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OUR EVOLUTION ===================== */}
      <section id="evolution" className="scroll-mt-20 py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Our evolution"
            title="From conversational Spanish to language access"
            description="The same idea, reaching further."
          />

          <div className="max-w-3xl mx-auto mb-14 space-y-4 text-gray-600 leading-relaxed">
            <p>
              Make Spanish Casual began by closing the gap between classroom Spanish and everyday
              language.
            </p>
            <p>
              That revealed a bigger question: how do we make language itself more accessible
              for people who learn, process language, or use language differently? So we expanded,
              while keeping our conversational Spanish roots.
            </p>
          </div>

          {/* Milestone timeline */}
          <ol className="relative max-w-3xl mx-auto border-l-2 border-msc-teal/20 pl-8 space-y-10">
            {milestones.map((m) => (
              <li key={m.title} className="relative">
                <span
                  className="absolute -left-[2.6rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-msc-teal text-white"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-1">{m.phase}</p>
                <h3 className="text-lg font-bold text-msc-charcoal mb-1.5">{m.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== FOUNDER STORY ===================== */}
      <section id="founder" className="scroll-mt-20 py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div>
              <SectionHeading align="left" eyebrow="Founder story" title="Where MSC started" />
              <div className="bg-msc-cream rounded-2xl p-6 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-4">
                  <Icon name="users" className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-msc-charcoal">{founder.name}</h3>
                <p className="text-sm font-semibold text-msc-teal mb-2.5">{founder.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{founder.bio}</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {founder.story?.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="What we believe"
            title="Our values"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-4">
                  <Icon name={v.icon} className="w-6 h-6" />
                </span>
                <h3 className="text-base font-bold text-msc-charcoal mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>

          {/* Mentor-guided note (shown while advisor list is empty) */}
          {advisors.length === 0 && (
            <div className="max-w-3xl mx-auto mt-14 text-center">
              <p className="text-gray-600 leading-relaxed">
                MSC is <strong>volunteer-driven and mentor-guided</strong>. Our volunteers lead the
                day-to-day work, with guidance from experienced mentors. Want to help guide our work
                or join the team?{' '}
                <Link href="/contact" className="text-msc-teal font-semibold hover:underline">
                  Get in touch
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Our story is still being written"
        description="Come write the next chapter with us."
        primary={{ label: 'Volunteer With Us', href: '/volunteer' }}
        secondary={{ label: 'See What We Do', href: '/programs' }}
      />
    </>
  )
}
