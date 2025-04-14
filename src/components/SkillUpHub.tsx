
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Trophy, Star, Target, Fire, Gift } from 'lucide-react';
import TopicsSection from '@/components/TopicsSection';
import QuickLearningSection from '@/components/QuickLearningSection';
import topicResponses from '@/data/topicResponses';
import { toast } from '@/components/ui/use-toast';

interface SkillUpHubProps {
  onSelectTopic: (content: string) => void;
}

interface DailyChallenge {
  topic: string;
  description: string;
  xpBonus: number;
}

const SkillUpHub: React.FC<SkillUpHubProps> = ({ onSelectTopic }) => {
  const [activeTab, setActiveTab] = useState("topics");
  const [isExpanded, setIsExpanded] = useState(true);
  const [featuredTopic, setFeaturedTopic] = useState<string | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>({
    topic: '',
    description: '',
    xpBonus: 0
  });
  const [featureHover, setFeatureHover] = useState(false);
  const [challengeHover, setChallengeHover] = useState(false);
  
  const dailyChallenges: DailyChallenge[] = [
    { topic: 'Python', description: 'Learn the basics of Python functions', xpBonus: 15 },
    { topic: 'Web Development', description: 'Explore HTML and CSS fundamentals', xpBonus: 20 },
    { topic: 'AI', description: 'Understand Machine Learning concepts', xpBonus: 25 },
    { topic: 'Cybersecurity', description: 'Learn about ethical hacking', xpBonus: 20 },
    { topic: 'Soft Skills', description: 'Practice communication techniques', xpBonus: 15 },
    { topic: 'Data Science', description: 'Explore data visualization tools', xpBonus: 20 },
    { topic: 'JavaScript', description: 'Master JavaScript promises', xpBonus: 25 }
  ];
  
  useEffect(() => {
    const topics = Object.keys(topicResponses);
    if (topics.length > 0) {
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      setFeaturedTopic(randomTopic);
    }
    
    const todayDate = new Date().toDateString();
    const storedDate = localStorage.getItem('skillup_challenge_date');
    
    if (storedDate !== todayDate) {
      const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
      setDailyChallenge(randomChallenge);
      localStorage.setItem('skillup_challenge_date', todayDate);
      localStorage.setItem('skillup_daily_challenge', JSON.stringify(randomChallenge));
    } else {
      const storedChallenge = localStorage.getItem('skillup_daily_challenge');
      if (storedChallenge) {
        try {
          const parsedChallenge = JSON.parse(storedChallenge);
          if (parsedChallenge && parsedChallenge.topic && parsedChallenge.description) {
            setDailyChallenge(parsedChallenge);
          } else {
            // If stored challenge is invalid, set a new one
            const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
            setDailyChallenge(randomChallenge);
            localStorage.setItem('skillup_daily_challenge', JSON.stringify(randomChallenge));
          }
        } catch (e) {
          console.error("Error parsing stored challenge:", e);
          // If parsing fails, set a new challenge
          const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
          setDailyChallenge(randomChallenge);
          localStorage.setItem('skillup_daily_challenge', JSON.stringify(randomChallenge));
        }
      } else {
        // If no stored challenge, set a new one
        const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
        setDailyChallenge(randomChallenge);
        localStorage.setItem('skillup_daily_challenge', JSON.stringify(randomChallenge));
      }
    }
  }, []);
  
  const handleTopicSelect = (topicId: string) => {
    onSelectTopic("Fetching information about this topic...");
    
    // Display a loading toast
    toast({
      title: "Loading content",
      description: "Preparing your learning materials...",
      duration: 1500,
    });
    
    setTimeout(() => {
      const content = topicResponses[topicId] || "I don't have specific information about this topic yet, but I'd be happy to discuss it if you have questions!";
      onSelectTopic(content);
    }, 800);
    
    if (topicId.toLowerCase().includes(dailyChallenge.topic.toLowerCase())) {
      setTimeout(() => {
        toast({
          title: "🎯 Challenge Started!",
          description: `You've begun today's challenge. Complete it to earn +${dailyChallenge.xpBonus} XP!`,
          variant: "default",
          duration: 5000,
        });
        
        onSelectTopic(`🎯 Daily Challenge Progress! You've started working on today's challenge: "${dailyChallenge.description}". Complete it to earn +${dailyChallenge.xpBonus} XP bonus!`);
      }, 2000);
    }
  };
  
  const handleFeaturedTopic = () => {
    if (featuredTopic) {
      handleTopicSelect(featuredTopic);
    }
  };
  
  const handleDailyChallenge = () => {
    if (dailyChallenge && dailyChallenge.topic) {
      handleTopicSelect(dailyChallenge.topic);
      
      // Add special effect for starting challenge
      const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==");
      audio.volume = 0.2;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const containerVariants = {
    expanded: { 
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3 }
    },
    collapsed: { 
      height: '70px',
      opacity: 0.8,
      transition: { duration: 0.3 }
    }
  };
  
  const headerVariants = {
    expanded: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    collapsed: {
      opacity: 0.9,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const contentVariants = {
    expanded: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, delay: 0.1 }
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };
  
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };

  return (
    <motion.div
      className="cyber-panel p-4 mb-6 relative overflow-hidden"
      initial="expanded"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
    >
      <div className="absolute top-0 right-0 p-2">
        <button 
          onClick={toggleExpanded}
          className="p-1 hover:bg-cyber-darker rounded-md transition-colors text-cyber-blue"
        >
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>
      
      <motion.div 
        variants={headerVariants}
        className="relative"
      >
        <h2 className="font-orbitron text-xl mb-4 text-center cyber-gradient-text">
          Quick Learning Hub
        </h2>
        
        <motion.div
          className="absolute -top-1 -right-1"
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
        >
          <Sparkles className="text-yellow-400" size={16} />
        </motion.div>
        
        <motion.div
          className="absolute -top-1 -left-1"
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '1s' }}
        >
          <Sparkles className="text-cyber-blue" size={16} />
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={contentVariants}
      >
        {featuredTopic && (
          <motion.div 
            className={`mb-4 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 p-3 rounded-md border ${featureHover ? 'border-cyber-blue' : 'border-cyber-blue/30'} cursor-pointer transform transition-all duration-300`}
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 168, 255, 0.3)" }}
            onClick={handleFeaturedTopic}
            onMouseEnter={() => setFeatureHover(true)}
            onMouseLeave={() => setFeatureHover(false)}
            animate={featureHover ? pulseAnimation : {}}
          >
            <div className="flex items-center mb-1">
              <motion.div
                animate={{ rotate: featureHover ? [0, 15, -15, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Star className="text-yellow-400 mr-2" size={16} />
              </motion.div>
              <h3 className="font-orbitron text-sm text-cyber-blue">Featured Topic</h3>
              {featureHover && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-2 flex items-center"
                >
                  <Fire size={14} className="text-cyber-pink" />
                  <span className="text-xs text-cyber-pink ml-1">HOT</span>
                </motion.div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">{featuredTopic}</p>
              <motion.button 
                className={`text-xs ${featureHover ? 'bg-cyber-blue/50' : 'bg-cyber-blue/20'} hover:bg-cyber-blue/30 px-2 py-1 rounded transition-colors text-cyber-blue`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className={`mb-4 bg-gradient-to-r from-cyber-pink/20 to-cyber-purple/20 p-3 rounded-md border ${challengeHover ? 'border-cyber-pink' : 'border-cyber-pink/30'} cursor-pointer transform transition-all duration-300`}
          whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255, 91, 175, 0.3)" }}
          onClick={handleDailyChallenge}
          onMouseEnter={() => setChallengeHover(true)}
          onMouseLeave={() => setChallengeHover(false)}
          animate={challengeHover ? pulseAnimation : {}}
        >
          <div className="flex items-center mb-1">
            <motion.div
              animate={{ rotate: challengeHover ? [0, 15, -15, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Target className="text-cyber-pink mr-2" size={16} />
            </motion.div>
            <h3 className="font-orbitron text-sm text-cyber-pink">Daily Challenge</h3>
            {challengeHover && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2 flex items-center"
              >
                <Gift size={14} className="text-cyber-green" />
                <span className="text-xs text-cyber-green ml-1">REWARD</span>
              </motion.div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">{dailyChallenge.description || "Loading challenge..."}</p>
              <p className="text-xs text-cyber-green flex items-center">
                <Trophy size={12} className="mr-1" /> +{dailyChallenge.xpBonus} XP Bonus
              </p>
            </div>
            <motion.button 
              className={`text-xs ${challengeHover ? 'bg-cyber-pink/50' : 'bg-cyber-pink/20'} hover:bg-cyber-pink/30 px-2 py-1 rounded transition-colors text-cyber-pink`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start
            </motion.button>
          </div>
        </motion.div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="topics" className="font-orbitron text-sm">
              <Zap size={14} className="mr-1" /> Topics
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="font-orbitron text-sm bg-cyber-blue text-black data-[state=active]:text-black data-[state=active]:bg-cyber-blue"
            >
              <Trophy size={14} className="mr-1" /> Resources
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "topics" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "topics" ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="topics" className="mt-0">
                <TopicsSection onSelectTopic={handleTopicSelect} />
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <QuickLearningSection onSelectTopic={onSelectTopic} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default SkillUpHub;
