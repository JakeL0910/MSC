'use client'

// LANGUAGE PICKER — the signature interaction of the membership flow.
// Type to search a curated list of world languages (shown with their autonym),
// click to add. Anything not listed can be added as free text, so no one's
// language is ever excluded. Selected languages render as chips that animate
// in and can be removed. Value is a plain string[] of language names.
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { COMMON_LANGUAGES } from '@/data/members'

export default function LanguagePicker({
  value,
  onChange,
}: {
  value: string[]
  onChange: (langs: string[]) => void
}) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()

  const selectedLower = useMemo(() => new Set(value.map((v) => v.toLowerCase())), [value])
  const q = query.trim().toLowerCase()

  const suggestions = useMemo(() => {
    return COMMON_LANGUAGES.filter(
      (l) =>
        !selectedLower.has(l.name.toLowerCase()) &&
        (q === '' || l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q)),
    ).slice(0, 8)
  }, [q, selectedLower])

  // Offer a free-text add when the query doesn't exactly match a suggestion.
  const exactExists =
    q !== '' &&
    (selectedLower.has(q) || COMMON_LANGUAGES.some((l) => l.name.toLowerCase() === q))
  const canAddCustom = q !== '' && !exactExists

  function add(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    if (selectedLower.has(trimmed.toLowerCase())) return
    onChange([...value, trimmed])
    setQuery('')
    inputRef.current?.focus()
  }

  function remove(name: string) {
    onChange(value.filter((v) => v !== name))
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (suggestions[0]) add(suggestions[0].name)
      else if (canAddCustom) add(query)
    } else if (e.key === 'Backspace' && query === '' && value.length > 0) {
      remove(value[value.length - 1])
    }
  }

  const chipMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8, y: 4 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div>
      <label htmlFor="lang-search" className="block text-sm font-semibold text-msc-charcoal">
        Languages you speak <span className="text-msc-coral">*</span>
      </label>
      <p className="mt-0.5 text-xs text-gray-500">
        Add every language you can offer. Not listed? Type it and press add.
      </p>

      {/* Selected chips + input, styled as one field */}
      <div
        className={`mt-2 flex flex-wrap items-center gap-2 rounded-xl border bg-white px-3 py-2.5 transition-colors ${
          focused ? 'border-msc-teal ring-2 ring-msc-teal/20' : 'border-gray-200'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence initial={false}>
          {value.map((lang) => (
            <motion.span
              key={lang}
              layout={!reduce}
              {...chipMotion}
              className="inline-flex items-center gap-1.5 rounded-lg bg-msc-teal-light px-2.5 py-1 text-sm font-medium text-msc-teal-dark"
            >
              {lang}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  remove(lang)
                }}
                aria-label={`Remove ${lang}`}
                className="rounded-full text-msc-teal/70 hover:text-msc-coral"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          id="lang-search"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          placeholder={value.length === 0 ? 'Search languages…' : 'Add another…'}
          className="min-w-[8rem] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-gray-400"
          autoComplete="off"
        />
      </div>

      {/* Suggestions dropdown */}
      {focused && (suggestions.length > 0 || canAddCustom) && (
        <div className="relative">
          <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
            {suggestions.map((l) => (
              <li key={l.name}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    add(l.name)
                  }}
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-msc-cream"
                >
                  <span className="font-medium text-msc-charcoal">{l.name}</span>
                  <span className="text-gray-400">{l.native}</span>
                </button>
              </li>
            ))}
            {canAddCustom && (
              <li>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    add(query)
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-msc-teal hover:bg-msc-cream"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add “{query.trim()}”
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
