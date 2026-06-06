import Image from 'next/image';
import Link from 'next/link';
import { Resource } from '@/types/resources';

const difficultyClass: Record<string, string> = {
  beginner: 'bg-msc-teal text-white',
  intermediate: 'bg-msc-amber text-msc-charcoal',
  advanced: 'bg-msc-coral text-white',
};

const typeLabel: Record<string, string> = {
  lesson: 'Lesson',
  activity: 'Activity',
  game: 'Game',
  quiz: 'Quiz',
};

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { id, title, description, type, difficulty, imageUrl, duration, rating, completionRate } = resource;

  return (
    <Link
      href={`/resources/${type}/${id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-msc-teal/20 transition-all"
    >
      <div className="relative flex-shrink-0 overflow-hidden bg-gray-100" style={{ height: '160px' }}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${difficultyClass[difficulty] ?? 'bg-msc-teal text-white'}`}>
            {difficulty}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-gray-700">
            {typeLabel[type] ?? type}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-sm font-bold mb-1.5 text-msc-charcoal group-hover:text-msc-teal transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 flex-1 leading-relaxed line-clamp-2">{description}</p>

        {completionRate !== undefined && (
          <div className="mb-3">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-msc-teal rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{completionRate}% complete</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{duration} min</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 20 20" className="fill-amber-400 flex-shrink-0">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
