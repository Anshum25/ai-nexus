import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ChapterJourney() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[var(--background)]">
        
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute top-32 left-6 lg:left-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
            02 / The Journey
          </span>
          <h2 className="text-4xl font-medium tracking-tight text-[var(--foreground)] mt-4">
            Evolution of a builder.
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-24 px-6 lg:px-32 pt-20">
          
          {/* Epoch 1 */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 flex flex-col gap-6">
            <div className="text-[120px] leading-none font-serif font-light text-[var(--border)] tracking-tighter">
              2020
            </div>
            <h3 className="text-3xl font-medium text-[var(--foreground)] tracking-tight">
              The Foundations
            </h3>
            <p className="text-lg text-[var(--muted-foreground)] font-light leading-relaxed">
              Started by building monolithic backend systems. Learned the hard way how unoptimized database queries and tight coupling can bring a system to its knees under load.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">PostgreSQL</span>
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">Docker</span>
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">Python</span>
            </div>
          </div>

          {/* Epoch 2 */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 flex flex-col gap-6">
            <div className="text-[120px] leading-none font-serif font-light text-[var(--border)] tracking-tighter">
              2022
            </div>
            <h3 className="text-3xl font-medium text-[var(--foreground)] tracking-tight">
              Distributed Systems
            </h3>
            <p className="text-lg text-[var(--muted-foreground)] font-light leading-relaxed">
              Transitioned to microservices and event-driven architectures. Orchestrated massive data pipelines and discovered the beauty (and terror) of eventual consistency.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">Kubernetes</span>
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">Kafka</span>
              <span className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">Go</span>
            </div>
          </div>

          {/* Epoch 3 */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 flex flex-col gap-6">
            <div className="text-[120px] leading-none font-serif font-light text-[var(--accent)] tracking-tighter">
              2024
            </div>
            <h3 className="text-3xl font-medium text-[var(--foreground)] tracking-tight">
              AI Native Engineering
            </h3>
            <p className="text-lg text-[var(--muted-foreground)] font-light leading-relaxed">
              Currently architecting systems where deterministic code meets probabilistic models. Designing custom RAG pipelines and autonomous agents that respect strict enterprise security boundaries.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="px-3 py-1 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono">LLMOps</span>
              <span className="px-3 py-1 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono">Vector DBs</span>
              <span className="px-3 py-1 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono">Multi-Agent</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
