'use client'

// ADMIN: view August Access Sprint registrations.
// Password-gated (same admin key as the classes admin). Registration data is
// personal, so the list is only returned to an authenticated admin.
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Registration {
  id: string
  createdAt: string
  name: string
  email: string
  registrationType: 'full-series' | 'individual'
  sessionDays: number[]
  audience: string
  note: string
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

export default function AdminRegistrationsPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState<Registration[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('msc-admin-key')
    if (saved) { setKey(saved); setAuthed(true) }
  }, [])

  const load = useCallback(async (k: string) => {
    const res = await fetch('/api/register', { headers: { 'x-admin-key': k }, cache: 'no-store' })
    if (res.status === 401) { setStatus('Incorrect password.'); setAuthed(false); return }
    if (res.ok) { setList(await res.json()); setAuthed(true); setStatus('') }
  }, [])

  useEffect(() => { if (authed && key) load(key) }, [authed, key, load])

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/register', { headers: { 'x-admin-key': key } })
    if (res.status === 401) { setStatus('Incorrect password.'); return }
    sessionStorage.setItem('msc-admin-key', key)
    setAuthed(true)
  }

  function exportCsv() {
    const rows = [
      ['Registered', 'Name', 'Email', 'Type', 'Sessions', 'Audience', 'Note'],
      ...list.map((r) => [
        r.createdAt, r.name, r.email, r.registrationType,
        r.registrationType === 'full-series' ? 'Full series' : r.sessionDays.join(' '),
        r.audience, r.note.replace(/\n/g, ' '),
      ]),
    ]
    const csv = rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'august-access-sprint-registrations.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-msc-charcoal">Sprint Registrations</h1>
        <p className="mt-2 text-sm text-gray-500">Enter the admin password to view registrations.</p>
        <form onSubmit={unlock} className="mt-6 space-y-3">
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin password" className={inputCls} autoFocus />
          <button type="submit" className="btn-primary w-full">Unlock</button>
          {status && <p className="text-sm text-msc-coral">{status}</p>}
        </form>
        <Link href="/classes/august-access-sprint" className="mt-6 text-center text-xs font-medium text-gray-400 hover:text-msc-teal">
          ← Back to the August Access Sprint
        </Link>
      </div>
    )
  }

  const fullSeries = list.filter((r) => r.registrationType === 'full-series').length

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-msc-charcoal">Sprint Registrations</h1>
          <p className="mt-1 text-sm text-gray-500">
            {list.length} total · {fullSeries} full-series · {list.length - fullSeries} individual
          </p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={exportCsv} disabled={list.length === 0} className="btn-secondary text-sm disabled:opacity-50">Export CSV</button>
          <button onClick={() => { sessionStorage.removeItem('msc-admin-key'); setAuthed(false); setKey('') }} className="text-sm font-medium text-gray-400 hover:text-msc-coral">Sign out</button>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-msc-cream/60 text-xs font-bold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Registered for</th>
                <th className="px-4 py-3">As</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="px-4 py-3 font-medium text-msc-charcoal">{r.name}</td>
                  <td className="px-4 py-3 text-gray-600">{r.email}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {r.registrationType === 'full-series' ? 'Full series (31 days)' : `Days ${r.sessionDays.join(', ')}`}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.audience || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs">{r.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
