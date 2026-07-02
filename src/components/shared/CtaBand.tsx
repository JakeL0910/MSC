// Full-width teal call-to-action band used at the bottom of most pages.
import Link from 'next/link'

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
    <section className="relative overflow-hidden bg-msc-teal">
      <div className="pointer-events-none absolute -top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 w-80 h-80 rounded-full bg-msc-amber/10 blur-3xl" aria-hidden="true" />

      <div className="container relative py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-msc-teal-light/90 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={primary.href} className="btn-primary">
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white border-2 border-white/40 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
