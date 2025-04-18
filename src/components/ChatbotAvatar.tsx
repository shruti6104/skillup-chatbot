
import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatbotAvatarProps {
  size?: number;
  animation?: any;
  className?: string;
}

const ChatbotAvatar: React.FC<ChatbotAvatarProps> = ({ 
  size = 40, 
  animation,
  className = "" 
}) => {
  const avatarVariants = {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={avatarVariants}
      animate="animate"
    >
      <div 
        className="rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Brain className="text-white" size={size * 0.5} />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20"
          variants={glowVariants}
          animate="animate"
        />
      </div>
      
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-green rounded-full"
        variants={glowVariants}
        animate="animate"
      />
      
      <motion.div
        className="absolute -bottom-2 -left-2"
        variants={sparkleVariants}
        animate="animate"
      >
        <Sparkles size={14} className="text-cyber-blue" />
      </motion.div>
    </motion.div>
  );
};

export default ChatbotAvatar;
