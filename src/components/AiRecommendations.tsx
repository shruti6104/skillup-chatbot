
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
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
    type: 'skill-gap' | 'trending' | 'personalized' | 'challenge';
    priority: number;
  }>>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real application, this would call an AI service to generate personalized recommendations
    // Here we're just simulating with predefined logic
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
        'Augmented reality'
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
          break; // Just add one trending topic
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
      
      // Sort by priority and limit to 3
      return newRecommendations
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 3);
    };
    
    setRecommendations(generateRecommendations());
  }, [skillProgress, userStreak, topicsExplored]);
  
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
      default:
        return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const handleRecommendationClick = (recommendation: typeof recommendations[0]) => {
    onSelectRecommendation(recommendation.query);
    
    toast({
      title: "Great choice!",
      description: `Loading personalized content for "${recommendation.title}"`,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="text-cyber-purple w-4 h-4" />
        <h3 className="font-orbitron text-sm text-cyber-purple">AI Recommendations</h3>
      </div>
      
      {recommendations.length > 0 ? (
        recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="cursor-pointer"
            onClick={() => handleRecommendationClick(rec)}
          >
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getGradientForType(rec.type)} border border-white/10`}>
              <div className="flex items-center gap-2 mb-1">
                {getIconForType(rec.type)}
                <h4 className="text-sm font-medium">{rec.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{rec.reason}</p>
              <div className="flex justify-end">
                <Button size="sm" variant="ghost" className="h-7 text-xs flex items-center gap-1 bg-cyber-blue/20 hover:bg-cyber-blue/30">
                  Explore <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="p-3 rounded-lg bg-cyber-darker text-center">
          <p className="text-xs text-muted-foreground">Generating personalized recommendations...</p>
        </div>
      )}
    </div>
  );
};

export default AiRecommendations;
