'use client'

// A link that subtly leans toward the cursor (magnetic), with the label
// drifting a touch further for depth, then springs back on leave. Falls back to
// a plain button for reduced-motion users and touch devices (no hover there).
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Variant = 'primary' | 'light' | 'outline-light'

const VARIANTS: Record<Variant, string> = {
  // On light surfaces — the brand teal fill.
  primary: 'bg-msc-teal text-white shadow-sm hover:bg-msc-teal-dark',
  // On dark surfaces — a warm cream chip.
  light: 'bg-msc-cream text-msc-charcoal hover:bg-white',
  // On dark surfaces — hairline outline.
  'outline-light': 'border border-white/25 text-white hover:bg-white/10',
}

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  strength = 0.35,
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  /** 0–1: how far the button follows the cursor. */
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 })
  // The label leans a little further than the button for parallax depth.
  const lx = useTransform(sx, (v) => v * 0.4)
  const ly = useTransform(sy, (v) => v * 0.4)

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-200 will-change-transform'

  if (reduce) {
    return (
      <Link href={href} className={`${base} ${VARIANTS[variant]} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`${base} ${VARIANTS[variant]} ${className}`}
      >
        <motion.span style={{ x: lx, y: ly }} className="inline-flex items-center gap-2">
          {children}
        </motion.span>
      </Link>
    </motion.div>
  )
}
