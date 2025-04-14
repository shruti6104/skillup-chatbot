import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Trophy, Star, Target } from 'lucide-react';
import TopicsSection from '@/components/TopicsSection';
import QuickLearningSection from '@/components/QuickLearningSection';
import topicResponses from '@/data/topicResponses';

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
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setFeaturedTopic(randomTopic);
    
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
        setDailyChallenge(JSON.parse(storedChallenge));
      }
    }
  }, []);
  
  const handleTopicSelect = (topicId: string) => {
    onSelectTopic("Fetching information about this topic...");
    
    setTimeout(() => {
      const content = topicResponses[topicId] || "I don't have specific information about this topic yet, but I'd be happy to discuss it if you have questions!";
      onSelectTopic(content);
    }, 500);
    
    if (topicId.toLowerCase().includes(dailyChallenge.topic.toLowerCase())) {
      setTimeout(() => {
        onSelectTopic(`🎯 Daily Challenge Progress! You've started working on today's challenge: "${dailyChallenge.description}". Complete it to earn +${dailyChallenge.xpBonus} XP bonus!`);
      }, 2000);
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
          <div className="mb-4 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 p-3 rounded-md border border-cyber-blue/30">
            <div className="flex items-center mb-1">
              <Star className="text-yellow-400 mr-2" size={16} />
              <h3 className="font-orbitron text-sm text-cyber-blue">Featured Topic</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">{featuredTopic}</p>
              <button 
                onClick={() => handleTopicSelect(featuredTopic)}
                className="text-xs bg-cyber-blue/20 hover:bg-cyber-blue/30 px-2 py-1 rounded transition-colors text-cyber-blue"
              >
                Explore
              </button>
            </div>
          </div>
        )}
        
        <div className="mb-4 bg-gradient-to-r from-cyber-pink/20 to-cyber-purple/20 p-3 rounded-md border border-cyber-pink/30">
          <div className="flex items-center mb-1">
            <Target className="text-cyber-pink mr-2" size={16} />
            <h3 className="font-orbitron text-sm text-cyber-pink">Daily Challenge</h3>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">{dailyChallenge.description}</p>
              <p className="text-xs text-cyber-green">+{dailyChallenge.xpBonus} XP Bonus</p>
            </div>
            <button 
              onClick={() => handleTopicSelect(dailyChallenge.topic)}
              className="text-xs bg-cyber-pink/20 hover:bg-cyber-pink/30 px-2 py-1 rounded transition-colors text-cyber-pink"
            >
              Start
            </button>
          </div>
        </div>
        
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
