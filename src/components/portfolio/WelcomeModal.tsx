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
        className="relative w-full max-w-[500px] overflow-hidden rounded border border-white/5 bg-black/40 p-10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        
        {/* Glowing floating orb effect behind content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--cyan)]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 h-[1px] w-12 bg-[var(--cyan)]/30" />
          
          <h2 className="mb-1 font-mono text-xl uppercase tracking-[0.2em] text-[var(--foreground)]/90">
            Welcome to NEXUS
          </h2>
          <p className="mb-10 font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40">
            Engineering Workspace
          </p>

          <div className="mb-10 flex flex-col gap-3 font-serif text-lg font-light italic text-[var(--foreground)]/80 leading-relaxed">
            <p>"Great software isn't built by writing<br/>more code.</p>
            <p>It is built by making better decisions."</p>
            <p className="mt-3 font-sans text-xs not-italic tracking-widest text-[var(--foreground)]/40 uppercase">— Radha</p>
          </div>

          <div className="mb-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex w-full flex-col items-center gap-4">
            <div className="h-[1px] w-full max-w-[200px] bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 10, ease: "linear" }}
                className="h-full bg-[var(--cyan)] shadow-[0_0_10px_rgba(0,180,255,0.5)]"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--foreground)]/30">
                Entering Workspace
              </span>
              <span className="font-mono text-[10px] text-[var(--cyan)]">
                00:{timeLeft.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
