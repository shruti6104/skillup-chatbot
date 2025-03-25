
import React, { useState } from 'react';
import { User, Lock, LogIn, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  
  // Comprehensive email validation with more strict security checks
  const validateEmail = (email: string) => {
    // Basic format validation with regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!re.test(String(email).toLowerCase())) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    
    // Extract domain part for additional checks
    const domainPart = email.split('@')[1].toLowerCase();
    
    // Check for disposable email domains that are commonly used by attackers
    const suspiciousDomains = ['tempmail.com', 'temp-mail.org', 'fakeinbox.com', 'guerrillamail.com', 'mailinator.com'];
    if (suspiciousDomains.some(domain => domainPart.includes(domain))) {
      return { valid: false, message: 'Please use a permanent email address' };
    }
    
    // Whitelist approach - only allow specific trusted domains for enhanced security
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com', 'company.com', 'education.org', 'school.edu'];
    
    if (!allowedDomains.some(domain => domainPart === domain)) {
      return { valid: false, message: 'Please use an authorized email provider' };
    }
    
    // Check for common email patterns that might indicate a bot
    if (
      email.includes('admin') || 
      email.includes('support') || 
      email.includes('info') || 
      email.includes('test') || 
      /\d{6,}/.test(email) // Contains 6+ consecutive digits
    ) {
      return { valid: false, message: 'This email address appears to be invalid' };
    }
    
    return { valid: true, message: '' };
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Enhanced Email validation with stricter rules
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.message);
      return;
    }
    
    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Enhanced password security checks
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }
    
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number');
      return;
    }
    
    // For demo purposes, allow login with any valid email format and password >= 6 chars
    setIsLoggingIn(true);
    
    // Play scanning sound
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
    audio.volume = 0.2;
    audio.play();

    setTimeout(() => {
      setIsLoggingIn(false);
      
      // Mock authentication success
      toast({
        title: "Login Successful",
        description: "Welcome to SkillUp AI",
      });
      
      // Store login information in localStorage
      localStorage.setItem('skillup_isLoggedIn', 'true');
      localStorage.setItem('skillup_email', email);
      
      onLogin();
    }, 2000); // Simulated login delay
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md flex items-start">
              <AlertTriangle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <User size={18} className="text-cyber-blue" />
              </div>
              <input
                type="email"
                className="cyber-input pl-10 w-full"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Password (min 6 characters)"
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

