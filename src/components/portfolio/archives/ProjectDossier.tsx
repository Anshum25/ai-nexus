import { motion } from "framer-motion";
import { X, ArrowRight, Github, ExternalLink, Download } from "lucide-react";
import { 
  DossierArchitectureFlow, DossierEngineeringDecisions, 
  DossierFailureTimeline, DossierBuildReplay, DossierTechnologyMap 
} from "./DossierWidgets";

interface ProjectDossierProps {
  onClose: () => void;
}

export function ProjectDossier({ onClose }: ProjectDossierProps) {
  // Hardcoded for the showcase "Enterprise AI Assistant"
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      className="w-full bg-background/95 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col max-h-[85vh]"
    >
      {/* Dossier Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-[var(--cyan)]/20 flex items-center justify-center border border-[var(--cyan)]/50 text-[var(--cyan)]">
            📁
          </div>
          <div>
            <h2 className="font-bold text-lg md:text-xl text-[var(--foreground)] tracking-tight">Enterprise AI Assistant</h2>
            <div className="font-mono text-[10px] text-[var(--foreground)]/40 uppercase tracking-widest">Dossier / Production</div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-[var(--foreground)]/70" />
        </button>
      </div>

      {/* Dossier Workspace Layout */}
      <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
        
        {/* Left Navigation (Hidden on mobile) */}
        <div className="hidden lg:block w-64 border-r border-white/10 p-6 space-y-8 sticky top-0 shrink-0">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--foreground)]/30 mb-4">Contents</div>
            <nav className="flex flex-col gap-2 font-mono text-xs">
              {['Overview', 'Business Problem', 'Architecture', 'Decisions', 'Failures', 'Build Replay', 'Technology'].map((item, i) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`px-3 py-2 rounded-md ${i === 0 ? 'bg-white/10 text-[var(--foreground)]' : 'text-[var(--foreground)]/50 hover:bg-white/5 hover:text-[var(--foreground)]'} transition-colors`}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div>
             <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--foreground)]/30 mb-4">Actions</div>
             <div className="flex flex-col gap-2 font-mono text-xs">
               <button className="px-3 py-2 rounded-md border border-white/10 text-[var(--foreground)]/70 hover:bg-white/5 flex items-center gap-2 transition-colors">
                 <Download className="w-3 h-3" /> Download PDF
               </button>
             </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 p-6 md:p-12 xl:p-16 max-w-4xl mx-auto space-y-20">
          
          <section id="overview">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6 tracking-tight">Agentic RAG Platform for Enterprise Workflows</h1>
            <p className="text-lg text-[var(--foreground)]/60 font-serif italic leading-relaxed mb-12">
              A scalable intelligence layer routing millions of LLM tokens securely while enforcing strict SQL-level row permissions directly within the Vector DB payload filters.
            </p>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { l: "Modules", v: "14" },
                { l: "Endpoints", v: "45+" },
                { l: "DB Tables", v: "28" },
                { l: "Deployments", v: "Prod" }
              ].map(m => (
                <div key={m.l} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="text-2xl font-bold text-[var(--foreground)] mb-1 font-mono">{m.v}</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)]/40">{m.l}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="business problem">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)] mb-4">The Challenge</div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Business Problem</h2>
            <div className="prose prose-invert prose-p:text-[var(--foreground)]/70 prose-p:leading-relaxed max-w-none">
              <p>
                The client required an internal AI assistant capable of reasoning over thousands of proprietary documents. The critical constraint: <strong>Multi-tenant security</strong>.
              </p>
              <p>
                Standard RAG pipelines query the database and filter results post-retrieval. This approach scales poorly and risks exposing confidential data to the LLM context window if the filtering logic fails. We needed a system where the database itself denies the existence of unauthorized records during the semantic search phase.
              </p>
            </div>
          </section>

          <section id="architecture">
            <DossierArchitectureFlow />
          </section>

          <section id="decisions">
            <DossierEngineeringDecisions />
          </section>

          <section id="failures">
            <DossierFailureTimeline />
          </section>

          <section id="build replay">
            <DossierBuildReplay />
          </section>

          <section id="technology">
            <DossierTechnologyMap />
          </section>

          <section className="pt-20 border-t border-white/10 text-center">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-6">Explore Similar Architecture</div>
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[var(--foreground)] text-sm font-semibold transition-colors"
            >
              Return to Archives
            </button>
          </section>
        </div>

        {/* Right Metadata */}
        <div className="w-full lg:w-72 bg-black/20 p-6 md:p-8 shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/30 mb-6">Metadata</div>
          
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono text-[var(--foreground)]/40 mb-1">Status</div>
              <div className="flex items-center gap-2 text-sm text-[var(--foreground)]"><div className="w-2 h-2 rounded-full bg-green-500" /> Production</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--foreground)]/40 mb-1">Difficulty</div>
              <div className="text-sm text-[var(--foreground)]">High Complexity</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--foreground)]/40 mb-1">Timeline</div>
              <div className="text-sm text-[var(--foreground)]">4 Months</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--foreground)]/40 mb-2">Primary Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'Qdrant', 'React', 'Docker'].map(t => (
                  <span key={t} className="px-2 py-1 bg-white/10 rounded text-xs text-[var(--foreground)]/80">{t}</span>
                ))}
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <a href="#" className="flex items-center gap-3 text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors">
                <Github className="w-4 h-4" /> View Repository
              </a>
              <a href="#" className="flex items-center gap-3 text-sm text-[var(--cyan)] hover:text-[var(--foreground)] transition-colors">
                <ExternalLink className="w-4 h-4" /> Live System
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
