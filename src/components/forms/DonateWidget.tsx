'use client'

// Donation widget: one-time / monthly toggle, preset or custom amount, then
// hands off to Stripe Checkout via /api/checkout. Rendered only when the
// server sees STRIPE_SECRET_KEY (see src/app/donate/page.tsx).

import { useState } from 'react'
import Icon from '@/components/shared/Icons'
import { site } from '@/data/site'

const PRESETS = [
  { amount: 25, impact: 'Prints 50 bilingual phrase cards for a clinic waiting room' },
  { amount: 100, impact: 'Supplies a semester of materials for one tutoring match' },
  { amount: 500, impact: 'Funds a full community workshop, printed toolkits included' },
]

export default function DonateWidget() {
  const [monthly, setMonthly] = useState(false)
  const [selected, setSelected] = useState<number | 'custom'>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amount =
    selected === 'custom' ? Math.floor(Number(customAmount)) : selected
  const validAmount = Number.isFinite(amount) && amount >= 1 && amount <= 25000
  const selectedPreset = PRESETS.find((p) => p.amount === selected)

  async function startCheckout() {
    if (!validAmount || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: amount * 100, monthly }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
      {/* one-time / monthly toggle */}
      <div className="grid grid-cols-2 gap-1 bg-msc-cream rounded-xl p-1 mb-7" role="tablist" aria-label="Donation frequency">
        {[
          { label: 'One-time', value: false },
          { label: 'Monthly', value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            role="tab"
            aria-selected={monthly === opt.value}
            onClick={() => setMonthly(opt.value)}
            className={`py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              monthly === opt.value
                ? 'bg-msc-teal text-white shadow-sm'
                : 'text-gray-600 hover:text-msc-teal'
            }`}
          >
            {opt.label}
            {opt.value && <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide text-msc-amber">♥ best</span>}
          </button>
        ))}
      </div>

      {/* amount presets */}
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.amount}
            onClick={() => setSelected(p.amount)}
            aria-pressed={selected === p.amount}
            className={`py-3 rounded-xl text-base font-bold transition-all duration-200 border-2 ${
              selected === p.amount
                ? 'border-msc-teal bg-msc-teal-light text-msc-teal'
                : 'border-gray-200 text-gray-600 hover:border-msc-teal/40'
            }`}
          >
            ${p.amount}
          </button>
        ))}
        <button
          onClick={() => setSelected('custom')}
          aria-pressed={selected === 'custom'}
          className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
            selected === 'custom'
              ? 'border-msc-teal bg-msc-teal-light text-msc-teal'
              : 'border-gray-200 text-gray-600 hover:border-msc-teal/40'
          }`}
        >
          Other
        </button>
      </div>

      {selected === 'custom' && (
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
          <input
            type="number"
            min={1}
            max={25000}
            step={1}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            aria-label="Custom donation amount in dollars"
            className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-msc-teal focus:outline-none text-base font-semibold"
          />
        </div>
      )}

      {/* impact line for the selected preset */}
      <p className="text-sm text-gray-500 text-center min-h-10 mb-5" aria-live="polite">
        {selectedPreset
          ? `$${selectedPreset.amount}${monthly ? '/month' : ''} — ${selectedPreset.impact.toLowerCase()}`
          : validAmount
            ? `$${amount}${monthly ? '/month' : ''} — every dollar goes to free language-access programs`
            : 'Enter an amount between $1 and $25,000'}
      </p>

      {error && (
        <p className="text-sm text-msc-coral bg-msc-coral-light rounded-xl px-4 py-3 mb-4 text-center" role="alert">
          {error}
        </p>
      )}

      <button
        onClick={startCheckout}
        disabled={!validAmount || submitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        <Icon name="heart" className="w-5 h-5 mr-2" />
        {submitting
          ? 'Opening secure checkout…'
          : validAmount
            ? `Donate $${amount}${monthly ? ' monthly' : ''}`
            : 'Donate'}
      </button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Secure checkout by Stripe. {site.legalLine}. Donations are tax-deductible to the extent
        allowed by law{site.ein ? ` (${site.ein})` : ''}. Monthly gifts can be canceled anytime.
      </p>
    </div>
  )
}
