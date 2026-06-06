'use client'

import { useState } from 'react'

const PRESET_AMOUNTS = ['$10', '$25', '$50', '$100']

export default function DonateForm() {
  const [selected, setSelected] = useState<string>('$25')
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time')

  const activeAmount = custom ? `$${custom}` : selected
  const numericAmount = custom || selected.replace('$', '')

  const donateUrl = `https://makespanishcasual.org/donate?amount=${numericAmount}&frequency=${frequency}`

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Frequency toggle */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Frequency
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(['one-time', 'monthly'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                frequency === f
                  ? 'bg-msc-teal border-msc-teal text-white'
                  : 'border-gray-200 text-gray-600 hover:border-msc-teal/50 hover:text-msc-teal'
              }`}
            >
              {f === 'one-time' ? 'One-time' : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      {/* Preset amounts */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Select amount
        </label>
        <div className="grid grid-cols-4 gap-3">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => { setSelected(amt); setCustom('') }}
              className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                selected === amt && !custom
                  ? 'bg-msc-teal border-msc-teal text-white'
                  : 'border-gray-200 text-gray-700 hover:border-msc-teal/50 hover:text-msc-teal'
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      </div>

      {/* Custom amount */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Custom amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none">$</span>
          <input
            type="number"
            min="1"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); if (e.target.value) setSelected('') }}
            placeholder="Other amount"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
          />
        </div>
      </div>

      {/* Summary */}
      {(custom || selected) && (
        <div className="mb-6 bg-msc-teal-light rounded-xl p-4 text-center">
          <p className="text-sm text-msc-teal font-semibold">
            You're donating <span className="text-lg font-bold">{activeAmount}</span>
            {frequency === 'monthly' ? ' per month' : ' (one-time)'}
          </p>
        </div>
      )}

      {/* Donate button */}
      <a
        href={donateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 rounded-xl text-center font-semibold text-base bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
      >
        Donate {activeAmount} Now →
      </a>

      <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
        Secure donation processing. Make Spanish Casual is a registered 501(c)3 nonprofit.<br />
        Donations are tax-deductible to the extent permitted by law.
      </p>
    </div>
  )
}
