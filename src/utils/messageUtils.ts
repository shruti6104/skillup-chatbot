// This file contains utility functions for handling messages in the SkillUp AI chatbot
import { roadmaps } from '@/data/roadmapData';

// Function to detect the intent of a user message
export const detectIntent = (message: string) => {
  message = message.toLowerCase();
  
  // Define patterns for different intents
  const learningPatterns = ['teach', 'learn', 'explain', 'how to', 'what is', 'tell me about', 'introduce', 'basics of'];
  const greetingPatterns = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
  const feedbackPatterns = ['thanks', 'thank you', 'helpful', 'great explanation', 'appreciate'];
  const quizPatterns = ['quiz', 'test', 'assessment', 'evaluate', 'check my knowledge'];
  const challengePatterns = ['challenge', 'exercise', 'practice', 'problem', 'project'];
  const opinionPatterns = ['think', 'opinion', 'believe', 'perspective', 'point of view', 'thoughts on'];
  const comparisonPatterns = ['difference', 'compare', 'versus', 'vs', 'better', 'advantages', 'disadvantages'];
  const recommendationPatterns = ['recommend', 'suggest', 'best', 'top', 'favorite', 'popular'];
  const generalKnowledgePatterns = ['who', 'when', 'where', 'why', 'history', 'origins', 'created'];
  
  // Topic patterns
  const pythonPatterns = ['python', 'django', 'flask', 'pandas', 'numpy', 'matplotlib'];
  const webDevPatterns = ['html', 'css', 'javascript', 'web', 'frontend', 'backend', 'react', 'vue', 'angular'];
  const aiPatterns = ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural networks'];
  const dataPatterns = ['data science', 'data analysis', 'big data', 'statistics', 'visualization', 'tableau', 'power bi'];
  const cyberPatterns = ['cyber', 'security', 'hacking', 'encryption', 'firewall', 'penetration testing'];
  const softSkillsPatterns = ['soft skills', 'communication', 'leadership', 'teamwork', 'time management'];
  const cloudPatterns = ['cloud', 'aws', 'azure', 'gcp', 'serverless', 'docker', 'kubernetes'];
  const mobilePatterns = ['mobile', 'android', 'ios', 'swift', 'kotlin', 'react native', 'flutter'];
  const blockchainPatterns = ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'smart contracts'];
  const gameDevPatterns = ['game', 'unity', 'unreal', 'godot', 'gaming'];
  const devOpsPatterns = ['devops', 'ci/cd', 'jenkins', 'gitlab', 'github actions'];
  const iotPatterns = ['iot', 'internet of things', 'arduino', 'raspberry pi', 'embedded systems'];
  const careerPatterns = ['career', 'interview', 'resume', 'job', 'salary', 'promotion'];
  const mathPatterns = ['math', 'mathematics', 'algebra', 'calculus', 'statistics', 'linear algebra'];
  const generalTopics = ['technology', 'science', 'humanities', 'arts', 'social sciences', 'business', 'finance'];
  
  // Detect intent
  let intent = 'general';
  if (greetingPatterns.some(pattern => message.includes(pattern))) {
    intent = 'greeting';
  } else if (learningPatterns.some(pattern => message.includes(pattern))) {
    intent = 'learning';
  } else if (feedbackPatterns.some(pattern => message.includes(pattern))) {
    intent = 'feedback';
  } else if (quizPatterns.some(pattern => message.includes(pattern))) {
    intent = 'quiz';
  } else if (challengePatterns.some(pattern => message.includes(pattern))) {
    intent = 'challenge';
  } else if (opinionPatterns.some(pattern => message.includes(pattern))) {
    intent = 'opinion';
  } else if (comparisonPatterns.some(pattern => message.includes(pattern))) {
    intent = 'comparison';
  } else if (recommendationPatterns.some(pattern => message.includes(pattern))) {
    intent = 'recommendation';
  } else if (generalKnowledgePatterns.some(pattern => message.includes(pattern))) {
    intent = 'knowledge';
  }
  
  // Detect topic
  let topic = null;
  if (pythonPatterns.some(pattern => message.includes(pattern))) {
    topic = 'python';
  } else if (webDevPatterns.some(pattern => message.includes(pattern))) {
    topic = 'web development';
  } else if (aiPatterns.some(pattern => message.includes(pattern))) {
    topic = 'ai';
  } else if (dataPatterns.some(pattern => message.includes(pattern))) {
    topic = 'data science';
  } else if (cyberPatterns.some(pattern => message.includes(pattern))) {
    topic = 'cybersecurity';
  } else if (softSkillsPatterns.some(pattern => message.includes(pattern))) {
    topic = 'soft skills';
  } else if (cloudPatterns.some(pattern => message.includes(pattern))) {
    topic = 'cloud computing';
  } else if (mobilePatterns.some(pattern => message.includes(pattern))) {
    topic = 'mobile development';
  } else if (blockchainPatterns.some(pattern => message.includes(pattern))) {
    topic = 'blockchain';
  } else if (gameDevPatterns.some(pattern => message.includes(pattern))) {
    topic = 'game development';
  } else if (devOpsPatterns.some(pattern => message.includes(pattern))) {
    topic = 'devops';
  } else if (iotPatterns.some(pattern => message.includes(pattern))) {
    topic = 'iot';
  } else if (careerPatterns.some(pattern => message.includes(pattern))) {
    topic = 'career development';
  } else if (mathPatterns.some(pattern => message.includes(pattern))) {
    topic = 'mathematics';
  } else {
    // Try to identify general topics
    for (const genTopic of generalTopics) {
      if (message.includes(genTopic)) {
        topic = genTopic;
        break;
      }
    }
  }
  
  // Calculate confidence based on pattern matches
  const matchedPatterns = [
    ...learningPatterns, ...greetingPatterns, ...feedbackPatterns,
    ...quizPatterns, ...challengePatterns, ...opinionPatterns,
    ...comparisonPatterns, ...recommendationPatterns, ...generalKnowledgePatterns
  ].filter(pattern => message.includes(pattern)).length;
  
  const confidence = Math.min(0.3 + (matchedPatterns * 0.1), 0.9);
  
  return { intent, topic, confidence };
};

// Update skill level based on topic
export const updateSkillLevel = (topic: string) => {
  // This would typically interact with a user profile or database
  // In a real implementation, this would update the user's skill level in the specified topic
  console.log(`Updating skill level in ${topic}`);
};

// Reset context for new conversation
export const resetContext = () => {
  // This would typically clear conversation history or reset state
  console.log('Resetting conversation context');
};

// Generate response based on intent and topic
export const generateResponse = (intent: string, topic: string | null, messages: any[]) => {
  // Add personality traits to responses
  const personalityTraits = {
    encouraging: ["That's a great question!", "Excellent choice!", "I'm excited to help you learn about this!"],
    supportive: ["Don't worry if this seems complex at first.", "Let's break this down together.", "You're making great progress!"],
    engaging: ["What aspects interest you most?", "Have you had any experience with this before?", "Would you like to try a hands-on example?"],
    knowledgeable: ["According to recent studies...", "In practice, most developers...", "A common approach is..."]
  };

  const addPersonality = (response: string) => {
    const trait = Object.values(personalityTraits)[Math.floor(Math.random() * Object.values(personalityTraits).length)];
    const phrase = trait[Math.floor(Math.random() * trait.length)];
    return `${phrase} ${response}`;
  };

  // Check conversation context
  const conversationHistory = messages.slice(-5);
  const isFollowUpQuestion = conversationHistory.length > 2 && 
    conversationHistory.some(m => m.role === 'user' && m.content.toLowerCase().includes('why') || m.content.toLowerCase().includes('how'));

  // Enhanced response generation based on context and intent
  if (intent === 'learning' && topic) {
    let response = generateLearningContent(topic);
    
    // Add interactive elements
    response += '\n\nWould you like to:\n';
    response += '1. 🎯 Try a hands-on exercise\n';
    response += '2. 📚 Explore more advanced concepts\n';
    response += '3. 🤝 See real-world applications\n';
    response += '4. 🎮 Take a quick quiz to test your knowledge\n\n';
    response += "Just let me know what interests you, and I'll guide you further!";
    
    return addPersonality(response);
  }

  if (intent === 'quiz' && topic) {
    const response = generateQuizContent(topic);
    return addPersonality(response + "\n\nDon't worry about getting everything perfect - this is a learning opportunity! 🌟");
  }

  // Enhanced feedback handling
  if (intent === 'feedback') {
    const encouragements = [
      "I'm glad I could help! Would you like to explore any related topics?",
      "Your enthusiasm for learning is inspiring! What would you like to discover next?",
      "That's great to hear! Remember, consistent practice is key to mastery. Shall we continue exploring?",
      "Thank you for your feedback! Learning is a journey, and I'm here to support you every step of the way. What's next on your learning path?"
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  // Add more context-aware responses
  if (isFollowUpQuestion) {
    const lastTopic = conversationHistory
      .filter(m => m.role === 'assistant')
      .pop()?.content;
    
    if (lastTopic) {
      return addPersonality("Let me elaborate on that further. " + generateDetailedExplanation(lastTopic));
    }
  }

  // Check for repeating questions to avoid redundancy
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  const lastBotMessage = messages.filter(m => m.role === 'assistant').pop();
  
  // Handle general chat responses for common questions
  // This makes the AI respond like a general chat assistant for topics outside learning
  if (intent === 'general' && !topic) {
    const userMessage = lastUserMessage?.content?.toLowerCase() || '';
    
    // Handle general knowledge questions (simulate a more general AI)
    if (userMessage.includes('who is') || userMessage.includes('what is') || userMessage.startsWith('who') || userMessage.startsWith('what')) {
      return `I can answer that. ${generateGeneralKnowledgeResponse(userMessage)}\n\nIs there any specific aspect of this topic you'd like to explore further in relation to your learning journey?`;
    }
    
    // Handle time/date questions
    if (userMessage.includes('time') || userMessage.includes('date') || userMessage.includes('day')) {
      const now = new Date();
      return `The current date is ${now.toLocaleDateString()} and the time is ${now.toLocaleTimeString()}. Is there anything specific you'd like to learn about today?`;
    }
    
    // Handle calculation questions
    if (userMessage.includes('+') || userMessage.includes('-') || userMessage.includes('*') || userMessage.includes('/') || 
        userMessage.includes('calculate') || userMessage.includes('compute')) {
      return `I can help with calculations. ${tryToCalculate(userMessage)}\n\nIs there anything else you'd like to know?`;
    }
    
    // Handle weather questions with a polite deflection
    if (userMessage.includes('weather') || userMessage.includes('temperature') || userMessage.includes('forecast')) {
      return `I don't have access to real-time weather data, but I'd be happy to help you learn about meteorology or climate science if you're interested.`;
    }
    
    // Handle general chitchat
    if (userMessage.length < 15) {
      return `I'm here to assist with your learning journey. Can I help you explore a specific topic or skill today?`;
    }
    
    // Default response for other general queries
    return `I'm your SkillUp AI learning assistant. I can help you learn about programming, technology, soft skills, and many other topics. What would you like to explore today?`;
  }
  
  // Handle greetings
  if (intent === 'greeting') {
    const greetings = [
      "Hello! I'm SkillUp AI, your personal learning assistant. What would you like to learn today?",
      "Hi there! Ready to expand your knowledge? What topic shall we explore together?",
      "Greetings! I'm here to help you learn and grow. What skill would you like to work on?",
      "Welcome back! Excited to continue your learning journey. What's on your mind today?",
      "Hello! I'm your AI learning companion. What would you like to discover today?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Handle feedback
  if (intent === 'feedback') {
    const feedbackResponses = [
      "You're welcome! I'm glad I could help. Is there anything else you'd like to learn about?",
      "I appreciate your feedback! Let me know if you want to explore more topics.",
      "Happy to be of assistance! Learning is a journey we're taking together.",
      "That's great to hear! Would you like to dive deeper into this topic or try something new?",
      "Thank you for the feedback! I'm always improving to better assist your learning needs."
    ];
    return feedbackResponses[Math.floor(Math.random() * feedbackResponses.length)];
  }
  
  // Handle learning requests with topic
  if (intent === 'learning' && topic) {
    return generateLearningContent(topic);
  }
  
  // Handle quiz requests
  if (intent === 'quiz' && topic) {
    return `I'd be happy to test your knowledge on ${topic}! Here's a quick quiz for you:\n\n${generateQuizContent(topic)}`;
  }
  
  // Handle challenge requests
  if (intent === 'challenge' && topic) {
    return `Here's a challenge to test your ${topic} skills:\n\n${generateChallengeContent(topic)}`;
  }
  
  // Handle opinion requests
  if (intent === 'opinion') {
    return `Here's a perspective on ${topic || 'that topic'}:\n\n${generateOpinionContent(topic || '')}`;
  }
  
  // Handle comparison requests
  if (intent === 'comparison' && topic) {
    return generateComparisonContent(topic);
  }
  
  // Handle recommendation requests
  if (intent === 'recommendation') {
    return generateRecommendationContent(topic || '');
  }
  
  // Handle general knowledge questions
  if (intent === 'knowledge') {
    return generateGeneralKnowledgeContent(topic || '');
  }
  
  // Default response
  if (topic) {
    return generateLearningContent(topic);
  }
  
  return addPersonality("I'm your AI learning companion, ready to help you master new skills and knowledge. What would you like to explore today? We can dive into programming, technology, soft skills, or any other topic that interests you! 🚀");
};

function generateDetailedExplanation(topic: string): string {
  return `Let me break this down further with some practical examples and real-world applications. 

Key Points to Consider:
1. The fundamental concepts and how they interconnect
2. Common challenges and how to overcome them
3. Best practices from industry experts
4. Practical application scenarios

Would you like me to focus on any specific aspect of this topic? I can provide code examples, diagrams, or step-by-step explanations! 🎯`;
}

export const generateLearningContent = (topic: string): string => {
  // Find matching roadmap
  const roadmapKey = Object.keys(roadmaps).find(key => 
    key === topic.toLowerCase() || 
    roadmaps[key].category.toLowerCase().includes(topic.toLowerCase())
  );

  if (roadmapKey) {
    const roadmap = roadmaps[roadmapKey];
    
    let response = `# ${roadmap.icon} ${roadmap.category} Learning Path\n\n`;
    response += `${roadmap.description}\n\n`;
    
    response += "## Learning Steps:\n\n";
    roadmap.steps.forEach((step, index) => {
      response += `${index + 1}. **${step.title}** (${step.duration})\n`;
      response += `   ${step.description}\n\n`;
      
      if (step.prerequisites?.length) {
        response += "   Prerequisites:\n";
        step.prerequisites.forEach(prereq => {
          response += `   - ${prereq}\n`;
        });
        response += "\n";
      }
      
      response += "   Free Resources:\n";
      step.resources
        .filter(r => r.isFree)
        .forEach(resource => {
          response += `   - [${resource.name}](${resource.url}) (${resource.type})\n`;
        });
      response += "\n";
    });
    
    response += "\nWould you like to:\n";
    response += "1. 🎯 Explore a specific step in detail?\n";
    response += "2. 📚 Get more free learning resources?\n";
    response += "3. 💡 Take a quiz to test your knowledge?\n";
    response += "4. 🤝 Connect with other learners?\n\n";
    response += "Just let me know what interests you most!";
    
    return response;
  }

  const learningContent = {
    'python': `# Python Fundamentals\n\nPython is a high-level, interpreted programming language known for its readability and versatility. Here are the key concepts to get started:\n\n## Variables and Data Types\n\n\`\`\`python\n# Variables don't need type declarations\nname = "John"  # string\nage = 30       # integer\nheight = 5.9   # float\nis_student = True  # boolean\n\`\`\`\n\n## Control Flow\n\n\`\`\`python\n# Conditional statements\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")\n\n# Loops\nfor i in range(5):\n    print(i)  # Prints 0, 1, 2, 3, 4\n\`\`\`\n\n## Functions\n\n\`\`\`python\ndef greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("Alice")  # "Hello, Alice!"\n\`\`\`\n\n## Lists and Dictionaries\n\n\`\`\`python\n# Lists\nfruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\n\n# Dictionaries\nperson = {"name": "John", "age": 30}\nperson["email"] = "john@example.com"\n\`\`\`\n\nWould you like to learn more about specific Python concepts?`,
    
    'web development': `# Web Development Fundamentals\n\nWeb development involves creating websites and web applications. Here's an overview of the core technologies:\n\n## HTML (Structure)\n\n\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>My Website</title>\n</head>\n<body>\n    <h1>Welcome to my site</h1>\n    <p>This is a paragraph.</p>\n</body>\n</html>\n\`\`\`\n\n## CSS (Styling)\n\n\`\`\`css\n/* Selecting elements */\nh1 {\n    color: blue;\n    font-size: 24px;\n}\n\n/* Classes and IDs */\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n}\`\`\`\n\n## JavaScript (Interactivity)\n\n\`\`\`javascript\n// Variables and functions\nconst greeting = "Hello, World!";\n\nfunction showMessage() {\n    alert(greeting);\n}\n\n// DOM manipulation\ndocument.getElementById("button").addEventListener("click", showMessage);\n\`\`\`\n\n## Frontend Frameworks\n- React\n- Angular\n- Vue.js\n\n## Backend Technologies\n- Node.js\n- Python (Django, Flask)\n- PHP\n- Ruby on Rails\n\nWould you like to dive deeper into any specific web technology?`,
    
    'ai': `# Artificial Intelligence Fundamentals\n\nArtificial Intelligence (AI) refers to machines designed to mimic human intelligence and perform tasks that typically require human cognition.\n\n## Key AI Concepts\n\n1. **Machine Learning**: Systems that learn from data to improve performance.\n   - Supervised Learning\n   - Unsupervised Learning\n   - Reinforcement Learning\n\n2. **Neural Networks**: Computing systems inspired by biological neural networks.\n   - Neurons (nodes)\n   - Layers (input, hidden, output)\n   - Weights and biases\n\n3. **Deep Learning**: Neural networks with multiple hidden layers.\n   - Convolutional Neural Networks (CNNs)\n   - Recurrent Neural Networks (RNNs)\n   - Transformers\n\n## Popular AI Applications\n\n- **Computer Vision**: Image recognition, object detection\n- **Natural Language Processing**: Translation, sentiment analysis\n- **Robotics**: Autonomous movement and decision making\n- **Recommendation Systems**: Personalized suggestions\n\n## AI Ethics Considerations\n\n- Bias and fairness\n- Privacy concerns\n- Transparency and explainability\n- Job displacement\n\nWould you like to explore any specific area of AI in more depth?`,
    
    'default': `I'd be happy to help you learn about ${topic}! This is a fascinating subject with many aspects to explore. Let's start with the fundamentals:\n\n## ${topic.charAt(0).toUpperCase() + topic.slice(1)} Basics\n\n${topic.charAt(0).toUpperCase() + topic.slice(1)} involves understanding key concepts and applying them in practical scenarios. To get started, you should familiarize yourself with the core principles.\n\n## Learning Resources\n\nHere are some recommended resources to begin your journey:\n\n1. Interactive tutorials and courses\n2. Books and documentation\n3. Practice exercises and projects\n4. Community forums and discussion groups\n\n## Next Steps\n\nWould you like to:\n- Dive deeper into specific ${topic} concepts?\n- Learn about practical applications of ${topic}?\n- Get recommendations for beginner-friendly projects?\n- Explore advanced topics in ${topic}?\n\nLet me know what interests you most, and we can explore that direction!`
  };
  
  return learningContent[topic.toLowerCase() as keyof typeof learningContent] || learningContent.default;
}

function generateQuizContent(topic: string): string {
  const quizzes = {
    'python': `**Python Quiz**\n\n1. What is the output of \`print(2**3)\`?\n   A) 6\n   B) 8\n   C) 9\n   D) 5\n\n2. Which of these is NOT a Python data type?\n   A) List\n   B) Dictionary\n   C) Array\n   D) Tuple\n\n3. What does the \`len()\` function do?\n   A) Returns the largest item in an iterable\n   B) Returns the smallest item in an iterable\n   C) Returns the number of items in an iterable\n   D) Returns the sum of all items in an iterable\n\nReply with your answers, and I'll check them!`,
    
    'web development': `**Web Development Quiz**\n\n1. Which HTML tag is used to link an external CSS file?\n   A) <css>\n   B) <style>\n   C) <link>\n   D) <script>\n\n2. In CSS, what does the property 'display: flex' do?\n   A) Makes an element invisible\n   B) Creates a flexible box layout\n   C) Makes text bold\n   D) Adds animation to an element\n\n3. What does API stand for in web development?\n   A) Application Programming Interface\n   B) Application Protocol Interface\n   C) Advanced Programming Interface\n   D) Application Processing Interface\n\nReply with your answers, and I'll check them!`,
    
    'ai': `**Artificial Intelligence Quiz**\n\n1. Which of these is NOT a type of machine learning?\n   A) Supervised learning\n   B) Reinforcement learning\n   C) Developmental learning\n   D) Unsupervised learning\n\n2. What is a neural network modeled after?\n   A) Computer processors\n   B) Human brain neurons\n   C) Database systems\n   D) Quantum mechanics\n\n3. Which algorithm is commonly used in recommendation systems?\n   A) Binary search\n   B) Bubble sort\n   C) Collaborative filtering\n   D) Depth-first search\n\nReply with your answers, and I'll check them!`,
    
    'default': `**${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz**\n\n1. What is one of the fundamental principles of ${topic}?\n   A) First principle\n   B) Second principle\n   C) Third principle\n   D) Fourth principle\n\n2. Which of these is most closely associated with ${topic}?\n   A) First association\n   B) Second association\n   C) Third association\n   D) Fourth association\n\n3. Who is considered a pioneer in the field of ${topic}?\n   A) First person\n   B) Second person\n   C) Third person\n   D) Fourth person\n\nReply with your answers, and I'll check them!`
  };
  
  return quizzes[topic.toLowerCase() as keyof typeof quizzes] || quizzes.default;
}

function generateChallengeContent(topic: string): string {
  const challenges = {
    'python': `**Python Coding Challenge**\n\nCreate a function that takes a list of numbers and returns the sum of all even numbers in the list.\n\nExample input: [1, 2, 3, 4, 5, 6]\nExpected output: 12 (2 + 4 + 6)\n\nBonus: Can you do it using list comprehension?\n\n\`\`\`python\ndef sum_even(numbers):\n    # Your code here\n    pass\n\`\`\`\n\nShare your solution when you're ready!`,
    
    'web development': `**Web Development Challenge**\n\nCreate a responsive navigation menu that:\n1. Displays horizontally on desktop screens\n2. Collapses into a hamburger menu on mobile screens\n3. Animates smoothly when opening/closing on mobile\n\nYou can use HTML, CSS, and vanilla JavaScript (no frameworks).\n\nStart with this structure:\n\n\`\`\`html\n<nav>\n    <div class="logo">Site Name</div>\n    <ul class="nav-links">\n        <li><a href="#">Home</a></li>\n        <li><a href="#">About</a></li>\n        <li><a href="#">Services</a></li>\n        <li><a href="#">Contact</a></li>\n    </ul>\n    <div class="burger">\n        <!-- Your hamburger icon here -->\n    </div>\n</nav>\n\`\`\`\n\nShare your solution when you're ready!`,
    
    'ai': `**AI Challenge**\n\nDesign a simple recommendation algorithm:\n\n1. You have user ratings for movies (1-5 stars)\n2. Create a function that recommends a new movie based on similar user preferences\n\nData example:\n\`\`\`\nUser1: {MovieA: 5, MovieB: 3, MovieC: 4}\nUser2: {MovieA: 4, MovieB: 5, MovieD: 2}\nUser3: {MovieC: 5, MovieD: 3, MovieE: 4}\n\`\`\`\n\nFor a new user who rated MovieA: 5 and MovieC: 4, which movie would you recommend?\n\nExplain your approach and the recommendation you would make!`,
    
    'default': `**${topic.charAt(0).toUpperCase() + topic.slice(1)} Challenge**\n\nHere's a practical challenge to test your knowledge:\n\n1. Identify a real-world problem related to ${topic}\n2. Design a solution using the principles and tools of ${topic}\n3. Outline your approach, including:\n   - Key considerations\n   - Methods you would use\n   - How you would evaluate success\n\nProvide a brief description of your solution (300 words or less).\n\nBonus: Add a simple diagram or pseudocode if applicable.\n\nI'm looking forward to seeing your creative approach!`
  };
  
  return challenges[topic.toLowerCase() as keyof typeof challenges] || challenges.default;
}

function generateOpinionContent(topic: string): string {
  if (!topic) {
    return "I'd be happy to share thoughts on a specific topic if you'd like to name one! I can discuss various perspectives on technology trends, learning approaches, career paths, or other educational topics.";
  }
  
  return `When it comes to ${topic}, there are several perspectives to consider:\n\n1. **Traditional View**:\nThe conventional wisdom on ${topic} suggests that structured learning and foundational knowledge are essential before advancing to more complex concepts.\n\n2. **Modern Perspective**:\nMore recent approaches to ${topic} emphasize practical application and project-based learning, with theory introduced as needed.\n\n3. **Balanced Approach**:\nMany experts now recommend combining fundamentals with hands-on practice, creating a feedback loop that reinforces learning.\n\nPersonally, I find that success in ${topic} often comes from:\n- Starting with core concepts\n- Applying knowledge through projects early\n- Learning from mistakes and iterations\n- Connecting with communities and mentors\n\nWhat's your experience or perspective on ${topic}? I'd be interested to hear your thoughts!`;
}

function generateComparisonContent(topic: string): string {
  // Extract potential comparison entities
  const entities = topic.match(/(?:between\s+)?([\w\s]+)(?:\s+and\s+)([\w\s]+)/i);
  
  if (entities && entities.length >= 3) {
    const entity1 = entities[1].trim();
    const entity2 = entities[2].trim();
    
    return `# Comparing ${entity1} vs ${entity2}\n\n## ${entity1}\n\n**Strengths**:\n- Unique advantages of ${entity1}\n- Areas where ${entity1} excels\n- Key features of ${entity1}\n\n**Limitations**:\n- Challenges with ${entity1}\n- Scenarios where ${entity1} may not be ideal\n\n## ${entity2}\n\n**Strengths**:\n- Unique advantages of ${entity2}\n- Areas where ${entity2} excels\n- Key features of ${entity2}\n\n**Limitations**:\n- Challenges with ${entity2}\n- Scenarios where ${entity2} may not be ideal\n\n## Key Differences\n\n- Technical distinctions\n- Performance considerations\n- Learning curve comparison\n- Community and ecosystem differences\n\n## When to Choose Each\n\nConsider using **${entity1}** when:\n- Specific use cases for ${entity1}\n- Environments where ${entity1} thrives\n\nConsider using **${entity2}** when:\n- Specific use cases for ${entity2}\n- Environments where ${entity2} thrives\n\nWould you like me to elaborate on any specific aspect of this comparison?`;
  }
  
  return `I'd be happy to compare different aspects of ${topic}. To provide a more focused comparison, could you specify what elements you'd like me to compare? For example:\n\n- Different approaches to learning ${topic}\n- Tools or technologies related to ${topic}\n- Career paths in ${topic}\n- Historical vs. modern perspectives on ${topic}`;
}

function generateRecommendationContent(topic: string): string {
  if (!topic || topic.trim() === '') {
    return "I'd be happy to provide recommendations! Could you specify what you're looking for? For example:\n\n- Learning resources for a specific topic\n- Tools for a particular task\n- Books on a subject\n- Career development paths\n- Project ideas\n\nWith a bit more information, I can provide tailored suggestions that will be most helpful for you.";
  }
  
  return `# Recommendations for ${topic}\n\n## Learning Resources\n\n### Beginner Level\n- Interactive online courses that provide hands-on experience\n- Beginner-friendly books with practical examples\n- Tutorial videos with step-by-step guidance\n\n### Intermediate Level\n- More comprehensive courses that cover advanced concepts\n- Practice projects to apply your knowledge\n- Community forums where you can ask questions\n\n### Advanced Level\n- Specialized resources for expert knowledge\n- Research papers and technical documentation\n- Advanced problem sets and challenges\n\n## Tools & Technologies\n\n- Essential tools for ${topic}\n- Popular frameworks and libraries\n- Development environments and setups\n\n## Project Ideas\n\n1. Beginner project to build fundamental skills\n2. Intermediate project to challenge your abilities\n3. Advanced project to showcase expertise\n\nWould you like more specific recommendations on any of these areas?`;
}

function generateGeneralKnowledgeContent(topic: string): string {
  return `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}: An Overview\n\n## Historical Context\n\n${topic.charAt(0).toUpperCase() + topic.slice(1)} has evolved significantly over time, with key developments shaping its current form and understanding.\n\n## Key Concepts\n\nThe fundamental principles of ${topic} include:\n\n1. First principle or concept\n2. Second principle or concept\n3. Third principle or concept\n\n## Notable Contributors\n\n
