import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Database, Search, Filter, Server, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

export function PromptLab() {
  const [query, setQuery] = useState('How many trainees passed the exam?');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(-1);
  const [response, setResponse] = useState('');

  const stages = [
    { id: 0, label: 'Embedding Model', icon: Server, desc: 'Converting query to high-dimensional vector [0.014, -0.052...]' },
    { id: 1, label: 'Vector Retriever', icon: Database, desc: 'HNSW Graph Search against Qdrant database (k=5)' },
    { id: 2, label: 'Metadata Filtering', icon: Filter, desc: 'Isolating documents for tenant_id="acme_corp"' },
    { id: 3, label: 'Context Injection', icon: Search, desc: 'Assembling top 5 chunks into the LLM prompt' },
    { id: 4, label: 'LLM Generation', icon: MessageSquare, desc: 'Streaming response from GPT-4o' },
    { id: 5, label: 'Guardrail Validation', icon: CheckCircle, desc: 'Checking for PII leakage and hallucination' },
  ];

  const handleRun = () => {
    if (isRunning || !query) return;
    setIsRunning(true);
    setActiveStage(0);
    setResponse('');
  };

  useEffect(() => {
    if (!isRunning) return;

    if (activeStage < stages.length) {
      const timer = setTimeout(() => {
        setActiveStage(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setResponse("Based on the training records retrieved, 142 out of 150 trainees passed the Q3 compliance exam (94.6% pass rate).");
      const timer = setTimeout(() => setIsRunning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [activeStage, isRunning, stages.length]);

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-mono uppercase tracking-tight text-[var(--foreground)] mb-2">Prompt Lab</h2>
        <p className="text-[var(--foreground)]/50 text-sm">Visualize the exact execution trace of a Retrieval-Augmented Generation (RAG) query.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Left: Input & Pipeline */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <label className="text-[10px] font-mono text-[var(--cyan)] uppercase tracking-widest mb-2 block">User Query</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-[var(--foreground)] font-mono text-sm resize-none focus:outline-none focus:border-[var(--cyan)] transition-colors h-24 mb-4"
              placeholder="Ask a question..."
            />
            <button 
              onClick={handleRun}
              disabled={isRunning || !query}
              className={`w-full py-3 rounded-lg font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isRunning ? 'bg-white/5 text-[var(--foreground)]/30 cursor-not-allowed' : 'bg-[var(--cyan)]/20 text-[var(--cyan)] border border-[var(--cyan)]/50 hover:bg-[var(--cyan)] hover:text-black'}`}
            >
              {isRunning ? <span className="animate-pulse">Executing Pipeline...</span> : <><Play className="w-4 h-4" /> Run Pipeline</>}
            </button>
          </div>

          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
            <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest mb-6">Execution Trace</h3>
            
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />
              
              <div className="space-y-6">
                {stages.map((stage, i) => {
                  const isActive = activeStage === i;
                  const isPast = activeStage > i;
                  return (
                    <div key={stage.id} className={`relative flex items-start gap-6 transition-all duration-500 ${isActive ? 'opacity-100' : isPast ? 'opacity-50' : 'opacity-20'}`}>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 transition-colors duration-500 ${isActive ? 'bg-[var(--cyan)] border-[var(--cyan)] text-black shadow-[0_0_15px_var(--cyan)]' : isPast ? 'bg-white/20 border-white/30 text-[var(--foreground)]' : 'bg-black border-white/10 text-[var(--foreground)]/30'}`}>
                        <stage.icon className="w-4 h-4" />
                      </div>
                      <div className="pt-1.5">
                        <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${isActive ? 'text-[var(--cyan)]' : 'text-[var(--foreground)]'}`}>{stage.label}</div>
                        <div className="text-[10px] text-[var(--foreground)]/40">{stage.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Data Visualization */}
        <div className="lg:col-span-7 bg-[var(--background)] border border-white/10 rounded-xl p-6 relative overflow-hidden flex items-center justify-center min-h-[500px]">
          {/* Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <AnimatePresence mode="wait">
            {activeStage === -1 && !response && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[var(--foreground)]/30 font-mono text-sm uppercase tracking-widest">
                Awaiting Query...
              </motion.div>
            )}

            {activeStage === 0 && (
              <motion.div key="embed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                <div className="text-[10px] font-mono text-[var(--cyan)] uppercase tracking-widest mb-4">Vector Output</div>
                <div className="font-mono text-xs text-[var(--foreground)]/50 break-all leading-relaxed bg-black p-4 rounded border border-white/10">
                  [ 0.01423, -0.05211, 0.99231, -0.11234, 0.44321, -0.88412, 0.11234, -0.00123, 0.55432, -0.77654, 0.33211, -0.99876, 0.11234 ... (1536 dimensions) ]
                </div>
              </motion.div>
            )}

            {activeStage === 1 && (
              <motion.div key="retrieve" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full border border-[var(--cyan)]/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-[var(--cyan)]/40 animate-[spin_7s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center text-[var(--cyan)]">
                  <Database className="w-12 h-12" />
                </div>
                {/* Simulated points */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--electric)] rounded-full animate-ping" />
                <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping delay-75" />
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[var(--cyan)] rounded-full animate-ping delay-150" />
              </motion.div>
            )}

            {activeStage === 2 && (
              <motion.div key="filter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-md space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-black border border-white/10 rounded">
                    <span className="font-mono text-xs text-[var(--foreground)]/50">doc_id_{Math.floor(Math.random() * 10000)}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded ${i === 2 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                      {i === 2 ? 'Tenant Mismatch' : 'Approved'}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeStage === 3 && (
              <motion.div key="context" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md bg-black border border-[var(--cyan)]/30 rounded-lg p-6">
                <div className="text-[10px] font-mono text-[var(--cyan)] uppercase mb-2">Final Prompt Payload</div>
                <div className="text-xs text-[var(--foreground)]/70 font-mono space-y-2">
                  <div>System: You are an AI assistant. Answer based ONLY on context.</div>
                  <div className="text-[var(--foreground)]/40">--- Context ---</div>
                  <div className="bg-white/5 p-2 rounded">Chunk 1: Q3 Trainee exam records show 142 passes...</div>
                  <div className="bg-white/5 p-2 rounded">Chunk 2: The total cohort size for Q3 was 150...</div>
                  <div className="text-[var(--foreground)]/40">--- Query ---</div>
                  <div>User: {query}</div>
                </div>
              </motion.div>
            )}
            
            {activeStage === 4 && (
              <motion.div key="generate" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-[var(--electric)]/20 rounded-full flex items-center justify-center border border-[var(--electric)]">
                    <MessageSquare className="w-8 h-8 text-[var(--electric)] animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-2 border-t-[var(--electric)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                </div>
                <div className="font-mono text-xs text-[var(--electric)] uppercase tracking-widest">Generating Tokens...</div>
              </motion.div>
            )}

            {activeStage === 5 && (
              <motion.div key="validate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <CheckCircle className="w-20 h-20 text-green-400" />
                <div className="font-mono text-xs text-green-400 uppercase tracking-widest text-center">
                  Output Validated<br/><span className="text-[var(--foreground)]/40 text-[9px]">0 PII Violations detected</span>
                </div>
              </motion.div>
            )}

            {response && (
              <motion.div key="response" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
                <div className="bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 rounded-xl p-8 shadow-[0_0_30px_rgba(0,180,255,0.1)]">
                  <div className="text-[10px] font-mono text-[var(--cyan)] uppercase tracking-widest mb-4">Final System Response</div>
                  <p className="text-[var(--foreground)]/90 leading-relaxed font-serif text-lg">
                    {response}
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
