import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Server, Database, Layout, Cloud, Shield, X, Code2, AlertTriangle, Lightbulb } from 'lucide-react';

export const Route = createFileRoute('/atlas')({
  component: AtlasComponent,
});

const TECH_DATA = [
  {
    category: "Backend & Systems",
    icon: Server,
    items: [
      {
        name: "FastAPI",
        overview: "A modern, fast web framework for building APIs with Python 3.8+ based on standard Python type hints.",
        why: "It forces good habits (type hinting) and auto-generates interactive API docs. Unmatched developer velocity for AI wrappers.",
        alternatives: "Flask (too barebones), Django (too opinionated/heavy for pure APIs).",
        mistakes: "Blocking the event loop by running heavy synchronous ML models without `run_in_threadpool`.",
        lessons: "Always use Pydantic models strictly at the boundary layer.",
        projects: ["Enterprise RAG Pipeline", "ERPNext Microservice Bridge"]
      },
      {
        name: "Go (Golang)",
        overview: "An open source programming language supported by Google.",
        why: "Incredible concurrency model (goroutines) and compiles to a single binary. Used for high-throughput ingestion.",
        alternatives: "Rust (steep learning curve for basic web services), Node.js (V8 overhead).",
        mistakes: "Overusing channels when simple mutexes would suffice.",
        lessons: "Share memory by communicating; do not communicate by sharing memory.",
        projects: ["High-Frequency Trading Dashboard Backend"]
      }
    ]
  },
  {
    category: "Databases & State",
    icon: Database,
    items: [
      {
        name: "Qdrant",
        overview: "A vector similarity search engine and vector database.",
        why: "Written in Rust. Supports extremely fast exact-match payload filtering which is critical for multi-tenant RAG security.",
        alternatives: "Pinecone (closed source, expensive), Milvus (too heavy).",
        mistakes: "Storing massive raw text strings in payloads instead of just metadata pointers.",
        lessons: "Filter first, vector search second. Qdrant handles this beautifully.",
        projects: ["Legal Document Analyzer", "Enterprise RAG Pipeline"]
      },
      {
        name: "PostgreSQL",
        overview: "The world's most advanced open source relational database.",
        why: "It is the gold standard for relational data. Extensions like pgvector make it incredibly versatile.",
        alternatives: "MySQL (less feature-rich for complex types), MongoDB (no relational integrity).",
        mistakes: "Not using connection poolers (PgBouncer) in serverless environments.",
        lessons: "Let the database do the work. SQL is more powerful than application-layer filtering.",
        projects: ["ERPNext Architectures", "Financial Ledgers"]
      }
    ]
  }
];

function AtlasComponent() {
  const [query, setQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<any>(null);

  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Technology Atlas.</h1>
          <p className="text-xl text-[var(--foreground)]/70 max-w-2xl">
            A deeply curated index of the stack I use in production. Every tool here has been battle-tested, cursed at, and ultimately chosen for a reason.
          </p>
        </header>

        {/* Search */}
        <div className="mb-12 relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
          <input 
            type="text" 
            placeholder="Search technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[var(--foreground)] outline-none focus:border-[var(--electric)] transition-colors"
          />
        </div>

        {/* Atlas Grid */}
        <div className="space-y-16">
          {TECH_DATA.map((category, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                <category.icon className="w-6 h-6 text-[var(--cyan)]" /> {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())).map(tech => (
                  <div 
                    key={tech.name}
                    onClick={() => setSelectedTech(tech)}
                    className="glass p-6 rounded-3xl border border-white/10 hover:border-[var(--electric)] transition-colors cursor-pointer group"
                  >
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--cyan)] transition-colors">{tech.name}</h3>
                    <p className="text-[var(--foreground)]/50 text-sm line-clamp-2">{tech.overview}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Tech Modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[var(--background)] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedTech(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8 md:p-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{selectedTech.name}</h2>
                <p className="text-xl text-[var(--foreground)]/60 mb-12">{selectedTech.overview}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--cyan)] mb-3 flex items-center gap-2"><Code2 className="w-4 h-4"/> Why I use it</h3>
                      <p className="text-[var(--foreground)]/80 leading-relaxed bg-white/5 p-4 rounded-xl">{selectedTech.why}</p>
                    </section>
                    <section>
                      <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)]/40 mb-3 flex items-center gap-2"><Shield className="w-4 h-4"/> Alternatives Considered</h3>
                      <p className="text-[var(--foreground)]/60 leading-relaxed bg-white/5 p-4 rounded-xl">{selectedTech.alternatives}</p>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-mono uppercase tracking-widest text-red-400 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Common Mistakes</h3>
                      <p className="text-[var(--foreground)]/80 leading-relaxed bg-red-500/10 border border-red-500/20 p-4 rounded-xl">{selectedTech.mistakes}</p>
                    </section>
                    <section>
                      <h3 className="text-sm font-mono uppercase tracking-widest text-yellow-400 mb-3 flex items-center gap-2"><Lightbulb className="w-4 h-4"/> Key Lessons</h3>
                      <p className="text-[var(--foreground)]/80 leading-relaxed bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">{selectedTech.lessons}</p>
                    </section>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--foreground)]/40 mb-4">Applied In Projects</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTech.projects.map((p: string) => (
                      <span key={p} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--electric)]">{p}</span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
