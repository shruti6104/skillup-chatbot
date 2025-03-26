
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Skill {
  name: string;
  progress: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserProfile {
  streak: number;
  messageCount: number;
  topicsExplored: string[];
  skillProgress: {[key: string]: number};
  level: number;
  xp: number;
  badges: number;
}
