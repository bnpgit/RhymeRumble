import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface StarFieldProps {
  className?: string;
  starCount?: number;
  colors?: string[];
}

export default function StarField({ 
  className = '', 
  starCount = 150,
  colors = ['#FFD700', '#FFF8DC', '#87CEEB', '#DDA0DD', '#98FB98']
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize stars
  const initStars = (width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        brightness: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    starsRef.current = stars;
  };

  // Update star animations
  const updateStars = () => {
    starsRef.current.forEach(star => {
      star.twinklePhase += star.twinkleSpeed;
      star.brightness = (Math.sin(star.twinklePhase) + 1) / 2;
    });
  };

  // Render stars
  const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    starsRef.current.forEach(star => {
      const alpha = star.brightness * 0.8 + 0.2;
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      
      // Create star glow
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      gradient.addColorStop(0, `${star.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${star.color}00`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add bright center
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `${star.color}${Math.floor((alpha * 0.9 + 0.1) * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateStars();
    render(ctx, dimensions.width, dimensions.height);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    setDimensions({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initStars(dimensions.width, dimensions.height);
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, starCount]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}