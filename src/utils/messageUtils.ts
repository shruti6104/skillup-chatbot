
import { Message, LearningTopic, LearningResource } from '@/types/chat';

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
  learningRequest: /(learn|study|understand|master|teach me|explain|tutorial for|guide on|course|lesson|start with|resources for) (the )?(.*?)(\?|$|\.)/i,
  techQuery: /(what is|how to|explain|tell me about|define) ([a-z\s&-]+)(\?|$|\.)/i,
  thankYou: /(thank you|thanks|thx|ty|thank)/i,
  funFact: /(fun fact|tell me something interesting|interesting fact|did you know)/i
};

// Learning topics with resources and roadmaps
const learningTopics: {[key: string]: LearningTopic} = {
  python: {
    intro: "Python is one of the most versatile and beginner-friendly programming languages, widely used in web development, data science, AI, automation, and more. Its clear syntax and extensive libraries make it perfect for both beginners and professionals.",
    resources: [
      { 
        name: "Python.org Official Tutorials", 
        url: "https://docs.python.org/3/tutorial/",
        description: "Comprehensive documentation and tutorials from Python's official site",
        difficulty: "beginner",
        type: "documentation"
      },
      { 
        name: "Automate the Boring Stuff with Python", 
        url: "https://automatetheboringstuff.com/",
        description: "A practical programming course for office workers, academics, and administrators",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "Real Python", 
        url: "https://realpython.com/",
        description: "In-depth articles, tutorials, and courses on Python programming",
        difficulty: "intermediate",
        type: "tutorial"
      },
      { 
        name: "Codecademy Python Course", 
        url: "https://www.codecademy.com/learn/learn-python-3",
        description: "Interactive Python course with hands-on exercises",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "HackerRank Python Practice", 
        url: "https://www.hackerrank.com/domains/python",
        description: "Coding challenges to test and improve your Python skills",
        difficulty: "intermediate",
        type: "project"
      }
    ],
    roadmap: [
      "1️⃣ **Fundamentals**: Learn syntax, variables, data types, and basic operations",
      "2️⃣ **Core Concepts**: Master control flow, functions, modules, and error handling",
      "3️⃣ **Data Structures**: Understand lists, dictionaries, sets, and their operations",
      "4️⃣ **Advanced Topics**: Explore OOP, file I/O, decorators, and generators",
      "5️⃣ **Libraries**: Learn NumPy, Pandas, and Matplotlib for data analysis",
      "6️⃣ **Projects**: Build applications to apply your skills and create a portfolio"
    ],
    funFacts: [
      "Python was named after the comedy group Monty Python, not the snake!",
      "Python's philosophy emphasizes code readability with its significant use of whitespace.",
      "The Python Package Index (PyPI) contains over 300,000 packages you can install and use.",
      "Python was created by Guido van Rossum in the late 1980s and was first released in 1991.",
      "Python doesn't have braces {} to indicate blocks of code like many other languages do."
    ]
  },
  javascript: {
    intro: "JavaScript is the language of the web, essential for creating interactive websites and applications. It runs in all modern browsers and powers both frontend and backend development. With JavaScript, you can create dynamic content, validate forms, create animations, and build complex web applications.",
    resources: [
      { 
        name: "MDN Web Docs", 
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        description: "Comprehensive and beginner-friendly documentation from Mozilla",
        difficulty: "beginner",
        type: "documentation"
      },
      { 
        name: "JavaScript.info", 
        url: "https://javascript.info/",
        description: "Modern JavaScript tutorial with simple explanations and practical examples",
        difficulty: "beginner",
        type: "tutorial"
      },
      { 
        name: "freeCodeCamp JavaScript Course", 
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        description: "Free, interactive course covering all JavaScript fundamentals",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "Eloquent JavaScript", 
        url: "https://eloquentjavascript.net/",
        description: "A comprehensive book on JavaScript, programming, and the wonders of the digital world",
        difficulty: "intermediate",
        type: "documentation"
      },
      { 
        name: "JavaScript30", 
        url: "https://javascript30.com/",
        description: "30 Day Vanilla JS Coding Challenge with practical projects",
        difficulty: "intermediate",
        type: "project"
      }
    ],
    roadmap: [
      "1️⃣ **Basics**: Learn syntax, variables, data types, operators, and control flow",
      "2️⃣ **Core Concepts**: Master functions, arrays, objects, DOM manipulation, and events",
      "3️⃣ **Modern JS**: Explore ES6+ features, async/await, promises, and modules",
      "4️⃣ **Frameworks**: Learn popular frameworks like React, Vue, or Angular",
      "5️⃣ **Backend JS**: Develop with Node.js and Express for server-side applications",
      "6️⃣ **Full-stack Projects**: Connect frontend to backend services and build complete applications"
    ],
    funFacts: [
      "JavaScript was created in just 10 days by Brendan Eich in 1995 while working at Netscape.",
      "Despite the name similarity, JavaScript has no relation to Java. The name was chosen for marketing reasons.",
      "JavaScript is the only language that can run natively in browsers without plugins.",
      "The official name of JavaScript is ECMAScript, named after the ECMA International standards organization.",
      "JavaScript was initially created to make web pages 'alive' and is now used everywhere from browsers to servers, robots, and even space!"
    ]
  },
  "web development": {
    intro: "Web Development encompasses all the skills needed to build websites and web applications, from frontend design to backend functionality and databases. It's a versatile field that combines creativity with technical skills, allowing you to create everything from simple landing pages to complex web applications used by millions.",
    resources: [
      { 
        name: "MDN Web Docs", 
        url: "https://developer.mozilla.org/en-US/docs/Learn",
        description: "Comprehensive learning resource for web technologies",
        difficulty: "beginner",
        type: "documentation"
      },
      { 
        name: "freeCodeCamp", 
        url: "https://www.freecodecamp.org/",
        description: "Free courses covering HTML, CSS, JavaScript, and more with certificates",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "The Odin Project", 
        url: "https://www.theodinproject.com/",
        description: "Free, open-source coding curriculum with real-world projects",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "W3Schools", 
        url: "https://www.w3schools.com/",
        description: "Simple tutorials with examples and exercises for web technologies",
        difficulty: "beginner",
        type: "tutorial"
      },
      { 
        name: "CSS-Tricks", 
        url: "https://css-tricks.com/",
        description: "Articles, tutorials, and guides on all things CSS",
        difficulty: "intermediate",
        type: "tutorial"
      }
    ],
    roadmap: [
      "1️⃣ **HTML & CSS Basics**: Learn semantic HTML and CSS styling fundamentals",
      "2️⃣ **Responsive Design**: Master mobile-first approach, flexbox, grid, and media queries",
      "3️⃣ **JavaScript**: Add interactivity, DOM manipulation, and fetch API",
      "4️⃣ **Frontend Frameworks**: Learn React, Angular, or Vue for building complex UIs",
      "5️⃣ **Backend Development**: Develop with Node.js, Python, or PHP to create APIs and server logic",
      "6️⃣ **Databases**: Work with SQL or NoSQL databases to store and manage data",
      "7️⃣ **Deployment & DevOps**: Master hosting, CI/CD, version control, and performance optimization"
    ],
    funFacts: [
      "The first-ever website is still online at http://info.cern.ch/, created by Tim Berners-Lee in 1991.",
      "Over 1.7 billion websites exist today, but only about 200 million are active.",
      "The first web browser was called 'WorldWideWeb' and was both a browser and an editor.",
      "CSS was proposed by Håkon Wium Lie in 1994, but wasn't widely supported until the early 2000s.",
      "The average webpage size in 1995 was 14KB. Today, the average is over 2MB - an increase of over 14,000%."
    ]
  },
  "artificial intelligence": {
    intro: "Artificial Intelligence (AI) is a field of computer science focused on creating systems that can perform tasks that typically require human intelligence. These include visual perception, speech recognition, decision-making, and language translation. AI is transforming industries from healthcare to finance, creating new possibilities for automation and innovation.",
    resources: [
      { 
        name: "Elements of AI", 
        url: "https://www.elementsofai.com/",
        description: "Free online course covering the basics of AI without heavy mathematics",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "Google's Machine Learning Crash Course", 
        url: "https://developers.google.com/machine-learning/crash-course",
        description: "Fast-paced introduction to machine learning with TensorFlow",
        difficulty: "intermediate",
        type: "course"
      },
      { 
        name: "Fast.ai", 
        url: "https://www.fast.ai/",
        description: "Practical deep learning for coders with a top-down approach",
        difficulty: "intermediate",
        type: "course"
      },
      { 
        name: "Kaggle Learn", 
        url: "https://www.kaggle.com/learn",
        description: "Hands-on tutorials and competitions for data science and AI",
        difficulty: "intermediate",
        type: "tutorial"
      },
      { 
        name: "Stanford CS229 (Machine Learning)", 
        url: "https://see.stanford.edu/Course/CS229",
        description: "University-level course material from Stanford on machine learning",
        difficulty: "advanced",
        type: "course"
      }
    ],
    roadmap: [
      "1️⃣ **Prerequisites**: Learn Python programming and mathematics (Linear Algebra, Calculus, Statistics)",
      "2️⃣ **Machine Learning Basics**: Understand supervised, unsupervised learning, model evaluation, and feature engineering",
      "3️⃣ **Deep Learning**: Explore neural networks, CNNs for images, RNNs and Transformers for sequences",
      "4️⃣ **Frameworks & Tools**: Master TensorFlow, PyTorch, and data processing libraries",
      "5️⃣ **Specialized Areas**: Focus on NLP, Computer Vision, Reinforcement Learning, or other domains",
      "6️⃣ **Projects & Applications**: Build AI solutions for real-world problems and contribute to open source"
    ],
    funFacts: [
      "The term 'Artificial Intelligence' was first coined in 1956 at the Dartmouth Conference.",
      "The Turing Test, proposed by Alan Turing in 1950, is still used to evaluate a machine's ability to exhibit intelligent behavior.",
      "Deep Blue was the first computer to beat a world chess champion, defeating Garry Kasparov in 1997.",
      "GPT-3, an AI language model, has 175 billion parameters and can generate human-like text on almost any topic.",
      "The first AI program, the Logic Theorist, was created in 1956 and could prove mathematical theorems."
    ]
  },
  "cybersecurity": {
    intro: "Cybersecurity involves protecting systems, networks, and programs from digital attacks aimed at accessing, changing, or destroying sensitive information. As our world becomes increasingly digitized, the importance of cybersecurity continues to grow, offering exciting career opportunities and critical protection for everything from personal data to national infrastructure.",
    resources: [
      { 
        name: "TryHackMe", 
        url: "https://tryhackme.com/",
        description: "Learn cybersecurity through hands-on, gamified labs and challenges",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "Hack The Box", 
        url: "https://www.hackthebox.eu/",
        description: "Platform for practicing penetration testing and ethical hacking skills",
        difficulty: "intermediate",
        type: "project"
      },
      { 
        name: "Cybrary", 
        url: "https://www.cybrary.it/",
        description: "Free online cyber security training with courses for all skill levels",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "OWASP", 
        url: "https://owasp.org/",
        description: "Resources on web application security vulnerabilities and defenses",
        difficulty: "intermediate",
        type: "documentation"
      },
      { 
        name: "PortSwigger Web Security Academy", 
        url: "https://portswigger.net/web-security",
        description: "Free, hands-on labs teaching web security vulnerabilities",
        difficulty: "intermediate",
        type: "tutorial"
      }
    ],
    roadmap: [
      "1️⃣ **Fundamentals**: Learn networking basics, operating systems, and programming fundamentals",
      "2️⃣ **Security Concepts**: Understand the CIA triad, threat models, and common security controls",
      "3️⃣ **Tools & Skills**: Master essential tools like Kali Linux, Wireshark, Metasploit, and Burp Suite",
      "4️⃣ **Web Security**: Study the OWASP Top 10, secure coding practices, and common vulnerabilities",
      "5️⃣ **Specialized Areas**: Explore penetration testing, digital forensics, cryptography, or security architecture",
      "6️⃣ **Certifications & Practice**: Earn recognized certifications like CompTIA Security+, CEH, or OSCP"
    ],
    funFacts: [
      "The first computer worm released on the Internet, the Morris Worm, was created in 1988 by Robert Morris.",
      "It takes companies an average of 280 days to identify and contain a data breach.",
      "The most common password is still '123456', used by millions of accounts worldwide.",
      "The largest data breach in history affected Yahoo, exposing 3 billion user accounts in 2013.",
      "The cybersecurity industry is expected to have over 3.5 million unfilled jobs globally by 2025."
    ]
  },
  "soft skills": {
    intro: "Soft skills are non-technical abilities that relate to how you work and interact with others. They're essential for career success across all industries and complement technical skills. Strong soft skills enhance your ability to communicate effectively, work in teams, solve problems creatively, and adapt to changing situations, making you more valuable in any workplace.",
    resources: [
      { 
        name: "Coursera Soft Skills Courses", 
        url: "https://www.coursera.org/search?query=soft%20skills",
        description: "Various courses on communication, leadership, and interpersonal skills",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "LinkedIn Learning", 
        url: "https://www.linkedin.com/learning/",
        description: "Professional courses on soft skills with certificates",
        difficulty: "intermediate",
        type: "course"
      },
      { 
        name: "Toastmasters (Public Speaking)", 
        url: "https://www.toastmasters.org/",
        description: "Global organization helping people improve public speaking skills",
        difficulty: "beginner",
        type: "tool"
      },
      { 
        name: "Harvard Business Review", 
        url: "https://hbr.org/",
        description: "Articles and insights on leadership, communication, and workplace skills",
        difficulty: "intermediate",
        type: "documentation"
      },
      { 
        name: "MindTools", 
        url: "https://www.mindtools.com/",
        description: "Free resources for leadership, management, and personal effectiveness",
        difficulty: "beginner",
        type: "tutorial"
      }
    ],
    roadmap: [
      "1️⃣ **Communication**: Develop active listening, clear expression, and effective writing skills",
      "2️⃣ **Collaboration**: Practice teamwork, conflict resolution, and giving/receiving feedback",
      "3️⃣ **Problem-Solving**: Enhance critical thinking, creativity, and decision-making abilities",
      "4️⃣ **Adaptability**: Build flexibility, resilience, and openness to change",
      "5️⃣ **Leadership**: Cultivate motivation, delegation, and strategic thinking skills",
      "6️⃣ **Self-Management**: Master time management, stress management, and personal accountability"
    ],
    funFacts: [
      "According to LinkedIn, 57% of leaders say soft skills are more important than hard skills.",
      "The World Economic Forum identifies problem-solving as the #1 skill for the future of work.",
      "Studies show that teams with high emotional intelligence are 50% more productive.",
      "75% of career success depends on soft skills, while only 25% depends on technical knowledge.",
      "The ability to communicate effectively can increase team productivity by up to 25%."
    ]
  },
  "data science": {
    intro: "Data Science combines statistics, mathematics, programming, and domain knowledge to extract meaningful insights from data. It's a multidisciplinary field that uses scientific methods and algorithms to analyze complex data, identify patterns, and make predictions. Data scientists help organizations make data-driven decisions that can improve operations, customer experiences, and business outcomes.",
    resources: [
      { 
        name: "DataCamp", 
        url: "https://www.datacamp.com/",
        description: "Interactive courses on data science and analytics",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "Kaggle Learn", 
        url: "https://www.kaggle.com/learn",
        description: "Free courses on data science, machine learning, and visualization",
        difficulty: "beginner",
        type: "course"
      },
      { 
        name: "edX Data Science Courses", 
        url: "https://www.edx.org/learn/data-science",
        description: "University-level courses from institutions like MIT and Harvard",
        difficulty: "intermediate",
        type: "course"
      },
      { 
        name: "Towards Data Science", 
        url: "https://towardsdatascience.com/",
        description: "Medium publication with articles on all aspects of data science",
        difficulty: "intermediate",
        type: "documentation"
      },
      { 
        name: "UCI Machine Learning Repository", 
        url: "https://archive.ics.uci.edu/ml/index.php",
        description: "Repository of datasets for practicing data science skills",
        difficulty: "intermediate",
        type: "project"
      }
    ],
    roadmap: [
      "1️⃣ **Fundamentals**: Learn programming (Python/R), statistics, and mathematics",
      "2️⃣ **Data Analysis**: Master data cleaning, exploration, and visualization techniques",
      "3️⃣ **Machine Learning**: Understand algorithms, feature engineering, and model evaluation",
      "4️⃣ **Tools & Libraries**: Learn Pandas, NumPy, Scikit-learn, and visualization libraries",
      "5️⃣ **Big Data**: Explore technologies like SQL, NoSQL, Hadoop, and Spark",
      "6️⃣ **Applied Projects**: Build a portfolio of data science projects solving real problems"
    ],
    funFacts: [
      "The term 'Data Scientist' was only coined in 2008, making it a relatively new professional title.",
      "90% of the world's data has been created in just the last few years.",
      "Data scientists spend 80% of their time cleaning and preparing data, and only 20% analyzing it.",
      "Netflix saves approximately $1 billion per year through their recommendation system powered by data science.",
      "The average salary for data scientists is about 36% higher than other IT professionals."
    ]
  }
};

// Aliases to map similar topics to the main topics
const topicAliases: {[key: string]: string} = {
  "ai": "artificial intelligence",
  "machine learning": "artificial intelligence",
  "ml": "artificial intelligence",
  "deep learning": "artificial intelligence",
  "web dev": "web development",
  "webdev": "web development",
  "frontend": "web development",
  "backend": "web development",
  "html": "web development",
  "css": "web development",
  "javascript": "javascript",
  "js": "javascript",
  "react": "javascript",
  "node": "javascript",
  "python": "python",
  "py": "python",
  "django": "python",
  "flask": "python",
  "cybersecurity": "cybersecurity",
  "security": "cybersecurity",
  "hacking": "cybersecurity",
  "ethical hacking": "cybersecurity",
  "network security": "cybersecurity",
  "soft skills": "soft skills",
  "communication": "soft skills",
  "leadership": "soft skills",
  "teamwork": "soft skills",
  "data science": "data science",
  "data analysis": "data science",
  "big data": "data science"
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
  "60% of all online traffic is automated - meaning bots, not humans.",
  "The most expensive domain name ever sold was Cars.com for $872 million.",
  "The first computer programmer was a woman named Ada Lovelace in the 1840s."
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
  "The beautiful thing about learning is that nobody can take it away from you. - B.B. King",
  "Your most unhappy customers are your greatest source of learning. - Bill Gates",
  "Education is not the filling of a pail, but the lighting of a fire. - W.B. Yeats"
];

// Get the normalized topic from user input
const getNormalizedTopic = (topicInput: string): string | null => {
  const lowerTopic = topicInput.toLowerCase().trim();
  
  // Check direct match with main topics
  if (lowerTopic in learningTopics) {
    return lowerTopic;
  }
  
  // Check for aliases
  if (lowerTopic in topicAliases) {
    return topicAliases[lowerTopic];
  }
  
  // Check if topic is contained within any topic alias
  for (const [alias, mainTopic] of Object.entries(topicAliases)) {
    if (lowerTopic.includes(alias)) {
      return mainTopic;
    }
  }
  
  // Check if it's contained within any main topic
  for (const topic of Object.keys(learningTopics)) {
    if (lowerTopic.includes(topic)) {
      return topic;
    }
  }
  
  return null;
};

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
    const topicInput = learningMatch[3].trim();
    const normalizedTopic = getNormalizedTopic(topicInput);
    
    if (normalizedTopic) {
      return { 
        intent: 'learning_request', 
        topic: normalizedTopic, 
        confidence: 0.9 
      };
    }
  }
  
  // Check for technical questions
  const techMatch = message.match(patterns.techQuery);
  if (techMatch && techMatch[2]) {
    const topicInput = techMatch[2].trim();
    const normalizedTopic = getNormalizedTopic(topicInput);
    
    if (normalizedTopic) {
      return { 
        intent: 'tech_question', 
        topic: normalizedTopic, 
        confidence: 0.8 
      };
    }
  }
  
  // Try to extract topic from message directly if no pattern match
  for (const topic of Object.keys(learningTopics)) {
    if (message.toLowerCase().includes(topic)) {
      return {
        intent: 'learning_request',
        topic,
        confidence: 0.7
      };
    }
  }
  
  // Check for topics via aliases
  for (const [alias, mainTopic] of Object.entries(topicAliases)) {
    if (message.toLowerCase().includes(alias)) {
      return {
        intent: 'learning_request',
        topic: mainTopic,
        confidence: 0.7
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
  
  // The topic title with proper capitalization
  const topicTitle = topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  if (alreadyExplored) {
    // Personalized response for returning to a topic
    response += `Welcome back to ${topicTitle}! 🌟 I see you've explored this before. `;
    
    if (skillLevel === 'beginner') {
      response += "Let's continue building your foundation.\n\n";
    } else if (skillLevel === 'intermediate') {
      response += "Ready to dive into more advanced concepts?\n\n";
    } else {
      response += "Let's focus on mastery and specialized techniques.\n\n";
    }
  }
  
  // Main topic introduction
  response += `🔍 **${topicTitle}**: ${topicData.intro}\n\n`;
  
  // Add roadmap with emoji numbering
  response += "🚀 **Learning Roadmap:**\n";
  if (skillLevel === 'beginner') {
    response += topicData.roadmap.slice(0, 4).join("\n") + "\n";
  } else if (skillLevel === 'intermediate') {
    response += topicData.roadmap.slice(1, 5).join("\n") + "\n";
  } else {
    response += topicData.roadmap.slice(2).join("\n") + "\n";
  }
  
  // Add resources with emoji bullets
  response += "\n🎯 **Free Resources to Learn " + topicTitle + ":**\n";
  const resources = topicData.resources.slice(0, 3).map(res => `✅ [${res.name}](${res.url}) - ${res.description || 'Comprehensive resource for learning ' + topic}`).join("\n");
  response += resources;
  
  // Add a fun fact if available
  if (topicData.funFacts && topicData.funFacts.length > 0) {
    const randomFact = topicData.funFacts[Math.floor(Math.random() * topicData.funFacts.length)];
    response += `\n\n💡 **Fun Fact:** ${randomFact}`;
  }
  
  // Add follow-up prompt
  response += `\n\n📌 Would you like more specific information about a particular aspect of ${topic}? Or would you prefer project ideas to apply what you learn?`;
  
  return response;
};

// Fallback learning response
const getFallbackLearningResponse = (): string => {
  const topicList = Object.keys(learningTopics).map(topic => 
    topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  ).join(', ');
  
  return `I'd be happy to help you learn! While I don't have specific information about that topic yet, I can assist you with learning about: ${topicList}.\n\nWhich of these areas would you like to explore?`;
};

// Generate technical explanation response
const getTechExplanationResponse = (topic: string): string => {
  const topicData = learningTopics[topic];
  const topicTitle = topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  let response = `Let me explain about ${topicTitle}:\n\n${topicData.intro}\n\n`;
  
  // Add a key concept explanation
  response += "**Key Concepts:**\n";
  response += topicData.roadmap.slice(0, 3).join("\n") + "\n\n";
  
  // Add recommended resources
  response += "**Recommended Resources to Learn More:**\n";
  const resources = topicData.resources.slice(0, 2).map(res => `- [${res.name}](${res.url}) - ${res.description || 'Great resource for ' + topic}`).join("\n");
  response += resources + "\n\n";
  
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
  const topicList = Object.keys(learningTopics).map(topic => 
    topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  ).join(', ');
  
  return `That's an interesting question! While I don't have specific information on that topic yet, I can help you with: ${topicList}.\n\nWould you like to explore any of these areas?`;
};

// Generate general response
const getGeneralResponse = (): string => {
  const responses = [
    "I'm here to help you learn new skills! Would you like to explore Python, JavaScript, Web Development, Artificial Intelligence, Cybersecurity, or Soft Skills?",
    "I specialize in helping you learn technical and soft skills. What topic are you interested in exploring today?",
    "I can guide you through various learning paths with personalized resources. What skill would you like to develop?",
    "Looking to learn something new? I can help with programming, web development, AI, cybersecurity, data science, and soft skills. What interests you?"
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
