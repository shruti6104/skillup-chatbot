
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Brain, Code, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillBadgesProps {
  skillProgress: {[key: string]: number};
}

const SkillBadges: React.FC<SkillBadgesProps> = ({ skillProgress }) => {
  const badges = [
    { name: 'Python', icon: <Code className="w-3 h-3" />, color: 'bg-blue-500' },
    { name: 'Web Dev', icon: <Globe className="w-3 h-3" />, color: 'bg-green-500' },
    { name: 'AI', icon: <Brain className="w-3 h-3" />, color: 'bg-purple-500' },
    { name: 'Soft Skills', icon: <Star className="w-3 h-3" />, color: 'bg-yellow-500' },
    { name: 'Expert', icon: <Trophy className="w-3 h-3" />, color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {badges.map((badge) => {
        const progress = skillProgress[badge.name] || 0;
        const isUnlocked = progress >= 50;

        return (
          <motion.div
            key={badge.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant="secondary"
              className={`${isUnlocked ? badge.color : 'bg-gray-500'} text-white flex items-center gap-1 cursor-help transition-colors`}
            >
              {badge.icon}
              {badge.name}
            </Badge>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillBadges;
