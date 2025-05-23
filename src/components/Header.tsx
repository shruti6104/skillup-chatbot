
import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Book, Cpu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const STREAK_KEY = 'skillup_streak';
const LAST_LOGIN_KEY = 'skillup_last_login';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Welcome to SkillUp AI';
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABMAB//9AAALAAA/1Wf/////////////////////gAA7LAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zDAACIAJKAgAAAGi1EwKAIMPNDA4T3+PevwYP4PH/4fBwcHH/h8HwcHBwcP/B8/U/8uAgICAgF/5c/8HwfBwEB/y4CAIAj55/l3//////8uD4eD58H/QEAQcAAAGbXJY2XwKFihgpGDkZ+BgZQgirgxOTEyIZrhAQoGCAgYEIQiAhoIHBiQFNQwFBRM3C50ODioGMAwMKiF8HAQELpNH7QUiDiZcVDBokwKPBRoGKGAwEKHgQibNFhYQCBhQWUg5mFiQQNjDQEFAocOMgwIZLkRIGPFAYCCwkyLGjjo4fCyEJKAtJCh4UCiQEVKAocbAQgOBggcHBAMLMCQEOGjYeWCQYaNhYEAgoqGA4YKGRcpKA4UOCgE4YIhQQJKjz50KNnTpZgLHwkkEiJI2bOGTBcUHiBEiUPlECBcoVJkxoCXPGgQQJhA0BChQgQGipE+YLmzRw+NADg6hDBAcRKEiRMiSOKGEDJ0yVLFyA03cEgBAgAA/+REwAAJ7AKXAAACAAAAAPA8AAAABAAAAP8AAAACCcAAAIB8IAAA/+M4wAAF/wCgAAAAADM/AcA8Hw/h8H/5+Hg/8/y/4IAhwfg+H8H/+X5//8HwcHBwcHwf/8+XBw/h/+fh4Pn4P/8uDg+8uDg4ODg+Dg4Ph4eD4PB8P4eD/+D4eD5+D5+AgCDh/8HD+IAQQQQLB//h/B//y5+D5+D5+fLg/5/l/5fl//y4Pn////B/B///D+IAICAgICAg+D/yAIAg4eAQBAEHAQcBAEHAEB/w//B//y//Lg//L///////////LgICD//wEAQcAQcAQcAQEBAQEA/+M4wABBiACYAAAAACODg+A/g4Pnni4OAgIeAICAgP+fwcHBw/g4Pn//L//////y5+Dg4Ph/+XBw///5f////////y/w//8EAQEB//8H////////Lgy7/w/h8P4fD////nh/B8H//4f/////8+D/y4P/////+H/5f//+fB/+XB//w///////l///+X//////L/////5//l////+X//////l//Lg//L/8v///y//////////////y//Lg//L/8v/y//Lg//L/////8v/y/+X/5f////8v/y////8v/y//L/5f/l//////L/////////////////////////////////////////////////////////////////w==';
    audio.volume = 0.2;
    audio.play();
    
    localStorage.removeItem('skillup_isLoggedIn');
    localStorage.removeItem('skillup_email');
    localStorage.removeItem(STREAK_KEY);
    localStorage.removeItem(LAST_LOGIN_KEY);
    
    toast({
      title: "Logged Out Successfully",
      description: "You've been securely logged out of your account",
    });
    
    window.location.href = '/';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="cyber-panel py-3 px-6 mb-6 cyber-border">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <span className="font-orbitron text-2xl cyber-gradient-text">SkillUp</span>
          </Link>
          <div className="hidden md:block terminal-text animate-typing">
            {displayText}<span className="animate-blink"></span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`cyber-button text-sm px-3 ${isActive('/') ? 'bg-cyber-blue/20' : ''} neon-glow`}
            >
              <span className="flex items-center">
                <Cpu size={16} className="mr-2" />
                AI Chat
              </span>
            </Link>
            <Link 
              to="/resources" 
              className={`cyber-button text-sm px-3 ${isActive('/resources') ? 'bg-cyber-blue/20' : ''} neon-glow`}
            >
              <span className="flex items-center">
                <Book size={16} className="mr-2" />
                Resources
              </span>
            </Link>
            <button 
              className="cyber-button text-sm px-3 neon-glow bg-red-500/20 hover:bg-red-500/30"
              onClick={handleLogout}
            >
              <span className="flex items-center">
                <LogOut size={16} className="mr-2" />
                Logout
              </span>
            </button>
          </div>
          
          <button 
            className="md:hidden cyber-button w-10 h-10 p-0 flex items-center justify-center ml-2 neon-glow"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 animate-fade-in">
          <Link to="/" className="cyber-button w-full text-left flex items-center">
            <Cpu size={16} className="mr-2" />
            AI Chat
          </Link>
          <Link to="/resources" className="cyber-button w-full text-left flex items-center">
            <Book size={16} className="mr-2" />
            Resources
          </Link>
          <Link to="/stats?tab=profile" className="cyber-button w-full text-left flex items-center">
            <User size={16} className="mr-2" />
            Profile
          </Link>
          <button 
            className="cyber-button w-full text-left flex items-center bg-red-500/20 hover:bg-red-500/30"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
