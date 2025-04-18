import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Brain, Users, MessageSquare, Cpu, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Advanced categories
const advancedCategories = [
  { id: 'webdevadvanced', label: 'Advanced Web Dev', icon: <Book size={16} /> },
  { id: 'pythonadvanced', label: 'Advanced Python', icon: <Brain size={16} /> },
  { id: 'machinelearning', label: 'Machine Learning', icon: <Cpu size={16} /> },
  { id: 'deeplearning', label: 'Deep Learning', icon: <Cpu size={16} /> },
  { id: 'fullstack', label: 'Full Stack Dev', icon: <Book size={16} /> },
  { id: 'advancedcyber', label: 'Advanced Security', icon: <Shield size={16} /> },
];

const QuizSelector: React.FC<QuizSelectorProps> = ({ onSelectQuiz }) => {
  const buttonVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-orbitron text-lg text-cyber-blue mb-2 flex items-center">
        <Sparkles size={16} className="mr-2 text-yellow-400" />
        Select a Quiz Topic
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence>
          {quizCategories.map((category, index) => {
            const quizExists = Object.values(quizzes).some(quiz => 
              quiz.topic.toLowerCase() === category.label.toLowerCase() || 
              quiz.topic.includes(category.label)
            );
            
            return (
              <motion.div
                key={category.id}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start border-cyber-blue/30 hover:bg-cyber-blue/20 hover:border-cyber-blue ${!quizExists ? 'opacity-50' : ''}`}
                  onClick={() => onSelectQuiz(category.id)}
                  disabled={!quizExists}
                >
                  <span className="mr-2 text-cyber-blue">{category.icon}</span>
                  <span className="text-sm truncate">{category.label}</span>
                  {quizExists && (
                    <motion.span
                      className="ml-auto"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Sparkles size={12} className="text-yellow-400" />
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <h3 className="font-orbitron text-lg text-cyber-pink mt-4 mb-2">Advanced Topics</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence>
          {advancedCategories.map((category, index) => {
            const quizExists = Object.values(quizzes).some(quiz => 
              quiz.topic.toLowerCase() === category.label.toLowerCase() || 
              quiz.topic.includes(category.label)
            );
            
            return (
              <motion.div
                key={category.id}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start border-cyber-pink/30 hover:bg-cyber-pink/20 hover:border-cyber-pink ${!quizExists ? 'opacity-50' : ''}`}
                  onClick={() => onSelectQuiz(category.id)}
                  disabled={!quizExists}
                >
                  <span className="mr-2 text-cyber-pink">{category.icon}</span>
                  <span className="text-sm truncate">{category.label}</span>
                  {quizExists && (
                    <motion.span
                      className="ml-auto"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Sparkles size={12} className="text-yellow-400" />
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizSelector;
