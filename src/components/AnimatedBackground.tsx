
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create data streams
    class DataStream {
      x: number;
      y: number;
      length: number;
      speed: number;
      width: number;
      color: string;
      active: boolean;

      constructor(x: number) {
        this.x = x;
        this.y = 0;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 2 + 1;
        this.width = Math.random() * 2 + 1;
        this.color = `rgba(${Math.random() > 0.5 ? '0,168,255' : (Math.random() > 0.5 ? '108,99,255' : '255,46,185')},${Math.random() * 0.2 + 0.1})`;
        this.active = false;
        this.activate();
      }

      activate() {
        setTimeout(() => {
          this.active = true;
        }, Math.random() * 5000);
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.length);
        ctx.stroke();
        
        this.y += this.speed;
        
        if (this.y > canvas.height + this.length) {
          this.y = 0;
          this.active = false;
          this.activate();
        }
      }
    }

    // Create grid
    const drawGrid = (ctx: CanvasRenderingContext2D) => {
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Initialize streams
    const streams: DataStream[] = [];
    const createStreams = () => {
      const count = Math.max(5, Math.floor(window.innerWidth / 100));
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        streams.push(new DataStream(x));
      }
    };
    
    createStreams();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw elements
      drawGrid(ctx);
      streams.forEach(stream => stream.draw(ctx));
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
