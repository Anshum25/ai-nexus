import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Cpu, Rocket, LayoutTemplate, Database, Network, BookOpen } from 'lucide-react';

export function KnowledgeVault() {
  const [activeBook, setActiveBook] = useState<number | null>(null);

  const books = [
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Backend", desc: "The definitive guide to distributed systems.", lessons: "Fundamentally changed how I view data consistency, replication lag, and partition tolerance. I now design every database schema with sharding in mind." },
    { title: "Deep Learning", author: "Ian Goodfellow", category: "AI", desc: "Mathematical foundation for neural networks.", lessons: "Moving beyond API wrappers. Understanding backpropagation and loss functions allowed me to fine-tune custom embedding models effectively." },
    { title: "Clean Architecture", author: "Robert C. Martin", category: "System Design", desc: "Software structure and design.", lessons: "Taught me the Dependency Inversion Principle. I now strictly separate my core business logic from database models (ORMs) and web frameworks (FastAPI)." },
    { title: "Site Reliability Engineering", author: "Google", category: "DevOps", desc: "How Google runs production systems.", lessons: "Embraced Error Budgets. I no longer strive for 100% uptime, but rather 99.9% uptime with 0.1% allocated for rapid experimentation and deployment risk." },
  ];

  const roadmap = {
    known: ["Python/FastAPI", "TypeScript/React", "Docker/K8s", "PostgreSQL", "Redis", "Vector DBs (Qdrant)"],
    learning: ["Rust (for performance)", "CUDA optimization", "Multi-Agent Orchestration"],
    next: ["WebAssembly", "Custom LLM Training", "Hardware-accelerated Inference"]
  };

  const nextProjects = [
    { title: "Autonomous Engineering Agents", icon: Cpu, desc: "Building a swarm of LLM agents capable of reading JIRA tickets, writing code, and running their own test suites before opening PRs." },
    { title: "Real-time Voice Intelligence", icon: Rocket, desc: "Moving away from text-based chatbots to sub-200ms latency voice models (like GPT-4o native audio) for industrial control systems." }
  ];

  return (
    <div className="w-full space-y-32">
      
      {/* SECTION 07: BOOKSHELF */}
      <section id="bookshelf" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 07</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">The Bookshelf</h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-xl font-serif italic">The foundational texts that shaped my engineering mindset.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveBook(activeBook === i ? null : i)}
              className="group cursor-pointer relative"
            >
              {/* 3D Book Cover Effect */}
              <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 overflow-hidden relative z-10 ${activeBook === i ? 'bg-[var(--cyan)]/10 border-[var(--cyan)]/50' : 'bg-black border-white/10 group-hover:-translate-y-2 group-hover:border-white/30'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />
                
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--foreground)]/40 mb-4">{book.category}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-1 leading-tight">{book.title}</h3>
                <p className="text-sm font-serif italic text-[var(--foreground)]/50 mb-6">{book.author}</p>
                
                <AnimatePresence>
                  {activeBook === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 border-t border-white/10">
                      <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">How I Applied It</div>
                      <p className="text-sm text-[var(--foreground)]/80 leading-relaxed font-mono">{book.lessons}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {!activeBook || activeBook !== i ? (
                  <div className="text-xs text-[var(--foreground)]/40 font-mono flex items-center gap-2 mt-4">
                    <BookOpen className="w-3 h-3" /> Click to open
                  </div>
                ) : null}
              </div>
              
              {/* Book Shadow */}
              <div className="absolute -bottom-4 inset-x-4 h-12 bg-black/50 blur-xl -z-10 transition-opacity group-hover:opacity-100 opacity-50" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 08: LEARNING ROADMAP */}
      <section id="roadmap" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 08</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">Learning Roadmap</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-green-400 mb-6 flex items-center gap-2"><Database className="w-4 h-4" /> Production Ready</h3>
            <ul className="space-y-3">
              {roadmap.known.map(tech => <li key={tech} className="text-sm text-[var(--foreground)]/80 font-mono">{tech}</li>)}
            </ul>
          </div>
          <div className="bg-[var(--cyan)]/5 border border-[var(--cyan)]/20 p-6 rounded-2xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--cyan)] mb-6 flex items-center gap-2"><Cpu className="w-4 h-4" /> Currently Learning</h3>
            <ul className="space-y-3">
              {roadmap.learning.map(tech => <li key={tech} className="text-sm text-[var(--foreground)] font-mono">{tech}</li>)}
            </ul>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl opacity-50 hover:opacity-100 transition-opacity">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)]/40 mb-6 flex items-center gap-2"><Network className="w-4 h-4" /> Future Goals</h3>
            <ul className="space-y-3">
              {roadmap.next.map(tech => <li key={tech} className="text-sm text-[var(--foreground)]/60 font-mono">{tech}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 12: WHAT I'M BUILDING NEXT */}
      <section id="next" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 border-b border-white/10 pb-8">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 12</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">What I'm Building Next</h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-xl font-serif italic">The frontier of my engineering research.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nextProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group hover:border-[var(--electric)]/50 transition-colors"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="w-12 h-12 bg-[var(--electric)]/20 border border-[var(--electric)] rounded-2xl flex items-center justify-center mb-6 text-[var(--electric)] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(138,43,226,0.2)]">
                <project.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">{project.title}</h3>
              <p className="text-[var(--foreground)]/60 leading-relaxed font-serif">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
