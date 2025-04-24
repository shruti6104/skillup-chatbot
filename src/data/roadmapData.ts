
export interface Resource {
  name: string;
  url: string;
  type: 'course' | 'tutorial' | 'documentation' | 'video' | 'practice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isFree: boolean;
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  resources: Resource[];
  prerequisites?: string[];
}

export interface Roadmap {
  category: string;
  icon: string;
  description: string;
  steps: RoadmapStep[];
}

// Common free resources that apply to multiple paths
const commonResources = {
  freeCodeCamp: {
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org',
    type: 'course',
    difficulty: 'beginner',
    isFree: true
  },
  w3schools: {
    name: 'W3Schools',
    url: 'https://www.w3schools.com',
    type: 'tutorial',
    difficulty: 'beginner',
    isFree: true
  },
} as const;

export const roadmaps: Record<string, Roadmap> = {
  python: {
    category: "Python Programming",
    icon: "🐍",
    description: "Master Python programming from basics to advanced concepts",
    steps: [
      {
        title: "Python Fundamentals",
        description: "Learn basic Python syntax, data types, and control structures",
        duration: "2-3 weeks",
        resources: [
          {
            name: "Python for Everybody (Coursera)",
            url: "https://www.coursera.org/specializations/python",
            type: "course",
            difficulty: "beginner",
            isFree: true
          },
          {
            name: "Python Documentation",
            url: "https://docs.python.org/3/",
            type: "documentation",
            difficulty: "beginner",
            isFree: true
          }
        ]
      },
      {
        title: "Object-Oriented Programming",
        description: "Master classes, objects, inheritance, and polymorphism",
        duration: "2-3 weeks",
        resources: [
          {
            name: "Real Python OOP Guide",
            url: "https://realpython.com/python3-object-oriented-programming/",
            type: "tutorial",
            difficulty: "intermediate",
            isFree: true
          }
        ],
        prerequisites: ["Python Fundamentals"]
      }
    ]
  },
  "data-science": {
    category: "Data Science",
    icon: "📊",
    description: "Learn data analysis, visualization, and statistical modeling",
    steps: [
      {
        title: "Data Analysis Fundamentals",
        description: "Learn Python libraries for data analysis (NumPy, Pandas)",
        duration: "4 weeks",
        resources: [
          {
            name: "Kaggle Learn",
            url: "https://www.kaggle.com/learn",
            type: "course",
            difficulty: "beginner",
            isFree: true
          }
        ]
      }
    ]
  },
  "artificial-intelligence": {
    category: "Artificial Intelligence",
    icon: "🤖",
    description: "Explore AI concepts, machine learning, and deep learning",
    steps: [
      {
        title: "AI Fundamentals",
        description: "Understanding basic AI concepts and applications",
        duration: "3-4 weeks",
        resources: [
          {
            name: "Elements of AI",
            url: "https://www.elementsofai.com/",
            type: "course",
            difficulty: "beginner",
            isFree: true
          }
        ]
      }
    ]
  },
  "web-development": {
    category: "Web Development",
    icon: "🌐",
    description: "Master modern web development technologies and frameworks",
    steps: [
      {
        title: "HTML & CSS Basics",
        description: "Learn the fundamentals of web structure and styling",
        duration: "2-3 weeks",
        resources: [
          commonResources.freeCodeCamp,
          commonResources.w3schools
        ]
      }
    ]
  },
  "machine-learning": {
    category: "Machine Learning",
    icon: "🧠",
    description: "Learn ML algorithms, models, and practical applications",
    steps: [
      {
        title: "ML Foundations",
        description: "Understanding basic ML concepts and algorithms",
        duration: "4 weeks",
        resources: [
          {
            name: "Google Machine Learning Crash Course",
            url: "https://developers.google.com/machine-learning/crash-course",
            type: "course",
            difficulty: "beginner",
            isFree: true
          }
        ]
      }
    ]
  },
  "soft-skills": {
    category: "Soft Skills",
    icon: "🤝",
    description: "Develop essential interpersonal and professional skills",
    steps: [
      {
        title: "Communication Skills",
        description: "Master effective communication in professional settings",
        duration: "Ongoing",
        resources: [
          {
            name: "Coursera - Improving Communication Skills",
            url: "https://www.coursera.org/learn/wharton-communication-skills",
            type: "course",
            difficulty: "beginner",
            isFree: true
          }
        ]
      }
    ]
  },
  "cybersecurity": {
    category: "Cybersecurity",
    icon: "🔒",
    description: "Learn security concepts, tools, and best practices",
    steps: [
      {
        title: "Security Fundamentals",
        description: "Understanding basic security concepts and threats",
        duration: "3-4 weeks",
        resources: [
          {
            name: "Cybersecurity Fundamentals",
            url: "https://www.edx.org/learn/cybersecurity",
            type: "course",
            difficulty: "beginner",
            isFree: true
          }
        ]
      }
    ]
  }
};
