
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'quiz' | 'code' | 'concept';
  xpReward: number;
  questions?: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  concept?: {
    question: string;
    answer: string;
  };
}

interface InteractiveChallengeProps {
  skillProgress: {[key: string]: number};
  onChallengeComplete: (xp: number) => void;
}

const DAILY_CHALLENGES: Challenge[] = [
  {
    id: 'python-quiz-1',
    title: 'Python Fundamentals',
    description: 'Test your knowledge of Python basics',
    difficulty: 'beginner',
    type: 'quiz',
    xpReward: 50,
    questions: [
      {
        id: 'py-q1',
        question: 'What is the correct way to create a function in Python?',
        options: [
          'function myFunc():',
          'def myFunc():',
          'create myFunc():',
          'func myFunc():'
        ],
        correctIndex: 1
      },
      {
        id: 'py-q2',
        question: 'Which of these is NOT a Python data type?',
        options: [
          'List',
          'Dictionary',
          'Array',
          'Tuple'
        ],
        correctIndex: 2
      },
      {
        id: 'py-q3',
        question: 'What does the following code print? print(3 * "abc")',
        options: [
          '3abc',
          'abcabcabc',
          'abc3',
          'Error'
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'web-quiz-1',
    title: 'Web Development',
    description: 'Test your knowledge of web development',
    difficulty: 'intermediate',
    type: 'quiz',
    xpReward: 75,
    questions: [
      {
        id: 'web-q1',
        question: 'Which CSS property is used to change the text color?',
        options: [
          'text-color',
          'font-color',
          'color',
          'text-style'
        ],
        correctIndex: 2
      },
      {
        id: 'web-q2',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correctIndex: 0
      },
      {
        id: 'web-q3',
        question: 'Which of these is NOT a JavaScript framework/library?',
        options: [
          'React',
          'Angular',
          'Django',
          'Vue'
        ],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'ai-concept-1',
    title: 'AI Concepts',
    description: 'Test your understanding of AI fundamentals',
    difficulty: 'advanced',
    type: 'concept',
    xpReward: 100,
    concept: {
      question: 'Explain the difference between supervised and unsupervised learning in machine learning, with examples of each.',
      answer: 'Supervised learning uses labeled data where the algorithm learns to map inputs to outputs (e.g., image classification, spam detection). Unsupervised learning uses unlabeled data to find patterns (e.g., clustering customers, anomaly detection). Examples: Supervised - predicting house prices from features. Unsupervised - customer segmentation based on purchasing behavior.'
    }
  }
];

const InteractiveChallenge: React.FC<InteractiveChallengeProps> = ({ 
  skillProgress,
  onChallengeComplete
}) => {
  const [availableChallenges, setAvailableChallenges] = useState<Challenge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [conceptAnswer, setConceptAnswer] = useState('');
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch challenges based on user's skill level
    // Here we're simulating by filtering based on skill progress
    const getChallengesBySkillLevel = () => {
      // Find most progressed skill
      const topSkill = Object.entries(skillProgress)
        .sort(([, a], [, b]) => b - a)[0];
      
      if (!topSkill) return DAILY_CHALLENGES.slice(0, 1);
      
      const [skillName, skillValue] = topSkill;
      
      let filteredChallenges = [];
      
      if (skillValue < 30) {
        // Beginner challenges only
        filteredChallenges = DAILY_CHALLENGES.filter(c => c.difficulty === 'beginner');
      } else if (skillValue < 70) {
        // Beginner and intermediate challenges
        filteredChallenges = DAILY_CHALLENGES.filter(c => 
          c.difficulty === 'beginner' || c.difficulty === 'intermediate'
        );
      } else {
        // All challenges
        filteredChallenges = DAILY_CHALLENGES;
      }
      
      // Only return 2 challenges to not overwhelm the user
      return filteredChallenges.slice(0, 2);
    };
    
    setAvailableChallenges(getChallengesBySkillLevel());
  }, [skillProgress]);
  
  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSubmitted(false);
    setChallengeComplete(false);
    setShowResults(false);
    setConceptAnswer('');
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (submitted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleConceptInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConceptAnswer(e.target.value);
  };

  const handleNext = () => {
    if (!currentChallenge) return;
    
    if (currentChallenge.type === 'quiz' && currentChallenge.questions) {
      if (currentQuestionIndex < currentChallenge.questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!currentChallenge) return;
    
    if (currentChallenge.type === 'quiz' && currentChallenge.questions) {
      if (selectedAnswers.length < currentChallenge.questions.length) {
        toast({
          title: "Answer all questions",
          description: "Please answer all questions before submitting",
          variant: "destructive"
        });
        return;
      }
      
      setSubmitted(true);
      setShowResults(true);
      
      // Calculate score
      let correctAnswers = 0;
      currentChallenge.questions.forEach((q, i) => {
        if (selectedAnswers[i] === q.correctIndex) {
          correctAnswers++;
        }
      });
      
      const percentageScore = Math.round((correctAnswers / currentChallenge.questions.length) * 100);
      
      if (percentageScore >= 70) {
        toast({
          title: "Challenge completed!",
          description: `You scored ${percentageScore}% and earned ${currentChallenge.xpReward} XP!`,
        });
        onChallengeComplete(currentChallenge.xpReward);
        setChallengeComplete(true);
        
        // Play success sound
        const audio = new Audio();
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
        audio.volume = 0.2;
        audio.play();
      } else {
        toast({
          title: "Try again",
          description: `You scored ${percentageScore}%. Need 70% to pass.`,
          variant: "destructive"
        });
      }
    } else if (currentChallenge.type === 'concept' && currentChallenge.concept) {
      if (conceptAnswer.length < 50) {
        toast({
          title: "Answer too short",
          description: "Please provide a more detailed explanation (at least 50 characters)",
          variant: "destructive"
        });
        return;
      }
      
      setSubmitted(true);
      setShowResults(true);
      
      // In a real app, this would use an AI to evaluate the answer
      // Here we're just checking if it contains certain keywords
      const keywords = ['supervised', 'unsupervised', 'labeled', 'unlabeled', 'example'];
      const keywordsFound = keywords.filter(keyword => 
        conceptAnswer.toLowerCase().includes(keyword)
      );
      
      if (keywordsFound.length >= 3) {
        toast({
          title: "Concept mastered!",
          description: `Great explanation! You earned ${currentChallenge.xpReward} XP!`,
        });
        onChallengeComplete(currentChallenge.xpReward);
        setChallengeComplete(true);
      } else {
        toast({
          title: "Keep learning",
          description: "Your explanation is missing some key concepts. Try again!",
          variant: "destructive"
        });
      }
    }
  };

  const resetChallenge = () => {
    setCurrentChallenge(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  const renderQuizQuestion = () => {
    if (!currentChallenge?.questions) return null;
    
    const question = currentChallenge.questions[currentQuestionIndex];
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Question {currentQuestionIndex + 1} of {currentChallenge.questions.length}</h4>
        <p className="text-sm">{question.question}</p>
        
        <div className="space-y-2 mt-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === index;
            const isCorrect = submitted && index === question.correctIndex;
            const isWrong = submitted && isSelected && index !== question.correctIndex;
            
            return (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                  isSelected
                    ? isCorrect 
                      ? 'border-green-500 bg-green-500/20' 
                      : isWrong 
                        ? 'border-red-500 bg-red-500/20'
                        : 'border-cyber-blue bg-cyber-blue/20'
                    : 'border-white/10 hover:border-white/30 bg-cyber-darker'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{option}</span>
                  {submitted && (
                    <span>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {isWrong && <XCircle className="w-4 h-4 text-red-500" />}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-3 py-1 h-8 bg-cyber-darker"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          
          {currentQuestionIndex < currentChallenge.questions.length - 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-3 py-1 h-8 bg-cyber-darker"
            >
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleSubmit}
              disabled={submitted || selectedAnswers.some(a => a === undefined)}
              className="px-3 py-1 h-8 bg-cyber-blue hover:bg-cyber-blue/80"
            >
              Submit Answers
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderConceptChallenge = () => {
    if (!currentChallenge?.concept) return null;
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Concept Challenge</h4>
        <p className="text-sm">{currentChallenge.concept.question}</p>
        
        <div className="mt-3">
          <textarea
            value={conceptAnswer}
            onChange={handleConceptInputChange}
            className="w-full h-32 p-3 rounded-lg bg-cyber-darker border border-white/10 focus:border-cyber-blue outline-none text-sm"
            placeholder="Type your explanation here..."
            disabled={submitted}
          />
        </div>
        
        {submitted && (
          <div className="bg-cyber-blue/10 p-3 rounded-lg border border-cyber-blue/30">
            <h5 className="text-xs font-semibold mb-1">Example answer:</h5>
            <p className="text-xs">{currentChallenge.concept.answer}</p>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            size="sm"
            onClick={handleSubmit}
            disabled={submitted || conceptAnswer.length < 10}
            className="px-3 py-1 h-8 bg-cyber-blue hover:bg-cyber-blue/80"
          >
            Submit Answer
          </Button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!currentChallenge) return null;
    
    return (
      <div className="space-y-4 py-2">
        <div className="text-center">
          {challengeComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="mb-3 bg-green-500/20 p-3 rounded-full">
                <Award className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-green-400">Challenge Completed!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You earned {currentChallenge.xpReward} XP
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="mb-3 bg-red-500/20 p-3 rounded-full">
                <HelpCircle className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-orange-400">Not quite there yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Continue learning and try again
              </p>
            </motion.div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={resetChallenge}
            className="px-4 py-1 h-8 bg-cyber-darker"
          >
            Return to Challenges
          </Button>
        </div>
      </div>
    );
  };

  const renderChallengeList = () => {
    return (
      <>
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="text-cyber-green w-4 h-4" />
          <h3 className="font-orbitron text-sm text-cyber-green">Daily Challenges</h3>
        </div>
        
        {availableChallenges.length > 0 ? (
          <div className="space-y-3">
            {availableChallenges.map(challenge => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="cursor-pointer"
                onClick={() => startChallenge(challenge)}
              >
                <Card className="p-3 bg-cyber-darker hover:bg-cyber-darker/80 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        {challenge.title}
                        <span className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                          ({challenge.difficulty})
                        </span>
                      </h4>
                      <p className="text-xs text-muted-foreground">{challenge.description}</p>
                    </div>
                    <div className="flex items-center text-xs text-yellow-500">
                      <Trophy className="w-3 h-3 mr-1" />
                      <span>{challenge.xpReward} XP</span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 bg-cyber-green/20 hover:bg-cyber-green/30">
                      Start Challenge <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">No challenges available right now</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="cyber-panel p-4">
      {!currentChallenge && renderChallengeList()}
      
      {currentChallenge && !showResults && (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-orbitron text-sm text-cyber-green">{currentChallenge.title}</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetChallenge}
                className="h-6 text-xs"
              >
                Back
              </Button>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-xs ${getDifficultyColor(currentChallenge.difficulty)}`}>
                {currentChallenge.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{currentChallenge.type}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-yellow-500 flex items-center">
                <Trophy className="w-3 h-3 mr-1" />{currentChallenge.xpReward} XP
              </span>
            </div>
          </div>
          
          {currentChallenge.type === 'quiz' && renderQuizQuestion()}
          {currentChallenge.type === 'concept' && renderConceptChallenge()}
        </>
      )}
      
      {currentChallenge && showResults && renderResults()}
    </div>
  );
};

export default InteractiveChallenge;
