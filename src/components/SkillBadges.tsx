
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Brain, Code, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SkillBadgesProps {
  skillProgress: {[key: string]: number};
}

const SkillBadges: React.FC<SkillBadgesProps> = ({ skillProgress }) => {
  const badges = [
    { name: 'Python', icon: <Code className="w-3 h-3" />, color: 'bg-blue-500', gradientColors: 'from-blue-400 to-blue-600' },
    { name: 'Web Dev', icon: <Globe className="w-3 h-3" />, color: 'bg-green-500', gradientColors: 'from-green-400 to-green-600' },
    { name: 'AI', icon: <Brain className="w-3 h-3" />, color: 'bg-purple-500', gradientColors: 'from-purple-400 to-purple-600' },
    { name: 'Soft Skills', icon: <Star className="w-3 h-3" />, color: 'bg-yellow-500', gradientColors: 'from-yellow-400 to-yellow-600' },
    { name: 'Cybersecurity', icon: <Shield className="w-3 h-3" />, color: 'bg-red-500', gradientColors: 'from-red-400 to-red-600' },
  ];

  const getLevelInfo = (progress: number) => {
    if (progress >= 90) return { level: 'Master', emoji: '🏆' };
    if (progress >= 70) return { level: 'Expert', emoji: '⭐' };
    if (progress >= 50) return { level: 'Advanced', emoji: '📚' };
    if (progress >= 30) return { level: 'Intermediate', emoji: '📝' };
    if (progress > 0) return { level: 'Beginner', emoji: '🔰' };
    return { level: 'Not Started', emoji: '❓' };
  };

  return (
    <TooltipProvider>
      <div className="space-y-2 mb-4">
        <h3 className="font-orbitron text-sm text-cyber-blue mb-2">Skill Progress</h3>
        <div className="space-y-2">
          {badges.map((badge) => {
            const progress = skillProgress[badge.name] || 0;
            const isUnlocked = progress >= 1;
            const { level, emoji } = getLevelInfo(progress);
            
            return (
              <Tooltip key={badge.name}>
                <TooltipTrigger asChild>
                  <div className="space-y-1 cursor-help">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <motion.div
                          className={`p-1 rounded-md ${isUnlocked ? badge.color + '/20' : 'bg-gray-500/20'}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {badge.icon}
                        </motion.div>
                        <span className="text-xs">{badge.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{level} {emoji}</span>
                    </div>
                    <div className="relative h-1.5 w-full rounded-full bg-cyber-darker overflow-hidden">
                      {progress > 0 && (
                        <motion.div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${badge.gradientColors}`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="text-xs">
                    <p className="font-semibold">{badge.name} - {level}</p>
                    <p>Progress: {progress}%</p>
                    {progress >= 50 && <p>Badge unlocked!</p>}
                    {progress < 50 && <p>Reach 50% to unlock badge</p>}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SkillBadges;
