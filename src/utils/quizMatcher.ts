import { quizzes } from '@/data/quizData';

interface QuizMatch {
  quizId: string;
  confidence: number;
}

const topicKeywords: Record<string, string[]> = {
  python: ['python', 'py', 'django', 'flask', 'pandas', 'numpy', 'python coding', 'python programming'],
  pythonadvanced: ['advanced python', 'python advanced', 'python expert', 'decorators', 'metaclass', 'python internals'],
  pythonexpert: ['expert python', 'python expert level', 'python mastery', 'python guru', 'advanced python concepts'],
  webdev: ['web', 'html', 'css', 'javascript', 'js', 'frontend', 'web development', 'web dev'],
  webdevadvanced: ['advanced web', 'react', 'vue', 'angular', 'spa', 'webpack', 'nodejs', 'express'],
  webdevexpert: ['expert web', 'web architecture', 'full-stack mastery', 'web optimization', 'advanced javascript patterns'],
  ai: ['ai', 'artificial intelligence', 'machine learning basics', 'ml intro', 'ai & ml', 'ai and ml'],
  aiadvanced: ['advanced ai', 'deep neural networks', 'natural language processing', 'nlp', 'computer vision', 'advanced machine learning'],
  aiexpert: ['expert ai', 'ai research', 'transformers', 'attention mechanisms', 'reinforcement learning', 'generative ai'],
  cybersecurity: ['cyber', 'security', 'infosec', 'hacking', 'firewall', 'protection', 'cyber security', 'cybersecurity'],
  advancedcyber: ['advanced security', 'penetration testing', 'pentest', 'cryptography', 'zero day', 'exploit'],
  cyberexpert: ['expert security', 'security architecture', 'threat intelligence', 'security frameworks', 'advanced penetration testing'],
  datascience: ['data', 'analytics', 'visualization', 'big data', 'pandas', 'statistics', 'data science'],
  datascienceadvanced: ['advanced data science', 'data engineering', 'feature engineering', 'business intelligence', 'predictive analytics'],
  datascienceexpert: ['expert data science', 'causal inference', 'time series forecasting', 'bayesian statistics', 'experimental design'],
  softskills: ['soft skills', 'interpersonal', 'teamwork', 'leadership', 'soft-skills'],
  softskillsadvanced: ['advanced soft skills', 'leadership development', 'conflict resolution', 'negotiation skills', 'team management'],
  softskillsexpert: ['expert soft skills', 'executive leadership', 'organizational psychology', 'strategic leadership', 'coaching'],
  communication: ['communication', 'speaking', 'writing', 'listening', 'presentation'],
  communicationadvanced: ['advanced communication', 'public speaking', 'persuasion', 'strategic communication', 'corporate communication'],
  communicationexpert: ['expert communication', 'rhetorical analysis', 'communication theory', 'speech writing', 'influencer communication'],
  fullstack: ['fullstack', 'full stack', 'full-stack', 'backend', 'frontend', 'database', 'api'],
  machinelearning: ['machine learning', 'ml', 'supervised learning', 'unsupervised learning', 'regression', 'classification'],
  machinelearningadvanced: ['advanced ml', 'gradient boosting', 'feature engineering', 'ensemble methods', 'model optimization'],
  machinelearningexpert: ['expert ml', 'ml research', 'hyperparameter optimization', 'neural architecture search', 'federated learning'],
  deeplearning: ['deep learning', 'neural networks', 'nn', 'cnn', 'rnn', 'transformer', 'gpu'],
  deeplearningexpert: ['expert deep learning', 'transformers', 'attention mechanisms', 'gans', 'advanced neural architectures']
};

const quizIndicators = [
  'quiz', 'test', 'assessment', 'evaluate', 'check', 'knowledge', 'challenge', 
  'question', 'exam', 'show me a quiz', 'give me a quiz', 'quiz me', 'test me'
];

const difficultyKeywords = {
  beginner: ['beginner', 'basic', 'starter', 'introduction', 'fundamentals', 'easy'],
  advanced: ['advanced', 'intermediate', 'harder', 'challenging', 'difficult'],
  expert: ['expert', 'master', 'hardest', 'very hard', 'difficult', 'professional', 'advanced level']
};

/**
 * Finds the best matching quiz based on a user prompt
 * @param userPrompt - The user's text input
 * @returns The quiz ID of the best match, or null if no good match found
 */
export function findBestQuizMatch(userPrompt: string): string | null {
  if (!userPrompt) return null;
  
  console.log(`Finding quiz match for prompt: "${userPrompt}"`);
  const lowercasePrompt = userPrompt.toLowerCase().trim();
  
  const containsQuizRequest = quizIndicators.some(indicator => 
    lowercasePrompt.includes(indicator)
  );
  
  let requestedDifficulty = '';
  
  if (difficultyKeywords.expert.some(keyword => lowercasePrompt.includes(keyword))) {
    requestedDifficulty = 'expert';
  } else if (difficultyKeywords.advanced.some(keyword => lowercasePrompt.includes(keyword))) {
    requestedDifficulty = 'advanced';
  } else if (difficultyKeywords.beginner.some(keyword => lowercasePrompt.includes(keyword))) {
    requestedDifficulty = 'beginner';
  }

  if (containsQuizRequest) {
    for (const [quizId, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowercasePrompt.includes(keyword))) {
        if (requestedDifficulty) {
          const quiz = quizzes[quizId];
          if (quiz) {
            const quizDifficulty = quiz.difficulty.toLowerCase();
            if (quizDifficulty === requestedDifficulty) {
              console.log(`Direct keyword match found with difficulty: ${quizId} (${requestedDifficulty})`);
              return quizId;
            }
            continue;
          }
        } else {
          console.log(`Direct keyword match found: ${quizId}`);
          return quizId;
        }
      }
    }
    
    for (const [quizId, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowercasePrompt.includes(keyword))) {
        console.log(`Topic match found without perfect difficulty match: ${quizId}`);
        return quizId;
      }
    }
  }
  
  for (const [quizId, keywords] of Object.entries(topicKeywords)) {
    const primaryKeywords = keywords.slice(0, 3);
    for (const keyword of primaryKeywords) {
      const wordPattern = new RegExp(`\\b${keyword}\\b`, 'i');
      if (wordPattern.test(lowercasePrompt)) {
        if (containsQuizRequest) {
          console.log(`Strong contextual match found: ${quizId}`);
          return quizId;
        }
        if (lowercasePrompt.includes('learn') || 
            lowercasePrompt.includes('show') || 
            lowercasePrompt.includes('tell me about') ||
            lowercasePrompt.includes('what is')) {
          console.log(`Topic learning request matched: ${quizId}`);
          return quizId;
        }
      }
    }
  }
  
  if (lowercasePrompt.includes('quiz') || lowercasePrompt.includes('test')) {
    if (lowercasePrompt.includes('web')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'webdevexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate') ||
          lowercasePrompt.includes('react') || lowercasePrompt.includes('vue')) {
        return 'webdevadvanced';
      }
      return 'webdev';
    }
    
    if (lowercasePrompt.includes('python')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'pythonexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'pythonadvanced';
      }
      return 'python';
    }
    
    if (lowercasePrompt.includes('security') || lowercasePrompt.includes('cyber')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'cyberexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'advancedcyber';
      }
      return 'cybersecurity';
    }
    
    if (lowercasePrompt.includes('artificial intelligence') || lowercasePrompt.includes('ai')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'aiexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'aiadvanced';
      }
      return 'ai';
    }
    
    if (lowercasePrompt.includes('machine learning') || lowercasePrompt.includes('ml')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'machinelearningexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'machinelearningadvanced';
      }
      return 'machinelearning';
    }
    
    if (lowercasePrompt.includes('data science') || lowercasePrompt.includes('data analysis')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'datascienceexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'datascienceadvanced';
      }
      return 'datascience';
    }
    
    if (lowercasePrompt.includes('soft skills')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'softskillsexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'softskillsadvanced';
      }
      return 'softskills';
    }
    
    if (lowercasePrompt.includes('communication')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'communicationexpert';
      }
      if (lowercasePrompt.includes('advanced') || lowercasePrompt.includes('intermediate')) {
        return 'communicationadvanced';
      }
      return 'communication';
    }
    
    if (lowercasePrompt.includes('deep learning')) {
      if (lowercasePrompt.includes('expert') || lowercasePrompt.includes('master') || 
          lowercasePrompt.includes('hard') || lowercasePrompt.includes('difficult')) {
        return 'deeplearningexpert';
      }
      return 'deeplearning';
    }
  }
  
  let bestMatch: QuizMatch | null = null;
  
  for (const quizId of Object.keys(quizzes)) {
    const quiz = quizzes[quizId];
    const topic = quiz.topic.toLowerCase();
    
    if (lowercasePrompt.includes(topic)) {
      if (requestedDifficulty && quiz.difficulty.toLowerCase() !== requestedDifficulty) {
        continue;
      }
      
      const confidence = topic.length / lowercasePrompt.length;
      
      if (!bestMatch || confidence > bestMatch.confidence) {
        bestMatch = {
          quizId,
          confidence
        };
      }
    }
  }
  
  console.log(bestMatch ? `Best match found: ${bestMatch.quizId} (${bestMatch.confidence})` : "No match found");
  return bestMatch?.quizId || null;
}
