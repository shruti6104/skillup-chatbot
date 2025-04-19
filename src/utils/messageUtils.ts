
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
      lowerMessage.startsWith('could') || lowerMessage.startsWith('explain') || lowerMessage.includes('?')) {
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

// Enhanced response generation for all types of queries
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
        return handleGeneralQuestion(messages[messages.length - 1]?.content || "");
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

// Enhanced general question handling - significantly improved to handle a wide range of queries
const handleGeneralQuestion = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Knowledge-based questions
  if (lowerQuestion.includes("what is") || lowerQuestion.includes("define") || lowerQuestion.includes("meaning of")) {
    if (lowerQuestion.includes("coding") || lowerQuestion.includes("programming")) {
      return "Coding or programming is the process of creating instructions for computers using programming languages. It's how we create websites, apps, software, and even control robots. Programming involves breaking down problems into logical steps that a computer can understand and execute.";
    }
    
    if (lowerQuestion.includes("algorithm")) {
      return "An algorithm is a step-by-step procedure or formula for solving a problem. In computing, algorithms are unambiguous specifications for performing calculations, data processing, automated reasoning, and other tasks. They form the foundation of everything we do in programming.";
    }
    
    if (lowerQuestion.includes("api")) {
      return "API stands for Application Programming Interface. It's a set of rules that allows different software applications to communicate with each other. APIs enable the integration of different services and data sources, making it possible to build complex applications that leverage functionality from multiple systems.";
    }
    
    if (lowerQuestion.includes("framework")) {
      return "A framework is a pre-built structure or template that provides a foundation for developing software applications. It typically includes libraries, APIs, and tools that help developers build applications more efficiently by handling common functionalities like database access, templating, and form validation.";
    }
  }
  
  // How-to questions
  if (lowerQuestion.includes("how to") || lowerQuestion.includes("steps to") || lowerQuestion.includes("guide for")) {
    if (lowerQuestion.includes("learn programming") || lowerQuestion.includes("start coding")) {
      return "To start learning programming:\n\n1. Choose a beginner-friendly language like Python or JavaScript\n2. Use free online resources like freeCodeCamp, Codecademy, or Khan Academy\n3. Set small, achievable goals and practice consistently\n4. Work on mini-projects to apply what you've learned\n5. Join coding communities for support\n6. Gradually tackle more complex concepts as you build confidence";
    }
    
    if (lowerQuestion.includes("debug") || lowerQuestion.includes("fix errors")) {
      return "Effective debugging techniques:\n\n1. Read the error message carefully - it often points to the exact issue\n2. Use console.log() or print statements to track variable values\n3. Use a debugger to step through code execution\n4. Check for common mistakes like typos, missing brackets, or semicolons\n5. Test with simplified inputs to isolate the problem\n6. Take breaks - sometimes a fresh perspective helps\n7. Use rubber duck debugging - explain your code line by line to spot logical errors";
    }
    
    if (lowerQuestion.includes("interview") || lowerQuestion.includes("job")) {
      return "Preparing for a tech interview:\n\n1. Review fundamental CS concepts and data structures\n2. Practice coding problems on platforms like LeetCode or HackerRank\n3. Review the company's products, values, and tech stack\n4. Prepare examples of past projects and challenges you've overcome\n5. Practice explaining your thought process while coding\n6. Prepare questions to ask the interviewer\n7. Get comfortable with collaborative coding tools\n8. Practice mock interviews with friends or mentors";
    }
  }
  
  // Comparison questions
  if (lowerQuestion.includes(" vs ") || lowerQuestion.includes("difference between") || lowerQuestion.includes("compare")) {
    if ((lowerQuestion.includes("python") && lowerQuestion.includes("javascript")) || 
        (lowerQuestion.includes("python") && lowerQuestion.includes("js"))) {
      return "Python vs JavaScript:\n\n- Syntax: Python uses indentation for blocks; JavaScript uses curly braces\n- Usage: Python excels in data science, AI, and backend; JavaScript dominates web development and is essential for frontend\n- Typing: Python is strongly typed; JavaScript is loosely typed\n- Execution: Python is interpreted; JavaScript runs in browsers and Node.js\n- Libraries: Python has extensive scientific libraries; JavaScript has rich frameworks for web development\n- Learning curve: Python is often considered more beginner-friendly";
    }
    
    if ((lowerQuestion.includes("react") && lowerQuestion.includes("angular")) || 
        (lowerQuestion.includes("react") && lowerQuestion.includes("vue"))) {
      return "React vs Angular vs Vue:\n\n- React: Library focused on UI components, uses JSX, virtual DOM, and one-way data binding. Flexible with minimal opinions.\n- Angular: Complete framework with two-way binding, dependency injection, and TypeScript. More opinionated and comprehensive.\n- Vue: Progressive framework combining React's component model with Angular's templating. Easier learning curve with incremental adoption.\n\nAll three are excellent choices with strong communities and job markets.";
    }
    
    if (lowerQuestion.includes("sql") && lowerQuestion.includes("nosql")) {
      return "SQL vs NoSQL databases:\n\n- Structure: SQL uses tables with predefined schemas; NoSQL uses various formats (documents, key-value, graphs)\n- Scalability: SQL scales vertically; NoSQL scales horizontally more easily\n- Querying: SQL has standardized query language; NoSQL has database-specific methods\n- ACID compliance: SQL is typically ACID compliant; NoSQL often sacrifices some ACID properties for performance\n- Use cases: SQL for structured data and complex relationships; NoSQL for unstructured data, rapid development, and extreme scale";
    }
  }
  
  // Career questions
  if (lowerQuestion.includes("career") || lowerQuestion.includes("job") || lowerQuestion.includes("salary")) {
    if (lowerQuestion.includes("data science") || lowerQuestion.includes("data scientist")) {
      return "Data Science career path:\n\nData Scientists analyze complex data to help organizations make better decisions. The path typically requires:\n- Strong statistics and math background\n- Programming skills (Python, R)\n- Machine learning expertise\n- Data visualization abilities\n- Domain knowledge\n\nThe average salary ranges from $90,000-$140,000+ depending on experience, location, and industry. Job growth is projected at 22% through 2030, much faster than average.";
    }
    
    if (lowerQuestion.includes("web dev") || lowerQuestion.includes("web developer")) {
      return "Web Development career path:\n\nWeb Developers build websites and web applications. Paths include:\n- Frontend (HTML, CSS, JavaScript, frameworks like React)\n- Backend (Node.js, Python, PHP, databases)\n- Full Stack (both frontend and backend)\n\nThe average salary ranges from $70,000-$120,000+ depending on specialization, experience, and location. The job market is strong with consistent demand across industries.";
    }
  }
  
  // Technology questions
  if (lowerQuestion.includes("blockchain") || lowerQuestion.includes("crypto")) {
    return "Blockchain technology is a distributed, immutable ledger that records transactions across many computers. Beyond cryptocurrencies like Bitcoin, it has applications in supply chain management, voting systems, identity verification, and smart contracts. The technology provides transparency, security, and removes the need for trusted third parties in many scenarios.";
  }
  
  if (lowerQuestion.includes("cloud computing") || lowerQuestion.includes("aws") || lowerQuestion.includes("azure")) {
    return "Cloud computing delivers computing services over the internet, including servers, storage, databases, networking, and software. Major providers include AWS, Microsoft Azure, and Google Cloud. Benefits include reduced infrastructure costs, scalability, and flexibility. Most modern applications use cloud services in some form, making cloud knowledge essential for many tech roles.";
  }
  
  // Generic informative response for other types of questions
  return `That's an interesting question! While I'm primarily focused on helping with coding and technical education, I'll try to provide a thoughtful response. I'd recommend exploring resources like documentation, tutorials, or community forums for more in-depth information on this topic. Would you like me to point you to some learning resources related to this question?`;
};

// Significantly enhanced conversational response handling
const generateConversationalResponse = (messages: Message[]): string => {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  
  // Detect greeting
  if (lastMessage.includes('hello') || lastMessage.includes('hi ') || lastMessage.includes('hey') || lastMessage === 'hi') {
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
  
  // Detect about me questions
  if ((lastMessage.includes('who are you') || lastMessage.includes('what are you')) || 
      (lastMessage.includes('about you') || lastMessage.includes('tell me about yourself'))) {
    return "I'm SkillUp AI, an educational assistant designed to help you learn new skills, especially in programming and technology. I can answer questions, explain concepts, suggest learning resources, and guide you through your learning journey. My goal is to make education more accessible and personalized. How can I assist with your learning goals today?";
  }
  
  // Detect capability questions
  if (lastMessage.includes('what can you do') || lastMessage.includes('help me with') || lastMessage.includes('your capabilities')) {
    return "I can help you with many aspects of learning:\n\n• Answer questions about programming, technology, and other topics\n• Explain complex concepts in simple terms\n• Recommend learning resources and tutorials\n• Guide you through learning paths for various skills\n• Quiz you on topics you've learned\n• Track your learning progress\n• Suggest next steps in your learning journey\n\nWhat would you like to learn about today?";
  }
  
  // Detect personal life questions
  if (lastMessage.includes('how are you') || lastMessage.includes('how do you feel')) {
    return "I'm operating well and ready to help with your learning goals! While I don't experience feelings as humans do, I'm designed to be helpful, informative, and supportive of your educational journey. What can I help you learn today?";
  }
  
  // Handle other generic interactions or chit-chat
  const genericResponses = [
    "I'm designed to help you learn and explore new topics. I can answer questions about programming, technology, science, and many other educational subjects. How can I assist with your learning journey today?",
    "I'd love to help you explore new topics or deepen your understanding of subjects you're already familiar with. What would you like to learn about?",
    "Learning is a lifelong journey, and I'm here to assist you along the way. Would you like to explore a new topic or continue with something you've been studying?",
    "I'm here to support your educational goals. Whether you're a beginner or advanced learner, I can provide information, explanations, and resources. What topic interests you today?",
    "I can provide information on a wide range of educational topics. Would you like to learn something new or get help with a specific question you have?"
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

// Expanded learning topics to cover more general knowledge areas
const learningTopics = [
  'python', 'javascript', 'web development', 'ai', 'cybersecurity', 
  'soft skills', 'machine learning', 'react', 'database', 'data science',
  'blockchain', 'cloud computing', 'devops', 'mobile development', 'game development',
  'quantum computing', 'iot', 'big data', 'algorithms', 'math', 'science',
  'history', 'literature', 'languages', 'art', 'music', 'philosophy',
  'biology', 'physics', 'chemistry', 'psychology', 'business', 'economics',
  'marketing', 'health', 'fitness', 'cooking', 'photography', 'design',
  'geography', 'astronomy', 'environmental science', 'politics', 'law',
  'architecture', 'engineering', 'medicine', 'nutrition', 'sports'
];

// Make sure to export the learningTopics array
export { learningTopics };
