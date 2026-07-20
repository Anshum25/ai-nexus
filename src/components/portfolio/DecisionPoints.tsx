import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./Timeline";
import { GitCommitHorizontal } from "lucide-react";

const DECISIONS = [
  {
    id: "d1",
    title: "Learn Python",
    why: "Wanted to automate tedious daily tasks rather than do them manually.",
    tradeoffs: "Slower execution speed compared to C++, but 10x faster development time.",
    outcome: "Built the foundation for all future automation and data engineering work."
  },
  {
    id: "d2",
    title: "Choose FastAPI",
    why: "Needed high performance, async support, and native OpenAPI documentation.",
    tradeoffs: "Smaller ecosystem than Django, but forced me to learn micro-architecture.",
    outcome: "Became the default backend for all high-throughput enterprise systems."
  },
  {
    id: "d3",
    title: "Master ERPNext",
    why: "Realized businesses don't need another app, they need integrated systems.",
    tradeoffs: "Steep learning curve and monolithic framework lock-in.",
    outcome: "Successfully deployed 6 modules cutting factory cycle times by 30%."
  },
  {
    id: "d4",
    title: "Build Production AI",
    why: "LLMs were too powerful to remain prototypes. Needed them working over live ERP data.",
    tradeoffs: "High latency and non-deterministic outputs required complex prompt engineering and guardrails.",
    outcome: "Deployed role-aware Enterprise AI Chatbot cutting report times by 40x."
  }
];

export function DecisionPoints() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-32 z-20">
      <SectionHeading eyebrow="Decision Path" title="Decisions over milestones." subtitle="The choices that shaped the architecture." />
      
      <div className="mt-24 relative">
        {/* The glowing path line */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2">
          <motion.div 
            className="w-full h-full bg-gradient-to-b from-[var(--cyan)] via-[var(--electric)] to-transparent opacity-50 blur-sm"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        <div className="space-y-12">
          {DECISIONS.map((decision, i) => (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Center Node */}
              <div className="absolute left-[16px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-background border border-[var(--electric)] shadow-[0_0_15px_rgba(0,180,255,0.2)] z-10">
                <GitCommitHorizontal className="w-4 h-4 text-[var(--cyan)]" />
              </div>

              {/* Content Panel */}
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <button
                  onClick={() => setActiveId(activeId === decision.id ? null : decision.id)}
                  className={`w-full text-left ${i % 2 !== 0 ? 'md:text-right' : ''} p-6 rounded-2xl glass transition-all duration-300 ${activeId === decision.id ? 'border border-[var(--cyan)] shadow-[0_0_30px_rgba(0,255,255,0.1)]' : 'border border-white/5 hover:border-white/20'}`}
                >
                  <h3 className="text-xl font-semibold text-white tracking-tight">{decision.title}</h3>
                  
                  <AnimatePresence>
                    {activeId === decision.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-4 text-sm"
                      >
                        <div className="p-4 rounded-xl bg-white/5">
                          <span className="block text-[10px] font-mono uppercase text-[var(--cyan)] mb-1">Why</span>
                          <span className="text-white/80">{decision.why}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border-l-2 border-red-500/50">
                          <span className="block text-[10px] font-mono uppercase text-red-400 mb-1">Tradeoffs</span>
                          <span className="text-white/80">{decision.tradeoffs}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--electric)]/10 border border-[var(--electric)]/30">
                          <span className="block text-[10px] font-mono uppercase text-[var(--electric)] mb-1">Outcome</span>
                          <span className="text-white">{decision.outcome}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
