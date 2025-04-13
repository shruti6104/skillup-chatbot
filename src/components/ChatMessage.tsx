
import React, { useState, useEffect } from 'react';
import { User, Bot, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
  animate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, animate = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(!animate);
  const [highlightKeywords, setHighlightKeywords] = useState<string[]>([]);
  
  const keywords = [
    'python', 'javascript', 'react', 'web dev', 'ai', 'machine learning', 
    'cybersecurity', 'data science', 'badge', 'xp', 'level up'
  ];
  
  useEffect(() => {
    if (!animate) {
      setDisplayedText(message.content);
      setIsComplete(true);
      // Find keywords to highlight
      const foundKeywords = keywords.filter(keyword => 
        message.content.toLowerCase().includes(keyword.toLowerCase())
      );
      setHighlightKeywords(foundKeywords);
      return;
    }
    
    setDisplayedText('');
    setIsComplete(false);
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.content.length) {
        setDisplayedText(prev => prev + message.content.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        
        // Find keywords to highlight once complete
        const foundKeywords = keywords.filter(keyword => 
          message.content.toLowerCase().includes(keyword.toLowerCase())
        );
        setHighlightKeywords(foundKeywords);
        
        // Play sound when assistant message is complete
        if (message.role === 'assistant') {
          const audio = new Audio();
          audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABAAAAvIAU1NTUFBQUFBTU1NTUFBQUFBbW1tbW2pqampqamtra2tra3t7e3t7e3t7e3t7e3uMjIyMjIyMjIyMjIyMnZ2dnZ2dnZ2dnZ2dnZ2tra2tra2tra2tra2tra29vb29vb29vb29vb29zs7Ozs7Ozs7Ozs7Ozs7e3t7e3t7e3t7e3t7e3v///////////8AAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAYAAAGAAAAAAAAABEAAAAAAMC0=';
          audio.volume = 0.05;
          audio.play();
        }
      }
    }, 10); // Speed of typing animation
    
    return () => clearInterval(interval);
  }, [message.content, animate, message.role]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const formatText = (text: string) => {
    if (highlightKeywords.length === 0) return text;
    
    let formattedText = text;
    
    // Apply highlighting to keywords
    highlightKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      formattedText = formattedText.replace(regex, (match) => 
        `<span class="text-cyber-blue font-semibold">${match}</span>`
      );
    });
    
    // Highlight achievements/badges with special formatting
    formattedText = formattedText.replace(/Achievement Unlocked!|New Badge Earned!|earned the|badge unlocked!|unlocked!/gi, (match) => 
      `<span class="text-cyber-pink font-bold">${match}</span>`
    );
    
    // Highlight XP mentions
    formattedText = formattedText.replace(/\+\d+ XP|\d+ XP gained|XP bonus/gi, (match) => 
      `<span class="text-cyber-green font-bold">${match}</span>`
    );
    
    return formattedText;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };
  
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
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex gap-3 mb-4 p-3 rounded-lg ${
        message.role === 'assistant' 
          ? 'bg-cyber-darker/60 cyber-border' 
          : 'bg-cyber-dark'
      }`}
    >
      <motion.div 
        className="flex-shrink-0 mt-1"
        variants={iconVariants}
      >
        {message.role === 'assistant' ? (
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
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className="font-orbitron text-sm flex items-center">
            {message.role === 'assistant' ? (
              <motion.span 
                className="text-cyber-blue flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                SkillUp AI
                <motion.span
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 2 }}
                  className="ml-1"
                >
                  <Star size={12} className="text-yellow-400" />
                </motion.span>
              </motion.span>
            ) : (
              <span className="text-cyber-purple">You</span>
            )}
          </div>
          <div className="text-xs text-gray-500">{formatTime(message.timestamp)}</div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: formatText(displayedText) }} />
          {!isComplete && (
            <span className="border-r-2 border-cyber-blue ml-1 animate-blink">&nbsp;</span>
          )}
        </div>
        
        {isComplete && message.role === 'assistant' && message.content.includes('Achievement') && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 flex items-center"
          >
            <Sparkles size={14} className="text-yellow-400 mr-1" />
            <span className="text-xs text-yellow-400">Achievement progress updated!</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
