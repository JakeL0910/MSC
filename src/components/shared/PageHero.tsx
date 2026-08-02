// Reusable page header used on every interior page: eyebrow label, big
// headline, supporting text, and optional CTA buttons. Content staggers in
// on load (CSS animation — stays a server component). Pass `illustration` to
// show an on-brand hero graphic on the right (desktop only).
import Link from 'next/link'
import Illustration, { type IllustrationName } from './Illustration'

export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  actions,
  illustration,
}: {
  eyebrow?: string
  title: string
  /** Optional trailing phrase rendered as an animated brand gradient. */
  titleAccent?: string
  description?: string
  actions?: { label: string; href: string; variant?: 'primary' | 'secondary' }[]
  illustration?: IllustrationName
}) {
  return (
    <section className="relative overflow-hidden bg-msc-teal-light/60">
      {/* soft decorative shapes */}
      <div className="animate-blob pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
      <div className="animate-blob-slow pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-msc-amber/10 blur-3xl" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-msc-coral/10 blur-3xl" aria-hidden="true" />

      <div className="container relative py-16 md:py-20">
        <div className={illustration ? 'grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center' : ''}>
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="animate-enter inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-msc-teal bg-white/80 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-msc-amber animate-pulse-soft" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            <h1 className="animate-enter enter-delay-1 text-4xl md:text-5xl font-bold text-msc-charcoal mb-5 leading-[1.08]">
              {title}
              {titleAccent && (
                <>
                  {' '}
                  <span className="gradient-text">{titleAccent}</span>
                </>
              )}
            </h1>
            {description && (
              <p className="animate-enter enter-delay-2 serif-lead text-lg text-gray-600 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className="animate-enter enter-delay-3 flex flex-wrap gap-3 mt-8">
                {actions.map((a) => (
                  <Link
                    key={a.href + a.label}
                    href={a.href}
                    className={a.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {illustration && (
            <div className="animate-enter enter-delay-2 hidden lg:block">
              <Illustration name={illustration} className="animate-float w-full max-w-md ml-auto h-auto" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
