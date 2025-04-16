
export interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string | number;
  type: 'multiple-choice' | 'fill-in-blank';
}

export interface Quiz {
  topic: string;
  badgeId: string;
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
  questions: Question[];
}
