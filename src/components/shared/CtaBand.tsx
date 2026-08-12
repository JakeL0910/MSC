// Full-width closing call-to-action — a dark, generative "cinematic" moment that
// bookends every page, so the futuristic feel recurs instead of fizzling into
// plain content. Reuses the hero's signal field + grain + magnetic buttons.
import SignalField from '@/components/ui/SignalField'
import Grain from '@/components/ui/Grain'
import MagneticButton from '@/components/ui/MagneticButton'
import Reveal from '@/components/ui/Reveal'
import Icon from '@/components/shared/Icons'

export default function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string
  description: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#07171A] text-white"
      style={{ backgroundImage: 'radial-gradient(120% 120% at 50% 120%, #0E3236 0%, #08191C 55%, #050F11 100%)' }}
    >
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <SignalField />
      <Grain opacity={0.07} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Scrolling marquee band */}
      <div aria-hidden="true" className="marquee-mask relative overflow-hidden border-b border-white/10 py-3">
        <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-white/25">
          {[0, 1].map((k) => (
            <span key={k} className="flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mx-4">
                  Make Language Casual <span className="text-msc-amber/50">·</span> Many languages{' '}
                  <span className="text-msc-amber/50">·</span> One understanding{' '}
                  <span className="text-msc-amber/50">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container relative py-20 text-center md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60">{description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticButton href={primary.href} variant="light">
              {primary.label}
              <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </MagneticButton>
            {secondary && (
              <MagneticButton href={secondary.href} variant="outline-light">
                {secondary.label}
              </MagneticButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
