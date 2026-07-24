import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const HIGHLIGHTS = [
  { era: "2018", title: "Started Programming", desc: "Wrote my first line of Python." },
  { era: "2020", title: "Backend Development", desc: "Built resilient APIs in Django." },
  { era: "2022", title: "Distributed Systems", desc: "Migrated monoliths to microservices." },
  { era: "2023", title: "Artificial Intelligence", desc: "Began working with LLM orchestration." },
  { era: "2024", title: "Production AI", desc: "Deployed autonomous agents to enterprise." },
];

export function Ch03_Journey() {
  return (
    <section className="w-full bg-[var(--background)] py-40 px-6 lg:px-12 border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
          03 / Engineering Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-24">
          The path to autonomy.
        </h2>

        {/* Timeline Line */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between relative mb-24 max-w-5xl">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-4 left-0 right-0 h-px bg-[var(--border)] z-0" />
          
          {/* Vertical Line for Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[var(--border)] z-0" />

          {HIGHLIGHTS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center bg-[var(--background)] px-4 py-8 md:py-0 md:px-2 w-full md:w-40"
            >
              <div className="w-3 h-3 rounded-full bg-[var(--foreground)] mb-6 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
              <span className="font-mono text-xs text-[var(--muted-foreground)] mb-4">{item.era}</span>
              <h3 className="font-medium text-[var(--foreground)] text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link to="/experience" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-medium hover:bg-[var(--foreground)]/90 transition-colors rounded-full text-sm">
          View Full Journey <ArrowRight className="w-4 h-4" />
        </Link>
        
      </div>
    </section>
  );
}
