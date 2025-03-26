
import React, { useEffect, useState } from 'react';
import { Brain, Zap, Award, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressPanelProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  badges: number;
  streak?: number;
  topics?: number;
  avgResponse?: number;
  rank?: number;
  messageCount?: number;
  skillProgress?: {[key: string]: number};
}

const ProgressPanel: React.FC<ProgressPanelProps> = ({ 
  level, 
  xp, 
  nextLevelXp, 
  badges,
  streak = 1,
  topics = 5,
  avgResponse = 0,
  rank = 42,
  messageCount = 0,
  skillProgress = { 'Python': 35, 'Web Dev': 20, 'AI': 15, 'Security': 10 }
}) => {
  const progressPercentage = Math.min(100, (xp / nextLevelXp) * 100);
  const calculatedAvgResponse = Math.min(98, Math.floor(60 + (xp / 2) + (streak * 2)));
  const displayedAvgResponse = avgResponse > 0 ? avgResponse : calculatedAvgResponse;
  
  return (
    <div className="cyber-panel p-4 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-orbitron text-lg flex items-center">
          <Brain size={20} className="text-cyber-blue mr-2 animate-pulse-glow" />
          Progress
        </h3>
        <div className="flex items-center">
          <Award size={18} className="text-cyber-pink mr-1" />
          <span className="text-cyber-pink font-bold">{badges}</span>
        </div>
      </div>
      
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-orbitron text-cyber-blue">Level {level}</span>
        <span className="text-muted-foreground">{xp}/{nextLevelXp} XP</span>
      </div>
      
      <div className="w-full h-3 bg-cyber-darker rounded-full mb-4 cyber-border">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center"
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage > 15 && (
            <span className="ml-2 text-xs font-bold">
              <Zap size={8} className="inline text-white mr-1" />
            </span>
          )}
        </div>
      </div>
      
      {/* Skill progress tracking */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Skills Progress</h4>
        {Object.entries(skillProgress).map(([skill, progress]) => (
          <div key={skill} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{skill}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-cyber-darker rounded-full">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cyber-green to-cyber-blue"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="cyber-panel p-2 text-center">
          <div className="text-xs text-muted-foreground">Topics</div>
          <div className="font-orbitron text-cyber-green text-lg">{topics}</div>
        </div>
        <div className="cyber-panel p-2 text-center">
          <div className="text-xs text-muted-foreground">Days Streak</div>
          <div className="font-orbitron text-cyber-purple text-lg">{streak}</div>
        </div>
        <div className="cyber-panel p-2 text-center">
          <div className="text-xs text-muted-foreground">Messages</div>
          <div className="font-orbitron text-cyber-blue text-lg">{messageCount}</div>
        </div>
        <div className="cyber-panel p-2 text-center">
          <div className="text-xs text-muted-foreground">Avg. Response</div>
          <div className="font-orbitron text-cyber-blue text-lg">{displayedAvgResponse}%</div>
          <div className="w-full mt-1">
            <Progress value={displayedAvgResponse} className="h-1 bg-cyber-darker" />
          </div>
        </div>
      </div>
      
      <button className="cyber-button w-full mt-3 text-sm flex items-center justify-center neon-glow">
        <BarChart2 size={16} className="mr-2" />
        View Analytics
      </button>
    </div>
  );
};

export default ProgressPanel;
