'use client'

// Shared form building blocks used by every MSC form.
//
// HOW FORM SUBMISSION WORKS (no backend required):
// Forms validate on the frontend, then open the visitor's email client with
// a pre-filled message via mailto. To switch to a real form backend later
// (Formspree, Netlify Forms, etc.), replace the buildMailto/submit step in
// each form with a fetch() to your endpoint — the fields and validation
// already work.

export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-msc-coral" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
      />
    </div>
  )
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder = 'Select…',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-msc-coral" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows = 5,
  required = false,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-msc-coral" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors resize-none"
      />
    </div>
  )
}

export function FormError({ message }: { message: string }) {
  if (!message) return null
  return (
    <div role="alert" className="bg-msc-coral-light text-msc-coral text-sm px-4 py-3 rounded-xl font-medium">
      {message}
    </div>
  )
}

export function SuccessCard({
  title,
  message,
  onReset,
  resetLabel = 'Submit another response',
}: {
  title: string
  message: string
  onReset: () => void
  resetLabel?: string
}) {
  return (
    <div className="text-center py-10">
      <div className="w-12 h-12 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-msc-charcoal mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed max-w-sm mx-auto">{message}</p>
      <button type="button" onClick={onReset} className="text-sm text-msc-teal font-medium hover:underline">
        {resetLabel}
      </button>
    </div>
  )
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function buildMailto(to: string, subject: string, lines: [string, string][]): string {
  const body = lines
    .filter(([, v]) => v.trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
