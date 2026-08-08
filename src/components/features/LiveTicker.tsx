'use client'

// LIVE TICKER — a calm "the collective is alive" strip that cycles through
// recently joined members. Data comes from /api/members/stats, which only
// exposes opted-in first names + city + languages (never emails), so this is
// safe to show publicly. Refreshes periodically to pick up new joins. Renders
// NOTHING until there is at least one opted-in member. Reduced-motion users see
// a single static entry with no cycling.
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Entry {
  firstName: string
  city: string
  languages: string[]
}

const REFRESH_MS = 25000
const ROTATE_MS = 3800

function line(e: Entry): string {
  const where = e.city ? ` from ${e.city}` : ''
  const langs = e.languages.slice(0, 3).join(', ')
  return `${e.firstName} joined${where}${langs ? ` · speaks ${langs}` : ''}`
}

export default function LiveTicker() {
  const reduce = useReducedMotion()
  const [wall, setWall] = useState<Entry[]>([])
  const [i, setI] = useState(0)

  // Load + periodically refresh the recent-members wall.
  useEffect(() => {
    let alive = true
    const load = () =>
      fetch('/api/members/stats', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((s) => {
          if (alive && s?.wall) setWall(s.wall)
        })
        .catch(() => {})
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  // Advance through entries.
  useEffect(() => {
    if (reduce || wall.length < 2) return
    const id = setInterval(() => setI((n) => (n + 1) % wall.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [reduce, wall.length])

  if (wall.length === 0) return null
  const entry = wall[i % wall.length]

  return (
    <div className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-full border border-gray-100 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-msc-teal">
        <span className="h-1.5 w-1.5 rounded-full bg-msc-coral animate-pulse-soft" aria-hidden="true" />
        Live
      </span>
      <span className="h-3 w-px bg-gray-200" aria-hidden="true" />
      <div className="relative h-5 flex-1 overflow-hidden text-center">
        {reduce ? (
          <span className="text-sm text-msc-charcoal">{line(entry)}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={`${entry.firstName}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 truncate text-sm text-msc-charcoal"
            >
              {line(entry)}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
