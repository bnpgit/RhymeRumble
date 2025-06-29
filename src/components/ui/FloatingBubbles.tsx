import React, { useEffect, useRef, useState } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  burstRadius: number;
  isBursting: boolean;
}

interface FloatingBubblesProps {
  className?: string;
  bubbleCount?: number;
  colors?: string[];
}

export default function FloatingBubbles({ 
  className = '', 
  bubbleCount = 25,
  colors = ['rgba(147, 197, 253, 0.6)', 'rgba(196, 181, 253, 0.6)', 'rgba(167, 243, 208, 0.6)', 'rgba(252, 211, 77, 0.6)']
}: FloatingBubblesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const CONFIG = {
    burstDistance: 80,
    burstDuration: 30,
    maxSize: 60,
    minSize: 20,
    maxSpeed: 1.5,
    minSpeed: 0.3,
  };

  // Initialize bubbles
  const initBubbles = (width: number, height: number) => {
    const bubbles: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      const size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
      bubbles.push({
        x: Math.random() * width,
        y: height + size,
        size,
        speed: Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 200 + 100,
        burstRadius: 0,
        isBursting: false
      });
    }
    bubblesRef.current = bubbles;
  };

  // Calculate distance between two points
  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  // Update bubble physics
  const updateBubbles = (width: number, height: number) => {
    const bubbles = bubblesRef.current;
    const mouse = mouseRef.current;

    bubbles.forEach((bubble, index) => {
      if (bubble.isBursting) {
        bubble.burstRadius += 3;
        bubble.opacity -= 0.03;
        
        if (bubble.opacity <= 0) {
          // Reset bubble
          bubble.x = Math.random() * width;
          bubble.y = height + bubble.size;
          bubble.opacity = Math.random() * 0.6 + 0.2;
          bubble.life = 0;
          bubble.isBursting = false;
          bubble.burstRadius = 0;
        }
        return;
      }

      // Check mouse interaction
      if (mouse.isActive) {
        const mouseDistance = distance(bubble, mouse);
        if (mouseDistance < CONFIG.burstDistance) {
          bubble.isBursting = true;
          return;
        }
      }

      // Normal movement
      bubble.y -= bubble.speed;
      bubble.x += Math.sin(bubble.life * 0.01) * 0.5;
      bubble.life++;

      // Fade effect as bubble ages
      const ageRatio = bubble.life / bubble.maxLife;
      if (ageRatio > 0.8) {
        bubble.opacity *= 0.98;
      }

      // Reset bubble when it goes off screen or dies
      if (bubble.y < -bubble.size || bubble.life > bubble.maxLife || bubble.opacity < 0.1) {
        bubble.x = Math.random() * width;
        bubble.y = height + bubble.size;
        bubble.size = Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize;
        bubble.speed = Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed;
        bubble.opacity = Math.random() * 0.6 + 0.2;
        bubble.life = 0;
        bubble.color = colors[Math.floor(Math.random() * colors.length)];
      }
    });
  };

  // Render bubbles
  const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    bubblesRef.current.forEach(bubble => {
      if (bubble.isBursting) {
        // Render burst effect
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.burstRadius, 0, Math.PI * 2);
        ctx.strokeStyle = bubble.color.replace(/[\d.]+\)$/g, `${bubble.opacity})`);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add sparkle effects
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const sparkleX = bubble.x + Math.cos(angle) * bubble.burstRadius * 0.7;
          const sparkleY = bubble.y + Math.sin(angle) * bubble.burstRadius * 0.7;
          
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = bubble.color.replace(/[\d.]+\)$/g, `${bubble.opacity * 0.8})`);
          ctx.fill();
        }
      } else {
        // Render normal bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        
        // Create bubble gradient
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, 0,
          bubble.x, bubble.y, bubble.size
        );
        gradient.addColorStop(0, bubble.color.replace(/[\d.]+\)$/g, `${bubble.opacity * 0.8})`));
        gradient.addColorStop(0.7, bubble.color.replace(/[\d.]+\)$/g, `${bubble.opacity * 0.4})`));
        gradient.addColorStop(1, bubble.color.replace(/[\d.]+\)$/g, '0.1)'));
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add bubble highlight
        ctx.beginPath();
        ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.6})`;
        ctx.fill();
        
        // Add bubble outline
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.strokeStyle = bubble.color.replace(/[\d.]+\)$/g, `${bubble.opacity * 0.3})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateBubbles(dimensions.width, dimensions.height);
    render(ctx, dimensions.width, dimensions.height);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
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
      initBubbles(dimensions.width, dimensions.height);
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, bubbleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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