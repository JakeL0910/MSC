import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import CtaBand from '@/components/shared/CtaBand'
import ClassSchedule from '@/components/features/ClassSchedule'
import RecordingsLibrary from '@/components/features/RecordingsLibrary'
import SprintBanner from '@/components/features/SprintBanner'
import { readClasses, partitionClasses } from '@/data/classes'

export const metadata: Metadata = {
  title: 'Events & Webinars',
  description:
    'Free educational events and webinars from Make Spanish Casual: conversational Spanish, language access, and inclusive learning, across Dallas–Fort Worth and online. Watch recordings any time.',
}

// Sessions are read from a file that the admin UI writes to, so always render
// fresh rather than statically caching.
export const dynamic = 'force-dynamic'

export default async function ClassesPage() {
  const all = await readClasses()
  const { upcoming, past } = partitionClasses(all)
  const recorded = past.filter((c) => c.recordingUrl)

  return (
    <>
      <PageHero
        illustration="events"
        eyebrow="Events & Webinars"
        title="Learn with us, live"
        description="Free events and webinars on conversational Spanish, language access, and inclusive learning, across DFW and online. Join live or watch a recording any time."
        actions={[
          { label: 'See the August Access Sprint', href: '#featured-series' },
          { label: 'Browse recordings', href: '#recordings', variant: 'secondary' },
        ]}
      />

      {/* Featured flagship series */}
      <div id="featured-series" className="scroll-mt-20 pt-14 md:pt-16">
        <SprintBanner />
      </div>

      {/* Upcoming schedule */}
      <section id="upcoming" className="scroll-mt-20 py-16 md:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Upcoming"
            title="What’s coming up"
            align="left"
          />
          <ClassSchedule classes={upcoming} />
        </div>
      </section>

      {/* Recordings library */}
      <section id="recordings" className="scroll-mt-20 border-t border-gray-100 bg-msc-cream/50 py-16 md:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="On demand"
            title="Past recordings"
            description="Missed one? Watch it any time."
            align="left"
          />
          <RecordingsLibrary classes={recorded} />
        </div>
      </section>

      {/* Admin hint — only really useful to the team; harmless to visitors. */}
      <div className="container pb-4 text-center">
        <Link href="/admin/classes" className="text-xs font-medium text-gray-400 hover:text-msc-teal">
          Manage sessions →
        </Link>
      </div>

      <CtaBand
        title="Want a class on a specific topic?"
        description="Tell us what your community needs, and we’ll build a session around it."
        primary={{ label: 'Request a Session', href: '/contact' }}
        secondary={{ label: 'Volunteer to Teach', href: '/volunteer' }}
      />
    </>
  )
}
