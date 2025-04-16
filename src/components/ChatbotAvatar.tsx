
import React from 'react';
import { Brain } from 'lucide-react';
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
  const defaultAnimation = {
    animate: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const animationToUse = animation || defaultAnimation;

  return (
    <motion.div
      className={`relative ${className}`}
      {...animationToUse}
    >
      <div 
        className="rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Brain className="text-white" size={size * 0.5} />
        <div className="absolute inset-0 cyber-glow opacity-50"></div>
      </div>
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-green rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ChatbotAvatar;
