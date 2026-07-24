import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    role: "Senior AI Engineer",
    company: "Current Company",
    date: "2023 — Present",
    desc: "Led the migration from legacy rule-based systems to probabilistic LLM orchestration. Designed the core reasoning loop for an autonomous data analyst capable of querying millions of rows securely. Reduced hallucination rates by 95% through deterministic verification layers.",
  },
  {
    role: "Software Architect",
    company: "Previous Startup",
    date: "2021 — 2023",
    desc: "Architected a highly available microservices ecosystem capable of processing thousands of events per second. Rebuilt the primary data pipeline using Kafka and Go, reducing latency by 400% and stabilizing the ingestion of critical financial data.",
  },
  {
    role: "Backend Engineer",
    company: "Agency",
    date: "2019 — 2021",
    desc: "Developed monolithic enterprise applications using Python and PostgreSQL. Learned the fundamentals of database optimization, indexing, and writing clean, testable code in high-pressure delivery environments.",
  },
];

export function ChapterExperience() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-24">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
            06 / Impact Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)]">
            Where I've built.
          </h2>
        </div>

        <div className="flex flex-col gap-24 relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-[11px] top-4 bottom-4 w-px bg-[var(--border)]" />

          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative pl-12 md:pl-24"
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1 top-2.5 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-6">
                <h3 className="text-2xl md:text-3xl font-medium text-[var(--foreground)] tracking-tight">
                  {exp.role}
                </h3>
                <span className="font-serif italic text-xl text-[var(--muted-foreground)]">
                  at {exp.company}
                </span>
                <span className="font-mono text-xs text-[var(--muted-foreground)] md:ml-auto">
                  {exp.date}
                </span>
              </div>
              
              <p className="text-lg text-[var(--muted-foreground)] font-light leading-relaxed">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
