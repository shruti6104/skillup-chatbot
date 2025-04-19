
import React from 'react';
import { motion } from 'framer-motion';

interface MessageContentProps {
  content: string;
  displayedText: string;
  isComplete: boolean;
  isExpanded: boolean;
  highlightKeywords: string[];
  onToggleExpand: () => void;
}

const MessageContent: React.FC<MessageContentProps> = ({
  content,
  displayedText,
  isComplete,
  isExpanded,
  highlightKeywords,
  onToggleExpand
}) => {
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

  return (
    <div className={`prose prose-invert max-w-none ${!isExpanded && content.length > 300 ? 'max-h-32 overflow-hidden relative' : ''}`}>
      <div dangerouslySetInnerHTML={{ __html: formatText(displayedText) }} />
      {!isComplete && (
        <span className="border-r-2 border-cyber-blue ml-1 animate-blink">&nbsp;</span>
      )}
      
      {!isExpanded && content.length > 300 && (
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-cyber-darker/90 to-transparent"></div>
      )}

      {content.length > 300 && isComplete && (
        <button 
          onClick={onToggleExpand}
          className="mt-2 text-xs text-cyber-blue hover:text-cyber-purple transition-colors"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default MessageContent;
