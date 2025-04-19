
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import MessageHeader from './chat/MessageHeader';
import MessageAvatar from './chat/MessageAvatar';
import MessageContent from './chat/MessageContent';
import MessageActions from './chat/MessageActions';

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
      <MessageAvatar role={message.role} />
      
      <div className="flex-1">
        <MessageHeader role={message.role} timestamp={message.timestamp} />
        
        <MessageContent 
          content={message.content}
          displayedText={displayedText}
          isComplete={isComplete}
          isExpanded={isExpanded}
          highlightKeywords={highlightKeywords}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
        />
        
        {isComplete && message.role === 'assistant' && message.content.includes('Achievement') && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 flex items-center"
          >
            <span className="text-xs text-yellow-400">Achievement progress updated!</span>
          </motion.div>
        )}
        
        <MessageActions 
          content={message.content}
          showActions={showActions}
          hasLiked={hasLiked}
          hasBookmarked={hasBookmarked}
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      </div>
    </motion.div>
  );
};

export default ChatMessage;
