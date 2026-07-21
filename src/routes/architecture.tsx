import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Layout, Server, Database, Cloud, Search, Workflow, X } from 'lucide-react';

export const Route = createFileRoute('/architecture')({
  component: ArchitectureGalleryComponent,
});

const ARCHITECTURES = [
  {
    id: "rag-multi",
    title: "Multi-Tenant RAG Pipeline",
    category: "AI Systems",
    description: "An architecture designed for enterprise environments where vector data must be strictly isolated by tenant ID at the database level before LLM context generation.",
    pros: ["Zero chance of data leakage", "High throughput", "Cacheable semantic queries"],
    cons: ["Payload filtering slows down vector search", "Complex ingestion pipeline"],
    diagram: `
[User Request] ➔ (FastAPI Gateway)
                        ↓
                 [Redis Semantic Cache]
                 /                    \\
           (Hit)                     (Miss)
             ↓                         ↓
        [Response]            (LangChain Orchestrator)
                                       ↓
                            [Qdrant Vector DB] ⟵ (Filter: tenant_id=X)
                                       ↓
                             [LLM Synthesis (GPT-4)]
                                       ↓
                                   [Response]
    `
  },
  {
    id: "event-driven",
    title: "Event-Driven Microservices",
    category: "Backend Systems",
    description: "Decoupling a monolithic Frappe application into isolated domains communicating via Apache Kafka streams.",
    pros: ["Independent scaling", "Fault tolerance", "Technology agnostic services"],
    cons: ["Eventual consistency is hard", "Operational complexity (Kafka)"],
    diagram: `
[Mobile Client] ➔ (API Gateway)
                        ↓
                 [Auth Service]
                        ↓
             (Kafka Event Stream) ⟷ [Schema Registry]
             /        |         \\
  [Inventory DB] [Order DB] [Notification DB]
    (Service)    (Service)    (Service)
    `
  }
];

function ArchitectureGalleryComponent() {
  const [selected, setSelected] = useState<typeof ARCHITECTURES[0] | null>(null);

  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Architecture Gallery.</h1>
          <p className="text-xl text-white/70 max-w-2xl">
            A visual catalog of system designs. Code changes, but robust architecture patterns scale.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ARCHITECTURES.map((arch) => (
            <div 
              key={arch.id} 
              onClick={() => setSelected(arch)}
              className="glass p-8 rounded-3xl border border-white/10 hover:border-[var(--electric)] cursor-pointer transition-colors group"
            >
              <div className="text-sm font-mono text-[var(--cyan)] mb-2 uppercase tracking-widest">{arch.category}</div>
              <h2 className="text-3xl font-bold mb-4">{arch.title}</h2>
              <p className="text-white/60 mb-6">{arch.description}</p>
              
              <div className="w-full h-48 bg-[#0a0a0a] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-[var(--electric)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Workflow className="w-12 h-12 text-white/20 group-hover:text-[var(--cyan)] transition-colors" />
                 <span className="absolute bottom-4 font-mono text-xs text-white/40">Click to view ASCII topology</span>
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
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col lg:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Info Column */}
              <div className="p-8 lg:p-12 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20">
                <div className="text-sm font-mono text-[var(--cyan)] mb-2 uppercase tracking-widest">{selected.category}</div>
                <h2 className="text-3xl font-bold mb-6">{selected.title}</h2>
                <p className="text-white/70 mb-8">{selected.description}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-green-400 mb-2 uppercase tracking-wider">Pros</h4>
                    <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                      {selected.pros.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wider">Cons</h4>
                    <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                      {selected.cons.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ASCII Diagram Column */}
              <div className="p-8 lg:p-12 lg:w-2/3 flex items-center justify-center overflow-x-auto bg-[#050505]">
                <pre className="text-green-500 font-mono text-sm leading-relaxed whitespace-pre">
                  {selected.diagram}
                </pre>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
