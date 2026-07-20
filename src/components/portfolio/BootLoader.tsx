import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Booting Neural Engine...",
  "Loading Engineering Memory...",
  "Initializing Project Universe...",
  "Syncing Architecture Library...",
  "Connecting AI Assistant...",
  "Mission Control Ready.",
];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (i >= STEPS.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 800);
      }, 600);
      return () => clearTimeout(t);
    }
    
    const pause = i === 2 || i === 4 ? 600 : 250;
    const t = setTimeout(() => {
      setLogs((prev) => [...prev, STEPS[i]]);
      setI(i + 1);
    }, pause);
    
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(40px)", scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black cursor-none"
        >
          <div className="absolute inset-0 z-0 opacity-10 grain mix-blend-screen pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col justify-end min-h-[50vh] pb-20">
            
            {/* Logo Construction */}
            <div className="mb-12 flex justify-center">
              <motion.div 
                layoutId="nexus-logo"
                className="relative flex items-center justify-center"
                initial={{ filter: "drop-shadow(0px 0px 0px rgba(0,255,255,0))" }}
                animate={{ filter: "drop-shadow(0px 0px 20px rgba(0,180,255,0.4))" }}
                transition={{ duration: 2, delay: 1 }}
              >
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M50 10 L90 80 L10 80 Z"
                    stroke="var(--cyan)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="50" cy="55" r="15"
                    stroke="var(--electric)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M50 40 L50 70"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Terminal Logs */}
            <div className="flex flex-col items-start gap-1 mb-8 font-mono text-sm text-[var(--electric)]/80">
              <AnimatePresence>
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-white/30 text-xs">{`[${(index * 0.123).toFixed(3)}]`}</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* OS Progress Bar */}
            <div className="relative h-[1px] w-full bg-white/5 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${((i) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
              <div>NEXUS OS v1.0.0</div>
              <div>System Boot</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
