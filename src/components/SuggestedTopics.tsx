
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Brain, Code, Globe } from 'lucide-react';

interface SuggestedTopicsProps {
  onSelectTopic: (topic: string) => void;
}

const SuggestedTopics: React.FC<SuggestedTopicsProps> = ({ onSelectTopic }) => {
  const topics = [
    { name: 'Python Basics', icon: <Code />, color: 'bg-blue-500/20' },
    { name: 'Web Development', icon: <Globe />, color: 'bg-green-500/20' },
    { name: 'Machine Learning', icon: <Brain />, color: 'bg-purple-500/20' },
    { name: 'Study Tips', icon: <Book />, color: 'bg-yellow-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {topics.map((topic) => (
        <motion.button
          key={topic.name}
          className={`p-2 ${topic.color} rounded-lg flex items-center gap-2 hover:opacity-80 transition-opacity`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectTopic(topic.name)}
        >
          {topic.icon}
          <span className="text-sm">{topic.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedTopics;
