'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Resource } from '@/types/resources';

interface ResourceDetailProps {
  resource: Resource;
}

const difficultyClass: Record<string, string> = {
  beginner: 'bg-msc-teal text-white',
  intermediate: 'bg-msc-amber text-msc-charcoal',
  advanced: 'bg-msc-coral text-white',
};

const typeColor: Record<string, string> = {
  game: 'bg-msc-teal-light text-msc-teal',
  activity: 'bg-msc-amber-light text-msc-charcoal',
  lesson: 'bg-msc-coral-light text-msc-coral',
  quiz: 'bg-gray-100 text-gray-700',
};

const typeLabel: Record<string, string> = {
  lesson: 'Lesson',
  activity: 'Activity',
  game: 'Game',
  quiz: 'Quiz',
};

export default function ResourceDetail({ resource }: ResourceDetailProps) {
  const router = useRouter();
  const { title, description, type, difficulty, imageUrl, duration, category, tags, rating, completionRate } = resource;

  return (
    <div className="bg-msc-cream min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-gray-500 flex-wrap gap-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-msc-teal transition-colors">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/courses" className="hover:text-msc-teal transition-colors capitalize">Courses</Link>
          <span className="mx-1.5">/</span>
          <span className="text-msc-charcoal font-medium line-clamp-1">{title}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Hero image */}
          <div className="relative overflow-hidden" style={{ height: '280px' }}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${difficultyClass[difficulty] ?? 'bg-msc-teal text-white'}`}>
                  {difficulty}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${typeColor[type] ?? 'bg-gray-100 text-gray-700'}`}>
                  {typeLabel[type] ?? type}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white text-balance">{title}</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-5 pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                </svg>
                {duration} minutes
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating.toFixed(1)} rating
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 capitalize">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {category}
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-gray-700 leading-relaxed mb-6">{description}</p>

            {/* Progress bar */}
            {completionRate !== undefined && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Your progress</span>
                  <span className="font-semibold text-msc-teal">{completionRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-msc-teal rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Topics covered</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-msc-cream text-gray-600 rounded-full text-xs font-medium border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-msc-amber text-msc-charcoal hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                Sign In to Track Progress
              </Link>
              <button
                onClick={() => router.push('/register')}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm border-2 border-msc-teal text-msc-teal hover:bg-msc-teal hover:text-white transition-all duration-200"
              >
                Begin {typeLabel[type] ?? type}
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-4">
              All MSC resources are free. Create a free account to save your progress.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-msc-teal hover:text-msc-teal-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all courses
          </Link>
        </div>
      </div>
    </div>
  );
}
