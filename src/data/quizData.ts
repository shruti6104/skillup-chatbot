import { Question, Quiz } from './quizTypes';

export const quizzes: Record<string, Quiz> = {
  python: {
    topic: 'Python',
    badgeId: 'python-beginner',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'What is the output of print(2**3)?',
        options: ['6', '8', '5', 'Error'],
        answer: '8',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'fun', 'define'],
        answer: 'def',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is NOT a Python data type?',
        options: ['List', 'Dictionary', 'Array', 'Tuple'],
        answer: 'Array',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What symbol is used for comments in Python?',
        type: 'fill-in-blank',
        answer: '#'
      },
      {
        id: 5,
        question: 'What function converts a string to an integer in Python?',
        type: 'fill-in-blank',
        answer: 'int'
      }
    ]
  },
  pythonadvanced: {
    topic: 'Python',
    badgeId: 'python-expert',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which of these is a Python decorator?',
        options: ['@property', '#classmethod', '$staticmethod', '&function'],
        answer: '@property',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What does the "with" statement in Python handle?',
        options: ['Exception handling', 'Resource management', 'Module importing', 'Loop control'],
        answer: 'Resource management',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which Python data structure uses key-value pairs?',
        options: ['List', 'Tuple', 'Dictionary', 'Set'],
        answer: 'Dictionary',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What Python function converts an object to an iterator?',
        type: 'fill-in-blank',
        answer: 'iter'
      },
      {
        id: 5,
        question: "What is the name of Python's package manager?",
        type: 'fill-in-blank',
        answer: 'pip'
      }
    ]
  },
  pythonexpert: {
    topic: 'Python',
    badgeId: 'python-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which design pattern uses a single class which represents the entire subsystem?',
        options: ['Builder', 'Factory', 'Facade', 'Singleton'],
        answer: 'Facade',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is a metaclass in Python?',
        options: [
          'A design pattern', 
          'A class that creates class objects', 
          'A type of exception',
          'A debugging tool'
        ],
        answer: 'A class that creates class objects',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which statement about Python GIL is correct?',
        options: [
          'It allows multiple threads to execute Python bytecode in parallel',
          'It is a security feature to prevent malicious code execution',
          'It allows only one thread to execute Python bytecode at a time',
          'It is used to manage memory allocation for large objects'
        ],
        answer: 'It allows only one thread to execute Python bytecode at a time',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What is the name of the protocol that allows Python objects to be serialized and deserialized?',
        type: 'fill-in-blank',
        answer: 'pickle'
      },
      {
        id: 5,
        question: 'What is the purpose of the __slots__ attribute in a Python class?',
        type: 'fill-in-blank',
        answer: 'memory optimization'
      }
    ]
  },
  webdev: {
    topic: 'Web Development',
    badgeId: 'web-explorer',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which HTML tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        answer: '<a>',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'Which CSS property is used to change the text color?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        answer: 'color',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'],
        answer: 'Cascading Style Sheets',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What symbol is used to start a CSS ID selector?',
        type: 'fill-in-blank',
        answer: '#'
      },
      {
        id: 5,
        question: 'Which JavaScript method is used to select an HTML element by its ID?',
        type: 'fill-in-blank',
        answer: 'getElementById'
      }
    ]
  },
  webdevadvanced: {
    topic: 'Web Development',
    badgeId: 'web-architect',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which pattern is commonly used for state management in React applications?',
        options: ['MVC', 'Redux', 'SOAP', 'REST'],
        answer: 'Redux',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is a web socket used for?',
        options: [
          'Connecting to electrical outlets', 
          'Real-time bidirectional communication', 
          'Storing cookies', 
          'Optimizing images'
        ],
        answer: 'Real-time bidirectional communication',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is a JavaScript framework?',
        options: ['Django', 'Flask', 'Vue', 'Ruby on Rails'],
        answer: 'Vue',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What technology allows you to write CSS with additional features like variables and nesting?',
        type: 'fill-in-blank',
        answer: 'sass'
      },
      {
        id: 5,
        question: 'What is the name of the Chrome tool used for debugging web applications?',
        type: 'fill-in-blank',
        answer: 'devtools'
      }
    ]
  },
  webdevexpert: {
    topic: 'Web Development',
    badgeId: 'web-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which of these is a performance optimization technique for JavaScript applications?',
        options: ['Code obfuscation', 'Tree shaking', 'Frequency analysis', 'Domain sharding'],
        answer: 'Tree shaking',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is a service worker used for in web applications?',
        options: [
          'To manage worker rights in an application',
          'To handle background tasks and offline capabilities',
          'To ensure web accessibility compliance',
          'To connect to third-party services'
        ],
        answer: 'To handle background tasks and offline capabilities',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which HTTP status code indicates a client-side error?',
        options: ['2XX', '3XX', '4XX', '5XX'],
        answer: '4XX',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What JavaScript API allows websites to store data persistently across sessions?',
        type: 'fill-in-blank',
        answer: 'indexeddb'
      },
      {
        id: 5,
        question: 'What web API lets you measure the performance of web pages and applications?',
        type: 'fill-in-blank',
        answer: 'performance api'
      }
    ]
  },
  ai: {
    topic: 'Artificial Intelligence',
    badgeId: 'ai-enthusiast',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which of these is a popular deep learning framework?',
        options: ['Django', 'TensorFlow', 'Express', 'Flask'],
        answer: 'TensorFlow',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What does ML stand for in AI?',
        options: ['Multiple Layers', 'Meta Language', 'Machine Learning', 'Module Library'],
        answer: 'Machine Learning',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is NOT a type of neural network?',
        options: ['CNN', 'RNN', 'DLL', 'GAN'],
        answer: 'DLL',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What algorithm is commonly used for classification problems?',
        type: 'fill-in-blank',
        answer: 'decision tree'
      },
      {
        id: 5,
        question: 'What does CNN stand for in deep learning?',
        type: 'fill-in-blank',
        answer: 'convolutional neural network'
      }
    ]
  },
  aiadvanced: {
    topic: 'Artificial Intelligence',
    badgeId: 'ai-specialist',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which type of learning doesn\'t require labeled data?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Transfer Learning'],
        answer: 'Unsupervised Learning',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is the purpose of backpropagation in neural networks?',
        options: [
          'To move data backwards through the network',
          'To update weights based on calculated error',
          'To prevent data leakage between layers',
          'To optimize the network architecture'
        ],
        answer: 'To update weights based on calculated error',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which algorithm is used for dimensionality reduction?',
        options: ['Random Forest', 'K-means', 'PCA', 'LSTM'],
        answer: 'PCA',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What technique helps prevent overfitting in neural networks?',
        type: 'fill-in-blank',
        answer: 'dropout'
      },
      {
        id: 5,
        question: 'What is the name of the technique that generates realistic synthetic data?',
        type: 'fill-in-blank',
        answer: 'gan'
      }
    ]
  },
  aiexpert: {
    topic: 'Artificial Intelligence',
    badgeId: 'ai-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which approach allows AI models to understand the context in text?',
        options: ['Bag of Words', 'TF-IDF', 'Word2Vec', 'Attention Mechanism'],
        answer: 'Attention Mechanism',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is the name of the algorithm that enables computers to play games through experience?',
        options: [
          'Monte Carlo Tree Search',
          'Alpha-Beta Pruning',
          'Q-Learning',
          'Minimax'
        ],
        answer: 'Q-Learning',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these describes a model that emulates another model\'s behavior?',
        options: ['Ensemble Learning', 'Transfer Learning', 'Knowledge Distillation', 'Imitation Learning'],
        answer: 'Knowledge Distillation',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What technique allows AI models to be more interpretable by highlighting important features?',
        type: 'fill-in-blank',
        answer: 'lime'
      },
      {
        id: 5,
        question: 'What is the name of the architecture powering large language models like GPT?',
        type: 'fill-in-blank',
        answer: 'transformer'
      }
    ]
  },
  cybersecurity: {
    topic: 'Cybersecurity',
    badgeId: 'cyber-guardian',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'What type of attack involves sending emails that appear to be from trusted sources?',
        options: ['DoS Attack', 'Man-in-the-Middle', 'Phishing', 'SQL Injection'],
        answer: 'Phishing',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What encryption standard is commonly used for secure web connections?',
        options: ['FTP', 'HTTP', 'HTTPS', 'SSH'],
        answer: 'HTTPS',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is NOT a common cybersecurity practice?',
        options: ['Using strong passwords', 'Regular updates', 'Sharing credentials', 'Using a firewall'],
        answer: 'Sharing credentials',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What does SQL stand for in "SQL Injection"?',
        type: 'fill-in-blank',
        answer: 'structured query language'
      },
      {
        id: 5,
        question: 'What type of security testing involves simulating attacks on a system?',
        type: 'fill-in-blank',
        answer: 'penetration testing'
      }
    ]
  },
  advancedcyber: {
    topic: 'Cybersecurity',
    badgeId: 'cyber-expert',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which encryption method uses different keys for encryption and decryption?',
        options: ['Symmetric', 'Asymmetric', 'Hashing', 'Salting'],
        answer: 'Asymmetric',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What security testing approach simulates real-world attacks on a system?',
        options: ['Vulnerability scanning', 'Penetration testing', 'Code review', 'Compliance audit'],
        answer: 'Penetration testing',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which security principle ensures only authorized users can access specific resources?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
        answer: 'Confidentiality',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What type of malware encrypts files and demands payment for decryption?',
        type: 'fill-in-blank',
        answer: 'ransomware'
      },
      {
        id: 5,
        question: 'What security framework developed by NIST provides guidelines for securing critical infrastructure?',
        type: 'fill-in-blank',
        answer: 'cybersecurity framework'
      }
    ]
  },
  cyberexpert: {
    topic: 'Cybersecurity',
    badgeId: 'cyber-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which attack exploits flaws in memory management?',
        options: ['XSS', 'CSRF', 'Buffer Overflow', 'Session Hijacking'],
        answer: 'Buffer Overflow',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is a hardware security module (HSM) primarily used for?',
        options: [
          'Network traffic monitoring',
          'Secure key management and cryptographic operations',
          'Password cracking prevention',
          'Physical access control'
        ],
        answer: 'Secure key management and cryptographic operations',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is a technique for detecting network intrusions?',
        options: ['Port knocking', 'Steganography', 'Anomaly detection', 'Code obfuscation'],
        answer: 'Anomaly detection',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What principle states that security should not depend solely on secrecy of implementation?',
        type: 'fill-in-blank',
        answer: 'kerckhoffs principle'
      },
      {
        id: 5,
        question: 'What cryptographic protocol provides perfect forward secrecy?',
        type: 'fill-in-blank',
        answer: 'diffie-hellman'
      }
    ]
  },
  softskills: {
    topic: 'Soft Skills',
    badgeId: 'knowledge-seeker',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which of these is NOT considered a soft skill?',
        options: ['Communication', 'Java Programming', 'Time Management', 'Teamwork'],
        answer: 'Java Programming',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is active listening?',
        options: [
          'Speaking loudly', 
          'Fully focusing on the speaker and understanding their message', 
          'Taking notes while listening', 
          'Interrupting to ask questions'
        ],
        answer: 'Fully focusing on the speaker and understanding their message',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which conflict resolution style involves finding a middle ground?',
        options: ['Avoiding', 'Competing', 'Compromising', 'Dominating'],
        answer: 'Compromising',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What type of intelligence relates to understanding and managing emotions?',
        type: 'fill-in-blank',
        answer: 'emotional intelligence'
      },
      {
        id: 5,
        question: 'What skill involves breaking down a complex task into manageable parts?',
        type: 'fill-in-blank',
        answer: 'organization'
      }
    ]
  },
  softskillsadvanced: {
    topic: 'Soft Skills',
    badgeId: 'soft-skills-expert',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which leadership style involves making decisions with team input?',
        options: ['Autocratic', 'Democratic', 'Laissez-faire', 'Transactional'],
        answer: 'Democratic',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is the primary purpose of a SWOT analysis?',
        options: [
          'To assess team performance',
          'To evaluate strategic position and planning',
          'To develop a marketing strategy',
          'To improve communication skills'
        ],
        answer: 'To evaluate strategic position and planning',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which negotiation approach focuses on mutual benefit?',
        options: ['Distributive bargaining', 'Integrative negotiation', 'Competitive negotiation', 'Aggressive bargaining'],
        answer: 'Integrative negotiation',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What term describes the ability to adapt to changing circumstances?',
        type: 'fill-in-blank',
        answer: 'flexibility'
      },
      {
        id: 5,
        question: 'What communication technique involves rephrasing what someone said to confirm understanding?',
        type: 'fill-in-blank',
        answer: 'reflective listening'
      }
    ]
  },
  softskillsexpert: {
    topic: 'Soft Skills',
    badgeId: 'soft-skills-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which psychological concept describes the tendency to prefer information that confirms existing beliefs?',
        options: ['Availability heuristic', 'Confirmation bias', 'Fundamental attribution error', 'Dunning-Kruger effect'],
        answer: 'Confirmation bias',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What leadership approach focuses on inspiring and motivating followers through vision and charisma?',
        options: [
          'Bureaucratic leadership',
          'Transactional leadership',
          'Transformational leadership',
          'Autocratic leadership'
        ],
        answer: 'Transformational leadership',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which conflict management strategy involves both parties giving up something to reach a solution?',
        options: ['Forcing', 'Accommodating', 'Compromising', 'Collaborating'],
        answer: 'Compromising',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What psychological concept refers to performing better in the presence of others?',
        type: 'fill-in-blank',
        answer: 'social facilitation'
      },
      {
        id: 5,
        question: 'What term describes the critical analysis of one\'s own thinking and learning processes?',
        type: 'fill-in-blank',
        answer: 'metacognition'
      }
    ]
  },
  communication: {
    topic: 'Communication Skills',
    badgeId: 'communication-pro',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which communication approach focuses on expressing yourself while respecting others?',
        options: ['Passive', 'Aggressive', 'Assertive', 'Manipulative'],
        answer: 'Assertive',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is active listening?',
        options: [
          'Waiting for your turn to speak', 
          'Fully focusing on the speaker and their message', 
          'Interrupting with questions', 
          'Taking detailed notes'
        ],
        answer: 'Fully focusing on the speaker and their message',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is NOT a component of nonverbal communication?',
        options: ['Eye contact', 'Body language', 'Memorization', 'Facial expressions'],
        answer: 'Memorization',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What skill refers to the ability to understand and manage your own emotions?',
        type: 'fill-in-blank',
        answer: 'emotional intelligence'
      },
      {
        id: 5,
        question: 'What term describes adjusting your communication style based on the audience?',
        type: 'fill-in-blank',
        answer: 'audience adaptation'
      }
    ]
  },
  communicationadvanced: {
    topic: 'Communication Skills',
    badgeId: 'communication-expert',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which persuasive appeal focuses on the credibility of the speaker?',
        options: ['Logos', 'Ethos', 'Pathos', 'Kairos'],
        answer: 'Ethos',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is the purpose of a stakeholder analysis in communication planning?',
        options: [
          'To determine project budget',
          'To identify and understand key audience groups',
          'To draft communication materials',
          'To schedule meetings efficiently'
        ],
        answer: 'To identify and understand key audience groups',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which communication model acknowledges the role of noise in message transmission?',
        options: ['Linear Model', 'Interactional Model', 'Shannon-Weaver Model', 'Constructionist Model'],
        answer: 'Shannon-Weaver Model',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What communication technique involves using stories to convey complex ideas?',
        type: 'fill-in-blank',
        answer: 'narrative'
      },
      {
        id: 5,
        question: 'What term describes the study of how physical space affects communication?',
        type: 'fill-in-blank',
        answer: 'proxemics'
      }
    ]
  },
  communicationexpert: {
    topic: 'Communication Skills',
    badgeId: 'communication-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which communication theory suggests that people make assumptions about others based on limited information?',
        options: ['Agenda-Setting Theory', 'Social Penetration Theory', 'Uncertainty Reduction Theory', 'Cultivation Theory'],
        answer: 'Uncertainty Reduction Theory',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is linguistic relativity?',
        options: [
          'The theory that language affects perception and thought',
          'The idea that all languages have equal complexity',
          'The concept that language evolves over time',
          'The study of language acquisition in children'
        ],
        answer: 'The theory that language affects perception and thought',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which rhetorical device involves the repetition of a word or phrase at the beginning of successive clauses?',
        options: ['Anaphora', 'Chiasmus', 'Antithesis', 'Hyperbole'],
        answer: 'Anaphora',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What communication concept refers to the idea that context gives meaning to words and actions?',
        type: 'fill-in-blank',
        answer: 'framing'
      },
      {
        id: 5,
        question: 'What term describes the process of managing public perception during a crisis?',
        type: 'fill-in-blank',
        answer: 'crisis communication'
      }
    ]
  },
  machinelearning: {
    topic: 'Machine Learning',
    badgeId: 'ml-practitioner',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which algorithm is commonly used for classification problems?',
        options: ['Linear Regression', 'Random Forest', 'K-means', 'PCA'],
        answer: 'Random Forest',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What does the term "overfitting" refer to in machine learning?',
        options: [
          'When a model performs well on training data but poorly on new data', 
          'When a model is too simple to capture patterns', 
          'When training takes too much computational power',
          'When the model is updated too frequently'
        ],
        answer: 'When a model performs well on training data but poorly on new data',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which of these is NOT a type of supervised learning?',
        options: ['Regression', 'Classification', 'Clustering', 'Ranking'],
        answer: 'Clustering',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What technique splits data into training and testing sets to evaluate model performance?',
        type: 'fill-in-blank',
        answer: 'cross validation'
      },
      {
        id: 5,
        question: 'What method helps prevent overfitting by adding a penalty term to the loss function?',
        type: 'fill-in-blank',
        answer: 'regularization'
      }
    ]
  },
  machinelearningadvanced: {
    topic: 'Machine Learning',
    badgeId: 'ml-expert',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which ensemble method combines predictions from multiple models by averaging?',
        options: ['Random Forest', 'Boosting', 'Bagging', 'Stacking'],
        answer: 'Bagging',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'Which of these is a gradient boosting framework?',
        options: [
          'PyTorch',
          'XGBoost',
          'Scikit-learn',
          'TensorFlow'
        ],
        answer: 'XGBoost',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'What technique is used for feature selection in machine learning?',
        options: ['Gradient descent', 'Backpropagation', 'SMOTE', 'Recursive Feature Elimination'],
        answer: 'Recursive Feature Elimination',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What algorithm is specifically designed for anomaly detection?',
        type: 'fill-in-blank',
        answer: 'isolation forest'
      },
      {
        id: 5,
        question: 'What technique is used to handle imbalanced datasets by creating synthetic samples?',
        type: 'fill-in-blank',
        answer: 'smote'
      }
    ]
  },
  machinelearningexpert: {
    topic: 'Machine Learning',
    badgeId: 'ml-master',
    difficulty: 'Expert',
    questions: [
      {
        id: 1,
        question: 'Which optimization algorithm adapts the learning rate during training?',
        options: ['SGD', 'Adam', 'Momentum', 'Batch Gradient Descent'],
        answer: 'Adam',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What is the purpose of Bayesian Optimization in machine learning?',
        options: [
          'To optimize neural network architectures',
          'To find optimal hyperparameters efficiently',
          'To speed up backpropagation',
          'To reduce model complexity'
        ],
        answer: 'To find optimal hyperparameters efficiently',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which technique allows training on data that cannot leave its location due to privacy concerns?',
        options: ['Distributed Learning', 'Transfer Learning', 'Federated Learning', 'Multi-task Learning'],
        answer: 'Federated Learning',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What statistical test is commonly used to detect concept drift in machine learning models?',
        type: 'fill-in-blank',
        answer: 'kolmogorov-smirnov'
      },
      {
        id: 5,
        question: 'What method combines multiple weak learners sequentially, with each correcting errors of previous ones?',
        type: 'fill-in-blank',
        answer: 'boosting'
      }
    ]
  },
  datascience: {
    topic: 'Data Science',
    badgeId: 'data-analyst',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which of these is NOT a commonly used Python library for data analysis?',
        options: ['Pandas', 'NumPy', 'Django', 'Matplotlib'],
        answer: 'Django',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What does SQL stand for in data science context?',
        options: ['Structured Query Language', 'Simple Question Language', 'Staged Query Lookup', 'Sequential Question Logic'],
        answer: 'Structured Query Language',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which type of visualization would be best for showing the relationship between two numerical variables?',
        options: ['Bar chart', 'Pie chart', 'Scatter plot', 'Histogram'],
        answer: 'Scatter plot',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What statistical measure represents the middle value in a dataset?',
        type: 'fill-in-blank',
        answer: 'median'
      },
      {
        id: 5,
        question: 'What technique is used to handle missing values in a dataset?',
        type: 'fill-in-blank',
        answer: 'imputation'
      }
    ]
  },
  datascienceadvanced: {
    topic: 'Data Science',
    badgeId: 'data-scientist',
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Which technique is used for finding patterns in high-dimensional data?',
        options: ['Linear regression', 'PCA', 'ANOVA', 'Chi-square test'],
        answer: 'PCA',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What statistical test would you use to compare means across multiple groups?',
        options: [
          't-test',
          'chi-square',
          'ANOVA',
          'Pearson correlation'
