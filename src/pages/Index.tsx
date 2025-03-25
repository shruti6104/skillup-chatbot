
import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Trophy, Brain } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import ProgressPanel from '@/components/ProgressPanel';
import SuggestedQueries from '@/components/SuggestedQueries';
import LoginForm from '@/components/LoginForm';
import ChatbotAvatar from '@/components/ChatbotAvatar';
import { toast } from '@/components/ui/use-toast';

// Sample responses for demo purposes
const sampleResponses: { [key: string]: string } = {
  default: "I'm SkillUp AI, your cybernetic learning companion. I can help you with programming, AI, data science, and more. What would you like to learn today?",
  "hello": "Hello! I'm SkillUp AI, your advanced learning assistant. How can I help you level up your skills today?",
  "who are you": "I'm SkillUp AI, an advanced artificial intelligence designed to help you learn new skills across various domains including programming, data science, AI, and more.",
  "explain python decorators": "Python decorators are a powerful feature that allows you to modify the behavior of functions or classes without directly changing their source code.\n\nIn essence, a decorator is a function that takes another function as an argument, extends its behavior, and returns the modified function. This is achieved using the `@decorator_name` syntax.\n\nHere's a simple example:\n\n```python\ndef my_decorator(func):\n    def wrapper():\n        print(\"Something is happening before the function is called.\")\n        func()\n        print(\"Something is happening after the function is called.\")\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print(\"Hello!\")\n\nsay_hello()\n```\n\nWhen executed, this will output:\n```\nSomething is happening before the function is called.\nHello!\nSomething is happening after the function is called.\n```\n\nDecorators are commonly used for:\n- Logging\n- Authentication\n- Timing functions\n- Caching\n- Validation\n\nYou can also create decorators that accept arguments, allowing for even more flexibility.",
  "what is sql injection": "SQL Injection is a type of security vulnerability that occurs when an attacker is able to interfere with the SQL queries that an application makes to its database.\n\nThe basic concept is simple: instead of providing valid data, an attacker submits SQL code that is unexpectedly executed by the database. This can allow attackers to:\n\n1. **Access unauthorized data**: View sensitive information they shouldn't have access to.\n2. **Modify database data**: Insert, update, or delete records.\n3. **Execute administrative operations**: Potentially shut down the database entirely.\n\nHere's a classic example:\n\nImagine a login form that constructs a query like this:\n```sql\nSELECT * FROM users WHERE username = 'input_username' AND password = 'input_password'\n```\n\nAn attacker might enter `' OR '1'='1` as the username, making the query:\n```sql\nSELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'anything'\n```\n\nSince `'1'='1'` is always true, this could return all users in the database, potentially allowing unauthorized access.\n\nTo prevent SQL injection:\n\n1. **Use prepared statements/parameterized queries**: These separate SQL code from data.\n2. **Implement input validation**: Reject suspicious input patterns.\n3. **Employ stored procedures**: Limit the operations that can be performed.\n4. **Apply the principle of least privilege**: Database accounts should have minimal permissions.\n\nSQL injection remains one of the most common web application vulnerabilities, highlighting the importance of secure coding practices.",
  "explain neural networks": "Neural networks are computational models inspired by the human brain that form the foundation of modern AI and deep learning.\n\nAt their core, neural networks consist of interconnected nodes (neurons) organized in layers:\n\n1. **Input Layer**: Receives the initial data (like pixel values in an image).\n2. **Hidden Layers**: Perform computations and feature extraction. Deep networks have multiple hidden layers.\n3. **Output Layer**: Produces the final result (like classification probabilities).\n\nEach connection between neurons has a weight, which determines its importance. As data flows through the network, each neuron:\n\n1. Receives inputs from the previous layer\n2. Applies weights to these inputs\n3. Sums them up\n4. Passes the sum through an activation function (like ReLU or sigmoid)\n5. Sends the result to the next layer\n\nThe magic of neural networks is in their training process:\n\n1. **Forward Pass**: Data moves through the network to generate an output\n2. **Error Calculation**: The difference between the output and the expected result is measured\n3. **Backpropagation**: The error is propagated backward through the network\n4. **Weight Adjustment**: Connection weights are updated to reduce error\n\nThis process repeats many times with training data, gradually improving the network's accuracy.\n\nNeural networks excel at tasks like:\n- Image and speech recognition\n- Natural language processing\n- Game playing\n- Pattern detection\n- Prediction and forecasting\n\nTheir power comes from their ability to automatically learn features from data without explicit programming.",
  "how to optimize react apps": "Optimizing React applications involves several strategies that target rendering efficiency, bundle size, and overall performance. Here are key techniques to make your React apps faster:\n\n1. **Use Production Builds**\n   - Always use production builds for deployment\n   - They're significantly smaller and faster than development builds\n\n2. **Component Optimization**\n   - Implement `React.memo()` for functional components that render often with the same props\n   - Use `shouldComponentUpdate` or extend `PureComponent` for class components\n   - Break down large components into smaller, focused ones\n\n3. **State Management**\n   - Keep state as local as possible\n   - Consider using Context API for shared state instead of prop drilling\n   - For complex apps, use efficient state managers like Redux with selectors\n\n4. **Virtualization for Long Lists**\n   - Use `react-window` or `react-virtualized` to render only visible items in long lists\n\n5. **Code Splitting**\n   - Split your code with `React.lazy()` and `Suspense`\n   - Import components dynamically when needed\n   ```jsx\n   const HeavyComponent = React.lazy(() => import('./HeavyComponent'));\n   ```\n\n6. **Bundle Optimization**\n   - Analyze your bundle with tools like Webpack Bundle Analyzer\n   - Remove unused dependencies\n   - Consider smaller alternatives to large libraries\n\n7. **Memoize Expensive Calculations**\n   - Use `useMemo()` for expensive calculations\n   - Use `useCallback()` for function references\n\n8. **Avoid Unnecessary Renders**\n   - Fix render cascades with proper component structure\n   - Batch state updates\n\n9. **Image Optimization**\n   - Lazy load images that are not in the viewport\n   - Use proper image sizes and formats (WebP when possible)\n   - Consider using next/image or similar optimized image components\n\n10. **Performance Monitoring**\n    - Use React DevTools Profiler to identify bottlenecks\n    - Implement performance monitoring in production\n\nImplementing these techniques will significantly improve your React application's performance and user experience."
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const STREAK_KEY = 'skillup_streak';
const LAST_LOGIN_KEY = 'skillup_last_login';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(25);
  const [userBadges, setUserBadges] = useState(2);
  const [userStreak, setUserStreak] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Calculate streak on login
  const calculateStreak = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const todayStr = today.toISOString();
    
    // Get last login date from localStorage
    const lastLoginStr = localStorage.getItem(LAST_LOGIN_KEY);
    const currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    
    let newStreak = 1; // Default to 1 if no previous streak
    
    if (lastLoginStr) {
      const lastLogin = new Date(lastLoginStr);
      lastLogin.setHours(0, 0, 0, 0); // Normalize to start of day
      
      // Calculate difference in days
      const timeDiff = today.getTime() - lastLogin.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      if (dayDiff === 1) {
        // Consecutive day, increment streak
        newStreak = currentStreak + 1;
        toast({
          title: "Streak Increased!",
          description: `You're on a ${newStreak}-day streak! Keep it up!`,
        });
      } else if (dayDiff === 0) {
        // Same day login, maintain streak
        newStreak = currentStreak;
      } else {
        // Streak broken
        if (currentStreak > 1) {
          toast({
            title: "Streak Reset",
            description: "Your streak has been reset. Start a new one today!",
          });
        }
        newStreak = 1;
      }
    } else {
      // First time login
      toast({
        title: "Streak Started!",
        description: "You've started your learning streak! Come back tomorrow to keep it going!",
      });
    }
    
    // Save updated streak and login date
    localStorage.setItem(STREAK_KEY, newStreak.toString());
    localStorage.setItem(LAST_LOGIN_KEY, todayStr);
    
    return newStreak;
  };

  useEffect(() => {
    // Add initial message if logged in
    if (isLoggedIn && messages.length === 0) {
      setTimeout(() => {
        const initialMessage: Message = {
          id: 'initial',
          role: 'assistant',
          content: sampleResponses.default,
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      }, 500);
    }
  }, [isLoggedIn, messages.length]);

  const handleLogin = () => {
    const streak = calculateStreak();
    setUserStreak(streak);
    setIsLoggedIn(true);
    
    // Show welcome toast
    toast({
      title: "Login Successful",
      description: "Welcome back to SkillUp AI",
    });
    
    // Play login success sound
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
    audio.volume = 0.2;
    audio.play();
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    // Finding response
    let botResponse = "I'm not sure how to respond to that yet. Can you try asking something else?";
    
    const lowercaseContent = content.toLowerCase();
    
    // Check for exact matches
    Object.entries(sampleResponses).forEach(([key, response]) => {
      if (lowercaseContent.includes(key)) {
        botResponse = response;
      }
    });
    
    // Simulate API delay
    setTimeout(() => {
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      
      // Add XP for interaction
      setUserXP(prev => {
        const newXP = prev + Math.floor(Math.random() * 5) + 3;
        
        // Level up if XP exceeds threshold
        if (newXP >= 100) {
          setUserLevel(prevLevel => prevLevel + 1);
          toast({
            title: "Level Up!",
            description: `You've reached Level ${userLevel + 1}!`,
          });
          
          // Maybe earn a badge
          if (Math.random() > 0.7) {
            setUserBadges(prev => prev + 1);
            toast({
              title: "New Badge Earned!",
              description: "You've earned a new achievement badge",
            });
          }
          
          return newXP - 100; // Reset XP after leveling up
        }
        
        return newXP;
      });
    }, 1000 + Math.random() * 1000);
  };

  const handleSelectQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {isLoggedIn ? (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
          <Header />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="text-center">
                <ChatbotAvatar />
                <h2 className="font-orbitron text-lg text-cyber-blue flex items-center justify-center mb-1">
                  <Brain size={20} className="mr-2" />
                  SkillUp AI
                </h2>
                <div className="flex items-center justify-center text-sm mb-4">
                  <div className="bg-cyber-green/20 text-cyber-green px-2 py-1 rounded-full flex items-center border border-cyber-green/20">
                    <span className="inline-block w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse"></span>
                    Online
                  </div>
                </div>
              </div>
              
              <ProgressPanel 
                level={userLevel}
                xp={userXP}
                nextLevelXp={100}
                badges={userBadges}
                streak={userStreak}
              />
              
              <SuggestedQueries onSelectQuery={handleSelectQuery} />
            </div>
            
            {/* Chat area */}
            <div className="lg:col-span-3 cyber-panel p-4 h-[calc(100vh-150px)] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 pr-1">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    animate={index === messages.length - 1 && message.role === 'assistant'} 
                  />
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 mb-4 p-3 rounded-lg bg-cyber-darker/60 animate-fade-in">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center cyber-border">
                        <Cpu size={18} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-orbitron text-sm mb-1 text-cyber-blue">SkillUp AI</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Index;
