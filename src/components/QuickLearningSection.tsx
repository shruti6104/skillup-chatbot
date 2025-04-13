
import React, { useState, useEffect } from 'react';
import { Globe, FileText, Cpu, Code, ExternalLink, BarChart, BookOpen, Shield, Network, Brain, Video, Github, Book, HeartHandshake, BookCheck, Layers, Bookmark, Blocks, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

interface LearningResourceProps {
  icon: React.ReactNode;
  name: string;
  category: string;
  url: string;
  isNew?: boolean;
}

interface QuickLearningProps {
  onSelectTopic: (topic: string) => void;
}

const QuickLearningSection: React.FC<QuickLearningProps> = ({ onSelectTopic }) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [resourcesClicked, setResourcesClicked] = useState<{[key: string]: boolean}>({});
  const [streakCount, setStreakCount] = useState<number>(0);
  const [animateNew, setAnimateNew] = useState<boolean>(true);
  
  // Get resources clicked from localStorage on initial load
  useEffect(() => {
    const saved = localStorage.getItem('skillup_resources_clicked');
    if (saved) {
      setResourcesClicked(JSON.parse(saved));
    }
    
    // Animate new resources for 10 seconds after load
    const timer = setTimeout(() => {
      setAnimateNew(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const learningResources: LearningResourceProps[] = [
    {
      icon: <Globe className="text-cyber-blue" size={16} />,
      name: "GOOGLE DEVELOPERS",
      category: "WEB & AI",
      url: "https://developers.google.com/"
    },
    {
      icon: <FileText className="text-cyber-green" size={16} />,
      name: "KAGGLE",
      category: "DATA SCIENCE",
      url: "https://www.kaggle.com/learn"
    },
    {
      icon: <Cpu className="text-cyber-pink" size={16} />,
      name: "FAST.AI",
      category: "AI",
      url: "https://www.fast.ai/"
    },
    {
      icon: <Code className="text-cyber-blue" size={16} />,
      name: "ROADMAP.SH",
      category: "DEV PATHS",
      url: "https://roadmap.sh/"
    },
    {
      icon: <Code className="text-cyber-green" size={16} />,
      name: "FREECODECAMP",
      category: "WEB DEV",
      url: "https://www.freecodecamp.org/"
    },
    {
      icon: <BarChart className="text-cyber-blue" size={16} />,
      name: "DATACAMP",
      category: "DATA SCIENCE",
      url: "https://www.datacamp.com/"
    },
    {
      icon: <Shield className="text-cyber-purple" size={16} />,
      name: "TRYHACKME",
      category: "CYBERSECURITY",
      url: "https://tryhackme.com/"
    },
    {
      icon: <Network className="text-cyber-green" size={16} />,
      name: "COURSERA SOFT SKILLS",
      category: "SOFT SKILLS",
      url: "https://www.coursera.org/courses?query=soft%20skills"
    },
    {
      icon: <Brain className="text-cyber-pink" size={16} />,
      name: "DEEPLEARNING.AI",
      category: "AI/ML",
      url: "https://www.deeplearning.ai/",
      isNew: true
    },
    {
      icon: <Shield className="text-cyber-purple" size={16} />,
      name: "HACKTHEBOX",
      category: "CYBERSECURITY",
      url: "https://www.hackthebox.com/"
    },
    {
      icon: <Video className="text-cyber-blue" size={16} />,
      name: "PLURALSIGHT",
      category: "VARIOUS TECH",
      url: "https://www.pluralsight.com/"
    },
    {
      icon: <Github className="text-cyber-green" size={16} />,
      name: "GITHUB LEARNING LAB",
      category: "DEV TOOLS",
      url: "https://lab.github.com/"
    },
    {
      icon: <Book className="text-cyber-purple" size={16} />,
      name: "MDN WEB DOCS",
      category: "WEB DEV",
      url: "https://developer.mozilla.org/"
    },
    {
      icon: <HeartHandshake className="text-cyber-pink" size={16} />,
      name: "TOASTMASTERS",
      category: "SOFT SKILLS",
      url: "https://www.toastmasters.org/"
    },
    {
      icon: <BookCheck className="text-cyber-blue" size={16} />,
      name: "EDUREKA",
      category: "TECH COURSES",
      url: "https://www.edureka.co/"
    },
    {
      icon: <Layers className="text-cyber-green" size={16} />,
      name: "TENSORFLOW TUTORIALS",
      category: "AI/ML",
      url: "https://www.tensorflow.org/tutorials",
      isNew: true
    },
    {
      icon: <Bookmark className="text-cyber-purple" size={16} />,
      name: "UDACITY",
      category: "TECH EDUCATION",
      url: "https://www.udacity.com/"
    },
    {
      icon: <Shield className="text-cyber-pink" size={16} />,
      name: "OWASP",
      category: "CYBERSECURITY",
      url: "https://owasp.org/www-project-top-ten/",
      isNew: true
    },
    {
      icon: <Blocks className="text-cyber-blue" size={16} />,
      name: "CODECADEMY",
      category: "CODING BASICS",
      url: "https://www.codecademy.com/"
    },
    {
      icon: <Brain className="text-cyber-green" size={16} />,
      name: "MIT OCW",
      category: "COMPUTER SCIENCE",
      url: "https://ocw.mit.edu/search/?t=Computer%20Science"
    }
  ];

  // Filter resources based on selected category
  const filteredResources = categoryFilter === 'all' 
    ? learningResources 
    : learningResources.filter(resource => 
        resource.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );

  // Function to handle resource click
  const handleResourceClick = (resource: LearningResourceProps) => {
    // Update clicked resources
    const newResourcesClicked = {
      ...resourcesClicked,
      [resource.name]: true
    };
    setResourcesClicked(newResourcesClicked);
    localStorage.setItem('skillup_resources_clicked', JSON.stringify(newResourcesClicked));
    
    // Check for streak
    const clickedCount = Object.values(newResourcesClicked).filter(Boolean).length;
    const newStreakCount = Math.floor(clickedCount / 5);
    
    if (newStreakCount > streakCount) {
      setStreakCount(newStreakCount);
      toast({
        title: "Resource Streak Unlocked! 🔥",
        description: `You've explored ${clickedCount} resources! +5 XP gained.`,
      });
      
      // Play achievement sound
      const audio = new Audio();
      audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
      audio.volume = 0.2;
      audio.play();
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(0, 168, 255, 0)",
        "0 0 0 10px rgba(0, 168, 255, 0.3)",
        "0 0 0 0 rgba(0, 168, 255, 0)"
      ],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 2
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${typeFilter === 'all' ? 'bg-cyber-purple text-black' : 'bg-cyber-darker'}`}
          onClick={() => setTypeFilter('all')}
        >
          All
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${typeFilter === 'free' ? 'bg-cyber-green text-black' : 'bg-cyber-darker'}`}
          onClick={() => setTypeFilter(typeFilter === 'free' ? 'all' : 'free')}
        >
          Free
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${typeFilter === 'paid' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
          onClick={() => setTypeFilter(typeFilter === 'paid' ? 'all' : 'paid')}
        >
          Paid
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'all' ? 'bg-cyber-purple text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter('all')}
        >
          All Topics
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'web' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'web' ? 'all' : 'web')}
        >
          Web Dev
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'data' ? 'bg-cyber-green text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'data' ? 'all' : 'data')}
        >
          Data Science
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'ai' ? 'bg-cyber-pink text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'ai' ? 'all' : 'ai')}
        >
          AI/ML
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'cyber' ? 'bg-cyber-purple text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'cyber' ? 'all' : 'cyber')}
        >
          Cybersecurity
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'soft' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'soft' ? 'all' : 'soft')}
        >
          Soft Skills
        </motion.button>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-2 max-h-[400px] overflow-y-auto pr-2"
      >
        {filteredResources.map((resource, index) => (
          <motion.a 
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 168, 255, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleResourceClick(resource)}
            className={`cyber-panel p-3 w-full text-left flex items-center justify-between 
              ${resourcesClicked[resource.name] ? 'border-cyber-green' : 'hover:border-cyber-blue'} 
              transition-colors relative`}
          >
            <div className="flex items-center">
              {resourcesClicked[resource.name] && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -left-1 -top-1 bg-cyber-green rounded-full p-0.5"
                >
                  <Star size={10} className="text-black" />
                </motion.div>
              )}
              {resource.icon}
              <span className="ml-3 text-cyber-blue font-orbitron">{resource.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-cyber-green mr-2">{resource.category}</span>
              {resource.isNew && animateNew ? (
                <motion.div
                  variants={pulseVariants}
                  animate="pulse"
                  className="mr-2 bg-cyber-pink px-1 rounded-sm"
                >
                  <span className="text-[10px] font-bold">NEW</span>
                </motion.div>
              ) : null}
              {resourcesClicked[resource.name] ? (
                <Zap size={14} className="text-cyber-green" />
              ) : (
                <ExternalLink size={14} className="text-cyber-blue" />
              )}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default QuickLearningSection;
