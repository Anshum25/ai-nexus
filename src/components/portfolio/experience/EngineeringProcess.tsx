import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, AlertTriangle, Target, Lightbulb, CheckCircle2 } from 'lucide-react';

interface Problem {
  title: string;
  businessNeed: string;
  constraints: string;
  solution: string;
  result: string;
}

export function EngineeringProcess({ problems }: { problems: Problem[] }) {
  const [activeProblem, setActiveProblem] = useState<number | null>(null);

  const processFlow = ['Business Sync', 'Architecture', 'Implementation', 'Testing', 'Deployment', 'Optimization'];

  return (
    <div className="w-full space-y-16">
      
      {/* 1. Engineering Process Flow */}
      <div>
        <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-6 flex items-center gap-2">
          <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
          Standard Execution Flow
        </div>
        
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex items-center min-w-max">
            {processFlow.map((step, i) => (
              <div key={step} className="flex items-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[var(--background)] border border-[var(--border)] px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/50 transition-colors"
                >
                  {step}
                </motion.div>
                {i < processFlow.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="w-12 h-px bg-[var(--border)] mx-2 origin-left relative"
                  >
                    <ArrowRight className="w-3 h-3 absolute right-0 -top-1.5 text-[var(--muted-foreground)]" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Real Problems solved */}
      <div>
        <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-6 flex items-center gap-2">
          <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
          Critical Engineering Problems Solved
        </div>

        <div className="flex flex-col gap-4">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--foreground)]/[0.02] hover:bg-[var(--foreground)]/[0.04] transition-colors"
            >
              <button 
                onClick={() => setActiveProblem(activeProblem === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${activeProblem === i ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)]'}`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className={`font-mono text-sm uppercase tracking-widest font-bold ${activeProblem === i ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/70'}`}>
                    {problem.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 text-[var(--muted-foreground)] transition-transform ${activeProblem === i ? 'rotate-90 text-[var(--accent)]' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeProblem === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-[var(--border)] mt-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Left: Context */}
                      <div className="space-y-6">
                        <div>
                          <div className="font-mono text-[9px] text-[var(--muted-foreground)] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Target className="w-3 h-3" /> Business Need
                          </div>
                          <p className="text-sm text-[var(--foreground)]/70 font-serif leading-relaxed bg-[var(--background)]/30 p-4 rounded-xl border border-[var(--border)]">{problem.businessNeed}</p>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Lock className="w-3 h-3" /> Technical Constraints
                          </div>
                          <p className="text-sm text-[var(--foreground)]/70 font-serif leading-relaxed bg-[var(--background)]/30 p-4 rounded-xl border border-[var(--border)]">{problem.constraints}</p>
                        </div>
                      </div>

                      {/* Right: Solution & Result */}
                      <div className="space-y-6">
                        <div>
                          <div className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Lightbulb className="w-3 h-3" /> Engineering Solution
                          </div>
                          <p className="text-sm text-[var(--foreground)] font-serif leading-relaxed bg-[var(--accent)]/5 p-4 rounded-xl border border-[var(--accent)]/20">{problem.solution}</p>
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-green-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" /> Production Result
                          </div>
                          <div className="text-sm text-green-400 font-mono leading-relaxed bg-green-500/5 p-4 rounded-xl border border-green-500/20">{problem.result}</div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
// Placeholder import fix
import { Lock } from 'lucide-react';
