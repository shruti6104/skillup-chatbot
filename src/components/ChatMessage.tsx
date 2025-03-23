
import React, { useState, useEffect } from 'react';
import { User, Bot } from 'lucide-react';

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
  
  useEffect(() => {
    if (!animate) {
      setDisplayedText(message.content);
      setIsComplete(true);
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
      }
    }, 10); // Speed of typing animation
    
    return () => clearInterval(interval);
  }, [message.content, animate]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={`flex gap-3 mb-4 p-3 rounded-lg ${
        message.role === 'assistant' 
          ? 'bg-cyber-darker/60 cyber-border animate-fade-in' 
          : 'bg-cyber-dark animate-fade-in'
      }`}
    >
      <div className="flex-shrink-0 mt-1">
        {message.role === 'assistant' ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border animate-pulse-glow">
            <Bot size={18} className="text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-purple to-cyber-pink flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className="font-orbitron text-sm">
            {message.role === 'assistant' ? (
              <span className="text-cyber-blue">SkillUp AI</span>
            ) : (
              <span className="text-cyber-purple">You</span>
            )}
          </div>
          <div className="text-xs text-gray-500">{formatTime(message.timestamp)}</div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          {displayedText}
          {!isComplete && (
            <span className="border-r-2 border-cyber-blue ml-1 animate-blink">&nbsp;</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
