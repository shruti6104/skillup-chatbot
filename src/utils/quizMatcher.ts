
import quizzes from '@/data/quizData';

interface QuizMatch {
  quizId: string;
  confidence: number;
}

const topicKeywords: Record<string, string[]> = {
  python: ['python', 'py', 'django', 'flask', 'pandas', 'numpy'],
  pythonadvanced: ['advanced python', 'python advanced', 'python expert', 'decorators', 'metaclass', 'python internals'],
  webdev: ['web', 'html', 'css', 'javascript', 'js', 'frontend'],
  webdevadvanced: ['advanced web', 'react', 'vue', 'angular', 'spa', 'webpack', 'nodejs', 'express'],
  ai: ['ai', 'artificial intelligence', 'machine learning basics', 'ml intro'],
  machinelearning: ['machine learning', 'ml', 'supervised learning', 'unsupervised learning', 'regression', 'classification'],
  deeplearning: ['deep learning', 'neural networks', 'nn', 'cnn', 'rnn', 'transformer', 'gpu'],
  cybersecurity: ['cyber', 'security', 'infosec', 'hacking', 'firewall', 'protection'],
  advancedcyber: ['advanced security', 'penetration testing', 'pentest', 'cryptography', 'zero day', 'exploit'],
  datascience: ['data', 'analytics', 'visualization', 'big data', 'pandas', 'statistics'],
  softskills: ['soft skills', 'interpersonal', 'teamwork', 'leadership'],
  communication: ['communication', 'speaking', 'writing', 'listening', 'presentation'],
  fullstack: ['fullstack', 'full stack', 'full-stack', 'backend', 'frontend', 'database', 'api']
};

export function findBestQuizMatch(userPrompt: string): string | null {
  const lowercasePrompt = userPrompt.toLowerCase();
  
  // First try direct matching
  for (const [quizId, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => lowercasePrompt.includes(keyword))) {
      return quizId;
    }
  }
  
  // Handle some special cases
  if (lowercasePrompt.includes('web') && 
      (lowercasePrompt.includes('advanced') || 
       lowercasePrompt.includes('react') || 
       lowercasePrompt.includes('vue'))) {
    return 'webdevadvanced';
  }
  
  if (lowercasePrompt.includes('web')) {
    return 'webdev';
  }
  
  if (lowercasePrompt.includes('python') && 
      (lowercasePrompt.includes('advanced') || 
       lowercasePrompt.includes('expert'))) {
    return 'pythonadvanced';
  }
  
  if (lowercasePrompt.includes('security') && lowercasePrompt.includes('advanced')) {
    return 'advancedcyber';
  }
  
  // If no direct matches, check word similarity
  let bestMatch: QuizMatch | null = null;
  
  for (const quizId of Object.keys(quizzes)) {
    const topic = quizzes[quizId].topic.toLowerCase();
    
    if (lowercasePrompt.includes(topic)) {
      const confidence = topic.length / lowercasePrompt.length;
      
      if (!bestMatch || confidence > bestMatch.confidence) {
        bestMatch = {
          quizId,
          confidence
        };
      }
    }
  }
  
  return bestMatch?.quizId || null;
}
