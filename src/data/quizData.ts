interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string | number;
  type: 'multiple-choice' | 'fill-in-blank';
}

interface Quiz {
  topic: string;
  badgeId: string;
  questions: Question[];
}

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
  }
};

export default quizzes;
