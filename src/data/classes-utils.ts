// ----------------------------------------------------------------------------
// Pure, client-safe helpers + types for webinars & live classes.
// No filesystem access here, so both server and client components can import
// it. The fs-backed store (readClasses/writeClasses) lives in ./classes.ts.
// ----------------------------------------------------------------------------

export type ClassType = 'Webinar' | 'Live Class'
export type ClassLevel = 'Beginner' | 'Intermediate' | 'All Levels'

export interface LiveClass {
  id: string
  title: string
  type: ClassType
  description: string
  /** ISO 8601 with timezone offset, e.g. "2026-07-29T18:00:00-04:00". */
  start: string
  durationMin: number
  /** Short label shown next to the time, e.g. "ET". */
  tzLabel: string
  host: string
  /** "Spanish" | "English" | "Bilingual" (free text — filters adapt). */
  language: string
  level?: ClassLevel
  /** Zoom / Google Meet / YouTube Live link for an upcoming session. */
  joinUrl?: string
  /** Separate registration link, if different from the join link. */
  registerUrl?: string
  /** YouTube or Vimeo link for a finished session — embedded in Recordings. */
  recordingUrl?: string
  capacity?: number
}

/** A session is "past" once its end time (start + duration) has elapsed. */
export function isPast(c: LiveClass, now = Date.now()): boolean {
  return +new Date(c.start) + c.durationMin * 60_000 < now
}

/** A session is "live now" while the current time sits inside its window. */
export function isLiveNow(c: LiveClass, now = Date.now()): boolean {
  const start = +new Date(c.start)
  return now >= start && now < start + c.durationMin * 60_000
}

/** Split into upcoming (soonest first) and past (most recent first). */
export function partitionClasses(list: LiveClass[], now = Date.now()) {
  const upcoming = list
    .filter((c) => !isPast(c, now))
    .sort((a, b) => +new Date(a.start) - +new Date(b.start))
  const past = list
    .filter((c) => isPast(c, now))
    .sort((a, b) => +new Date(b.start) - +new Date(a.start))
  return { upcoming, past }
}

// --- Display formatting ------------------------------------------------------
// We format the *wall-clock* time exactly as it was entered (read straight from
// the ISO string) and pair it with tzLabel, so every visitor sees the session's
// intended local time — not a time shifted into their own timezone.

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function wallParts(iso: string) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)
  if (!m) return null
  const [, y, mo, d, h, mi] = m.map(Number) as unknown as number[]
  // Build a Date in UTC purely to derive the weekday of that calendar date.
  const weekday = WEEKDAYS[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()]
  return { y, mo, d, h, mi, weekday }
}

export function formatDate(iso: string): string {
  const p = wallParts(iso)
  if (!p) return ''
  return `${p.weekday}, ${MONTHS[p.mo - 1]} ${p.d}, ${p.y}`
}

export function formatTime(iso: string, tzLabel: string): string {
  const p = wallParts(iso)
  if (!p) return ''
  const ampm = p.h >= 12 ? 'PM' : 'AM'
  const h12 = p.h % 12 === 0 ? 12 : p.h % 12
  const mm = String(p.mi).padStart(2, '0')
  return `${h12}:${mm} ${ampm} ${tzLabel}`
}

/** Short "Jul 29" style label for compact chips. */
export function formatShortDate(iso: string): string {
  const p = wallParts(iso)
  if (!p) return ''
  return `${MONTHS[p.mo - 1].slice(0, 3)} ${p.d}`
}

// --- Video embed parsing -----------------------------------------------------
// Turn a pasted YouTube/Vimeo watch URL into an <iframe>-ready embed URL.

export function toEmbedUrl(url: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = u.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') {
        const id = u.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }
      if (u.pathname.startsWith('/embed/')) return url
      if (u.pathname.startsWith('/live/')) {
        const id = u.pathname.split('/')[2]
        return id ? `https://www.youtube.com/embed/${id}` : null
      }
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0]
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null
    }
    if (host === 'player.vimeo.com') return url
  } catch {
    return null
  }
  return null
}

/** Build a Google Calendar "add event" URL for an upcoming session. */
export function googleCalendarUrl(c: LiveClass): string {
  const start = new Date(c.start)
  const end = new Date(+start + c.durationMin * 60_000)
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `MLC ${c.type}: ${c.title}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${c.description}${c.joinUrl ? `\n\nJoin: ${c.joinUrl}` : ''}`,
    location: c.joinUrl || 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
