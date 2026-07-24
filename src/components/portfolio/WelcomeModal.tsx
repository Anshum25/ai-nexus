import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WelcomeModal({ onDismiss }: { onDismiss: () => void }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[500px] overflow-hidden rounded border border-white/10 bg-black/80 backdrop-blur-xl p-10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        
        {/* Glowing floating orb effect behind content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 h-[1px] w-12 bg-[var(--accent)]/30" />
          
          <h2 className="mb-1 font-mono text-xl uppercase tracking-[0.2em] text-[var(--foreground)]/90">
            Welcome to NEXUS
          </h2>
          <p className="mb-10 font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40">
            Engineering Workspace
          </p>

          <div className="mb-10 flex flex-col gap-3 font-serif text-lg font-light italic text-[var(--foreground)]/80 leading-relaxed">
            <p>"Great software isn't built by writing<br/>more code.</p>
            <p>It is built by making better decisions."</p>
            <p className="mt-3 font-sans text-xs not-italic tracking-widest text-[var(--foreground)]/40 uppercase">— Anshum Dev</p>
          </div>

          <div className="mb-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex w-full flex-col items-center gap-6">
            <div className="relative flex items-center justify-center w-16 h-16">
              {/* Background Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  stroke="var(--border)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Progress Ring */}
                <motion.circle
                  cx="50" cy="50" r="45"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 1 }}
                  animate={{ pathLength: 0 }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </svg>
              {/* Number */}
              <span className="font-mono text-xl font-medium text-[var(--foreground)]/90">
                {timeLeft}
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--foreground)]/40">
              Glad You Stayed
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
