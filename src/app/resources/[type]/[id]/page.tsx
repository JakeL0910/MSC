import { notFound } from 'next/navigation';
import { sampleResources } from '@/data/sampleResources';
import ResourceDetail from '@/components/curriculum/ResourceDetail';

interface ResourcePageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { type, id } = await params;
  const resource = sampleResources.find(
    (r) => r.id === id && r.type === type
  );

  if (!resource) {
    notFound();
  }

  return <ResourceDetail resource={resource} />;
}
