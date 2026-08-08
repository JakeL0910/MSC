'use client'

// UNDERSTANDING SLIDER — drag to turn noise into meaning. To the right of the
// handle a message is just static; to the left it resolves into a clear
// sentence. It dramatizes what language access does, and ties back to the
// hero's signal field (signal → meaning). Monospace keeps the two layers
// perfectly aligned during the wipe.
//
// Fully accessible: it's a real slider (role, aria-value*, keyboard arrows /
// Home / End), works by pointer or touch, and both end-states are labelled so
// the meaning survives even without interacting.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const NOISE_CHARS = '▚▞▖▗▘▝░▒▓/\\|=-_~≈≠×+·'.split('')

// Deterministic noise: same output on server and client (no Math.random during
// render), so hydration matches. Still looks varied per character/position.
function noiseFrom(text: string): string {
  let out = ''
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === ' ') {
      out += ' '
      continue
    }
    const idx = (ch.charCodeAt(0) * 31 + i * 17) % NOISE_CHARS.length
    out += NOISE_CHARS[idx]
  }
  return out
}

export default function UnderstandingSlider({
  message = 'I need to see a doctor for my son.',
  caption = 'For someone navigating a new language, essential moments can sound like noise — until access makes them clear.',
}: {
  message?: string
  caption?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(22)
  const noise = useMemo(() => noiseFrom(message), [message])

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const pct = ((clientX - r.left) / r.width) * 100
    setValue(Math.max(0, Math.min(100, pct)))
  }, [])

  // Pointer drag (covers mouse + touch via pointer events).
  const [dragging, setDragging] = useState(false)
  useEffect(() => {
    if (!dragging) return
    const move = (e: PointerEvent) => setFromClientX(e.clientX)
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [dragging, setFromClientX])

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 20 : 5
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setValue((v) => Math.min(100, v + step)) }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setValue((v) => Math.max(0, v - step)) }
    else if (e.key === 'Home') { e.preventDefault(); setValue(0) }
    else if (e.key === 'End') { e.preventDefault(); setValue(100) }
  }

  const pct = Math.round(value)

  return (
    <div className="mx-auto max-w-2xl">
      {/* End labels */}
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
        <span className="text-msc-teal">Understood</span>
        <span>Just sound</span>
      </div>

      {/* The message box — draggable */}
      <div
        ref={trackRef}
        className="relative cursor-ew-resize select-none overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-10 shadow-sm"
        onPointerDown={(e) => { setDragging(true); setFromClientX(e.clientX) }}
      >
        {/* Clear message — clipped to the understood (left) side only, so the
            noise fully replaces it on the right rather than showing through. */}
        <p
          className="text-center font-mono text-xl font-semibold leading-relaxed text-msc-charcoal md:text-2xl"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          {message}
        </p>

        {/* Noise, clipped to the right of the handle */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center font-mono text-xl font-semibold leading-relaxed text-msc-teal/55 md:text-2xl"
          style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        >
          {noise}
        </p>

        {/* Divider + handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${value}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-msc-teal/60" />
          <button
            type="button"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Drag to turn sound into understanding"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => { e.stopPropagation(); setDragging(true) }}
            className="pointer-events-auto absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-msc-teal/30 bg-white text-msc-teal shadow-md transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-msc-teal/40"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Readout + caption */}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-msc-teal tabular-nums">{pct}% understood</p>
        <p className="text-right text-sm leading-relaxed text-gray-500">{caption}</p>
      </div>
    </div>
  )
}
