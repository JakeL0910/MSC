import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CtaBand from '@/components/shared/CtaBand'
import Icon from '@/components/shared/Icons'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Start a Chapter',
  description:
    'Bring The MLC Project to your school. Start a student chapter to run conversational Spanish sessions, share resources, and host community events, with a starter kit and mentorship from MLC.',
}

const applyHref = `mailto:${site.email}?subject=${encodeURIComponent('Start an MLC chapter')}`

const steps = [
  { icon: 'mail', title: 'Apply', text: 'Tell us about you and your school.' },
  { icon: 'download', title: 'Get the starter kit', text: 'Playbook, templates, and MLC branding.' },
  { icon: 'presentation', title: 'Launch', text: 'Run your first session or event.' },
  { icon: 'hand-raised', title: 'We support you', text: 'Mentorship and a network of chapters.' },
]

const doList = [
  'Run casual conversational Spanish sessions',
  'Translate and share resources locally',
  'Host community events, like the Access Sprint',
  'Advocate for accessible language at your school',
]

const getList = [
  'A step-by-step chapter playbook',
  'Event and lesson templates',
  'MLC branding and materials',
  'A mentor and a network of chapters',
  'Verified service hours for members',
]

export default function ChaptersPage() {
  return (
    <>
      <PageHero
        illustration="community"
        eyebrow="Chapters · Now launching"
        title="Bring MLC to your school"
        description="Start a student chapter and make language more accessible in your own community."
        actions={[
          { label: 'Apply to start a chapter', href: '#apply' },
          { label: 'How it works', href: '#how', variant: 'secondary' },
        ]}
      />

      {/* How it works */}
      <section id="how" className="scroll-mt-20 py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-gray-100 bg-msc-cream/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-msc-teal text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon name={s.icon} className="h-5 w-5 text-msc-teal" />
                </div>
                <h2 className="text-base font-bold text-msc-charcoal mb-1">{s.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What a chapter does + what you get */}
      <section className="py-16 md:py-20 bg-msc-cream">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-white border border-gray-100 p-7 md:p-8">
              <h2 className="text-xl font-bold text-msc-charcoal mb-4">What a chapter does</h2>
              <ul className="space-y-2.5">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-msc-teal-light text-msc-teal">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-7 md:p-8">
              <h2 className="text-xl font-bold text-msc-charcoal mb-4">What you get</h2>
              <ul className="space-y-2.5">
                {getList.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-msc-amber-light text-msc-amber">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Any student, at any school, can start one. No experience needed.
          </p>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-20 py-16 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-msc-teal/15 bg-msc-teal-light/40 p-8 md:p-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-msc-teal">
              Now launching
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-msc-charcoal">Be one of the first chapters</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600 leading-relaxed">
              We’re starting our chapter network now. Email us a little about you and your school, and
              we’ll help you launch.
            </p>
            <a href={applyHref} className="btn-primary mt-6 inline-flex">Apply to start a chapter</a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not a student? You can still help."
        description="Educators and partners can host a chapter or connect us with students."
        primary={{ label: 'Partner With Us', href: '/partners' }}
        secondary={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  )
}
