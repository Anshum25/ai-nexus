import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Move, Maximize, Bot, Database, Globe } from 'lucide-react';
import { useState, useRef } from 'react';

export const Route = createFileRoute('/lab')({
  component: SpatialLabComponent,
});

const EXPERIMENTS = [
  { id: 1, title: "Agentic Web Scraper", icon: Bot, type: "Prototype", status: "WIP", color: "border-[var(--electric)] text-[var(--cyan)]", x: 100, y: 100, desc: "Playwright + structured LLM output to navigate SPAs automatically. Fails on heavy canvas sites." },
  { id: 2, title: "Postgres Vector Perf", icon: Database, type: "Benchmark", status: "Done", color: "border-green-500 text-green-400", x: 400, y: 50, desc: "Benchmarked pgvector exact search vs HNSW index. HNSW uses 3x more RAM but queries are 50x faster for 1M+ rows." },
  { id: 3, title: "Local Llama 3 Eval", icon: Cpu, type: "Research", status: "Paused", color: "border-purple-500 text-purple-400", x: 250, y: 350, desc: "Testing Ollama with Llama 3 8B. Good for basic reasoning, fails contextually on complex multi-hop RAG." },
  { id: 4, title: "Wasm Go Frontend", icon: Globe, type: "Experiment", status: "Failed", color: "border-red-500 text-red-400", x: 600, y: 250, desc: "Tried building a complete UI in Go compiled to WebAssembly. The DOM manipulation overhead wasn't worth the type safety." }
];

// Re-using Cpu icon from lucide, importing above
import { Cpu } from 'lucide-react';

function SpatialLabComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pt-24 pb-0 bg-[#050505] min-h-screen overflow-hidden flex flex-col relative" ref={containerRef}>
      
      {/* HUD overlay */}
      <div className="absolute top-24 left-6 right-6 z-20 pointer-events-none flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white drop-shadow-lg">Spatial Lab.</h1>
          <p className="text-white/60 text-sm uppercase tracking-widest font-mono drop-shadow-lg">
            Infinite canvas // Drag to explore
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-white/10 rounded-full text-white/50 text-xs font-mono backdrop-blur-md">
          <Move className="w-3 h-3" /> PAN CANVAS
        </div>
      </div>

      {/* Infinite Canvas Area */}
      <motion.div 
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        dragMomentum={false}
        className="flex-1 w-[200vw] h-[200vh] absolute top-[-50vh] left-[-50vw] cursor-grab active:cursor-grabbing"
      >
        {/* Dot grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
        
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-[var(--electric)]/50 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-1 h-1 bg-[var(--cyan)] rounded-full" />
        </div>

        {/* Scattered Nodes */}
        {EXPERIMENTS.map((exp) => (
          <motion.div
            key={exp.id}
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
            initial={{ x: '50vw', y: '50vh', marginLeft: exp.x, marginTop: exp.y }}
            className={`absolute glass p-6 rounded-2xl border ${exp.color.split(' ')[0]} w-80 shadow-2xl backdrop-blur-xl group cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors`}
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <exp.icon className={`w-5 h-5 ${exp.color.split(' ')[1]}`} />
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">{exp.type}</span>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-black/40 ${exp.color}`}>
                {exp.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{exp.desc}</p>
            
            <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize className="w-4 h-4 text-white/30" />
            </div>
          </motion.div>
        ))}
        
      </motion.div>
    </div>
  );
}
