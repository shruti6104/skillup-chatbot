
import React from 'react';
import { Award, Star, Code, Brain, Globe, Zap, Shield, BookOpen, PenTool, CircleCheck } from 'lucide-react';
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

// Default badges to use in the app - updated with current dates
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

export const defaultBadges: BadgeItem[] = [
  {
    id: 'first-chat',
    name: 'First Conversation',
    description: 'Started your first conversation with SkillUp AI',
    icon: <Star size={18} className="text-yellow-400" />,
    earned: true,
    date: `${currentYear}-${formattedMonth}-01`
  },
  {
    id: 'python-beginner',
    name: 'Python Beginner',
    description: 'Completed the basics of Python programming',
    icon: <Code size={18} className="text-blue-400" />,
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
    id: 'web-explorer',
    name: 'Web Explorer',
    description: 'Learned the basics of web development',
    icon: <Globe size={18} className="text-green-400" />,
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
  }
];

export default BadgesSection;
