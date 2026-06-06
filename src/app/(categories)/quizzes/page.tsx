import CategoryPage from '@/components/curriculum/CategoryPage';
import { sampleResources } from '@/data/sampleResources';

export default function QuizzesPage() {
  return (
    <CategoryPage
      type="quiz"
      title="Spanish Quizzes"
      description="Test your Spanish knowledge with our interactive quizzes. Track your progress and identify areas for improvement."
      resources={sampleResources}
    />
  );
} 