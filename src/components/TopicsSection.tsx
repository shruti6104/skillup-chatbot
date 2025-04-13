
import React from 'react';
import { Database, Code, Cpu, Globe, Shield, BookOpen, Search, BarChart, Brain, Network } from 'lucide-react';

interface TopicItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
}

interface TopicsSectionProps {
  onSelectTopic: (topic: string) => void;
}

const TopicsSection: React.FC<TopicsSectionProps> = ({ onSelectTopic }) => {
  const topics: TopicItem[] = [
    {
      id: 'python-decorators',
      title: 'EXPLAIN PYTHON DECORATORS',
      category: 'PYTHON',
      icon: <Code className="text-cyber-blue" size={18} />
    },
    {
      id: 'sql-injection',
      title: 'WHAT IS SQL INJECTION?',
      category: 'SECURITY',
      icon: <Database className="text-cyber-purple" size={18} />
    },
    {
      id: 'neural-networks',
      title: 'EXPLAIN NEURAL NETWORKS',
      category: 'AI',
      icon: <Cpu className="text-cyber-pink" size={18} />
    },
    {
      id: 'optimize-react',
      title: 'HOW TO OPTIMIZE REACT APPS?',
      category: 'WEB DEV',
      icon: <Globe className="text-cyber-green" size={18} />
    },
    {
      id: 'python-for-ai',
      title: 'HOW DO I LEARN PYTHON FOR AI?',
      category: 'LEARNING PATH',
      icon: <Search className="text-cyber-blue" size={18} />
    },
    {
      id: 'web-dev-courses',
      title: 'BEST FREE COURSES FOR WEB DEVELOPMENT',
      category: 'WEB DEV',
      icon: <BookOpen className="text-cyber-green" size={18} />
    },
    {
      id: 'cybersecurity-start',
      title: 'HOW TO GET STARTED WITH CYBERSECURITY',
      category: 'SECURITY',
      icon: <Shield className="text-cyber-purple" size={18} />
    },
    {
      id: 'data-science-basics',
      title: 'DATA SCIENCE FUNDAMENTALS',
      category: 'DATA SCIENCE',
      icon: <BarChart className="text-cyber-blue" size={18} />
    },
    {
      id: 'machine-learning-intro',
      title: 'INTRODUCTION TO MACHINE LEARNING',
      category: 'AI/ML',
      icon: <Brain className="text-cyber-pink" size={18} />
    },
    {
      id: 'soft-skills-importance',
      title: 'WHY SOFT SKILLS MATTER IN TECH',
      category: 'SOFT SKILLS',
      icon: <Network className="text-cyber-green" size={18} />
    }
  ];

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <button
          key={topic.id}
          className="cyber-panel p-3 w-full text-left hover:border-cyber-blue transition-colors"
          onClick={() => onSelectTopic(topic.id)}
        >
          <div className="flex items-center">
            {topic.icon}
            <span className="ml-3 text-cyber-blue font-orbitron">{topic.title}</span>
            <span className="ml-auto text-xs text-cyber-green">{topic.category}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TopicsSection;
