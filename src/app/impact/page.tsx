import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import StatGrid from '@/components/shared/StatGrid'
import Icon from '@/components/shared/Icons'
import Reveal from '@/components/ui/Reveal'
import CountUp from '@/components/ui/CountUp'
import Voices from '@/components/features/Voices'
import LiveCollective from '@/components/features/LiveCollective'
import VerifiedImpact from '@/components/features/VerifiedImpact'
import BreakdownBars from '@/components/features/BreakdownBars'
import { highlights } from '@/data/site'
import { milestones, accomplishments, reachTypes, impactStats } from '@/data/impact'
import { getCollectiveStats } from '@/lib/members'
import { getImpactTotals } from '@/lib/contributions'
import { getBreakdown } from '@/lib/breakdown'

export const metadata: Metadata = {
  title: 'Impact',
  description:
    'The verified work of Make Spanish Casual: free educational resources, events across Dallas–Fort Worth, volunteering, partnerships, and advocacy for accessible language education.',
}

export const dynamic = 'force-dynamic'

export default async function ImpactPage() {
  const [collective, impactTotals, breakdown] = await Promise.all([getCollectiveStats(), getImpactTotals(), getBreakdown()])
  const hasBreakdown = breakdown.byLanguage.length > 0 || breakdown.byCity.length > 0
  return (
    <>
      <PageHero
        illustration="community"
        eyebrow="Impact"
        title="Our work,"
        titleAccent="honestly told"
        description="Real work, real numbers. More to come as programs run."
      />

      {/* By the numbers — real, documented figures only */}
      {impactStats.length > 0 && (
        <section className="py-14 bg-white border-b border-gray-100">
          <div className="container">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
              {impactStats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.12}>
                  <CountUp value={s.value} className="block text-5xl md:text-6xl font-bold text-msc-teal" />
                  <p className="mt-2 text-sm font-semibold text-msc-charcoal">{s.label}</p>
                  {s.note && <p className="mt-0.5 text-xs text-gray-500">{s.note}</p>}
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-gray-400">
              More numbers coming as programs run, including the August Access Sprint.
            </p>
          </div>
        </section>
      )}

      {/* Verified member impact — renders only once entries are verified */}
      <VerifiedImpact initial={impactTotals} />

      {/* The living collective — renders only once real members exist */}
      <section className="bg-white py-8">
        <div className="container">
          <LiveCollective initialStats={collective} variant="band" />
        </div>
      </section>

      {/* Breakdown by language and city — renders only once there's data */}
      {hasBreakdown && (
        <section className="bg-white pb-16 pt-6">
          <div className="container">
            <SectionHeading eyebrow="Where the work happens" title="By language and city" />
            <BreakdownBars initial={breakdown} />
          </div>
        </section>
      )}

      {/* Verified highlights */}
      <section className="py-16 bg-msc-cream">
        <div className="container">
          <StatGrid items={highlights} />
        </div>
      </section>

      {/* What we've done */}
      <section className="py-20 bg-msc-cream">
        <div className="container">
          <SectionHeading
            eyebrow="What we’ve done"
            title="Verified areas of work"
          />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {accomplishments.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center flex-shrink-0">
                  <Icon name="check" className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-base font-bold text-msc-charcoal mb-1">{a.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our evolution / milestones */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading eyebrow="Our journey" title="How MSC has grown" />
          <div className="max-w-2xl mx-auto">
            <ol className="relative border-l-2 border-msc-teal/20 pl-8 space-y-10">
              {milestones.map((m, i) => {
                const isLatest = i === milestones.length - 1
                return (
                  <li key={m.title} className="relative">
                    <span
                      className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white ${
                        isLatest ? 'bg-msc-amber animate-pulse-soft' : 'bg-msc-teal'
                      }`}
                      aria-hidden="true"
                    />
                    <Reveal delay={i * 0.06}>
                      <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-1">{m.phase}</p>
                      <h3 className="text-lg font-bold text-msc-charcoal mb-1.5">{m.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Where our work shows up */}
      <section className="py-20 bg-msc-teal">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-msc-amber mb-3">Where we work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">In the community, and online</h2>
            <p className="text-msc-teal-light/90">
              Local first in Dallas–Fort Worth, and open to anyone online. Our partner network is
              growing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reachTypes.map((loc) => (
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

      {/* Voices — real community stories (invitation state until quotes exist) */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading eyebrow="Voices" title="From our community" />
          <Voices />
        </div>
      </section>

      <CtaBand
        title="Impact needs people behind it"
        description="Our work grows one volunteer, one partner, and one supporter at a time."
        primary={{ label: 'Volunteer', href: '/volunteer' }}
        secondary={{ label: 'Partner With Us', href: '/partners' }}
      />
    </>
  )
}
