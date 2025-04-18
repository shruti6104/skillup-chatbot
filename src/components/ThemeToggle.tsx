
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('skillup_theme') === 'dark' || 
        (!localStorage.getItem('skillup_theme') && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const { toast } = useToast();

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
      localStorage.setItem('skillup_theme', 'dark');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
      localStorage.setItem('skillup_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: !isDarkMode ? "Dark Mode Activated" : "Light Mode Activated",
      description: !isDarkMode ? "Easy on the eyes at night" : "Better visibility during day",
      duration: 2000,
    });
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-cyber-darker hover:bg-cyber-darker/80 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-cyber-blue" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
