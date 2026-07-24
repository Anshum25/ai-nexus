import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

export function ArchitecturalEnvironment() {
  const { scrollY } = useScroll();
  
  // Depth parallax for scroll
  const yL2 = useTransform(scrollY, [0, 1000], [0, 50]);
  const yL3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const yL4 = useTransform(scrollY, [0, 1000], [0, 200]);
  const yL5 = useTransform(scrollY, [0, 1000], [0, 250]);
  const scaleL3 = useTransform(scrollY, [0, 1000], [1, 1.05]);

  // Mouse Parallax for volumetric and spatial shifts
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 1000 });

  useEffect(() => {
    setMounted(true);
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    
    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      // Normalized
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rawMouseX, rawMouseY]);

  // Derived parallax for Layers
  const xL2 = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const yL2Mouse = useTransform(smoothMouseY, [-1, 1], [-5, 5]);
  
  const xL3 = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const yL3Mouse = useTransform(smoothMouseY, [-1, 1], [-15, 15]);
  
  const xL4 = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const yL4Mouse = useTransform(smoothMouseY, [-1, 1], [-30, 30]);

  const xL5 = useTransform(smoothMouseX, [-1, 1], [-50, 50]);
  const yL5Mouse = useTransform(smoothMouseY, [-1, 1], [-50, 50]);

  const backgroundGradient = useMotionTemplate`radial-gradient(800px circle at ${rawMouseX}px ${rawMouseY}px, var(--accent), transparent 60%)`;

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--background)] transition-colors duration-1000">
      
      {/* =====================================================
          LAYER 1: Soft Grain Texture
          ===================================================== */}
      <div className="grain z-50 opacity-[0.15] mix-blend-overlay" />

      {/* =====================================================
          LAYER 2: Large Perspective Grid
          ===================================================== */}
      <motion.div 
        style={{ x: xL2, y: yL2Mouse, y: yL2 }}
        className="absolute inset-0 z-10 opacity-20 dark:opacity-30 perspective-1000"
      >
        <div className="absolute inset-0 rotate-x-[75deg] scale-[2.5] transform-origin-bottom">
          <div className="editorial-grid opacity-30" />
        </div>
      </motion.div>

      {/* =====================================================
          LAYER 3: Blueprint Construction (The Engineering Object)
          ===================================================== */}
      <motion.div 
        style={{ x: xL3, y: yL3Mouse, y: yL3, scale: scaleL3 }}
        className="absolute top-[10%] right-[-10%] w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] z-20 opacity-30 dark:opacity-40"
      >
        <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-full text-[var(--foreground)]">
          {/* Outer Construction Orbit */}
          <motion.circle 
            cx="500" cy="500" r="480" 
            stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12"
            animate={{ rotate: 360 }}
            transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          {/* Inner Geometric Neural Nodes */}
          <g style={{ transformOrigin: "center" }} className="animate-[spin_200s_linear_infinite_reverse]">
            <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="1" strokeDasharray="1000" opacity="0.3" />
            <circle cx="500" cy="200" r="4" fill="currentColor" />
            <circle cx="800" cy="500" r="4" fill="currentColor" />
            <circle cx="500" cy="800" r="4" fill="currentColor" />
            <circle cx="200" cy="500" r="4" fill="currentColor" />
            
            <path d="M 500 200 L 800 500 L 500 800 L 200 500 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M 500 200 L 500 800 M 200 500 L 800 500" stroke="var(--accent)" strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />
          </g>
          {/* Center Glass Sphere Illusion */}
          <circle cx="500" cy="500" r="100" stroke="currentColor" strokeWidth="0.5" fill="var(--background)" fillOpacity="0.5" />
          <circle cx="500" cy="500" r="150" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          
          <motion.path 
            d="M 500 0 L 500 1000" 
            stroke="var(--accent)" strokeWidth="0.5" opacity="0.4"
            animate={{ x: [-100, 100, -100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* =====================================================
          LAYER 4: Technical Annotations
          ===================================================== */}
      <motion.div 
        style={{ x: xL4, y: yL4Mouse, y: yL4 }}
        className="absolute inset-0 z-30 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] opacity-50 select-none"
      >
        <div className="absolute top-[20%] right-[30%]">SYS.ARCH.001</div>
        <div className="absolute bottom-[25%] left-[10%] [writing-mode:vertical-rl]">LAT: 34.0522° N</div>
        <div className="absolute top-[40%] right-[10%]">RAD: 450px</div>
        <div className="absolute bottom-[10%] right-[20%] text-[var(--accent)]">ONLINE</div>
        
        {/* Dynamic crosshairs */}
        <div className="absolute top-1/2 left-1/4 w-4 h-4 border border-current opacity-30 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-current rounded-full" />
        </div>
      </motion.div>

      {/* =====================================================
          LAYER 5: Massive Structural Curves
          ===================================================== */}
      <motion.div 
        style={{ x: xL5, y: yL5Mouse, y: yL5 }}
        className="absolute inset-0 z-15 opacity-10 dark:opacity-20 flex items-center justify-center"
      >
        <svg viewBox="0 0 1000 1000" fill="none" className="w-[150vw] h-[150vh] text-[var(--foreground)]" preserveAspectRatio="none">
          <motion.path 
            d="M -200 1000 C 300 800, 700 200, 1200 0" 
            stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <motion.path 
            d="M -200 900 C 400 900, 600 100, 1200 100" 
            stroke="var(--accent)" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* =====================================================
          LAYER 6: Glass Reflections
          ===================================================== */}
      <div className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay opacity-40">
        <div className="absolute top-[10%] left-[10%] w-[30vw] h-[60vh] bg-gradient-to-br from-white/20 to-transparent skew-x-12 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[30vh] bg-gradient-to-tl from-white/20 to-transparent -skew-x-12 blur-[80px]" />
      </div>

      {/* =====================================================
          LAYER 7: Volumetric Cursor Light
          ===================================================== */}
      <motion.div
        className="absolute inset-0 z-40 mix-blend-screen pointer-events-none opacity-30 dark:opacity-40"
        style={{ background: backgroundGradient }}
      />

    </div>
  );
}
