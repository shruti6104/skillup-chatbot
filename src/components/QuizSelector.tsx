import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Brain, Users, MessageSquare, Cpu, Shield } from 'lucide-react';
import { quizzes } from '@/data/quizData';

type QuizSelectorProps = {
  onSelectQuiz: (quizId: string) => void;
};

const quizCategories = [
  { id: 'webdev', label: 'Web Development', icon: <Book size={16} /> },
  { id: 'datascience', label: 'Data Science', icon: <Brain size={16} /> },
  { id: 'softskills', label: 'Soft Skills', icon: <Users size={16} /> },
  { id: 'communication', label: 'Communication', icon: <MessageSquare size={16} /> },
  { id: 'ai', label: 'AI & ML', icon: <Cpu size={16} /> },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: <Shield size={16} /> },
];

// Add advanced categories
const advancedCategories = [
  { id: 'webdevadvanced', label: 'Advanced Web Dev', icon: <Book size={16} /> },
  { id: 'pythonadvanced', label: 'Advanced Python', icon: <Brain size={16} /> },
  { id: 'machinelearning', label: 'Machine Learning', icon: <Cpu size={16} /> },
  { id: 'deeplearning', label: 'Deep Learning', icon: <Cpu size={16} /> },
  { id: 'fullstack', label: 'Full Stack Dev', icon: <Book size={16} /> },
  { id: 'advancedcyber', label: 'Advanced Security', icon: <Shield size={16} /> },
];

const QuizSelector: React.FC<QuizSelectorProps> = ({ onSelectQuiz }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-orbitron text-lg text-cyber-blue mb-2">Select a Quiz Topic</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {quizCategories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="justify-start border-cyber-blue/30 hover:bg-cyber-blue/20 hover:border-cyber-blue"
            onClick={() => onSelectQuiz(category.id)}
          >
            <span className="mr-2 text-cyber-blue">{category.icon}</span>
            <span className="text-sm truncate">{category.label}</span>
          </Button>
        ))}
      </div>

      <h3 className="font-orbitron text-lg text-cyber-pink mt-4 mb-2">Advanced Topics</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {advancedCategories.map((category) => (
          <Button
            key={category.id}
            variant="outline" 
            className="justify-start border-cyber-pink/30 hover:bg-cyber-pink/20 hover:border-cyber-pink"
            onClick={() => onSelectQuiz(category.id)}
          >
            <span className="mr-2 text-cyber-pink">{category.icon}</span>
            <span className="text-sm truncate">{category.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizSelector;
