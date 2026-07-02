import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import StatGrid from '@/components/shared/StatGrid'
import Icon from '@/components/shared/Icons'
import { stats } from '@/data/site'
import { timeline, testimonials, programOutcomes, reachLocations } from '@/data/impact'

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'How MSC measures its work: learners reached, resources published, volunteer hours, program outcomes, and the story of our growth.',
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="What communication access adds up to"
        description="We measure our work in conversations made possible — and in the numbers behind them. Current figures are placeholders while our first formal reporting cycle completes."
      />

      {/* Headline stats */}
      <section className="py-16 bg-white">
        <div className="container">
          <StatGrid items={stats} />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Our journey"
            title="From student project to collective"
          />
          <div className="max-w-2xl mx-auto">
            <ol className="relative border-l-2 border-msc-teal/20 pl-8 space-y-10">
              {timeline.map((event) => (
                <li key={event.year} className="relative">
                  <span className="absolute -left-[41px] w-5 h-5 rounded-full bg-msc-teal border-4 border-msc-cream" aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-1">{event.year}</p>
                  <h3 className="text-lg font-bold text-msc-charcoal mb-1.5">{event.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Program outcomes */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Program outcomes"
            title="Results by program"
            description="Placeholder metrics — updated as each program's data comes in."
          />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {programOutcomes.map((o) => (
              <div key={o.program} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center flex-shrink-0">
                  <Icon name="check" className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-msc-teal mb-1">{o.program}</p>
                  <p className="text-lg font-bold text-msc-charcoal mb-1">{o.metric}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{o.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community reach */}
      <section className="py-20 bg-msc-teal">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-msc-amber mb-3">Community reach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where our work shows up</h2>
            <p className="text-msc-teal-light/90">
              Local first, online everywhere. Our printed resources live in community spaces; our
              digital tools reach families anywhere.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reachLocations.map((loc) => (
              <div key={loc.name} className="bg-white/10 rounded-2xl p-6 text-center">
                <span className="w-10 h-10 rounded-xl bg-msc-amber text-msc-charcoal flex items-center justify-center mx-auto mb-4">
                  <Icon name="map-pin" className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-white mb-1.5">{loc.name}</h3>
                <p className="text-sm text-msc-teal-light/90">{loc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Voices"
            title="What people tell us"
            description="Placeholder quotes — replace with real testimonials (with permission) in src/data/impact.ts."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.quote.slice(0, 30)} className="bg-msc-cream rounded-2xl p-7">
                <p className="text-msc-amber text-3xl font-serif leading-none mb-3" aria-hidden="true">"</p>
                <blockquote className="text-sm text-gray-700 leading-relaxed mb-5">{t.quote}</blockquote>
                <figcaption>
                  <p className="text-sm font-bold text-msc-charcoal">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Annual report placeholder */}
      <section className="py-16 bg-msc-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <span className="w-14 h-14 rounded-2xl bg-msc-teal-light text-msc-teal flex items-center justify-center flex-shrink-0">
              <Icon name="document-text" className="w-7 h-7" />
            </span>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-msc-charcoal mb-1.5">Annual report</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our first annual report — programs, finances, and outcomes — is in preparation.
                {/* TODO: when the report PDF is ready, drop it in /public/downloads/ and link it here */}
              </p>
            </div>
            <Link href="/contact" className="btn-secondary text-sm whitespace-nowrap">
              Request a Copy
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Impact needs people behind it"
        description="These numbers grow one volunteer, one partner, and one supporter at a time."
        primary={{ label: 'Volunteer', href: '/volunteer' }}
        secondary={{ label: 'Support MSC', href: '/donate' }}
      />
    </>
  )
}
