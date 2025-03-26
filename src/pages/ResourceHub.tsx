
import React, { useState } from 'react';
import { Code, Database, Cpu, Network, Book, Video, GraduationCap, Globe, School, Search, Filter, 
  ExternalLink, CheckCircle, DollarSign, Clock, Award, CheckSquare, User, LucideIcon, Briefcase, 
  Layout, Shield, Terminal, Github, BookOpen, Rocket, FileCode, FileText, Server } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import { ResourceItem } from '@/types/chat';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ResourceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [certFilter, setCertFilter] = useState<boolean>(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  
  const categories = [
    { id: 'all', name: 'All Categories', icon: <Filter size={16} /> },
    { id: 'webdev', name: 'Web Development', icon: <Globe size={16} /> },
    { id: 'python', name: 'Python', icon: <Code size={16} /> },
    { id: 'ai', name: 'AI & ML', icon: <Cpu size={16} /> },
    { id: 'security', name: 'Cybersecurity', icon: <Database size={16} /> },
    { id: 'softskills', name: 'Soft Skills', icon: <User size={16} /> },
    { id: 'datascience', name: 'Data Science', icon: <FileText size={16} /> },
  ];

  const resourceData: ResourceItem[] = [
    // Web Development Resources
    {
      id: '1',
      title: 'Python for Everybody',
      url: 'https://www.py4e.com/',
      platform: 'University of Michigan',
      category: 'python',
      difficulty: 'beginner',
      type: 'free',
      duration: '8 weeks',
      icon: <Code className="text-cyber-blue" size={18} />,
      description: 'A complete introduction to Python programming for beginners.',
      certification: true,
      rating: 4.8,
      tags: ['python', 'programming', 'beginner'],
      hasProjects: true
    },
    {
      id: '2',
      title: 'React - The Complete Guide',
      url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
      platform: 'Udemy',
      category: 'webdev',
      difficulty: 'intermediate',
      type: 'paid',
      duration: '40 hours',
      icon: <Globe className="text-cyber-green" size={18} />,
      description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and more!',
      certification: true,
      rating: 4.7,
      tags: ['react', 'javascript', 'frontend', 'redux'],
      hasProjects: true
    },
    {
      id: '3',
      title: 'Machine Learning Crash Course',
      url: 'https://developers.google.com/machine-learning/crash-course',
      platform: 'Google',
      category: 'ai',
      difficulty: 'intermediate',
      type: 'free',
      duration: '15 hours',
      icon: <Cpu className="text-cyber-pink" size={18} />,
      description: 'A self-study guide for aspiring machine learning practitioners.',
      certification: false,
      rating: 4.5,
      tags: ['machine learning', 'tensorflow', 'ai'],
      hasProjects: true
    },
    {
      id: '4',
      title: 'Web Security Academy',
      url: 'https://portswigger.net/web-security',
      platform: 'PortSwigger',
      category: 'security',
      difficulty: 'advanced',
      type: 'free',
      duration: 'Self-paced',
      icon: <Database className="text-cyber-purple" size={18} />,
      description: 'Free, online web security training from the creators of Burp Suite.',
      certification: false,
      rating: 4.9,
      tags: ['cybersecurity', 'web security', 'hacking'],
      hasProjects: true
    },
    {
      id: '5',
      title: 'Effective Communication',
      url: 'https://www.coursera.org/learn/effective-communication',
      platform: 'Coursera',
      category: 'softskills',
      difficulty: 'beginner',
      type: 'free',
      duration: '4 weeks',
      icon: <User className="text-cyber-blue" size={18} />,
      description: 'Learn how to communicate effectively in various business contexts.',
      certification: true,
      rating: 4.3,
      tags: ['communication', 'business', 'soft skills'],
      hasProjects: false
    },
    {
      id: '6',
      title: 'CS50: Introduction to Computer Science',
      url: 'https://cs50.harvard.edu/',
      platform: 'Harvard University',
      category: 'python',
      difficulty: 'intermediate',
      type: 'free',
      duration: '12 weeks',
      icon: <GraduationCap className="text-cyber-green" size={18} />,
      description: 'Harvard University\'s introduction to the intellectual enterprises of computer science.',
      certification: true,
      rating: 4.9,
      tags: ['cs50', 'computer science', 'programming'],
      hasProjects: true
    },
    // New resources based on user request
    {
      id: '7',
      title: 'The Odin Project',
      url: 'https://www.theodinproject.com/',
      platform: 'The Odin Project',
      category: 'webdev',
      difficulty: 'beginner',
      type: 'free',
      duration: 'Self-paced',
      icon: <Layout className="text-cyber-blue" size={18} />,
      description: "Full stack curriculum that's completely free and open source, with a focus on project-based learning.",
      certification: false,
      rating: 4.8,
      tags: ['web development', 'javascript', 'ruby', 'full-stack'],
      hasProjects: true
    },
    {
      id: '8',
      title: 'Fast.ai Practical Deep Learning',
      url: 'https://www.fast.ai/',
      platform: 'fast.ai',
      category: 'ai',
      difficulty: 'intermediate',
      type: 'free',
      duration: '7 weeks',
      icon: <Cpu className="text-cyber-pink" size={18} />,
      description: 'Making neural networks uncool again. Practical Deep Learning for Coders.',
      certification: false,
      rating: 4.9,
      tags: ['deep learning', 'pytorch', 'machine learning', 'neural networks'],
      hasProjects: true
    },
    {
      id: '9',
      title: 'Cybersecurity: TryHackMe',
      url: 'https://tryhackme.com/',
      platform: 'TryHackMe',
      category: 'security',
      difficulty: 'beginner',
      type: 'free',
      duration: 'Self-paced',
      icon: <Shield className="text-cyber-purple" size={18} />,
      description: 'Learn cybersecurity through hands-on exercises and labs in your browser.',
      certification: true,
      rating: 4.7,
      tags: ['ethical hacking', 'penetration testing', 'security'],
      hasProjects: true
    },
    {
      id: '10',
      title: 'Automate the Boring Stuff with Python',
      url: 'https://automatetheboringstuff.com/',
      platform: 'Al Sweigart',
      category: 'python',
      difficulty: 'beginner',
      type: 'free',
      duration: 'Self-paced',
      icon: <Terminal className="text-cyber-green" size={18} />,
      description: 'Learn Python programming through practical projects that automate everyday tasks.',
      certification: false,
      rating: 4.8,
      tags: ['python', 'automation', 'programming'],
      hasProjects: true
    },
    {
      id: '11',
      title: 'Leadership: Coursera Specialization',
      url: 'https://www.coursera.org/specializations/leadership-development',
      platform: 'Coursera',
      category: 'softskills',
      difficulty: 'intermediate',
      type: 'paid',
      duration: '3 months',
      icon: <Briefcase className="text-cyber-blue" size={18} />,
      description: 'Develop your leadership skills and build a strong foundation for business leadership and management.',
      certification: true,
      rating: 4.6,
      tags: ['leadership', 'management', 'soft skills'],
      hasProjects: false
    },
    {
      id: '12',
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/',
      platform: 'Mozilla',
      category: 'webdev',
      difficulty: 'all',
      type: 'free',
      duration: 'Reference',
      icon: <BookOpen className="text-cyber-green" size={18} />,
      description: 'Resources for developers, by developers. Comprehensive web development documentation.',
      certification: false,
      rating: 4.9,
      tags: ['html', 'css', 'javascript', 'web apis'],
      hasProjects: false
    },
    {
      id: '13',
      title: 'Google Machine Learning Bootcamp',
      url: 'https://developers.google.com/machine-learning/bootcamp',
      platform: 'Google Developers',
      category: 'ai',
      difficulty: 'advanced',
      type: 'free',
      duration: '6 months',
      icon: <Cpu className="text-cyber-pink" size={18} />,
      description: 'Comprehensive program to help developers build expertise in machine learning and enhance their career prospects.',
      certification: true,
      rating: 4.8,
      tags: ['tensorflow', 'machine learning', 'ai', 'certification'],
      hasProjects: true
    },
    {
      id: '14',
      title: 'Complete JavaScript Course',
      url: 'https://www.udemy.com/course/the-complete-javascript-course/',
      platform: 'Udemy',
      category: 'webdev',
      difficulty: 'beginner',
      type: 'paid',
      duration: '69 hours',
      icon: <FileCode className="text-cyber-blue" size={18} />,
      description: 'The most comprehensive JavaScript course. From zero to expert!',
      certification: true,
      rating: 4.7,
      tags: ['javascript', 'web development', 'programming'],
      hasProjects: true
    },
    {
      id: '15',
      title: 'Kaggle Learn',
      url: 'https://www.kaggle.com/learn',
      platform: 'Kaggle',
      category: 'datascience',
      difficulty: 'intermediate',
      type: 'free',
      duration: 'Self-paced',
      icon: <FileText className="text-cyber-green" size={18} />,
      description: 'Gain the skills you need to do independent data science projects through hands-on practice.',
      certification: true,
      rating: 4.6,
      tags: ['data science', 'machine learning', 'python'],
      hasProjects: true
    },
    {
      id: '16',
      title: 'Roadmap.sh',
      url: 'https://roadmap.sh/',
      platform: 'roadmap.sh',
      category: 'webdev',
      difficulty: 'all',
      type: 'free',
      duration: 'Reference',
      icon: <Rocket className="text-cyber-purple" size={18} />,
      description: 'Step by step guides and paths to learn different tools or technologies.',
      certification: false,
      rating: 4.9,
      tags: ['web development', 'devops', 'backend', 'frontend'],
      hasProjects: false
    },
    {
      id: '17',
      title: 'Next.js Foundations',
      url: 'https://nextjs.org/learn',
      platform: 'Vercel',
      category: 'webdev',
      difficulty: 'intermediate',
      type: 'free',
      duration: '5 hours',
      icon: <Server className="text-cyber-blue" size={18} />,
      description: 'Learn Next.js step-by-step, from the basics to advanced topics.',
      certification: false,
      rating: 4.8,
      tags: ['next.js', 'react', 'javascript', 'frontend'],
      hasProjects: true
    },
    {
      id: '18',
      title: 'Ethical Hacking Course',
      url: 'https://www.cybrary.it/course/ethical-hacking/',
      platform: 'Cybrary',
      category: 'security',
      difficulty: 'intermediate',
      type: 'free',
      duration: '16 hours',
      icon: <Shield className="text-cyber-purple" size={18} />,
      description: 'Learn the fundamentals of ethical hacking and penetration testing.',
      certification: true,
      rating: 4.5,
      tags: ['ethical hacking', 'penetration testing', 'cybersecurity'],
      hasProjects: true
    },
    {
      id: '19',
      title: 'Natural Language Processing Specialization',
      url: 'https://www.coursera.org/specializations/natural-language-processing',
      platform: 'Coursera',
      category: 'ai',
      difficulty: 'advanced',
      type: 'paid',
      duration: '4 months',
      icon: <Cpu className="text-cyber-pink" size={18} />,
      description: 'Build Natural Language Processing applications using deep learning models.',
      certification: true,
      rating: 4.7,
      tags: ['nlp', 'ai', 'deep learning', 'python'],
      hasProjects: true
    },
    {
      id: '20',
      title: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/',
      platform: 'freeCodeCamp',
      category: 'webdev',
      difficulty: 'beginner',
      type: 'free',
      duration: 'Self-paced',
      icon: <Github className="text-cyber-green" size={18} />,
      description: 'Learn to code for free. Build projects. Earn certifications.',
      certification: true,
      rating: 4.9,
      tags: ['web development', 'javascript', 'responsive design', 'algorithms'],
      hasProjects: true
    }
  ];

  // Apply filters
  const filteredResources = resourceData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          resource.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || resource.difficulty === difficultyFilter || resource.difficulty === 'all';
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesCert = certFilter ? resource.certification : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesCert;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner':
        return <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md">Beginner</span>;
      case 'intermediate':
        return <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-md">Intermediate</span>;
      case 'advanced':
        return <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md">Advanced</span>;
      default:
        return <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md">All Levels</span>;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <Header />
        
        <div className="cyber-panel p-6 mb-6">
          <h1 className="font-orbitron text-2xl mb-6 text-center cyber-gradient-text">Learning Resource Hub</h1>
          
          <div className="mb-6">
            <div className="cyber-panel p-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or skills..."
                  className="cyber-input w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === '/' && e.ctrlKey) {
                      e.preventDefault();
                      setShowCommandPalette(true);
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 mb-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`cyber-button text-sm flex items-center justify-center ${categoryFilter === category.id ? 'neon-glow' : ''}`}
                  onClick={() => setCategoryFilter(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="truncate">{category.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${difficultyFilter === 'all' ? 'bg-cyber-pink/20 border border-cyber-pink/40' : 'bg-cyber-darker'}`}
                onClick={() => setDifficultyFilter('all')}
              >
                <Filter size={12} className="mr-1" />
                All Levels
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${difficultyFilter === 'beginner' ? 'bg-green-500/20 border border-green-500/40' : 'bg-cyber-darker'}`}
                onClick={() => setDifficultyFilter(difficultyFilter === 'beginner' ? 'all' : 'beginner')}
              >
                Beginner
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${difficultyFilter === 'intermediate' ? 'bg-yellow-500/20 border border-yellow-500/40' : 'bg-cyber-darker'}`}
                onClick={() => setDifficultyFilter(difficultyFilter === 'intermediate' ? 'all' : 'intermediate')}
              >
                Intermediate
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${difficultyFilter === 'advanced' ? 'bg-red-500/20 border border-red-500/40' : 'bg-cyber-darker'}`}
                onClick={() => setDifficultyFilter(difficultyFilter === 'advanced' ? 'all' : 'advanced')}
              >
                Advanced
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${typeFilter === 'free' ? 'bg-cyber-green/20 border border-cyber-green/40' : 'bg-cyber-darker'}`}
                onClick={() => setTypeFilter(typeFilter === 'free' ? 'all' : 'free')}
              >
                <CheckCircle size={12} className="mr-1" />
                Free
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${typeFilter === 'paid' ? 'bg-cyber-purple/20 border border-cyber-purple/40' : 'bg-cyber-darker'}`}
                onClick={() => setTypeFilter(typeFilter === 'paid' ? 'all' : 'paid')}
              >
                <DollarSign size={12} className="mr-1" />
                Paid
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md flex items-center ${certFilter ? 'bg-cyber-blue/20 border border-cyber-blue/40' : 'bg-cyber-darker'}`}
                onClick={() => setCertFilter(!certFilter)}
              >
                <Award size={12} className="mr-1" />
                With Certification
              </button>
              <button
                className="px-3 py-1 text-xs rounded-md flex items-center bg-cyber-green/20 border border-cyber-green/40"
                onClick={() => {
                  setTypeFilter('free');
                  setDifficultyFilter('beginner');
                  setCategoryFilter('all');
                  setCertFilter(false);
                }}
              >
                <Rocket size={12} className="mr-1" />
                Perfect for Beginners
              </button>
              <button
                className="px-3 py-1 text-xs rounded-md flex items-center bg-cyber-purple/20 border border-cyber-purple/40"
                onClick={() => {
                  setTypeFilter('all');
                  setCategoryFilter('all');
                  setCertFilter(true);
                }}
              >
                <Award size={12} className="mr-1" />
                Career Focused
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <div key={resource.id} className="cyber-panel p-4 border border-cyber-darker hover:border-cyber-blue transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full cyber-border bg-cyber-darker flex items-center justify-center mr-3">
                        {resource.icon}
                      </div>
                      <div>
                        <h3 className="font-orbitron text-sm text-cyber-blue line-clamp-1">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground">{resource.platform}</p>
                      </div>
                    </div>
                    {resource.type === 'paid' && <DollarSign size={16} className="text-cyber-purple" />}
                  </div>
                  
                  <p className="text-xs mb-3 line-clamp-2 text-muted-foreground">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-cyber-darker px-2 py-0.5 rounded-full cursor-pointer hover:bg-cyber-blue/20"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    {getDifficultyBadge(resource.difficulty)}
                    
                    <div className="flex items-center text-xs">
                      {resource.duration && (
                        <span className="flex items-center mr-2">
                          <Clock size={12} className="mr-1 text-muted-foreground" />
                          {resource.duration}
                        </span>
                      )}
                      {resource.certification && (
                        <span className="flex items-center text-cyber-green">
                          <CheckSquare size={12} className="mr-1" />
                          Cert
                        </span>
                      )}
                      {resource.hasProjects && (
                        <span className="flex items-center text-cyber-pink ml-2">
                          <Code size={12} className="mr-1" />
                          Projects
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cyber-button w-full text-sm flex items-center justify-center neon-glow"
                  >
                    <ExternalLink size={14} className="mr-2" />
                    View Course
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <div className="text-lg font-orbitron text-muted-foreground mb-2">No resources found</div>
                <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {showCommandPalette && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCommandPalette(false)}>
              <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <Command className="border border-cyber-blue/50 bg-cyber-dark/90">
                  <CommandInput placeholder="Search for resources or topics..." />
                  <CommandList>
                    <CommandEmpty>No results found</CommandEmpty>
                    <CommandGroup heading="Categories">
                      {categories.map(category => (
                        <CommandItem 
                          key={category.id}
                          onSelect={() => {
                            setCategoryFilter(category.id);
                            setShowCommandPalette(false);
                          }}
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup heading="Quick Filters">
                      <CommandItem
                        onSelect={() => {
                          setTypeFilter('free');
                          setShowCommandPalette(false);
                        }}
                      >
                        <CheckCircle size={16} className="mr-2 text-cyber-green" />
                        Free Resources
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setCertFilter(true);
                          setShowCommandPalette(false);
                        }}
                      >
                        <Award size={16} className="mr-2 text-cyber-blue" />
                        With Certification
                      </CommandItem>
                      <CommandItem
                        onSelect={() => {
                          setTypeFilter('free');
                          setDifficultyFilter('beginner');
                          setShowCommandPalette(false);
                        }}
                      >
                        <Rocket size={16} className="mr-2 text-cyber-pink" />
                        Beginner Friendly
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
