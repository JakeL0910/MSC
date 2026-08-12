// GRAIN — a static film-grain overlay for dark sections, the thing that turns a
// flat dark div into something cinematic. Pure SVG turbulence as a data URI, no
// animation (so nothing to gate for reduced motion), decorative + non-blocking.
// Place it ABOVE the background layers but BELOW the text so copy stays crisp.

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export default function Grain({
  opacity = 0.06,
  className = '',
  fixed = false,
  blend = 'overlay',
  animated = false,
}: {
  opacity?: number
  className?: string
  /** Fixed = a site-wide layer (in the layout); otherwise scoped to a parent section. */
  fixed?: boolean
  blend?: React.CSSProperties['mixBlendMode']
  /** Subtle film-grain flicker (gated by reduced-motion in CSS). */
  animated?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none inset-0 ${fixed ? 'fixed z-[1]' : 'absolute'} ${animated ? 'grain-flicker' : ''} ${className}`}
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: '140px 140px',
        opacity,
        mixBlendMode: blend,
      }}
    />
  )
}
