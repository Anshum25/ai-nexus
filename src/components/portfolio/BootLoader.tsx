import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const INIT_MODULES = [
  "Verifying Modules",
  "Loading Knowledge Graph",
  "Preparing Workspace",
  "Synchronizing Architecture",
  "Connecting Research Database",
  "Initializing AI Systems",
];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<number>(0);
  const [initIndex, setInitIndex] = useState(-1);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (skip) return;
    
    // Phase timings (cumulative)
    const p1 = setTimeout(() => setPhase(1), 1000); // 1s: Cyan light breathes
    const p2 = setTimeout(() => setPhase(2), 3000); // 3s: Initialization
    const p3 = setTimeout(() => setPhase(3), 7000); // 7s: Logo
    const p4 = setTimeout(() => setPhase(4), 11000); // 11s: Philosophy
    const p5 = setTimeout(() => setPhase(5), 14000); // 14s: Ready
    const p6 = setTimeout(() => setPhase(6), 16000); // 16s: Zoom out transition
    const p7 = setTimeout(() => onDone(), 17500); // 17.5s: Done
    
    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      clearTimeout(p5);
      clearTimeout(p6);
      clearTimeout(p7);
    };
  }, [skip, onDone]);

  // Handle module list staggered appearance
  useEffect(() => {
    if (phase === 2) {
      let current = 0;
      const interval = setInterval(() => {
        if (current < INIT_MODULES.length) {
          setInitIndex(current);
          current++;
        } else {
          clearInterval(interval);
        }
      }, 500); // 0.5s per item
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleSkip = () => {
    if (skip) return;
    setSkip(true);
    setPhase(6); // Force to transition phase
    setTimeout(() => onDone(), 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase > 0 && phase < 6) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, skip]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={phase === 6 ? { opacity: 0, scale: 2, filter: "blur(20px)" } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Skip button */}
      {phase > 0 && phase < 6 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleSkip}
          className="absolute bottom-10 right-10 z-50 font-mono text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest"
        >
          Skip Intro [esc]
        </motion.button>
      )}

      {/* Blueprint Grid (fades in at Phase 2) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.3 : 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 grid-bg pointer-events-none"
      />

      {/* Breathing Light (Phase 1-2) */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0.2, 0.8, 0.4], scale: [0.8, 1.2, 1, 1.5, 1.2] }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--cyan)] rounded-full blur-[80px]"
          />
        )}
      </AnimatePresence>

      {/* Expanded ambient light for rest of sequence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.15 : 0 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--cyan)] rounded-full blur-[150px] pointer-events-none"
      />

      {/* Phase 2: System Initialization */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="absolute flex flex-col items-center text-center"
          >
            <h1 className="text-white/80 font-mono text-sm uppercase tracking-[0.3em] mb-12">
              Initializing Engineering Environment
            </h1>
            <div className="flex flex-col items-center gap-4 font-mono text-xs tracking-widest text-[var(--electric)]/70">
              {INIT_MODULES.map((mod, i) => (
                <motion.div
                  key={mod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: initIndex >= i ? 1 : 0, y: initIndex >= i ? 0 : 10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {mod}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3 & 4: Logo and Philosophy */}
      <AnimatePresence>
        {(phase === 3 || phase === 4) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute flex flex-col items-center justify-center w-full"
          >
            {/* Logo Construction */}
            <motion.div 
              animate={{ scale: phase === 4 ? 0.6 : 1, y: phase === 4 ? -40 : 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Outer Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.4] }}
                transition={{ duration: 2, delay: 1.5 }}
                className="absolute inset-0 bg-[var(--cyan)] blur-[40px] rounded-full scale-150"
              />
              
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                {/* Main Triangle */}
                <motion.path
                  d="M50 10 L90 80 L10 80 Z"
                  stroke="var(--cyan)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Inner Elements */}
                <motion.circle
                  cx="50" cy="55" r="15"
                  stroke="var(--electric)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                />
                <motion.path
                  d="M50 40 L50 70"
                  stroke="white"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* Philosophy Text */}
            <AnimatePresence>
              {phase === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-[60%] flex flex-col items-center gap-4 text-center font-serif text-xl italic font-light tracking-wide text-white/90 w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Engineering is not about writing code.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    It is about designing systems people can trust.
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 5: System Online */}
      <AnimatePresence>
        {phase === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute flex flex-col items-center justify-center text-center gap-6"
          >
            <div className="font-mono text-sm tracking-[0.4em] uppercase text-white/80">
              Engineering Workspace Ready
            </div>
            <div className="flex items-center gap-3 border border-white/10 rounded-full px-6 py-2 bg-white/5 backdrop-blur-sm">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              />
              <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                Status Online
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
