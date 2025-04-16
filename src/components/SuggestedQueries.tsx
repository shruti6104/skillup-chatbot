import React, { useState } from 'react';
import { Code, Database, Cpu, Network, Search, Award, Shield, FileText } from 'lucide-react';

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
      text: "How do I learn Python for AI?",
      category: "Learning Path"
    },
    {
      icon: <Code className="text-cyber-purple" size={16} />,
      text: "Best free courses for web development?",
      category: "Courses"
    },
    {
      icon: <Shield className="text-cyber-pink" size={16} />,
      text: "How to get started with cybersecurity?",
      category: "Security"
    },
    {
      icon: <FileText className="text-cyber-green" size={16} />,
      text: "What are the best resources for data science?",
      category: "Data Science"
    }
  ];

  const queries = externalQueries || defaultQueries;

  const handleSelectQuery = (query: string) => {
    if (onSelectQuery) {
      onSelectQuery(query);
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
      xp: 100
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
      xp: 150
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
      xp: 200
    },
    // New learning paths
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
      xp: 175
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
      xp: 180
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
          <button 
            className={`px-2 py-1 text-xs rounded-md ${activeTab === 'topics' ? 'bg-cyber-pink text-black' : 'bg-cyber-darker'}`}
            onClick={() => setActiveTab('topics')}
          >
            Topics
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded-md ${activeTab === 'paths' ? 'bg-cyber-green text-black' : 'bg-cyber-darker'}`}
            onClick={() => setActiveTab('paths')}
          >
            Paths
          </button>
        </div>
      </div>
      
      {activeTab === 'topics' && (
        <div className="space-y-2">
          {queries.map((query, index) => (
            <button 
              key={index}
              className="cyber-button w-full text-left flex items-center justify-between neon-glow"
              onClick={() => handleSelectQuery(query.text)}
            >
              <span className="flex items-center">
                {query.icon}
                <span className="ml-2 text-sm truncate">{query.text}</span>
              </span>
              <span className="text-xs bg-cyber-darker px-2 py-1 rounded-md">
                {query.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'paths' && (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {learningPaths.map((path, index) => (
            <div key={index} className="cyber-panel p-2 border border-cyber-darker">
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
                <span className="flex items-center text-cyber-pink">
                  <Award size={12} className="mr-1" />
                  {path.xp} XP
                </span>
              </div>
            </div>
          ))}
          <button 
            className="cyber-button w-full text-sm flex items-center justify-center neon-glow"
            onClick={() => handleSelectQuery("How do I learn Python for AI?")}
          >
            <Search size={14} className="mr-2" />
            Generate Custom Learning Path
          </button>
        </div>
      )}
    </div>
  );
};

export default SuggestedQueries;
