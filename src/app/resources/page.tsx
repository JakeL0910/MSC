import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import CoverArt from '@/components/shared/CoverArt'
import Reveal from '@/components/ui/Reveal'
import { resources, resourceCategories, type Resource } from '@/data/resources'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Free, plain-language resources from The MLC Project for students, families, and educators. Language access, self-advocacy, conversational Spanish, and inclusive learning. Clearly labeled available or coming soon.',
}

const formatIcons: Record<Resource['format'], string> = {
  Guide: 'book-open',
  Toolkit: 'clipboard-check',
  'Phrase Cards': 'chat',
  Checklist: 'check',
  Worksheet: 'document-text',
  Summary: 'beaker',
}

function StatusBadge({ status }: { status: Resource['status'] }) {
  const available = status === 'Available'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        available ? 'bg-msc-teal-light text-msc-teal' : 'bg-msc-amber-light text-msc-amber'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${available ? 'bg-msc-teal' : 'bg-msc-amber'}`} aria-hidden="true" />
      {status}
    </span>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1.5 hover:border-msc-teal/20 transition-all duration-300">
      <div className="relative overflow-hidden">
        <CoverArt icon={formatIcons[resource.format]} seed={resource.slug} className="h-32 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={resource.status} />
        </div>
      </div>
      <div className="p-6 flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-msc-charcoal mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{resource.description}</p>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-xs text-gray-500 bg-gray-50 rounded-full px-2.5 py-1">{resource.format}</span>
          {resource.languages.map((lang) => (
            <span key={lang} className="text-xs text-gray-500 bg-gray-50 rounded-full px-2.5 py-1">
              {lang}
            </span>
          ))}
        </div>
        <Link
          href={`/resources/${resource.slug}`}
          className="text-center py-2.5 rounded-xl text-sm font-semibold border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200 mt-auto"
        >
          View details
        </Link>
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        illustration="resources"
        eyebrow="Resources"
        title="Free resources,"
        titleAccent="built for real life"
        description="Practical materials for students, families, and educators. Free to read, use, and print."
      />

      {/* Available now: the real, usable things (events + webinars) */}
      <section className="py-12 bg-msc-teal">
        <div className="container">
          <div className="rounded-2xl bg-white/10 border border-white/10 p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-msc-amber mb-2">Available now</p>
              <h2 className="text-2xl font-bold text-white mb-2">Read, use, and print for free</h2>
              <p className="text-sm text-msc-teal-light/90 leading-relaxed max-w-2xl">
                Resources marked <strong className="text-white">Available</strong> are ready to read
                and save as a PDF right now. More are in development, and you can also learn with us
                at a free event or webinar.
              </p>
            </div>
            <Link href="/classes" className="btn-primary whitespace-nowrap">See events &amp; webinars</Link>
          </div>
        </div>
      </section>

      {/* Audience-organized resource library */}
      {resourceCategories.map((cat, idx) => {
        const items = resources.filter((r) => r.category === cat.id)
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`scroll-mt-20 py-16 md:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-msc-cream/60'}`}
          >
            <div className="container">
              <div className="max-w-2xl mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">{cat.label}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-msc-charcoal mb-3">
                  {cat.label.replace('For ', 'Resources for ')}
                </h2>
                <p className="text-gray-600 leading-relaxed">{cat.description}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 0.06}>
                    <ResourceCard resource={r} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Educational disclaimer */}
      <section className="pb-16 bg-msc-cream/60">
        <div className="container">
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto text-center">
            MLC resources are free educational materials. They are not clinical, medical, or legal
            advice, individualized professional guidance, accommodations, or a substitute for
            evaluation or care from a qualified professional. Bilingual materials are
            volunteer-produced and reviewed for clarity.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want to help build the next resource?"
        description="Suggest a resource, or help create one."
        primary={{ label: 'Get Involved', href: '/volunteer' }}
        secondary={{ label: 'Request a Resource', href: '/contact' }}
      />
    </>
  )
}
