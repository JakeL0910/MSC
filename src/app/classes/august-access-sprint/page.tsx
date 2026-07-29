import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/shared/Icons'
import CtaBand from '@/components/shared/CtaBand'
import SprintSchedule from '@/components/features/SprintSchedule'
import AccessPlanTemplate from '@/components/features/AccessPlanTemplate'
import RegisterForm from '@/components/features/RegisterForm'
import Illustration from '@/components/shared/Illustration'
import { sprint } from '@/data/sprint'

export const metadata: Metadata = {
  title: 'August Access Sprint: 31 Days of Everyday Language',
  description:
    'A free daily live-class series from Make Spanish Casual. One 30-minute session a day in August, building toward a personal Language Access Plan. For students, families, and educators.',
}

const planCoverage = [
  'Preferred ways to receive information',
  'Preferred ways to respond or participate',
  'Processing-time preferences',
  'Helpful visual, written, spoken, or multilingual supports',
  'Ways to ask for clarification',
  'Self-advocacy language',
  'Language preferences and boundaries',
  'Strategies for repairing misunderstandings',
  'Supports that may help at home, school, events, or community settings',
]

export default function AugustAccessSprintPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-msc-teal-light/60">
        <div className="animate-blob pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
        <div className="container relative py-14 md:py-16">
          <Link href="/classes" className="inline-flex items-center gap-1.5 text-sm font-medium text-msc-teal hover:underline mb-6">
            ← Events &amp; Webinars
          </Link>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
            <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-msc-teal px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              <Icon name="sparkles" className="h-3.5 w-3.5" /> Featured series
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-msc-teal">
              {sprint.startLabel}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-msc-charcoal">{sprint.name}</h1>
          <p className="mt-2 text-xl font-semibold text-msc-teal">{sprint.subtitle}</p>
          <p className="mt-5 max-w-2xl text-lg text-gray-600 leading-relaxed">{sprint.summary}</p>
          <p className="mt-4 text-base font-semibold text-msc-charcoal">{sprint.supportingLine}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[sprint.dailyLabel, sprint.durationLabel, sprint.timeLabel, 'Free', 'Educational'].map((label) => (
              <span key={label} className="rounded-full bg-white/70 border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                {label}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Hosted by {sprint.hosts.join(', ')}.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#register" className="btn-primary">Join the August Sprint</a>
            <a href="#schedule" className="btn-secondary">View Full Schedule</a>
          </div>
            </div>
            <div className="hidden lg:block">
              <Illustration name="plan" className="w-full max-w-sm ml-auto animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'presentation', title: 'One class a day', text: `A short 30-minute live class every day in August at ${sprint.timeLabel}. Practical and low-pressure.` },
              { icon: 'hand-raised', title: 'Come as you are', text: sprint.flexibilityNote },
              { icon: 'document-text', title: 'One clear outcome', text: 'Each session builds toward your own one-page Language Access Plan.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-msc-cream/50 p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-msc-teal-light text-msc-teal">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h2 className="text-lg font-bold text-msc-charcoal mb-1.5">{item.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Educational disclaimer + language/accessibility note */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 max-w-4xl">
            <p className="rounded-xl bg-msc-amber-light/40 px-5 py-4 text-sm text-gray-600 leading-relaxed">
              {sprint.disclaimer} It is a personal educational and self-advocacy resource, not a
              clinical assessment or an official accommodation document.
            </p>
            <p className="rounded-xl bg-msc-teal-light/50 px-5 py-4 text-sm text-gray-600 leading-relaxed">
              <strong className="font-semibold text-msc-charcoal">Language &amp; access:</strong>{' '}
              {sprint.accessibilityNote}
            </p>
          </div>
        </div>
      </section>

      {/* ===================== REGISTRATION ===================== */}
      <section id="register" className="scroll-mt-20 py-16 md:py-20 bg-msc-cream">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-msc-teal-light px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-msc-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-msc-teal" aria-hidden="true" /> Registration open
              </span>
              <h2 className="mt-4 text-3xl font-bold text-msc-charcoal">Register for the sprint</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                <strong>Full series</strong> or just the <strong>sessions you want</strong>. Free. Every
                class is at {sprint.timeLabel}, 30 minutes. We’ll email your links.
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </section>

      {/* ===================== LANGUAGE ACCESS PLAN ===================== */}
      <section id="plan" className="scroll-mt-20 py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">The outcome</p>
            <h2 className="text-3xl md:text-4xl font-bold text-msc-charcoal mb-4">Your Language Access Plan</h2>
            <p className="text-gray-600 leading-relaxed">
              By August 31, you’ll have a personal, one-page plan for what helps you understand,
              participate, and be understood. Start any time; fill in what fits.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <ul className="space-y-2.5">
              {planCoverage.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-msc-teal-light text-msc-teal">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <AccessPlanTemplate />
          </div>
        </div>
      </section>

      {/* ===================== FULL SCHEDULE ===================== */}
      <section id="schedule" className="scroll-mt-20 py-16 md:py-20 bg-msc-cream/50 border-t border-gray-100">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">The full month</p>
            <h2 className="text-3xl md:text-4xl font-bold text-msc-charcoal mb-4">All 31 days, in five stages</h2>
            <p className="text-gray-600 leading-relaxed">
              Filter by audience or format, and add any session to your calendar.
            </p>
          </div>
          <SprintSchedule />
        </div>
      </section>

      <CtaBand
        title="Bring the Access Sprint to your community"
        description="Educators and partners: co-host a stage or bring it to your community."
        primary={{ label: 'Partner With Us', href: '/partners' }}
        secondary={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  )
}
