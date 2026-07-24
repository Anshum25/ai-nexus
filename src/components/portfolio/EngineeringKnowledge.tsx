import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Layout, BrainCircuit, Globe, Server, Code } from "lucide-react";

const KNOWLEDGE_CATEGORIES = [
  { id: "ai", title: "Artificial Intelligence", icon: BrainCircuit },
  { id: "backend", title: "Backend Systems", icon: Terminal },
  { id: "frontend", title: "Frontend Architecture", icon: Layout },
  { id: "databases", title: "Databases", icon: Database },
  { id: "devops", title: "DevOps & Cloud", icon: Globe },
  { id: "system", title: "System Design", icon: Server },
];

const KNOWLEDGE_DATA = {
  ai: [
    {
      tech: "LangChain & LlamaIndex",
      why: "Abstraction layer for building complex multi-agent workflows and advanced RAG pipelines.",
      where: "Enterprise AI Core, ERP Data Query Agent",
      examples: "Used LangGraph to build cyclical agentic workflows for code generation.",
      lessons: "Relying too heavily on abstractions makes debugging difficult. Sometimes raw API calls are better.",
      alternatives: "Raw OpenAI/Anthropic APIs, Haystack."
    },
    {
      tech: "Qdrant",
      why: "Vector database with superior payload filtering capabilities, critical for multi-tenant enterprise data.",
      where: "Production RAG Pipelines",
      examples: "Implemented strict row-level security by filtering JWT claims against vector metadata payloads.",
      lessons: "Vector search without exact-match filtering is useless for B2B applications.",
      alternatives: "Pinecone, Weaviate, pgvector."
    }
  ],
  backend: [
    {
      tech: "FastAPI",
      why: "Asynchronous Python framework that is incredibly fast and auto-generates OpenAPI specs.",
      where: "Core AI Gateway, Microservices",
      examples: "Built the high-throughput ingestion layer for parsing 100k+ documents.",
      lessons: "Dependency injection is powerful but can become a tangled mess if not organized architecturally.",
      alternatives: "Django, Flask, Node.js/Express."
    },
    {
      tech: "ERPNext (Frappe)",
      why: "Batteries-included full-stack framework perfect for complex business workflows.",
      where: "Enterprise Manufacturing Systems",
      examples: "Re-engineered standard manufacturing modules to support IoT hardware webhooks.",
      lessons: "Monkey-patching core ERP logic leads to upgrade hell. Always use standard hooks and overrides.",
      alternatives: "Odoo, Custom Django Apps."
    }
  ]
};

export function EngineeringKnowledge() {
  const [activeCategory, setActiveCategory] = useState("ai");
  const [activeItem, setActiveItem] = useState(0);

  const currentData = KNOWLEDGE_DATA[activeCategory as keyof typeof KNOWLEDGE_DATA] || [];
  const currentTech = currentData[activeItem];

  return (
    <div className="pt-24 pb-20 container mx-auto px-6 max-w-7xl">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Engineering Knowledge</h1>
        <p className="text-muted-foreground text-lg">A deep dive into the technologies I use, why I use them, and what I've learned.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {KNOWLEDGE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setActiveItem(0); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm whitespace-nowrap transition-all \${activeCategory === cat.id ? 'bg-[var(--electric)] text-black font-semibold' : 'glass text-[var(--foreground)] hover:bg-white/10'}`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.title}
          </button>
        ))}
      </div>

      {currentData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Tech List */}
          <div className="md:col-span-4 flex flex-col gap-3">
            {currentData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveItem(idx)}
                className={`text-left p-6 rounded-2xl transition-all border \${activeItem === idx ? 'bg-white/10 border-[var(--cyan)] shadow-[0_0_20px_rgba(0,255,255,0.1)]' : 'glass border-transparent hover:border-white/10'}`}
              >
                <h3 className="text-xl font-semibold mb-2">{item.tech}</h3>
                <p className="text-sm text-[var(--foreground)]/50 line-clamp-2">{item.why}</p>
              </button>
            ))}
          </div>

          {/* Deep Dive Panel */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {currentTech && (
                <motion.div
                  key={currentTech.tech}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                     <Code className="w-64 h-64 -mt-10 -mr-10 text-[var(--electric)]" />
                  </div>

                  <h2 className="text-3xl font-bold mb-8 text-[var(--cyan)]">{currentTech.tech}</h2>
                  
                  <div className="space-y-8 relative z-10">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Why I use it</h4>
                      <p className="text-lg text-[var(--foreground)]/90 leading-relaxed">{currentTech.why}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Where I used it</h4>
                      <div className="inline-block px-3 py-1 rounded-md bg-[var(--electric)]/10 border border-[var(--electric)]/20 text-[var(--electric)] text-sm font-mono">
                        {currentTech.where}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Examples</h4>
                      <p className="text-[var(--foreground)]/80">{currentTech.examples}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-red-400 mb-3">Lessons Learned (The Hard Way)</h4>
                      <p className="text-red-100/80">{currentTech.lessons}</p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Alternatives Considered</h4>
                      <p className="text-[var(--foreground)]/60 text-sm">{currentTech.alternatives}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      ) : (
        <div className="glass rounded-3xl p-12 text-center text-[var(--foreground)]/40 font-mono">
          Knowledge base for this category is currently being compiled...
        </div>
      )}
    </div>
  );
}
