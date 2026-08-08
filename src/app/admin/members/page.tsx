'use client'

// ADMIN: view and export the membership roster.
// Password-gated with the same admin key as the other admin views. Member data
// is personal, so the full list is only returned to an authenticated admin.
// The segment counts and language breakdown here are the raw material for grant
// reports; use Export CSV for a spreadsheet.
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MEMBER_ROLES, roleLabel, type Member } from '@/data/members'

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

export default function AdminMembersPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState<Member[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('msc-admin-key')
    if (saved) {
      setKey(saved)
      setAuthed(true)
    }
  }, [])

  const load = useCallback(async (k: string) => {
    const res = await fetch('/api/members', { headers: { 'x-admin-key': k }, cache: 'no-store' })
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
    const res = await fetch('/api/members', { headers: { 'x-admin-key': key } })
    if (res.status === 401) {
      setStatus('Incorrect password.')
      return
    }
    sessionStorage.setItem('msc-admin-key', key)
    setAuthed(true)
  }

  // Derived segments for the header + grant reporting.
  const segments = useMemo(() => {
    const languages = new Map<string, number>()
    const cities = new Set<string>()
    const roleCounts: Record<string, number> = {}
    for (const m of list) {
      m.languages.forEach((l) => languages.set(l, (languages.get(l) ?? 0) + 1))
      if (m.city) cities.add(m.city.toLowerCase())
      m.roles.forEach((r) => (roleCounts[r] = (roleCounts[r] ?? 0) + 1))
    }
    const topLanguages = Array.from(languages.entries()).sort((a, b) => b[1] - a[1])
    return { languages: topLanguages, cityCount: cities.size, roleCounts }
  }, [list])

  function exportCsv() {
    const rows = [
      ['Member #', 'Joined', 'Name', 'Email', 'Roles', 'Languages', 'City', 'Organization', 'Public', 'Note'],
      ...list.map((m) => [
        String(m.memberNo),
        m.createdAt,
        m.name,
        m.email,
        m.roles.map(roleLabel).join('; '),
        m.languages.join('; '),
        m.city,
        m.org,
        m.showPublicly ? 'yes' : 'no',
        m.note.replace(/\n/g, ' '),
      ]),
    ]
    const csv = rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'msc-members.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-msc-charcoal">Members</h1>
        <p className="mt-2 text-sm text-gray-500">Enter the admin password to view the membership roster.</p>
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
    <div className="container max-w-6xl py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-msc-charcoal">Members</h1>
          <p className="mt-1 text-sm text-gray-500">
            {list.length} total · {segments.languages.length} languages · {segments.cityCount} cities
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

      {/* Role segments */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {MEMBER_ROLES.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-100 bg-white p-3 text-center">
            <p className="text-2xl font-bold text-msc-teal">{segments.roleCounts[r.id] ?? 0}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">{r.label}</p>
          </div>
        ))}
      </div>

      {/* Language breakdown */}
      {segments.languages.length > 0 && (
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">Languages by member count</p>
          <div className="flex flex-wrap gap-2">
            {segments.languages.map(([lang, count]) => (
              <span key={lang} className="inline-flex items-center gap-1.5 rounded-lg bg-msc-teal-light px-2.5 py-1 text-sm font-medium text-msc-teal-dark">
                {lang}
                <span className="rounded bg-white/70 px-1.5 text-xs">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">No members yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-msc-cream/60 text-xs font-bold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3">Languages</th>
                <th className="px-4 py-3">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list
                .slice()
                .sort((a, b) => b.memberNo - a.memberNo)
                .map((m) => (
                  <tr key={m.id} className="align-top">
                    <td className="px-4 py-3 font-mono text-gray-400">{m.memberNo}</td>
                    <td className="px-4 py-3 font-medium text-msc-charcoal">
                      {m.name}
                      {m.org && <span className="block text-xs font-normal text-gray-400">{m.org}</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.email}</td>
                    <td className="px-4 py-3 text-gray-600">{m.roles.map(roleLabel).join(', ')}</td>
                    <td className="px-4 py-3 text-gray-600">{m.languages.join(', ')}</td>
                    <td className="px-4 py-3 text-gray-600">{m.city || '—'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
