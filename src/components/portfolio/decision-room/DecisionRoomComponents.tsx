import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ArrowDown, GitCommit, Search, Shield, Zap, Box, Server, CheckCircle, AlertTriangle, Layers, Maximize2, Minimize2 } from "lucide-react";

// Types
export interface DecisionData {
  id: string;
  title: string;
  problem: string;
  options: string[];
  chosen: string;
  reasoning: string;
  comparison: { feature: string; [key: string]: string }[];
  tradeoffs: { pros: string[]; cons: string[]; mitigation: string };
  lessons: string;
}

// ------------------------------------------------------------------
// DECISION CARD
// ------------------------------------------------------------------
export function DecisionCard({ data, isExpanded, onToggle }: { data: DecisionData, isExpanded: boolean, onToggle: () => void }) {
  return (
    <motion.div 
      layout
      onClick={() => !isExpanded && onToggle()}
      className={`glass border ${isExpanded ? 'border-[var(--cyan)]/30 bg-black/40' : 'border-white/10 hover:border-white/20 bg-white/[0.02] cursor-pointer'} rounded-2xl overflow-hidden mb-6 transition-colors group relative`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      {/* Header (Always Visible) */}
      <motion.div layout className="p-6 md:p-8 flex items-start justify-between relative z-10">
        <div>
          <motion.div layout className="font-mono text-[9px] uppercase tracking-widest text-[var(--cyan)] mb-2">
            Architecture Decision
          </motion.div>
          <motion.h3 layout className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4">
            {data.title}
          </motion.h3>
          {!isExpanded && (
            <motion.div layout className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--foreground)]/50">Chosen:</span>
              <span className="px-3 py-1 bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)] rounded text-xs font-bold shadow-[0_0_10px_rgba(0,180,255,0.1)]">
                {data.chosen}
              </span>
            </motion.div>
          )}
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 md:px-8 pb-8 relative z-10 space-y-12 border-t border-white/5 pt-8"
          >
            {/* The Problem */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-3">The Problem</h4>
              <p className="text-sm md:text-base text-[var(--foreground)]/80 leading-relaxed font-serif italic border-l-2 border-[var(--cyan)]/50 pl-4">
                {data.problem}
              </p>
            </div>

            {/* Comparison Table */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-4">Comparison Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 pr-4 font-mono text-[10px] text-[var(--foreground)]/30 uppercase font-normal">Feature</th>
                      {data.options.map(opt => (
                        <th key={opt} className={`py-3 px-4 font-mono text-[10px] uppercase font-normal ${opt === data.chosen ? 'text-[var(--cyan)] font-bold' : 'text-[var(--foreground)]/30'}`}>
                          {opt}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.comparison.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 pr-4 text-xs font-mono text-[var(--foreground)]/60">{row.feature}</td>
                        {data.options.map(opt => (
                          <td key={opt} className={`py-3 px-4 text-sm ${opt === data.chosen ? 'text-[var(--foreground)] font-medium' : 'text-[var(--foreground)]/50'}`}>
                            {row[opt]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tradeoff Timeline */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-6">Tradeoff Engineering</h4>
              <div className="pl-4 border-l border-white/10 space-y-6 relative">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[var(--cyan)] ring-4 ring-background" />
                  <div className="text-xs font-mono text-[var(--cyan)] mb-1 uppercase tracking-widest">Chosen Advantage</div>
                  <ul className="text-sm text-[var(--foreground)]/80 space-y-1">
                    {data.tradeoffs.pros.map((pro, i) => <li key={i} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> {pro}</li>)}
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-red-400 ring-4 ring-background" />
                  <div className="text-xs font-mono text-red-400 mb-1 uppercase tracking-widest">Sacrificed (Cons)</div>
                  <ul className="text-sm text-[var(--foreground)]/80 space-y-1">
                    {data.tradeoffs.cons.map((con, i) => <li key={i} className="flex items-center gap-2"><AlertTriangle className="w-3 h-3 text-red-400" /> {con}</li>)}
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-yellow-400 ring-4 ring-background" />
                  <div className="text-xs font-mono text-yellow-400 mb-1 uppercase tracking-widest">Future Mitigation</div>
                  <p className="text-sm text-[var(--foreground)]/80">{data.tradeoffs.mitigation}</p>
                </div>
              </div>
            </div>

            {/* Final Reasoning */}
            <div className="bg-[var(--cyan)]/5 border border-[var(--cyan)]/20 p-6 rounded-xl">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)] mb-3">Core Reasoning</h4>
              <p className="text-sm text-[var(--foreground)]/90 leading-relaxed">
                {data.reasoning}
              </p>
            </div>

            {/* Lessons Learned */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-3">If I started today...</h4>
              <p className="text-sm text-[var(--foreground)]/70 italic leading-relaxed">
                "{data.lessons}"
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// ARCHITECTURE WHITEBOARD
// ------------------------------------------------------------------
export function ArchitectureWhiteboard() {
  return (
    <div className="w-full aspect-[4/5] rounded-3xl border border-[var(--cyan)]/20 bg-black/40 relative overflow-hidden flex items-center justify-center group sticky top-32">
      {/* Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Animated SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* API to Auth */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M 50% 20% L 30% 40%" 
          stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" 
        />
        {/* API to DB */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
          d="M 50% 20% L 70% 40%" 
          stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" 
        />
        {/* Auth to Logic */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
          d="M 30% 40% L 50% 65%" 
          stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" 
        />
        {/* DB to Logic */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.2 }}
          d="M 70% 40% L 50% 65%" 
          stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" 
        />
        {/* Logic to Client */}
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M 50% 65% L 50% 85%" 
          stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" 
        />
      </svg>

      {/* Interactive Sticky Notes / Nodes */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 border border-white/20 backdrop-blur rounded font-mono text-xs text-[var(--foreground)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-colors cursor-pointer group/node">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[var(--foreground)] px-2 py-1 rounded text-[9px] opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-white/10">REST / tRPC</div>
        API Gateway
      </div>

      <div className="absolute top-[40%] left-[30%] -translate-x-1/2 px-4 py-2 bg-white/5 border border-white/20 backdrop-blur rounded font-mono text-xs text-[var(--foreground)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-colors cursor-pointer group/node">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[var(--foreground)] px-2 py-1 rounded text-[9px] opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-white/10">JWT Strategy</div>
        Auth Layer
      </div>

      <div className="absolute top-[40%] left-[70%] -translate-x-1/2 px-4 py-2 bg-[var(--cyan)]/20 border border-[var(--cyan)]/50 backdrop-blur rounded font-mono text-xs text-[var(--foreground)] hover:scale-110 transition-transform cursor-pointer shadow-[0_0_20px_rgba(0,180,255,0.1)] group/node">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[var(--foreground)] px-2 py-1 rounded text-[9px] opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Qdrant</div>
        Vector DB
      </div>

      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 border border-white/20 backdrop-blur rounded font-mono text-xs text-[var(--foreground)] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-colors cursor-pointer group/node">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[var(--foreground)] px-2 py-1 rounded text-[9px] opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-white/10">FastAPI / Python</div>
        Core Logic
      </div>

      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--electric)]/20 border border-[var(--electric)]/50 backdrop-blur rounded font-mono text-xs text-[var(--foreground)] hover:scale-110 transition-transform cursor-pointer shadow-[0_0_20px_rgba(138,43,226,0.1)] group/node">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[var(--foreground)] px-2 py-1 rounded text-[9px] opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Next.js Edge</div>
        Frontend Edge
      </div>

      {/* Decorative Blueprint elements */}
      <div className="absolute bottom-4 left-4 font-mono text-[8px] text-[var(--cyan)]/50 uppercase tracking-widest text-left">
        System Topology V2<br/>
        Authorized Access Only
      </div>
    </div>
  );
}
