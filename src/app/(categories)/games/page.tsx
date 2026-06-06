import CategoryPage from '@/components/curriculum/CategoryPage';
import { sampleResources } from '@/data/sampleResources';

export default function GamesPage() {
  return (
    <CategoryPage
      type="game"
      title="Spanish Learning Games"
      description="Learn Spanish through interactive and engaging games. Perfect for practicing vocabulary, grammar, and pronunciation in a fun way."
      resources={sampleResources}
    />
  );
} 