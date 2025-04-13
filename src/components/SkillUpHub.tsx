
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicsSection from '@/components/TopicsSection';
import QuickLearningSection from '@/components/QuickLearningSection';
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
      <h2 className="font-orbitron text-xl mb-4 text-center cyber-gradient-text">Quick Learning Hub</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="topics" className="font-orbitron text-sm">Topics</TabsTrigger>
          <TabsTrigger 
            value="resources" 
            className="font-orbitron text-sm bg-cyber-blue text-black data-[state=active]:text-black data-[state=active]:bg-cyber-blue"
          >
            Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <TopicsSection onSelectTopic={handleTopicSelect} />
        </TabsContent>
        
        <TabsContent value="resources">
          <QuickLearningSection onSelectTopic={onSelectTopic} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillUpHub;
