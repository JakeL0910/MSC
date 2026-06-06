'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Resource } from '@/types/resources'

const categories = [
  { slug: 'all', label: 'All' },
  { slug: 'lesson', label: 'Lessons' },
  { slug: 'activity', label: 'Activities' },
  { slug: 'game', label: 'Games' },
  { slug: 'quiz', label: 'Quizzes' },
]

const difficultyClass: Record<string, string> = {
  beginner: 'bg-msc-teal text-white',
  intermediate: 'bg-msc-amber text-msc-charcoal',
  advanced: 'bg-msc-coral text-white',
}

const typeLabel: Record<string, string> = {
  lesson: 'Lesson',
  activity: 'Activity',
  game: 'Game',
  quiz: 'Quiz',
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" className="fill-amber-400 flex-shrink-0" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.type}/${resource.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-msc-teal/20 transition-all"
    >
      {/* Image — keep pixel height for next/image fill constraint */}
      <div className="relative flex-shrink-0 overflow-hidden bg-gray-100" style={{ height: '160px' }}>
        <Image
          src={resource.imageUrl}
          alt={resource.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${difficultyClass[resource.difficulty] ?? 'bg-msc-teal text-white'}`}>
            {resource.difficulty}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-gray-700">
            {typeLabel[resource.type] ?? resource.type}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-sm font-bold mb-1.5 text-msc-charcoal group-hover:text-msc-teal transition-colors leading-snug">
          {resource.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 flex-1 leading-relaxed">{resource.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{resource.duration} min</span>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="text-xs font-medium text-gray-600">{resource.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function FilterableGrid({ resources }: { resources: Resource[] }) {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all' ? resources : resources.filter((r) => r.type === active)

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by type">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            aria-pressed={active === cat.slug}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              active === cat.slug
                ? 'bg-msc-teal border-msc-teal text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-msc-teal/50 hover:text-msc-teal'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-12 text-gray-500 text-sm">
          No resources found in this category yet. More coming soon!
        </p>
      )}
    </>
  )
}
