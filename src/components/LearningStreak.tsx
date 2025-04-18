
import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningStreakProps {
  streak: number;
  todayLearned: boolean;
}

const LearningStreak: React.FC<LearningStreakProps> = ({ streak, todayLearned }) => {
  return (
    <motion.div
      className="flex items-center gap-2 p-2 bg-cyber-darker rounded-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: todayLearned ? [1, 1.2, 1] : 1,
            rotate: todayLearned ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: todayLearned ? Infinity : 0, repeatDelay: 2 }}
        >
          <Flame className={`w-5 h-5 ${todayLearned ? 'text-orange-500' : 'text-gray-500'}`} />
        </motion.div>
        {streak >= 7 && (
          <Trophy className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500" />
        )}
      </div>
      <span className="text-sm font-medium">
        {streak} day{streak !== 1 ? 's' : ''} streak!
      </span>
    </motion.div>
  );
};

export default LearningStreak;
