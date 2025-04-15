import { Question, Quiz } from './quizTypes';

export const quizzes: Record<string, Quiz> = {
  python: {
    topic: 'Python',
    badgeId: 'python-beginner',
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
  webdev: {
    topic: 'Web Development',
    badgeId: 'web-explorer',
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
  ai: {
    topic: 'Artificial Intelligence',
    badgeId: 'ai-enthusiast',
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
  cybersecurity: {
    topic: 'Cybersecurity',
    badgeId: 'cyber-guardian',
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
  softskills: {
    topic: 'Soft Skills',
    badgeId: 'knowledge-seeker',
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
  datascience: {
    topic: 'Data Science',
    badgeId: 'data-analyst',
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
  machinelearning: {
    topic: 'Machine Learning',
    badgeId: 'ml-practitioner',
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
  webdevadvanced: {
    topic: 'Advanced Web Development',
    badgeId: 'web-architect',
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
  communication: {
    topic: 'Communication Skills',
    badgeId: 'communication-pro',
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
  pythonadvanced: {
    topic: 'Advanced Python',
    badgeId: 'python-expert',
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
  deeplearning: {
    topic: 'Deep Learning',
    badgeId: 'deep-learning-specialist',
    questions: [
      {
        id: 1,
        question: 'Which of these is NOT a type of neural network?',
        options: ['CNN', 'RNN', 'DDN', 'GAN'],
        answer: 'DDN',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What does CNN stand for in deep learning?',
        options: ['Computer Neural Network', 'Convolutional Neural Network', 'Complex Neural Network', 'Cascading Neural Network'],
        answer: 'Convolutional Neural Network',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which activation function outputs values between 0 and 1?',
        options: ['ReLU', 'Sigmoid', 'Tanh', 'Leaky ReLU'],
        answer: 'Sigmoid',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What technique helps prevent overfitting in neural networks by randomly dropping neurons?',
        type: 'fill-in-blank',
        answer: 'dropout'
      },
      {
        id: 5,
        question: 'What optimization algorithm is commonly used to update neural network weights?',
        type: 'fill-in-blank',
        answer: 'gradient descent'
      }
    ]
  },
  fullstack: {
    topic: 'Full Stack Development',
    badgeId: 'full-stack-dev',
    questions: [
      {
        id: 1,
        question: 'Which of these is NOT typically considered part of the backend?',
        options: ['Database management', 'API development', 'CSS styling', 'Server configuration'],
        answer: 'CSS styling',
        type: 'multiple-choice'
      },
      {
        id: 2,
        question: 'What does API stand for?',
        options: ['Application Programming Interface', 'Advanced Program Integration', 'Application Protocol Interface', 'Automated Programming Input'],
        answer: 'Application Programming Interface',
        type: 'multiple-choice'
      },
      {
        id: 3,
        question: 'Which database type stores data in tables with rows and columns?',
        options: ['NoSQL', 'Graph', 'Relational', 'Document'],
        answer: 'Relational',
        type: 'multiple-choice'
      },
      {
        id: 4,
        question: 'What architectural pattern separates an application into Model, View, and Controller components?',
        type: 'fill-in-blank',
        answer: 'mvc'
      },
      {
        id: 5,
        question: 'What HTTP method is typically used to update an existing resource?',
        type: 'fill-in-blank',
        answer: 'put'
      }
    ]
  },
  advancedcyber: {
    topic: 'Advanced Cybersecurity',
    badgeId: 'cyber-expert',
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
  }
};

export default quizzes;
