
import React from 'react';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LearningStreakProps {
  streak: number;
  todayLearned: boolean;
}

const LearningStreak: React.FC<LearningStreakProps> = ({ streak, todayLearned }) => {
  // Calculate milestone - next milestone or current milestone
  const getMilestoneInfo = () => {
    const milestones = [3, 7, 14, 30, 60, 100];
    const nextMilestone = milestones.find(m => streak < m) || (streak + 5);
    const daysLeft = nextMilestone - streak;
    
    return { nextMilestone, daysLeft };
  };
  
  const { nextMilestone, daysLeft } = getMilestoneInfo();
  
  // Dynamic flame color based on streak length
  const getFlameColor = () => {
    if (!todayLearned) return 'text-gray-500';
    if (streak >= 30) return 'text-red-500';
    if (streak >= 7) return 'text-orange-500';
    return 'text-yellow-500';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center gap-2 p-2 bg-cyber-darker rounded-lg cursor-help"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: todayLearned ? [1, 1.2, 1] : 1,
                  rotate: todayLearned ? [0, -5, 5, 0] : 0,
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: todayLearned ? Infinity : 0, 
                  repeatDelay: 3 
                }}
              >
                <Flame className={`w-5 h-5 ${getFlameColor()}`} />
              </motion.div>
              {streak >= 7 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Trophy className="w-3 h-3 text-yellow-500" />
                </motion.div>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-sm font-medium">{streak} day{streak !== 1 ? 's' : ''}</span>
                {todayLearned && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="ml-1"
                  >
                    <span className="text-xs text-cyber-green">✓</span>
                  </motion.div>
                )}
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {daysLeft > 0 ? `${daysLeft} to ${nextMilestone}` : 'Milestone reached!'}
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="text-xs">
            <p className="font-semibold mb-1">Learning Streak: {streak} days</p>
            <p>Today's progress: {todayLearned ? '✓ Completed' : '⊗ Not started'}</p>
            <p>Next milestone: {nextMilestone} days</p>
            {streak >= 7 && <p className="text-yellow-500">🏆 Week milestone unlocked!</p>}
            {streak >= 30 && <p className="text-orange-500">🔥 Month milestone unlocked!</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LearningStreak;
