
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Copy, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MessageActionsProps {
  content: string;
  showActions: boolean;
  hasLiked: boolean;
  hasBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  content,
  showActions,
  hasLiked,
  hasBookmarked,
  onLike,
  onBookmark
}) => {
  const { toast } = useToast();
  
  const actionsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const actionItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(content);
      toast({
        title: "Text Copied",
        description: "Message copied to clipboard",
      });
    }
  };

  return (
    <AnimatePresence>
      {showActions && (
        <motion.div 
          className="mt-3 flex gap-2 justify-end"
          variants={actionsVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.button 
            onClick={onLike}
            className={`p-1 rounded-full ${hasLiked ? 'bg-cyber-blue/20 text-cyber-blue' : 'hover:bg-cyber-blue/10'}`}
            variants={actionItemVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title="Like"
          >
            <ThumbsUp size={14} />
          </motion.button>
          
          <motion.button 
            onClick={copyToClipboard}
            className="p-1 rounded-full hover:bg-cyber-blue/10"
            variants={actionItemVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title="Copy to clipboard"
          >
            <Copy size={14} />
          </motion.button>
          
          <motion.button 
            onClick={onBookmark}
            className={`p-1 rounded-full ${hasBookmarked ? 'bg-cyber-pink/20 text-cyber-pink' : 'hover:bg-cyber-blue/10'}`}
            variants={actionItemVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title="Save message"
          >
            <Bookmark size={14} />
          </motion.button>
          
          <motion.button 
            className="p-1 rounded-full hover:bg-cyber-blue/10"
            variants={actionItemVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title="Share"
          >
            <Share2 size={14} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageActions;
