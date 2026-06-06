import CategoryPage from '@/components/curriculum/CategoryPage';
import { sampleResources } from '@/data/sampleResources';

export default function ActivitiesPage() {
  return (
    <CategoryPage
      type="activity"
      title="Spanish Activities"
      description="Engage in interactive Spanish activities designed to improve your language skills through practical exercises and real-world scenarios."
      resources={sampleResources}
    />
  );
} 