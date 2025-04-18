import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import QuizModal from './QuizModal';
import QuizSelector from './QuizSelector';
import { quizzes } from '@/data/quizData';
import { findBestQuizMatch } from '@/utils/quizMatcher';
import { Brain, Award, Trophy, Star, BarChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { playSound } from '@/utils/audioUtils';
import { Badge } from '@/components/ui/badge';

interface ChatbotQuizProps {
  onQuizComplete: (passed: boolean, score: number, badgeId: string) => void;
}

export interface ChatbotQuizRef {
  startQuizFromPrompt: (prompt: string) => boolean;
}

const ChatbotQuiz = forwardRef<ChatbotQuizRef, ChatbotQuizProps>(({ onQuizComplete }, ref) => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [lastAttempt, setLastAttempt] = useState<string>('');
  const [quizConfirmation, setQuizConfirmation] = useState<{show: boolean, quizId: string | null}>({
    show: false,
    quizId: null
  });

  const handleQuizSelect = (quizId: string) => {
    if (quizzes[quizId]) {
      setQuizConfirmation({
        show: true,
        quizId: quizId
      });
    } else {
      console.error(`Quiz with ID ${quizId} not found`);
      toast({
        title: "Quiz Error",
        description: "This quiz is not available. Please try another topic.",
        variant: "destructive"
      });
    }
  };

  const confirmStartQuiz = () => {
    if (quizConfirmation.quizId && quizzes[quizConfirmation.quizId]) {
      setActiveQuiz(quizConfirmation.quizId);
      setQuizConfirmation({ show: false, quizId: null });
      
      toast({
        title: `${quizzes[quizConfirmation.quizId].difficulty} Quiz Started`,
        description: `Starting ${quizzes[quizConfirmation.quizId].topic} ${quizzes[quizConfirmation.quizId].difficulty.toLowerCase()} quiz. Good luck!`,
      });
      playSound('notification');
    }
  };

  const cancelQuiz = () => {
    setQuizConfirmation({ show: false, quizId: null });
  };

  const handleQuizClose = () => {
    setActiveQuiz(null);
  };

  const groupedQuizzes = React.useMemo(() => {
    const grouped: Record<string, { quizId: string; difficulty: string }[]> = {};
    
    Object.entries(quizzes).forEach(([quizId, quiz]) => {
      if (!grouped[quiz.topic]) {
        grouped[quiz.topic] = [];
      }
      grouped[quiz.topic].push({
        quizId,
        difficulty: quiz.difficulty
      });
    });
    
    Object.keys(grouped).forEach(topic => {
      grouped[topic].sort((a, b) => {
        const difficultyOrder = { 'Beginner': 1, 'Advanced': 2, 'Expert': 3 };
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
               difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      });
    });
    
    return grouped;
  }, []);

  useImperativeHandle(ref, () => ({
    startQuizFromPrompt: (prompt: string) => {
      console.log("Analyzing prompt for quiz match:", prompt);
      
      if (lastAttempt === prompt) {
        console.log("Skipping repeated quiz attempt");
        return false;
      }
      
      const quizId = findBestQuizMatch(prompt);
      
      if (quizId) {
        console.log(`Found matching quiz: ${quizId}`);
        setQuizConfirmation({
          show: true,
          quizId: quizId
        });
        setLastAttempt(prompt);
        return true;
      }
      console.log("No matching quiz found for prompt");
      return false;
    }
  }));

  const getDifficultyIcon = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': 
        return <Star size={12} className="text-green-400" />;
      case 'Advanced':
        return <BarChart size={12} className="text-yellow-400" />;
      case 'Expert':
        return <Trophy size={12} className="text-red-400" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': 
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'Advanced':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Expert':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      default:
        return 'bg-blue-500/20 text-blue-500';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-panel p-4 mt-4"
      >
        <div className="flex items-center mb-4">
          <Brain size={18} className="text-cyber-blue mr-2" />
          <h3 className="font-orbitron text-lg">Test Your Knowledge</h3>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <p className="text-sm text-muted-foreground mb-2">
            Select a quiz to test your skills or type "Start quiz on [topic]" in the chat to start a quiz.
            You can also specify difficulty level (beginner, advanced, or expert).
          </p>
          <div className="flex items-center space-x-1">
            <Award size={14} className="text-cyber-green" />
            <span className="text-xs text-cyber-green">Earn badges by completing quizzes!</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            <Badge className={getDifficultyColor('Beginner')}>
              <Star size={12} className="mr-1" />
              Beginner
            </Badge>
            <Badge className={getDifficultyColor('Advanced')}>
              <BarChart size={12} className="mr-1" />
              Advanced
            </Badge>
            <Badge className={getDifficultyColor('Expert')}>
              <Trophy size={12} className="mr-1" />
              Expert
            </Badge>
          </div>
        </motion.div>
        
        {Object.entries(groupedQuizzes).map(([topic, quizzes]) => (
          <div key={topic} className="mb-4">
            <h4 className="text-sm font-semibold text-cyber-light mb-2">{topic}</h4>
            <div className="flex flex-wrap gap-2">
              {quizzes.map(({quizId, difficulty}) => (
                <motion.button
                  key={quizId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuizSelect(quizId)}
                  className={`px-3 py-1 text-xs rounded-full flex items-center border ${getDifficultyColor(difficulty)}`}
                >
                  {getDifficultyIcon(difficulty)}
                  <span className="ml-1">{difficulty}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      
      {quizConfirmation.show && quizConfirmation.quizId && quizzes[quizConfirmation.quizId] && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cyber-panel p-6 w-full max-w-md"
          >
            <h2 className="font-orbitron text-xl text-cyber-blue mb-4 flex items-center">
              <Brain size={20} className="text-cyber-blue mr-2" />
              Ready to test your knowledge?
            </h2>
            <p className="mb-6">
              You are about to start a <span className="font-semibold">{quizzes[quizConfirmation.quizId].difficulty}</span> level quiz 
              on <span className="font-semibold">{quizzes[quizConfirmation.quizId].topic}</span>.
            </p>
            <div className="flex space-x-4">
              <button 
                className="cyber-button flex-1 bg-cyber-blue/20 hover:bg-cyber-blue/40 border-cyber-blue/50 text-cyber-blue"
                onClick={confirmStartQuiz}
              >
                Begin Quiz
              </button>
              <button 
                className="cyber-button flex-1 bg-cyber-pink/20 hover:bg-cyber-pink/40 border-cyber-pink/50 text-cyber-pink"
                onClick={cancelQuiz}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {activeQuiz && (
        <QuizModal
          isOpen={Boolean(activeQuiz)}
          onClose={handleQuizClose}
          quizData={activeQuiz && quizzes[activeQuiz] ? quizzes[activeQuiz].questions : []}
          badgeId={activeQuiz && quizzes[activeQuiz] ? quizzes[activeQuiz].badgeId : ''}
          onComplete={onQuizComplete}
        />
      )}
    </>
  );
});

ChatbotQuiz.displayName = 'ChatbotQuiz';

export default ChatbotQuiz;
