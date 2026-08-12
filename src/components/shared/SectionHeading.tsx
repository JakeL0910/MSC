// Consistent section heading: small eyebrow, headline, optional subtext.
// Fades up smoothly as it scrolls into view.
import Reveal from '@/components/ui/Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <Reveal className={`max-w-2xl mb-12 ${alignment}`}>
      {eyebrow && (
        <p className="mb-3">
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-msc-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-msc-amber animate-pulse-soft" aria-hidden="true" />
            {eyebrow}
            <span className="hidden h-px w-8 bg-msc-teal/30 sm:inline-block" aria-hidden="true" />
          </span>
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-msc-charcoal mb-4">{title}</h2>
      {description && <p className="serif-lead text-gray-600 leading-relaxed">{description}</p>}
    </Reveal>
  )
}
