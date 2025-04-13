
import React, { useEffect, useState } from 'react';
import { Brain, Zap, Award, BarChart2, Star, Sparkles, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressPanelProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  badges: number;
  streak?: number;
  topics?: number;
  avgResponse?: number;
  rank?: number;
  messageCount?: number;
  skillProgress?: {[key: string]: number};
}

const ProgressPanel: React.FC<ProgressPanelProps> = ({ 
  level, 
  xp, 
  nextLevelXp, 
  badges,
  streak = 1,
  topics = 5,
  avgResponse = 0,
  rank = 42,
  messageCount = 0,
  skillProgress = { 'Python': 35, 'Web Dev': 20, 'AI': 15, 'Security': 10 }
}) => {
  const progressPercentage = Math.min(100, (xp / nextLevelXp) * 100);
  const calculatedAvgResponse = Math.min(98, Math.floor(60 + (xp / 2) + (streak * 2)));
  const displayedAvgResponse = avgResponse > 0 ? avgResponse : calculatedAvgResponse;
  
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpGainAmount, setXpGainAmount] = useState(0);
  const [prevXp, setPrevXp] = useState(xp);
  
  // Detect XP changes and show animation
  useEffect(() => {
    if (xp > prevXp) {
      const gain = xp - prevXp;
      setXpGainAmount(gain);
      setShowXpGain(true);
      
      // Hide the animation after 2 seconds
      const timer = setTimeout(() => {
        setShowXpGain(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    setPrevXp(xp);
  }, [xp, prevXp]);
  
  // Animation variants
  const xpGainVariants = {
    initial: { opacity: 0, y: 0 },
    animate: { 
      opacity: 1, 
      y: -30,
      transition: { duration: 1.5 }
    },
    exit: { opacity: 0 }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-panel p-4 mb-4 animate-fade-in relative"
    >
      <AnimatePresence>
        {showXpGain && (
          <motion.div
            variants={xpGainVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-2 right-2 font-orbitron text-cyber-green text-sm font-bold"
          >
            +{xpGainAmount} XP!
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center justify-between mb-3">
        <motion.h3 
          whileHover={{ scale: 1.05 }}
          className="font-orbitron text-lg flex items-center"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 10, 0, -10, 0], 
              scale: [1, 1.1, 1, 1.1, 1] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Brain size={20} className="text-cyber-blue mr-2 animate-pulse-glow" />
          </motion.div>
          Progress
        </motion.h3>
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Award size={18} className="text-cyber-pink mr-1" />
          <motion.span 
            className="text-cyber-pink font-bold"
            initial={{ scale: 1 }}
            animate={{ scale: badges > 3 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: badges > 3 ? Infinity : 0, repeatDelay: 5 }}
          >
            {badges}
          </motion.span>
        </motion.div>
      </div>
      
      <div className="mb-1 flex justify-between text-sm">
        <motion.span 
          className="font-orbitron text-cyber-blue"
          whileHover={{ scale: 1.05 }}
        >
          Level {level}
          {level > 5 && <Sparkles className="inline ml-1 text-yellow-400" size={14} />}
        </motion.span>
        <span className="text-muted-foreground">{xp}/{nextLevelXp} XP</span>
      </div>
      
      <div className="w-full h-3 bg-cyber-darker rounded-full mb-4 cyber-border relative overflow-hidden">
        <motion.div 
          className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center absolute top-0 left-0"
          initial={{ width: `${(prevXp / nextLevelXp) * 100}%` }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {progressPercentage > 15 && (
            <motion.span 
              className="ml-2 text-xs font-bold"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap size={8} className="inline text-white mr-1" />
            </motion.span>
          )}
        </motion.div>
      </div>
      
      {/* Skill progress tracking */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Skills Progress</h4>
        {Object.entries(skillProgress).map(([skill, progress]) => (
          <div key={skill} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{skill}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-cyber-darker rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-cyber-green to-cyber-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="cyber-panel p-2 text-center"
        >
          <div className="text-xs text-muted-foreground">Topics</div>
          <div className="font-orbitron text-cyber-green text-lg">{topics}</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="cyber-panel p-2 text-center relative"
        >
          <div className="text-xs text-muted-foreground">Days Streak</div>
          <div className="font-orbitron text-cyber-purple text-lg flex items-center justify-center">
            {streak}
            {streak > 3 && (
              <motion.div 
                animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-1"
              >
                <Trophy size={14} className="text-yellow-400" />
              </motion.div>
            )}
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="cyber-panel p-2 text-center"
        >
          <div className="text-xs text-muted-foreground">Messages</div>
          <div className="font-orbitron text-cyber-blue text-lg">{messageCount}</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="cyber-panel p-2 text-center"
        >
          <div className="text-xs text-muted-foreground">Avg. Response</div>
          <div className="font-orbitron text-cyber-blue text-lg">{displayedAvgResponse}%</div>
          <div className="w-full mt-1">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
              className="h-1 bg-cyber-darker"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${displayedAvgResponse}%` }}
                transition={{ type: "spring", stiffness: 50 }}
                className="h-1 bg-cyber-blue"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.button 
        className="cyber-button w-full mt-3 text-sm flex items-center justify-center neon-glow"
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 168, 255, 0.5)" }}
        whileTap={{ scale: 0.95 }}
      >
        <BarChart2 size={16} className="mr-2" />
        View Analytics
      </motion.button>
    </motion.div>
  );
};

export default ProgressPanel;
