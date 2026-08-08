'use client'

// MEMBER DASHBOARD — the signed-in home. Loads the member's profile and their
// own contributions, shows verified vs pending totals, hosts the log form, and
// lists history with status badges. Redirects to /members/login if the session
// is missing or expired.
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { type Contribution, typeLabel, typeDef } from '@/data/contributions'
import LogActivityForm from './LogActivityForm'

interface Me {
  memberNo: number
  name: string
  email: string
  roles: string[]
  languages: string[]
  city: string
}

interface Totals {
  hours: number
  peopleHelped: number
  documents: number
  sessions: number
}

const empty: Totals = { hours: 0, peopleHelped: 0, documents: 0, sessions: 0 }

function sum(list: Contribution[]): Totals {
  return list.reduce(
    (t, c) => ({
      hours: Math.round((t.hours + (c.hours || 0)) * 10) / 10,
      peopleHelped: t.peopleHelped + (c.peopleHelped || 0),
      documents: t.documents + (c.documents || 0),
      sessions: t.sessions + 1,
    }),
    { ...empty },
  )
}

function metricSummary(c: Contribution): string {
  const parts: string[] = []
  const m = typeDef(c.type)?.metrics ?? []
  if (m.includes('hours') && c.hours) parts.push(`${c.hours}h`)
  if (m.includes('peopleHelped') && c.peopleHelped) parts.push(`${c.peopleHelped} helped`)
  if (m.includes('documents') && c.documents) parts.push(`${c.documents} docs`)
  if (c.language) parts.push(c.language)
  return parts.join(' · ')
}

export default function MemberDashboard() {
  const router = useRouter()
  const [me, setMe] = useState<Me | null>(null)
  const [items, setItems] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)

  const loadContributions = useCallback(async () => {
    const res = await fetch('/api/contributions/mine', { cache: 'no-store' })
    if (res.ok) setItems(await res.json())
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      if (res.status === 401) {
        router.replace('/members/login')
        return
      }
      if (res.ok) {
        setMe(await res.json())
        await loadContributions()
      }
      setLoading(false)
    })()
  }, [router, loadContributions])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/members/login')
  }

  if (loading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-20">
        <p className="text-sm text-gray-400">Loading your dashboard…</p>
      </div>
    )
  }
  if (!me) return null

  const verified = sum(items.filter((c) => c.status === 'verified'))
  const pending = sum(items.filter((c) => c.status === 'self-reported'))

  const tiles = [
    { label: 'Hours', v: verified.hours, p: pending.hours },
    { label: 'People helped', v: verified.peopleHelped, p: pending.peopleHelped },
    { label: 'Documents', v: verified.documents, p: pending.documents },
    { label: 'Activities', v: verified.sessions, p: pending.sessions },
  ]

  return (
    <div className="container max-w-4xl py-12">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-msc-teal">Member #{me.memberNo}</p>
          <h1 className="mt-1 text-2xl font-bold text-msc-charcoal">Welcome, {me.name.split(' ')[0]}</h1>
          {me.languages.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">{me.languages.join(' · ')}</p>
          )}
        </div>
        <button onClick={logout} className="text-sm font-medium text-gray-400 hover:text-msc-coral">
          Sign out
        </button>
      </div>

      {/* Totals: verified headline, pending underneath */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-msc-teal">{t.v.toLocaleString('en-US')}</p>
            <p className="mt-0.5 text-xs font-semibold text-msc-charcoal">{t.label}</p>
            {t.p > 0 && <p className="mt-1 text-xs text-msc-amber">+{t.p.toLocaleString('en-US')} pending</p>}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">Headline numbers are verified. Pending entries count once an admin confirms them.</p>

      {/* Log form */}
      <div className="mt-8">
        <LogActivityForm memberLanguages={me.languages} onLogged={loadContributions} />
      </div>

      {/* History */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-msc-charcoal">Your activity</h3>
        {items.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-500">
            Nothing logged yet. Add your first activity above.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {items.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-msc-charcoal">
                    {typeLabel(c.type)}
                    <span className="ml-2 font-normal text-gray-400">{c.date}</span>
                  </p>
                  <p className="truncate text-xs text-gray-500">{metricSummary(c) || '—'}</p>
                </div>
                <span
                  className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    c.status === 'verified' ? 'bg-msc-teal-light text-msc-teal-dark' : 'bg-msc-amber-light text-msc-amber'
                  }`}
                >
                  {c.status === 'verified' ? 'Verified' : 'Pending review'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">
        <Link href="/impact" className="font-medium text-msc-teal hover:underline">
          See the collective’s impact →
        </Link>
      </p>
    </div>
  )
}
