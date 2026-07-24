import { motion } from "framer-motion";
import { ArrowDown, Check, X, ArrowRight, Server, Database, Code2, Bot, Layers, Terminal, AlertTriangle, CheckCircle, RefreshCcw, Activity } from "lucide-react";

export function DossierArchitectureFlow() {
  const nodes = [
    { id: "api", label: "API Gateway", icon: Server },
    { id: "retriever", label: "Semantic Retriever", icon: Search },
    { id: "db", label: "Vector Database", icon: Database },
    { id: "prompt", label: "Prompt Builder", icon: Code2 },
    { id: "llm", label: "LLM Engine", icon: Bot },
    { id: "response", label: "Structured Response", icon: CheckCircle },
  ];

  return (
    <div className="glass p-6 md:p-10 rounded-2xl border border-white/5 bg-black/20 my-10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--cyan)] mb-10">Architecture Flow</h3>
      
      <div className="flex flex-col items-center gap-2 relative z-10">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 flex items-center gap-3 hover:bg-white/10 hover:border-[var(--cyan)] transition-colors cursor-pointer group/node"
            >
              <node.icon className="w-4 h-4 text-[var(--foreground)]/50 group-hover/node:text-[var(--cyan)] transition-colors" />
              <span className="font-mono text-sm text-[var(--foreground)]/80 group-hover/node:text-[var(--foreground)]">{node.label}</span>
            </motion.div>
            
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 24, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.1 }}
                className="w-px bg-gradient-to-b from-white/20 to-[var(--cyan)]/50 my-2 relative"
              >
                <ArrowDown className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 text-[var(--cyan)]" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DossierEngineeringDecisions() {
  return (
    <div className="glass p-8 rounded-2xl border border-[var(--electric)]/20 bg-gradient-to-br from-[var(--electric)]/5 to-transparent my-10">
      <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--electric)] mb-8 flex items-center gap-2">
        <Layers className="w-4 h-4" /> Architecture Review Decision
      </h3>
      
      <div className="flex flex-col gap-6 font-mono">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[var(--foreground)]/40 uppercase w-20 text-right">Problem</span>
          <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-sm text-[var(--foreground)]/80">Need Vector Database with Payload Filtering</div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[var(--foreground)]/40 uppercase w-20 text-right">Options</span>
          <div className="flex gap-3 text-xs">
            <span className="px-3 py-1.5 bg-white/5 rounded text-[var(--foreground)]/50 border border-white/5">Chroma</span>
            <span className="px-3 py-1.5 bg-white/5 rounded text-[var(--foreground)]/50 border border-white/5">Pinecone</span>
            <span className="px-3 py-1.5 bg-[var(--electric)]/20 text-[var(--electric)] rounded border border-[var(--electric)]/30 font-bold">Qdrant</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[var(--foreground)]/40 uppercase w-20 text-right">Selected</span>
          <div className="px-4 py-2 bg-[var(--electric)]/10 rounded border border-[var(--electric)]/30 text-sm font-bold text-[var(--foreground)] shadow-[0_0_15px_rgba(138,43,226,0.2)]">Qdrant</div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-[10px] text-[var(--foreground)]/40 uppercase w-20 text-right pt-2">Why</span>
          <div className="px-4 py-3 bg-white/5 rounded border border-white/10 text-sm text-[var(--foreground)]/70 max-w-md leading-relaxed font-sans">
            Superior handling of multi-tenant metadata filtering at the database level, preventing retrieval hallucinations while maintaining &lt;50ms query latency.
          </div>
        </div>
      </div>
    </div>
  );
}

export function DossierFailureTimeline() {
  const timeline = [
    { phase: "Problem", text: "Multi-tenant data leakage in vector retrieval", status: "neutral" },
    { phase: "Attempt 1", text: "Post-retrieval filtering in Python", status: "fail" },
    { phase: "Failure", text: "OOM errors on large context windows", status: "fail" },
    { phase: "Attempt 2", text: "Separate collections per tenant", status: "fail" },
    { phase: "Failure", text: "Unscalable architecture, hitting connection limits", status: "fail" },
    { phase: "Final Solution", text: "Pre-retrieval payload filtering using Qdrant Native Roles", status: "success" },
  ];

  return (
    <div className="p-8 rounded-2xl border border-red-500/10 bg-red-500/5 my-10 relative overflow-hidden">
      <h3 className="font-mono text-xs uppercase tracking-widest text-red-400 mb-8 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Failure & Evolution Timeline
      </h3>
      
      <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/10">
        {timeline.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center bg-background border-2 ${
              item.status === 'success' ? 'border-green-500 text-green-500' :
              item.status === 'fail' ? 'border-red-500 text-red-500' :
              'border-white/30 text-[var(--foreground)]/30'
            }`}>
              {item.status === 'success' ? <CheckCircle className="w-3 h-3" /> :
               item.status === 'fail' ? <X className="w-3 h-3" /> :
               <Activity className="w-3 h-3" />}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--foreground)]/40 mb-1">{item.phase}</div>
            <div className={`text-sm ${item.status === 'success' ? 'text-green-400 font-semibold' : 'text-[var(--foreground)]/80'}`}>
              {item.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function DossierBuildReplay() {
  const versions = [
    { v: "v0", label: "Prototype", active: true },
    { v: "v1", label: "Alpha", active: false },
    { v: "v2", label: "Beta", active: false },
    { v: "v3", label: "Production", active: false },
  ];

  return (
    <div className="glass p-8 rounded-2xl border border-white/10 my-10 text-center">
      <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)]/50 mb-8">Build Replay</h3>
      <div className="flex justify-center items-center gap-4 mb-8">
        {versions.map((ver, i) => (
          <div key={ver.v} className="flex items-center gap-4">
            <div className={`flex flex-col items-center gap-2 cursor-pointer group`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm border transition-all ${ver.active ? 'bg-[var(--cyan)]/20 border-[var(--cyan)] text-[var(--cyan)] shadow-[0_0_15px_var(--cyan)]' : 'bg-white/5 border-white/10 text-[var(--foreground)]/50 group-hover:border-[var(--cyan)]/50'}`}>
                {ver.v}
              </div>
              <span className={`text-[9px] font-mono uppercase tracking-widest ${ver.active ? 'text-[var(--cyan)]' : 'text-[var(--foreground)]/30'}`}>{ver.label}</span>
            </div>
            {i < versions.length - 1 && <div className="w-12 h-[1px] bg-white/10" />}
          </div>
        ))}
      </div>
      <div className="aspect-video w-full max-w-2xl mx-auto rounded-xl bg-black/50 border border-white/5 flex items-center justify-center group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <pre className="font-mono text-[8px] sm:text-[10px] text-[var(--cyan)] opacity-30 group-hover:opacity-60 transition-opacity whitespace-pre-wrap text-left p-6">
{`version: 0.1.0-alpha
build_status: success
deploy_target: internal-sandbox

> initializing vector stores... [ok]
> loading embedding model (all-MiniLM-L6-v2)... [ok]
> establishing db connections... [warn: high latency]
> api gateway listening on port 8000
`}
        </pre>
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all hover:scale-110">
          <Play className="w-6 h-6 text-[var(--foreground)] ml-1" />
        </div>
      </div>
    </div>
  );
}

export function DossierTechnologyMap() {
  return (
    <div className="glass p-8 rounded-2xl border border-white/10 my-10 relative h-[400px] overflow-hidden flex items-center justify-center group">
      <h3 className="absolute top-8 left-8 font-mono text-xs uppercase tracking-widest text-[var(--foreground)]/50 z-20">Technology Map</h3>
      
      {/* Interactive Graph Base */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,255,0.3))" }}>
        <path d="M 50% 50% L 30% 30% M 50% 50% L 70% 30% M 50% 50% L 20% 60% M 50% 50% L 80% 60% M 50% 50% L 50% 80%" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="group-hover:opacity-80 group-hover:stroke-[var(--electric)] transition-all duration-700" />
      </svg>
      
      <div className="relative z-10 w-full h-full">
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-[var(--cyan)]/20 border border-[var(--cyan)] text-[var(--foreground)] font-mono text-sm rounded shadow-[0_0_30px_var(--cyan)] cursor-pointer hover:scale-110 transition-transform backdrop-blur">
          FastAPI
        </div>
        {/* Nodes */}
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white/5 border border-white/10 text-[var(--foreground)]/70 font-mono text-xs rounded cursor-pointer hover:bg-white/10 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all">Authentication</div>
        <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white/5 border border-white/10 text-[var(--foreground)]/70 font-mono text-xs rounded cursor-pointer hover:bg-white/10 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all">Qdrant</div>
        <div className="absolute top-[60%] left-[20%] -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white/5 border border-white/10 text-[var(--foreground)]/70 font-mono text-xs rounded cursor-pointer hover:bg-white/10 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all">Docker</div>
        <div className="absolute top-[60%] left-[80%] -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white/5 border border-white/10 text-[var(--foreground)]/70 font-mono text-xs rounded cursor-pointer hover:bg-white/10 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all">MySQL</div>
        <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--electric)]/10 border border-[var(--electric)]/30 text-[var(--electric)] font-mono text-xs rounded cursor-pointer hover:bg-[var(--electric)]/20 transition-all font-bold">LLMs</div>
      </div>
    </div>
  );
}

// A simple Icon mock since lucide-react might not export Search from the top properly if we don't include it. 
// Note: We imported Search above.
