
import React from 'react';
import { Code, Database, Cpu, Network, ExternalLink } from 'lucide-react';

interface SuggestedQueriesProps {
  onSelectQuery: (query: string) => void;
}

const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ onSelectQuery }) => {
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
    }
  ];

  const websites = [
    {
      icon: <Code className="text-cyber-blue" size={16} />,
      name: "Python.org",
      url: "https://python.org",
      category: "Python"
    },
    {
      icon: <Database className="text-cyber-purple" size={16} />,
      name: "OWASP",
      url: "https://owasp.org",
      category: "Security"
    },
    {
      icon: <Cpu className="text-cyber-pink" size={16} />,
      name: "TensorFlow",
      url: "https://tensorflow.org",
      category: "AI"
    },
    {
      icon: <Network className="text-cyber-green" size={16} />,
      name: "React Docs",
      url: "https://react.dev",
      category: "Web Dev"
    }
  ];

  return (
    <div className="cyber-panel p-4 mb-4 animate-fade-in">
      <h3 className="font-orbitron text-lg mb-3">Suggested Topics</h3>
      
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

      <h3 className="font-orbitron text-lg mt-6 mb-3">Learning Resources</h3>
      
      <div className="space-y-2">
        {websites.map((website, index) => (
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
            </span>
            <span className="flex items-center text-xs bg-cyber-darker px-2 py-1 rounded-md">
              <ExternalLink size={12} className="mr-1" />
              {website.category}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQueries;
