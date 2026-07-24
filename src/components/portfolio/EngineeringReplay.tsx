import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Rewind, FastForward, Play, Pause, ChevronRight, AlertCircle, Search, Lightbulb, Box, Network, Code2, ShieldCheck, Zap, Server, Rocket } from "lucide-react";
import type { ProjectData } from "./ProjectWorld";

const REPLAY_STAGES = [
  { id: 1, title: "Problem Discovery", icon: AlertCircle, desc: "The pain point." },
  { id: 2, title: "Research", icon: Search, desc: "Evaluating solutions." },
  { id: 3, title: "Ideation", icon: Lightbulb, desc: "Brainstorming." },
  { id: 4, title: "Prototype", icon: Box, desc: "Version 0." },
  { id: 5, title: "Architecture", icon: Network, desc: "System design." },
  { id: 6, title: "Implementation", icon: Code2, desc: "Building the core." },
  { id: 7, title: "Testing", icon: ShieldCheck, desc: "Validation." },
  { id: 8, title: "Optimization", icon: Zap, desc: "Performance tuning." },
  { id: 9, title: "Production", icon: Server, desc: "Deployment & Logs." },
  { id: 10, title: "Future", icon: Rocket, desc: "The roadmap." },
];

export function EngineeringReplay({ project, onClose }: { project: ProjectData, onClose: () => void }) {
  const [stage, setStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play logic could go here via useEffect

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[300] bg-zinc-950 flex flex-col text-zinc-100 overflow-hidden font-sans"
    >
      {/* Top Header */}
      <div className="absolute top-0 w-full flex items-center justify-between p-6 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30 flex items-center gap-2 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Replay Build
          </div>
          <span className="text-zinc-500 text-sm font-mono">{project.name}</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Viewer */}
      <div className="flex-1 relative flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <StageRenderer key={stage} stage={stage} project={project} />
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Controls */}
      <div className="relative z-20 bg-black/50 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6">
        
        {/* Progress Bar & Nodes */}
        <div className="relative flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="absolute left-0 w-full h-[2px] bg-zinc-800 top-1/2 -translate-y-1/2 z-0" />
          <motion.div 
            className="absolute left-0 h-[2px] bg-[var(--electric)] top-1/2 -translate-y-1/2 z-0 transition-all duration-500 ease-out"
            style={{ width: `${((stage - 1) / 9) * 100}%` }}
          />

          {REPLAY_STAGES.map((s) => (
            <button 
              key={s.id}
              onClick={() => setStage(s.id)}
              className="relative z-10 flex flex-col items-center group focus:outline-none"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                stage === s.id ? "bg-[var(--electric)] border-[var(--electric)] text-black scale-125 shadow-[0_0_20px_var(--electric)]" :
                stage > s.id ? "bg-zinc-800 border-zinc-600 text-zinc-300" : "bg-black border-zinc-800 text-zinc-600 group-hover:border-zinc-500"
              }`}>
                <s.icon className={`w-3.5 h-3.5 ${stage === s.id ? "opacity-100" : "opacity-60"}`} />
              </div>
              <div className={`absolute top-10 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider transition-colors ${
                stage === s.id ? "text-[var(--foreground)]" : "text-zinc-600 group-hover:text-zinc-400"
              }`}>
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button onClick={() => setStage(Math.max(1, stage - 1))} className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-[var(--foreground)] transition-colors">
            <Rewind className="w-5 h-5" />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <button onClick={() => setStage(Math.min(10, stage + 1))} className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-[var(--foreground)] transition-colors">
            <FastForward className="w-5 h-5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}

function StageRenderer({ stage, project }: { stage: number, project: ProjectData }) {
  const content = [
    // 1. Problem Discovery
    <div className="text-center max-w-3xl space-y-8">
      <div className="inline-block p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
        <AlertCircle className="w-12 h-12 mx-auto" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold">What problem are we solving?</h2>
      <p className="text-xl text-zinc-400 leading-relaxed">"{project.q1}"</p>
      <div className="pt-8 text-zinc-600 font-mono text-sm">Everything begins with pain. Code is just the resulting medication.</div>
    </div>,

    // 2. Research
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Research & Constraints</h2>
        <p className="text-zinc-400">{project.research}</p>
        <ul className="space-y-3 font-mono text-sm text-zinc-500">
          <li className="flex gap-3 items-center"><ChevronRight className="w-4 h-4 text-blue-500" /> Latency must be {"<"} 1000ms</li>
          <li className="flex gap-3 items-center"><ChevronRight className="w-4 h-4 text-blue-500" /> Must support concurrent multi-tenant loads</li>
          <li className="flex gap-3 items-center"><ChevronRight className="w-4 h-4 text-blue-500" /> Strict role-based permission boundaries</li>
        </ul>
      </div>
      <div className="aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 p-6 font-mono text-[10px] text-zinc-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900" />
        {/* Mock notes */}
        ## Evaluating DBs<br/><br/>
        Postgres: Solid, but pgvector scales poorly at 1M+ rows.<br/>
        Pinecone: Easy, but SaaS lock-in prevents on-prem deployment.<br/>
        Qdrant: Rust-based, local deployment possible, superior metadata filtering.<br/>
        <br/>
        Decision: Qdrant.
      </div>
    </div>,

    // 3. Ideation
    <div className="w-full max-w-5xl h-full max-h-[600px] relative">
      <h2 className="text-3xl font-bold text-center mb-12">The Whiteboard</h2>
      {/* Mock Sticky Notes */}
      <motion.div initial={{ rotate: -5, x: -50 }} animate={{ rotate: -2, x: 0 }} className="absolute top-20 left-10 w-64 p-6 bg-yellow-400/90 text-yellow-950 rounded shadow-xl font-handwriting text-lg">
        How do we sync the data? Webhooks from the ERP?
      </motion.div>
      <motion.div initial={{ rotate: 5, x: 50 }} animate={{ rotate: 3, x: 0 }} className="absolute top-40 right-20 w-64 p-6 bg-blue-400/90 text-blue-950 rounded shadow-xl font-handwriting text-lg">
        Don't let the LLM filter permissions. It will hallucinate! Do it in the vector DB.
      </motion.div>
      <motion.div initial={{ rotate: -1, y: 50 }} animate={{ rotate: 1, y: 0 }} className="absolute bottom-20 left-1/3 w-64 p-6 bg-pink-400/90 text-pink-950 rounded shadow-xl font-handwriting text-lg">
        Need to strip HTML from payloads before embedding or the context window explodes.
      </motion.div>
    </div>,

    // 4. Prototype
    <div className="text-center max-w-3xl space-y-8">
      <h2 className="text-3xl font-bold">Version 0 (The Ugly MVP)</h2>
      <div className="w-full aspect-video bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-black border border-white/20 p-6 font-mono text-xs text-left">
          <div className="text-green-500 mb-4">$ curl -X POST /api/v0/chat -d '{"{"}"query": "test"{"}"}'</div>
          <div className="text-zinc-300">Response: 500 Internal Server Error</div>
          <div className="text-red-500">Error: Qdrant payload size limit exceeded.</div>
          <div className="text-zinc-600 mt-4"># It was a disaster. But it proved the connection worked.</div>
        </div>
      </div>
    </div>,

    // 5. Architecture
    <div className="max-w-4xl w-full text-center space-y-8">
      <h2 className="text-3xl font-bold">System Design</h2>
      <p className="text-zinc-400">{project.architecture}</p>
      <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 flex flex-col items-center justify-center gap-6">
         {/* Abstract architecture diagram */}
         <div className="flex items-center gap-4">
           <div className="px-6 py-3 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Client</div>
           <ArrowRight className="text-zinc-600" />
           <div className="px-6 py-3 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">FastAPI</div>
           <ArrowRight className="text-zinc-600" />
           <div className="px-6 py-3 rounded bg-green-500/20 text-green-400 border border-green-500/30">Vector DB</div>
         </div>
      </div>
    </div>,

    // 6. Implementation
    <div className="max-w-5xl w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">Implementation Milestones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.implementationSteps.map((step, idx) => (
          <div key={idx} className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div className="text-[10px] font-bold uppercase text-[var(--electric)] tracking-widest mb-2">Phase {idx + 1}: {step.phase}</div>
            <p className="text-sm text-zinc-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>,

    // 7. Testing
    <div className="text-center max-w-3xl space-y-8">
      <h2 className="text-3xl font-bold">Validation & Edge Cases</h2>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="text-red-400 font-bold text-sm mb-2">Failed Test: Permission Leak</div>
          <div className="text-xs text-zinc-400">LLM accidentally summarized a document the user didn't have access to because the vector DB returned it.</div>
        </div>
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="text-green-400 font-bold text-sm mb-2">Resolution</div>
          <div className="text-xs text-zinc-400">Moved filtering to Qdrant payload match layer BEFORE similarity search.</div>
        </div>
      </div>
    </div>,

    // 8. Optimization
    <div className="text-center max-w-3xl space-y-8">
      <h2 className="text-3xl font-bold">Optimization</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 line-through">Latency: 2400ms</span>
          <ArrowRight className="text-zinc-600" />
          <span className="text-green-400 font-bold">Latency: 450ms</span>
        </div>
        <p className="text-sm text-zinc-400">Achieved by streaming LLM responses and caching frequent vector embeddings in Redis.</p>
      </div>
    </div>,

    // 9. Production
    <div className="text-center max-w-4xl space-y-8">
      <h2 className="text-3xl font-bold">Production & Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{m.value}</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500">{m.label}</div>
          </div>
        ))}
      </div>
    </div>,

    // 10. Future
    <div className="text-center max-w-3xl space-y-8">
      <div className="inline-block p-4 rounded-2xl bg-[var(--electric)]/10 border border-[var(--electric)]/20 text-[var(--electric)] mb-4">
        <Rocket className="w-12 h-12 mx-auto" />
      </div>
      <h2 className="text-4xl font-bold">The Future</h2>
      <p className="text-xl text-zinc-400 leading-relaxed">{project.future}</p>
      <div className="pt-8 text-zinc-600 font-mono text-sm">Software is never finished.</div>
    </div>
  ];

  return (
    <motion.div
      key={stage}
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center"
    >
      {content[stage - 1]}
    </motion.div>
  );
}
