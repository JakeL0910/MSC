import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/shared/Icons'
import CtaBand from '@/components/shared/CtaBand'
import { programs, getProgram } from '@/data/programs'

// Program pages are generated from src/data/programs.ts — edit content there.

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) return { title: 'Program Not Found' }
  return {
    title: program.name,
    description: program.summary,
  }
}

const colorClasses = {
  teal: 'bg-msc-teal-light text-msc-teal',
  amber: 'bg-msc-amber-light text-msc-amber',
  coral: 'bg-msc-coral-light text-msc-coral',
} as const

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) notFound()

  const otherPrograms = programs.filter((p) => p.slug !== program.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-msc-teal-light/60">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
        <div className="container relative py-16 md:py-20">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm font-medium text-msc-teal hover:underline mb-6">
            ← All programs
          </Link>
          <div className="flex items-start gap-5">
            <span className={`hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0 ${colorClasses[program.color]}`}>
              <Icon name={program.icon} className="w-7 h-7" />
            </span>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-msc-charcoal mb-4">{program.name}</h1>
              <p className="text-lg text-msc-teal font-medium mb-4">{program.tagline}</p>
              <Link href={program.ctaHref} className="btn-primary">{program.ctaLabel}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-5">
              {program.description.map((para) => (
                <p key={para.slice(0, 40)} className="text-gray-600 leading-relaxed text-lg">
                  {para}
                </p>
              ))}

              <div className="pt-4">
                <h2 className="text-2xl font-bold text-msc-charcoal mb-5">What we do</h2>
                <ul className="space-y-3.5">
                  {program.whatWeDo.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-msc-teal-light text-msc-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="check" className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-msc-cream rounded-2xl p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-3">Who it's for</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{program.whoItsFor}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-msc-teal mb-3">Get involved</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Every program is powered by student volunteers and community partners.
                </p>
                <div className="space-y-2.5">
                  <Link href="/volunteer" className="btn-primary w-full text-sm">Volunteer</Link>
                  <Link href="/partners" className="btn-secondary w-full text-sm">Partner With Us</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other programs */}
      <section className="py-16 bg-msc-cream">
        <div className="container">
          <h2 className="text-2xl font-bold text-msc-charcoal mb-8 text-center">Explore other programs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherPrograms.map((p) => (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colorClasses[p.color]}`}>
                  <Icon name={p.icon} className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-msc-charcoal mb-1.5 group-hover:text-msc-teal transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Help this program grow"
        description="Volunteers make every session, guide, and workshop possible — and it takes less time than you think."
        primary={{ label: 'Become a Volunteer', href: '/volunteer' }}
        secondary={{ label: 'Support MSC', href: '/donate' }}
      />
    </>
  )
}
