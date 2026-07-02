import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import { site } from '@/data/site'
import { team, advisors } from '@/data/team'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'MSC is a youth-led nonprofit working at the intersection of language, healthcare access, education, and inclusive learning. Meet the team and the story behind the mission.',
}

const values = [
  {
    icon: 'globe',
    title: 'Accessibility',
    text: 'Everything we make is free, plain-language, and designed for real people — not experts.',
  },
  {
    icon: 'heart',
    title: 'Cultural humility',
    text: 'We learn from the communities we serve. Language is identity, and we treat it that way.',
  },
  {
    icon: 'beaker',
    title: 'Research',
    text: 'Our programs are informed by evidence — including research our own students conduct.',
  },
  {
    icon: 'hand-raised',
    title: 'Service',
    text: 'Youth-led means youth doing the work: tutoring, translating, designing, and showing up.',
  },
  {
    icon: 'puzzle',
    title: 'Inclusion',
    text: 'Language access includes neurodiverse learners and every kind of communicator.',
  },
]

function PersonCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Photo placeholder — add images via src/data/team.ts */}
      <div className="w-16 h-16 rounded-2xl bg-msc-teal-light text-msc-teal flex items-center justify-center mb-4">
        <Icon name="users" className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-msc-charcoal">{name}</h3>
      <p className="text-sm font-semibold text-msc-teal mb-2.5">{role}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MSC"
        title="A youth-led collective for communication access"
        description="We're students, tutors, translators, designers, and researchers working to make sure language is never the reason someone misses out on care, education, or community."
      />

      {/* Origin story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Our story"
                title="From a Spanish project to a language access mission"
              />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  MSC began as <em>Make Spanish Casual</em> — a student project built on a simple
                  observation: the language people actually speak is very different from the
                  language textbooks teach. We created free resources around real-world,
                  practical Spanish and started researching how that kind of language input
                  shapes learning.
                </p>
                <p>
                  Then our community started asking bigger questions. Families wanted help
                  preparing for medical appointments in English. Parents needed school forms
                  explained. Local organizations asked for translated flyers. Educators wanted
                  materials that worked for neurodiverse learners. The real need wasn’t casual
                  Spanish — it was communication access, everywhere.
                </p>
                <p>
                  So we grew into the <strong>Multilingual Support Collective</strong>: a
                  youth-led nonprofit at the intersection of language, healthcare access,
                  education, and inclusive learning. Our original research on real-world,
                  context-dependent language continues — it’s now one thread of a much larger
                  mission.
                </p>
              </div>
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
              <div className="bg-msc-cream rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">What makes MSC different</p>
                <ul className="space-y-3">
                  {[
                    'Youth-led programs, guided by adult advisors — students do the real work',
                    'Research-backed: our own student studies inform what we build',
                    'Focused on practical communication people actually need, not curriculum for its own sake',
                    'Free, always — no paywalls between families and resources',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                      <span className="text-msc-teal mt-0.5 flex-shrink-0">
                        <Icon name="check" className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="What we believe"
            title="Our values"
            description="Five commitments that shape every program, resource, and decision."
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
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="The people"
            title="Leadership team"
            description="Students who run MSC's day-to-day programs. Placeholder profiles below — update them in src/data/team.ts."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {team.map((member, i) => (
              <PersonCard key={`${member.name}-${i}`} {...member} />
            ))}
          </div>

          <SectionHeading
            eyebrow="Guidance"
            title="Advisors & mentors"
            description="Adult professionals who review our materials, mentor our research, and keep us rigorous."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, i) => (
              <PersonCard key={`${advisor.name}-${i}`} {...advisor} />
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-12">
            Want to join the team or become an advisor?{' '}
            <Link href="/contact" className="text-msc-teal font-semibold hover:underline">
              Get in touch
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Our story is still being written"
        description="Every volunteer, partner, and supporter adds a chapter. Come write one with us."
        primary={{ label: 'Volunteer With Us', href: '/volunteer' }}
        secondary={{ label: 'Explore Programs', href: '/programs' }}
      />
    </>
  )
}
