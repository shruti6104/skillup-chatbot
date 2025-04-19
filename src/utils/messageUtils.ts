import { Message } from '@/types/chat';

// Initial skill levels
let skillLevels: { [key: string]: number } = {
  'python': 1,
  'javascript': 1,
  'web development': 1,
  'ai': 1,
  'cybersecurity': 1,
  'soft skills': 1,
  'machine learning': 1,
  'react': 1,
  'database': 1,
  'data science': 1
};

// Topic-specific responses
const topicResponses: { [key: string]: string } = {
  'python': "Python is a versatile language great for beginners. It's used in web development, data science, and more.",
  'javascript': "JavaScript is essential for web development. It makes websites interactive and is used in front-end and back-end development.",
  'web development': "Web development involves building websites and web applications. It includes front-end (what you see) and back-end (how it works).",
  'ai': "Artificial Intelligence (AI) is about creating machines that can perform tasks that typically require human intelligence.",
  'cybersecurity': "Cybersecurity is crucial for protecting computer systems and networks from theft, damage, or unauthorized access.",
  'soft skills': "Soft skills are essential for career success. They include communication, teamwork, problem-solving, and leadership.",
  'machine learning': "Machine learning is a subset of AI that focuses on algorithms that allow computers to learn from data without being explicitly programmed.",
  'react': "React is a JavaScript library for building user interfaces. It's efficient and used for single-page applications.",
  'database': "Databases are structured collections of data. They are essential for storing and managing information in applications.",
  'data science': "Data science involves analyzing and interpreting complex data to make informed decisions. It combines statistics, computer science, and domain expertise."
};

// Update skill level based on topic
export const updateSkillLevel = (topic: string) => {
  if (skillLevels[topic]) {
    skillLevels[topic] = Math.min(5, skillLevels[topic] + 1);
  }
};

// Reset context (not fully implemented)
export const resetContext = () => {
  // Implement context reset logic here
};

// Enhance the detectIntent function to handle more general queries
export const detectIntent = (message: string): { intent: string; topic: string | null; confidence: number } => {
  const lowerMessage = message.toLowerCase();
  
  // Learning-specific intents
  if (lowerMessage.includes('learn') || lowerMessage.includes('teach') || lowerMessage.includes('study') || lowerMessage.includes('course')) {
    for (const topic of learningTopics) {
      if (lowerMessage.includes(topic)) {
        return { intent: 'learning', topic, confidence: 0.9 };
      }
    }
    return { intent: 'learning', topic: null, confidence: 0.7 };
  }
  
  // Question-answering intents
  if (lowerMessage.startsWith('what') || lowerMessage.startsWith('how') || lowerMessage.startsWith('why') || 
      lowerMessage.startsWith('when') || lowerMessage.startsWith('where') || lowerMessage.startsWith('can') || 
      lowerMessage.startsWith('could') || lowerMessage.startsWith('explain')) {
    for (const topic of learningTopics) {
      if (lowerMessage.includes(topic)) {
        return { intent: 'question', topic, confidence: 0.85 };
      }
    }
    return { intent: 'question', topic: null, confidence: 0.8 };
  }
  
  // Check for specific topics without explicit learning intent
  for (const topic of learningTopics) {
    if (lowerMessage.includes(topic)) {
      return { intent: 'topic_exploration', topic, confidence: 0.7 };
    }
  }
  
  // General conversation/chat
  return { intent: 'general_conversation', topic: null, confidence: 0.5 };
};

// Enhanced response generation
export const generateResponse = (intent: string, topic: string | null, messages: Message[]): string => {
  // Get topic-specific response if available
  if (topic && topicResponses[topic]) {
    return topicResponses[topic];
  }
  
  // Handle based on intent
  switch (intent) {
    case 'learning':
      if (!topic) {
        return "I'd be happy to help you learn! What specific topic are you interested in? I can teach you about programming languages like Python and JavaScript, web development, artificial intelligence, data science, cybersecurity, and many other tech topics.";
      }
      break;
      
    case 'question':
      if (!topic) {
        // Create a generic but informative response for general questions
        return `That's an interesting question! Let me provide you with some information about that.\n\n${generateGenericResponse()}`;
      }
      break;
      
    case 'topic_exploration':
      if (!topic) {
        return "I'd be happy to explore that topic with you! Would you like to learn the basics, or dive into more advanced concepts?";
      }
      break;
      
    case 'general_conversation':
      // Enhanced general conversation handling
      return generateConversationalResponse(messages);
      
    default:
      // Default fallback response
      return "I'm here to help with your learning journey! Ask me about programming, tech, or any other educational topic you're curious about.";
  }
  
  // Fallback for topics without specific responses
  return `I'd be happy to teach you about ${topic}! Let's start with the basics and then we can dive deeper. What specific aspects of ${topic} would you like to explore?`;
};

// New helper functions for enhanced responses
const generateGenericResponse = (): string => {
  const genericResponses = [
    "Based on my knowledge, there are multiple perspectives to consider. Let me outline the key points...",
    "This is an interesting topic with several important aspects to understand...",
    "Let me provide you with a comprehensive explanation that covers the main concepts...",
    "I can help you understand this topic better by breaking it down into fundamental components..."
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

const generateConversationalResponse = (messages: Message[]): string => {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  
  // Detect greeting
  if (lastMessage.includes('hello') || lastMessage.includes('hi ') || lastMessage.includes('hey')) {
    return "Hello! I'm SkillUp AI, your personal learning assistant. How can I help you today? Would you like to learn something new or get help with a topic you're already exploring?";
  }
  
  // Detect thank you
  if (lastMessage.includes('thank') || lastMessage.includes('thanks')) {
    return "You're welcome! I'm happy to help. Is there anything else you'd like to learn about?";
  }
  
  // Detect opinion requests
  if (lastMessage.includes('what do you think') || lastMessage.includes('your opinion')) {
    return "As an AI assistant, I can provide factual information about various topics. While I don't have personal opinions, I can help you understand different perspectives on this subject. Would you like me to explain more?";
  }
  
  // General conversation fallback
  return "I'm designed to help you learn and explore new topics. I can answer questions about programming, technology, science, and many other educational subjects. How can I assist with your learning journey today?";
};

// Add this to the existing learning topics
const learningTopics = [
  'python', 'javascript', 'web development', 'ai', 'cybersecurity', 
  'soft skills', 'machine learning', 'react', 'database', 'data science',
  'blockchain', 'cloud computing', 'devops', 'mobile development', 'game development',
  'quantum computing', 'iot', 'big data', 'algorithms', 'math', 'science',
  'history', 'literature', 'languages', 'art', 'music', 'philosophy'
];

// Make sure to export the learningTopics array
export { learningTopics };
