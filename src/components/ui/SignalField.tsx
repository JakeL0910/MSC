'use client'

// SIGNAL FIELD — a generative backdrop of glowing horizontal streaks, in MSC's
// teal/amber/coral, concentrated in a central band like a spectrum. Purely
// decorative (aria-hidden, pointer-events-none). Animates a soft shimmer + slow
// drift; for reduced-motion users it paints a single static frame and stops.
// Canvas is sized to its parent and DPR-aware, so it stays crisp and cheap.
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Streak {
  yFrac: number // vertical position 0..1
  xFrac: number // horizontal center 0..1
  wFrac: number // width as fraction of canvas
  color: [number, number, number]
  phase: number
  speed: number
  baseAlpha: number
  thickness: number
}

// Brand palette the streaks draw from (teal-dominant, amber highlights, rare coral).
const PALETTE: [number, number, number][] = [
  [26, 107, 114], // teal
  [26, 107, 114],
  [63, 169, 176], // light teal
  [232, 160, 32], // amber
  [232, 160, 32],
  [224, 92, 75], // coral (rare)
]

function makeStreaks(count: number): Streak[] {
  const out: Streak[] = []
  for (let i = 0; i < count; i++) {
    // Concentrate vertically toward the center band.
    const u = Math.random() * 2 - 1
    const yFrac = 0.5 + u * Math.abs(u) * 0.46
    out.push({
      yFrac,
      xFrac: Math.random(),
      wFrac: 0.03 + Math.random() * 0.16,
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.1,
      baseAlpha: 0.12 + Math.random() * 0.5,
      thickness: 1 + Math.random() * 2.5,
    })
  }
  return out
}

export default function SignalField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!canvasRef.current) return
    const cvs = canvasRef.current
    const context = cvs.getContext('2d')
    if (!context) return
    // Non-null alias so the narrowing survives into the nested closures below.
    const ctx2d: CanvasRenderingContext2D = context

    let streaks: Streak[] = []
    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const parent = cvs.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      cvs.width = w * dpr
      cvs.height = h * dpr
      cvs.style.width = `${w}px`
      cvs.style.height = `${h}px`
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
      streaks = makeStreaks(Math.min(220, Math.max(60, Math.floor(w / 6))))
      if (reduce) draw(0)
    }

    function draw(t: number) {
      ctx2d.clearRect(0, 0, w, h)
      ctx2d.globalCompositeOperation = 'lighter'
      ctx2d.lineCap = 'round'
      for (const s of streaks) {
        const shimmer = reduce ? 0.75 : 0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase))
        const drift = reduce ? 0 : Math.sin(t * 0.0002 + s.phase) * 14
        const alpha = s.baseAlpha * shimmer
        const cx = s.xFrac * w + drift
        const halfW = (s.wFrac * w) / 2
        const y = s.yFrac * h
        const [r, g, b] = s.color
        const grad = ctx2d.createLinearGradient(cx - halfW, y, cx + halfW, y)
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx2d.strokeStyle = grad
        ctx2d.lineWidth = s.thickness
        ctx2d.beginPath()
        ctx2d.moveTo(cx - halfW, y)
        ctx2d.lineTo(cx + halfW, y)
        ctx2d.stroke()
      }
      ctx2d.globalCompositeOperation = 'source-over'
    }

    function loop(t: number) {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    if (cvs.parentElement) ro.observe(cvs.parentElement)
    resize()
    // Always paint one frame up front, so the field shows even before rAF runs
    // (e.g. a tab that loads in the background, where rAF is paused until shown).
    draw(0)
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />
}
