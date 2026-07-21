import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Layout, Database, Server, Box, Cloud, Settings, BookOpen, Link as LinkIcon, Code2 } from 'lucide-react';

export const Route = createFileRoute('/engineering')({
  component: EngineeringComponent,
})

const CATEGORIES = [
  { name: "Artificial Intelligence", icon: Cpu },
  { name: "Backend", icon: Terminal },
  { name: "Frontend", icon: Layout },
  { name: "Databases", icon: Database },
  { name: "DevOps", icon: Server },
  { name: "System Design", icon: Box },
  { name: "Cloud", icon: Cloud },
  { name: "Linux", icon: Settings },
];

const HUB_DATA = {
  "Artificial Intelligence": {
    overview: "Production-grade AI requires moving beyond prompt engineering into robust RAG pipelines, agentic reasoning, and custom embedding models.",
    concepts: ["Retrieval-Augmented Generation (RAG)", "Agentic Reasoning", "Vector Embeddings", "Semantic Caching", "Model Fine-tuning"],
    technologies: ["Qdrant", "LangChain", "OpenAI", "HuggingFace", "FastAPI"],
    architecture: (
      <div className="p-6 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-[var(--cyan)] overflow-x-auto my-6">
        <pre>{`[User Query] -> [Semantic Cache] -> (Hit) -> [Response]
                         |
                       (Miss)
                         |
                         v
              [Query Transformation]
                         |
                         v
               [Vector DB Search] <--- (Context) ---> [Knowledge Graph]
                         |
                         v
               [Prompt Synthesis]
                         |
                         v
                    [LLM Core]`}</pre>
      </div>
    ),
    codeSnippet: (
      <div className="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs my-6 text-slate-300">
        <span className="text-slate-500"># Semantic Caching Layer</span><br/>
        <span className="text-purple-400">def</span> <span className="text-blue-400">get_cached_response</span>(query):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;query_vector = embed(query)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;cache_hit = redis_vector.search(query_vector, threshold=<span className="text-orange-400">0.95</span>)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> cache_hit:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> cache_hit.response<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-yellow-400">None</span>
      </div>
    )
  }
};

function EngineeringComponent() {
  const [activeCategory, setActiveCategory] = useState("Artificial Intelligence");

  const data = HUB_DATA[activeCategory as keyof typeof HUB_DATA] || HUB_DATA["Artificial Intelligence"];

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-32">
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 px-4">Engineering Hub</h2>
            <nav className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    activeCategory === cat.name 
                    ? "bg-[var(--electric)]/10 text-[var(--cyan)] border border-[var(--electric)]/20 shadow-[inset_0_0_20px_rgba(0,180,255,0.1)]" 
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <header className="border-b border-white/10 pb-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">{activeCategory}</h1>
                <p className="text-xl text-white/70 leading-relaxed max-w-3xl">{data.overview}</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Concepts */}
                <div className="glass p-8 rounded-3xl border border-white/5">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6"><BookOpen className="w-5 h-5 text-[var(--electric)]" /> Core Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.concepts.map(c => <span key={c} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80">{c}</span>)}
                  </div>
                </div>

                {/* Technologies */}
                <div className="glass p-8 rounded-3xl border border-white/5">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6"><Code2 className="w-5 h-5 text-green-400" /> Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.technologies.map(t => <span key={t} className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400 font-mono">{t}</span>)}
                  </div>
                </div>
              </div>

              {/* Architecture */}
              <section>
                <h3 className="text-xl font-bold mb-4">Architecture Patterns</h3>
                {data.architecture}
              </section>

              {/* Implementation */}
              <section>
                <h3 className="text-xl font-bold mb-4">Implementation Examples</h3>
                {data.codeSnippet}
              </section>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
