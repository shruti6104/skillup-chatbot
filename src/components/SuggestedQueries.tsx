
import React, { useState } from 'react';
import { Code, Database, Cpu, Network, ExternalLink, Book, Video, GraduationCap, Globe, School, Search, Filter, Clock, Award, DollarSign, CheckCircle, Lock, FileText, Shield } from 'lucide-react';

interface SuggestedQueriesProps {
  onSelectQuery: (query: string) => void;
}

const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ onSelectQuery }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'resources' | 'paths'>('topics');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const queries = [
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

  const websites = [
    {
      icon: <Code className="text-cyber-blue" size={16} />,
      name: "Python.org",
      url: "https://python.org",
      category: "Python",
      difficulty: "all",
      type: "free"
    },
    {
      icon: <Book className="text-cyber-green" size={16} />,
      name: "GeeksforGeeks",
      url: "https://geeksforgeeks.org",
      category: "Coding",
      difficulty: "all",
      type: "free"
    },
    {
      icon: <Video className="text-cyber-pink" size={16} />,
      name: "Coursera",
      url: "https://coursera.org",
      category: "Courses",
      difficulty: "all",
      type: "paid"
    },
    {
      icon: <School className="text-cyber-purple" size={16} />,
      name: "Khan Academy",
      url: "https://khanacademy.org",
      category: "Learning",
      difficulty: "beginner",
      type: "free"
    },
    {
      icon: <Globe className="text-cyber-blue" size={16} />,
      name: "W3Schools",
      url: "https://w3schools.com",
      category: "Web Dev",
      difficulty: "beginner",
      type: "free"
    },
    {
      icon: <Video className="text-cyber-pink" size={16} />,
      name: "Udemy",
      url: "https://udemy.com",
      category: "Courses",
      difficulty: "all",
      type: "paid"
    },
    {
      icon: <GraduationCap className="text-cyber-green" size={16} />,
      name: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu",
      category: "Academic",
      difficulty: "advanced",
      type: "free"
    },
    {
      icon: <Database className="text-cyber-purple" size={16} />,
      name: "OWASP",
      url: "https://owasp.org",
      category: "Security",
      difficulty: "intermediate",
      type: "free"
    },
    {
      icon: <Cpu className="text-cyber-pink" size={16} />,
      name: "TensorFlow",
      url: "https://tensorflow.org",
      category: "AI",
      difficulty: "intermediate",
      type: "free"
    },
    {
      icon: <Network className="text-cyber-green" size={16} />,
      name: "React Docs",
      url: "https://react.dev",
      category: "Web Dev",
      difficulty: "intermediate",
      type: "free"
    },
    // New resources added
    {
      icon: <Code className="text-cyber-blue" size={16} />,
      name: "CS50 (Harvard)",
      url: "https://cs50.harvard.edu/",
      category: "Programming",
      difficulty: "beginner",
      type: "free"
    },
    {
      icon: <Globe className="text-cyber-purple" size={16} />,
      name: "Google Developers",
      url: "https://developers.google.com/",
      category: "Web & AI",
      difficulty: "intermediate",
      type: "free"
    },
    {
      icon: <FileText className="text-cyber-green" size={16} />,
      name: "Kaggle",
      url: "https://www.kaggle.com/learn",
      category: "Data Science",
      difficulty: "intermediate",
      type: "free"
    },
    {
      icon: <Cpu className="text-cyber-pink" size={16} />,
      name: "Fast.ai",
      url: "https://www.fast.ai/",
      category: "AI",
      difficulty: "intermediate",
      type: "free"
    },
    {
      icon: <Code className="text-cyber-blue" size={16} />,
      name: "Roadmap.sh",
      url: "https://roadmap.sh/",
      category: "Dev Paths",
      difficulty: "all",
      type: "free"
    },
    {
      icon: <Network className="text-cyber-green" size={16} />,
      name: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      category: "Web Dev",
      difficulty: "beginner",
      type: "free"
    }
  ];

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

  const filteredWebsites = websites.filter(site => 
    (difficultyFilter === 'all' || site.difficulty === difficultyFilter || site.difficulty === 'all') && 
    (typeFilter === 'all' || site.type === typeFilter)
  );

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
            className={`px-2 py-1 text-xs rounded-md ${activeTab === 'resources' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
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
              onClick={() => onSelectQuery(query.text)}
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

      {activeTab === 'resources' && (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-1">
              <button 
                className={`px-2 py-0.5 text-xs rounded-md flex items-center ${difficultyFilter === 'all' ? 'bg-cyber-pink/20 border border-cyber-pink/40' : 'bg-cyber-darker'}`}
                onClick={() => setDifficultyFilter('all')}
              >
                <Filter size={12} className="mr-1" />
                All
              </button>
              <button 
                className={`px-2 py-0.5 text-xs rounded-md ${typeFilter === 'free' ? 'bg-cyber-green/20 border border-cyber-green/40' : 'bg-cyber-darker'}`}
                onClick={() => setTypeFilter(typeFilter === 'free' ? 'all' : 'free')}
              >
                <CheckCircle size={12} className="mr-1 inline" />
                Free
              </button>
              <button 
                className={`px-2 py-0.5 text-xs rounded-md ${typeFilter === 'paid' ? 'bg-cyber-purple/20 border border-cyber-purple/40' : 'bg-cyber-darker'}`}
                onClick={() => setTypeFilter(typeFilter === 'paid' ? 'all' : 'paid')}
              >
                <DollarSign size={12} className="mr-1 inline" />
                Paid
              </button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredWebsites.map((website, index) => (
              <a 
                key={index}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button w-full text-left flex items-center justify-between neon-glow"
              >
                <span className="flex items-center">
                  {website.icon}
                  <span className="ml-2 text-sm truncate">{website.name}</span>
                  {website.type === 'paid' && <DollarSign size={12} className="ml-1 text-cyber-purple" />}
                </span>
                <span className="flex items-center text-xs bg-cyber-darker px-2 py-1 rounded-md">
                  <ExternalLink size={12} className="mr-1" />
                  {website.category}
                </span>
              </a>
            ))}
          </div>
        </>
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
            onClick={() => onSelectQuery("How do I learn Python for AI?")}
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
