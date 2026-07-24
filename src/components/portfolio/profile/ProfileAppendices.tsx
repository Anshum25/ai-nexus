import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, TerminalSquare } from 'lucide-react';

export function ProfileAppendices() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const funFacts = [
    { key: "FAV_DEBUG_TOOL", val: "print() // and I'm tired of pretending it's not" },
    { key: "FAV_API_PROTOCOL", val: "gRPC for internal, REST for public" },
    { key: "LONGEST_SESSION", val: "19 hours (Tracking down a Redis race condition)" },
    { key: "FAV_ARCHITECTURE", val: "Event-Driven CQRS" },
    { key: "FAV_DATABASE", val: "PostgreSQL" },
  ];

  const faqs = [
    { q: "Why focus so heavily on Backend and AI?", a: "The front-end ecosystem is incredibly mature. The real bottlenecks in modern software—where companies win or lose—are in how efficiently they process data, scale their inference pipelines, and securely retrieve context. That's where the hardest problems are, and that's where I want to be." },
    { q: "Why FastAPI?", a: "Because waiting for Django to boot up in 2026 feels archaic. FastAPI's native Pydantic integration forces you to document and validate your contracts upfront, turning implicit assumptions into explicit types." },
    { q: "What's your stance on Open Source?", a: "Open source is the foundation of modern engineering. I don't just consume it; I read the source code of my dependencies before I use them. If there's a bug, I prefer opening a PR over a complaining issue." },
    { q: "Do you believe in microservices?", a: "I believe in modular monoliths until the organizational structure dictates microservices. Most teams adopt Kubernetes and microservices 3 years too early and die to infrastructure overhead." }
  ];

  return (
    <div className="w-full space-y-32">
      
      {/* SECTION 10: FUN FACTS */}
      <section id="fun-facts" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 10</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">Core Dumps (Fun Facts)</h2>
        </motion.div>

        <div className="bg-black/80 border border-white/20 rounded-xl overflow-hidden font-mono text-xs sm:text-sm">
          <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
            <TerminalSquare className="w-4 h-4 text-[var(--foreground)]/50" />
            <span className="text-[var(--foreground)]/50">nexus@engineer ~ % cat facts.json</span>
          </div>
          <div className="p-6 text-[var(--foreground)]/80 space-y-3">
            <div><span className="text-purple-400">const</span> <span className="text-blue-400">engineer_facts</span> = {'{'}</div>
            {funFacts.map((fact, i) => (
              <div key={i} className="pl-6">
                <span className="text-orange-300">"{fact.key}"</span>: <span className="text-green-400">"{fact.val}"</span>{i < funFacts.length - 1 ? ',' : ''}
              </div>
            ))}
            <div>{'}'};</div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section id="faq" className="scroll-mt-32 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 11</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-[var(--cyan)] transition-colors group"
              >
                <span className={`text-lg font-bold font-serif ${activeFaq === i ? 'text-[var(--cyan)]' : 'text-[var(--foreground)]'}`}>{faq.q}</span>
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${activeFaq === i ? 'border-[var(--cyan)] bg-[var(--cyan)]/10 text-[var(--cyan)]' : 'border-white/10 text-[var(--foreground)]/50 group-hover:border-white/30'}`}>
                  {activeFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-[var(--foreground)]/70 leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
