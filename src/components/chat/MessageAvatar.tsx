
import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageAvatarProps {
  role: 'user' | 'assistant';
}

const MessageAvatar: React.FC<MessageAvatarProps> = ({ role }) => {
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }
    },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="flex-shrink-0 mt-1"
      variants={iconVariants}
    >
      {role === 'assistant' ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border relative">
          <Bot size={18} className="text-white" />
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-green rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-purple to-cyber-pink flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageAvatar;
