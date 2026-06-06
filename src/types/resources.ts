export type ResourceType = 'game' | 'activity' | 'lesson' | 'quiz';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  difficulty: DifficultyLevel;
  imageUrl: string;
  duration: number; // in minutes
  category: string;
  tags: string[];
  rating: number;
  completionRate?: number;
} 