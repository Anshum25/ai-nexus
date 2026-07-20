import { motion } from "framer-motion";

const NODES = [
  { title: "Foundations", body: "Python, algorithms, data structures.", year: "2019" },
  { title: "Web Engineering", body: "React, TypeScript, Node & FastAPI.", year: "2021" },
  { title: "ERPNext / Frappe", body: "Custom apps, workflows, DocTypes.", year: "2022" },
  { title: "AI Systems", body: "LLMs, embeddings, agents, tool use.", year: "2023" },
  { title: "RAG & Vector DBs", body: "Qdrant, hybrid search, evals.", year: "2024" },
  { title: "Enterprise AI", body: "Production RAG for manufacturing.", year: "2025" },
  { title: "Today", body: "Shipping AI that survives real users.", year: "Now" },
];

export function Timeline() {
  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="Journey" title="From first script to production AI." />

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-7">
          {NODES.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative"
            >
              <div className="mx-auto hidden h-3 w-3 rounded-full bg-[var(--electric)] shadow-[0_0_20px_var(--electric)] md:block" />
              <div className="mt-4 glass p-4 transition-all duration-500 group-hover:-translate-y-1 group-hover:glow-ring">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)]">{n.year}</div>
                <div className="mt-1 text-sm font-semibold">{n.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{n.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--cyan)]">{eyebrow}</div>
      <h2 className="text-balance mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
