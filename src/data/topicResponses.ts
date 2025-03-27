
export const topicResponses: Record<string, string> = {
  'python-decorators': `
# Python Decorators Explained

Decorators in Python are a powerful way to modify the behavior of functions or classes without directly changing their source code. They're essentially functions that wrap other functions.

## Basic Syntax

\`\`\`python
@decorator_function
def regular_function():
    pass
\`\`\`

This is equivalent to:

\`\`\`python
def regular_function():
    pass
regular_function = decorator_function(regular_function)
\`\`\`

## Simple Example

\`\`\`python
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Finished {func.__name__}")
        return result
    return wrapper

@log_function_call
def calculate_sum(a, b):
    return a + b

# When you call
calculate_sum(5, 3)
# Output:
# Calling calculate_sum
# Finished calculate_sum
# 8
\`\`\`

## Common Use Cases

1. Logging
2. Timing functions
3. Authentication/Authorization
4. Caching results
5. Input validation

Decorators are widely used in frameworks like Flask and Django for route definitions and authentication.
  `,
  
  'sql-injection': `
# SQL Injection Explained

SQL Injection is a code injection technique that exploits security vulnerabilities in an application's software by inserting malicious SQL statements into entry fields for execution.

## How It Works

Consider this vulnerable code:

\`\`\`sql
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
\`\`\`

If a malicious user enters this as username:
\`' OR '1'='1\`

The resulting query becomes:
\`\`\`sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'whatever'
\`\`\`

Since \`'1'='1'\` is always true, this can bypass authentication!

## Prevention Methods

1. **Parameterized Queries / Prepared Statements**
   \`\`\`python
   cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
   \`\`\`

2. **Input Validation**
   Validate user input to ensure it meets expected formats

3. **ORM (Object-Relational Mapping)**
   Using frameworks like SQLAlchemy or Django ORM

4. **Least Privilege**
   Limit database user permissions

5. **WAF (Web Application Firewall)**
   Filter common SQL injection patterns

## Impact

SQL Injection has been responsible for major data breaches at companies like Sony, Yahoo, and LinkedIn. It remains in the OWASP Top 10 Web Application Security Risks.
  `,
  
  'neural-networks': `
# Neural Networks Explained

Neural networks are computing systems inspired by the biological neural networks in animal brains. They're the foundation of many modern AI systems.

## Basic Structure

1. **Input Layer**: Receives initial data
2. **Hidden Layers**: Process information
3. **Output Layer**: Produces final results

Each layer contains nodes (neurons) connected to the next layer.

## How They Work

1. **Weights**: Each connection has a weight
2. **Activation**: Neurons "fire" based on input and activation function
3. **Training**: The network adjusts weights through backpropagation to minimize errors
4. **Prediction**: Once trained, the network can make predictions on new data

## Types of Neural Networks

1. **Feedforward Neural Networks**: The simplest form, data flows in one direction
2. **Convolutional Neural Networks (CNN)**: Specialized for image processing
3. **Recurrent Neural Networks (RNN)**: Have memory, good for sequential data
4. **Generative Adversarial Networks (GAN)**: Generate new data similar to training data
5. **Transformers**: Used in modern NLP (like GPT models)

## Real-World Applications

- Computer vision
- Natural language processing
- Game playing (AlphaGo)
- Autonomous vehicles
- Medical diagnosis
- Speech recognition

Neural networks power most of today's AI breakthroughs, from chatbots to image generation.
  `,
  
  'optimize-react': `
# How to Optimize React Apps

Optimizing React applications is crucial for enhancing user experience and reducing load times. Here are the most effective techniques:

## 1. Code Splitting

Break your application into smaller chunks to load only what's needed:

\`\`\`jsx
const MyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </React.Suspense>
  );
}
\`\`\`

## 2. Memoization

Prevent unnecessary re-renders with React.memo, useMemo, and useCallback:

\`\`\`jsx
// Component memoization
const MemoizedComponent = React.memo(ExpensiveComponent);

// Value memoization
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Function memoization
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

## 3. Virtual List Rendering

For long lists, only render visible items:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => <div style={style}>{items[index]}</div>;
  
  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

## 4. State Management Optimization

- Use local state for UI-only concerns
- Consider alternatives to Redux for simpler apps (Context API, Zustand, Jotai)
- Normalize data for complex state structures

## 5. Performance Tooling

- Use React DevTools Profiler to identify performance bottlenecks
- Lighthouse for overall web performance
- Bundle analyzers to track bundle size

## 6. Other Best Practices

- Use production builds (\`npm run build\`)
- Implement proper loading states and error boundaries
- Optimize images and assets
- Use web workers for CPU-intensive tasks
- Consider server-side rendering or static generation
  `,
  
  'python-for-ai': `
# Learning Python for AI: A Structured Path

Artificial Intelligence has transformed technology, and Python is the gateway. Here's how to learn Python specifically for AI:

## 1. Python Fundamentals (2-4 weeks)

- Variables, data types, and basic operations
- Control structures (if/else, loops)
- Functions and modules
- Error handling
- File operations

**Resources:**
- Codecademy Python course
- "Automate the Boring Stuff with Python" by Al Sweigart

## 2. Data Science Libraries (4-6 weeks)

- **NumPy**: Numerical operations and arrays
- **Pandas**: Data manipulation and analysis
- **Matplotlib/Seaborn**: Data visualization
- **Jupyter Notebooks**: Interactive development

**Resources:**
- DataCamp courses
- Python Data Science Handbook by Jake VanderPlas

## 3. Machine Learning Basics (6-8 weeks)

- **Scikit-learn**: ML algorithms implementation
- Linear/logistic regression
- Decision trees and random forests
- Clustering algorithms
- Model evaluation techniques

**Resources:**
- "Hands-On Machine Learning with Scikit-Learn" by Aurélien Géron
- Andrew Ng's Machine Learning course on Coursera

## 4. Deep Learning (8-12 weeks)

- **TensorFlow/Keras** or **PyTorch**
- Neural network architectures
- CNNs for computer vision
- RNNs and Transformers for NLP
- Reinforcement learning basics

**Resources:**
- Deep Learning Specialization on Coursera
- TensorFlow or PyTorch official tutorials
- "Deep Learning with Python" by François Chollet

## 5. Specialized AI Topics (Ongoing)

- Natural Language Processing
- Computer Vision
- Reinforcement Learning
- Generative AI
- MLOps and deployment

**Resources:**
- Hugging Face courses
- Papers With Code
- Fast.ai

## Practical Project Ideas

1. Build a simple image classifier
2. Create a sentiment analysis tool
3. Develop a recommendation system
4. Train a game-playing AI
5. Build a chatbot

Remember to balance theory with practical projects. The field evolves rapidly, so continuous learning is essential.
  `,
  
  'web-dev-courses': `
# Best Free Web Development Courses

Learning web development doesn't have to be expensive. Here are the best free resources to get you started:

## 1. The Odin Project
A comprehensive full-stack curriculum with JavaScript and Ruby paths.
**Highlights:**
- Project-based learning
- Active community
- Full-stack coverage (HTML, CSS, JavaScript, Node.js, Ruby on Rails)
- No registration required
**Link:** https://www.theodinproject.com/

## 2. freeCodeCamp
Interactive tutorials with certifications that cover everything from basics to advanced frameworks.
**Highlights:**
- Interactive coding challenges
- 6 comprehensive certifications
- Real-world projects
- Huge community
**Link:** https://www.freecodecamp.org/

## 3. MDN Web Docs
The definitive resource for web developers by Mozilla.
**Highlights:**
- Comprehensive documentation
- Beginner to advanced tutorials
- Browser compatibility details
- Interactive examples
**Link:** https://developer.mozilla.org/

## 4. CS50's Web Programming
Harvard's famous course on web development with Python and JavaScript.
**Highlights:**
- University-level education
- Covers both front-end and back-end
- Project assignments
- Taught by David Malan
**Link:** https://cs50.harvard.edu/web/

## 5. Full Stack Open
Modern web development with React, Redux, Node.js, MongoDB, and GraphQL.
**Highlights:**
- Modern tech stack
- Industry-relevant skills
- DevOps and testing coverage
- University of Helsinki course
**Link:** https://fullstackopen.com/en/

## 6. Codecademy (Free Courses)
Interactive platform with many free courses.
**Highlights:**
- Interactive learning environment
- Immediate feedback
- Well-structured curriculum
- Some free certificates
**Link:** https://www.codecademy.com/

## Study Tips
- Build projects alongside tutorials
- Contribute to open source
- Join web development communities (Reddit, Discord)
- Create a portfolio to showcase your work
- Use Git/GitHub from the beginning
  `,
  
  'cybersecurity-start': `
# How to Get Started with Cybersecurity

Cybersecurity is an exciting and expanding field. Here's how to begin your journey:

## Understanding the Landscape

Cybersecurity encompasses several domains:
- Network Security
- Application Security
- Information Security
- Operational Security
- Disaster Recovery
- End-user Education

## Learning Path

### 1. Build Fundamental Knowledge (1-3 months)
- Basic networking concepts (TCP/IP, DNS, HTTP)
- Operating systems fundamentals (Windows, Linux)
- Basic programming concepts
- Cryptography basics

**Resources:**
- CompTIA Network+ study materials
- Linux Basics for Hackers (book)
- Professor Messer's YouTube channel

### 2. Hands-on Practice (3-6 months)
- TryHackMe rooms for beginners
- HackTheBox starting point
- CyberDefenders for blue team practice
- Set up a home lab with virtual machines

**Tools to learn:**
- Wireshark for network analysis
- Nmap for network scanning
- Metasploit basics
- Burp Suite Community Edition

### 3. Specialized Learning (6+ months)
Choose a specialization:
- Penetration Testing
- Security Operations
- Application Security
- Digital Forensics
- Cloud Security

### 4. Certifications to Consider
Entry-level:
- CompTIA Security+
- eJPT (eLearnSecurity Junior Penetration Tester)

Intermediate:
- CEH (Certified Ethical Hacker)
- OSCP (Offensive Security Certified Professional)
- CISSP (Certified Information Systems Security Professional)

## Free Learning Resources

1. **TryHackMe** - Interactive learning platform
2. **CyberDefenders** - Blue team challenges
3. **PortSwigger Web Security Academy** - Web security training
4. **OWASP** - Web application security resources
5. **Cybrary** - Free courses on various security topics

## Building a Career

- Participate in CTF competitions
- Contribute to open-source security tools
- Network with professionals (Twitter, LinkedIn, Discord)
- Read security blogs and news
- Start a security blog to document your learning

Remember: Ethics are paramount in cybersecurity. Always practice legally and responsibly.
  `
};

export default topicResponses;
