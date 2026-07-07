'use client'

// Animated stat counter: "1,200+" counts up from 0 when scrolled into view.
// Non-numeric values (and reduced-motion users) render as static text.
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  // Split "1,200+" into prefix / number / suffix; bail out if no number.
  const match = value.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/)
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : NaN
  const hasCommas = match ? match[2].includes(',') : false

  const [display, setDisplay] = useState(reduceMotion || !match ? value : `${match[1]}0${match[3]}`)

  useEffect(() => {
    if (!inView || reduceMotion || !match || isNaN(target)) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = Math.round(v)
        setDisplay(`${match[1]}${hasCommas ? n.toLocaleString('en-US') : n}${match[3]}`)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, target])

  return (
    <span ref={ref} className={className}>
      {match && !reduceMotion ? display : value}
    </span>
  )
}
