
import React, { useState, useEffect, useRef } from 'react';
import { User, Bot, Star, Sparkles, ExternalLink, ThumbsUp, ThumbsDown, Share2, Bookmark, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

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
  const [isExpanded, setIsExpanded] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const keywords = [
    'python', 'javascript', 'react', 'web dev', 'ai', 'machine learning', 
    'cybersecurity', 'data science', 'badge', 'xp', 'level up'
  ];
  
  useEffect(() => {
    if (!animate) {
      setDisplayedText(message.content);
      setIsComplete(true);
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
        
        const foundKeywords = keywords.filter(keyword => 
          message.content.toLowerCase().includes(keyword.toLowerCase())
        );
        setHighlightKeywords(foundKeywords);
        
        if (message.role === 'assistant') {
          const audio = new Audio();
          audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABAAAAvIAU1NTUFBQUFBTU1NTUFBQUFBbW1tbW2pqampqamtra2tra3t7e3t7e3t7e3t7e3uMjIyMjIyMjIyMjIyMnZ2dnZ2dnZ2dnZ2dnZ2tra2tra2tra2tra2tra29vb29vb29vb29vb29vb29vb29zs7Ozs7Ozs7Ozs7Ozs7e3t7e3t7e3t7e3t7e3v///////////8AAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAYAAAGAAAAAAAAABEAAAAAAMC0=';
          audio.volume = 0.05;
          audio.play();
          
          if (messageRef.current) {
            messageRef.current.classList.add('animate-pulse');
            setTimeout(() => {
              if (messageRef.current) {
                messageRef.current.classList.remove('animate-pulse');
              }
            }, 1000);
          }
        }
      }
    }, 10);
    
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
    
    highlightKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      formattedText = formattedText.replace(regex, (match) => 
        `<span class="text-cyber-blue font-semibold hover:scale-105 transition-transform inline-block">${match}</span>`
      );
    });
    
    formattedText = formattedText.replace(/Achievement Unlocked!|New Badge Earned!|earned the|badge unlocked!|unlocked!/gi, (match) => 
      `<span class="text-cyber-pink font-bold animate-pulse-glow">${match}</span>`
    );
    
    formattedText = formattedText.replace(/\+\d+ XP|\d+ XP gained|XP bonus/gi, (match) => 
      `<span class="text-cyber-green font-bold animate-pulse-glow">${match}</span>`
    );
    
    formattedText = formattedText.replace(/https?:\/\/[^\s]+/g, (match) => 
      `<a href="${match}" target="_blank" class="underline text-cyber-blue hover:text-cyber-purple transition-colors">${match} <span class="inline-block ml-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></span></a>`
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
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 }
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
    },
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };
  
  const actionsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const actionItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const bounceVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const glowVariants = {
    initial: { boxShadow: "0 0 0 rgba(0,168,255,0)" },
    animate: {
      boxShadow: [
        "0 0 10px rgba(0,168,255,0.2)",
        "0 0 20px rgba(0,168,255,0.4)",
        "0 0 10px rgba(0,168,255,0.2)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(message.content);
      toast({
        title: "Text Copied",
        description: "Message copied to clipboard",
      });
    }
  };
  
  const handleLike = () => {
    setHasLiked(!hasLiked);
    if (!hasLiked) {
      toast({
        title: "Message Rated",
        description: "Thanks for your feedback!",
      });
    }
  };
  
  const handleBookmark = () => {
    setHasBookmarked(!hasBookmarked);
    toast({
      title: hasBookmarked ? "Bookmark Removed" : "Message Bookmarked",
      description: hasBookmarked ? "Message removed from your saved items" : "Message added to your saved items",
    });
  };

  return (
    <motion.div 
      ref={messageRef}
      variants={bounceVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      className={`flex gap-3 mb-4 p-3 rounded-lg ${
        message.role === 'assistant' 
          ? 'bg-cyber-darker/60 cyber-border' 
          : 'bg-cyber-dark'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
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
        
        <div className={`prose prose-invert max-w-none ${!isExpanded && message.content.length > 300 ? 'max-h-32 overflow-hidden relative' : ''}`}>
          <div dangerouslySetInnerHTML={{ __html: formatText(displayedText) }} />
          {!isComplete && (
            <span className="border-r-2 border-cyber-blue ml-1 animate-blink">&nbsp;</span>
          )}
          
          {!isExpanded && message.content.length > 300 && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-cyber-darker/90 to-transparent"></div>
          )}
        </div>
        
        {message.content.length > 300 && isComplete && (
          <button 
            onClick={toggleExpand}
            className="mt-2 text-xs text-cyber-blue hover:text-cyber-purple transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
        
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
        
        {message.role === 'assistant' && (
          <motion.div 
            className="absolute -bottom-1 -right-1 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
        )}
        
        <AnimatePresence>
          {showActions && isComplete && (
            <motion.div 
              className="mt-3 flex gap-2 justify-end"
              variants={actionsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.button 
                onClick={handleLike}
                className={`p-1 rounded-full ${hasLiked ? 'bg-cyber-blue/20 text-cyber-blue' : 'hover:bg-cyber-blue/10'}`}
                variants={actionItemVariants}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title="Like"
              >
                <ThumbsUp size={14} />
              </motion.button>
              
              <motion.button 
                onClick={copyToClipboard}
                className="p-1 rounded-full hover:bg-cyber-blue/10"
                variants={actionItemVariants}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title="Copy to clipboard"
              >
                <Copy size={14} />
              </motion.button>
              
              <motion.button 
                onClick={handleBookmark}
                className={`p-1 rounded-full ${hasBookmarked ? 'bg-cyber-pink/20 text-cyber-pink' : 'hover:bg-cyber-blue/10'}`}
                variants={actionItemVariants}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title="Save message"
              >
                <Bookmark size={14} />
              </motion.button>
              
              <motion.button 
                className="p-1 rounded-full hover:bg-cyber-blue/10"
                variants={actionItemVariants}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title="Share"
              >
                <Share2 size={14} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
