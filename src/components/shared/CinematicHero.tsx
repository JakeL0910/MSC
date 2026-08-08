// CINEMATIC HERO — the dark, generative opening moment for flagship pages.
// A signal-field backdrop, a huge ghosted wordmark, editorial corner metadata,
// a word-by-word revealing headline, and magnetic CTAs. Composes client pieces
// but stays a server component itself. Flows into the light content below.
import SignalField from '@/components/ui/SignalField'
import Grain from '@/components/ui/Grain'
import TextReveal from '@/components/ui/TextReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import Icon from '@/components/shared/Icons'
import { EdgeLabel } from '@/components/shared/Editorial'

interface Action {
  label: string
  href: string
  variant?: 'light' | 'outline-light'
}

export default function CinematicHero({
  eyebrow,
  meta,
  title,
  accent = [],
  description,
  actions = [],
  ghost,
  edgeLabel,
  footerLeft,
  footerRight,
}: {
  eyebrow: string
  meta?: string
  /** A string is revealed word-by-word; a node is rendered as-is (page-controlled). */
  title: React.ReactNode
  accent?: string[]
  description?: React.ReactNode
  actions?: Action[]
  /** The giant ghosted word behind the content. */
  ghost?: string
  edgeLabel?: string
  footerLeft?: string
  footerRight?: string
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#0A1E20] text-white"
      style={{ backgroundImage: 'radial-gradient(120% 90% at 50% -10%, #103A3E 0%, #0A1E20 55%, #071619 100%)' }}
    >
      <SignalField />
      <Grain opacity={0.07} />

      {/* Ghost wordmark */}
      {ghost && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[26vw] font-black leading-none tracking-tighter text-white/[0.035]"
        >
          {ghost}
        </span>
      )}

      {/* subtle top + bottom fades for depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

      {edgeLabel && <EdgeLabel tone="light">{edgeLabel}</EdgeLabel>}

      <div className="container relative">
        {/* Top metadata bar */}
        <div className="animate-enter flex items-center justify-between gap-4 pt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-msc-amber animate-pulse-soft" aria-hidden="true" />
            {eyebrow}
          </span>
          {meta && <span className="hidden sm:block">{meta}</span>}
        </div>

        {/* Headline block */}
        <div className="flex min-h-[62vh] flex-col justify-center py-20 md:min-h-[68vh]">
          <h1 className="max-w-5xl text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            {typeof title === 'string' ? <TextReveal text={title} accent={accent} accentClassName="gradient-text-bright" /> : title}
          </h1>
          {description && (
            <p className="animate-enter enter-delay-3 mt-7 max-w-xl text-lg leading-relaxed text-white/60">{description}</p>
          )}
          {actions.length > 0 && (
            <div className="animate-enter enter-delay-4 mt-9 flex flex-wrap gap-3">
              {actions.map((a) => (
                <MagneticButton key={a.href + a.label} href={a.href} variant={a.variant ?? 'light'}>
                  {a.label}
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </MagneticButton>
              ))}
            </div>
          )}
        </div>

        {/* Bottom hairline + metadata + scroll cue */}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 py-5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
          <span>{footerLeft ?? eyebrow}</span>
          <span className="hidden items-center gap-2 sm:inline-flex" aria-hidden="true">
            Scroll
            <span className="relative block h-6 w-px overflow-hidden bg-white/20">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-2 bg-msc-amber" />
            </span>
          </span>
          <span>{footerRight ?? meta}</span>
        </div>
      </div>
    </section>
  )
}
