import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export function EnvironmentEngine() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("afternoon");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Time of Day Logic
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) setTimeOfDay("morning");
      else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
      else if (hour >= 17 && hour < 20) setTimeOfDay("evening");
      else setTimeOfDay("night");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60 * 5); // Check every 5 mins
    return () => clearInterval(interval);
  }, []);

  // 2. Global Particle Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; size: number; speedY: number; speedX: number; opacity: number }> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles based on time of day
    const initParticles = () => {
      particles = [];
      const numParticles = timeOfDay === "night" ? 100 : 40;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (timeOfDay === "night" ? 1.5 : 2) + 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };
    
    initParticles();

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(p => {
        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Color based on time
        if (timeOfDay === "night") {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`; // Stars
        } else if (timeOfDay === "evening") {
          ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.5})`; // Gold dust
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.3})`; // Light dust
        }
        
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [timeOfDay]);

  // Determine global background gradients based on time
  const bgStyles = {
    morning: "bg-gradient-to-br from-zinc-900 to-zinc-800",
    afternoon: "bg-gradient-to-br from-[#0c0a09] to-zinc-900", // Standard Dark
    evening: "bg-gradient-to-br from-[#1c1917] to-[#0c0a09]", // Warmer dark
    night: "bg-gradient-to-b from-[#020617] via-[#000000] to-[#0a0a0a]", // Deep midnight blue/black
  };

  return (
    <div className={`fixed inset-0 z-[-1] transition-colors duration-[3000ms] ease-in-out ${bgStyles[timeOfDay]}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
      />
      {/* Subtle overlay for volumetric lighting feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
}
