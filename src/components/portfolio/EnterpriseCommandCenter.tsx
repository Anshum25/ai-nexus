import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Server, Database, Shield, Zap, Activity, Key, TerminalSquare, Search, FileJson, Rewind, Brain, Globe } from "lucide-react";
import type { ProjectData } from "./ProjectWorld";
import { EngineeringReplay } from "./EngineeringReplay";
import { ThinkingMode } from "./ThinkingMode";

type Role = "Principal" | "Admin" | "Accounts";

const STATUS_CARDS = [
  { label: "API Status", value: "Healthy", color: "text-green-400" },
  { label: "Knowledge Base", value: "Synced", color: "text-blue-400" },
  { label: "Vector Index", value: "Ready", color: "text-[var(--cyan)]" },
  { label: "Database", value: "Connected", color: "text-green-400" },
  { label: "LLM Provider", value: "Available", color: "text-green-400" },
  { label: "Role Engine", value: "Active", color: "text-yellow-400" },
];

const ARCH_NODES = [
  { id: "input", label: "User Input", time: 0 },
  { id: "auth", label: "Authentication", time: 12 },
  { id: "intent", label: "Intent Detection", time: 31 },
  { id: "role", label: "Role Validation", time: 45 },
  { id: "retrieval", label: "Knowledge Retrieval", time: 57 },
  { id: "filter", label: "Metadata Filtering", time: 81 },
  { id: "prompt", label: "Prompt Generation", time: 122 },
  { id: "llm", label: "LLM Response", time: 438 },
  { id: "stream", label: "Stream Complete", time: 612 },
];

export function EnterpriseCommandCenter({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const [activeRole, setActiveRole] = useState<Role>("Principal");
  const [simulationActive, setSimulationActive] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const [showReplay, setShowReplay] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  // Architecture Simulation Loop
  useEffect(() => {
    if (!simulationActive) return;
    let current = 0;
    const interval = setInterval(() => {
      if (current >= ARCH_NODES.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSimulationActive(false);
          setActiveNode(-1);
        }, 2000);
      } else {
        setActiveNode(current);
        current++;
      }
    }, 400); // speed of simulation

    return () => clearInterval(interval);
  }, [simulationActive]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-[#0a0a0c] text-white flex flex-col overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0c]/80 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[var(--electric)]/20 border border-[var(--electric)]">
                <Server className="w-4 h-4 text-[var(--electric)]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white tracking-wide">Enterprise AI Command Center</h1>
                <div className="text-[10px] font-mono text-white/40 uppercase">Role-Aware Enterprise Intelligence Platform</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowReplay(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-xs font-medium border border-zinc-700 transition-colors">
                <Rewind className="w-3.5 h-3.5" /> Replay Build
              </button>
              <button onClick={() => setShowThinking(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-900/40 text-indigo-300 hover:text-white hover:bg-indigo-800/60 text-xs font-medium border border-indigo-700/50 transition-colors">
                <Brain className="w-3.5 h-3.5" /> Thinking Mode
              </button>
              <button onClick={onClose} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white border border-zinc-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full space-y-16">
            
            {/* Top Stats & Summary */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
                  Enterprise users spend valuable time searching across multiple systems. 
                  This platform provides intelligent, permission-aware answers using retrieval, 
                  enterprise APIs, and large language models while respecting organizational access rules.
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-[var(--cyan)]">
                      {t}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-xs font-mono text-green-400">
                    STATUS: PRODUCTION
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {STATUS_CARDS.map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="text-[10px] font-mono uppercase text-white/40 mb-2">{s.label}</div>
                    <div className={`text-sm font-semibold flex items-center gap-2 ${s.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* The Architecture Simulator */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Live Architecture Pipeline</h3>
                  <p className="text-sm text-white/40">Simulate a request through the system</p>
                </div>
                <button 
                  onClick={() => !simulationActive && setSimulationActive(true)}
                  className={`px-6 py-2 rounded font-mono text-xs uppercase flex items-center gap-2 transition-all ${
                    simulationActive 
                      ? "bg-white/10 text-white/50 cursor-not-allowed border border-white/10" 
                      : "bg-[var(--electric)]/10 text-[var(--electric)] border border-[var(--electric)] hover:bg-[var(--electric)] hover:text-black"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  {simulationActive ? "Executing..." : "Execute Request"}
                </button>
              </div>

              <div className="bg-[#111116] border border-white/10 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#111116] to-[#111116] pointer-events-none" />
                
                {/* Pipeline Nodes */}
                <div className="relative z-10 flex flex-wrap justify-center gap-4">
                  {ARCH_NODES.map((node, i) => {
                    const isActive = activeNode === i;
                    const isPast = activeNode > i;
                    return (
                      <div key={node.id} className="flex items-center gap-4">
                        <div className={`
                          w-32 p-4 rounded-lg border flex flex-col items-center justify-center text-center transition-all duration-300
                          ${isActive ? 'bg-[var(--electric)] border-white text-black shadow-[0_0_30px_rgba(0,180,255,0.4)] scale-110' : 
                            isPast ? 'bg-white/10 border-white/20 text-white/80' : 'bg-transparent border-white/10 text-white/30'}
                        `}>
                          <div className="text-xs font-semibold">{node.label}</div>
                          <div className={`text-[10px] font-mono mt-1 ${isActive ? 'text-black/60' : 'text-white/30'}`}>{node.time}ms</div>
                        </div>
                        {i < ARCH_NODES.length - 1 && (
                          <div className={`h-0.5 w-8 transition-colors duration-300 ${isPast ? 'bg-[var(--cyan)]' : 'bg-white/10'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Role Permission Visualizer */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[var(--electric)]" /> Role-Based Access Control
                </h3>
                <p className="text-white/60 mb-8">
                  Security isn't a wrapper—it's injected directly into the vector retrieval payload. 
                  Click a role below to simulate the visible knowledge graph.
                </p>
                <div className="flex gap-4">
                  {(["Principal", "Admin", "Accounts"] as Role[]).map(role => (
                    <button 
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                        activeRole === role 
                          ? "bg-white/10 border-white text-white" 
                          : "bg-transparent border-white/10 text-white/50 hover:bg-white/5"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Graph Visualizer */}
              <div className="bg-[#111116] border border-white/10 rounded-xl p-8 min-h-[300px] flex items-center justify-center relative">
                <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
                  <DataNode label="Public Records" icon={<Globe />} active={true} color="text-green-400" />
                  <DataNode label="Student Grades" icon={<FileJson />} active={activeRole === "Principal" || activeRole === "Admin"} color="text-yellow-400" />
                  <DataNode label="Payroll Docs" icon={<Database />} active={activeRole === "Accounts"} color="text-red-400" />
                  <DataNode label="System Configs" icon={<Server />} active={activeRole === "Admin"} color="text-[var(--electric)]" />
                </div>
              </div>
            </section>

            {/* Prompt Builder & Live API Playground */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Prompt Builder */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Prompt Assembly Stack</h3>
                <div className="space-y-2">
                  <PromptLayer title="System Instructions" desc="Base agent persona and formatting rules." color="bg-purple-500/10 border-purple-500/30" />
                  <PromptLayer title="Role Constraints" desc={`Injected dynamically: Role = ${activeRole}`} color="bg-yellow-500/10 border-yellow-500/30" />
                  <PromptLayer title="Vector Context" desc="Top-K filtered semantic search results." color="bg-blue-500/10 border-blue-500/30" />
                  <PromptLayer title="User Query" desc="Raw user input." color="bg-white/5 border-white/10" />
                </div>
              </div>

              {/* API Playground */}
              <div className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex flex-col font-mono text-sm">
                <div className="bg-[#111116] p-3 border-b border-white/10 flex items-center gap-3">
                  <TerminalSquare className="w-4 h-4 text-white/50" />
                  <span className="text-white/70">POST /api/v1/chat</span>
                </div>
                <div className="p-6 text-white/60 flex-1">
                  <div className="text-green-400 mb-4">{`// Simulated Request`}</div>
                  <div><span className="text-pink-400">curl</span> -X POST \</div>
                  <div className="ml-4">-H <span className="text-yellow-300">"Authorization: Bearer JWT"</span> \</div>
                  <div className="ml-4">-d <span className="text-yellow-300">'{'{'}"query": "Show pending fees"{'}'}'</span></div>
                  
                  <div className="text-[var(--cyan)] mt-8 mb-2">{`// Streaming Response`}</div>
                  <div className="text-white/90">
                    {"{"}
                    <div className="ml-4">"status": 200,</div>
                    <div className="ml-4">"role_applied": "{activeRole}",</div>
                    <div className="ml-4 text-green-400">
                      {activeRole === "Accounts" ? '"data": "3 students have pending fees. [Details]"' : '"data": "Access denied. Insufficient permissions to view fees."'}
                    </div>
                    {"}"}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Meta Layers */}
          <AnimatePresence>
            {showReplay && project && <EngineeringReplay project={project} onClose={() => setShowReplay(false)} />}
            {showThinking && project && <ThinkingMode project={project} onClose={() => setShowThinking(false)} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DataNode({ label, icon, active, color }: { label: string; icon: any; active: boolean; color: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-500 ${active ? `bg-white/5 border-white/20 ${color} shadow-[0_0_20px_currentColor]` : 'bg-transparent border-white/5 text-white/10 opacity-30'}`}>
      <div className="w-8 h-8 mb-2">{icon}</div>
      <div className="text-xs text-center">{label}</div>
    </div>
  );
}

function PromptLayer({ title, desc, color }: { title: string; desc: string; color: string }) {
  return (
    <div className={`p-4 rounded-lg border flex items-center justify-between ${color}`}>
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-xs opacity-70 font-mono">{desc}</span>
    </div>
  );
}
