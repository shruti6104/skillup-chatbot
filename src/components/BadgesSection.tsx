
import React from 'react';
import { Award, Star, Code, Brain, Globe, Zap, Shield, BookOpen, PenTool, CircleCheck, Trophy, BarChart, LucideIcon, Book, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
}

interface BadgesSectionProps {
  badges: BadgeItem[];
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ badges }) => {
  return (
    <div className="cyber-panel p-4 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-lg flex items-center">
          <Award size={20} className="text-cyber-pink mr-2" />
          Achievements
        </h3>
        <Badge className="bg-cyber-pink text-black">{badges.filter(b => b.earned).length}/{badges.length}</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className={`cyber-panel p-3 ${badge.earned ? 'border-cyber-blue' : 'border-cyber-darker opacity-60'}`}
          >
            <div className="flex items-center mb-2">
              <div className={`mr-3 p-2 rounded-full ${badge.earned ? 'bg-cyber-blue/20' : 'bg-cyber-darker'}`}>
                {badge.icon}
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${badge.earned ? 'text-cyber-blue' : 'text-muted-foreground'}`}>
                  {badge.name}
                </h4>
                {badge.earned && badge.date && (
                  <span className="text-xs text-cyber-green">Earned on {badge.date}</span>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default badges to use in the app - with only the First Conversation badge earned by default
const getCurrentFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const defaultBadges: BadgeItem[] = [
  {
    id: 'first-chat',
    name: 'First Conversation',
    description: 'Started your first conversation with SkillUp AI',
    icon: <Star size={18} className="text-yellow-400" />,
    earned: true,
    date: getCurrentFormattedDate()
  },
  {
    id: 'python-beginner',
    name: 'Python Beginner',
    description: 'Completed the basics of Python programming',
    icon: <Code size={18} className="text-blue-400" />,
    earned: false
  },
  {
    id: 'python-expert',
    name: 'Python Advanced',
    description: 'Mastered advanced Python concepts',
    icon: <Code size={18} className="text-blue-500" />,
    earned: false
  },
  {
    id: 'python-master',
    name: 'Python Master',
    description: 'Achieved expert-level Python knowledge',
    icon: <Trophy size={18} className="text-blue-600" />,
    earned: false
  },
  {
    id: 'ai-enthusiast',
    name: 'AI Enthusiast',
    description: 'Explored the fundamentals of artificial intelligence',
    icon: <Brain size={18} className="text-purple-400" />,
    earned: false
  },
  {
    id: 'ai-specialist',
    name: 'AI Specialist',
    description: 'Mastered advanced AI concepts',
    icon: <Brain size={18} className="text-purple-500" />,
    earned: false
  },
  {
    id: 'ai-master',
    name: 'AI Master',
    description: 'Achieved expert-level AI knowledge',
    icon: <Trophy size={18} className="text-purple-600" />,
    earned: false
  },
  {
    id: 'web-explorer',
    name: 'Web Explorer',
    description: 'Learned the basics of web development',
    icon: <Globe size={18} className="text-green-400" />,
    earned: false
  },
  {
    id: 'web-architect',
    name: 'Web Architect',
    description: 'Mastered advanced web development concepts',
    icon: <Globe size={18} className="text-green-500" />,
    earned: false
  },
  {
    id: 'web-master',
    name: 'Web Master',
    description: 'Achieved expert-level web development knowledge',
    icon: <Trophy size={18} className="text-green-600" />,
    earned: false
  },
  {
    id: 'cyber-guardian',
    name: 'Cyber Guardian',
    description: 'Discovered the principles of cybersecurity',
    icon: <Shield size={18} className="text-red-400" />,
    earned: false
  },
  {
    id: 'cyber-expert',
    name: 'Cyber Expert',
    description: 'Mastered advanced cybersecurity concepts',
    icon: <Shield size={18} className="text-red-500" />,
    earned: false
  },
  {
    id: 'cyber-master',
    name: 'Cyber Master',
    description: 'Achieved expert-level cybersecurity knowledge',
    icon: <Trophy size={18} className="text-red-600" />,
    earned: false
  },
  {
    id: 'quick-learner',
    name: 'Quick Learner',
    description: 'Completed 5 different topics in a single day',
    icon: <Zap size={18} className="text-yellow-400" />,
    earned: false
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Asked more than 50 learning questions',
    icon: <BookOpen size={18} className="text-blue-400" />,
    earned: false
  },
  {
    id: 'skill-master',
    name: 'Skill Master',
    description: 'Reached proficiency in at least one skill',
    icon: <CircleCheck size={18} className="text-green-400" />,
    earned: false
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Understood the fundamentals of data science',
    icon: <BarChart size={18} className="text-cyan-400" />,
    earned: false
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Mastered advanced data science concepts',
    icon: <BarChart size={18} className="text-cyan-500" />,
    earned: false
  },
  {
    id: 'data-master',
    name: 'Data Science Master',
    description: 'Achieved expert-level knowledge in data science',
    icon: <Trophy size={18} className="text-cyan-600" />,
    earned: false
  },
  {
    id: 'ml-practitioner',
    name: 'ML Practitioner',
    description: 'Learned the fundamentals of machine learning',
    icon: <Brain size={18} className="text-amber-400" />,
    earned: false
  },
  {
    id: 'ml-expert',
    name: 'ML Expert',
    description: 'Mastered advanced machine learning techniques',
    icon: <Brain size={18} className="text-amber-500" />,
    earned: false
  },
  {
    id: 'ml-master',
    name: 'ML Master',
    description: 'Achieved expert-level knowledge in machine learning',
    icon: <Trophy size={18} className="text-amber-600" />,
    earned: false
  },
  {
    id: 'deep-learning-specialist',
    name: 'Deep Learning Specialist',
    description: 'Mastered deep learning fundamentals',
    icon: <Brain size={18} className="text-indigo-400" />,
    earned: false
  },
  {
    id: 'deep-learning-master',
    name: 'Deep Learning Master',
    description: 'Achieved expert-level knowledge in deep learning',
    icon: <Trophy size={18} className="text-indigo-600" />,
    earned: false
  },
  {
    id: 'communication-pro',
    name: 'Communication Pro',
    description: 'Learned communication fundamentals',
    icon: <MessageSquare size={18} className="text-pink-400" />,
    earned: false
  },
  {
    id: 'communication-expert',
    name: 'Communication Expert',
    description: 'Mastered advanced communication techniques',
    icon: <MessageSquare size={18} className="text-pink-500" />,
    earned: false
  },
  {
    id: 'communication-master',
    name: 'Communication Master',
    description: 'Achieved expert-level knowledge in communication',
    icon: <Trophy size={18} className="text-pink-600" />,
    earned: false
  },
  {
    id: 'soft-skills-expert',
    name: 'Soft Skills Expert',
    description: 'Mastered advanced soft skills',
    icon: <Book size={18} className="text-orange-500" />,
    earned: false
  },
  {
    id: 'soft-skills-master',
    name: 'Soft Skills Master',
    description: 'Achieved expert-level soft skills knowledge',
    icon: <Trophy size={18} className="text-orange-600" />,
    earned: false
  }
];

export default BadgesSection;
