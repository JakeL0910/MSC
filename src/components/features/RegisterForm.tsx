'use client'

// August Access Sprint registration form. Submits to /api/register (real,
// working storage in local/preview). Collects only what's needed to contact a
// registrant — never diagnoses, medical info, or disability documentation.
import { useState } from 'react'
import { sprint, formatSprintDate } from '@/data/sprint'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const AUDIENCE_OPTIONS = [
  'Student',
  'Family member / caregiver',
  'Educator',
  'Community member',
  'Prefer not to say',
]

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState<'full-series' | 'individual'>('full-series')
  const [days, setDays] = useState<Set<number>>(new Set())
  const [audience, setAudience] = useState('')
  const [note, setNote] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const toggleDay = (day: number) =>
    setDays((prev) => {
      const next = new Set(prev)
      next.has(day) ? next.delete(day) : next.add(day)
      return next
    })

  const setStageSelected = (stageDays: number[], on: boolean) =>
    setDays((prev) => {
      const next = new Set(prev)
      stageDays.forEach((d) => (on ? next.add(d) : next.delete(d)))
      return next
    })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!email.includes('@')) return setError('Please enter a valid email address.')
    if (type === 'individual' && days.size === 0)
      return setError('Please choose at least one session, or register for the full series.')
    if (!consent) return setError('Please agree to the consent statement to register.')

    setStatus('submitting')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          registrationType: type,
          sessionDays: Array.from(days),
          audience,
          note,
          consent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-msc-teal/30 bg-msc-teal-light/40 p-7 text-center" role="status">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-msc-teal text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-msc-charcoal">You’re registered!</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
          Thanks, {name.split(' ')[0]}. You’re signed up for{' '}
          {type === 'full-series' ? 'the full August Access Sprint' : `${days.size} session${days.size === 1 ? '' : 's'}`}.
          We’ll email session links and reminders to <strong>{email}</strong> as details are finalized.
        </p>
        <p className="mt-3 text-xs text-gray-500">All sessions are at {sprint.timeLabel}, 30 minutes each.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 md:p-7 shadow-sm" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">Name <span className="text-msc-coral">*</span></span>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">Email <span className="text-msc-coral">*</span></span>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
            className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
          />
        </label>
      </div>

      {/* Registration type */}
      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-msc-charcoal mb-2">What would you like to register for?</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            { v: 'full-series', label: 'The full series', hint: 'All 31 days' },
            { v: 'individual', label: 'Specific sessions', hint: 'Pick the days you want' },
          ] as const).map((opt) => (
            <label
              key={opt.v}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                type === opt.v ? 'border-msc-teal bg-msc-teal-light/40' : 'border-gray-200 hover:border-msc-teal/40'
              }`}
            >
              <input
                type="radio" name="regType" value={opt.v} checked={type === opt.v}
                onChange={() => setType(opt.v)} className="mt-0.5 accent-[#1A6B72]"
              />
              <span>
                <span className="block text-sm font-semibold text-msc-charcoal">{opt.label}</span>
                <span className="block text-xs text-gray-500">{opt.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Session picker (individual only) */}
      {type === 'individual' && (
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-msc-charcoal mb-1">
            Choose your sessions <span className="font-normal text-gray-500">({days.size} selected)</span>
          </legend>
          <div className="space-y-3">
            {sprint.stages.map((stage) => {
              const stageDays = sprint.sessions.filter((s) => s.stageId === stage.id).map((s) => s.day)
              const allOn = stageDays.every((d) => days.has(d))
              return (
                <div key={stage.id} className="rounded-xl border border-gray-100 p-3.5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-msc-teal">
                      Stage {stage.number} · {stage.title}
                    </span>
                    <button
                      type="button" onClick={() => setStageSelected(stageDays, !allOn)}
                      className="text-xs font-semibold text-msc-teal hover:underline"
                    >
                      {allOn ? 'Clear stage' : 'Select stage'}
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5">
                    {sprint.sessions.filter((s) => s.stageId === stage.id).map((s) => (
                      <label key={s.day} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-msc-cream/60 cursor-pointer text-sm">
                        <input type="checkbox" checked={days.has(s.day)} onChange={() => toggleDay(s.day)} className="accent-[#1A6B72]" />
                        <span className="text-gray-700">
                          <span className="font-medium">Day {s.day}</span>{' '}
                          <span className="text-gray-500">· {formatSprintDate(s.date)} · {s.title}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </fieldset>
      )}

      {/* Audience (optional) */}
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-msc-charcoal">I’m registering as <span className="font-normal text-gray-500">(optional)</span></span>
        <select
          value={audience} onChange={(e) => setAudience(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
        >
          <option value="">Select one…</option>
          {AUDIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>

      {/* Optional note */}
      <label className="mt-4 block">
        <span className="text-sm font-semibold text-msc-charcoal">Anything that would help you take part? <span className="font-normal text-gray-500">(optional)</span></span>
        <textarea
          rows={2} value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. a format or timing that works best for you"
          className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
        />
        <span className="mt-1 block text-xs text-gray-400">Please don’t include medical, diagnostic, or other sensitive information.</span>
      </label>

      {/* Consent */}
      <label className="mt-5 flex items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#1A6B72]" required />
        <span className="text-xs text-gray-600 leading-relaxed">
          I agree that MLC may use my name and email to send information about the August Access Sprint
          (session links and reminders). MLC won’t sell or share this information, and I can ask to be
          removed at any time. If registering someone under 18, I confirm I’m their parent or guardian.
        </span>
      </label>

      {error && <p className="mt-4 text-sm font-medium text-msc-coral" role="alert">{error}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-5 w-full sm:w-auto disabled:opacity-60">
        {status === 'submitting' ? 'Registering…' : type === 'full-series' ? 'Join the August Sprint' : 'Register for selected sessions'}
      </button>
      <p className="mt-3 text-xs text-gray-400">Free · No cost, ever. All sessions at {sprint.timeLabel}, 30 minutes each.</p>
    </form>
  )
}
