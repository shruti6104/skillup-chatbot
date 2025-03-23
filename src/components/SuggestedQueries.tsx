
import React from 'react';
import { Code, Database, Cpu, Network } from 'lucide-react';

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
    </div>
  );
};

export default SuggestedQueries;
