'use client'

// ADMIN: grant-ready impact report.
// Pulls the same public aggregates the site shows (member counts + verified
// impact + per-language/city breakdown) and lays them out as a clean, branded
// document. "Save as PDF" uses the browser's print dialog — the print CSS in
// globals.css reveals only #report-print, so the toolbar and site chrome drop
// away. Admin-gated for consistency; the numbers themselves contain no PII.
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/Icons'
import { type Breakdown } from '@/data/breakdown'
import { type CollectiveStats } from '@/data/members'
import { type ImpactTotals } from '@/data/contributions'

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

const fmt = (n: number) => n.toLocaleString('en-US')

export default function AdminReportPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [status, setStatus] = useState('')
  const [collective, setCollective] = useState<CollectiveStats | null>(null)
  const [impact, setImpact] = useState<ImpactTotals | null>(null)
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('msc-admin-key')
    if (saved) {
      setKey(saved)
      setAuthed(true)
    }
  }, [])

  const loadData = useCallback(async () => {
    const [c, i, b] = await Promise.all([
      fetch('/api/members/stats', { cache: 'no-store' }).then((r) => r.json()),
      fetch('/api/contributions/stats', { cache: 'no-store' }).then((r) => r.json()),
      fetch('/api/impact/breakdown', { cache: 'no-store' }).then((r) => r.json()),
    ])
    setCollective(c)
    setImpact(i)
    setBreakdown(b)
  }, [])

  // The report data is public aggregate; we still gate the page. Verify the key
  // against an admin endpoint before showing the report.
  const verifyKey = useCallback(async (k: string) => {
    const res = await fetch('/api/contributions', { headers: { 'x-admin-key': k } })
    if (res.status === 401) {
      setStatus('Incorrect password.')
      setAuthed(false)
      return
    }
    if (res.ok) {
      setAuthed(true)
      setStatus('')
      await loadData()
    }
  }, [loadData])

  useEffect(() => {
    if (authed && key) verifyKey(key)
  }, [authed, key, verifyKey])

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/contributions', { headers: { 'x-admin-key': key } })
    if (res.status === 401) {
      setStatus('Incorrect password.')
      return
    }
    sessionStorage.setItem('msc-admin-key', key)
    setAuthed(true)
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-msc-charcoal">Impact Report</h1>
        <p className="mt-2 text-sm text-gray-500">Enter the admin password to generate the grant-ready report.</p>
        <form onSubmit={unlock} className="mt-6 space-y-3">
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin password" className={inputCls} autoFocus />
          <button type="submit" className="btn-primary w-full">Unlock</button>
          {status && <p className="text-sm text-msc-coral">{status}</p>}
        </form>
        <Link href="/impact" className="mt-6 text-center text-xs font-medium text-gray-400 hover:text-msc-teal">
          ← Back to Impact
        </Link>
      </div>
    )
  }

  if (!collective || !impact || !breakdown) {
    return <div className="container py-20 text-center text-sm text-gray-400">Building report…</div>
  }

  const generated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const summary = [
    { label: 'Members', value: collective.total },
    { label: 'Languages', value: collective.languageCount },
    { label: 'Cities reached', value: collective.cityCount },
    { label: 'Verified hours', value: impact.hours },
    { label: 'People helped', value: impact.peopleHelped },
    { label: 'Documents translated', value: impact.documents },
  ]

  const topLanguages = breakdown.byLanguage.slice(0, 12)
  const topCities = breakdown.byCity.slice(0, 12)

  return (
    <div className="container max-w-3xl py-10">
      {/* Toolbar — hidden when printing */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-msc-charcoal">Impact Report</h1>
          <p className="text-sm text-gray-500">Review, then Save as PDF for grant applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="btn-primary inline-flex items-center gap-2 text-sm">
            <Icon name="download" className="h-4 w-4" />
            Save as PDF
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('msc-admin-key')
              setAuthed(false)
              setKey('')
            }}
            className="text-sm font-medium text-gray-400 hover:text-msc-coral"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Printable document */}
      <article id="report-print" className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <header className="border-b border-gray-200 pb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-msc-teal">Multilingual Support Collective</p>
          <h2 className="mt-1 text-3xl font-bold text-msc-charcoal">Community Impact Report</h2>
          <p className="mt-2 text-sm text-gray-500">Generated {generated}</p>
        </header>

        {/* Summary */}
        <section className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">At a glance</h3>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {summary.map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-3xl font-bold text-msc-teal">{fmt(s.value)}</p>
                <p className="mt-0.5 text-xs font-medium text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* By language */}
        {topLanguages.length > 0 && (
          <section className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">By language</h3>
            <table className="mt-3 w-full text-left text-sm">
              <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="py-2">Language</th>
                  <th className="py-2 text-right">Members</th>
                  <th className="py-2 text-right">Hours</th>
                  <th className="py-2 text-right">People</th>
                  <th className="py-2 text-right">Activities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topLanguages.map((r) => (
                  <tr key={r.language}>
                    <td className="py-2 font-medium text-msc-charcoal">{r.language}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.members)}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.hours)}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.peopleHelped)}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.sessions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* By city */}
        {topCities.length > 0 && (
          <section className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">By city</h3>
            <table className="mt-3 w-full text-left text-sm">
              <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="py-2">City</th>
                  <th className="py-2 text-right">Members</th>
                  <th className="py-2 text-right">Hours</th>
                  <th className="py-2 text-right">People</th>
                  <th className="py-2 text-right">Activities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topCities.map((r) => (
                  <tr key={r.city}>
                    <td className="py-2 font-medium text-msc-charcoal">{r.city}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.members)}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.hours)}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.peopleHelped)}</td>
                    <td className="py-2 text-right text-gray-600">{fmt(r.sessions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <footer className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-xs leading-relaxed text-gray-400">
            Methodology: member counts and languages come from the MSC membership roster. Hours, people helped, and documents
            reflect member-logged contributions that MSC staff have verified. Figures are current as of the generation date above.
          </p>
        </footer>
      </article>
    </div>
  )
}
