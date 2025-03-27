
import React, { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string | number;
  type: 'multiple-choice' | 'fill-in-blank';
}

interface QuizModalProps {
  topic: string;
  questions: Question[];
  onClose: () => void;
  onComplete: (passed: boolean, score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ topic, questions, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>(new Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
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
  
  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
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
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    
    // Pass score back to parent component
    onComplete(finalScore >= 70, finalScore);
  };
  
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    
    return (
      <div className="mb-6">
        <h3 className="font-orbitron text-lg mb-4 text-cyber-blue">{question.question}</h3>
        
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div 
                key={index}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  answers[currentQuestionIndex] === option 
                    ? 'bg-cyber-blue/20 border border-cyber-blue' 
                    : 'bg-cyber-darker hover:bg-cyber-dark'
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        
        {question.type === 'fill-in-blank' && (
          <input
            type="text"
            placeholder="Type your answer..."
            className="cyber-input w-full"
            value={answers[currentQuestionIndex] as string}
            onChange={handleInputChange}
          />
        )}
      </div>
    );
  };
  
  const renderResult = () => {
    const passed = score >= 70;
    
    return (
      <div className="text-center">
        <div className={`text-6xl mb-4 flex justify-center ${passed ? 'text-cyber-green' : 'text-cyber-pink'}`}>
          {passed ? <CheckCircle size={80} /> : <XCircle size={80} />}
        </div>
        
        <h3 className="font-orbitron text-2xl mb-2">
          {passed ? 'Well Done!' : 'Keep Learning!'}
        </h3>
        
        <p className="text-lg mb-4">
          Your score: <span className={passed ? 'text-cyber-green' : 'text-cyber-pink'}>{score}%</span>
        </p>
        
        <p className="mb-6">
          {passed 
            ? `You've successfully completed the ${topic} quiz!` 
            : `Review the concepts and try again. You need at least 70% to pass.`}
        </p>
        
        <button
          className="cyber-button w-full neon-glow"
          onClick={onClose}
        >
          {passed ? 'Continue Learning' : 'Try Again'}
        </button>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-panel p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-orbitron text-xl text-cyber-blue">
            {submitted ? 'Quiz Results' : `${topic} Quiz`}
          </h2>
          <button 
            className="p-1 rounded-full hover:bg-cyber-darker"
            onClick={onClose}
          >
            <X size={24} className="text-cyber-pink" />
          </button>
        </div>
        
        {!submitted ? (
          <>
            <div className="mb-4">
              <div className="w-full bg-cyber-darker h-2 rounded-full">
                <div 
                  className="bg-cyber-blue h-2 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm mt-1 text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            
            {renderQuestion()}
            
            <button
              className="cyber-button w-full neon-glow"
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === ''}
            >
              {isLastQuestion ? 'Submit' : 'Next Question'}
            </button>
          </>
        ) : (
          renderResult()
        )}
      </div>
    </div>
  );
};

export default QuizModal;
