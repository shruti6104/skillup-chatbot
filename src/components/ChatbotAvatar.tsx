
import React, { useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatbotAvatar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 120;
    canvas.height = 120;
    
    // Animation variables
    let particles: Particle[] = [];
    let hue = 180; // Initial hue (cyan)
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.random() * 5 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1 + 0.5;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.color = `hsla(${hue}, 100%, 50%, ${Math.random() * 0.5 + 0.5})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.05;
        
        // Boundary check with bounce
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1;
        }
      }
      
      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    
    const createParticles = () => {
      // Limit particles for performance
      if (particles.length < 50) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle());
        }
      }
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(8, 14, 21, 0.1)'; // Slight trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Remove tiny particles
        if (particle.size <= 0.2) {
          particles.splice(index, 1);
        }
      });
      
      // Slowly change color
      hue += 0.5;
      if (hue > 360) hue = 0;
      
      createParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup
    return () => {
      particles = [];
    }
  }, []);
  
  return (
    <motion.div 
      className="cyber-panel p-3 rounded-full relative mb-4"
      animate={{ 
        boxShadow: [
          "0 0 5px rgba(0, 168, 255, 0.2)",
          "0 0 15px rgba(0, 168, 255, 0.5)",
          "0 0 5px rgba(0, 168, 255, 0.2)"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <canvas 
        ref={canvasRef} 
        className="rounded-full w-24 h-24 mx-auto"
      />
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div 
          className="cyber-border w-16 h-16 rounded-full flex items-center justify-center bg-cyber-darker/70"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Cpu size={30} className="text-cyber-blue" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatbotAvatar;
