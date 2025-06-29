import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
  connections: number[];
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const CONFIG = {
    particleCount: 80,
    maxConnections: 3,
    connectionDistance: 120,
    mouseAttractionDistance: 150,
    mouseAttractionForce: 0.0008,
    maxSpeed: 0.8,
    splitThreshold: 5, // Split when this many particles are connected
    splitForce: 2,
    particleLife: 300,
    colors: {
      particles: ['rgba(255, 255, 255, 0.8)', 'rgba(147, 197, 253, 0.8)', 'rgba(196, 181, 253, 0.8)'],
      connections: 'rgba(255, 255, 255, 0.15)',
    }
  };

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.maxSpeed,
        vy: (Math.random() - 0.5) * CONFIG.maxSpeed,
        id: i,
        connections: [],
        life: CONFIG.particleLife,
        maxLife: CONFIG.particleLife,
        size: Math.random() * 2 + 1,
        hue: Math.random() * 60 + 200, // Blue to purple range
      });
    }
    particlesRef.current = particles;
  };

  // Calculate distance between two points
  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  // Update particle physics
  const updateParticles = (width: number, height: number) => {
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    particles.forEach((particle, index) => {
      // Mouse attraction
      if (mouse.isActive) {
        const mouseDistance = distance(particle, mouse);
        if (mouseDistance < CONFIG.mouseAttractionDistance) {
          const force = (CONFIG.mouseAttractionDistance - mouseDistance) * CONFIG.mouseAttractionForce;
          const angle = Math.atan2(mouse.y - particle.y, mouse.x - particle.x);
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }
      }

      // Organic movement - add some randomness
      particle.vx += (Math.random() - 0.5) * 0.02;
      particle.vy += (Math.random() - 0.5) * 0.02;

      // Speed limiting
      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      if (speed > CONFIG.maxSpeed) {
        particle.vx = (particle.vx / speed) * CONFIG.maxSpeed;
        particle.vy = (particle.vy / speed) * CONFIG.maxSpeed;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary wrapping with smooth transition
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      // Update life
      particle.life = Math.max(0, particle.life - 1);
      if (particle.life === 0) {
        // Respawn particle
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.vx = (Math.random() - 0.5) * CONFIG.maxSpeed;
        particle.vy = (Math.random() - 0.5) * CONFIG.maxSpeed;
        particle.life = CONFIG.particleLife;
        particle.connections = [];
      }

      // Clear connections for recalculation
      particle.connections = [];
    });

    // Calculate connections and handle splitting
    particles.forEach((particle, i) => {
      let nearbyCount = 0;
      
      particles.forEach((other, j) => {
        if (i !== j) {
          const dist = distance(particle, other);
          
          if (dist < CONFIG.connectionDistance) {
            nearbyCount++;
            
            if (particle.connections.length < CONFIG.maxConnections && 
                other.connections.length < CONFIG.maxConnections) {
              particle.connections.push(j);
            }
          }
        }
      });

      // Split behavior when too many particles are nearby
      if (nearbyCount > CONFIG.splitThreshold) {
        const splitAngle = Math.random() * Math.PI * 2;
        particle.vx += Math.cos(splitAngle) * CONFIG.splitForce;
        particle.vy += Math.sin(splitAngle) * CONFIG.splitForce;
      }
    });
  };

  // Render particles and connections
  const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const particles = particlesRef.current;

    // Draw connections first
    ctx.strokeStyle = CONFIG.colors.connections;
    ctx.lineWidth = 1;
    
    particles.forEach((particle, i) => {
      particle.connections.forEach(connectionIndex => {
        const other = particles[connectionIndex];
        if (other && i < connectionIndex) { // Avoid drawing the same connection twice
          const dist = distance(particle, other);
          const opacity = 1 - (dist / CONFIG.connectionDistance);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      });
    });

    // Draw particles
    particles.forEach(particle => {
      const lifeRatio = particle.life / particle.maxLife;
      const alpha = lifeRatio * 0.8;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 80%, ${alpha})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${particle.hue}, 70%, 80%, ${alpha * 0.5})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(dimensions.width, dimensions.height);
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
      initParticles(dimensions.width, dimensions.height);
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

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