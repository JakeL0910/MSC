import type { Metadata } from 'next'
import CinematicHero from '@/components/shared/CinematicHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import Reveal from '@/components/ui/Reveal'
import MembershipForm from '@/components/features/MembershipForm'
import LiveCollective from '@/components/features/LiveCollective'
import LiveTicker from '@/components/features/LiveTicker'
import { getCollectiveStats } from '@/lib/members'

export const metadata: Metadata = {
  title: 'Become a Member',
  description:
    'Join the Multilingual Support Collective. Add your languages, choose how you want to take part, and become part of a community building language access together.',
}

// Live numbers on this page reflect real members, so it must not be cached.
export const dynamic = 'force-dynamic'

const reasons = [
  {
    icon: 'globe',
    title: 'Every language counts',
    detail: 'The languages you speak become part of the collective the moment you join.',
  },
  {
    icon: 'hand-raised',
    title: 'Help how you want',
    detail: 'Interpret, translate, volunteer, partner, or simply stand with the mission.',
  },
  {
    icon: 'sparkles',
    title: 'Real, shared impact',
    detail: 'Membership turns into the honest numbers that tell our story to the community.',
  },
]

export default async function BecomeAMemberPage() {
  const stats = await getCollectiveStats()

  return (
    <>
      <CinematicHero
        eyebrow="Become a member"
        meta="Multilingual Support Collective"
        title="Join the collective"
        accent={['collective']}
        description="Membership is how a language-access movement grows. Add your languages, choose how you want to help, and watch the collective grow with you."
        actions={[
          { label: 'Join now', href: '#join', variant: 'light' },
          { label: 'See the impact', href: '/impact', variant: 'outline-light' },
        ]}
        ghost="JOIN"
        edgeLabel="Members · 2026"
        footerLeft="Become a member"
        footerRight="Free to join"
      />

      {/* Live collective numbers */}
      <section className="border-b border-gray-100 bg-msc-cream py-14">
        <div className="container">
          <div className="mb-10">
            <LiveTicker />
          </div>
          <LiveCollective initialStats={stats} variant="full" />
        </div>
      </section>

      {/* Why join */}
      <section className="bg-white py-16">
        <div className="container">
          <SectionHeading eyebrow="Why join" title="Your membership is the metric" />
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-msc-teal-light text-msc-teal">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <p className="mb-1 text-base font-bold text-msc-charcoal">{r.title}</p>
                  <p className="text-sm leading-relaxed text-gray-600">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The join form */}
      <section className="bg-msc-cream py-16" id="join">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <SectionHeading eyebrow="Membership" title="Add yourself to the collective" align="left" />
            <MembershipForm stats={stats} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not ready to join yet?"
        description="You can still volunteer for a single event, partner with us as an organization, or support the work with a gift."
        primary={{ label: 'Volunteer', href: '/volunteer' }}
        secondary={{ label: 'Partner with us', href: '/partners' }}
      />
    </>
  )
}
