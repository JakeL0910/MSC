'use client'

// IMPACT BREAKDOWN — ranked horizontal bars, one measure at a time.
// The data's job is magnitude across categories, so: sorted bars, a single hue
// (brand teal), values direct-labeled in text ink (never the bar color), and a
// toggle to switch dimension (languages / cities) and measure. No legend — a
// single series is named by the heading. Renders nothing when there's no data.
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { type Breakdown } from '@/data/breakdown'

type Dimension = 'language' | 'city'
type Metric = 'members' | 'hours' | 'peopleHelped'

const METRIC_LABEL: Record<Metric, string> = {
  members: 'Members',
  hours: 'Verified hours',
  peopleHelped: 'People helped',
}

const MAX_ROWS = 10

export default function BreakdownBars({ initial }: { initial: Breakdown }) {
  const reduce = useReducedMotion()
  const [data, setData] = useState<Breakdown>(initial)
  const [dimension, setDimension] = useState<Dimension>('language')
  const [metric, setMetric] = useState<Metric>('members')

  useEffect(() => {
    fetch('/api/impact/breakdown', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {})
  }, [])

  const rows = useMemo(() => {
    const source =
      dimension === 'language'
        ? data.byLanguage.map((r) => ({ name: r.language, members: r.members, hours: r.hours, peopleHelped: r.peopleHelped, sessions: r.sessions }))
        : data.byCity.map((r) => ({ name: r.city, members: r.members, hours: r.hours, peopleHelped: r.peopleHelped, sessions: r.sessions }))
    return source
      .filter((r) => (r[metric] as number) > 0)
      .sort((a, b) => (b[metric] as number) - (a[metric] as number))
      .slice(0, MAX_ROWS)
  }, [data, dimension, metric])

  const max = rows.length ? Math.max(...rows.map((r) => r[metric] as number)) : 0

  const hasAny = data.byLanguage.length > 0 || data.byCity.length > 0
  if (!hasAny) return null

  const metricsForDim: Metric[] = ['members', 'hours', 'peopleHelped']

  return (
    <div className="mx-auto max-w-3xl">
      {/* Controls: dimension + measure, one row above the chart */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5">
          {(['language', 'city'] as Dimension[]).map((d) => (
            <button
              key={d}
              onClick={() => setDimension(d)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                dimension === d ? 'bg-msc-teal text-white' : 'text-gray-600 hover:text-msc-teal'
              }`}
            >
              {d === 'language' ? 'Languages' : 'Cities'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {metricsForDim.map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                metric === m ? 'bg-msc-teal-light text-msc-teal-dark' : 'bg-msc-cream text-gray-500 hover:text-msc-teal'
              }`}
            >
              {METRIC_LABEL[m]}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-500">
          No {METRIC_LABEL[metric].toLowerCase()} to show for {dimension === 'language' ? 'languages' : 'cities'} yet.
        </p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((r, i) => {
              const value = r[metric] as number
              const pct = max ? Math.max((value / max) * 100, 2) : 0
              const detail = `${r.members} members · ${r.hours}h · ${r.peopleHelped} helped · ${r.sessions} activities`
              return (
                <motion.li
                  key={r.name}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  className="group"
                  title={`${r.name} — ${detail}`}
                >
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-semibold text-msc-charcoal">{r.name}</span>
                    <span className="flex-shrink-0 text-sm font-bold text-msc-charcoal tabular-nums">
                      {value.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-msc-cream">
                    <motion.div
                      className="h-full rounded-full bg-msc-teal transition-colors group-hover:bg-msc-teal-dark"
                      initial={reduce ? false : { width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.04, 0.4) }}
                    />
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}
      <p className="mt-6 text-center text-xs text-gray-400">
        Member counts come from the roster. Hours and people helped are from verified contributions.
      </p>
    </div>
  )
}
