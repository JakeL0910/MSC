'use client';

import { Resource } from '@/types/resources';
import ResourceCard from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  isLoading?: boolean;
}

export default function ResourceGrid({ resources, isLoading = false }: ResourceGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-msc-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-14 bg-white rounded-2xl border border-gray-100">
        <p className="text-base font-semibold text-msc-charcoal mb-1">No resources found</p>
        <p className="text-sm text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
