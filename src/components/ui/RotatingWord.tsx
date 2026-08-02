'use client'

// Cycles through a list of words in place, one at a time, with a soft blur-rise
// transition. Used for the hero headline accent. Respects reduced-motion
// (renders the first word, static). Words should be a similar length so the
// layout stays calm.
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function RotatingWord({
  words,
  className,
  interval = 2400,
}: {
  words: string[]
  className?: string
  interval?: number
}) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce || words.length < 2) return
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [reduce, words.length, interval])

  if (reduce) return <span className={className}>{words[0]}</span>

  return (
    <span className="relative inline-block align-bottom">
      {/* invisible sizer keeps the line height stable */}
      <span className="invisible" aria-hidden="true">
        {words[i]}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className={`absolute left-0 top-0 whitespace-nowrap ${className ?? ''}`}
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-0.35em', filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
