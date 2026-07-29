// Generative, on-brand cover art for cards and detail headers. Pure inline SVG
// (no external assets), so it's fast, self-contained, and accessible. Each card
// gets a distinct-but-cohesive gradient + motif, with the relevant icon badge.
// Decorative only — always aria-hidden; the card's heading carries the meaning.
import Icon from './Icons'

export type CoverPalette = 'teal' | 'amber' | 'coral' | 'sage'
export type CoverMotif = 'bubbles' | 'waves' | 'dots' | 'rings' | 'network'

const PALETTES: Record<CoverPalette, { from: string; to: string; badge: string }> = {
  teal: { from: '#1A6B72', to: '#0f4a4f', badge: '#1A6B72' },
  amber: { from: '#E8A020', to: '#c9861a', badge: '#b9791a' },
  coral: { from: '#E05C4B', to: '#c24736', badge: '#c24736' },
  sage: { from: '#2f8f88', to: '#1A6B72', badge: '#1A6B72' },
}

const PALETTE_ORDER: CoverPalette[] = ['teal', 'amber', 'coral', 'sage']
const MOTIF_ORDER: CoverMotif[] = ['bubbles', 'network', 'dots', 'rings', 'waves']

/** Pick a cohesive palette + motif from a stable seed (index or string). */
export function coverFor(seed: number | string): { palette: CoverPalette; motif: CoverMotif } {
  const n = typeof seed === 'number' ? seed : Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0)
  return { palette: PALETTE_ORDER[n % PALETTE_ORDER.length], motif: MOTIF_ORDER[n % MOTIF_ORDER.length] }
}

function Motif({ motif }: { motif: CoverMotif }) {
  const s = { stroke: 'white', fill: 'none', strokeWidth: 2, opacity: 0.28 } as const
  switch (motif) {
    case 'bubbles':
      return (
        <g opacity="0.9">
          <rect x="18" y="26" width="46" height="30" rx="10" fill="white" opacity="0.16" />
          <rect x="150" y="14" width="60" height="38" rx="12" fill="white" opacity="0.12" />
          <rect x="96" y="58" width="52" height="30" rx="10" fill="white" opacity="0.14" />
          <circle cx="34" cy="70" r="4" fill="white" opacity="0.2" />
          <circle cx="46" cy="76" r="3" fill="white" opacity="0.18" />
        </g>
      )
    case 'network':
      return (
        <g {...s}>
          <line x1="30" y1="30" x2="90" y2="60" /><line x1="90" y1="60" x2="160" y2="34" />
          <line x1="90" y1="60" x2="140" y2="92" /><line x1="30" y1="30" x2="60" y2="90" />
          {[[30, 30], [90, 60], [160, 34], [140, 92], [60, 90]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" fill="white" stroke="none" opacity="0.32" />
          ))}
        </g>
      )
    case 'dots':
      return (
        <g fill="white" opacity="0.22">
          {Array.from({ length: 5 }).flatMap((_, r) =>
            Array.from({ length: 12 }).map((__, c) => (
              <circle key={`${r}-${c}`} cx={14 + c * 18} cy={16 + r * 20} r="2.6" />
            )),
          )}
        </g>
      )
    case 'rings':
      return (
        <g {...s}>
          {[14, 30, 46, 62].map((r) => <circle key={r} cx="188" cy="24" r={r} />)}
          {[10, 22, 34].map((r) => <circle key={`b${r}`} cx="26" cy="94" r={r} />)}
        </g>
      )
    case 'waves':
      return (
        <g {...s}>
          {[24, 44, 64, 84].map((y) => (
            <path key={y} d={`M-10 ${y} Q 40 ${y - 16} 90 ${y} T 200 ${y} T 320 ${y}`} />
          ))}
        </g>
      )
  }
}

export default function CoverArt({
  icon,
  palette,
  motif,
  seed,
  label,
  className = 'h-36',
}: {
  icon: string
  palette?: CoverPalette
  motif?: CoverMotif
  /** Alternative to palette/motif: derive both from a stable seed. */
  seed?: number | string
  label?: string
  /** Height utility (e.g. 'h-36', 'h-44', 'aspect-[16/9]'). */
  className?: string
}) {
  const picked = seed !== undefined ? coverFor(seed) : null
  const p = PALETTES[palette ?? picked?.palette ?? 'teal']
  const m = motif ?? picked?.motif ?? 'bubbles'

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 224 108"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <Motif motif={m} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 shadow-sm" style={{ color: p.badge }}>
          <Icon name={icon} className="h-7 w-7" />
        </span>
      </div>
      {label && (
        <span className="absolute bottom-2.5 left-3 rounded-full bg-white/85 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-msc-charcoal">
          {label}
        </span>
      )}
    </div>
  )
}
