import CategoryPage from '@/components/curriculum/CategoryPage';
import { sampleResources } from '@/data/sampleResources';

export default function LessonsPage() {
  return (
    <CategoryPage
      type="lesson"
      title="Spanish Lessons"
      description="Structured Spanish lessons covering grammar, vocabulary, and cultural topics. Learn at your own pace with our comprehensive curriculum."
      resources={sampleResources}
    />
  );
} 