import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Booting kernel…",
  "Assembling neural mesh…",
  "Loading knowledge graph…",
  "Indexing 42 projects…",
  "Warming vector database…",
  "Initializing AI systems…",
];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (i >= STEPS.length) {
      const t = setTimeout(() => { setDone(true); setTimeout(onDone, 500); }, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 380);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 aurora opacity-40" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-24 w-24"
            >
              <div className="absolute inset-0 rounded-2xl border border-white/10 glass" />
              <motion.div
                className="absolute inset-2 rounded-xl"
                style={{
                  background: "conic-gradient(from 0deg, var(--electric), var(--cyan), var(--indigo-glow), var(--electric))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-4 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center font-mono text-xl font-bold">
                AI
              </div>
            </motion.div>

            <div className="min-w-[280px] text-center">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                system boot
              </div>
              <div className="mt-3 h-6 font-mono text-sm text-foreground/90">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STEPS[Math.min(i, STEPS.length - 1)]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 h-[2px] w-72 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--electric)] via-[var(--cyan)] to-[var(--indigo-glow)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((i + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
