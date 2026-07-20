import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AICore({ children }: { children?: React.ReactNode }) {
  // We'll create a subtle breathing and rotating core.
  
  return (
    <div className="relative flex items-center justify-center w-full h-[600px]">
      
      {/* Outer Glow */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--electric) 0%, var(--cyan) 50%, transparent 100%)"
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* The Core Sphere */}
      <motion.div 
        data-cursor="explore"
        className="relative z-10 w-48 h-48 rounded-full border border-white/10 shadow-[0_0_80px_rgba(0,180,255,0.2)] overflow-hidden"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 70%)",
          backdropFilter: "blur(10px)"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Internal Core Energy Lines */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg, transparent 10deg, var(--electric) 10deg, transparent 20deg)`
          }}
        />
        
        {/* Inner Solid Core */}
        <div className="absolute inset-8 rounded-full bg-black border border-white/5 shadow-[inset_0_0_20px_rgba(0,255,255,0.2)]" />
      </motion.div>

      {/* Orbiting Elements container */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {children}
      </div>

    </div>
  );
}

// Helper component for the orbits
export function ProjectOrbit({ radius, duration, reverse, children }: { radius: number, duration: number, reverse?: boolean, children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute flex items-center justify-center pointer-events-none"
      style={{ width: radius * 2, height: radius * 2 }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      >
        {/* Counter-rotate the child so the card stays upright */}
        <motion.div
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
