// EDITORIAL PRIMITIVES — the technical, magazine-like framing: numbered section
// markers, rotated edge labels, and hairline rules. Static server components.
import Reveal from '@/components/ui/Reveal'

/** A numbered section marker: "00 — THE PATTERN IN THE WORK". */
export function SectionMarker({
  index,
  label,
  tone = 'dark',
  className = '',
}: {
  index: number
  label: string
  /** "dark" for light backgrounds, "light" for dark backgrounds. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  const ink = tone === 'light' ? 'text-white/60' : 'text-msc-teal'
  const ring = tone === 'light' ? 'border-white/25 text-white/80' : 'border-msc-teal/30 text-msc-teal'
  const rule = tone === 'light' ? 'bg-white/15' : 'bg-msc-charcoal/10'
  return (
    <Reveal className={`flex items-center gap-3 ${className}`} y={12}>
      <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-semibold tabular-nums ${ring}`}>
        {String(index).padStart(2, '0')}
      </span>
      <span className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${ink}`}>{label}</span>
      <span className={`h-px flex-1 ${rule}`} aria-hidden="true" />
    </Reveal>
  )
}

/** A vertical, rotated label pinned to an edge (decorative metadata). */
export function EdgeLabel({
  children,
  side = 'right',
  tone = 'dark',
}: {
  children: React.ReactNode
  side?: 'left' | 'right'
  tone?: 'dark' | 'light'
}) {
  const ink = tone === 'light' ? 'text-white/40' : 'text-msc-charcoal/40'
  const pos = side === 'right' ? 'right-4 lg:right-6' : 'left-4 lg:left-6'
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] lg:block ${ink} ${pos}`}
    >
      {children}
    </span>
  )
}

/** A hairline divider. */
export function Hairline({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const rule = tone === 'light' ? 'bg-white/15' : 'bg-msc-charcoal/10'
  return <div className={`h-px w-full ${rule} ${className}`} aria-hidden="true" />
}
