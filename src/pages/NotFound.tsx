
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="cyber-panel p-8 max-w-lg animate-fade-in text-center">
        <h1 className="font-orbitron text-8xl cyber-gradient-text mb-4">404</h1>
        
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-darker flex items-center justify-center border border-cyber-blue/50">
          <AlertTriangle size={32} className="text-cyber-pink" />
        </div>
        
        <h2 className="font-orbitron text-2xl mb-4">ACCESS DENIED</h2>
        
        <p className="text-muted-foreground mb-6 terminal-text animate-typing">
          Error: The neural pathway you're trying to access does not exist in the matrix.
        </p>
        
        <Link 
          to="/" 
          className="cyber-button inline-flex items-center neon-glow"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Main Interface
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
