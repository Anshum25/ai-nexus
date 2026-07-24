import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import React, { useRef } from "react";

// Magnetic Button Wrapper
function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull strength (20% of distance)
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`relative inline-block ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}

export function Ch01_Hero() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center px-6 lg:px-12 pt-32 pb-12 z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 items-start">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base font-serif italic text-[var(--muted-foreground)] tracking-wide"
        >
          AI Engineer & System Architect
        </motion.div>

        {/* Headline */}
        <h1 
          className="text-6xl md:text-[90px] lg:text-[130px] font-medium leading-[0.95] tracking-[-0.03em] text-[var(--foreground)] max-w-[1400px] cursor-default"
        >
          Building intelligent systems that solve real problems.
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mt-8"
        >
          <p className="text-xl md:text-3xl text-[var(--muted-foreground)] leading-relaxed font-light">
            I design and architect production-grade AI applications, from multi-agent reasoning networks to high-performance RAG pipelines.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8"
        >
          <MagneticButton>
            <Link to="/experience" className="px-10 py-5 bg-[var(--foreground)] text-[var(--background)] font-medium hover:scale-105 transition-transform rounded-full flex items-center gap-2 text-sm md:text-base shadow-lg shadow-[var(--foreground)]/10">
              Explore Journey
            </Link>
          </MagneticButton>
          
          <MagneticButton>
            <Link to="/archive" className="px-10 py-5 border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--foreground)]/5 transition-colors rounded-full flex items-center gap-2 text-sm md:text-base bg-[var(--background)]/50 backdrop-blur-md">
              View Projects
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator - Continuous elegant motion */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-4 text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-[var(--foreground)]" />
          </motion.div>
          Scroll to explore
        </motion.div>

      </div>
    </section>
  );
}
