'use client'

// Scroll-reveal wrapper: children fade + rise into place the first time they
// scroll into view. Server components can pass server-rendered children.
// Respects prefers-reduced-motion (renders static).
import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode
  delay?: number
  /** Vertical travel distance in px (set 0 for a pure fade). */
  y?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)', scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
