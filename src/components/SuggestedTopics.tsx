
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Brain, Code, Globe, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface SuggestedTopicsProps {
  onSelectTopic: (topic: string) => void;
}

const SuggestedTopics: React.FC<SuggestedTopicsProps> = ({ onSelectTopic }) => {
  const topics = [
    { name: 'Python Basics', icon: <Code className="text-blue-400" />, color: 'bg-blue-500/20', description: 'Learn fundamentals of Python programming' },
    { name: 'Web Development', icon: <Globe className="text-green-400" />, color: 'bg-green-500/20', description: 'HTML, CSS, JavaScript and frameworks' },
    { name: 'Machine Learning', icon: <Brain className="text-purple-400" />, color: 'bg-purple-500/20', description: 'AI/ML concepts and applications' },
    { name: 'Study Tips', icon: <Book className="text-yellow-400" />, color: 'bg-yellow-500/20', description: 'Effective learning strategies' },
  ];

  return (
    <div className="space-y-2 mb-4">
      <h3 className="font-orbitron text-sm text-cyber-blue mb-2">Suggested Topics</h3>
      <div className="grid grid-cols-2 gap-2">
        {topics.map((topic) => (
          <motion.div
            key={topic.name}
            className={`p-2 ${topic.color} rounded-lg hover:opacity-90 cursor-pointer transition-all border border-transparent hover:border-white/10`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTopic(topic.name)}
          >
            <div className="flex items-center gap-2 mb-1">
              {topic.icon}
              <span className="text-sm font-semibold">{topic.name}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{topic.description}</p>
          </motion.div>
        ))}
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full text-xs mt-1 bg-cyber-darker/50 hover:bg-cyber-darker"
        onClick={() => onSelectTopic("Show me all learning topics")}
      >
        <Plus className="h-3 w-3 mr-1" /> More topics
      </Button>
    </div>
  );
};

export default SuggestedTopics;
