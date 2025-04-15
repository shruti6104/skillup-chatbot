
import quizzes from '@/data/quizData';

interface QuizMatch {
  quizId: string;
  confidence: number;
}

const topicKeywords: Record<string, string[]> = {
  python: ['python', 'py', 'django', 'flask', 'pandas', 'numpy', 'python coding', 'python programming'],
  pythonadvanced: ['advanced python', 'python advanced', 'python expert', 'decorators', 'metaclass', 'python internals'],
  webdev: ['web', 'html', 'css', 'javascript', 'js', 'frontend', 'web development', 'web dev'],
  webdevadvanced: ['advanced web', 'react', 'vue', 'angular', 'spa', 'webpack', 'nodejs', 'express'],
  ai: ['ai', 'artificial intelligence', 'machine learning basics', 'ml intro', 'ai & ml', 'ai and ml'],
  machinelearning: ['machine learning', 'ml', 'supervised learning', 'unsupervised learning', 'regression', 'classification'],
  deeplearning: ['deep learning', 'neural networks', 'nn', 'cnn', 'rnn', 'transformer', 'gpu'],
  cybersecurity: ['cyber', 'security', 'infosec', 'hacking', 'firewall', 'protection', 'cyber security', 'cybersecurity'],
  advancedcyber: ['advanced security', 'penetration testing', 'pentest', 'cryptography', 'zero day', 'exploit'],
  datascience: ['data', 'analytics', 'visualization', 'big data', 'pandas', 'statistics', 'data science'],
  softskills: ['soft skills', 'interpersonal', 'teamwork', 'leadership', 'soft-skills'],
  communication: ['communication', 'speaking', 'writing', 'listening', 'presentation'],
  fullstack: ['fullstack', 'full stack', 'full-stack', 'backend', 'frontend', 'database', 'api']
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
  
  // First try direct matching
  for (const [quizId, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => lowercasePrompt.includes(keyword))) {
      console.log(`Direct keyword match found: ${quizId}`);
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

  if (lowercasePrompt.includes('data science') || 
      lowercasePrompt.includes('data analysis')) {
    return 'datascience';
  }
  
  if (lowercasePrompt.includes('artificial intelligence') || 
      lowercasePrompt.includes('ai')) {
    return 'ai';
  }

  if (lowercasePrompt.includes('machine learning') || 
      lowercasePrompt.includes('ml')) {
    return 'machinelearning';
  }

  if (lowercasePrompt.includes('communication')) {
    return 'communication';
  }

  if (lowercasePrompt.includes('soft skills')) {
    return 'softskills';
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
  
  console.log(bestMatch ? `Best match found: ${bestMatch.quizId} (${bestMatch.confidence})` : "No match found");
  return bestMatch?.quizId || null;
}
