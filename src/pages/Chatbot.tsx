import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Brain, MenuIcon, HomeIcon, MessageSquare, CornerDownLeft, Sparkles, Zap, BookOpen, ListOrdered } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import ChatMessage from '@/components/ChatMessage';
import { Message } from '@/types/chat';
import { detectIntent, generateResponse, updateSkillLevel, resetContext } from '@/utils/messageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { defaultBadges } from '@/components/BadgesSection';
import quizzes from '@/data/quizData';
import QuizModal from '@/components/QuizModal';
import { Link } from 'react-router-dom';
import SuggestedQueries from '@/components/SuggestedQueries';
import SkillUpHub from '@/components/SkillUpHub';

// Storage keys for user data
const STREAK_KEY = 'skillup_streak';
const LAST_LOGIN_KEY = 'skillup_last_login';
const MESSAGE_COUNT_KEY = 'skillup_message_count';
const TOPICS_EXPLORED_KEY = 'skillup_topics';
const SKILLS_PROGRESS_KEY = 'skillup_skills_progress';
const BADGES_KEY = 'skillup_badges';
const SESSION_START_KEY = 'skillup_session_start';

// Learning topics for tracking progress
const learningTopics = [
  'python', 'javascript', 'web development', 'ai', 'cybersecurity', 
  'soft skills', 'machine learning', 'react', 'database', 'data science'
];

// Badge trigger detection patterns
const badgeTriggerPatterns = {
  'python-beginner': [
    /completed python/i,
    /learned python/i,
    /finished python/i,
    /python basics/i,
    /mastered python/i
  ],
  'web-explorer': [
    /completed web/i,
    /learned web/i,
    /web development/i,
    /web dev/i,
    /html.*css.*javascript/i
  ],
  'ai-enthusiast': [
    /ai fundamentals/i,
    /artificial intelligence/i,
    /learned ai/i,
    /completed ai/i,
    /machine learning basics/i
  ],
  'cyber-guardian': [
    /cybersecurity/i,
    /cyber security/i,
    /network security/i,
    /information security/i,
    /completed security/i
  ]
};

// Suggested queries for quick selection
const suggestedQueries = [
  {
    text: "Teach me Python basics",
    category: "learning",
    icon: <Brain size={16} className="text-cyber-blue" />
  },
  {
    text: "How can I learn web development?", 
    category: "learning",
    icon: <Cpu size={16} className="text-cyber-purple" />
  },
  {
    text: "Explain machine learning concepts",
    category: "explanation",
    icon: <Zap size={16} className="text-cyber-green" />
  },
  {
    text: "What are the best cybersecurity practices?",
    category: "information",
    icon: <Sparkles size={16} className="text-cyber-pink" />
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(25);
  const [userBadges, setUserBadges] = useState(1);
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
  const [userBadgesList, setUserBadgesList] = useState<typeof defaultBadges>(() => {
    const savedBadges = localStorage.getItem(BADGES_KEY);
    if (savedBadges) {
      return JSON.parse(savedBadges);
    }
    return defaultBadges.map((badge, index) => ({
      ...badge,
      earned: index === 0
    }));
  });
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [lastTopic, setLastTopic] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const sessionInterval = useRef<number | null>(null);

  useEffect(() => {
    // Load user data from localStorage
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
    
    const calculatedLevel = Math.max(1, Math.floor(savedMessageCount / 10) + 1);
    setUserLevel(calculatedLevel);
    
    const xpPerLevel = 100;
    const totalXP = savedMessageCount * 5;
    const currentLevelXP = totalXP % xpPerLevel;
    setUserXP(currentLevelXP);
    
    const earnedBadgesCount = userBadgesList.filter(b => b.earned).length;
    setUserBadges(earnedBadgesCount);
    
    const sessionStartTime = localStorage.getItem(SESSION_START_KEY);
    if (!sessionStartTime) {
      localStorage.setItem(SESSION_START_KEY, Date.now().toString());
    } else {
      const elapsedMinutes = Math.floor((Date.now() - parseInt(sessionStartTime)) / 60000);
      setSessionTime(elapsedMinutes);
    }
    
    sessionInterval.current = window.setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 60000);
    
    // Auto scroll to bottom when new messages appear
    scrollToBottom();
    
    // Initial welcome message
    setTimeout(() => {
      if (messages.length === 0) {
        const initialMessage: Message = {
          id: 'initial',
          role: 'assistant',
          content: "Hello! 👋 I'm SkillUp AI, your personal learning assistant. I can help you with programming, AI, data science, and more. What would you like to learn today?",
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      }
    }, 500);
    
    return () => {
      if (sessionInterval.current) {
        clearInterval(sessionInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(MESSAGE_COUNT_KEY, messageCount.toString());
    localStorage.setItem(TOPICS_EXPLORED_KEY, JSON.stringify(topicsExplored));
    localStorage.setItem(SKILLS_PROGRESS_KEY, JSON.stringify(skillProgress));
    localStorage.setItem(BADGES_KEY, JSON.stringify(userBadgesList));
    
    // Auto scroll to bottom when new messages appear
    scrollToBottom();
  }, [messageCount, topicsExplored, skillProgress, messages, userBadgesList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const detectTopicInMessage = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    for (const topic of learningTopics) {
      if (lowerMessage.includes(topic)) {
        return topic;
      }
    }
    
    return null;
  };

  const updateSkillProgress = (topic: string) => {
    let skillKey = '';
    
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
        const increase = Math.floor(Math.random() * 10) + 5;
        updatedProgress[skillKey] = Math.min(100, (updatedProgress[skillKey] || 0) + increase);
        return updatedProgress;
      });
    }
    
    setLastTopic(topic.charAt(0).toUpperCase() + topic.slice(1));
  };

  const checkForBadgeTriggers = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    for (const [badgeId, patterns] of Object.entries(badgeTriggerPatterns)) {
      if (!userBadgesList.find(b => b.id === badgeId)?.earned) {
        const patternMatch = patterns.some(pattern => pattern.test(lowerMessage));
        
        if (patternMatch) {
          setUserBadgesList(prev => prev.map(badge => 
            badge.id === badgeId 
              ? { ...badge, earned: true, date: formattedDate } 
              : badge
          ));
          
          setTimeout(() => {
            toast({
              title: "New Badge Earned!",
              description: `🎉 Congratulations! You've earned the ${userBadgesList.find(b => b.id === badgeId)?.name} badge!`,
            });
            
            playSound('achievement');
          }, 1000);
          
          let skillKey = '';
          switch (badgeId) {
            case 'python-beginner':
              skillKey = 'Python';
              break;
            case 'web-explorer':
              skillKey = 'Web Dev';
              break;
            case 'ai-enthusiast':
              skillKey = 'AI';
              break;
            case 'cyber-guardian':
              skillKey = 'Cybersecurity';
              break;
          }
          
          if (skillKey) {
            setSkillProgress(prev => ({
              ...prev,
              [skillKey]: Math.max(prev[skillKey], 40)
            }));
          }
          
          setActiveQuiz(badgeId);
          
          return badgeId;
        }
      }
    }
    
    return null;
  };

  const handleQuizComplete = (passed: boolean, score: number, badgeId: string) => {
    setActiveQuiz(null);
    
    const resultMessage = passed
      ? `Great job! You passed the quiz with a score of ${score}%. Your badge has been confirmed!`
      : `You scored ${score}%, which is below the 70% passing threshold. Keep learning and try again!`;
    
    const newBotMessage: Message = {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: resultMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newBotMessage]);
    
    if (!passed) {
      setUserBadgesList(prev => prev.map(badge => 
        badge.id === badgeId 
          ? { ...badge, earned: false, date: undefined } 
          : badge
      ));
    } else {
      playSound('success');
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const content = inputValue.trim();
    setInputValue('');
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    const newMessageCount = messageCount + 1;
    setMessageCount(newMessageCount);
    
    const badgeTriggered = checkForBadgeTriggers(content);
    
    const { intent, topic, confidence } = detectIntent(content);
    
    if (topic) {
      if (!topicsExplored.includes(topic)) {
        setTopicsExplored(prev => [...prev, topic]);
        toast({
          title: "New Topic Explored!",
          description: `You've started learning about ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        });
        playSound('notification');
      }
      
      updateSkillProgress(topic);
      updateSkillLevel(topic);
    }
    
    let botResponse = generateResponse(intent, topic, messages);
    
    if (badgeTriggered) {
      const badgeMessage = "\n\n🏆 **Achievement Unlocked!** A new badge has been added to your collection! I'll quiz you to confirm your knowledge.";
      botResponse += badgeMessage;
    }
    
    const pythonProgress = skillProgress['Python'];
    const webDevProgress = skillProgress['Web Dev'];
    const aiProgress = skillProgress['AI'];
    const cyberProgress = skillProgress['Cybersecurity'];
    
    if (pythonProgress >= 30 && !userBadgesList.find(b => b.id === 'python-beginner')?.earned) {
      botResponse += "\n\nYou're making great progress with Python! Let me know when you've completed your Python basics to unlock the Python Beginner badge.";
    } else if (webDevProgress >= 30 && !userBadgesList.find(b => b.id === 'web-explorer')?.earned) {
      botResponse += "\n\nYou're on your way to becoming a web developer! Tell me when you've completed web development basics to earn the Web Explorer badge.";
    } else if (aiProgress >= 30 && !userBadgesList.find(b => b.id === 'ai-enthusiast')?.earned) {
      botResponse += "\n\nYou're diving deep into AI! Let me know when you've explored the AI fundamentals to earn the AI Enthusiast badge.";
    } else if (cyberProgress >= 30 && !userBadgesList.find(b => b.id === 'cyber-guardian')?.earned) {
      botResponse += "\n\nYou're building solid cybersecurity knowledge! Tell me when you've discovered the cybersecurity principles to unlock the Cyber Guardian badge.";
    }
    
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
      
      setUserXP(prev => {
        const newXP = prev + Math.floor(Math.random() * 5) + 3;
        
        if (newXP >= 100) {
          setUserLevel(prevLevel => prevLevel + 1);
          toast({
            title: "Level Up!",
            description: `You've reached Level ${userLevel + 1}!`,
          });
          playSound('levelup');
          
          if (messageCount > 20 && !userBadgesList.find(b => b.id === 'quick-learner')?.earned) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            
            setUserBadgesList(prev => prev.map(badge => 
              badge.id === 'quick-learner' 
                ? { ...badge, earned: true, date: formattedDate } 
                : badge
            ));
            
            setTimeout(() => {
              toast({
                title: "New Badge Earned!",
                description: "⚡ Quick Learner badge unlocked!",
              });
            }, 1000);
          }
          
          return newXP - 100;
        }
        
        return newXP;
      });
      
      if (newMessageCount >= 50 && !userBadgesList.find(b => b.id === 'knowledge-seeker')?.earned) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        setUserBadgesList(prev => prev.map(badge => 
          badge.id === 'knowledge-seeker' 
            ? { ...badge, earned: true, date: formattedDate } 
            : badge
        ));
        
        setTimeout(() => {
          toast({
            title: "New Badge Earned!",
            description: "📚 You've earned the Knowledge Seeker badge!",
          });
          playSound('achievement');
        }, 1500);
      }
      
      const hasMaxSkill = Object.values(skillProgress).some(value => value >= 95);
      if (hasMaxSkill && !userBadgesList.find(b => b.id === 'skill-master')?.earned) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        setUserBadgesList(prev => prev.map(badge => 
          badge.id === 'skill-master' 
            ? { ...badge, earned: true, date: formattedDate } 
            : badge
        ));
        
        setTimeout(() => {
          toast({
            title: "New Badge Earned!",
            description: "✅ Congratulations! You've earned the Skill Master badge!",
          });
          playSound('achievement');
        }, 2000);
      }
    }, typingDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const playSound = (type: 'notification' | 'achievement' | 'levelup' | 'success') => {
    const audio = new Audio();
    
    switch (type) {
      case 'notification':
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAgAACHoA3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc////////////////////////////////////////AAAAAExhdmYAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAgh6/b5oHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAK2AKRMQUAAPa6IRGSJfXa//IK9AMK9X33l///r3t/Lu/t/9/7OggBAEAgCOq7uzAMBoGgaA0GQf//xTgPg+DgNBYLA0//+IdB8HQfBwLAsDAUBAIAgEf/v//lYNnzsBgQDQMiLgYXBw8YjgUG/KyQ+A4Li4mVV////tP///pURcuH9zbakYxcNlCvpCYTgRLjY+xSVXvSk3///Z1qUPKQikck//NExFYYAwJxf5lIAlNrGQMR1bOcN4rO+cf7Pf7etdK131dv6gkMQRWOQIvypOuUC5HHMFTDLJJQVHIAG0ChQDyKn/7//+v/9f//S/9Hp+CAK//X/QOlfWrxcwMk/QAAAHdG9YaWpoyZbI3E53U47WKxbKCjQ8rJ6+q3//9Tmmw13bmU1JpwknScvnYi5UCUgse//+mJJQ3/k//MExDoSuxK0AZhIAFSUMHhgSn//6v/P7nO7Z+t+OKO4v1ohoEAACBXgI8w8iwHGBUqE+gzcJ5XHDtoMBgMzks3n//9CFjhw5RlCdqmRJkkCZYmP/V////99f/+7///0oAAACtkLcYEK1BMzMHMjAywwISKDHwUYMay4wd3MYYm14Ja3//3Cpwy5yuuq4ToZRjPp//+3//3X//+v////NEREAAVEzZBnZMM//MUxEUSqxaoAY9AAMFDGwUeMhhRkwQSLTBgMXMDgaMaBp8RqG85fqC6////97f1mWZyrV7lk89EpBY9K+f+v/9YAAAAKXVBDjEQYEACYKAjJQQCMxTD5hjqxgJGmHgUl3+3XlY0yHHOWdIq0ZvZ8+Wjzv9W9/vqb9/9a1r+RAFWbJOhGFjFxyoQDGVMKCIwUCTAQZAgwwkDQga8MiiY6r9NVu8v/////+bf1f/r7+jZbFFPMkpX///+v////9f/0v//9IAADAABAR4YCDphkINPCB//9f///t////ZV///2//9f/V///0QBEQABEAAv8+Xc1UxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
        break;
      case 'achievement':
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAwAAErIA3Nzc3Nzc3Nzc3Nzc3N3d3d3d3d3d3d3d3d3d8vLy8vLy8vLy8vLy8vL///////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAZlAAAAAAAAErIphh4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MUxBUAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MUxBgAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
        break;
      case 'levelup':
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAABQAAD6QAIiIiIiIiIiIiNDQ0NDQ0NDQ0NEtLS0tLS0tLS1xcXFxcXFxcXFxra2tra2tra2t7e3t7e3t7e3t7lJSUlJSUlJSUlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
        break;
      case 'success':
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+NAwAAAAAAAAAAAAFhpbmcAAAAPAAAAAwAACdEAVVVVVVVVVVVVf39/f39/f39/f6qqqqqqqqqqqv///////////////////wAAAABMYXZjNTguMTkuMTAwAAAAAAAAAAAAAAAkBDcAAAAAAAAJ0WA0RnkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
        break;
    }
    
    audio.volume = 0.2;
    audio.play();
  };

  const handleSelectQuery = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResetChat = () => {
    setMessages([]);
    resetContext();
    
    setTimeout(() => {
      const initialMessage: Message = {
        id: 'initial',
        role: 'assistant',
        content: "Chat reset! 👋 How can I help you learn today?",
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }, 300);
    
    toast({
      title: "Chat Reset",
      description: "Starting a fresh conversation",
    });
  };

  const renderUserStats = () => {
    return (
      <div className="space-y-4 mt-6">
        <div className="cyber-panel p-3">
          <div className="flex justify-between items-center">
            <div className="text-sm font-orbitron text-cyber-blue">Level</div>
            <div className="text-sm font-bold">{userLevel}</div>
          </div>
          <div className="w-full bg-cyber-darker h-2 rounded-full mt-1.5">
            <div 
              className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full"
              style={{ width: `${userXP}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1 text-gray-400">{userXP}/100 XP</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="cyber-panel p-2">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-400">Streak</div>
              <div className="font-orbitron text-lg text-cyber-blue flex items-center">
                <Sparkles size={14} className="mr-1" /> {userStreak}d
              </div>
            </div>
          </div>
          <div className="cyber-panel p-2">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-400">Badges</div>
              <div className="font-orbitron text-lg text-cyber-green flex items-center">
                <Zap size={14} className="mr-1" /> {userBadges}
              </div>
            </div>
          </div>
        </div>

        <div className="cyber-panel p-3">
          <h4 className="text-sm font-orbitron mb-2">Skills Progress</h4>
          {Object.entries(skillProgress).map(([skill, progress]) => (
            <div key={skill} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{skill}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-cyber-darker h-1.5 rounded-full">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    background: 
                      skill === 'Python' ? 'linear-gradient(90deg, #00A8FF, #0077FF)' :
                      skill === 'Web Dev' ? 'linear-gradient(90deg, #FF2EB9, #9947E8)' :
                      skill === 'AI' ? 'linear-gradient(90deg, #6C63FF, #3736FF)' :
                      skill === 'Cybersecurity' ? 'linear-gradient(90deg, #00FF9D, #00A8FF)' :
                      'linear-gradient(90deg, #FFA500, #FF6347)'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="cyber-panel p-3">
          <h4 className="text-sm font-orbitron mb-2">Topics Explored</h4>
          <div className="flex flex-wrap gap-1.5">
            {topicsExplored.length > 0 ? topicsExplored.map((topic, idx) => (
              <span key={idx} className="text-xs bg-cyber-dark/70 border border-cyber-blue/30 rounded-full px-2 py-0.5">
                {topic}
              </span>
            )) : (
              <span className="text-xs text-gray-400">No topics explored yet</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-foreground">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-r border-cyber-blue/20 h-full flex flex-col bg-cyber-darker overflow-hidden"
            >
              <div className="p-4 border-b border-cyber-blue/20">
                <Link to="/" className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border mr-3">
                    <Brain size={20} className="text-white" />
                  </div>
                  <span className="font-orbitron text-xl cyber-gradient-text">SkillUp AI</span>
                </Link>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-cyber-darker">
                {/* Quick Learning Hub Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <BookOpen size={18} className="text-cyber-blue mr-2" />
                    <h3 className="font-orbitron text-md">Quick Learning Hub</h3>
                  </div>
                  <div className="pl-2">
                    <SkillUpHub onSelectTopic={(topic) => handleSelectQuery(topic)} />
                  </div>
                </div>
                
                {/* Quick References Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <ListOrdered size={18} className="text-cyber-pink mr-2" />
                    <h3 className="font-orbitron text-md">Quick References</h3>
                  </div>
                  <div className="pl-2">
                    <SuggestedQueries onSelectQuery={(query) => handleSelectQuery(query)} />
                  </div>
                </div>
                
                {/* User Stats Section */}
                {renderUserStats()}
              </div>
              
              <div className="p-4 border-t border-cyber-blue/20">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/20"
                    onClick={handleResetChat}
                  >
                    Reset Chat
                  </Button>
                  <Link to="/">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-cyber-pink/50 text-cyber-pink hover:bg-cyber-pink/20"
                    >
                      <HomeIcon size={16} className="mr-2" /> Home
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      
        {/* Main chat area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-cyber-blue/20 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-3 p
