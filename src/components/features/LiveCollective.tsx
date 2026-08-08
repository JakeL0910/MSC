'use client'

// LIVE COLLECTIVE — the membership numbers, rendered from real signups.
// Fetches /api/members/stats and animates the counts. Two shapes:
//   • variant="full"  → counters + a wall of languages + opted-in members
//     (used on /become-a-member)
//   • variant="band"  → just the headline counters, and renders NOTHING when
//     there are no members yet, so it never shows an empty "0" on /impact.
// Numbers are honest: they only reflect people who actually joined.
import { animate, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { type CollectiveStats } from '@/data/members'

function Stat({ value, label, accent }: { value: number; label: string; accent?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value, reduce])

  return (
    <div className="text-center">
      <span ref={ref} className={`block text-4xl font-bold md:text-5xl ${accent ? 'gradient-text' : 'text-msc-teal'}`}>
        {display.toLocaleString('en-US')}
      </span>
      <p className="mt-1.5 text-sm font-semibold text-msc-charcoal">{label}</p>
    </div>
  )
}

export default function LiveCollective({
  initialStats,
  variant = 'full',
}: {
  initialStats: CollectiveStats | null
  variant?: 'full' | 'band'
}) {
  const reduce = useReducedMotion()
  const [stats, setStats] = useState<CollectiveStats | null>(initialStats)

  useEffect(() => {
    fetch('/api/members/stats', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => s && setStats(s))
      .catch(() => {})
  }, [])

  // The band variant stays out of the way until there's something real to show.
  if (variant === 'band' && (!stats || stats.total === 0)) return null

  const s = stats ?? { total: 0, languageCount: 0, languages: [], cityCount: 0, roleCounts: {}, wall: [] }

  const counters = (
    <div className="grid grid-cols-3 gap-6">
      <Stat value={s.total} label="Members" accent />
      <Stat value={s.languageCount} label="Languages" />
      <Stat value={s.cityCount} label="Cities" />
    </div>
  )

  if (variant === 'band') {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-msc-teal/20 bg-white/70 p-6 shadow-sm backdrop-blur">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-msc-teal">The collective, right now</p>
        {counters}
      </div>
    )
  }

  return (
    <div>
      {counters}

      {/* Language wall */}
      {s.languages.length > 0 && (
        <div className="mt-8">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-msc-teal">Languages we already speak</p>
          <div className="flex flex-wrap justify-center gap-2">
            {s.languages.map((l, i) => (
              <motion.span
                key={l}
                initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}
                className="rounded-lg border border-gray-100 bg-white px-3 py-1.5 text-sm font-medium text-msc-teal-dark shadow-sm"
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Members wall (opted in only) */}
      {s.wall.length > 0 && (
        <div className="mt-10">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-msc-teal">Recently joined</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.wall.map((m, i) => (
              <motion.div
                key={`${m.firstName}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.5) }}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-bold text-msc-charcoal">
                  {m.firstName}
                  {m.city && <span className="font-normal text-gray-400"> · {m.city}</span>}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.languages.slice(0, 4).map((l) => (
                    <span key={l} className="rounded bg-msc-teal-light px-2 py-0.5 text-xs font-medium text-msc-teal-dark">
                      {l}
                    </span>
                  ))}
                  {m.languages.length > 4 && (
                    <span className="rounded bg-msc-cream px-2 py-0.5 text-xs font-medium text-gray-500">
                      +{m.languages.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
