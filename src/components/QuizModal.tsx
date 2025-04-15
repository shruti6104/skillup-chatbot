import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Timer, Medal, Brain, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string | number;
  type: 'multiple-choice' | 'fill-in-blank';
}

interface QuizModalProps {
  isOpen: boolean;
  quizData: Question[];
  onClose: () => void;
  onComplete: (passed: boolean, score: number) => void;
  badgeId: string;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, quizData, onClose, onComplete, badgeId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>(new Array(quizData.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  
  // Timer effect
  useEffect(() => {
    if (submitted) return;
    
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Time's up - move to next question or submit
        handleNext();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining, submitted]);
  
  // Reset timer when moving to next question
  useEffect(() => {
    setTimeRemaining(30);
    setShowFeedback(false);
  }, [currentQuestionIndex]);
  
  // Trigger confetti when quiz is passed
  useEffect(() => {
    if (submitted && score >= 70) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const colors = ['#00a8ff', '#9c5fff', '#ff5f97'];

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const runAnimation = () => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) return;

        const particleCount = 50;
        
        confetti({
          particleCount,
          angle: randomInRange(60, 120),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.4) },
          colors: colors,
          disableForReducedMotion: true
        });
        
        requestAnimationFrame(runAnimation);
      };
      
      runAnimation();
    }
  }, [submitted, score]);
  
  const handleOptionSelect = (option: string | number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };
  
  const checkAnswer = () => {
    const userAnswer = String(answers[currentQuestionIndex]).toLowerCase();
    const correctAnswer = String(currentQuestion.answer).toLowerCase();
    let correct = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      correct = userAnswer === correctAnswer;
    } else {
      correct = userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer);
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Play sound based on result
    const audio = new Audio();
    audio.src = correct ? 
      'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyI=' :
      'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAAB/AJKAgAAAGBUOIABB555tIQhCBCEIReUfBC/0If//B/5QEAQBAEH//r//wwuD//5cMf/y4P/y5//Lg//Lg///5QEAQf/8oCDnKAg//Lg//BAHyh//Lg/BAH/Lg//L/8uD/8v/y//Lg//L/8v/y//Lgg==';
    audio.volume = 0.2;
    audio.play();
    
    // Wait 1.5 seconds before moving on
    setTimeout(() => {
      if (isLastQuestion) {
        calculateScore();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1500);
  };
  
  const handleNext = () => {
    if (showFeedback) return; // Prevent clicking during feedback
    
    const userAnswer = answers[currentQuestionIndex];
    if (userAnswer === '') {
      // Skip and provide empty answer
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = '';
      setAnswers(newAnswers);
    }
    
    checkAnswer();
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.forEach((question, index) => {
      // For multiple choice, check exact match
      // For fill-in-blank, check for case-insensitive includes
      const userAnswer = String(answers[index]).toLowerCase();
      const correctAnswer = String(question.answer).toLowerCase();
      
      if (question.type === 'multiple-choice') {
        if (userAnswer === correctAnswer) {
          correctAnswers++;
        }
      } else {
        // Fill in the blank allows partial matches
        if (userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)) {
          correctAnswers++;
        }
      }
    });
    
    const finalScore = Math.round((correctAnswers / quizData.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    
    // Pass score back to parent component
    onComplete(finalScore >= 70, finalScore);
  };
  
  const renderQuestion = () => {
    const question = quizData[currentQuestionIndex];
    
    return (
      <div className="mb-6">
        <h3 className="font-orbitron text-lg mb-4 text-cyber-blue flex items-center">
          <Brain size={18} className="text-cyber-blue mr-2" />
          {question.question}
        </h3>
        
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  answers[currentQuestionIndex] === option 
                    ? 'bg-cyber-blue/20 border border-cyber-blue' 
                    : 'bg-cyber-darker hover:bg-cyber-dark'
                } ${
                  showFeedback && option === question.answer
                    ? 'border-2 border-cyber-green'
                    : showFeedback && answers[currentQuestionIndex] === option && option !== question.answer
                    ? 'border-2 border-cyber-pink'
                    : ''
                }`}
                onClick={() => !showFeedback && handleOptionSelect(option)}
              >
                {option}
                {showFeedback && option === question.answer && (
                  <CheckCircle size={16} className="inline ml-2 text-cyber-green" />
                )}
                {showFeedback && answers[currentQuestionIndex] === option && option !== question.answer && (
                  <XCircle size={16} className="inline ml-2 text-cyber-pink" />
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {question.type === 'fill-in-blank' && (
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Type your answer..."
            className="cyber-input w-full"
            value={answers[currentQuestionIndex] as string}
            onChange={handleInputChange}
            disabled={showFeedback}
          />
        )}
        
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-md ${
              isCorrect ? "bg-cyber-green/20 border border-cyber-green" : "bg-cyber-pink/20 border border-cyber-pink"
            }`}
          >
            <div className="flex items-center">
              {isCorrect ? (
                <CheckCircle size={18} className="text-cyber-green mr-2" />
              ) : (
                <XCircle size={18} className="text-cyber-pink mr-2" />
              )}
              <span className="font-medium">
                {isCorrect ? "Correct!" : "Not quite!"}
              </span>
            </div>
            {!isCorrect && (
              <div className="mt-1 text-sm">
                The correct answer is: <span className="text-cyber-green font-medium">{question.answer}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  };
  
  const renderResult = () => {
    const passed = score >= 70;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: passed ? 360 : 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`text-6xl mb-4 flex justify-center ${passed ? 'text-cyber-green' : 'text-cyber-pink'}`}
        >
          {passed ? <CheckCircle size={80} /> : <XCircle size={80} />}
        </motion.div>
        
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-orbitron text-2xl mb-2"
        >
          {passed ? 'Well Done!' : 'Keep Learning!'}
        </motion.h3>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg mb-4">
            Your score: <span className={passed ? 'text-cyber-green' : 'text-cyber-pink'}>{score}%</span>
          </p>
          
          {passed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <div className="bg-cyber-blue/20 border border-cyber-blue rounded-full p-3">
                <Medal size={40} className="text-cyber-blue" />
              </div>
            </motion.div>
          )}
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-6"
          >
            {passed 
              ? `You've successfully completed the quiz!` 
              : `Review the concepts and try again. You need at least 70% to pass.`}
          </motion.p>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cyber-button w-full neon-glow"
          onClick={onClose}
        >
          {passed ? 'Continue Learning' : 'Try Again'}
        </motion.button>
      </motion.div>
    );
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="cyber-panel p-6 w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-orbitron text-xl text-cyber-blue flex items-center">
                <Zap size={20} className="text-cyber-blue mr-2" />
                {submitted ? 'Quiz Results' : 'Quiz'}
              </h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-full hover:bg-cyber-darker"
                onClick={onClose}
              >
                <X size={24} className="text-cyber-pink" />
              </motion.button>
            </div>
            
            {!submitted ? (
              <>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="w-full bg-cyber-darker h-2 rounded-full flex-1 mr-2">
                      <motion.div 
                        className="bg-cyber-blue h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                      ></motion.div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                      {currentQuestionIndex + 1} / {quizData.length}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end text-xs mb-3">
                    <Timer size={14} className={`mr-1 ${timeRemaining < 10 ? "text-cyber-pink animate-pulse" : "text-cyber-blue"}`} />
                    <span className={timeRemaining < 10 ? "text-cyber-pink font-bold" : ""}>
                      {timeRemaining}s
                    </span>
                  </div>
                </div>
                
                {renderQuestion()}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cyber-button w-full neon-glow ${showFeedback ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleNext}
                  disabled={answers[currentQuestionIndex] === '' || showFeedback}
                >
                  {showFeedback ? 'Processing...' : isLastQuestion ? 'Submit' : 'Next Question'}
                </motion.button>
              </>
            ) : (
              renderResult()
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
