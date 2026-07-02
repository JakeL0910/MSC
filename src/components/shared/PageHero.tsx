// Reusable page header used on every interior page: eyebrow label, big
// headline, supporting text, and optional CTA buttons.
import Link from 'next/link'

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: { label: string; href: string; variant?: 'primary' | 'secondary' }[]
}) {
  return (
    <section className="relative overflow-hidden bg-msc-teal-light/60">
      {/* soft decorative shapes */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-msc-teal/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-msc-amber/10 blur-3xl" aria-hidden="true" />

      <div className="container relative py-16 md:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="inline-block text-xs font-bold uppercase tracking-widest text-msc-teal bg-white/80 rounded-full px-3.5 py-1.5 mb-5">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-msc-charcoal mb-5">{title}</h1>
          {description && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{description}</p>
          )}
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-8">
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
      </div>
    </section>
  )
}
