'use client'

import { useState, useMemo } from 'react';
import { Resource, ResourceType, DifficultyLevel } from '@/types/resources';
import ResourceCard from './ResourceCard';
import Link from 'next/link';

interface CategoryPageProps {
  type: ResourceType;
  title: string;
  description: string;
  resources: Resource[];
}

type SortKey = 'rating' | 'duration-asc' | 'duration-desc' | 'difficulty';

const difficultyOrder: Record<DifficultyLevel, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

const pluralLabel: Record<ResourceType, string> = {
  lesson: 'lessons',
  activity: 'activities',
  game: 'games',
  quiz: 'quizzes',
};

export default function CategoryPage({ type, title, description, resources }: CategoryPageProps) {
  const [sort, setSort] = useState<SortKey>('rating');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');

  const filtered = useMemo(() => {
    let list = resources.filter((r) => r.type === type);
    if (difficultyFilter !== 'all') {
      list = list.filter((r) => r.difficulty === difficultyFilter);
    }
    switch (sort) {
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'duration-asc':
        return [...list].sort((a, b) => a.duration - b.duration);
      case 'duration-desc':
        return [...list].sort((a, b) => b.duration - a.duration);
      case 'difficulty':
        return [...list].sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }
  }, [resources, type, sort, difficultyFilter]);

  return (
    <div className="bg-msc-cream min-h-screen">
      {/* Hero */}
      <section className="bg-msc-teal pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <nav className="flex items-center gap-1.5 text-white/60 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-white/70">
            {pluralLabel[type]}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">{title}</h1>
          <p className="text-lg text-white/85 max-w-xl leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-msc-charcoal">{filtered.length}</span> {filtered.length !== 1 ? pluralLabel[type] : type}
            </p>
            <div className="flex flex-wrap gap-3">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | 'all')}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-msc-teal/30 text-gray-700"
              >
                <option value="all">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-msc-teal/30 text-gray-700"
              >
                <option value="rating">Highest rated</option>
                <option value="duration-asc">Shortest first</option>
                <option value="duration-desc">Longest first</option>
                <option value="difficulty">Easiest first</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-2xl border border-gray-100">
              <p className="text-base font-semibold text-msc-charcoal mb-1">No {pluralLabel[type]} match this filter</p>
              <button
                onClick={() => setDifficultyFilter('all')}
                className="mt-3 text-sm text-msc-teal font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-msc-teal rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Want more?</h3>
            <p className="text-white/80 text-sm mb-5">
              Create a free account and we'll notify you when new {pluralLabel[type]} are added.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
