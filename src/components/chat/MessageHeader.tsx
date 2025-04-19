
import React from 'react';
import { Bot, Star, User } from 'lucide-react';

interface MessageHeaderProps {
  role: 'user' | 'assistant';
  timestamp: Date;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ role, timestamp }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex justify-between items-center mb-1">
      <div className="font-orbitron text-sm flex items-center">
        {role === 'assistant' ? (
          <span className="text-cyber-blue flex items-center">
            SkillUp AI
            <Star size={12} className="text-yellow-400 ml-1" />
          </span>
        ) : (
          <span className="text-cyber-purple">You</span>
        )}
      </div>
      <div className="text-xs text-gray-500">{formatTime(timestamp)}</div>
    </div>
  );
};

export default MessageHeader;
