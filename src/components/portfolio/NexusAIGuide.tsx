import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Terminal, Users, Search, Play, ArrowRight, ShieldCheck, ChevronRight, Briefcase, GraduationCap, Map } from "lucide-react";

type GuideMode = "idle" | "menu" | "tour" | "interview" | "qa";
type Persona = "recruiter" | "engineer" | "founder" | "student" | null;

export function NexusAIGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<GuideMode>("idle");
  const [persona, setPersona] = useState<Persona>(null);

  // Subtle pulse activation after "20 seconds" (using 5s for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setMode("menu");
  };

  const handleClose = () => {
    setIsOpen(false);
    setMode("idle");
    setPersona(null);
  };

  return (
    <>
      {/* Floating Activation Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
          >
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="px-4 py-2 bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-xs font-mono rounded-full border border-zinc-800 shadow-xl"
            >
              Need a guide?
            </motion.div>
            <button 
              onClick={handleOpen}
              className="w-12 h-12 rounded-full bg-[var(--electric)] flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,180,255,0.4)] hover:scale-110 transition-transform relative group"
            >
              <div className="absolute inset-0 rounded-full bg-[var(--electric)] animate-ping opacity-20" />
              <Brain className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Guide Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[200] w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-48px)] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-zinc-800 bg-black/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--electric)]/10 border border-[var(--electric)]/30 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-[var(--electric)]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--foreground)] tracking-wide">NEXUS AI</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Portfolio Intelligence</div>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-[var(--foreground)] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Dynamic Content Area */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-zinc-800">
              
              {/* STAGE 1: Persona Selection */}
              {mode === "menu" && !persona && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Welcome. This is a vast operating system. To optimize your experience, please tell me your objective.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <PersonaBtn icon={Briefcase} label="I am a Recruiter" sub="Focus on impact, roles, and skills." onClick={() => setPersona("recruiter")} />
                    <PersonaBtn icon={Terminal} label="I am an Engineer" sub="Focus on architecture, APIs, and tradeoffs." onClick={() => setPersona("engineer")} />
                    <PersonaBtn icon={Users} label="I am a Founder" sub="Focus on product thinking and scalability." onClick={() => setPersona("founder")} />
                    <PersonaBtn icon={GraduationCap} label="I am a Student" sub="Focus on learning and career journey." onClick={() => setPersona("student")} />
                  </div>
                </div>
              )}

              {/* STAGE 2: Action Menu based on Persona */}
              {mode === "menu" && persona && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Identity confirmed: <span className="text-[var(--electric)] capitalize font-bold">{persona}</span>. How would you like to proceed?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <ActionBtn icon={Map} label="Guided Tour" onClick={() => setMode("tour")} />
                    <ActionBtn icon={Search} label="Interview Mode" onClick={() => setMode("interview")} />
                    <ActionBtn icon={ShieldCheck} label="Architecture Deep Dive" onClick={() => setMode("qa")} />
                  </div>
                </div>
              )}

              {/* STAGE 3: Interview Mode */}
              {mode === "interview" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-[var(--electric)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Interview Mode</span>
                  </div>
                  
                  {/* AI Question */}
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] font-mono text-[var(--electric)] mb-2">System Query</div>
                    <p className="text-sm text-zinc-300 leading-relaxed font-semibold">
                      "I see you used Qdrant for the Enterprise AI project. How did you handle row-level security so users couldn't access documents they didn't have permission for?"
                    </p>
                  </div>

                  {/* Prepared Answer */}
                  <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-900/50 ml-4 relative">
                    <div className="absolute -left-[21px] top-4 w-4 h-[1px] bg-zinc-800" />
                    <div className="text-[10px] font-mono text-blue-400 mb-2">Prepared Response</div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Never trust the LLM to enforce permissions—it will eventually hallucinate. Instead, I moved the security boundary to the Vector DB itself. 
                      <br/><br/>
                      When embedding documents, I stored JWT role arrays directly in the Qdrant payload. During retrieval, I used Qdrant's exact-match payload filtering to restrict the similarity search *before* it even ran.
                    </p>
                  </div>

                  {/* Evidence Mode */}
                  <div className="p-3 rounded-lg border border-zinc-800 bg-black flex items-center justify-between group cursor-pointer hover:border-zinc-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center">
                        <Terminal className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--foreground)]">View Architecture Lab</div>
                        <div className="text-[10px] text-zinc-500">Evidence Attached</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[var(--foreground)] transition-colors" />
                  </div>
                  
                  <button onClick={() => setMode("menu")} className="w-full text-center text-xs text-zinc-500 hover:text-[var(--foreground)] transition-colors py-2">
                    Return to menu
                  </button>
                </div>
              )}
            </div>

            {/* Input Area (Visual only for now) */}
            <div className="p-4 border-t border-zinc-800 bg-black">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-4 pr-10 text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--electric)] transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-[var(--electric)] text-black hover:opacity-80">
                  <Play className="w-3 h-3" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PersonaBtn({ icon: Icon, label, sub, onClick }: { icon: any, label: string, sub: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-black hover:bg-zinc-900 transition-colors text-left group"
    >
      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[var(--electric)]/50 transition-colors">
        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[var(--electric)] transition-colors" />
      </div>
      <div>
        <div className="text-sm font-bold text-zinc-200">{label}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{sub}</div>
      </div>
    </button>
  );
}

function ActionBtn({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-black hover:border-zinc-600 transition-colors text-left group"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-[var(--electric)]" />
        <span className="text-sm font-medium text-zinc-300 group-hover:text-[var(--foreground)] transition-colors">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[var(--foreground)] transition-colors" />
    </button>
  );
}
