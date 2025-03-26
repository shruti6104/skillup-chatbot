
import { Message } from '@/types/chat';

// For tracking conversation context
type ConversationContext = {
  currentTopic?: string;
  previousTopics: string[];
  userSkillLevels: {[key: string]: 'beginner' | 'intermediate' | 'advanced'};
  hasIntroducedSelf: boolean;
  lastInteractionTime?: Date;
};

// Global context store (would be better in a proper state management system)
let conversationContext: ConversationContext = {
  previousTopics: [],
  userSkillLevels: {},
  hasIntroducedSelf: false
};

// Common patterns to detect in user messages
const patterns = {
  greetings: /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)($|\s|[,.!?])/i,
  howAreYou: /(how are you|how('s| is) it going|how have you been|what's up)/i,
  learningRequest: /(learn|study|understand|master|teach me|explain|tutorial for|guide on|course|lesson|start with) (the )?([a-z\s&-]+)(\?|$|\.)/i,
  techQuery: /(what is|how to|explain|tell me about|define) ([a-z\s&-]+)(\?|$|\.)/i,
  thankYou: /(thank you|thanks|thx|ty|thank)/i,
  funFact: /(fun fact|tell me something interesting|interesting fact|did you know)/i
};

// Learning topics with resources and roadmaps
const learningTopics: {[key: string]: any} = {
  python: {
    intro: "Python is one of the most versatile and beginner-friendly programming languages, widely used in web development, data science, AI, automation, and more.",
    resources: [
      { name: "Python.org Official Tutorials", url: "https://docs.python.org/3/tutorial/" },
      { name: "Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com/" },
      { name: "Real Python", url: "https://realpython.com/" },
      { name: "Codecademy Python Course", url: "https://www.codecademy.com/learn/learn-python-3" },
      { name: "HackerRank Python Practice", url: "https://www.hackerrank.com/domains/python" }
    ],
    roadmap: [
      "1️⃣ **Fundamentals**: Learn syntax, variables, data types",
      "2️⃣ **Core Concepts**: Control flow, functions, modules",
      "3️⃣ **Data Structures**: Lists, dictionaries, sets",
      "4️⃣ **Advanced Topics**: OOP, error handling, file I/O",
      "5️⃣ **Libraries**: NumPy, Pandas, Matplotlib",
      "6️⃣ **Projects**: Build applications to apply your skills"
    ],
    funFacts: [
      "Python was named after the comedy group Monty Python, not the snake!",
      "Python's philosophy emphasizes code readability with its significant use of whitespace.",
      "The Python Package Index (PyPI) contains over 300,000 packages you can install and use."
    ]
  },
  javascript: {
    intro: "JavaScript is the language of the web, essential for creating interactive websites and applications. It runs in all modern browsers and powers both frontend and backend development.",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript.info", url: "https://javascript.info/" },
      { name: "freeCodeCamp JavaScript Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
      { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" },
      { name: "JavaScript30", url: "https://javascript30.com/" }
    ],
    roadmap: [
      "1️⃣ **Basics**: Syntax, variables, data types, operators",
      "2️⃣ **Core Concepts**: Functions, arrays, objects, DOM manipulation",
      "3️⃣ **Modern JS**: ES6+ features, async/await, modules",
      "4️⃣ **Frameworks**: React, Vue, or Angular",
      "5️⃣ **Backend JS**: Node.js, Express",
      "6️⃣ **Full-stack Projects**: Connect frontend to backend services"
    ],
    funFacts: [
      "JavaScript was created in just 10 days by Brendan Eich in 1995.",
      "Despite the name similarity, JavaScript has no relation to Java.",
      "JavaScript is the only language that can run natively in browsers."
    ]
  },
  "web development": {
    intro: "Web Development encompasses all the skills needed to build websites and web applications, from frontend design to backend functionality and databases.",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn" },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
      { name: "The Odin Project", url: "https://www.theodinproject.com/" },
      { name: "W3Schools", url: "https://www.w3schools.com/" },
      { name: "CSS-Tricks", url: "https://css-tricks.com/" }
    ],
    roadmap: [
      "1️⃣ **HTML & CSS**: Structure and styling",
      "2️⃣ **Responsive Design**: Mobile-first approach, media queries",
      "3️⃣ **JavaScript**: Frontend interactivity",
      "4️⃣ **Frontend Frameworks**: React, Angular, or Vue",
      "5️⃣ **Backend Development**: Node.js, Python, or PHP",
      "6️⃣ **Databases**: SQL or NoSQL",
      "7️⃣ **Deployment & DevOps**: Hosting, CI/CD, version control"
    ],
    funFacts: [
      "The first-ever website is still online at http://info.cern.ch/",
      "Over 1.7 billion websites exist today, but only about 200 million are active.",
      "The first web browser was called 'WorldWideWeb' and was both a browser and an editor."
    ]
  },
  "ai": {
    intro: "Artificial Intelligence (AI) is a field of computer science focused on creating systems that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, and decision-making.",
    resources: [
      { name: "Elements of AI", url: "https://www.elementsofai.com/" },
      { name: "Google's Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      { name: "Fast.ai", url: "https://www.fast.ai/" },
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
      { name: "Stanford CS229 (Machine Learning)", url: "https://see.stanford.edu/Course/CS229" }
    ],
    roadmap: [
      "1️⃣ **Prerequisites**: Python programming, Mathematics (Linear Algebra, Calculus, Statistics)",
      "2️⃣ **Machine Learning Basics**: Supervised/Unsupervised Learning",
      "3️⃣ **Deep Learning**: Neural Networks, CNNs, RNNs",
      "4️⃣ **Frameworks**: TensorFlow, PyTorch",
      "5️⃣ **Specialized Areas**: NLP, Computer Vision, Reinforcement Learning",
      "6️⃣ **Projects**: Build AI applications to solve real problems"
    ],
    funFacts: [
      "The term 'Artificial Intelligence' was first coined in 1956 at the Dartmouth Conference.",
      "The Turing Test, proposed by Alan Turing in 1950, is still used to evaluate a machine's ability to exhibit intelligent behavior.",
      "Deep Blue was the first computer to beat a world chess champion, defeating Garry Kasparov in 1997."
    ]
  },
  "cybersecurity": {
    intro: "Cybersecurity involves protecting systems, networks, and programs from digital attacks aimed at accessing, changing, or destroying sensitive information, disrupting normal business processes, or extorting money.",
    resources: [
      { name: "TryHackMe", url: "https://tryhackme.com/" },
      { name: "Hack The Box", url: "https://www.hackthebox.eu/" },
      { name: "Cybrary", url: "https://www.cybrary.it/" },
      { name: "OWASP", url: "https://owasp.org/" },
      { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" }
    ],
    roadmap: [
      "1️⃣ **Fundamentals**: Networking, Operating Systems, Basic Programming",
      "2️⃣ **Security Concepts**: CIA triad, threat models, security controls",
      "3️⃣ **Tools & Skills**: Kali Linux, Wireshark, Metasploit",
      "4️⃣ **Web Security**: OWASP Top 10, secure coding practices",
      "5️⃣ **Specialized Areas**: Penetration Testing, Forensics, Cryptography",
      "6️⃣ **Certifications**: CompTIA Security+, CEH, OSCP"
    ],
    funFacts: [
      "The first computer worm released on the Internet, the Morris Worm, was created in 1988.",
      "It takes companies an average of 280 days to identify and contain a data breach.",
      "The most common password is still '123456', used by millions of accounts worldwide."
    ]
  },
  "soft skills": {
    intro: "Soft skills are non-technical abilities that relate to how you work and interact with others. They're essential for career success across all industries and complement technical skills.",
    resources: [
      { name: "Coursera Soft Skills Courses", url: "https://www.coursera.org/search?query=soft%20skills" },
      { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/" },
      { name: "Toastmasters (Public Speaking)", url: "https://www.toastmasters.org/" },
      { name: "Harvard Business Review", url: "https://hbr.org/" },
      { name: "MindTools", url: "https://www.mindtools.com/" }
    ],
    roadmap: [
      "1️⃣ **Communication**: Active listening, clear expression, effective writing",
      "2️⃣ **Collaboration**: Teamwork, conflict resolution, giving/receiving feedback",
      "3️⃣ **Problem-Solving**: Critical thinking, creativity, decision making",
      "4️⃣ **Adaptability**: Flexibility, resilience, openness to change",
      "5️⃣ **Leadership**: Motivation, delegation, strategic thinking",
      "6️⃣ **Self-Management**: Time management, stress management, accountability"
    ],
    funFacts: [
      "According to LinkedIn, 57% of leaders say soft skills are more important than hard skills.",
      "The World Economic Forum identifies problem-solving as the #1 skill for the future of work.",
      "Studies show that teams with high emotional intelligence are 50% more productive."
    ]
  }
};

// Fun facts to share occasionally
const generalFunFacts = [
  "Did you know that Python was named after the comedy group 'Monty Python' and not the snake?",
  "The first computer bug was an actual real-life bug - a moth found trapped in Harvard's Mark II computer in 1947.",
  "The average person spends 6 years and 8 months of their life on the internet.",
  "The first website ever created is still online! You can visit it at http://info.cern.ch/",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "There are approximately 700 different programming languages!",
  "The term 'bug' to describe computer issues originated when a moth caused a problem in an early computer.",
  "60% of all online traffic is automated - meaning bots, not humans."
];

// Motivational quotes
const motivationalQuotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "It's not that I'm so smart, it's just that I stay with problems longer. - Albert Einstein",
  "Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke",
  "Learning is not a spectator sport. - D. Blocher",
  "The expert in anything was once a beginner. - Helen Hayes",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "The more you learn, the more you earn. - Warren Buffett",
  "The beautiful thing about learning is that nobody can take it away from you. - B.B. King"
];

// Detect intent from user message
export const detectIntent = (message: string): {
  intent: string;
  topic?: string;
  confidence: number;
} => {
  // Check for greetings first
  if (patterns.greetings.test(message)) {
    return { intent: 'greeting', confidence: 0.9 };
  }
  
  // Check for "how are you" type questions
  if (patterns.howAreYou.test(message)) {
    return { intent: 'how_are_you', confidence: 0.9 };
  }
  
  // Check for thank you messages
  if (patterns.thankYou.test(message)) {
    return { intent: 'thank_you', confidence: 0.9 };
  }
  
  // Check for fun fact requests
  if (patterns.funFact.test(message)) {
    return { intent: 'fun_fact', confidence: 0.9 };
  }
  
  // Check for learning requests
  const learningMatch = message.match(patterns.learningRequest);
  if (learningMatch && learningMatch[3]) {
    const topic = learningMatch[3].trim().toLowerCase();
    
    // Check if the topic is in our known topics
    let matchedTopic = '';
    let highestConfidence = 0;
    
    Object.keys(learningTopics).forEach(knownTopic => {
      if (topic.includes(knownTopic)) {
        const confidence = knownTopic.length / topic.length; // Simple confidence measure
        if (confidence > highestConfidence) {
          highestConfidence = confidence;
          matchedTopic = knownTopic;
        }
      }
    });
    
    if (matchedTopic) {
      return { 
        intent: 'learning_request', 
        topic: matchedTopic, 
        confidence: Math.max(0.7, highestConfidence) 
      };
    }
  }
  
  // Check for technical questions
  const techMatch = message.match(patterns.techQuery);
  if (techMatch && techMatch[2]) {
    const topic = techMatch[2].trim().toLowerCase();
    
    // Check if the topic matches any known topics
    let matchedTopic = '';
    let highestConfidence = 0;
    
    Object.keys(learningTopics).forEach(knownTopic => {
      if (topic.includes(knownTopic)) {
        const confidence = knownTopic.length / topic.length;
        if (confidence > highestConfidence) {
          highestConfidence = confidence;
          matchedTopic = knownTopic;
        }
      }
    });
    
    if (matchedTopic) {
      return { 
        intent: 'tech_question', 
        topic: matchedTopic, 
        confidence: Math.max(0.6, highestConfidence) 
      };
    }
  }
  
  // Default - general inquiry
  return { intent: 'general_inquiry', confidence: 0.5 };
};

// Generate response based on intent
export const generateResponse = (intent: string, topic?: string, previousMessages?: Message[]): string => {
  // Update conversation context based on the interaction
  if (topic && !conversationContext.previousTopics.includes(topic)) {
    conversationContext.previousTopics.push(topic);
    
    // Initialize skill level if not already set
    if (!conversationContext.userSkillLevels[topic]) {
      conversationContext.userSkillLevels[topic] = 'beginner';
    }
  }
  
  // Set current topic
  if (topic) {
    conversationContext.currentTopic = topic;
  }
  
  // Mark that we've had at least one interaction
  conversationContext.hasIntroducedSelf = true;
  conversationContext.lastInteractionTime = new Date();
  
  // Generate appropriate response based on intent
  switch (intent) {
    case 'greeting':
      return getGreetingResponse();
      
    case 'how_are_you':
      return getHowAreYouResponse();
      
    case 'thank_you':
      return getThankYouResponse();
      
    case 'fun_fact':
      return getFunFactResponse(topic);
      
    case 'learning_request':
      if (topic && topic in learningTopics) {
        return getLearningResponse(topic);
      }
      return getFallbackLearningResponse();
      
    case 'tech_question':
      if (topic && topic in learningTopics) {
        return getTechExplanationResponse(topic);
      }
      return getFallbackTechResponse();
      
    default:
      return getGeneralResponse();
  }
};

// Generate greeting response
const getGreetingResponse = (): string => {
  const greetings = [
    "Hello! 👋 How can I assist you with your learning journey today?",
    "Hi there! I'm excited to help you learn something new today. What would you like to explore?",
    "Hey! Welcome to SkillUp AI. What skills would you like to develop?",
    "Greetings! I'm here to help you expand your knowledge. What topic interests you?"
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// Generate "how are you" response
const getHowAreYouResponse = (): string => {
  const responses = [
    "I'm doing well and ready to help you learn something new! What topic would you like to explore today?",
    "I'm here and fully charged to assist with your learning goals! What's on your mind?",
    "I'm great, thanks for asking! I'm always excited to help someone on their learning journey. What can I help you with?",
    "I'm operating at 100% and eager to help you level up your skills! What would you like to learn about?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate thank you response
const getThankYouResponse = (): string => {
  const responses = [
    "You're welcome! 😊 Is there anything else you'd like to learn about?",
    "Happy to help! Remember, continuous learning is the key to growth. What's next on your learning agenda?",
    "My pleasure! If you have more questions, I'm here for you. Keep learning and growing!",
    "Glad I could help! " + motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate fun fact response
const getFunFactResponse = (topic?: string): string => {
  if (topic && topic in learningTopics && learningTopics[topic].funFacts) {
    // Return a topic-specific fun fact
    const facts = learningTopics[topic].funFacts;
    return `Here's a fun fact about ${topic}:\n\n${facts[Math.floor(Math.random() * facts.length)]}\n\nWould you like to know more about ${topic}?`;
  } else {
    // Return a general fun fact
    return `Here's a fun tech fact for you:\n\n${generalFunFacts[Math.floor(Math.random() * generalFunFacts.length)]}\n\nIs there a specific topic you'd like to learn about?`;
  }
};

// Generate learning response
const getLearningResponse = (topic: string): string => {
  const topicData = learningTopics[topic];
  
  // Check if user has already explored this topic
  const alreadyExplored = conversationContext.previousTopics.includes(topic);
  let skillLevel = conversationContext.userSkillLevels[topic] || 'beginner';
  
  let response = '';
  
  if (alreadyExplored) {
    // Personalized response for returning to a topic
    response += `Welcome back to ${topic}! 🌟 I see you've explored this before. `;
    
    if (skillLevel === 'beginner') {
      response += "Let's continue building your foundation.\n\n";
    } else if (skillLevel === 'intermediate') {
      response += "Ready to dive into more advanced concepts?\n\n";
    } else {
      response += "Let's focus on mastery and specialized techniques.\n\n";
    }
  } else {
    // First time exploring this topic
    response += `${topicData.intro}\n\n`;
  }
  
  // Add roadmap
  response += "**Learning Roadmap:**\n";
  if (skillLevel === 'beginner') {
    response += topicData.roadmap.slice(0, 3).join("\n") + "\n";
  } else if (skillLevel === 'intermediate') {
    response += topicData.roadmap.slice(1, 5).join("\n") + "\n";
  } else {
    response += topicData.roadmap.slice(3).join("\n") + "\n";
  }
  
  // Add resources
  response += "\n**Recommended Resources:**\n";
  const resources = topicData.resources.slice(0, 3).map(res => `- [${res.name}](${res.url})`).join("\n");
  response += resources;
  
  // Add follow-up prompt
  response += `\n\nWould you like more specific information about a particular aspect of ${topic}? Or would you prefer a beginner project to get started?`;
  
  return response;
};

// Fallback learning response
const getFallbackLearningResponse = (): string => {
  return "I'd be happy to help you learn! While I don't have specific information about that topic yet, I can suggest resources on popular areas like Python, JavaScript, Web Development, AI, Cybersecurity, or Soft Skills. Which of these interests you?";
};

// Generate technical explanation response
const getTechExplanationResponse = (topic: string): string => {
  const topicData = learningTopics[topic];
  
  let response = `Let me explain about ${topic}:\n\n${topicData.intro}\n\n`;
  
  // Add a key concept explanation
  response += "**Key Concepts:**\n";
  response += topicData.roadmap.slice(0, 3).join("\n") + "\n\n";
  
  // Add a recommended resource
  response += "**Recommended Resource to Learn More:**\n";
  const resource = topicData.resources[0];
  response += `[${resource.name}](${resource.url})\n\n`;
  
  // Add a fun fact if available
  if (topicData.funFacts && topicData.funFacts.length > 0) {
    response += `**Fun Fact:** ${topicData.funFacts[0]}\n\n`;
  }
  
  // Add follow-up prompt
  response += `Would you like to know more about ${topic} or explore a practical project idea?`;
  
  return response;
};

// Fallback technical response
const getFallbackTechResponse = (): string => {
  return "That's an interesting question! While I don't have specific information on that topic yet, I can help you with Python, JavaScript, Web Development, AI, Cybersecurity, or Soft Skills. Would you like to explore any of these areas?";
};

// Generate general response
const getGeneralResponse = (): string => {
  const responses = [
    "I'm here to help you learn new skills! Would you like to explore Python, JavaScript, Web Development, AI, Cybersecurity, or Soft Skills?",
    "I specialize in helping you learn technical and soft skills. What topic are you interested in exploring today?",
    "I can help you develop various skills through personalized learning paths. What would you like to learn about?",
    "Looking to learn something new? I can guide you through topics like programming, web development, AI, cybersecurity, and soft skills. What interests you?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Update user skill level based on interaction
export const updateSkillLevel = (topic: string): void => {
  if (topic in conversationContext.userSkillLevels) {
    const currentLevel = conversationContext.userSkillLevels[topic];
    
    // Simple progression logic - can be made more sophisticated
    if (currentLevel === 'beginner' && conversationContext.previousTopics.filter(t => t === topic).length > 3) {
      conversationContext.userSkillLevels[topic] = 'intermediate';
    } else if (currentLevel === 'intermediate' && conversationContext.previousTopics.filter(t => t === topic).length > 8) {
      conversationContext.userSkillLevels[topic] = 'advanced';
    }
  }
};

// Get the current conversation context
export const getContext = (): ConversationContext => {
  return { ...conversationContext };
};

// Reset conversation context (for logout, etc.)
export const resetContext = (): void => {
  conversationContext = {
    previousTopics: [],
    userSkillLevels: {},
    hasIntroducedSelf: false
  };
};
