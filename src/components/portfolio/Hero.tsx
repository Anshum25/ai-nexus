import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NeuralCanvas } from "./NeuralCanvas";
import { ArrowUpRight, Sparkles } from "lucide-react";

const ROTATING = [
  "Enterprise AI Systems.",
  "RAG Pipelines.",
  "ERPNext Platforms.",
  "Production Agents.",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % ROTATING.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <NeuralCanvas />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--electric)]" />
          </span>
          Available for AI &amp; Software Engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-balance mt-8 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
        >
          Building
          <br />
          <span className="shimmer">{ROTATING[idx]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-balance mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          I design and ship production-grade AI platforms — RAG systems, intelligent
          agents, ERPNext extensions, and enterprise APIs. Built for scale, tuned for
          latency, engineered for trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90">
            View selected work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#playground" className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-foreground/90 transition hover:bg-white/10">
            <Sparkles className="h-4 w-4 text-[var(--electric)]" />
            Ask my AI
          </a>
          <div className="ml-2 hidden font-mono text-xs text-muted-foreground md:block">
            Press <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">⌘</kbd>{" "}
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">K</kbd> for command palette
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">
          scroll
        </div>
      </motion.div>
    </section>
  );
}
