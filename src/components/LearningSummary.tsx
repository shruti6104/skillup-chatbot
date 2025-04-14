
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Target, Zap, Trophy, Star, Medal } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningSummaryProps {
  sessionTime: number; // in minutes
  topicsExplored: string[];
  lastTopic: string;
  messageCount: number;
}

const LearningSummary: React.FC<LearningSummaryProps> = ({ 
  sessionTime, 
  topicsExplored, 
  lastTopic,
  messageCount
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [prevSessionTime, setPrevSessionTime] = useState(0);
  const [prevTopicCount, setPrevTopicCount] = useState(0);
  
  // Calculate statistics
  const focusScore = Math.min(100, sessionTime * 5);
  const topicCount = topicsExplored.length;
  const efficiency = Math.min(100, messageCount > 0 ? (topicCount / messageCount) * 100 : 0);
  
  // Trigger confetti when achievements reached
  useEffect(() => {
    // Check if there's progress since last render
    if ((sessionTime > prevSessionTime && sessionTime % 10 === 0) || 
        (topicCount > prevTopicCount)) {
      setShowConfetti(true);
      
      // Launch confetti
      const duration = 2000;
      const end = Date.now() + duration;
      
      const launchConfetti = () => {
        confetti({
          particleCount: 25,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#00a8ff', '#9b87f5', '#ff5baf'],
          disableForReducedMotion: true
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(launchConfetti);
        }
      };
      
      launchConfetti();
      setTimeout(() => setShowConfetti(false), duration);
    }
    
    setPrevSessionTime(sessionTime);
    setPrevTopicCount(topicCount);
  }, [sessionTime, topicCount, prevSessionTime, prevTopicCount]);
  
  // Animations for the stats
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <motion.div 
      className="cyber-panel p-4 mb-6 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {showConfetti && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div id="confetti-container" className="w-full h-full"></div>
        </div>
      )}
      
      <div className="relative z-20">
        <motion.div 
          className="flex items-center justify-center mb-3"
          variants={itemVariants}
        >
          <Trophy className="text-yellow-400 mr-2" size={20} />
          <h3 className="font-orbitron text-lg text-center cyber-gradient-text">Learning Summary</h3>
          <Star className="text-yellow-400 ml-2" size={20} />
        </motion.div>
        
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            className="cyber-panel p-3 flex items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 0 15px rgba(0, 168, 255, 0.5)",
              borderColor: "rgba(0, 168, 255, 0.8)" 
            }}
          >
            <div className="mr-3 p-2 rounded-full bg-cyber-blue/20">
              <Clock size={18} className="text-cyber-blue" />
            </div>
            <div className="w-full">
              <div className="text-sm font-semibold">Session Time</div>
              <div className="flex items-center">
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full mt-1"
                  style={{ width: `${Math.min(100, sessionTime)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, sessionTime)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <span className="ml-2 text-xs text-cyber-blue">{sessionTime}m</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="cyber-panel p-3 flex items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 0 15px rgba(155, 135, 245, 0.5)",
              borderColor: "rgba(155, 135, 245, 0.8)"  
            }}
          >
            <div className="mr-3 p-2 rounded-full bg-cyber-purple/20">
              <Brain size={18} className="text-cyber-purple" />
            </div>
            <div className="w-full">
              <div className="text-sm font-semibold">Topics Explored</div>
              <div className="flex items-center">
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full mt-1"
                  style={{ width: `${Math.min(100, topicCount * 10)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, topicCount * 10)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <span className="ml-2 text-xs text-cyber-purple">{topicCount}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="cyber-panel p-3 flex items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 0 15px rgba(255, 91, 175, 0.5)",
              borderColor: "rgba(255, 91, 175, 0.8)"  
            }}
          >
            <div className="mr-3 p-2 rounded-full bg-cyber-pink/20">
              <Target size={18} className="text-cyber-pink" />
            </div>
            <div className="w-full">
              <div className="text-sm font-semibold">Focus Score</div>
              <div className="flex items-center">
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyber-pink to-cyber-green rounded-full mt-1"
                  style={{ width: `${focusScore}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${focusScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <span className="ml-2 text-xs text-cyber-pink">{focusScore}%</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="cyber-panel p-3 flex items-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 0 15px rgba(46, 213, 115, 0.5)",
              borderColor: "rgba(46, 213, 115, 0.8)"  
            }}
          >
            <div className="mr-3 p-2 rounded-full bg-cyber-green/20">
              <Zap size={18} className="text-cyber-green" />
            </div>
            <div className="w-full">
              <div className="text-sm font-semibold">Learning Efficiency</div>
              <div className="flex items-center">
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyber-green to-cyber-blue rounded-full mt-1"
                  style={{ width: `${efficiency}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${efficiency}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <span className="ml-2 text-xs text-cyber-green">{efficiency.toFixed(0)}%</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {lastTopic && (
          <motion.div 
            className="mt-3 p-3 bg-cyber-darker/80 rounded-md text-center relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
            />
            <div className="flex items-center justify-center">
              <Medal className="text-cyber-blue mr-2" size={16} />
              <span className="text-xs">Currently learning: </span>
              <span className="text-cyber-blue font-semibold ml-1">{lastTopic}</span>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-3 text-xs text-center text-cyber-green"
          variants={itemVariants}
        >
          Keep learning to unlock new achievements!
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LearningSummary;
