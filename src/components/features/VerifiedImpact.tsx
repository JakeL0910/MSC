'use client'

// VERIFIED MEMBER IMPACT — the numbers members earned, after admin verification.
// Renders NOTHING until there is verified impact, so the /impact page never
// shows an empty band. Counts animate up when scrolled into view.
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { type ImpactTotals } from '@/data/contributions'

function Tile({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v * 10) / 10),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <div ref={ref} className="text-center">
      <span className="block text-4xl font-bold text-msc-teal md:text-5xl">{display.toLocaleString('en-US')}</span>
      <p className="mt-1.5 text-sm font-semibold text-msc-charcoal">{label}</p>
    </div>
  )
}

export default function VerifiedImpact({ initial }: { initial: ImpactTotals }) {
  const [totals, setTotals] = useState<ImpactTotals>(initial)

  useEffect(() => {
    fetch('/api/contributions/stats', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((t) => t && setTotals(t))
      .catch(() => {})
  }, [])

  if (totals.sessions === 0) return null

  // Show only the metrics that have a value, so the band stays meaningful.
  const tiles = [
    { label: 'Hours of support', v: totals.hours },
    { label: 'People helped', v: totals.peopleHelped },
    { label: 'Documents translated', v: totals.documents },
    { label: 'Languages supported', v: totals.languages },
  ].filter((t) => t.v > 0)

  if (tiles.length === 0) return null

  return (
    <section className="border-b border-gray-100 bg-white py-14">
      <div className="container">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-msc-teal">Verified member impact</p>
        <div className={`mx-auto grid max-w-4xl gap-8 ${tiles.length >= 3 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
          {tiles.map((t) => (
            <Tile key={t.label} value={t.v} label={t.label} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-gray-400">Logged by members and confirmed by MSC staff.</p>
      </div>
    </section>
  )
}
