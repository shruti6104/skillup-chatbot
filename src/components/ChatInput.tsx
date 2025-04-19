
import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Mic, Sparkles, XCircle } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);
  const [showEnhancedOptions, setShowEnhancedOptions] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement>(null);
  
  const textareaRef = externalRef || internalRef;
  const inputValue = externalInputValue !== undefined ? externalInputValue : internalInputValue;
  const setInputValue = externalSetInputValue || setInternalInputValue;
  
  // Enhanced suggestions covering more general topics
  const quickSuggestions = [
    "I want to learn Python",
    "Tell me about Web Development",
    "How does artificial intelligence work?",
    "Explain quantum computing",
    "What are the best cybersecurity practices?",
    "Tell me about JavaScript",
    "How do I analyze big data?",
    "Explain blockchain technology",
    "Tell me about renewable energy sources",
    "How do I improve my critical thinking skills?"
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
      setShowEnhancedOptions(false);
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
    setInputValue(suggestion);
    
    // Using setTimeout to ensure the state is updated before sending the message
    setTimeout(() => {
      onSendMessage(suggestion);
      setShowSuggestions(false);
    }, 10);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Processing your question...",
      });
      
      // Simulate voice recognition result
      setTimeout(() => {
        const voiceQuestions = [
          "Tell me about machine learning algorithms",
          "How can I improve my programming skills?",
          "Explain the concept of cloud computing"
        ];
        const randomQuestion = voiceQuestions[Math.floor(Math.random() * voiceQuestions.length)];
        setInputValue(randomQuestion);
        
        // Automatically send after brief delay
        setTimeout(() => {
          onSendMessage(randomQuestion);
        }, 500);
      }, 1500);
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Say your question clearly...",
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        if (isRecording) {
          setIsRecording(false);
        }
      }, 3000);
    }
  };

  const enhanceWithAI = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No input provided",
        description: "Please type something to enhance with AI",
      });
      return;
    }
    
    const originalText = inputValue;
    setInputValue(`Enhancing: "${originalText.substring(0, 20)}${originalText.length > 20 ? '...' : ''}" 🔄`);
    
    // Simulate AI enhancement
    setTimeout(() => {
      const enhancedPrompts = [
        `${originalText} and provide step-by-step explanations with examples`,
        `Could you explain ${originalText} in detail with practical applications?`,
        `I'd like a comprehensive explanation about ${originalText} with real-world examples`
      ];
      const enhancedPrompt = enhancedPrompts[Math.floor(Math.random() * enhancedPrompts.length)];
      setInputValue(enhancedPrompt);
      
      toast({
        title: "Prompt enhanced",
        description: "Your question has been improved for better results",
      });
    }, 1000);
  };

  return (
    <div className="cyber-panel p-2 relative animate-fade-in">
      {showSuggestions && (
        <div className="absolute bottom-full left-0 w-full p-2 bg-cyber-dark/90 border-t border-cyber-blue/30 rounded-t-md mb-2 z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
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
      
      {showEnhancedOptions && (
        <div className="absolute bottom-full right-0 w-full sm:w-64 p-2 bg-cyber-dark/90 border-t border-cyber-blue/30 rounded-t-md mb-2 z-30">
          <div className="flex flex-col gap-2">
            <button
              onClick={enhanceWithAI}
              className="flex items-center text-left px-3 py-2 text-sm bg-cyber-darker hover:bg-cyber-purple/20 rounded-md transition-colors"
            >
              <Sparkles size={14} className="mr-2 text-cyber-purple" />
              Enhance prompt with AI
            </button>
            <button
              onClick={toggleRecording}
              className={`flex items-center text-left px-3 py-2 text-sm ${isRecording ? 'bg-cyber-pink/30' : 'bg-cyber-darker'} hover:bg-cyber-pink/20 rounded-md transition-colors`}
            >
              <Mic size={14} className={`mr-2 ${isRecording ? 'text-cyber-pink animate-pulse' : 'text-cyber-blue'}`} />
              {isRecording ? 'Recording... (click to stop)' : 'Voice input'}
            </button>
          </div>
        </div>
      )}
    
      <div className="flex items-end space-x-2">
        <button
          className="cyber-button h-12 p-0 w-10 flex items-center justify-center"
          onClick={() => {
            setShowSuggestions(!showSuggestions);
            if (showEnhancedOptions) setShowEnhancedOptions(false);
          }}
          disabled={disabled}
        >
          <Plus size={18} className={`text-cyber-green transition-transform ${showSuggestions ? 'rotate-45' : ''}`} />
        </button>
        
        <textarea
          ref={textareaRef}
          className="cyber-input flex-1 resize-none h-12 max-h-36 py-3"
          placeholder="Ask me anything - learning topics, general knowledge, coding help..."
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        
        <button 
          className="cyber-button h-12 w-12 p-0 flex items-center justify-center"
          onClick={() => {
            setShowEnhancedOptions(!showEnhancedOptions);
            if (showSuggestions) setShowSuggestions(false);
          }}
          disabled={disabled}
        >
          <Sparkles size={18} className={`text-cyber-purple transition-colors ${showEnhancedOptions ? 'text-cyber-pink' : ''}`} />
        </button>
        
        <button 
          className={`cyber-button h-12 w-12 p-0 flex items-center justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'neon-glow'}`}
          onClick={handleSendMessage}
          disabled={disabled || !inputValue.trim()}
        >
          {isRecording ? (
            <XCircle size={18} className="text-cyber-pink animate-pulse" onClick={toggleRecording} />
          ) : (
            <Send size={18} className="text-cyber-blue" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
