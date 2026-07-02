'use client'

// HEALTHCARE PHRASE LIBRARY — searchable, filterable phrase cards.
// Phrase content lives in src/data/phrases.ts.

import { useMemo, useState } from 'react'
import { phrases, phraseCategories, type PhraseCategory } from '@/data/phrases'
import Icon from '@/components/shared/Icons'

export default function PhraseLibrary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<PhraseCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return phrases.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      const matchesQuery =
        q === '' ||
        p.en.toLowerCase().includes(q) ||
        p.es.toLowerCase().includes(q) ||
        p.context.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" className="w-5 h-5" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phrases in English or Spanish…"
            aria-label="Search phrases"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
          {(['All', ...phraseCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === c
                  ? 'bg-msc-teal text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-msc-teal hover:text-msc-teal'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-2">No phrases match your search.</p>
          <button
            onClick={() => { setQuery(''); setCategory('All') }}
            className="text-sm text-msc-teal font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-5 text-center" aria-live="polite">
            Showing {filtered.length} of {phrases.length} phrases
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="inline-block self-start text-[11px] font-bold uppercase tracking-wider text-msc-teal bg-msc-teal-light rounded-full px-2.5 py-1 mb-4">
                  {p.category}
                </span>
                <p className="text-base font-semibold text-msc-charcoal mb-1.5">{p.en}</p>
                <p className="text-base text-msc-teal font-medium mb-4" lang="es">{p.es}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-auto border-t border-gray-100 pt-3">
                  {p.context}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
