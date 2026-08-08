'use client'

// TEXT REVEAL — oversized headlines rise word-by-word from behind a mask, the
// way the reference title resolves. Give it plain text; pass a set of words to
// `accent` to render those in the animated brand gradient. Reduced-motion users
// get the finished text with no animation.
import { motion, useReducedMotion } from 'framer-motion'

export default function TextReveal({
  text,
  accent = [],
  accentClassName = 'gradient-text',
  className = '',
  delay = 0,
  stagger = 0.05,
}: {
  text: string
  /** Words (exact matches, punctuation-insensitive) to render in the gradient. */
  accent?: string[]
  /** Class applied to accent words (use gradient-text-bright on dark surfaces). */
  accentClassName?: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const accentSet = new Set(accent.map((w) => w.toLowerCase()))
  const isAccent = (w: string) => accentSet.has(w.replace(/[.,!?;:]/g, '').toLowerCase())

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i} className={isAccent(w) ? accentClassName : undefined}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-flex overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${isAccent(w) ? accentClassName : ''}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
