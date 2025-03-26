import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Trophy, Brain } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import ProgressPanel from '@/components/ProgressPanel';
import SuggestedQueries from '@/components/SuggestedQueries';
import LoginForm from '@/components/LoginForm';
import ChatbotAvatar from '@/components/ChatbotAvatar';
import { toast } from '@/components/ui/use-toast';
import { Message } from '@/types/chat';
import { detectIntent, generateResponse, updateSkillLevel, getContext, resetContext } from '@/utils/messageUtils';

// Storage keys for user data
const STREAK_KEY = 'skillup_streak';
const LAST_LOGIN_KEY = 'skillup_last_login';
const MESSAGE_COUNT_KEY = 'skillup_message_count';
const TOPICS_EXPLORED_KEY = 'skillup_topics';
const SKILLS_PROGRESS_KEY = 'skillup_skills_progress';

// Learning topics for tracking progress
const learningTopics = [
  'python', 'javascript', 'web development', 'ai', 'cybersecurity', 
  'soft skills', 'machine learning', 'react', 'database', 'data science'
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(25);
  const [userBadges, setUserBadges] = useState(2);
  const [userStreak, setUserStreak] = useState(1);
  const [messageCount, setMessageCount] = useState(0);
  const [topicsExplored, setTopicsExplored] = useState<string[]>([]);
  const [skillProgress, setSkillProgress] = useState<{[key: string]: number}>({
    'Python': 0,
    'Web Dev': 0,
    'AI': 0,
    'Cybersecurity': 0,
    'Soft Skills': 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user data from localStorage
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('skillup_isLoggedIn') === 'true';
    if (isUserLoggedIn) {
      setIsLoggedIn(true);
      
      // Load saved progress data
      const savedStreak = parseInt(localStorage.getItem(STREAK_KEY) || '1', 10);
      const savedMessageCount = parseInt(localStorage.getItem(MESSAGE_COUNT_KEY) || '0', 10);
      const savedTopics = JSON.parse(localStorage.getItem(TOPICS_EXPLORED_KEY) || '[]');
      const savedSkillProgress = JSON.parse(localStorage.getItem(SKILLS_PROGRESS_KEY) || '{}');
      
      setUserStreak(savedStreak);
      setMessageCount(savedMessageCount);
      setTopicsExplored(savedTopics);
      
      if (Object.keys(savedSkillProgress).length > 0) {
        setSkillProgress(savedSkillProgress);
      }
      
      // Calculate level based on message count
      const calculatedLevel = Math.max(1, Math.floor(savedMessageCount / 10) + 1);
      setUserLevel(calculatedLevel);
      
      // Calculate XP based on message count and level
      const xpPerLevel = 100;
      const totalXP = savedMessageCount * 5;
      const currentLevelXP = totalXP % xpPerLevel;
      setUserXP(currentLevelXP);
      
      // Calculate badges based on topics explored
      setUserBadges(Math.min(8, savedTopics.length + 1));
    }
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save progress data whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(MESSAGE_COUNT_KEY, messageCount.toString());
      localStorage.setItem(TOPICS_EXPLORED_KEY, JSON.stringify(topicsExplored));
      localStorage.setItem(SKILLS_PROGRESS_KEY, JSON.stringify(skillProgress));
    }
  }, [isLoggedIn, messageCount, topicsExplored, skillProgress]);

  // Calculate streak on login
  const calculateStreak = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const todayStr = today.toISOString();
    
    // Get last login date from localStorage
    const lastLoginStr = localStorage.getItem(LAST_LOGIN_KEY);
    const currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    
    let newStreak = 1; // Default to 1 if no previous streak
    
    if (lastLoginStr) {
      const lastLogin = new Date(lastLoginStr);
      lastLogin.setHours(0, 0, 0, 0); // Normalize to start of day
      
      // Calculate difference in days
      const timeDiff = today.getTime() - lastLogin.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      if (dayDiff === 1) {
        // Consecutive day, increment streak
        newStreak = currentStreak + 1;
        toast({
          title: "Streak Increased!",
          description: `You're on a ${newStreak}-day streak! Keep it up!`,
        });
      } else if (dayDiff === 0) {
        // Same day login, maintain streak
        newStreak = currentStreak;
      } else {
        // Streak broken
        if (currentStreak > 1) {
          toast({
            title: "Streak Reset",
            description: "Your streak has been reset. Start a new one today!",
          });
        }
        newStreak = 1;
      }
    } else {
      // First time login
      toast({
        title: "Streak Started!",
        description: "You've started your learning streak! Come back tomorrow to keep it going!",
      });
    }
    
    // Save updated streak and login date
    localStorage.setItem(STREAK_KEY, newStreak.toString());
    localStorage.setItem(LAST_LOGIN_KEY, todayStr);
    
    return newStreak;
  };

  useEffect(() => {
    // Add initial message if logged in
    if (isLoggedIn && messages.length === 0) {
      setTimeout(() => {
        const initialMessage: Message = {
          id: 'initial',
          role: 'assistant',
          content: "Hello! 👋 I'm SkillUp AI, your personal learning assistant. I can help you with programming, AI, data science, and more. What would you like to learn today?",
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      }, 500);
    }
  }, [isLoggedIn, messages.length]);

  // Check if a message is related to a specific learning topic
  const detectTopicInMessage = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    for (const topic of learningTopics) {
      if (lowerMessage.includes(topic)) {
        return topic;
      }
    }
    
    return null;
  };

  // Update skill progress based on the detected topic
  const updateSkillProgress = (topic: string) => {
    let skillKey = '';
    
    // Map topics to skill categories
    if (['python', 'javascript', 'react'].includes(topic)) {
      skillKey = 'Python';
      if (topic === 'javascript' || topic === 'react') skillKey = 'Web Dev';
    } else if (['web development', 'html', 'css'].includes(topic)) {
      skillKey = 'Web Dev';
    } else if (['ai', 'machine learning', 'deep learning'].includes(topic)) {
      skillKey = 'AI';
    } else if (['cybersecurity', 'security', 'hacking'].includes(topic)) {
      skillKey = 'Cybersecurity';
    } else if (['soft skills', 'communication', 'leadership'].includes(topic)) {
      skillKey = 'Soft Skills';
    }
    
    if (skillKey && skillKey in skillProgress) {
      setSkillProgress(prev => {
        const updatedProgress = { ...prev };
        // Increase skill by 5-15% randomly, max 100%
        const increase = Math.floor(Math.random() * 10) + 5;
        updatedProgress[skillKey] = Math.min(100, (updatedProgress[skillKey] || 0) + increase);
        return updatedProgress;
      });
    }
  };

  const handleLogin = () => {
    const streak = calculateStreak();
    setUserStreak(streak);
    setIsLoggedIn(true);
    
    // Set login status in localStorage
    localStorage.setItem('skillup_isLoggedIn', 'true');
    
    // Show welcome toast
    toast({
      title: "Login Successful",
      description: "Welcome back to SkillUp AI",
    });
    
    // Play login success sound
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
    audio.volume = 0.2;
    audio.play();
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    // Increase message count
    const newMessageCount = messageCount + 1;
    setMessageCount(newMessageCount);
    
    // Process the message using our new intelligent system
    const { intent, topic, confidence } = detectIntent(content);
    
    // Update context and skills if a topic was detected
    if (topic) {
      // Check if this is a new topic
      if (!topicsExplored.includes(topic)) {
        // Add new topic to explored topics
        setTopicsExplored(prev => [...prev, topic]);
        
        // Show toast for new topic
        toast({
          title: "New Topic Explored!",
          description: `You've started learning about ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        });
      }
      
      // Update skill progress
      updateSkillProgress(topic);
      updateSkillLevel(topic);
    }
    
    // Generate intelligent response
    const botResponse = generateResponse(intent, topic, messages);
    
    // Simulate typing delay based on response length
    const typingDelay = Math.min(1500, 500 + botResponse.length / 10);
    
    setTimeout(() => {
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      
      // Add XP for interaction
      setUserXP(prev => {
        const newXP = prev + Math.floor(Math.random() * 5) + 3;
        
        // Level up if XP exceeds threshold
        if (newXP >= 100) {
          setUserLevel(prevLevel => prevLevel + 1);
          toast({
            title: "Level Up!",
            description: `You've reached Level ${userLevel + 1}!`,
          });
          
          // Maybe earn a badge
          if (Math.random() > 0.7) {
            setUserBadges(prev => prev + 1);
            toast({
              title: "New Badge Earned!",
              description: "You've earned a new achievement badge",
            });
          }
          
          return newXP - 100; // Reset XP after leveling up
        }
        
        return newXP;
      });
    }, typingDelay);
  };

  const handleSelectQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {isLoggedIn ? (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
          <Header />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="text-center">
                <ChatbotAvatar />
                <h2 className="font-orbitron text-lg text-cyber-blue flex items-center justify-center mb-1">
                  <Brain size={20} className="mr-2" />
                  SkillUp AI
                </h2>
                <div className="flex items-center justify-center text-sm mb-4">
                  <div className="bg-cyber-green/20 text-cyber-green px-2 py-1 rounded-full flex items-center border border-cyber-green/20">
                    <span className="inline-block w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse"></span>
                    Online
                  </div>
                </div>
              </div>
              
              <ProgressPanel 
                level={userLevel}
                xp={userXP}
                nextLevelXp={100}
                badges={userBadges}
                streak={userStreak}
                topics={topicsExplored.length}
                messageCount={messageCount}
                skillProgress={skillProgress}
              />
              
              <SuggestedQueries onSelectQuery={handleSelectQuery} />
            </div>
            
            {/* Chat area */}
            <div className="lg:col-span-3 cyber-panel p-4 h-[calc(100vh-150px)] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 pr-1">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    animate={index === messages.length - 1 && message.role === 'assistant'} 
                  />
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 mb-4 p-3 rounded-lg bg-cyber-darker/60 animate-fade-in">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border">
                        <Cpu size={18} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-orbitron text-sm mb-1 text-cyber-blue">SkillUp AI</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Index;
