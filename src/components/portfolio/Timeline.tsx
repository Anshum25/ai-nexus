import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MemoryReconstruction, type MemoryNode } from "./MemoryReconstruction";

const MEMORIES: MemoryNode[] = [
  { id: "m1", type: "Education", title: "The Beginning", subtitle: "Curiosity over credentials.", year: "2019" },
  { id: "m2", type: "Company", title: "First Production", subtitle: "Building real systems for real users.", year: "2021" },
  { id: "m3", type: "ERP Journey", title: "The ERP Ecosystem", subtitle: "Mastering Frappe & enterprise workflows.", year: "2022" },
  { id: "m4", type: "Enterprise AI", title: "TRMS Architecture", subtitle: "RAG routing over ERP data.", year: "2024" },
  { id: "m5", type: "Chess Mentor", title: "Real-time AI Coach", subtitle: "Sockets, Stockfish, and sub-200ms insights.", year: "2025" },
  { id: "m6", type: "Future Vision", title: "Multi-Agent Systems", subtitle: "The next era of intelligent tooling.", year: "Future" },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMemory, setActiveMemory] = useState<MemoryNode | null>(null);

  // Lock body scroll when a memory is open
  useEffect(() => {
    if (activeMemory) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeMemory]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="journey" className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        <div className="absolute top-24 left-6 md:left-12 z-20">
          <SectionHeading eyebrow="Memory Vault" title="Engineering Identity" subtitle="Reconstruct the experiences that defined the architecture." />
        </div>

        {/* The Z-Axis Dive */}
        <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center perspective-[1000px]">
          {MEMORIES.map((node, i) => {
            const start = i * 0.12;
            const end = start + 0.3;
            
            const z = useTransform(scrollYProgress, [start, end], [-1000, 200]);
            const opacity = useTransform(scrollYProgress, [start, start + 0.15, end - 0.05, end], [0, 1, 1, 0]);
            
            const xOffset = i % 2 === 0 ? -200 : 200;
            const yOffset = (i % 3) * 50 - 50;

            return (
              <motion.div
                key={node.id}
                className="absolute z-10"
                style={{ z, opacity, x: xOffset, y: yOffset }}
              >
                <motion.button
                  layoutId={`memory-${node.id}`}
                  onClick={() => setActiveMemory(node)}
                  className="group relative glass p-6 w-[280px] md:w-[320px] rounded-2xl shadow-[0_0_40px_rgba(0,180,255,0.05)] transition-all duration-300 hover:shadow-[0_0_80px_rgba(0,180,255,0.2)] text-left"
                  data-cursor="explore"
                >
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-[var(--electric)] shadow-[0_0_10px_var(--electric)]" />
                  
                  {/* Glowing core inside capsule */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur-md" />

                  <div className="relative z-10">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)]">{node.year}</div>
                    <div className="mt-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--cyan)] transition-colors">{node.title}</div>
                    <div className="mt-2 text-sm text-[var(--foreground)]/50">{node.type}</div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--electric)]" 
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }} 
          />
        </div>
      </div>

      {/* Render the full-screen reconstruction overlay */}
      <MemoryReconstruction 
        memory={activeMemory} 
        onClose={() => setActiveMemory(null)} 
      />
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="relative z-10 pointer-events-none">
      <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]">
        {eyebrow}
      </div>
      <h2 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 max-w-md text-[var(--foreground)]/50 font-light text-sm">{subtitle}</p>}
    </div>
  );
}
