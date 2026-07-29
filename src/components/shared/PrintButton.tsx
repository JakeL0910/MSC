'use client'

// Prints / saves the current resource as a PDF via the browser's print dialog.
// The print CSS in globals.css scopes output to #resource-print.
import Icon from '@/components/shared/Icons'

export default function PrintButton({ label = 'Print / Save as PDF' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-primary w-full text-sm inline-flex items-center justify-center gap-2"
    >
      <Icon name="download" className="h-4 w-4" />
      {label}
    </button>
  )
}
