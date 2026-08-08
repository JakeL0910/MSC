'use client'

// ADMIN: review and verify member contributions.
// Verifying an entry is what moves its numbers into the public impact totals.
// Password-gated with the same admin key as the other admin views.
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { type Contribution, typeLabel, typeDef } from '@/data/contributions'

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

type Filter = 'all' | 'pending' | 'verified'

function metricSummary(c: Contribution): string {
  const parts: string[] = []
  const m = typeDef(c.type)?.metrics ?? []
  if (m.includes('hours') && c.hours) parts.push(`${c.hours}h`)
  if (m.includes('peopleHelped') && c.peopleHelped) parts.push(`${c.peopleHelped} helped`)
  if (m.includes('documents') && c.documents) parts.push(`${c.documents} docs`)
  if (c.language) parts.push(c.language)
  return parts.join(' · ') || '—'
}

export default function AdminContributionsPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState<Contribution[]>([])
  const [status, setStatus] = useState('')
  const [filter, setFilter] = useState<Filter>('pending')

  useEffect(() => {
    const saved = sessionStorage.getItem('msc-admin-key')
    if (saved) {
      setKey(saved)
      setAuthed(true)
    }
  }, [])

  const load = useCallback(async (k: string) => {
    const res = await fetch('/api/contributions', { headers: { 'x-admin-key': k }, cache: 'no-store' })
    if (res.status === 401) {
      setStatus('Incorrect password.')
      setAuthed(false)
      return
    }
    if (res.ok) {
      setList(await res.json())
      setAuthed(true)
      setStatus('')
    }
  }, [])

  useEffect(() => {
    if (authed && key) load(key)
  }, [authed, key, load])

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

  async function setVerified(id: string, verified: boolean) {
    // Optimistic update, then persist.
    setList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: verified ? 'verified' : 'self-reported', verifiedAt: verified ? new Date().toISOString() : null } : c)),
    )
    await fetch('/api/contributions/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify({ id, verified }),
    })
  }

  const verifiedTotals = useMemo(() => {
    const v = list.filter((c) => c.status === 'verified')
    return {
      count: v.length,
      hours: Math.round(v.reduce((s, c) => s + (c.hours || 0), 0) * 10) / 10,
      people: v.reduce((s, c) => s + (c.peopleHelped || 0), 0),
      docs: v.reduce((s, c) => s + (c.documents || 0), 0),
    }
  }, [list])

  const pendingCount = list.filter((c) => c.status === 'self-reported').length

  const visible = useMemo(() => {
    const f = filter === 'all' ? list : list.filter((c) => (filter === 'pending' ? c.status === 'self-reported' : c.status === 'verified'))
    return f.slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.createdAt.localeCompare(a.createdAt)))
  }, [list, filter])

  function exportCsv() {
    const rows = [
      ['Logged', 'Date', 'Member #', 'Member', 'Email', 'Type', 'Hours', 'People', 'Documents', 'Language', 'Status', 'Note'],
      ...list.map((c) => [
        c.createdAt, c.date, String(c.memberNo), c.memberName, c.memberEmail, typeLabel(c.type),
        String(c.hours), String(c.peopleHelped), String(c.documents), c.language, c.status, c.note.replace(/\n/g, ' '),
      ]),
    ]
    const csv = rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'msc-contributions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-msc-charcoal">Contributions</h1>
        <p className="mt-2 text-sm text-gray-500">Enter the admin password to review member activity.</p>
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

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-msc-charcoal">Contributions</h1>
          <p className="mt-1 text-sm text-gray-500">
            {list.length} total · {pendingCount} pending review
          </p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={exportCsv} disabled={list.length === 0} className="btn-secondary text-sm disabled:opacity-50">Export CSV</button>
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

      {/* Verified totals — what the public sees */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Verified activities', v: verifiedTotals.count },
          { label: 'Verified hours', v: verifiedTotals.hours },
          { label: 'People helped', v: verifiedTotals.people },
          { label: 'Documents', v: verifiedTotals.docs },
        ].map((t) => (
          <div key={t.label} className="rounded-xl border border-gray-100 bg-white p-3 text-center">
            <p className="text-2xl font-bold text-msc-teal">{t.v.toLocaleString('en-US')}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        {(['pending', 'verified', 'all'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-msc-teal text-white' : 'bg-msc-cream text-gray-600 hover:bg-msc-teal-light'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">Nothing here.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-msc-cream/60 text-xs font-bold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Detail</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visible.map((c) => (
                <tr key={c.id} className="align-top">
                  <td className="px-4 py-3 text-gray-500">{c.date}</td>
                  <td className="px-4 py-3 font-medium text-msc-charcoal">
                    {c.memberName}
                    <span className="block text-xs font-normal text-gray-400">#{c.memberNo}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{typeLabel(c.type)}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {metricSummary(c)}
                    {c.note && <span className="block text-xs text-gray-400">{c.note}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        c.status === 'verified' ? 'bg-msc-teal-light text-msc-teal-dark' : 'bg-msc-amber-light text-msc-amber'
                      }`}
                    >
                      {c.status === 'verified' ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {c.status === 'verified' ? (
                      <button onClick={() => setVerified(c.id, false)} className="text-xs font-medium text-gray-400 hover:text-msc-coral">
                        Unverify
                      </button>
                    ) : (
                      <button onClick={() => setVerified(c.id, true)} className="btn-primary px-3 py-1.5 text-xs">
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
