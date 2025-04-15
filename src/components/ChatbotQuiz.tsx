
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import QuizModal from './QuizModal';
import QuizSelector from './QuizSelector';
import quizzes from '@/data/quizData';
import { findBestQuizMatch } from '@/utils/quizMatcher';
import { Brain } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { playSound } from '@/utils/audioUtils';

interface ChatbotQuizProps {
  onQuizComplete: (passed: boolean, score: number, badgeId: string) => void;
}

export interface ChatbotQuizRef {
  startQuizFromPrompt: (prompt: string) => boolean;
}

const ChatbotQuiz = forwardRef<ChatbotQuizRef, ChatbotQuizProps>(({ onQuizComplete }, ref) => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const handleQuizSelect = (quizId: string) => {
    if (quizzes[quizId]) {
      setActiveQuiz(quizId);
      toast({
        title: "Quiz Started",
        description: `Starting ${quizzes[quizId].topic} quiz. Good luck!`,
      });
      playSound('notification');
    } else {
      console.error(`Quiz with ID ${quizId} not found`);
      toast({
        title: "Quiz Error",
        description: "This quiz is not available. Please try another topic.",
        variant: "destructive"
      });
    }
  };

  const handleQuizClose = () => {
    setActiveQuiz(null);
  };

  // Expose the startQuizFromPrompt function via ref
  useImperativeHandle(ref, () => ({
    startQuizFromPrompt: (prompt: string) => {
      console.log("Analyzing prompt for quiz match:", prompt);
      const quizId = findBestQuizMatch(prompt);
      
      if (quizId) {
        console.log(`Found matching quiz: ${quizId}`);
        handleQuizSelect(quizId);
        return true;
      }
      console.log("No matching quiz found for prompt");
      return false;
    }
  }));

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
        
        <QuizSelector onSelectQuiz={handleQuizSelect} />
      </motion.div>
      
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
