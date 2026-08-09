'use client'

// ----------------------------------------------------------------------------
// ADMIN: manage webinars & live classes.
// Enter the admin password once (checked server-side by /api/classes), then add,
// edit, or delete sessions. Changes save to /data/classes.json and appear on the
// public /classes page immediately.
//
// The password is remembered only for this browser tab (sessionStorage) and is
// sent as an x-admin-key header — it is never baked into the page.
// ----------------------------------------------------------------------------
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  type LiveClass,
  type ClassType,
  type ClassLevel,
  formatDate,
  formatTime,
  isPast,
} from '@/data/classes-utils'

// Common US timezone presets. `offset` is appended to the datetime-local value
// to form a full ISO timestamp. Pick the one matching the session's date/DST.
const TZ_PRESETS = [
  { label: 'ET', offset: '-04:00', note: 'Eastern (EDT, Mar–Nov)' },
  { label: 'ET', offset: '-05:00', note: 'Eastern (EST, Nov–Mar)' },
  { label: 'CT', offset: '-05:00', note: 'Central (CDT)' },
  { label: 'CT', offset: '-06:00', note: 'Central (CST)' },
  { label: 'MT', offset: '-06:00', note: 'Mountain (MDT)' },
  { label: 'PT', offset: '-07:00', note: 'Pacific (PDT)' },
  { label: 'PT', offset: '-08:00', note: 'Pacific (PST)' },
]

type FormState = {
  id?: string
  title: string
  type: ClassType
  description: string
  localDateTime: string // from <input type="datetime-local">
  tzIndex: number
  durationMin: string
  host: string
  language: string
  level: ClassLevel | ''
  joinUrl: string
  registerUrl: string
  recordingUrl: string
  capacity: string
}

const EMPTY: FormState = {
  title: '',
  type: 'Webinar',
  description: '',
  localDateTime: '',
  tzIndex: 0,
  durationMin: '60',
  host: 'MLC',
  language: 'Bilingual',
  level: 'All Levels',
  joinUrl: '',
  registerUrl: '',
  recordingUrl: '',
  capacity: '',
}

function classToForm(c: LiveClass): FormState {
  const offset = c.start.slice(19) // e.g. "-04:00"
  const tzIndex = Math.max(
    0,
    TZ_PRESETS.findIndex((t) => t.label === c.tzLabel && t.offset === offset),
  )
  return {
    id: c.id,
    title: c.title,
    type: c.type,
    description: c.description,
    localDateTime: c.start.slice(0, 16),
    tzIndex,
    durationMin: String(c.durationMin),
    host: c.host,
    language: c.language,
    level: c.level ?? '',
    joinUrl: c.joinUrl ?? '',
    registerUrl: c.registerUrl ?? '',
    recordingUrl: c.recordingUrl ?? '',
    capacity: c.capacity ? String(c.capacity) : '',
  }
}

function formToPayload(f: FormState): Partial<LiveClass> {
  const tz = TZ_PRESETS[f.tzIndex]
  return {
    id: f.id,
    title: f.title.trim(),
    type: f.type,
    description: f.description.trim(),
    start: `${f.localDateTime}:00${tz.offset}`,
    durationMin: Number(f.durationMin) || 60,
    tzLabel: tz.label,
    host: f.host.trim() || 'MLC',
    language: f.language.trim() || 'Bilingual',
    level: f.level || undefined,
    joinUrl: f.joinUrl.trim() || undefined,
    registerUrl: f.registerUrl.trim() || undefined,
    recordingUrl: f.recordingUrl.trim() || undefined,
    capacity: f.capacity ? Number(f.capacity) : undefined,
  }
}

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-msc-charcoal shadow-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'
const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5'

export default function AdminClassesPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState<LiveClass[]>([])
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('msc-admin-key')
    if (saved) {
      setKey(saved)
      setAuthed(true)
    }
  }, [])

  const load = useCallback(async () => {
    const res = await fetch('/api/classes', { cache: 'no-store' })
    if (res.ok) setList(await res.json())
  }, [])

  useEffect(() => {
    if (authed) load()
  }, [authed, load])

  async function verifyKey(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    // Probe the API with a harmless unauthorized-sensitive call to check the key.
    const res = await fetch('/api/classes', {
      method: 'DELETE',
      headers: { 'x-admin-key': key },
    })
    // 400 = authorized but missing id (key is correct); 401 = wrong key.
    if (res.status === 401) {
      setStatus('Incorrect password.')
      return
    }
    sessionStorage.setItem('msc-admin-key', key)
    setAuthed(true)
  }

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.localDateTime) {
      setStatus('Title and date/time are required.')
      return
    }
    setLoading(true)
    setStatus('')
    const res = await fetch('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify(formToPayload(form)),
    })
    setLoading(false)
    if (res.ok) {
      setStatus(form.id ? 'Session updated.' : 'Session added.')
      setForm(EMPTY)
      load()
    } else {
      const err = await res.json().catch(() => ({}))
      setStatus(err.error || 'Something went wrong.')
    }
  }

  async function remove(c: LiveClass) {
    if (!confirm(`Delete “${c.title}”? This can’t be undone.`)) return
    const res = await fetch(`/api/classes?id=${encodeURIComponent(c.id)}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': key },
    })
    if (res.ok) {
      setStatus('Session deleted.')
      if (form.id === c.id) setForm(EMPTY)
      load()
    }
  }

  function edit(c: LiveClass) {
    setForm(classToForm(c))
    setStatus('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function signOut() {
    sessionStorage.removeItem('msc-admin-key')
    setAuthed(false)
    setKey('')
  }

  // --- Password gate ---------------------------------------------------------
  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-20">
        <h1 className="text-2xl font-bold text-msc-charcoal">Manage Sessions</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter the admin password to add or edit webinars and live classes.
        </p>
        <form onSubmit={verifyKey} className="mt-6 space-y-3">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin password"
            className={inputCls}
            autoFocus
          />
          <button type="submit" className="btn-primary w-full">
            Unlock
          </button>
          {status && <p className="text-sm text-msc-coral">{status}</p>}
        </form>
        <Link href="/classes" className="mt-6 text-center text-xs font-medium text-gray-400 hover:text-msc-teal">
          ← Back to Webinars &amp; Live Classes
        </Link>
      </div>
    )
  }

  const upcoming = list.filter((c) => !isPast(c)).sort((a, b) => +new Date(a.start) - +new Date(b.start))
  const past = list.filter((c) => isPast(c)).sort((a, b) => +new Date(b.start) - +new Date(a.start))

  // --- Admin dashboard -------------------------------------------------------
  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-msc-charcoal">Manage Sessions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit, or remove webinars and live classes.{' '}
            <Link href="/classes" className="font-medium text-msc-teal hover:underline">
              View public page →
            </Link>
          </p>
        </div>
        <button onClick={signOut} className="text-sm font-medium text-gray-400 hover:text-msc-coral">
          Sign out
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <form onSubmit={save} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-msc-charcoal">
            {form.id ? 'Edit session' : 'Add a new session'}
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Healthcare Spanish 101" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Type *</label>
                <select className={inputCls} value={form.type} onChange={(e) => set('type', e.target.value as ClassType)}>
                  <option>Webinar</option>
                  <option>Live Class</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Language</label>
                <input className={inputCls} value={form.language} onChange={(e) => set('language', e.target.value)} placeholder="Spanish / English / Bilingual" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea className={inputCls} rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="What the session covers…" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Date &amp; time *</label>
                <input type="datetime-local" className={inputCls} value={form.localDateTime} onChange={(e) => set('localDateTime', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Timezone</label>
                <select className={inputCls} value={form.tzIndex} onChange={(e) => set('tzIndex', Number(e.target.value))}>
                  {TZ_PRESETS.map((t, i) => (
                    <option key={i} value={i}>
                      {t.label} · {t.note}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Duration (min)</label>
                <input type="number" className={inputCls} value={form.durationMin} onChange={(e) => set('durationMin', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Level</label>
                <select className={inputCls} value={form.level} onChange={(e) => set('level', e.target.value as ClassLevel | '')}>
                  <option value="">—</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>All Levels</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Capacity</label>
                <input type="number" className={inputCls} value={form.capacity} onChange={(e) => set('capacity', e.target.value)} placeholder="optional" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Host</label>
              <input className={inputCls} value={form.host} onChange={(e) => set('host', e.target.value)} placeholder="MLC Volunteer Tutors" />
            </div>

            <div className="rounded-xl bg-msc-teal-light/40 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-msc-teal">Upcoming session · join links</p>
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Join link (Zoom / Meet / YouTube Live)</label>
                  <input className={inputCls} value={form.joinUrl} onChange={(e) => set('joinUrl', e.target.value)} placeholder="https://zoom.us/j/…" />
                </div>
                <div>
                  <label className={labelCls}>Register link (if different)</label>
                  <input className={inputCls} value={form.registerUrl} onChange={(e) => set('registerUrl', e.target.value)} placeholder="optional" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-msc-amber-light/40 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-msc-amber">Past session · recording</p>
              <label className={labelCls}>Recording link (YouTube / Vimeo)</label>
              <input className={inputCls} value={form.recordingUrl} onChange={(e) => set('recordingUrl', e.target.value)} placeholder="https://youtube.com/watch?v=…" />
              <p className="mt-1.5 text-xs text-gray-400">
                Paste a YouTube or Vimeo link and it embeds automatically in the recordings library.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Saving…' : form.id ? 'Update session' : 'Add session'}
            </button>
            {form.id && (
              <button type="button" onClick={() => { setForm(EMPTY); setStatus('') }} className="text-sm font-medium text-gray-500 hover:text-msc-charcoal">
                Cancel edit
              </button>
            )}
            {status && <span className="text-sm font-medium text-msc-teal">{status}</span>}
          </div>
        </form>

        {/* List */}
        <div>
          <SessionList title="Upcoming" items={upcoming} onEdit={edit} onDelete={remove} editingId={form.id} />
          <SessionList title="Past" items={past} onEdit={edit} onDelete={remove} editingId={form.id} className="mt-8" />
        </div>
      </div>
    </div>
  )
}

function SessionList({
  title,
  items,
  onEdit,
  onDelete,
  editingId,
  className = '',
}: {
  title: string
  items: LiveClass[]
  onEdit: (c: LiveClass) => void
  onDelete: (c: LiveClass) => void
  editingId?: string
  className?: string
}) {
  return (
    <div className={className}>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
        {title} ({items.length})
      </h2>
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 py-6 text-center text-sm text-gray-400">
          None yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((c) => (
            <li
              key={c.id}
              className={`flex items-start justify-between gap-3 rounded-xl border bg-white p-3.5 transition-colors ${
                editingId === c.id ? 'border-msc-teal ring-1 ring-msc-teal/30' : 'border-gray-100'
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-msc-charcoal">{c.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {formatDate(c.start)} · {formatTime(c.start, c.tzLabel)} · {c.type}
                  {c.recordingUrl ? ' · 🎬 recording' : ''}
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button onClick={() => onEdit(c)} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-msc-teal hover:bg-msc-teal-light">
                  Edit
                </button>
                <button onClick={() => onDelete(c)} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-msc-coral hover:bg-msc-coral-light">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
