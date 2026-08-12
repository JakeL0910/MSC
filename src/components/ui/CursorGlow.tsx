'use client'

// CURSOR GLOW — a soft teal→amber light that trails the cursor, springy and
// subtle. Screen blend means it glows on the dark heroes/CTAs and stays quiet on
// light content. Desktop only (pointer:fine) and off for reduced-motion users,
// so it never adds distraction for anyone who's opted out.
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const SIZE = 620

export default function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 })
  const [fine, setFine] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return
    setFine(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, x, y])

  if (reduce || !fine) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2] rounded-full"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background: 'radial-gradient(circle, rgba(95,208,216,0.16), rgba(232,160,32,0.05) 40%, transparent 62%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
