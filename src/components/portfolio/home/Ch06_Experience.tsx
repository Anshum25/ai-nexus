import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Autonomous Data Core",
    desc: "Migrated a legacy rule-based classification system to a probabilistic LLM orchestration layer capable of querying millions of rows securely.",
  },
  {
    title: "High-Throughput Ingestion",
    desc: "Architected a highly available microservices ecosystem capable of processing thousands of events per second with zero data loss.",
  },
  {
    title: "Enterprise ERP Modules",
    desc: "Developed custom inventory and financial reconciliation modules directly integrated into legacy SQL environments without downtime.",
  },
];

export function Ch06_Experience() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)] relative border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
              06 / Experience Preview
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)]">
              Problems solved in production.
            </h2>
          </div>
          <Link to="/experience" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] editorial-link pb-1 whitespace-nowrap">
            Explore Experience <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-16 relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-[var(--border)]" />

          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Dot */}
              <div className="absolute left-0 top-2.5 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)]" />
              
              <h3 className="text-2xl font-medium text-[var(--foreground)] tracking-tight mb-4">
                {exp.title}
              </h3>
              
              <p className="text-lg text-[var(--muted-foreground)] font-light leading-relaxed max-w-2xl">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
