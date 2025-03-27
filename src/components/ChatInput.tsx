
import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Play sound effect
      const audio = new Audio();
      audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
      audio.volume = 0.1; // Lower volume to make it subtle
      audio.play();
      
      // Hide suggestions after sending
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
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
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        
        <button 
          className={`cyber-button h-12 w-12 p-0 flex items-center justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'neon-glow'}`}
          onClick={handleSendMessage}
          disabled={disabled || !message.trim()}
        >
          <Send size={18} className="text-cyber-blue" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
