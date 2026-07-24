import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, BookOpen, Shield, Zap, Search, Eye, Scale, RefreshCw, Box, Lock } from 'lucide-react';

export function PhilosophyEngine() {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const principles = [
    { title: "Build systems people can maintain", story: "Early in my career, I built a highly clever, recursive algorithm to parse EDI files. It was 3x faster than the standard approach. Six months later, a junior engineer needed to add a field, couldn't understand my 'clever' code, and rewrote it.", lesson: "Clever code is a liability. Readable code is an asset." },
    { title: "Design before coding", story: "I once spent a week building a microservice only to realize during integration that the primary key strategy was fundamentally flawed for our access pattern.", lesson: "A 4-hour architecture whiteboard session saves 4 weeks of refactoring." },
    { title: "Optimize only after measuring", story: "We pre-optimized a database schema for read-heavy loads, adding complex caching layers. Production telemetry revealed 80% of operations were writes.", lesson: "Never guess where the bottleneck is. Let the profiler tell you." },
    { title: "Simple scales better", story: "We transitioned from a massive Kubernetes mesh back to a monolithic Docker Swarm for a mid-sized client. Deployment time dropped from 45 mins to 3 mins.", lesson: "Don't adopt FAANG architecture unless you have FAANG scale." },
    { title: "Documentation is engineering", story: "An undocumented legacy service went down at 2 AM. The only engineer who knew how it worked was on a flight.", lesson: "If it's not documented, it doesn't exist." },
    { title: "Fail loudly and early", story: "A silent catch block hid a critical data parsing error for a week, corrupting thousands of records.", lesson: "Systems should crash immediately upon entering an invalid state, not limp along corrupting data." },
    { title: "Security is a default, not a feature", story: "I've seen internal admin panels exposed because auth was treated as a 'Phase 2' feature.", lesson: "Zero Trust architecture starts at the first git commit." },
    { title: "Own the deployment", story: "Handing off code to a dedicated 'Ops' team creates a wall of confusion and shifts blame.", lesson: "The engineer who writes the logic must write the Dockerfile." },
    { title: "Boring technology is good", story: "We used a brand new, highly hyped NoSQL database for a critical project. Two years later, the maintainers abandoned it.", lesson: "PostgreSQL is boring. Choose PostgreSQL." },
    { title: "Embrace deletion", story: "Refactoring a 50k line monolithic codebase down to 15k lines by removing dead features was my proudest achievement at Acme Corp.", lesson: "The best code is no code at all." },
  ];

  const values = [
    { id: 'maintain', label: 'Maintainability', icon: RefreshCw, text: 'Writing code that the next engineer can understand at 3 AM.' },
    { id: 'scale', label: 'Scalability', icon: Scale, text: 'Designing architectures that gracefully handle 10x growth without complete rewrites.' },
    { id: 'read', label: 'Readability', icon: Eye, text: 'Prioritizing clear variable names and modular functions over clever one-liners.' },
    { id: 'perf', label: 'Performance', icon: Zap, text: 'Respecting the user\'s time and battery life through efficient algorithms.' },
    { id: 'sec', label: 'Security', icon: Shield, text: 'Implementing defense-in-depth and principle of least privilege.' },
    { id: 'rel', label: 'Reliability', icon: Lock, text: 'Building systems that degrade gracefully and recover automatically.' },
    { id: 'cur', label: 'Curiosity', icon: Search, text: 'Constantly dissecting how tools work under the hood instead of just using them.' },
  ];

  const thinkPhases = ['Problem', 'Research', 'Architecture', 'Prototype', 'Failure', 'Iteration', 'Deployment', 'Monitoring'];

  return (
    <div className="w-full space-y-32">
      
      {/* SECTION 02: PHILOSOPHY */}
      <section id="philosophy" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 02</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">Engineering Philosophy</h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-xl font-serif italic">Beliefs forged through production outages, failed deployments, and midnight debugging sessions.</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {principles.map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActivePrinciple(activePrinciple === i ? null : i)}
              className={`border rounded-2xl overflow-hidden cursor-pointer transition-colors ${activePrinciple === i ? 'bg-black/60 border-[var(--cyan)]/30' : 'bg-white/[0.02] border-white/10 hover:border-white/30'}`}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-[var(--foreground)]/30 uppercase tracking-widest w-8">{(i + 1).toString().padStart(2, '0')}</span>
                  <h3 className={`font-mono text-sm uppercase tracking-widest ${activePrinciple === i ? 'text-[var(--cyan)] font-bold' : 'text-[var(--foreground)]/80'}`}>
                    {principle.title}
                  </h3>
                </div>
                <ChevronRight className={`w-4 h-4 text-[var(--foreground)]/30 transition-transform ${activePrinciple === i ? 'rotate-90 text-[var(--cyan)]' : ''}`} />
              </div>
              
              <AnimatePresence>
                {activePrinciple === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-6 pt-0 border-t border-white/10 mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div>
                          <div className="font-mono text-[9px] text-[var(--cyan)] uppercase tracking-widest mb-2">The Story</div>
                          <p className="text-sm text-[var(--foreground)]/70 font-serif italic leading-relaxed">"{principle.story}"</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <div className="font-mono text-[9px] text-[var(--foreground)]/40 uppercase tracking-widest mb-2 flex items-center gap-2"><BookOpen className="w-3 h-3" /> The Lesson</div>
                          <p className="text-sm text-[var(--foreground)] font-mono leading-relaxed">{principle.lesson}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 03: HOW I THINK */}
      <section id="how-i-think" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 03</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">How I Think</h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-xl font-serif italic">The lifecycle of an engineering problem.</p>
        </motion.div>

        <div className="w-full overflow-x-auto pb-8">
          <div className="flex items-center min-w-max px-4">
            {thinkPhases.map((phase, i) => (
              <div key={phase} className="flex items-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col items-center gap-4 ${phase === 'Failure' ? 'group cursor-pointer' : ''}`}
                >
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors ${
                    phase === 'Failure' 
                    ? 'border-red-500/50 bg-red-500/10 text-red-400 group-hover:bg-red-500/20' 
                    : phase === 'Deployment' 
                    ? 'border-green-500/50 bg-green-500/10 text-green-400'
                    : 'border-[var(--cyan)]/30 bg-black text-[var(--foreground)] hover:border-[var(--cyan)]'
                  }`}>
                    <span className="font-mono text-xs font-bold">{i + 1}</span>
                  </div>
                  <div className={`font-mono text-[10px] uppercase tracking-widest ${phase === 'Failure' ? 'text-red-400' : 'text-[var(--foreground)]/50'}`}>
                    {phase}
                  </div>
                </motion.div>
                
                {i < thinkPhases.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.1, duration: 0.5 }}
                    className="w-16 h-px bg-white/20 mx-2 origin-left relative"
                  >
                    <ArrowRight className="w-3 h-3 absolute right-0 -top-1.5 text-[var(--foreground)]/30" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05: VALUES */}
      <section id="values" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 05</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">Engineering Values</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {values.map((val, i) => (
            <motion.div
              key={val.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setActiveValue(val.id)}
              onMouseLeave={() => setActiveValue(null)}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[var(--cyan)]/50 hover:bg-[var(--cyan)]/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <val.icon className="w-6 h-6 text-[var(--foreground)]/40 group-hover:text-[var(--cyan)] transition-colors mb-4 relative z-10" />
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)] mb-2 relative z-10">{val.label}</h4>
              
              <AnimatePresence>
                {activeValue === val.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative z-10 pt-2"
                  >
                    <p className="text-[10px] font-mono text-[var(--foreground)]/60 leading-relaxed">{val.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
