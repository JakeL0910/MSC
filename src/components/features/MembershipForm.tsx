'use client'

// BECOME A MEMBER — the join flow that generates MSC's impact numbers.
// Submits to /api/members (real storage in local/preview/prod). Every field is
// also a metric: roles → segments, languages → the collective's headline
// count, city → reach. A live preview shows the member how their join moves
// those numbers before they submit.
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Icon from '@/components/shared/Icons'
import LanguagePicker from './LanguagePicker'
import { MEMBER_ROLES, type CollectiveStats } from '@/data/members'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputCls =
  'mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20'

export default function MembershipForm({ stats }: { stats: CollectiveStats | null }) {
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState<Set<string>>(new Set(['community']))
  const [languages, setLanguages] = useState<string[]>([])
  const [city, setCity] = useState('')
  const [org, setOrg] = useState('')
  const [note, setNote] = useState('')
  const [showPublicly, setShowPublicly] = useState(true)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ memberNo: number; returning: boolean } | null>(null)

  // Live baseline for the preview, refreshed on mount so the number is current.
  const [base, setBase] = useState<CollectiveStats | null>(stats)
  useEffect(() => {
    fetch('/api/members/stats', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => s && setBase(s))
      .catch(() => {})
  }, [])

  const toggleRole = (id: string) =>
    setRoles((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const isPartner = roles.has('partner')

  // Which of the member's languages are new to the collective?
  const known = new Set((base?.languages ?? []).map((l) => l.toLowerCase()))
  const newLangs = languages.filter((l) => !known.has(l.toLowerCase()))
  const nextMemberNo = (base?.total ?? 0) + 1

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please enter your name.')
    if (!email.includes('@')) return setError('Please enter a valid email address.')
    if (roles.size === 0) return setError('Please choose at least one way you want to take part.')
    if (languages.length === 0) return setError('Please add at least one language you speak.')
    if (!consent) return setError('Please agree to the membership consent statement.')

    setStatus('submitting')
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          roles: Array.from(roles),
          languages,
          city,
          org: isPartner ? org : '',
          note,
          showPublicly,
          consent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setResult({ memberNo: data.memberNo, returning: data.returning })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success' && result) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-msc-teal/30 bg-gradient-to-br from-msc-teal-light/60 to-white p-8 text-center"
        role="status"
      >
        <motion.div
          initial={reduce ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-msc-teal text-white"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <p className="text-xs font-bold uppercase tracking-widest text-msc-teal">
          {result.returning ? 'Membership updated' : 'Welcome to the collective'}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-msc-charcoal">
          You’re member{' '}
          <span className="gradient-text">#{result.memberNo.toLocaleString('en-US')}</span>
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600">
          Thanks, {name.split(' ')[0]}. You added{' '}
          <strong>
            {languages.length} language{languages.length === 1 ? '' : 's'}
          </strong>{' '}
          to the collective. We’ll be in touch at <strong>{email}</strong> about ways to take part.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {languages.map((l) => (
            <span key={l} className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-msc-teal-dark shadow-sm">
              {l}
            </span>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8" noValidate>
      {/* Name + email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">
            Name <span className="text-msc-coral">*</span>
          </span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-msc-charcoal">
            Email <span className="text-msc-coral">*</span>
          </span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={inputCls} />
        </label>
      </div>

      {/* Ways to take part (multi-select cards) */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-msc-charcoal">
          How do you want to take part? <span className="text-msc-coral">*</span>
          <span className="ml-1 font-normal text-gray-500">Pick all that fit.</span>
        </legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {MEMBER_ROLES.map((r) => {
            const on = roles.has(r.id)
            return (
              <button
                type="button"
                key={r.id}
                onClick={() => toggleRole(r.id)}
                aria-pressed={on}
                className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                  on ? 'border-msc-teal bg-msc-teal-light/50 shadow-sm' : 'border-gray-200 hover:border-msc-teal/40'
                }`}
              >
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                    on ? 'bg-msc-teal text-white' : 'bg-msc-cream text-msc-teal'
                  }`}
                >
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-msc-charcoal">{r.label}</span>
                  <span className="block text-xs leading-snug text-gray-500">{r.description}</span>
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Partner org name, revealed only when relevant */}
      <AnimatePresence initial={false}>
        {isPartner && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-msc-charcoal">Organization name</span>
              <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} className={inputCls} placeholder="Your organization" />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Languages */}
      <div className="mt-6">
        <LanguagePicker value={languages} onChange={setLanguages} />
      </div>

      {/* City */}
      <label className="mt-6 block">
        <span className="text-sm font-semibold text-msc-charcoal">
          City <span className="font-normal text-gray-500">(optional)</span>
        </span>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" className={inputCls} placeholder="e.g. Plano" />
        <span className="mt-1 block text-xs text-gray-400">Helps us show the collective’s reach. City only, never your address.</span>
      </label>

      {/* Optional note */}
      <label className="mt-4 block">
        <span className="text-sm font-semibold text-msc-charcoal">
          Anything you’d like us to know? <span className="font-normal text-gray-500">(optional)</span>
        </span>
        <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} className={inputCls} placeholder="How you’d like to help, or a question" />
        <span className="mt-1 block text-xs text-gray-400">Please don’t include medical, diagnostic, or other sensitive information.</span>
      </label>

      {/* Live preview of the member's effect on the numbers */}
      <div className="mt-6 rounded-xl border border-dashed border-msc-teal/30 bg-msc-teal-light/30 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-msc-teal">When you join</p>
        <p className="mt-1.5 text-sm leading-relaxed text-msc-charcoal">
          You’ll be member <strong>#{nextMemberNo.toLocaleString('en-US')}</strong>
          {languages.length > 0 && (
            <>
              , speaking{' '}
              <strong>
                {languages.slice(0, 3).join(', ')}
                {languages.length > 3 ? ` +${languages.length - 3}` : ''}
              </strong>
            </>
          )}
          .
          {newLangs.length > 0 && (
            <>
              {' '}
              You’d be the first to bring{' '}
              <strong className="text-msc-teal">{newLangs.slice(0, 3).join(', ')}</strong>
              {newLangs.length > 3 ? ` and ${newLangs.length - 3} more` : ''} to the collective.
            </>
          )}
        </p>
      </div>

      {/* Public wall opt-in */}
      <label className="mt-5 flex items-start gap-3">
        <input type="checkbox" checked={showPublicly} onChange={(e) => setShowPublicly(e.target.checked)} className="mt-0.5 accent-[#1A6B72]" />
        <span className="text-xs leading-relaxed text-gray-600">
          Show my first name and city on the public members wall. Your email is never shown. You can ask us to remove it anytime.
        </span>
      </label>

      {/* Consent */}
      <label className="mt-3 flex items-start gap-3">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#1A6B72]" required />
        <span className="text-xs leading-relaxed text-gray-600">
          I agree that MSC may use my name and email to contact me about membership and ways to take part. MSC won’t sell or share my
          information, and I can ask to be removed at any time. If joining on behalf of someone under 18, I confirm I’m their parent or guardian.
        </span>
      </label>

      {error && (
        <p className="mt-4 text-sm font-medium text-msc-coral" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto">
        {status === 'submitting' ? 'Joining…' : 'Join the collective'}
      </button>
      <p className="mt-3 text-xs text-gray-400">Free to join. Membership is about people, not payment.</p>
    </form>
  )
}
