'use client'

// Full August Access Sprint schedule: filter chips (audience / language /
// format) + collapsible stages (native buttons with aria-expanded, keyboard
// accessible, no motion). Times are unconfirmed, so each session shows
// "Time to be announced" and a disabled Add-to-Calendar control.
import { useState } from 'react'
import {
  sprint,
  formatSprintDate,
  sprintGoogleCalendarUrl,
  type SprintAudience,
  type SprintLanguage,
  type SprintFormat,
  type SprintSession,
} from '@/data/sprint'

const AUDIENCES: (SprintAudience | 'All')[] = ['All', 'Students', 'Families', 'Educators', 'All Audiences']
// Only offer language filters that actually exist in the schedule.
const LANGUAGES: (SprintLanguage | 'All')[] = [
  'All',
  ...(Array.from(new Set(sprint.sessions.map((s) => s.language))) as SprintLanguage[]),
]
const FORMATS: (SprintFormat | 'All')[] = ['All', 'Live Class', 'Practice Session', 'Workshop', 'Q&A']

const tagStyle: Record<string, string> = {
  audience: 'bg-msc-teal-light text-msc-teal',
  language: 'bg-msc-amber-light text-msc-charcoal',
  format: 'bg-gray-100 text-gray-600',
}

function chip(active: boolean) {
  return `rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
    active
      ? 'bg-msc-teal text-white'
      : 'bg-white text-gray-600 border border-gray-200 hover:border-msc-teal hover:text-msc-teal'
  }`
}

function SessionRow({ s }: { s: SprintSession }) {
  const calendarUrl = sprintGoogleCalendarUrl(s)
  return (
    <li className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-msc-teal text-white">
          <span className="text-[9px] font-semibold uppercase opacity-80">Day</span>
          <span className="text-lg font-bold leading-none">{s.day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500">{formatSprintDate(s.date)} · 30 min</p>
          <h4 className="text-base font-bold text-msc-charcoal leading-snug mt-0.5">{s.title}</h4>
          <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{s.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {s.audience.map((a) => (
              <span key={a} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagStyle.audience}`}>{a}</span>
            ))}
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagStyle.language}`}>{s.language}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagStyle.format}`}>{s.format}</span>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {s.time && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-msc-charcoal">
                <svg className="h-3.5 w-3.5 text-msc-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {s.time}
              </span>
            )}
            {s.host && (
              <span className="text-xs font-medium text-gray-500">Host: {s.host}</span>
            )}
            {calendarUrl ? (
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-msc-teal hover:text-msc-teal"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to calendar
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-msc-amber" aria-hidden="true" />
                Time to be announced
              </span>
            )}
            <a href="#register" className="text-xs font-semibold text-msc-teal hover:underline">
              Register →
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function SprintSchedule() {
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>('All')
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>('All')
  const [format, setFormat] = useState<(typeof FORMATS)[number]>('All')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const matches = (s: SprintSession) => {
    const a = audience === 'All' || s.audience.includes(audience as SprintAudience) || s.audience.includes('All Audiences')
    const l = language === 'All' || s.language === language
    const f = format === 'All' || s.format === format
    return a && l && f
  }

  const total = sprint.sessions.filter(matches).length

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <FilterRow label="Audience" options={AUDIENCES} value={audience} onChange={setAudience} />
        <FilterRow label="Language" options={LANGUAGES} value={language} onChange={setLanguage} />
        <FilterRow label="Format" options={FORMATS} value={format} onChange={setFormat} />
        <p className="text-sm text-gray-500" aria-live="polite">
          Showing {total} of {sprint.sessions.length} sessions
        </p>
      </div>

      {/* Collapsible stages */}
      <div className="space-y-4">
        {sprint.stages.map((stage) => {
          const items = sprint.sessions.filter((s) => s.stageId === stage.id && matches(s))
          if (items.length === 0) return null
          const isOpen = !collapsed[stage.id]
          const panelId = `stage-panel-${stage.id}`
          return (
            <section key={stage.id} id={stage.id} className="scroll-mt-24 rounded-2xl border border-gray-100 bg-msc-cream/40 overflow-hidden">
              <h3>
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [stage.id]: !c[stage.id] }))}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-white/60 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-msc-teal text-sm font-bold text-white">
                      {stage.number}
                    </span>
                    <span>
                      <span className="block text-base font-bold text-msc-charcoal">{stage.title}</span>
                      <span className="block text-xs text-gray-500">{stage.dateRange} · {items.length} session{items.length === 1 ? '' : 's'}</span>
                    </span>
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>
              {isOpen && (
                <div id={panelId} className="px-5 pb-5">
                  <p className="mb-4 text-sm text-gray-600 leading-relaxed">{stage.goal}</p>
                  <ul className="space-y-3">
                    {items.map((s) => (
                      <SessionRow key={s.day} s={s} />
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )
        })}
        {total === 0 && (
          <p className="py-12 text-center text-gray-500">No sessions match those filters.</p>
        )}
      </div>
    </div>
  )
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wide text-gray-400 w-20 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={`Filter by ${label}`}>
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={value === o} className={chip(value === o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
