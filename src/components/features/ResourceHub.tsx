'use client'

// RESOURCE HUB — filterable grid of all MSC resources.
// Resource content lives in src/data/resources.ts.

import { useMemo, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { resources, resourceCategories, type Resource } from '@/data/resources'
import Icon from '@/components/shared/Icons'

const formatIcons: Record<Resource['format'], string> = {
  Guide: 'book-open',
  Toolkit: 'clipboard-check',
  'Phrase Cards': 'chat',
  Checklist: 'check',
  Worksheet: 'document-text',
  Summary: 'beaker',
}

function ResourceCard({ resource }: { resource: Resource }) {
  const category = resourceCategories.find((c) => c.id === resource.category)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <span className="w-11 h-11 rounded-xl bg-msc-teal-light text-msc-teal flex items-center justify-center">
          <Icon name={formatIcons[resource.format]} className="w-6 h-6" />
        </span>
        {resource.featured && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-msc-amber bg-msc-amber-light rounded-full px-2.5 py-1">
            Featured
          </span>
        )}
      </div>

      <p className="text-[11px] font-bold uppercase tracking-wider text-msc-teal mb-1.5">
        {category?.label}
      </p>
      <h3 className="text-lg font-bold text-msc-charcoal mb-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{resource.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs text-gray-500 bg-gray-50 rounded-full px-2.5 py-1">{resource.format}</span>
        {resource.languages.map((lang) => (
          <span key={lang} className="text-xs text-gray-500 bg-gray-50 rounded-full px-2.5 py-1">
            {lang}
          </span>
        ))}
      </div>

      <div className="flex gap-2.5 mt-auto">
        <Link
          href={`/resources/${resource.slug}`}
          className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200"
        >
          View Details
        </Link>
        {resource.file && (
          <a
            href={resource.file}
            download
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-msc-amber text-msc-charcoal hover:bg-amber-400 transition-colors"
          >
            <Icon name="download" className="w-4 h-4" />
            PDF
          </a>
        )}
      </div>
    </div>
  )
}

function ResourceHubInner() {
  // Supports deep links like /resources?category=healthcare-spanish
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'
  const [category, setCategory] = useState(
    resourceCategories.some((c) => c.id === initialCategory) ? initialCategory : 'all'
  )
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((r) => {
      const matchesCategory = category === 'all' || r.category === category
      const matchesQuery =
        q === '' ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const activeCategory = resourceCategories.find((c) => c.id === category)

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon name="search" className="w-5 h-5" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources…"
          aria-label="Search resources"
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-msc-teal/30 focus:border-msc-teal transition-colors"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-4" role="group" aria-label="Filter by category">
        <button
          onClick={() => setCategory('all')}
          aria-pressed={category === 'all'}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === 'all'
              ? 'bg-msc-teal text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-msc-teal hover:text-msc-teal'
          }`}
        >
          All Resources
        </button>
        {resourceCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            aria-pressed={category === c.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c.id
                ? 'bg-msc-teal text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-msc-teal hover:text-msc-teal'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {activeCategory && (
        <p className="text-sm text-gray-500 text-center mb-8">{activeCategory.description}</p>
      )}
      {!activeCategory && <div className="mb-8" />}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-2">No resources match your search.</p>
          <button
            onClick={() => { setQuery(''); setCategory('all') }}
            className="text-sm text-msc-teal font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-5 text-center" aria-live="polite">
            Showing {filtered.length} of {resources.length} resources
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function ResourceHub() {
  // useSearchParams requires a Suspense boundary in the App Router
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading resources…</div>}>
      <ResourceHubInner />
    </Suspense>
  )
}
