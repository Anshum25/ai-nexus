import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90svh] flex flex-col justify-center px-6 lg:px-12 pt-32 pb-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base font-serif italic text-[var(--muted-foreground)] tracking-wide"
        >
          Anshum Dev — AI Engineer & System Architect
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[80px] lg:text-[110px] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--foreground)] max-w-5xl"
        >
          Building intelligent systems that solve real problems.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mt-8"
        >
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] leading-relaxed font-light">
            I design and architect production-grade AI applications, from multi-agent reasoning networks to high-performance RAG pipelines.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-32 flex items-center gap-4 text-sm font-medium text-[var(--foreground)]"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          Scroll to explore
        </motion.div>

      </div>
    </section>
  );
}
