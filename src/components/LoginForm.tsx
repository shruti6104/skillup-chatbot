
import React, { useState } from 'react';
import { User, Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username && password) {
      setIsLoggingIn(true);
      
      // Play scanning sound
      const audio = new Audio();
      audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
      audio.volume = 0.2;
      audio.play();

      setTimeout(() => {
        setIsLoggingIn(false);
        onLogin();
      }, 2000); // Simulated login delay
    }
  };

  return (
    <div className="cyber-panel p-8 max-w-md w-full animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-orbitron text-3xl cyber-gradient-text mb-2">SkillUp AI</h1>
        <p className="text-muted-foreground">Login to access your personalized learning assistant</p>
      </div>
      
      {isLoggingIn ? (
        <div className="text-center py-10">
          <div className="inline-block relative w-24 h-24 mb-4">
            <div className="absolute inset-0 border-4 border-t-cyber-blue border-r-cyber-purple border-b-cyber-pink border-l-transparent rounded-full animate-rotate-center"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-r-cyber-blue border-b-cyber-purple border-l-cyber-pink rounded-full animate-rotate-center" style={{animationDirection: 'reverse'}}></div>
            <div className="absolute inset-0 bg-scanner-line animate-scanner"></div>
          </div>
          <p className="font-orbitron text-cyber-blue animate-pulse-glow">Scanning Credentials...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <User size={18} className="text-cyber-blue" />
              </div>
              <input
                type="text"
                className="cyber-input pl-10 w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock size={18} className="text-cyber-blue" />
              </div>
              <input
                type="password"
                className="cyber-input pl-10 w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 cyber-border bg-cyber-darker" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-cyber-blue hover:underline">Forgot Password?</a>
          </div>
          
          <button 
            type="submit" 
            className="cyber-button w-full font-orbitron tracking-wider py-3 neon-glow"
          >
            <LogIn size={18} className="mr-2 inline-block" />
            ACCESS SYSTEM
          </button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>
            <a href="#" className="text-cyber-blue ml-1 hover:underline">Sign Up</a>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
