import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Ch11_Vision() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
          11 / The Horizon
        </span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-[80px] font-medium tracking-tight text-[var(--foreground)] mb-12 leading-[1.05] max-w-4xl"
        >
          Towards truly autonomous enterprise intelligence.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16 text-left">
          <div className="border border-[var(--border)] p-8 bg-[var(--surface)]">
            <h3 className="font-mono text-xs uppercase text-[var(--muted-foreground)] mb-4">Upcoming Products</h3>
            <p className="text-[var(--foreground)] font-light">Open-source deterministic routers for LangChain.</p>
          </div>
          <div className="border border-[var(--border)] p-8 bg-[var(--surface)]">
            <h3 className="font-mono text-xs uppercase text-[var(--muted-foreground)] mb-4">Research Focus</h3>
            <p className="text-[var(--foreground)] font-light">Edge-device LLM orchestration with Rust.</p>
          </div>
          <div className="border border-[var(--border)] p-8 bg-[var(--surface)]">
            <h3 className="font-mono text-xs uppercase text-[var(--muted-foreground)] mb-4">Architecture</h3>
            <p className="text-[var(--foreground)] font-light">Self-healing data pipelines via vector drift analysis.</p>
          </div>
        </div>

        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-medium hover:bg-[var(--foreground)]/90 transition-colors rounded-full text-sm">
          View Roadmap <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
