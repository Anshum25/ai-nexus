import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, GitMerge, Database, Code2 } from "lucide-react";

export type MemoryNode = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  type: "Education" | "Company" | "Enterprise AI" | "ERP Journey" | "Chess Mentor" | "Future Vision";
};

export function MemoryReconstruction({ 
  memory, 
  onClose 
}: { 
  memory: MemoryNode | null; 
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl"
        >
          {/* We use layoutId to expand the capsule */}
          <motion.div 
            layoutId={`memory-${memory.id}`}
            className="relative w-full max-w-5xl h-[85vh] mx-4 rounded-3xl glass border border-white/10 shadow-[0_0_100px_rgba(0,180,255,0.15)] flex flex-col md:flex-row overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-[var(--foreground)]/70" />
            </button>

            {/* Left Sidebar - Meta */}
            <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col bg-black/40">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)] mb-4">{memory.year}</div>
                <h2 className="text-3xl font-semibold text-[var(--foreground)] tracking-tight mb-2">{memory.title}</h2>
                <div className="text-[var(--foreground)]/50 text-sm mb-8">{memory.subtitle}</div>
                
                {renderSidebarContent(memory.type)}
              </motion.div>
            </div>

            {/* Right Stage - The Reconstruction */}
            <div className="w-full md:w-2/3 p-8 relative flex items-center justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-full h-full"
              >
                {renderEnvironment(memory.type)}
              </motion.div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function renderSidebarContent(type: string) {
  if (type === "Enterprise AI") {
    return (
      <div className="space-y-4 font-mono text-xs text-[var(--foreground)]/60">
        <div className="flex items-center gap-2"><Terminal className="w-3 h-3 text-[var(--electric)]"/> Stack: FastAPI, Qdrant</div>
        <div className="flex items-center gap-2"><Database className="w-3 h-3 text-[var(--cyan)]"/> Vectors: 1M+ embeddings</div>
        <div className="flex items-center gap-2"><GitMerge className="w-3 h-3 text-[var(--electric)]"/> Deployment: Docker Swarm</div>
      </div>
    );
  }
  return (
    <div className="space-y-4 font-mono text-xs text-[var(--foreground)]/40">
      <p>System metrics initializing...</p>
      <div className="h-[1px] w-full bg-white/10" />
      <p>Extracting architectural memory...</p>
    </div>
  );
}

function renderEnvironment(type: string) {
  if (type === "Enterprise AI") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Abstract RAG Architecture Diagram */}
        <div className="flex items-center gap-4">
          <div className="glass p-4 rounded-xl flex flex-col items-center gap-2 animate-pulse">
            <Database className="w-6 h-6 text-[var(--cyan)]" />
            <span className="text-[10px] font-mono">Vector Store</span>
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-[var(--cyan)] to-[var(--electric)]" />
          <div className="glass p-6 rounded-2xl flex flex-col items-center gap-2 shadow-[0_0_30px_rgba(0,180,255,0.2)] scale-110">
            <Code2 className="w-8 h-8 text-[var(--electric)]" />
            <span className="text-[10px] font-mono">Routing Engine</span>
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-[var(--electric)] to-purple-500" />
          <div className="glass p-4 rounded-xl flex flex-col items-center gap-2">
            <Terminal className="w-6 h-6 text-purple-400" />
            <span className="text-[10px] font-mono">LLM Output</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "Chess Mentor") {
    return (
      <div className="relative w-full h-full flex items-center justify-center perspective-[800px]">
        {/* Abstract floating chessboard */}
        <motion.div 
          animate={{ rotateX: 60, rotateZ: 45 }}
          className="grid grid-cols-8 grid-rows-8 gap-0.5 p-0.5 bg-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-6 h-6 ${(Math.floor(i / 8) + i) % 2 === 0 ? "bg-white/5" : "bg-black/40"} rounded-sm transition-colors duration-1000`}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Default empty state for other environments
  return (
    <div className="w-full h-full border border-white/5 rounded-2xl bg-black/20 flex items-center justify-center">
      <div className="text-[var(--foreground)]/20 font-mono text-sm tracking-widest uppercase">
        Memory Constructing...
      </div>
    </div>
  );
}
