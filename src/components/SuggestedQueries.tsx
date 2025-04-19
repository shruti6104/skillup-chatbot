
import React, { useState, useEffect } from 'react';
import { Code, Database, Cpu, Network, Search, Award, Shield, FileText, BookOpen, Brain, ArrowRight, Trophy, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface SuggestedQueriesProps {
  onSelectQuery?: (query: string) => void;
  suggestedQueries?: Array<{
    text: string;
    category: string;
    icon: React.ReactNode;
  }>;
}

const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ 
  onSelectQuery, 
  suggestedQueries: externalQueries 
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'paths'>('topics');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean[]}>({});
  const [hoveredQuery, setHoveredQuery] = useState<number | null>(null);
  const { toast } = useToast();

  const defaultQueries = [
    {
      icon: <Code className="text-cyber-blue" size={16} />,
      text: "Explain Python decorators",
      category: "Python"
    },
    {
      icon: <Database className="text-cyber-purple" size={16} />,
      text: "What is SQL injection?",
      category: "Security"
    },
    {
      icon: <Cpu className="text-cyber-pink" size={16} />,
      text: "Explain neural networks",
      category: "AI"
    },
    {
      icon: <Network className="text-cyber-green" size={16} />,
      text: "How to optimize React apps?",
      category: "Web Dev"
    },
    {
      icon: <Search className="text-cyber-blue" size={16} />,
      text: "Start quiz on Python",
      category: "Quiz"
    },
    {
      icon: <Code className="text-cyber-purple" size={16} />,
      text: "Best free courses for web development?",
      category: "Courses"
    },
    {
      icon: <Shield className="text-cyber-pink" size={16} />,
      text: "Start quiz on cybersecurity",
      category: "Quiz"
    },
    {
      icon: <FileText className="text-cyber-green" size={16} />,
      text: "Start quiz on data science",
      category: "Quiz"
    },
    {
      icon: <Brain className="text-cyber-blue" size={16} />,
      text: "What are the latest AI advancements?",
      category: "Tech News"
    },
    {
      icon: <BookOpen className="text-cyber-purple" size={16} />,
      text: "Compare Python vs JavaScript",
      category: "Programming"
    }
  ];

  const queries = externalQueries || defaultQueries;

  useEffect(() => {
    // Load completed steps from local storage
    try {
      const savedSteps = localStorage.getItem('skillup_completed_steps');
      if (savedSteps) {
        setCompletedSteps(JSON.parse(savedSteps));
      }
    } catch (e) {
      console.error("Error loading completed steps:", e);
    }
  }, []);

  useEffect(() => {
    // Save completed steps to local storage
    if (Object.keys(completedSteps).length > 0) {
      localStorage.setItem('skillup_completed_steps', JSON.stringify(completedSteps));
    }
  }, [completedSteps]);

  const handleSelectQuery = (query: string) => {
    if (onSelectQuery) {
      onSelectQuery(query);
    }
  };
  
  const handlePathSelect = (pathTitle: string) => {
    setSelectedPath(pathTitle);
    
    // Initialize completed steps for this path if not already done
    if (!completedSteps[pathTitle]) {
      setCompletedSteps(prev => ({
        ...prev,
        [pathTitle]: [false, false, false, false]
      }));
    }
    
    toast({
      title: "Learning Path Selected",
      description: `You've chosen the ${pathTitle} path. Complete the steps to earn XP!`,
    });
  };
  
  const handleStepComplete = (pathTitle: string, stepIndex: number) => {
    // Mark the step as completed
    setCompletedSteps(prev => ({
      ...prev,
      [pathTitle]: prev[pathTitle].map((completed, i) => 
        i === stepIndex ? true : completed
      )
    }));
    
    // Check if all steps are completed
    const updatedSteps = completedSteps[pathTitle] ? 
      [...completedSteps[pathTitle].slice(0, stepIndex), true, ...completedSteps[pathTitle].slice(stepIndex + 1)] : 
      Array(4).fill(false).map((_, i) => i === stepIndex);
      
    if (updatedSteps.every(step => step)) {
      toast({
        title: "🎉 Path Completed!",
        description: `Congratulations! You've completed the ${pathTitle} learning path!`,
      });
    } else {
      toast({
        title: "Step Completed",
        description: `You've completed step ${stepIndex + 1} of the ${pathTitle} path.`,
      });
    }
  };

  const learningPaths = [
    {
      title: "Python for AI Beginners",
      steps: [
        "1. Python Basics - W3Schools",
        "2. Data Structures - GeeksforGeeks",
        "3. Intro to Machine Learning - Khan Academy",
        "4. TensorFlow Fundamentals"
      ],
      difficulty: "beginner",
      category: "AI",
      xp: 100,
      estimatedTime: "4 weeks"
    },
    {
      title: "Web Development Roadmap",
      steps: [
        "1. HTML & CSS - W3Schools",
        "2. JavaScript - MDN Web Docs",
        "3. React Fundamentals",
        "4. Advanced React Patterns"
      ],
      difficulty: "intermediate",
      category: "Web Dev",
      xp: 150,
      estimatedTime: "6 weeks"
    },
    {
      title: "Cybersecurity Specialist",
      steps: [
        "1. Network Basics",
        "2. OWASP Top 10",
        "3. SQL Injection Prevention",
        "4. Penetration Testing"
      ],
      difficulty: "advanced",
      category: "Security",
      xp: 200,
      estimatedTime: "8 weeks"
    },
    {
      title: "Full Stack JavaScript",
      steps: [
        "1. HTML/CSS/JS Fundamentals - freeCodeCamp",
        "2. Node.js & Express - MDN Docs",
        "3. MongoDB & Databases",
        "4. React & Frontend Frameworks"
      ],
      difficulty: "intermediate",
      category: "Web Dev",
      xp: 175,
      estimatedTime: "7 weeks"
    },
    {
      title: "Data Science Career Path",
      steps: [
        "1. Python & Statistics - Kaggle",
        "2. Data Visualization - Matplotlib/Seaborn",
        "3. Machine Learning Basics - Scikit-learn",
        "4. SQL & Database Management"
      ],
      difficulty: "intermediate",
      category: "Data Science",
      xp: 180,
      estimatedTime: "10 weeks"
    },
    {
      title: "Mobile App Development",
      steps: [
        "1. JavaScript/TypeScript Fundamentals",
        "2. React Native Basics - Official Docs",
        "3. State Management with Redux",
        "4. Native Modules & APIs"
      ],
      difficulty: "intermediate",
      category: "Mobile Dev",
      xp: 160,
      estimatedTime: "8 weeks"
    },
    {
      title: "DevOps Engineer Path",
      steps: [
        "1. Linux & Shell Scripting",
        "2. Docker & Containerization",
        "3. CI/CD Pipelines",
        "4. Kubernetes Orchestration"
      ],
      difficulty: "advanced",
      category: "DevOps",
      xp: 220,
      estimatedTime: "12 weeks"
    }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner':
        return <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md">Beginner</span>;
      case 'intermediate':
        return <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-md">Intermediate</span>;
      case 'advanced':
        return <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md">Advanced</span>;
      default:
        return <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md">All Levels</span>;
    }
  };

  return (
    <div className="cyber-panel p-4 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-lg">
          Quick References
        </h3>
        <div className="flex space-x-1">
          <motion.button 
            className={`px-2 py-1 text-xs rounded-md ${activeTab === 'topics' ? 'bg-cyber-pink text-black' : 'bg-cyber-darker'}`}
            onClick={() => setActiveTab('topics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Topics
          </motion.button>
          <motion.button 
            className={`px-2 py-1 text-xs rounded-md ${activeTab === 'paths' ? 'bg-cyber-green text-black' : 'bg-cyber-darker'}`}
            onClick={() => setActiveTab('paths')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Paths
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'topics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            {queries.map((query, index) => (
              <motion.button 
                key={index}
                className="cyber-button w-full text-left flex items-center justify-between neon-glow"
                onClick={() => handleSelectQuery(query.text)}
                onMouseEnter={() => setHoveredQuery(index)}
                onMouseLeave={() => setHoveredQuery(null)}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 168, 255, 0.1)' }}
              >
                <span className="flex items-center">
                  <motion.div
                    animate={hoveredQuery === index ? { rotate: [0, 15, -15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {query.icon}
                  </motion.div>
                  <span className="ml-2 text-sm truncate">{query.text}</span>
                </span>
                <motion.span 
                  className="text-xs bg-cyber-darker px-2 py-1 rounded-md"
                  animate={hoveredQuery === index ? { scale: 1.1 } : {}}
                >
                  {query.category}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {activeTab === 'paths' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 max-h-64 overflow-y-auto pr-1"
          >
            {selectedPath ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center mb-3">
                  <button 
                    className="text-xs flex items-center text-cyber-blue hover:text-cyber-green"
                    onClick={() => setSelectedPath(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to paths
                  </button>
                  <h4 className="font-orbitron text-sm text-cyber-blue ml-2">
                    {selectedPath}
                  </h4>
                </div>
                
                {learningPaths.find(path => path.title === selectedPath)?.steps.map((step, stepIndex) => {
                  const isCompleted = completedSteps[selectedPath] ? completedSteps[selectedPath][stepIndex] : false;
                  
                  return (
                    <motion.div
                      key={stepIndex}
                      className={`p-3 mb-2 rounded-lg border ${isCompleted ? 'border-cyber-green/40 bg-cyber-green/10' : 'border-cyber-blue/30 bg-cyber-darker'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: stepIndex * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isCompleted ? 'line-through text-cyber-green' : ''}`}>{step}</span>
                        <button
                          className={`text-xs px-2 py-1 rounded ${isCompleted ? 'bg-cyber-green/30 text-cyber-green' : 'bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30'}`}
                          onClick={() => {
                            const selectedPathObj = learningPaths.find(path => path.title === selectedPath);
                            if (selectedPathObj) {
                              const stepContent = step.split(' - ')[0].substring(2); // Remove the number prefix
                              handleSelectQuery(`Tell me about ${stepContent} in ${selectedPathObj.category}`);
                              handleStepComplete(selectedPath, stepIndex);
                            }
                          }}
                        >
                          {isCompleted ? 'Completed' : 'Start'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
                
                {completedSteps[selectedPath] && completedSteps[selectedPath].filter(Boolean).length === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 rounded-lg bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20 border border-cyber-green/40"
                  >
                    <div className="flex items-center mb-1">
                      <Trophy className="w-4 h-4 text-cyber-green mr-1" />
                      <h5 className="text-sm font-medium text-cyber-green">Path Completed!</h5>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Congratulations! You've completed all steps in this learning path.
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="text-xs bg-cyber-green/30 hover:bg-cyber-green/40 text-cyber-green px-2 py-1 rounded flex items-center"
                        onClick={() => {
                          const path = learningPaths.find(p => p.title === selectedPath);
                          if (path) {
                            handleSelectQuery(`What should I learn next after completing ${path.title}?`);
                          }
                        }}
                      >
                        Continue Learning <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <>
                {learningPaths.map((path, index) => (
                  <motion.div
                    key={index}
                    className="cyber-panel p-2 border border-cyber-darker hover:border-cyber-blue/50 cursor-pointer"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 168, 255, 0.05)' }}
                    onClick={() => handlePathSelect(path.title)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-orbitron text-sm text-cyber-blue">{path.title}</h4>
                      {getDifficultyBadge(path.difficulty)}
                    </div>
                    <div className="space-y-1 mb-2">
                      {path.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="text-xs text-muted-foreground flex items-start">
                          <span className="mr-1 text-cyber-green">▶</span>
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-cyber-darker px-2 py-0.5 rounded-md">{path.category}</span>
                      <div className="flex space-x-3">
                        <span className="flex items-center text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          {path.estimatedTime}
                        </span>
                        <span className="flex items-center text-cyber-pink">
                          <Award size={12} className="mr-1" />
                          {path.xp} XP
                        </span>
                      </div>
                    </div>
                    
                    {completedSteps[path.title] && (
                      <div className="mt-2 w-full bg-cyber-darker rounded-full h-1.5">
                        <div 
                          className="bg-cyber-green h-1.5 rounded-full" 
                          style={{ 
                            width: `${completedSteps[path.title].filter(Boolean).length * 25}%`,
                            transition: 'width 0.5s ease-in-out'
                          }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.button 
                  className="cyber-button w-full text-sm flex items-center justify-center neon-glow"
                  onClick={() => handleSelectQuery("Help me create a learning path for AI and Machine Learning")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search size={14} className="mr-2" />
                  Generate Custom Learning Path
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuggestedQueries;
