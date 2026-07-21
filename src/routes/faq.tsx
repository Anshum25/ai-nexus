import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createFileRoute('/faq')({
  component: FAQTerminalComponent,
});

const FAQ_DATA = [
  {
    id: "why_ai",
    question: "Why focus heavily on AI instead of traditional backend?",
    answer: "I haven't abandoned traditional backend. In fact, most 'AI' features fail in production because the underlying system design is weak. I focus on AI because integrating non-deterministic LLMs into strict, deterministic enterprise systems (like ERPs) is the most challenging architectural problem of this decade. Prompt engineering is easy; guaranteeing data isolation and low latency in a multi-tenant RAG pipeline is hard."
  },
  {
    id: "why_fastapi",
    question: "Why do you prefer FastAPI over Django or Node.js?",
    answer: "Django is fantastic, but it carries immense overhead when building decoupled microservices. Node.js is great for I/O, but Python is the lingua franca of AI. FastAPI sits perfectly in the middle: it's asynchronous, enforces strict validation via Pydantic (crucial when dealing with unpredictable LLM outputs), and auto-generates OpenAPI docs. Developer velocity is unmatched."
  },
  {
    id: "learning",
    question: "How do you approach learning new technologies?",
    answer: "I don't learn by watching tutorials. I learn by building something that breaks. I read the official docs, spin up a Docker container, and try to break the core abstraction. If I can understand how a tool handles state and failure, I understand the tool. Everything else is just syntax."
  },
  {
    id: "fullstack",
    question: "Are you truly 'Full Stack' or mostly Backend?",
    answer: "I am a Backend Engineer who learned how to build beautiful frontends out of necessity. I care deeply about the user experience, which is why I mastered React and Framer Motion. However, my architectural mindset always starts at the database schema and API contracts, not the UI components."
  }
];

function FAQTerminalComponent() {
  const [history, setHistory] = useState<{type: 'system' | 'user' | 'agent', text: string}[]>([
    { type: 'system', text: 'NEXUS OS // INTERROGATION PROTOCOL V1.0' },
    { type: 'system', text: 'Connecting to local LLM instance...' },
    { type: 'system', text: 'Connection established. Security clearance: GUEST.' },
    { type: 'agent', text: 'I am the Nexus virtual counterpart. Select a query to interrogate my engineering logic.' }
  ]);
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleQuery = async (faq: typeof FAQ_DATA[0]) => {
    if (streaming) return;
    setStreaming(true);
    
    // Add user query
    setHistory(prev => [...prev, { type: 'user', text: `> ${faq.question}` }]);

    // Simulate thinking
    await new Promise(r => setTimeout(r, 600));
    setHistory(prev => [...prev, { type: 'agent', text: '' }]);

    // Stream response
    const words = faq.answer.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 30 + Math.random() * 40));
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].text += words[i] + ' ';
        return newHistory;
      });
    }

    setStreaming(false);
  };

  return (
    <div className="pt-24 pb-32 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4">
            <Terminal className="w-10 h-10 text-[var(--electric)]" />
            FAQ Interrogation
          </h1>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">
            Direct interface to the engineering mindset.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[70vh]">
          
          {/* Terminal Window */}
          <div className="lg:col-span-8 flex flex-col glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--electric)]/5 to-transparent pointer-events-none" />
            
            {/* Terminal Header */}
            <div className="bg-black/80 px-4 py-3 flex items-center justify-between border-b border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-mono text-white/40 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> secure_session_0x9A
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                <Activity className="w-3 h-3 animate-pulse" /> ACTIVE
              </div>
            </div>

            {/* Terminal Output */}
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm md:text-base leading-relaxed space-y-4 relative z-10 scrollbar-none">
              {history.map((line, i) => (
                <div key={i} className={`flex ${line.type === 'user' ? 'text-[var(--cyan)]' : line.type === 'system' ? 'text-white/40' : 'text-green-400'}`}>
                  {line.type === 'agent' && <span className="mr-3 opacity-50">#</span>}
                  {line.type === 'system' && <span className="mr-3 opacity-50">~</span>}
                  <span className="flex-1">{line.text}{streaming && i === history.length - 1 && <span className="animate-pulse">_</span>}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Prompt Selection */}
          <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-none">
            <div className="text-xs font-mono text-[var(--electric)] uppercase tracking-widest mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Available Prompts
            </div>
            
            <AnimatePresence>
              {FAQ_DATA.map((faq, i) => (
                <motion.button
                  key={faq.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleQuery(faq)}
                  disabled={streaming}
                  className="text-left p-4 glass rounded-xl border border-white/10 hover:border-[var(--electric)] transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-mono text-xs text-[var(--cyan)] mb-2 flex items-center justify-between">
                    <span>Execute Query</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-sm font-semibold text-white/80 group-hover:text-white leading-snug">
                    "{faq.question}"
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
            
            <div className="mt-8 p-4 bg-black/40 border border-white/5 rounded-xl">
              <p className="text-xs font-mono text-white/40 leading-relaxed">
                SYSTEM NOTE: Responses are generated based on historical engineering data, architectural decisions, and personal philosophy parameters.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
