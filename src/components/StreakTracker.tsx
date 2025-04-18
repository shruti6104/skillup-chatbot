
import React, { useState, useEffect } from 'react';
import { Calendar, Flame, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface StreakTrackerProps {
  onStreakUpdated?: (streak: number) => void;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ onStreakUpdated }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedStreak = localStorage.getItem('skillup_streak') || '0';
    const storedLastLogin = localStorage.getItem('skillup_last_login');
    setCurrentStreak(parseInt(storedStreak, 10));
    setLastLoginDate(storedLastLogin);
    
    // Check if this is a new day login
    const today = new Date().toLocaleDateString();
    if (storedLastLogin !== today) {
      // If last login was yesterday, increment streak
      if (storedLastLogin) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toLocaleDateString();
        
        if (storedLastLogin === yesterdayString) {
          const newStreak = parseInt(storedStreak, 10) + 1;
          setCurrentStreak(newStreak);
          localStorage.setItem('skillup_streak', newStreak.toString());
          
          if (onStreakUpdated) {
            onStreakUpdated(newStreak);
          }
          
          setShowAnimation(true);
          
          // Show celebration for milestone streaks
          if (newStreak === 7 || newStreak === 30 || newStreak === 100 || newStreak % 50 === 0) {
            toast({
              title: `${newStreak} Day Streak! 🔥`,
              description: `Amazing dedication! You've been learning for ${newStreak} days in a row.`,
              duration: 5000,
            });
          }
        } else {
          // Streak broken if not consecutive days
          // But don't reset if it's the first login of the day
          if (storedLastLogin !== null) {
            setCurrentStreak(1);
            localStorage.setItem('skillup_streak', '1');
            
            if (parseInt(storedStreak, 10) > 1) {
              toast({
                title: "Streak Reset",
                description: "Don't worry! A new streak begins today.",
                duration: 3000,
              });
            }
          }
        }
      }
      
      // Update last login to today
      localStorage.setItem('skillup_last_login', today);
      setLastLoginDate(today);
    }
  }, [onStreakUpdated]);

  const flameVariants = {
    idle: {
      scale: 1,
      rotate: 0
    },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 1,
        repeat: 3,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-cyber-darker/50 p-2 rounded-lg">
      <motion.div
        variants={flameVariants}
        initial="idle"
        animate={showAnimation ? "animate" : "idle"}
        onAnimationComplete={() => setShowAnimation(false)}
        className="relative"
      >
        <Flame className="text-orange-500" size={20} />
        {currentStreak >= 7 && (
          <motion.div 
            className="absolute -top-1 -right-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Award className="text-yellow-400" size={10} />
          </motion.div>
        )}
      </motion.div>
      
      <div className="text-sm">
        <div className="flex items-center">
          <span className="font-semibold">{currentStreak} day{currentStreak !== 1 ? 's' : ''}</span>
          {currentStreak >= 3 && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="ml-1 text-xs text-cyber-green"
            >
              🔥
            </motion.span>
          )}
        </div>
        <div className="text-xs text-gray-400 flex items-center">
          <Calendar size={10} className="mr-1" />
          {lastLoginDate ? `Last: ${lastLoginDate}` : 'First day'}
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;
