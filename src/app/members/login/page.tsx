'use client'

// MEMBER LOGIN — passwordless. Enter your email, get a magic link.
// No password to remember; members rarely sign in (just to log activity), so
// this keeps friction and liability low. In local development the API returns
// the link directly so you can sign in without an email provider.
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function LoginInner() {
  const params = useSearchParams()
  const expired = params.get('error') === 'expired'

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')
  const [error, setError] = useState('')
  const [devLink, setDevLink] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.includes('@')) return setError('Please enter a valid email address.')
    setStatus('submitting')
    try {
      const res = await fetch('/api/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setDevLink(data.devLink || '')
      setStatus('sent')
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-msc-teal">Member sign-in</p>
        <h1 className="mt-2 text-2xl font-bold text-msc-charcoal">Sign in to your dashboard</h1>

        {status === 'sent' ? (
          <div className="mt-6" role="status">
            <div className="rounded-xl border border-msc-teal/30 bg-msc-teal-light/40 p-5">
              <p className="text-sm font-semibold text-msc-charcoal">Check your email</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                If <strong>{email}</strong> belongs to a member, a sign-in link is on its way. It expires in 15 minutes.
              </p>
            </div>
            {devLink && (
              <div className="mt-4 rounded-xl border border-dashed border-msc-amber/50 bg-msc-amber-light/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-msc-amber">Development link</p>
                <p className="mt-1 text-xs text-gray-500">No email provider configured, so here’s your link:</p>
                <a href={devLink} className="mt-2 block break-all text-sm font-medium text-msc-teal hover:underline">
                  {devLink}
                </a>
              </div>
            )}
            <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-medium text-msc-teal hover:underline">
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6" noValidate>
            {expired && (
              <p className="mb-4 rounded-xl bg-msc-coral-light px-4 py-3 text-sm font-medium text-msc-coral">
                That sign-in link expired. Enter your email to get a fresh one.
              </p>
            )}
            <label className="block">
              <span className="text-sm font-semibold text-msc-charcoal">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
              />
            </label>
            {error && <p className="mt-3 text-sm font-medium text-msc-coral">{error}</p>}
            <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-5 w-full disabled:opacity-60">
              {status === 'submitting' ? 'Sending…' : 'Email me a sign-in link'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          Not a member yet?{' '}
          <Link href="/become-a-member" className="font-medium text-msc-teal hover:underline">
            Join the collective
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function MemberLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  )
}
