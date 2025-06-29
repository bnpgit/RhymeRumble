import React, { useEffect, useRef, useState } from 'react';

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: 'triangle' | 'square' | 'hexagon' | 'diamond';
  vx: number;
  vy: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface GeometricShapesProps {
  className?: string;
  shapeCount?: number;
  colors?: string[];
}

export default function GeometricShapes({ 
  className = '', 
  shapeCount = 40,
  colors = ['rgba(99, 102, 241, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(59, 130, 246, 0.4)']
}: GeometricShapesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const shapesRef = useRef<Shape[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const shapeTypes: Shape['type'][] = ['triangle', 'square', 'hexagon', 'diamond'];

  // Initialize shapes
  const initShapes = (width: number, height: number) => {
    const shapes: Shape[] = [];
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.005
      });
    }
    shapesRef.current = shapes;
  };

  // Draw different shape types
  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    
    const pulseSize = shape.size * (1 + Math.sin(shape.pulsePhase) * 0.2);
    
    ctx.fillStyle = shape.color.replace(/[\d.]+\)$/g, `${shape.opacity})`);
    ctx.strokeStyle = shape.color.replace(/[\d.]+\)$/g, `${shape.opacity * 0.8})`);
    ctx.lineWidth = 2;

    ctx.beginPath();
    
    switch (shape.type) {
      case 'triangle':
        ctx.moveTo(0, -pulseSize);
        ctx.lineTo(-pulseSize * 0.866, pulseSize * 0.5);
        ctx.lineTo(pulseSize * 0.866, pulseSize * 0.5);
        ctx.closePath();
        break;
        
      case 'square':
        ctx.rect(-pulseSize * 0.5, -pulseSize * 0.5, pulseSize, pulseSize);
        break;
        
      case 'hexagon':
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * pulseSize;
          const y = Math.sin(angle) * pulseSize;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
        
      case 'diamond':
        ctx.moveTo(0, -pulseSize);
        ctx.lineTo(pulseSize * 0.7, 0);
        ctx.lineTo(0, pulseSize);
        ctx.lineTo(-pulseSize * 0.7, 0);
        ctx.closePath();
        break;
    }
    
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  // Update shape animations
  const updateShapes = (width: number, height: number) => {
    shapesRef.current.forEach(shape => {
      // Update position
      shape.x += shape.vx;
      shape.y += shape.vy;
      
      // Update rotation
      shape.rotation += shape.rotationSpeed;
      
      // Update pulse
      shape.pulsePhase += shape.pulseSpeed;
      
      // Boundary wrapping
      if (shape.x < -50) shape.x = width + 50;
      if (shape.x > width + 50) shape.x = -50;
      if (shape.y < -50) shape.y = height + 50;
      if (shape.y > height + 50) shape.y = -50;
    });
  };

  // Render shapes
  const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    shapesRef.current.forEach(shape => {
      drawShape(ctx, shape);
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateShapes(dimensions.width, dimensions.height);
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
      initShapes(dimensions.width, dimensions.height);
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, shapeCount]);

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