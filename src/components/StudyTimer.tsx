
import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

interface StudyTimerProps {
  onSessionComplete?: (duration: number) => void;
}

const StudyTimer: React.FC<StudyTimerProps> = ({ onSessionComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [focusLength, setFocusLength] = useState(25 * 60); // 25 minutes in seconds
  const [breakLength, setBreakLength] = useState(5 * 60); // 5 minutes in seconds
  const { toast } = useToast();

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          
          // Check if we reached the end of a focus or break session
          if (timerMode === 'focus' && newTime >= focusLength) {
            toast({
              title: "Focus Session Complete! 🎉",
              description: "Time for a well-deserved break.",
              duration: 5000,
            });
            setTimerMode('break');
            setIsActive(false);
            if (onSessionComplete) {
              onSessionComplete(focusLength);
            }
            return 0;
          } else if (timerMode === 'break' && newTime >= breakLength) {
            toast({
              title: "Break Complete",
              description: "Ready for another productive session?",
              duration: 5000,
            });
            setTimerMode('focus');
            setIsActive(false);
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timerMode, focusLength, breakLength, onSessionComplete, toast]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const progressPercentage = timerMode === 'focus' 
    ? (time / focusLength) * 100 
    : (time / breakLength) * 100;

  return (
    <div className="cyber-panel p-4 max-w-xs mx-auto">
      <h3 className="font-orbitron text-center text-lg mb-2">
        {timerMode === 'focus' ? 'Focus Session' : 'Break Time'}
      </h3>
      
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#2a2a40" 
            strokeWidth="8"
          />
          <motion.circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke={timerMode === 'focus' ? "#00a8ff" : "#ff5baf"}  
            strokeWidth="8"
            strokeDasharray="282.74"
            strokeDashoffset={282.74 - ((progressPercentage / 100) * 282.74)}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 282.74 }}
            animate={{ strokeDashoffset: 282.74 - ((progressPercentage / 100) * 282.74) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
          <Clock className="mr-1" size={14} />
          <span className="font-mono text-lg">{formatTime(timerMode === 'focus' ? focusLength - time : breakLength - time)}</span>
        </div>
      </div>
      
      <div className="flex justify-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleTimer}
          className={isActive ? "bg-red-500/20" : "bg-green-500/20"}
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleReset}
          disabled={time === 0}
          className="bg-blue-500/20"
        >
          <RefreshCw size={16} />
        </Button>
      </div>
    </div>
  );
};

export default StudyTimer;
