import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Workflow, X, Crosshair } from 'lucide-react';

export const Route = createFileRoute('/architecture-atlas')({
  component: ArchitectureAtlasComponent,
});

const ARCHITECTURES = [
  {
    id: "rag-multi",
    title: "Multi-Tenant RAG Pipeline",
    category: "AI Systems",
    description: "An architecture designed for enterprise environments where vector data must be strictly isolated by tenant ID at the database level before LLM context generation.",
    pros: ["Zero chance of data leakage", "High throughput", "Cacheable semantic queries"],
    cons: ["Payload filtering slows down vector search", "Complex ingestion pipeline"]
  }
];

function ArchitectureAtlasComponent() {
  const [selected, setSelected] = useState<typeof ARCHITECTURES[0] | null>(null);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  return (
    <div className="pt-24 pb-32 bg-[var(--background)] min-h-screen text-blue-100 font-mono">
      
      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <header className="mb-16 border-4 border-blue-400 p-8 bg-[var(--background)]/80 backdrop-blur-sm relative shadow-2xl">
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-400" />
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[var(--foreground)] uppercase flex items-center gap-4">
            <Crosshair className="w-10 h-10" />
            Architecture Atlas
          </h1>
          <p className="text-blue-200 uppercase tracking-widest text-sm border-t border-blue-400/50 pt-4 mt-4 inline-block">
            Project Code: NEXUS_SYS_ARCH // Standard: ISO_2026
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ARCHITECTURES.map((arch) => (
            <div 
              key={arch.id} 
              onClick={() => setSelected(arch)}
              className="bg-[var(--background)] p-8 border-2 border-blue-400 hover:bg-[var(--background)] cursor-pointer transition-colors group relative"
            >
              <div className="text-xs text-blue-300 mb-2 uppercase tracking-widest">{arch.category}</div>
              <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)] uppercase">{arch.title}</h2>
              <p className="text-blue-100/80 mb-6 text-sm">{arch.description}</p>
              
              <div className="w-full h-48 border-2 border-blue-400/50 flex items-center justify-center overflow-hidden relative">
                 <Workflow className="w-12 h-12 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                 <span className="absolute bottom-4 font-mono text-xs text-blue-300 uppercase tracking-widest bg-[var(--background)] px-2">Expand Schematic</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[var(--background)]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[var(--background)] border-4 border-blue-400 w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col lg:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 bg-blue-400/20 hover:bg-blue-400/40 border border-blue-400 rounded-none transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8 lg:p-12 lg:w-1/3 border-b-4 lg:border-b-0 lg:border-r-4 border-blue-400">
                <div className="text-xs text-blue-300 mb-2 uppercase tracking-widest">{selected.category}</div>
                <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)] uppercase">{selected.title}</h2>
                <p className="text-blue-100/80 mb-8 text-sm">{selected.description}</p>
                
                <div className="space-y-6 text-sm">
                  <div className="border border-blue-400 p-4 bg-blue-400/5">
                    <h4 className="font-bold text-[var(--foreground)] mb-2 uppercase tracking-wider border-b border-blue-400/30 pb-2">Advantages</h4>
                    <ul className="list-disc list-inside text-blue-100/80 space-y-1">
                      {selected.pros.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div className="border border-blue-400 p-4 bg-blue-400/5">
                    <h4 className="font-bold text-[var(--foreground)] mb-2 uppercase tracking-wider border-b border-blue-400/30 pb-2">Constraints</h4>
                    <ul className="list-disc list-inside text-blue-100/80 space-y-1">
                      {selected.cons.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 lg:w-2/3 flex items-center justify-center relative overflow-hidden bg-[var(--background)]">
                <svg className="w-full h-full max-w-md" viewBox="0 0 400 400">
                  <motion.rect
                    width="100" height="50" x="150" y="50"
                    fill="none" stroke="#60A5FA" strokeWidth="4"
                    custom={0} variants={draw} initial="hidden" animate="visible"
                  />
                  <motion.text x="200" y="80" fill="#60A5FA" fontSize="12" textAnchor="middle" custom={0} variants={draw} initial="hidden" animate="visible">API Gateway</motion.text>

                  <motion.line
                    x1="200" y1="100" x2="200" y2="150"
                    stroke="#60A5FA" strokeWidth="4"
                    custom={1} variants={draw} initial="hidden" animate="visible"
                  />

                  <motion.rect
                    width="120" height="60" x="140" y="150"
                    fill="none" stroke="#60A5FA" strokeWidth="4"
                    custom={2} variants={draw} initial="hidden" animate="visible"
                  />
                  <motion.text x="200" y="185" fill="#60A5FA" fontSize="12" textAnchor="middle" custom={2} variants={draw} initial="hidden" animate="visible">Semantic Cache</motion.text>

                  <motion.line
                    x1="200" y1="210" x2="200" y2="260"
                    stroke="#60A5FA" strokeWidth="4" strokeDasharray="5,5"
                    custom={3} variants={draw} initial="hidden" animate="visible"
                  />

                  <motion.circle
                    cx="200" cy="300" r="40"
                    fill="none" stroke="#60A5FA" strokeWidth="4"
                    custom={4} variants={draw} initial="hidden" animate="visible"
                  />
                  <motion.text x="200" y="305" fill="#60A5FA" fontSize="12" textAnchor="middle" custom={4} variants={draw} initial="hidden" animate="visible">Qdrant</motion.text>
                </svg>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
