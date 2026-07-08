'use client'

// Small click-to-copy button used on the /brand page (hex codes, boilerplate).
import { useState } from 'react'

export default function CopyButton({
  text,
  label = 'Copy',
  className = '',
}: {
  text: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1 text-xs font-semibold rounded-lg px-2.5 py-1 transition-all duration-200 ${
        copied
          ? 'bg-msc-teal text-white'
          : 'bg-white/80 text-msc-teal hover:bg-msc-teal-light border border-gray-200'
      } ${className}`}
      aria-label={`Copy ${text}`}
    >
      {copied ? '✓ Copied' : label}
    </button>
  )
}
