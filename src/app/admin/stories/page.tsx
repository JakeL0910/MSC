'use client'

// ADMIN: review submitted stories/testimonials. Password-gated (same admin key).
// Submissions are personal, so the list is only returned to an authenticated
// admin. To PUBLISH one, copy it into src/data/stories.ts (the Voices section).
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Submission {
  id: string
  createdAt: string
  name: string
  role: string
  story: string
  email: string
  consent: boolean
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

export default function AdminStoriesPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState<Submission[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('msc-admin-key')
    if (saved) { setKey(saved); setAuthed(true) }
  }, [])

  const load = useCallback(async (k: string) => {
    const res = await fetch('/api/stories', { headers: { 'x-admin-key': k }, cache: 'no-store' })
    if (res.status === 401) { setStatus('Incorrect password.'); setAuthed(false); return }
    if (res.ok) { setList(await res.json()); setAuthed(true); setStatus('') }
  }, [])

  useEffect(() => { if (authed && key) load(key) }, [authed, key, load])

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/stories', { headers: { 'x-admin-key': key } })
    if (res.status === 401) { setStatus('Incorrect password.'); return }
    sessionStorage.setItem('msc-admin-key', key)
    setAuthed(true)
  }

  function copyForStoriesFile(s: Submission) {
    const line = `  { quote: ${JSON.stringify(s.story)}, name: ${JSON.stringify(s.name)}, role: ${JSON.stringify(s.role || 'Community member')} },`
    navigator.clipboard?.writeText(line)
    setStatus(`Copied ${s.name}'s entry — paste it into src/data/stories.ts`)
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-msc-charcoal">Story Submissions</h1>
        <p className="mt-2 text-sm text-gray-500">Enter the admin password to review submissions.</p>
        <form onSubmit={unlock} className="mt-6 space-y-3">
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin password" className={inputCls} autoFocus />
          <button type="submit" className="btn-primary w-full">Unlock</button>
          {status && <p className="text-sm text-msc-coral">{status}</p>}
        </form>
        <Link href="/impact" className="mt-6 text-center text-xs font-medium text-gray-400 hover:text-msc-teal">← Back to Impact</Link>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-msc-charcoal">Story Submissions</h1>
          <p className="mt-1 text-sm text-gray-500">{list.length} total. Click “Copy entry”, then paste into <code className="text-xs">src/data/stories.ts</code> to publish.</p>
        </div>
        <button onClick={() => { sessionStorage.removeItem('msc-admin-key'); setAuthed(false); setKey('') }} className="text-sm font-medium text-gray-400 hover:text-msc-coral">Sign out</button>
      </div>

      {status && <p className="mb-4 rounded-lg bg-msc-teal-light px-4 py-2 text-sm text-msc-teal">{status}</p>}

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-500">No submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {list.slice().reverse().map((s) => (
            <li key={s.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <blockquote className="text-sm text-gray-700 leading-relaxed">“{s.story}”</blockquote>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-500">
                  <strong className="text-msc-charcoal">{s.name}</strong>{s.role ? ` · ${s.role}` : ''}
                  {s.email ? ` · ${s.email}` : ''}
                  {s.consent ? ' · ✅ consent' : ' · ⚠️ no consent'}
                </p>
                <button onClick={() => copyForStoriesFile(s)} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-msc-teal hover:bg-msc-teal-light">
                  Copy entry
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
