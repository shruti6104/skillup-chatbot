
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, CheckCircle, Trophy, Star, Clock, ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface LearningPathProps {
  onSelectTopic: (topic: string) => void;
  skillProgress: {[key: string]: number};
}

interface PathModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  complete: boolean;
  locked: boolean;
  skillKey: string;
  xpReward: number;
}

const LearningPath: React.FC<LearningPathProps> = ({ onSelectTopic, skillProgress }) => {
  const [activePath, setActivePath] = useState<string>('python');
  const [modules, setModules] = useState<PathModule[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();
  
  // Path options
  const paths = [
    { id: 'python', name: 'Python Developer', color: 'bg-blue-500', icon: <Code className="w-4 h-4 text-blue-500" /> },
    { id: 'web', name: 'Web Developer', color: 'bg-green-500', icon: <Globe className="w-4 h-4 text-green-500" /> },
    { id: 'ai', name: 'AI Specialist', color: 'bg-purple-500', icon: <Brain className="w-4 h-4 text-purple-500" /> },
    { id: 'cyber', name: 'Cybersecurity', color: 'bg-red-500', icon: <Shield className="w-4 h-4 text-red-500" /> }
  ];

  // Generate path modules based on the selected path
  useEffect(() => {
    const generatePathModules = () => {
      let skillKey = 'Python';
      let modules = [];
      
      switch(activePath) {
        case 'python':
          skillKey = 'Python';
          modules = [
            { 
              id: 'py1', 
              title: 'Python Basics', 
              description: 'Variables, data types, and control flow', 
              duration: '3 hours', 
              complete: (skillProgress[skillKey] || 0) >= 20,
              locked: false,
              skillKey,
              xpReward: 50
            },
            { 
              id: 'py2', 
              title: 'Functions & OOP', 
              description: 'Define functions and create classes', 
              duration: '4 hours', 
              complete: (skillProgress[skillKey] || 0) >= 40,
              locked: (skillProgress[skillKey] || 0) < 20,
              skillKey,
              xpReward: 75
            },
            { 
              id: 'py3', 
              title: 'Data Structures', 
              description: 'Lists, dictionaries, sets, and tuples', 
              duration: '5 hours', 
              complete: (skillProgress[skillKey] || 0) >= 60,
              locked: (skillProgress[skillKey] || 0) < 40,
              skillKey,
              xpReward: 100
            },
            { 
              id: 'py4', 
              title: 'File I/O & Error Handling', 
              description: 'Working with files and exceptions', 
              duration: '3 hours', 
              complete: (skillProgress[skillKey] || 0) >= 80,
              locked: (skillProgress[skillKey] || 0) < 60,
              skillKey,
              xpReward: 125
            },
            { 
              id: 'py5', 
              title: 'Advanced Python', 
              description: 'Decorators, generators, context managers', 
              duration: '6 hours', 
              complete: (skillProgress[skillKey] || 0) >= 100,
              locked: (skillProgress[skillKey] || 0) < 80,
              skillKey,
              xpReward: 200
            },
          ];
          break;
          
        case 'web':
          skillKey = 'Web Dev';
          modules = [
            { 
              id: 'web1', 
              title: 'HTML Fundamentals', 
              description: 'Structure, semantic elements, forms', 
              duration: '2 hours', 
              complete: (skillProgress[skillKey] || 0) >= 20,
              locked: false,
              skillKey,
              xpReward: 50
            },
            { 
              id: 'web2', 
              title: 'CSS Styling', 
              description: 'Selectors, layout, responsive design', 
              duration: '4 hours', 
              complete: (skillProgress[skillKey] || 0) >= 40,
              locked: (skillProgress[skillKey] || 0) < 20,
              skillKey,
              xpReward: 75
            },
            { 
              id: 'web3', 
              title: 'JavaScript Basics', 
              description: 'Syntax, functions, DOM manipulation', 
              duration: '5 hours', 
              complete: (skillProgress[skillKey] || 0) >= 60,
              locked: (skillProgress[skillKey] || 0) < 40,
              skillKey,
              xpReward: 100
            },
            { 
              id: 'web4', 
              title: 'React Fundamentals', 
              description: 'Components, props, state management', 
              duration: '6 hours', 
              complete: (skillProgress[skillKey] || 0) >= 80,
              locked: (skillProgress[skillKey] || 0) < 60,
              skillKey,
              xpReward: 125
            },
            { 
              id: 'web5', 
              title: 'Full-Stack Development', 
              description: 'API integration, databases, authentication', 
              duration: '8 hours', 
              complete: (skillProgress[skillKey] || 0) >= 100,
              locked: (skillProgress[skillKey] || 0) < 80,
              skillKey,
              xpReward: 200
            },
          ];
          break;
          
        case 'ai':
          skillKey = 'AI';
          modules = [
            { 
              id: 'ai1', 
              title: 'AI Fundamentals', 
              description: 'Core concepts and terminology', 
              duration: '2 hours', 
              complete: (skillProgress[skillKey] || 0) >= 20,
              locked: false,
              skillKey,
              xpReward: 50
            },
            { 
              id: 'ai2', 
              title: 'Machine Learning Basics', 
              description: 'Supervised and unsupervised learning', 
              duration: '5 hours', 
              complete: (skillProgress[skillKey] || 0) >= 40,
              locked: (skillProgress[skillKey] || 0) < 20,
              skillKey,
              xpReward: 75
            },
            { 
              id: 'ai3', 
              title: 'Neural Networks', 
              description: 'Architecture and training methods', 
              duration: '6 hours', 
              complete: (skillProgress[skillKey] || 0) >= 60,
              locked: (skillProgress[skillKey] || 0) < 40,
              skillKey,
              xpReward: 100
            },
            { 
              id: 'ai4', 
              title: 'Deep Learning', 
              description: 'CNNs, RNNs, and transformers', 
              duration: '8 hours', 
              complete: (skillProgress[skillKey] || 0) >= 80,
              locked: (skillProgress[skillKey] || 0) < 60,
              skillKey,
              xpReward: 150
            },
            { 
              id: 'ai5', 
              title: 'Applied AI Projects', 
              description: 'Building end-to-end AI solutions', 
              duration: '10 hours', 
              complete: (skillProgress[skillKey] || 0) >= 100,
              locked: (skillProgress[skillKey] || 0) < 80,
              skillKey,
              xpReward: 200
            },
          ];
          break;
          
        case 'cyber':
          skillKey = 'Cybersecurity';
          modules = [
            { 
              id: 'sec1', 
              title: 'Security Fundamentals', 
              description: 'Core principles and threat actors', 
              duration: '3 hours', 
              complete: (skillProgress[skillKey] || 0) >= 20,
              locked: false,
              skillKey,
              xpReward: 50
            },
            { 
              id: 'sec2', 
              title: 'Network Security', 
              description: 'Protocols, firewalls, and VPNs', 
              duration: '4 hours', 
              complete: (skillProgress[skillKey] || 0) >= 40,
              locked: (skillProgress[skillKey] || 0) < 20,
              skillKey,
              xpReward: 75
            },
            { 
              id: 'sec3', 
              title: 'Application Security', 
              description: 'OWASP Top 10 and secure coding', 
              duration: '5 hours', 
              complete: (skillProgress[skillKey] || 0) >= 60,
              locked: (skillProgress[skillKey] || 0) < 40,
              skillKey,
              xpReward: 100
            },
            { 
              id: 'sec4', 
              title: 'Ethical Hacking', 
              description: 'Penetration testing methodology', 
              duration: '7 hours', 
              complete: (skillProgress[skillKey] || 0) >= 80,
              locked: (skillProgress[skillKey] || 0) < 60,
              skillKey,
              xpReward: 150
            },
            { 
              id: 'sec5', 
              title: 'Security Operations', 
              description: 'Incident response and threat hunting', 
              duration: '6 hours', 
              complete: (skillProgress[skillKey] || 0) >= 100,
              locked: (skillProgress[skillKey] || 0) < 80,
              skillKey,
              xpReward: 200
            },
          ];
          break;
      }
      
      setModules(modules);
      
      // Calculate overall progress for this path
      const totalModules = modules.length;
      const completeModules = modules.filter(m => m.complete).length;
      setOverallProgress(totalModules > 0 ? (completeModules / totalModules) * 100 : 0);
    };
    
    generatePathModules();
  }, [activePath, skillProgress]);

  const handleModuleClick = (module: PathModule) => {
    if (module.locked) {
      toast({
        title: "Module locked",
        description: "Complete previous modules to unlock this one",
        variant: "destructive"
      });
      return;
    }
    
    if (!module.complete) {
      onSelectTopic(`Tell me about ${module.title}`);
      
      // In a real app, this would track the progress of the specific module
      // Here we're just simulating by updating the local state
      if (Math.random() > 0.5) {
        toast({
          title: `Starting ${module.title}`,
          description: "Your personalized learning session is ready!",
        });
      }
    } else {
      onSelectTopic(`Review ${module.title}`);
      toast({
        title: "Module already completed",
        description: "You can review this material or move to the next module",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-orbitron text-sm text-cyber-blue">Learning Path</h3>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Progress:</span>
          <span className="font-semibold">{Math.round(overallProgress)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        {paths.map((path) => (
          <Button
            key={path.id}
            variant="outline"
            size="sm"
            className={`py-1 px-2 h-auto text-xs ${activePath === path.id ? path.color + '/20 border-' + path.color.replace('bg-', '') : 'bg-cyber-darker'}`}
            onClick={() => setActivePath(path.id)}
          >
            <div className="flex items-center gap-1">
              {path.icon}
              <span>{path.name}</span>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cyber-darker z-0"></div>
        <div className="space-y-3">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`pl-8 relative cursor-pointer ${module.locked ? 'opacity-50' : ''}`}
              onClick={() => handleModuleClick(module)}
            >
              {/* Status indicator */}
              <div className={`absolute left-3 top-2 w-2.5 h-2.5 rounded-full z-10 ${
                module.complete 
                  ? 'bg-green-500' 
                  : module.locked 
                    ? 'bg-gray-500' 
                    : 'bg-cyber-blue'
              }`}></div>
              
              <div className={`p-3 rounded-lg border ${
                module.complete 
                  ? 'border-green-500/30 bg-green-500/10' 
                  : module.locked 
                    ? 'border-gray-500/30 bg-gray-500/10' 
                    : 'border-cyber-blue/30 bg-cyber-blue/10'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      {module.title}
                      {module.complete && <CheckCircle className="w-3 h-3 text-green-500" />}
                    </h4>
                    <p className="text-xs text-muted-foreground">{module.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                      <Trophy className="w-3 h-3" />
                      <span>{module.xpReward} XP</span>
                    </div>
                  </div>
                </div>
                
                {!module.locked && !module.complete && (
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 bg-cyber-blue/20 hover:bg-cyber-blue/30">
                      Start <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;

// Missing imports
import { Code, Globe, Shield } from 'lucide-react';

