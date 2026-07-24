import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Activity, ArrowRight, BookOpen, Clock, Code2, Database, 
  GitCommit, Layers, Server, Terminal, Box, Zap
} from "lucide-react";

export function CurrentStatusWidget() {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full animate-pulse" />
          Current Mission
        </div>
        <div className="text-[10px] text-[var(--foreground)]/40 font-mono">Updated 2h ago</div>
      </div>
      <div className="relative z-10">
        <h3 className="font-bold text-lg text-[var(--foreground)] mb-1">Enterprise AI Assistant</h3>
        <p className="text-sm text-[var(--foreground)]/60 mb-4">Research & Architecture Phase</p>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "35%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-[var(--cyan)] shadow-[0_0_10px_rgba(0,180,255,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function LiveActivity() {
  const activities = [
    { text: "Improved RAG Retrieval", icon: Database, time: "1h" },
    { text: "Designed Manufacturing Module", icon: Box, time: "3h" },
    { text: "Optimized SQL Generator", icon: Code2, time: "5h" },
    { text: "Experimenting with MCP", icon: Terminal, time: "1d" },
  ];

  return (
    <div className="glass p-5 rounded-2xl border border-white/10 h-full flex flex-col">
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-4">Engineering Log</div>
      <div className="space-y-4 flex-1">
        {activities.map((act, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-start gap-3 group"
          >
            <div className="mt-0.5 p-1.5 rounded-md bg-white/5 group-hover:bg-[var(--electric)]/20 transition-colors border border-white/5">
              <act.icon className="w-3 h-3 text-[var(--foreground)]/60 group-hover:text-[var(--cyan)] transition-colors" />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-xs text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] transition-colors">{act.text}</span>
              <span className="text-[9px] font-mono text-[var(--foreground)]/30">{act.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function EngineeringStats() {
  const stats = [
    { label: "Systems Deployed", value: 12, suffix: "+" },
    { label: "Architecture Designs", value: 45, suffix: "" },
    { label: "Tech Stack Nodes", value: 24, suffix: "" },
    { label: "Engineering Hours", value: 10, suffix: "k+" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {stats.map((stat, i) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          whileHover={{ y: -2 }}
          className="glass p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center group hover:border-white/10"
        >
          <div className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--cyan)] transition-colors mb-1 font-mono">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-[9px] text-[var(--foreground)]/40 uppercase tracking-widest">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function RightPanelWidgets() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Current Focus */}
      <motion.div 
        whileHover={{ x: -2 }}
        className="glass p-4 rounded-xl border border-white/5 hover:border-[var(--electric)]/40 transition-colors flex items-center gap-4 group"
      >
        <div className="w-10 h-10 rounded-full bg-[var(--electric)]/10 flex items-center justify-center border border-[var(--electric)]/30">
          <Zap className="w-4 h-4 text-[var(--cyan)]" />
        </div>
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)]/40 mb-1">Current Focus</div>
          <div className="text-sm font-semibold text-[var(--foreground)]/90 group-hover:text-[var(--foreground)]">Agentic RAG Patterns</div>
        </div>
      </motion.div>

      {/* Reading */}
      <motion.div 
        whileHover={{ x: -2 }}
        className="glass p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4 group"
      >
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-[var(--foreground)]/60" />
        </div>
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)]/40 mb-1">Currently Reading</div>
          <div className="text-xs text-[var(--foreground)]/80 group-hover:text-[var(--foreground)]">Designing Data-Intensive Apps</div>
        </div>
      </motion.div>
      
      {/* Latest Note */}
      <motion.div 
        whileHover={{ x: -2 }}
        className="glass p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors flex-1 flex flex-col justify-between group"
      >
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--cyan)] mb-3">Latest Note</div>
          <p className="text-xs text-[var(--foreground)]/70 leading-relaxed italic group-hover:text-[var(--foreground)]/90">
            "When scaling LLM requests, implementing an intermediate message queue significantly reduces hallucination bursts caused by rate limits."
          </p>
        </div>
        <div className="text-[9px] font-mono text-[var(--foreground)]/30 mt-4 text-right">Jul 23, 2026</div>
      </motion.div>
    </div>
  );
}

export function TechVisualizer() {
  // A sleek bespoke tech graph
  return (
    <div className="glass p-6 rounded-2xl border border-white/10 h-full relative overflow-hidden flex flex-col">
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-6">Architecture Stack</div>
      <div className="relative flex-1 w-full min-h-[150px] flex items-center justify-center">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 4px rgba(0,255,255,0.3))" }}>
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 1 }}
            d="M 50% 50% L 20% 20% M 50% 50% L 80% 20% M 50% 50% L 20% 80% M 50% 50% L 80% 80% M 50% 50% L 50% 10% M 50% 50% L 50% 90%" 
            stroke="var(--cyan)" 
            strokeWidth="1" 
          />
        </svg>

        {/* Center Node */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="absolute z-10 w-12 h-12 rounded-full bg-[var(--electric)]/20 border border-[var(--cyan)] flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_var(--cyan)] hover:scale-110 transition-transform cursor-pointer"
        >
          <span className="font-mono text-[10px] font-bold text-[var(--foreground)]">PYTHON</span>
        </motion.div>

        {/* Orbiting Nodes */}
        {[
          { label: "FastAPI", top: "10%", left: "50%" },
          { label: "Docker", top: "20%", left: "20%" },
          { label: "Next.js", top: "20%", left: "80%" },
          { label: "Qdrant", top: "80%", left: "20%" },
          { label: "Redis", top: "80%", left: "80%" },
          { label: "LLMs", top: "90%", left: "50%" },
        ].map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.8 + (i * 0.1) }}
            className="absolute z-10 w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-md hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all cursor-pointer hover:bg-[var(--cyan)]/10 text-[var(--foreground)]/70"
            style={{ top: node.top, left: node.left, x: "-50%", y: "-50%" }}
          >
            <span className="font-mono text-[8px] font-bold">{node.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RotatingPhilosophy() {
  const quotes = [
    "Design for maintainability.",
    "Simple scales better.",
    "Understand before optimizing.",
    "Automation beats repetition."
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(prev => (prev + 1) % quotes.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass p-5 rounded-2xl border border-white/5 h-full flex items-center justify-center text-center overflow-hidden relative group hover:border-white/10 transition-colors">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-[var(--foreground)]/80 font-light text-sm"
        >
          "{quotes[index]}"
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
