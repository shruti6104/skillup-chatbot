
import React, { useState } from 'react';
import { Globe, FileText, Cpu, Code, ExternalLink, BarChart, BookOpen, Shield, Network } from 'lucide-react';

interface LearningResourceProps {
  icon: React.ReactNode;
  name: string;
  category: string;
  url: string;
}

interface QuickLearningProps {
  onSelectTopic: (topic: string) => void;
}

const QuickLearningSection: React.FC<QuickLearningProps> = ({ onSelectTopic }) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
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
      url: "https://www.deeplearning.ai/"
    },
    {
      icon: <Shield className="text-cyber-purple" size={16} />,
      name: "HACKTHEBOX",
      category: "CYBERSECURITY",
      url: "https://www.hackthebox.com/"
    }
  ];

  // Filter resources based on selected category
  const filteredResources = categoryFilter === 'all' 
    ? learningResources 
    : learningResources.filter(resource => 
        resource.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          className={`px-3 py-1 text-xs rounded-md ${typeFilter === 'all' ? 'bg-cyber-purple text-black' : 'bg-cyber-darker'}`}
          onClick={() => setTypeFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${typeFilter === 'free' ? 'bg-cyber-green text-black' : 'bg-cyber-darker'}`}
          onClick={() => setTypeFilter(typeFilter === 'free' ? 'all' : 'free')}
        >
          Free
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${typeFilter === 'paid' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
          onClick={() => setTypeFilter(typeFilter === 'paid' ? 'all' : 'paid')}
        >
          Paid
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'all' ? 'bg-cyber-purple text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter('all')}
        >
          All Topics
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'web' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'web' ? 'all' : 'web')}
        >
          Web Dev
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'data' ? 'bg-cyber-green text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'data' ? 'all' : 'data')}
        >
          Data Science
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'ai' ? 'bg-cyber-pink text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'ai' ? 'all' : 'ai')}
        >
          AI/ML
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'cyber' ? 'bg-cyber-purple text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'cyber' ? 'all' : 'cyber')}
        >
          Cybersecurity
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-md ${categoryFilter === 'soft' ? 'bg-cyber-blue text-black' : 'bg-cyber-darker'}`}
          onClick={() => setCategoryFilter(categoryFilter === 'soft' ? 'all' : 'soft')}
        >
          Soft Skills
        </button>
      </div>

      <div className="space-y-2">
        {filteredResources.map((resource, index) => (
          <a 
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-panel p-3 w-full text-left flex items-center justify-between hover:border-cyber-blue transition-colors"
          >
            <div className="flex items-center">
              {resource.icon}
              <span className="ml-3 text-cyber-blue font-orbitron">{resource.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-cyber-green mr-2">{resource.category}</span>
              <ExternalLink size={14} className="text-cyber-blue" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLearningSection;
