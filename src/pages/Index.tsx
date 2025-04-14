
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Brain, MessageSquare } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('skillup_isLoggedIn') === 'true';
    if (isUserLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    
    localStorage.setItem('skillup_isLoggedIn', 'true');
    localStorage.setItem('skillup_session_start', Date.now().toString());
    
    toast({
      title: "Login Successful",
      description: "Welcome back to SkillUp AI",
    });
    
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {isLoggedIn ? (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
          <Header />
          
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="cyber-panel p-8 max-w-4xl mx-auto"
            >
              <motion.div 
                className="text-4xl font-orbitron cyber-gradient-text mb-6"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(0, 168, 255, 0.5)",
                    "0 0 15px rgba(0, 168, 255, 0.8)",
                    "0 0 5px rgba(0, 168, 255, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Welcome to SkillUp AI
              </motion.div>
              
              <p className="text-lg mb-8">
                Your interactive learning platform powered by artificial intelligence. 
                Explore topics, earn badges, and level up your knowledge!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div 
                  className="cyber-panel p-4 flex flex-col items-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 168, 255, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Brain className="text-cyber-blue mb-3" size={40} />
                  <h3 className="text-lg font-orbitron text-cyber-blue mb-2">Learn</h3>
                  <p className="text-sm text-center">Explore topics in programming, AI, and more through interactive learning</p>
                </motion.div>
                
                <motion.div 
                  className="cyber-panel p-4 flex flex-col items-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(155, 135, 245, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MessageSquare className="text-cyber-purple mb-3" size={40} />
                  <h3 className="text-lg font-orbitron text-cyber-purple mb-2">Chat</h3>
                  <p className="text-sm text-center">Engage with our AI assistant to get answers and guidance on any topic</p>
                </motion.div>
                
                <motion.div 
                  className="cyber-panel p-4 flex flex-col items-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(46, 213, 115, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Cpu className="text-cyber-green mb-3" size={40} />
                  <h3 className="text-lg font-orbitron text-cyber-green mb-2">Grow</h3>
                  <p className="text-sm text-center">Track your progress, earn badges and see your knowledge expand</p>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center"
              >
                <Button asChild className="bg-cyber-blue hover:bg-cyber-blue/80 text-lg px-8 py-6 cyber-border">
                  <Link to="/chatbot" className="flex items-center">
                    <MessageSquare className="mr-2" />
                    Start Chatting with SkillUp AI
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Index;
