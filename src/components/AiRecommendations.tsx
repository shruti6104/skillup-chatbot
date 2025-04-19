
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Sparkles, BookOpen, ArrowRight, MessageSquare, Brain, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AiRecommendationsProps {
  skillProgress: {[key: string]: number};
  userStreak: number;
  topicsExplored: string[];
  onSelectRecommendation: (topic: string) => void;
}

const AiRecommendations: React.FC<AiRecommendationsProps> = ({ 
  skillProgress, 
  userStreak, 
  topicsExplored,
  onSelectRecommendation 
}) => {
  const [recommendations, setRecommendations] = useState<Array<{
    id: string;
    title: string;
    query: string;
    reason: string;
    type: 'skill-gap' | 'trending' | 'personalized' | 'challenge' | 'advanced';
    priority: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading delay for better UX
    setIsLoading(true);
    const timer = setTimeout(() => {
      generateRecommendations();
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [skillProgress, userStreak, topicsExplored]);
  
  const generateRecommendations = () => {
    const newRecommendations = [];
    
    // Add skill gap recommendations
    const lowestSkill = Object.entries(skillProgress)
      .sort(([, a], [, b]) => a - b)[0];
    
    if (lowestSkill) {
      const [skillName, skillValue] = lowestSkill;
      
      if (skillValue < 30) {
        newRecommendations.push({
          id: 'skill-gap-1',
          title: `${skillName} Fundamentals`,
          query: `Teach me ${skillName} basics for beginners`,
          reason: `Improve your ${skillName} skills (currently ${skillValue}%)`,
          type: 'skill-gap',
          priority: 90 - skillValue
        });
      }
    }
    
    // Add personalized recommendation based on streak
    if (userStreak >= 3) {
      newRecommendations.push({
        id: 'streak-1',
        title: 'Advanced Learning Techniques',
        query: 'What are some advanced learning techniques to improve retention?',
        reason: `Based on your ${userStreak}-day learning streak`,
        type: 'personalized',
        priority: 80
      });
    }
    
    // Add trending topics that the user hasn't explored
    const trendingTopics = [
      'AI ethics', 
      'Quantum computing', 
      'Blockchain development', 
      'Augmented reality',
      'Machine Learning',
      'Cloud Computing',
      'Cybersecurity Fundamentals',
      'Data Science'
    ];
    
    for (let topic of trendingTopics) {
      if (!topicsExplored.some(t => t.toLowerCase().includes(topic.toLowerCase()))) {
        newRecommendations.push({
          id: `trending-${topic}`,
          title: topic,
          query: `Tell me about ${topic} and why it's important`,
          reason: 'Trending topic you haven\'t explored yet',
          type: 'trending',
          priority: 70
        });
        if (newRecommendations.filter(r => r.type === 'trending').length >= 2) {
          break; // Add up to 2 trending topics
        }
      }
    }
    
    // Add challenge based on highest skill
    const highestSkill = Object.entries(skillProgress)
      .sort(([, a], [, b]) => b - a)[0];
    
    if (highestSkill) {
      const [skillName, skillValue] = highestSkill;
      
      if (skillValue > 50) {
        newRecommendations.push({
          id: 'challenge-1',
          title: `${skillName} Challenge Project`,
          query: `Give me a challenging ${skillName} project to work on`,
          reason: 'Based on your strongest skill area',
          type: 'challenge',
          priority: 75
        });
      }
    }
    
    // Add advanced topics for well-rounded skills
    const avgSkillValue = Object.values(skillProgress).reduce((sum, val) => sum + val, 0) / 
                          Object.values(skillProgress).length;
                          
    if (avgSkillValue > 40) {
      const advancedTopics = [
        'System Design', 
        'Software Architecture', 
        'Microservices',
        'Distributed Systems'
      ];
      
      const randomIndex = Math.floor(Math.random() * advancedTopics.length);
      
      newRecommendations.push({
        id: `advanced-${advancedTopics[randomIndex]}`,
        title: `${advancedTopics[randomIndex]} Deep Dive`,
        query: `Explain ${advancedTopics[randomIndex]} concepts and best practices`,
        reason: 'Advanced topic to expand your knowledge',
        type: 'advanced',
        priority: 65
      });
    }
    
    // Add general knowledge topic
    const generalTopics = [
      'Critical Thinking', 
      'Problem Solving', 
      'Effective Communication',
      'Time Management'
    ];
    
    const randomGeneral = generalTopics[Math.floor(Math.random() * generalTopics.length)];
    
    newRecommendations.push({
      id: `general-${randomGeneral}`,
      title: randomGeneral,
      query: `How can I improve my ${randomGeneral.toLowerCase()} skills?`,
      reason: 'Essential skill for career growth',
      type: 'personalized',
      priority: 60
    });
    
    // Sort by priority and limit to 5
    const sortedRecommendations = newRecommendations
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5);
    
    setRecommendations(sortedRecommendations);
  };
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'skill-gap':
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'trending':
        return <Zap className="w-4 h-4 text-purple-400" />;
      case 'personalized':
        return <Lightbulb className="w-4 h-4 text-yellow-400" />;
      case 'challenge':
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'advanced':
        return <Brain className="w-4 h-4 text-green-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
    }
  };
  
  const getGradientForType = (type: string) => {
    switch(type) {
      case 'skill-gap':
        return 'from-cyan-500/20 to-blue-500/20';
      case 'trending':
        return 'from-purple-500/20 to-indigo-500/20';
      case 'personalized':
        return 'from-yellow-500/20 to-amber-500/20';
      case 'challenge':
        return 'from-pink-500/20 to-rose-500/20';
      case 'advanced':
        return 'from-green-500/20 to-emerald-500/20';
      default:
        return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const handleRecommendationClick = (recommendation: typeof recommendations[0]) => {
    if (onSelectRecommendation) {
      onSelectRecommendation(recommendation.query);
      
      toast({
        title: "Great choice!",
        description: `Loading personalized content for "${recommendation.title}"`,
      });
      
      // Track which category was clicked for analytics
      setActiveCategory(recommendation.type);
    }
  };
  
  const reloadRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      generateRecommendations();
      setIsLoading(false);
      
      toast({
        title: "Recommendations refreshed",
        description: "We've generated new personalized recommendations for you",
      });
    }, 800);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyber-purple w-4 h-4" />
          <h3 className="font-orbitron text-sm text-cyber-purple">AI Recommendations</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 rounded-full" 
          onClick={reloadRecommendations}
        >
          <motion.div 
            animate={isLoading ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </motion.div>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
              className="h-24 rounded-lg bg-cyber-darker/50 border border-cyber-border"
            />
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => handleRecommendationClick(rec)}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getGradientForType(rec.type)} border border-white/10`}>
                <div className="flex items-center gap-2 mb-1">
                  {getIconForType(rec.type)}
                  <h4 className="text-sm font-medium">{rec.title}</h4>
                  {rec.type === 'trending' && (
                    <span className="text-[10px] bg-cyber-purple/30 text-cyber-purple px-1.5 py-0.5 rounded-full">HOT</span>
                  )}
                  {rec.type === 'challenge' && (
                    <span className="text-[10px] bg-cyber-pink/30 text-cyber-pink px-1.5 py-0.5 rounded-full flex items-center">
                      <Trophy className="w-2 h-2 mr-0.5" /> XP
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{rec.reason}</p>
                <div className="flex justify-end">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs flex items-center gap-1 bg-cyber-blue/20 hover:bg-cyber-blue/30"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the parent onClick from firing
                      handleRecommendationClick(rec);
                    }}
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-cyber-darker text-center">
          <p className="text-xs text-muted-foreground">Generating personalized recommendations...</p>
        </div>
      )}
      
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs bg-cyber-blue/10 border border-cyber-blue/30 hover:bg-cyber-blue/20"
          onClick={() => onSelectRecommendation("What can you teach me today? I'm open to any suggestions.")}
        >
          <MessageSquare className="w-3 h-3 mr-1" /> Ask for anything
        </Button>
      </div>
      
      {activeCategory && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs text-center text-muted-foreground"
        >
          <Star className="w-3 h-3 inline mr-1 text-cyber-pink" />
          Based on your interests, we'll show more {activeCategory} recommendations
        </motion.div>
      )}
    </div>
  );
};

export default AiRecommendations;

