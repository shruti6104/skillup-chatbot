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
import ChatbotQuiz, { ChatbotQuizRef } from '@/components/ChatbotQuiz';
import { Link } from 'react-router-dom';
import SuggestedQueries from '@/components/SuggestedQueries';
import SkillUpHub from '@/components/SkillUpHub';
import ChatbotAvatar from '@/components/ChatbotAvatar';
import LearningSummary from '@/components/LearningSummary';
import ChatInput from '@/components/ChatInput';
import { playSound } from '@/utils/audioUtils';

const STREAK_KEY = 'skillup_streak';
const LAST_LOGIN_KEY = 'skillup_last_login';
const MESSAGE_COUNT_KEY = 'skillup_message_count';
const TOPICS_EXPLORED_KEY = 'skillup_topics';
const SKILLS_PROGRESS_KEY = 'skillup_skills_progress';
const BADGES_KEY = 'skillup_badges';
const SESSION_START_KEY = 'skillup_session_start';

const learningTopics = [
  'python', 'javascript', 'web development', 'ai', 'cybersecurity', 
  'soft skills', 'machine learning', 'react', 'database', 'data science'
];

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

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glowAnimation = {
  animate: {
    boxShadow: [
      "0 0 5px rgba(0, 168, 255, 0.3)",
      "0 0 15px rgba(0, 168, 255, 0.5)",
      "0 0 5px rgba(0, 168, 255, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const sidebarVariants = {
  closed: { x: "-100%", opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

const msgContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  })
};

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
  
  const chatbotQuizRef = useRef<ChatbotQuizRef>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const sessionInterval = useRef<number | null>(null);

  useEffect(() => {
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
    
    scrollToBottom();
    
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

    playSound('levelup');
  }, []);

  useEffect(() => {
    localStorage.setItem(MESSAGE_COUNT_KEY, messageCount.toString());
    localStorage.setItem(TOPICS_EXPLORED_KEY, JSON.stringify(topicsExplored));
    localStorage.setItem(SKILLS_PROGRESS_KEY, JSON.stringify(skillProgress));
    localStorage.setItem(BADGES_KEY, JSON.stringify(userBadgesList));
    
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
    
    if (chatbotQuizRef.current && chatbotQuizRef.current.startQuizFromPrompt(message)) {
      return null;
    }
    
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
        badge.id === activeQuiz 
          ? { ...badge, earned: false, date: undefined } 
          : badge
      ));
    } else {
      playSound('success');
      
      const confetti = document.createElement('div');
      confetti.className = 'fixed inset-0 pointer-events-none z-50';
      document.body.appendChild(confetti);
      
      for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 5;
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = ['#00A8FF', '#6C63FF', '#FF2EB9', '#00FF9D'][Math.floor(Math.random() * 4)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.opacity = '0';
        particle.style.transform = 'translateY(0)';
        particle.style.animation = `
          fadeIn 0.3s ease forwards, 
          fall ${Math.random() * 2 + 2}s ease-in forwards,
          sway ${Math.random() * 3 + 2}s ease-in-out infinite alternate
        `;
        
        confetti.appendChild(particle);
      }
      
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 5000);
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

  return (
    <div className="flex h-screen bg-cyber-dark">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            className="w-64 bg-cyber-darker border-r border-cyber-border p-4 flex flex-col"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="font-orbitron text-lg text-cyber-blue">SkillUp AI</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                  <CornerDownLeft className="h-4 w-4 text-cyber-blue" />
                </Button>
              </div>
            </div>

            <SkillUpHub
              onSelectTopic={(content) => {
                const newBotMessage: Message = {
                  id: Date.now().toString(),
                  role: 'assistant',
                  content,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, newBotMessage]);
              }}
              userLevel={userLevel}
              userXP={userXP}
              userBadges={userBadges}
              userStreak={userStreak}
              skillProgress={skillProgress}
              lastTopic={lastTopic}
              sessionTime={sessionTime}
            />

            <nav className="flex-1 py-4">
              <ul>
                <li>
                  <Link to="/" className="flex items-center text-sm font-semibold text-cyber-blue hover:text-cyber-light mb-2">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="flex items-center text-sm font-semibold text-cyber-blue hover:text-cyber-light mb-2">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/stats" className="flex items-center text-sm font-semibold text-cyber-blue hover:text-cyber-light">
                    <ListOrdered className="mr-2 h-4 w-4" />
                    Stats
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col bg-cyber-darker">
        <div className="border-b border-cyber-border p-3 flex items-center justify-between">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                <MenuIcon className="h-5 w-5 text-cyber-blue mr-2" />
              </Button>
            )}
            <ChatbotAvatar animation={floatAnimation} />
            <h1 className="font-orbitron text-lg text-cyber-blue ml-2">SkillUp AI Chat</h1>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              variants={msgContainerVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              variants={msgContainerVariants}
              initial="hidden"
              animate="visible"
              custom={messages.length}
            >
              <ChatMessage
                message={{
                  id: 'typing',
                  role: 'assistant',
                  content: 'Thinking...',
                  timestamp: new Date(),
                }}
              />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-cyber-border">
          <ChatInput
            onSendMessage={handleSendMessage}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            messageInputRef={messageInputRef}
          />
        </div>
      </div>

      <aside className="w-80 bg-cyber-darker border-l border-cyber-border p-4 flex flex-col">
        <ChatbotQuiz onQuizComplete={handleQuizComplete} ref={chatbotQuizRef} />

        <div className="mt-4">
          <h3 className="font-orbitron text-lg text-cyber-blue mb-2">Suggested Topics</h3>
          <SuggestedQueries 
            suggestedQueries={suggestedQueries}
            onSelectQuery={(query) => {
              setInputValue(query);
              setTimeout(() => {
                handleSendMessage();
              }, 100);
            }}
          />
        </div>
      </aside>

      {activeQuiz && (
        <QuizModal
          isOpen={Boolean(activeQuiz)}
          onClose={() => setActiveQuiz(null)}
          quizData={activeQuiz && quizzes[activeQuiz] ? quizzes[activeQuiz].questions : []}
          badgeId={activeQuiz && quizzes[activeQuiz] ? quizzes[activeQuiz].badgeId : ''}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default Chatbot;
