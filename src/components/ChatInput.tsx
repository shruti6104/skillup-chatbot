
import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { playSound } from '@/utils/audioUtils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  inputValue?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage?: () => void;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
  messageInputRef?: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  inputValue: externalInputValue, 
  setInputValue: externalSetInputValue,
  handleSendMessage: externalHandleSend,
  handleKeyDown: externalHandleKeyDown,
  messageInputRef: externalRef
}) => {
  const [internalInputValue, setInternalInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement>(null);
  
  const textareaRef = externalRef || internalRef;
  const inputValue = externalInputValue !== undefined ? externalInputValue : internalInputValue;
  const setInputValue = externalSetInputValue || setInternalInputValue;
  
  // Updated suggestions to cover more learning topics
  const quickSuggestions = [
    "I want to learn Python",
    "Tell me about Web Development",
    "How can I get started with Artificial Intelligence?",
    "What are some Cybersecurity basics?",
    "How to improve my Soft Skills?",
    "Tell me about JavaScript",
    "I want to learn Data Science"
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSendMessage = () => {
    if (externalHandleSend) {
      externalHandleSend();
      return;
    }
    
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      
      // Play sound effect
      playSound('notification');
      
      // Hide suggestions after sending
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (externalHandleKeyDown) {
      externalHandleKeyDown(e);
      return;
    }
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };
  
  const handleSelectSuggestion = (suggestion: string) => {
    onSendMessage(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="cyber-panel p-2 relative animate-fade-in">
      {showSuggestions && (
        <div className="absolute bottom-full left-0 w-full p-2 bg-cyber-dark/90 border-t border-cyber-blue/30 rounded-t-md mb-2">
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="text-left px-3 py-2 text-sm bg-cyber-darker hover:bg-cyber-blue/20 rounded-md transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    
      <div className="flex items-end space-x-2">
        <button
          className="cyber-button h-12 p-0 w-10 flex items-center justify-center"
          onClick={() => setShowSuggestions(!showSuggestions)}
          disabled={disabled}
        >
          <Plus size={18} className={`text-cyber-green transition-transform ${showSuggestions ? 'rotate-45' : ''}`} />
        </button>
        
        <textarea
          ref={textareaRef}
          className="cyber-input flex-1 resize-none h-12 max-h-36 py-3"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        
        <button 
          className={`cyber-button h-12 w-12 p-0 flex items-center justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'neon-glow'}`}
          onClick={handleSendMessage}
          disabled={disabled || !inputValue.trim()}
        >
          <Send size={18} className="text-cyber-blue" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
