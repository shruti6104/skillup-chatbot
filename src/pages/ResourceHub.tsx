
import React, { useState } from 'react';
import { Code, Database, Cpu, Network, Book, Video, GraduationCap, Globe, School, Search, Filter, 
  ExternalLink, CheckCircle, DollarSign, Clock, Award, CheckSquare, User, LucideIcon } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';

interface ResourceItem {
  id: string;
  title: string;
  url: string;
  platform: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all';
  type: 'free' | 'paid';
  duration?: string;
  icon: React.ReactNode;
  description: string;
  certification?: boolean;
  rating?: number;
  tags: string[];
}

const ResourceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Categories', icon: <Filter size={16} /> },
    { id: 'webdev', name: 'Web Development', icon: <Globe size={16} /> },
    { id: 'python', name: 'Python', icon: <Code size={16} /> },
    { id: 'ai', name: 'AI & ML', icon: <Cpu size={16} /> },
    { id: 'security', name: 'Cybersecurity', icon: <Database size={16} /> },
    { id: 'softskills', name: 'Soft Skills', icon: <User size={16} /> },
  ];

  const resourceData: ResourceItem[] = [
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
      tags: ['python', 'programming', 'beginner']
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
      tags: ['react', 'javascript', 'frontend', 'redux']
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
      tags: ['machine learning', 'tensorflow', 'ai']
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
      tags: ['cybersecurity', 'web security', 'hacking']
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
      tags: ['communication', 'business', 'soft skills']
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
      tags: ['cs50', 'computer science', 'programming']
    }
  ];

  // Apply filters
  const filteredResources = resourceData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || resource.difficulty === difficultyFilter;
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
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
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
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
            
            <div className="flex flex-wrap gap-2">
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
                className={`px-3 py-1 text-xs rounded-md flex items-center ${typeFilter === 'certification' ? 'bg-cyber-blue/20 border border-cyber-blue/40' : 'bg-cyber-darker'}`}
                onClick={() => setTypeFilter(typeFilter === 'certification' ? 'all' : 'certification')}
              >
                <Award size={12} className="mr-1" />
                With Certification
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
                      <span key={idx} className="text-xs bg-cyber-darker px-2 py-0.5 rounded-full">
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
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
