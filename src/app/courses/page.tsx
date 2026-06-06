import type { Metadata } from 'next'
import Link from 'next/link'
import { sampleResources } from '@/data/sampleResources'
import { FilterableGrid } from './FilterableGrid'

export const metadata: Metadata = {
  title: 'Courses | Make Spanish Casual',
  description: 'Free Spanish courses covering slang, conversational confidence, culture, healthcare Spanish, and more. No paywall, ever.',
}

const featuredTracks = [
  {
    name: 'Healthcare Spanish Initiative',
    description: 'Authentic, culturally grounded Spanish for pre-health students and providers.',
    count: 'Free · 5 modules',
    bg: 'bg-msc-teal-light',
    textColor: 'text-msc-teal',
    href: '/programs/healthcare-spanish',
  },
  {
    name: 'Slang & Street Spanish',
    description: 'The expressions you hear in real conversations — not in textbooks.',
    count: 'Free · Growing library',
    bg: 'bg-msc-amber-light',
    textColor: 'text-msc-charcoal',
    href: '/courses',
  },
  {
    name: 'Conversational Confidence',
    description: 'Build the fluency to hold a real conversation and be understood.',
    count: 'Free · Beginner–Advanced',
    bg: 'bg-msc-coral-light',
    textColor: 'text-msc-coral',
    href: '/courses',
  },
]

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-msc-teal pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/70">Courses & Resources</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 max-w-2xl text-balance">
            Learn Spanish the way it's actually spoken.
          </h1>
          <p className="text-lg text-white/85 max-w-xl leading-relaxed mb-8">
            Free courses in slang, culture, healthcare Spanish, and conversational confidence. No paywalls, no gatekeeping.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Featured Tracks */}
      <section className="py-14 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-msc-teal">Learning tracks</p>
          <h2 className="text-2xl font-bold text-msc-charcoal mb-8">Start with a track</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredTracks.map((track) => (
              <Link
                key={track.name}
                href={track.href}
                className={`rounded-2xl p-6 border-2 border-transparent hover:shadow-sm transition-all group ${track.bg}`}
              >
                <h3 className={`text-base font-bold mb-2 group-hover:underline ${track.textColor}`}>
                  {track.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{track.description}</p>
                <p className={`text-xs font-semibold ${track.textColor}`}>{track.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid with client-side filter */}
      <section className="py-14 px-4 bg-msc-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest mb-1 text-msc-teal">All resources</p>
            <h2 className="text-2xl font-bold text-msc-charcoal">Browse everything</h2>
          </div>

          <FilterableGrid resources={sampleResources} />

          {/* Coming soon notice */}
          <div className="mt-10 rounded-2xl border-2 border-dashed border-msc-teal p-8 text-center">
            <p className="text-base font-semibold text-msc-teal mb-2">More courses coming soon</p>
            <p className="text-sm text-gray-600 mb-5">
              Create a free account to be notified when new courses, slang guides, and Healthcare Spanish Initiative modules are added.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-msc-teal text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
