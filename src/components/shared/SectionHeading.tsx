// Consistent section heading: small eyebrow, headline, optional subtext.
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
    <div className={`max-w-2xl mb-12 ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-msc-teal mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-msc-charcoal mb-4">{title}</h2>
      {description && <p className="text-gray-600 leading-relaxed">{description}</p>}
    </div>
  )
}
