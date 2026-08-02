import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import CoverArt, { type CoverPalette } from '@/components/shared/CoverArt'
import Reveal from '@/components/ui/Reveal'
import { programs } from '@/data/programs'

const colorToPalette: Record<'teal' | 'amber' | 'coral', CoverPalette> = {
  teal: 'teal',
  amber: 'amber',
  coral: 'coral',
}

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'MSC’s areas of work: language education, resources for neurodivergent individuals and students, conversational Spanish, bilingual family and educator resources, community events and webinars, and advocacy and volunteer engagement.',
}

function StatusBadge({ status }: { status: 'Active' | 'In Development' }) {
  const active = status === 'Active'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        active ? 'bg-msc-teal-light text-msc-teal' : 'bg-msc-amber-light text-msc-amber'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-msc-teal' : 'bg-msc-amber'}`} aria-hidden="true" />
      {status}
    </span>
  )
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        illustration="conversation"
        eyebrow="What We Do"
        title="Our areas of"
        titleAccent="work"
        description="Education, resources, and advocacy for the way people really use language."
        actions={[
          { label: 'Get Involved', href: '/volunteer' },
          { label: 'Browse Free Resources', href: '/resources', variant: 'secondary' },
        ]}
      />

      {/* Honest labeling note */}
      <section className="pt-10 -mb-6">
        <div className="container">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-msc-teal" aria-hidden="true" />
              <strong className="font-semibold text-msc-charcoal">Active</strong> · running now
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-msc-amber" aria-hidden="true" />
              <strong className="font-semibold text-msc-charcoal">In development</strong> · not yet available
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.07}>
              <Link
                href={`/programs/${program.slug}`}
                className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1.5 hover:border-msc-teal/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <CoverArt icon={program.icon} palette={colorToPalette[program.color]} seed={program.slug} className="h-40 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={program.status} />
                  </div>
                </div>
                <div className="p-8 flex flex-1 flex-col">
                  <h2 className="text-xl font-bold text-msc-charcoal mb-1.5 group-hover:text-msc-teal transition-colors">
                    {program.name}
                  </h2>
                  <p className="text-sm font-medium text-msc-teal mb-3">{program.tagline}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{program.summary}</p>
                  <span className="text-sm font-semibold text-msc-teal">Explore this area →</span>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want a resource or session your community needs?"
        description="Tell us what would help."
        primary={{ label: 'Contact Us', href: '/contact' }}
        secondary={{ label: 'Partner With Us', href: '/partners' }}
      />
    </>
  )
}
