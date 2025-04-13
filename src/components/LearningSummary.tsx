
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Target, Lightning } from 'lucide-react';

interface LearningSummaryProps {
  sessionTime: number; // in minutes
  topicsExplored: string[];
  lastTopic: string;
  messageCount: number;
}

const LearningSummary: React.FC<LearningSummaryProps> = ({ 
  sessionTime, 
  topicsExplored, 
  lastTopic,
  messageCount
}) => {
  // Calculate statistics
  const focusScore = Math.min(100, sessionTime * 5);
  const topicCount = topicsExplored.length;
  const efficiency = Math.min(100, messageCount > 0 ? (topicCount / messageCount) * 100 : 0);
  
  return (
    <div className="cyber-panel p-4 mb-6 animate-fade-in">
      <h3 className="font-orbitron text-lg mb-3 text-center cyber-gradient-text">Learning Summary</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="cyber-panel p-3 flex items-center">
          <div className="mr-3 p-2 rounded-full bg-cyber-blue/20">
            <Clock size={18} className="text-cyber-blue" />
          </div>
          <div>
            <div className="text-sm font-semibold">Session Time</div>
            <div className="flex items-center">
              <motion.div
                className="h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full mt-1"
                style={{ width: `${Math.min(100, sessionTime)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, sessionTime)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="ml-2 text-xs text-cyber-blue">{sessionTime}m</span>
            </div>
          </div>
        </div>
        
        <div className="cyber-panel p-3 flex items-center">
          <div className="mr-3 p-2 rounded-full bg-cyber-purple/20">
            <Brain size={18} className="text-cyber-purple" />
          </div>
          <div>
            <div className="text-sm font-semibold">Topics Explored</div>
            <div className="flex items-center">
              <motion.div
                className="h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full mt-1"
                style={{ width: `${Math.min(100, topicCount * 10)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, topicCount * 10)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="ml-2 text-xs text-cyber-purple">{topicCount}</span>
            </div>
          </div>
        </div>
        
        <div className="cyber-panel p-3 flex items-center">
          <div className="mr-3 p-2 rounded-full bg-cyber-pink/20">
            <Target size={18} className="text-cyber-pink" />
          </div>
          <div>
            <div className="text-sm font-semibold">Focus Score</div>
            <div className="flex items-center">
              <motion.div
                className="h-1 bg-gradient-to-r from-cyber-pink to-cyber-green rounded-full mt-1"
                style={{ width: `${focusScore}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${focusScore}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="ml-2 text-xs text-cyber-pink">{focusScore}%</span>
            </div>
          </div>
        </div>
        
        <div className="cyber-panel p-3 flex items-center">
          <div className="mr-3 p-2 rounded-full bg-cyber-green/20">
            <Lightning size={18} className="text-cyber-green" />
          </div>
          <div>
            <div className="text-sm font-semibold">Learning Efficiency</div>
            <div className="flex items-center">
              <motion.div
                className="h-1 bg-gradient-to-r from-cyber-green to-cyber-blue rounded-full mt-1"
                style={{ width: `${efficiency}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${efficiency}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="ml-2 text-xs text-cyber-green">{efficiency.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      {lastTopic && (
        <div className="mt-3 p-2 bg-cyber-darker/50 rounded-md text-center">
          <span className="text-xs">Currently learning: </span>
          <span className="text-cyber-blue font-semibold">{lastTopic}</span>
        </div>
      )}
    </div>
  );
};

export default LearningSummary;
