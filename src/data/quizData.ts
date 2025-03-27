
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
  }
};

export default quizzes;
