'use client'

// Printable one-page Language Access Plan template.
// PRIVACY: fields are uncontrolled and never stored or transmitted — nothing is
// saved to a server, to MLC, or to the browser. "Print / Save as PDF" uses the
// browser's own print dialog (scoped by print CSS in globals.css to
// #access-plan-print). This is a personal educational + self-advocacy resource,
// not a clinical assessment or an official accommodation document.

const prompts: { id: string; label: string }[] = [
  { id: 'understand', label: 'I understand information best when…' },
  { id: 'helps', label: 'It helps when people give me…' },
  { id: 'time', label: 'I may need extra processing time to…' },
  { id: 'respond', label: 'I prefer to respond or participate by…' },
  { id: 'clarify', label: 'When I need clarification, I can say…' },
  { id: 'languages', label: 'Languages I use include…' },
  { id: 'groups', label: 'In group conversations, it helps when…' },
  { id: 'boundaries', label: 'Language preferences and boundaries that matter to me…' },
  { id: 'repair', label: 'If there is a misunderstanding, we can…' },
  { id: 'settings', label: 'Supports that help me at home, school, events, or online…' },
  { id: 'know', label: 'Something I want others to know about my language is…' },
]

export default function AccessPlanTemplate() {
  return (
    <div>
      {/* Privacy + action bar — hidden when printing */}
      <div className="no-print mb-6 rounded-2xl border border-msc-teal/20 bg-msc-teal-light/40 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            <strong className="font-semibold text-msc-charcoal">Private by design.</strong> Anything
            you type stays in your browser. It is <strong>not saved and not sent</strong> to MLC or
            anyone else. Use the button to print it or save it as a PDF for yourself.
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary whitespace-nowrap self-start"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Printable region */}
      <div id="access-plan-print" className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="mb-6 border-b border-gray-100 pb-5">
          <h3 className="text-2xl font-bold text-msc-charcoal">My Language Access Plan</h3>
          <p className="mt-1 text-sm text-gray-500">
            A personal, one-page resource for how I use language best. Educational and for
            self-advocacy, not a clinical assessment or an official accommodation document.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Name (optional)</span>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Date (optional)</span>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {prompts.map((p) => (
            <label key={p.id} className="block">
              <span className="text-sm font-semibold text-msc-charcoal">{p.label}</span>
              <textarea
                rows={2}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm leading-relaxed focus:border-msc-teal focus:outline-none focus:ring-2 focus:ring-msc-teal/20"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
