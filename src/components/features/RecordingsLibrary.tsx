'use client'

// Past sessions with recordings. Search box + click-to-play: clicking a card
// expands an embedded YouTube/Vimeo player inline (no modal dialogs, which can
// block the page). Sessions without a recording show a subtle "recording coming
// soon" state instead of a dead card.
import { useState, useMemo } from 'react'
import Reveal from '@/components/ui/Reveal'
import {
  type LiveClass,
  formatDate,
  toEmbedUrl,
} from '@/data/classes-utils'

const typeStyles: Record<string, string> = {
  Webinar: 'bg-msc-teal-light text-msc-teal',
  'Live Class': 'bg-msc-amber-light text-msc-amber',
}

function RecordingCard({ c }: { c: LiveClass }) {
  const [open, setOpen] = useState(false)
  const embed = c.recordingUrl ? toEmbedUrl(c.recordingUrl) : null

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(28,28,30,0.05)] transition-all duration-300 hover:border-msc-teal/30 hover:shadow-[0_12px_32px_rgba(28,28,30,0.10)]">
      {/* Thumbnail / player area */}
      <div className="relative aspect-video bg-msc-charcoal">
        {open && embed ? (
          <iframe
            src={embed}
            title={c.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => embed && setOpen(true)}
            disabled={!embed}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-msc-teal to-msc-teal-dark disabled:cursor-default"
            aria-label={embed ? `Play recording: ${c.title}` : 'Recording coming soon'}
          >
            {embed ? (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg className="ml-1 h-7 w-7 text-msc-teal" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            ) : (
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90">
                Recording coming soon
              </span>
            )}
          </button>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${typeStyles[c.type] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {c.type}
          </span>
          <span className="text-xs font-medium text-gray-400">{c.language}</span>
        </div>
        <h3 className="text-base font-bold leading-snug text-msc-charcoal">{c.title}</h3>
        <p className="mt-1 text-xs text-gray-400">{formatDate(c.start)}</p>
        <p className="mt-2.5 text-sm leading-relaxed text-gray-600 line-clamp-3">{c.description}</p>
      </div>
    </div>
  )
}

export default function RecordingsLibrary({ classes }: { classes: LiveClass[] }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return classes
    return classes.filter((c) =>
      [c.title, c.description, c.host, c.language, c.type].join(' ').toLowerCase().includes(needle),
    )
  }, [q, classes])

  if (classes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 py-16 text-center">
        <p className="text-lg font-semibold text-msc-charcoal">No recordings yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Recordings of past webinars and live classes will be posted here.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 max-w-md">
        <div className="relative">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search recordings…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-msc-charcoal shadow-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-500">No recordings match “{q}”.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <RecordingCard c={c} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
