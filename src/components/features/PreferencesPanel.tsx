'use client'

// PREFERENCES PANEL — a floating control to tune motion, contrast, and text
// size. Presented plainly and proudly, because for MLC's audience "make this
// yours" is the brand. Closes on Escape or outside click; fully keyboard usable.
import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '@/components/providers/Preferences'

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">{label}</p>
      <div className="inline-flex rounded-lg border border-gray-200 p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              value === o.value ? 'bg-msc-teal text-white' : 'text-gray-600 hover:text-msc-teal'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function PreferencesPanel() {
  const { motion, contrast, textSize, setPref } = usePreferences()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-[70] print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility preferences"
          className="animate-dropdown mb-3 w-72 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl"
        >
          <p className="mb-4 text-sm font-bold text-msc-charcoal">Tune this experience</p>
          <div className="space-y-4">
            <Segmented
              label="Motion"
              value={motion}
              onChange={(v) => setPref('motion', v)}
              options={[
                { value: 'system', label: 'System' },
                { value: 'off', label: 'Reduced' },
              ]}
            />
            <Segmented
              label="Contrast"
              value={contrast}
              onChange={(v) => setPref('contrast', v)}
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High' },
              ]}
            />
            <Segmented
              label="Text size"
              value={textSize}
              onChange={(v) => setPref('textSize', v)}
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'large', label: 'Large' },
              ]}
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-400">Saved on this device. Change anytime.</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Accessibility preferences"
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-msc-teal text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-msc-teal/40 focus-visible:ring-offset-2"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M9.5 8l-1.2 11M14.5 8l1.2 11M12 8v4m0 0l-2.5 7M12 12l2.5 7" />
        </svg>
      </button>
    </div>
  )
}
