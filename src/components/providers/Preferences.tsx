'use client'

// PREFERENCES — MLC serves neurodivergent and multilingual people, so tuning
// the experience is a feature, not a footnote. This provider holds three
// preferences, persists them, applies them to <html> as data attributes (CSS
// reads those), and — crucially — routes "reduce motion" through framer-motion's
// MotionConfig so EVERY animation (JS and CSS) goes still, not just the CSS ones.
import { MotionConfig } from 'framer-motion'
import { createContext, useContext, useEffect, useState } from 'react'

type Motion = 'system' | 'off'
type Contrast = 'normal' | 'high'
type TextSize = 'normal' | 'large'

interface Prefs {
  motion: Motion
  contrast: Contrast
  textSize: TextSize
}

const DEFAULTS: Prefs = { motion: 'system', contrast: 'normal', textSize: 'normal' }
const STORAGE_KEY = 'msc-prefs'

interface Ctx extends Prefs {
  setPref: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void
}

const PreferencesContext = createContext<Ctx | null>(null)

export function usePreferences(): Ctx {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}

export default function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)

  // Load saved prefs once, on the client.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setPrefs({ ...DEFAULTS, ...JSON.parse(saved) })
    } catch {
      /* ignore */
    }
  }, [])

  // Persist + reflect onto <html> for CSS to key off.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      /* ignore */
    }
    const el = document.documentElement
    el.dataset.motion = prefs.motion
    el.dataset.contrast = prefs.contrast
    el.dataset.textSize = prefs.textSize
  }, [prefs])

  const setPref: Ctx['setPref'] = (key, value) => setPrefs((p) => ({ ...p, [key]: value }))

  return (
    <PreferencesContext.Provider value={{ ...prefs, setPref }}>
      {/* "always" forces reduced motion for all framer-motion components (which
          read useReducedMotion); "user" defers to the OS setting. */}
      <MotionConfig reducedMotion={prefs.motion === 'off' ? 'always' : 'user'}>{children}</MotionConfig>
    </PreferencesContext.Provider>
  )
}
