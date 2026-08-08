'use client'

// ROUTE TRANSITION — template.tsx remounts on every navigation, so wrapping the
// page in a motion element gives each route a soft fade-and-rise entrance. This
// makes moving between pages feel like one continuous surface rather than a hard
// reload. Header/Footer live in layout (outside this), so only the page content
// transitions. Reduced-motion users get the content immediately, no animation.
import { motion, useReducedMotion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
