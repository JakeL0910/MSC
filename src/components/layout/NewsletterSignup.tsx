'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 py-1">
        <div className="w-7 h-7 rounded-lg bg-msc-teal/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-msc-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm text-gray-300">Thanks, we'll be in touch!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2" noValidate>
      <div className="flex-1 sm:w-56">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          placeholder="your@email.com"
          aria-label="Email address for newsletter"
          className={`w-full px-4 py-2 rounded-xl bg-white/10 border text-sm text-white placeholder-gray-500 focus:outline-none focus:border-msc-teal transition-colors ${error ? 'border-red-500' : 'border-gray-700'}`}
        />
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-xl text-sm font-semibold bg-msc-amber text-msc-charcoal hover:bg-amber-400 transition-colors flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  )
}
