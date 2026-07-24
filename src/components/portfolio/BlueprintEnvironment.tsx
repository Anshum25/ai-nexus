import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BlueprintEnvironment() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--background)] transition-colors duration-1000">
      
      {/* Ambient Moving Gradients */}
      <div className="ambient-light" />
      
      {/* Elegant Grid */}
      <div className="editorial-grid" />
      
      {/* Parallax SVG Blueprints */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] flex items-center justify-center pointer-events-none">
        <svg width="120vw" height="120vh" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M 100 900 L 900 100 M 100 100 L 900 900" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="500" cy="500" r="300" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="4 4"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
          />
          <motion.rect 
            x="200" y="200" width="600" height="600" 
            stroke="currentColor" 
            strokeWidth="0.2" 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 5, ease: "easeOut" }}
          />
          {/* Subtle tech annotations */}
          <text x="220" y="220" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.5">SYS.INIT.01</text>
          <text x="730" y="790" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.5">LOAD.BAL.ACTIVE</text>
        </svg>
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] flex items-center justify-center pointer-events-none">
        <svg width="100vw" height="100vh" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M 0 400 Q 400 0 800 400 T 1600 400" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 6, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </motion.div>

      {/* Grain Overlay */}
      <div className="grain" />
    </div>
  );
}
