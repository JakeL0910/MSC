import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import { programs } from '@/data/programs'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'MSC programs: health communication resources, ESL tutoring, bilingual healthcare tools, inclusive language learning, community translation, youth research, and creative projects.',
}

const colorClasses = {
  teal: 'bg-msc-teal-light text-msc-teal',
  amber: 'bg-msc-amber-light text-msc-amber',
  coral: 'bg-msc-coral-light text-msc-coral',
} as const

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Seven ways we bridge communication gaps"
        description="Every MSC program answers a real need someone brought to us — a form a family couldn't read, a visit they couldn't prepare for, a learner standard materials left behind."
        actions={[
          { label: 'Volunteer for a Program', href: '/volunteer' },
          { label: 'Browse Free Resources', href: '/resources', variant: 'secondary' },
        ]}
      />

      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[program.color]}`}>
                    <Icon name={program.icon} className="w-6 h-6" />
                  </span>
                  {program.featured && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-msc-amber bg-msc-amber-light rounded-full px-2.5 py-1">
                      Flagship
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-msc-charcoal mb-1.5 group-hover:text-msc-teal transition-colors">
                  {program.name}
                </h2>
                <p className="text-sm font-medium text-msc-teal mb-3">{program.tagline}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{program.summary}</p>
                <span className="text-sm font-semibold text-msc-teal">Explore this program →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Don't see the program your community needs?"
        description="Many of our programs started as a suggestion from a family, teacher, or partner. Tell us what's missing."
        primary={{ label: 'Contact Us', href: '/contact' }}
        secondary={{ label: 'Partner With Us', href: '/partners' }}
      />
    </>
  )
}
