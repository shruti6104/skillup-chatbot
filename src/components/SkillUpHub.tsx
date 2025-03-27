
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicsSection from '@/components/TopicsSection';
import topicResponses from '@/data/topicResponses';

interface SkillUpHubProps {
  onSelectTopic: (content: string) => void;
}

const SkillUpHub: React.FC<SkillUpHubProps> = ({ onSelectTopic }) => {
  const [activeTab, setActiveTab] = useState("topics");
  
  const handleTopicSelect = (topicId: string) => {
    // Add loading message first
    onSelectTopic("Fetching information about this topic...");
    
    // Simulate a short delay like an API call
    setTimeout(() => {
      const content = topicResponses[topicId] || "I don't have specific information about this topic yet, but I'd be happy to discuss it if you have questions!";
      onSelectTopic(content);
    }, 500);
  };
  
  return (
    <div className="cyber-panel p-4 mb-6">
      <h2 className="font-orbitron text-xl mb-4 text-center cyber-gradient-text">SkillUp Hub</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="topics" className="font-orbitron text-sm">Topics</TabsTrigger>
          <TabsTrigger value="resources" className="font-orbitron text-sm">Resources</TabsTrigger>
          <TabsTrigger value="paths" className="font-orbitron text-sm">Paths</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <TopicsSection onSelectTopic={handleTopicSelect} />
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Explore our curated learning resources in the Resources section.</p>
            
            <button 
              className="cyber-button mt-4 neon-glow"
              onClick={() => window.location.href = '/resources'}
            >
              View All Resources
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="paths">
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Learning paths coming soon! Stay tuned for guided learning journeys.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillUpHub;
