'use client'

// Testimonial-collection form. Submits to /api/stories. Collects only what's
// needed to share a story with permission. Nothing is published automatically;
// staff review submissions and add approved ones to the site.
import { useState } from 'react'

const ROLES = [
  'Student',
  'Family member / caregiver',
  'Educator',
  'Volunteer',
  'Community member',
]

const inputCls =
  'mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-msc-charcoal focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

export default function StoryForm() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [story, setStory] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please add your name.')
    if (story.trim().length < 10) return setError('Please share a little more.')
    if (!consent) return setError('Please check the permission box so we can share your story.')

    setStatus('submitting')
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, story, email, consent }),
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
        <h3 className="text-xl font-bold text-msc-charcoal">Thank you, {name.split(' ')[0]}.</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
          We read every story. If we’d like to feature yours, we’ll reach out first. Nothing is
          published without your okay.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 md:p-7 shadow-sm" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">First name <span className="text-msc-coral">*</span></span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="given-name" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">I’m a…</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls}>
            <option value="">Select one…</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-msc-charcoal">Your story <span className="text-msc-coral">*</span></span>
        <textarea
          rows={4}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="What did you learn or use? What was different afterward? A sentence or two is perfect."
          className={inputCls}
        />
        <span className="mt-1 block text-xs text-gray-400">Please don’t include sensitive or medical details.</span>
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-msc-charcoal">Email <span className="font-normal text-gray-500">(optional, so we can follow up)</span></span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" />
      </label>

      <label className="mt-5 flex items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#1A6B72]" required />
        <span className="text-xs text-gray-600 leading-relaxed">
          I give Make Spanish Casual permission to share this story, using my first name and role, on
          its website and materials. If this is about someone under 18, I confirm I’m their parent or
          guardian. I can ask to remove it at any time.
        </span>
      </label>

      {error && <p className="mt-4 text-sm font-medium text-msc-coral" role="alert">{error}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-5 w-full sm:w-auto disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Share my story'}
      </button>
      <p className="mt-3 text-xs text-gray-400">Nothing is published automatically. We review every story and ask before featuring it.</p>
    </form>
  )
}
