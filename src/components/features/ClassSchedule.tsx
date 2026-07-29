'use client'

// Upcoming webinars & live classes. Filter chips (type + language), a "happening
// now" state with a pulsing live badge, and a per-card countdown to start. Times
// display exactly as scheduled (see formatTime) so every visitor sees the same
// intended local time.
import { useState, useEffect, useMemo } from 'react'
import Reveal from '@/components/ui/Reveal'
import {
  type LiveClass,
  formatDate,
  formatShortDate,
  formatTime,
  isLiveNow,
  googleCalendarUrl,
} from '@/data/classes-utils'

function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

function countdown(startMs: number, now: number): string {
  const diff = startMs - now
  if (diff <= 0) return ''
  const mins = Math.floor(diff / 60_000)
  const days = Math.floor(mins / 1440)
  const hours = Math.floor((mins % 1440) / 60)
  const m = mins % 60
  if (days > 0) return `Starts in ${days}d ${hours}h`
  if (hours > 0) return `Starts in ${hours}h ${m}m`
  return `Starts in ${m}m`
}

const typeStyles: Record<string, string> = {
  Webinar: 'bg-msc-teal-light text-msc-teal',
  'Live Class': 'bg-msc-amber-light text-msc-amber',
}

function ClassCard({ c, now }: { c: LiveClass; now: number }) {
  const live = isLiveNow(c, now)
  const startMs = +new Date(c.start)
  const soon = startMs - now < 60 * 60_000 && startMs - now > 0

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white p-6 shadow-[0_1px_3px_rgba(28,28,30,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,28,30,0.10)] ${
        live ? 'border-msc-coral/50 ring-2 ring-msc-coral/30' : 'border-gray-100 hover:border-msc-teal/30'
      }`}
    >
      {/* Date rail */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-msc-teal text-white">
            <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
              {formatShortDate(c.start).split(' ')[0]}
            </span>
            <span className="text-xl font-bold leading-none">
              {formatShortDate(c.start).split(' ')[1]}
            </span>
          </div>
          <div>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${typeStyles[c.type] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {c.type}
            </span>
            <p className="mt-1 text-sm font-medium text-gray-500">
              {c.language}
              {c.level ? ` · ${c.level}` : ''}
            </p>
          </div>
        </div>

        {live ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-msc-coral px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Live now
          </span>
        ) : soon ? (
          <span className="rounded-full bg-msc-amber-light px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-msc-amber">
            {countdown(startMs, now)}
          </span>
        ) : null}
      </div>

      <h3 className="text-lg font-bold leading-snug text-msc-charcoal">{c.title}</h3>
      <p className="mt-1.5 text-sm text-gray-500">
        {formatDate(c.start)} · {formatTime(c.start, c.tzLabel)} · {c.durationMin} min
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{c.description}</p>

      <p className="mt-4 text-xs font-medium text-gray-400">Hosted by {c.host}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        {live && c.joinUrl ? (
          <a href={c.joinUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 text-sm">
            Join live now
          </a>
        ) : (
          <a
            href={c.registerUrl || c.joinUrl || '/contact'}
            target={c.registerUrl || c.joinUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="btn-primary !py-2.5 !px-5 text-sm"
          >
            Register
          </a>
        )}
        <a
          href={googleCalendarUrl(c)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border-2 border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-msc-teal hover:text-msc-teal"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add to calendar
        </a>
      </div>
    </div>
  )
}

export default function ClassSchedule({ classes }: { classes: LiveClass[] }) {
  const now = useNow()
  const [type, setType] = useState<'All' | 'Webinar' | 'Live Class'>('All')
  const [lang, setLang] = useState<string>('All')

  const languages = useMemo(
    () => ['All', ...Array.from(new Set(classes.map((c) => c.language)))],
    [classes],
  )

  const filtered = classes.filter(
    (c) => (type === 'All' || c.type === type) && (lang === 'All' || c.language === lang),
  )

  const chip = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
      active
        ? 'bg-msc-teal text-white shadow-sm'
        : 'bg-white text-gray-600 border border-gray-200 hover:border-msc-teal hover:text-msc-teal'
    }`

  if (classes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 py-16 text-center">
        <p className="text-lg font-semibold text-msc-charcoal">No sessions scheduled yet</p>
        <p className="mt-1 text-sm text-gray-500">
          New webinars and live classes will appear here as soon as they’re announced.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(['All', 'Webinar', 'Live Class'] as const).map((t) => (
            <button key={t} onClick={() => setType(t)} className={chip(type === t)}>
              {t === 'All' ? 'All types' : t === 'Webinar' ? 'Webinars' : 'Live Classes'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button key={l} onClick={() => setLang(l)} className={chip(lang === l)}>
              {l === 'All' ? 'All languages' : l}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-500">No sessions match those filters.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <ClassCard c={c} now={now} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
