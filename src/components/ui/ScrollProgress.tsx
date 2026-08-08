'use client'

// A thin page scroll-progress bar pinned to the very top, in the brand gradient.
// Springy so it feels alive without being twitchy. Hidden for reduced-motion
// users (it's decorative and the value is conveyed by the scrollbar itself).
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-msc-teal via-msc-amber to-msc-coral" />
    </motion.div>
  )
}
