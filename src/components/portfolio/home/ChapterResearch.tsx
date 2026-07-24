import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const EXPERIMENTS = [
  { name: "WebAssembly + Rust Execution Engine", status: "In Progress" },
  { name: "Deterministic Output Parsers for LLMs", status: "Evaluating" },
  { name: "Multi-Agent Orchestration via LangGraph", status: "Production" },
];

export function ChapterResearch() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        
        <div className="w-full md:w-1/3">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
            07 / The Lab
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
            Active Research
          </h2>
          <p className="text-[var(--muted-foreground)] font-light leading-relaxed mb-8">
            Engineering is continuous learning. I dedicate 20% of my time to exploring edge-case technologies and testing their viability for enterprise production.
          </p>
          <Link to="/lab" className="editorial-link font-medium text-[var(--foreground)] pb-1 inline-flex items-center gap-2">
            Enter the Lab <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {EXPERIMENTS.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 border border-[var(--border)] rounded-sm bg-[var(--background)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              <h3 className="text-xl font-medium text-[var(--foreground)] mb-4 md:mb-0">
                {exp.name}
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-xs uppercase text-[var(--muted-foreground)]">
                  {exp.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
