import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, FolderOpen, FileCode2, Search, Filter, 
  Terminal, Database, Layout, Cpu, ArrowRight,
  Code, Activity, List, Layers, Shield
} from "lucide-react";

type ProjectTab = "overview" | "architecture" | "backend" | "ui" | "ai" | "metrics";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  status: string;
}

const PROJECTS: ProjectItem[] = [
  { id: "erpnext-cloud", name: "ERPNext Cloud", category: "Enterprise", icon: Database, status: "Production" },
  { id: "nexus-ai", name: "Nexus AI Agent", category: "AI Systems", icon: Cpu, status: "Active" },
  { id: "chess-mentor", name: "Chess Mentor Live", category: "Web Apps", icon: Layout, status: "Prototype" },
  { id: "qdrant-rag", name: "Enterprise RAG Pipeline", category: "AI Systems", icon: Terminal, status: "Deployed" },
];

export function ProjectExplorer() {
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>("Enterprise");
  const [activeProject, setActiveProject] = useState<ProjectItem>(PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

  const categories = Array.from(new Set(PROJECTS.map(p => p.category)));
  const filteredProjects = PROJECTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 flex flex-col">
      <div className="container mx-auto max-w-7xl flex-1 flex flex-col border border-white/10 rounded-2xl overflow-hidden glass shadow-2xl">
        
        {/* Top Title Bar */}
        <div className="h-10 bg-black/40 border-b border-white/10 flex items-center justify-between px-4 text-xs font-mono text-[var(--foreground)]/50">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span>Workspace - {activeProject.name}</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-black/20 border-r border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Explorer</div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full bg-black/30 border border-white/10 rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:border-[var(--electric)] transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {categories.map(cat => (
                <div key={cat} className="mb-2">
                  <button 
                    onClick={() => setActiveFolder(activeFolder === cat ? null : cat)}
                    className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm font-medium text-[var(--foreground)]/80 hover:bg-white/5 rounded-md transition-colors"
                  >
                    {activeFolder === cat ? <FolderOpen className="w-4 h-4 text-[var(--electric)]" /> : <Folder className="w-4 h-4 text-[var(--electric)]" />}
                    {cat}
                  </button>
                  <AnimatePresence>
                    {activeFolder === cat && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 pl-2 border-l border-white/10 mt-1"
                      >
                        {filteredProjects.filter(p => p.category === cat).map(p => (
                          <button
                            key={p.id}
                            onClick={() => setActiveProject(p)}
                            className={`flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${activeProject.id === p.id ? 'bg-[var(--electric)]/20 text-[var(--cyan)]' : 'text-[var(--foreground)]/60 hover:bg-white/5 hover:text-[var(--foreground)]/90'}`}
                          >
                            <p.icon className="w-3.5 h-3.5" />
                            <span className="truncate">{p.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col bg-background/50 relative">
            
            {/* Editor Tabs */}
            <div className="flex overflow-x-auto border-b border-white/10 bg-black/40">
              {[
                { id: "overview", label: "README.md", icon: FileCode2 },
                { id: "architecture", label: "architecture.yml", icon: Layers },
                { id: "backend", label: "server.py", icon: Terminal },
                { id: "ui", label: "interface.tsx", icon: Layout },
                { id: "ai", label: "agent.ts", icon: Cpu },
                { id: "metrics", label: "metrics.json", icon: Activity },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ProjectTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-mono border-r border-white/10 min-w-max transition-colors ${activeTab === tab.id ? 'bg-background text-[var(--foreground)] border-t-2 border-t-[var(--cyan)]' : 'text-[var(--foreground)]/40 hover:bg-white/5'}`}
                >
                  <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-[var(--cyan)]' : ''}`} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 relative">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={`${activeProject.id}-${activeTab}`}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.2 }}
                   className="max-w-4xl mx-auto"
                 >
                   
                   {activeTab === "overview" && (
                     <div className="prose prose-invert max-w-none">
                       <h1 className="text-4xl font-bold flex items-center gap-4 mb-2">
                         {activeProject.name}
                         <span className="px-2.5 py-0.5 rounded-full bg-[var(--electric)]/20 text-[var(--cyan)] text-xs font-mono font-normal tracking-widest uppercase border border-[var(--electric)]/30">
                           {activeProject.status}
                         </span>
                       </h1>
                       <div className="flex items-center gap-4 text-sm font-mono text-[var(--foreground)]/50 mb-12 pb-6 border-b border-white/10">
                         <span>Category: {activeProject.category}</span>
                         <span>|</span>
                         <span>Role: Lead Engineer</span>
                       </div>

                       <h3>Problem Statement</h3>
                       <p>Enterprise data is heavily siloed and bound by strict row-level permissions. Building an AI assistant that can reason over this data without leaking sensitive information across tenant boundaries is a significant architectural challenge.</p>

                       <h3>Requirements</h3>
                       <ul>
                         <li>Sub-second retrieval latency</li>
                         <li>Deterministic permission enforcement before LLM synthesis</li>
                         <li>Real-time sync with underlying ERP database</li>
                         <li>High availability architecture</li>
                       </ul>

                       <h3>Solution</h3>
                       <p>A decoupled hybrid-search RAG pipeline utilizing Qdrant for strict metadata payload filtering, hooked into ERPNext via async webhooks, exposing a streaming FastAPI layer for the frontend.</p>
                     </div>
                   )}

                   {activeTab === "architecture" && (
                     <div className="space-y-8">
                       <h2 className="text-2xl font-bold">System Architecture</h2>
                       <div className="p-8 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-[var(--cyan)] overflow-x-auto">
                         <pre>
{`[Client Application]
       │ (WebSockets / SSE)
       ▼
[FastAPI Gateway] ── (JWT Auth) ── [Auth Service]
       │
       ├─► (Semantic Search + Row-Level Filters)
       │         ▼
       │   [Qdrant Vector DB]
       │         ▲
       │         │ (Async Webhooks)
       │   [ERPNext Master DB]
       │
       └─► (Context Assembly)
                 ▼
           [LLM Engine]
`}
                         </pre>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="glass p-6 rounded-xl">
                           <h4 className="font-semibold mb-2">Tradeoffs</h4>
                           <p className="text-sm text-[var(--foreground)]/60">Decoupling vector sync from ERP transaction cycle means slightly stale data (eventual consistency), but prevents blocking critical path database writes.</p>
                         </div>
                         <div className="glass p-6 rounded-xl">
                           <h4 className="font-semibold mb-2">Security</h4>
                           <p className="text-sm text-[var(--foreground)]/60">LLM never enforces permissions. Qdrant filters payloads using JWT claims before any vectors are sent to the context window.</p>
                         </div>
                       </div>
                     </div>
                   )}

                   {/* Add dummy content for other tabs */}
                   {(activeTab === "backend" || activeTab === "ui" || activeTab === "ai") && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold capitalize">{activeTab} Implementation</h2>
                       <div className="glass p-6 rounded-xl">
                         <p className="text-[var(--foreground)]/70">Detailed implementation details, code snippets, and challenges for the {activeTab} layer go here. This mimics a real engineering deep dive.</p>
                       </div>
                       <div className="p-6 rounded-xl bg-black/60 border border-white/10 font-mono text-sm">
                         <span className="text-purple-400">export</span> <span className="text-blue-400">const</span> <span className="text-yellow-200">initModule</span> = <span className="text-purple-400">async</span> () <span className="text-purple-400">=&gt;</span> {'{'}
                         <br/>&nbsp;&nbsp;<span className="text-[var(--foreground)]/40">// Initialization logic</span>
                         <br/>{'}'}
                       </div>
                     </div>
                   )}

                   {activeTab === "metrics" && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold">Performance Metrics</h2>
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="glass p-6 rounded-xl text-center">
                            <div className="text-3xl font-bold text-[var(--electric)] mb-2">800ms</div>
                            <div className="text-xs font-mono text-[var(--foreground)]/50 uppercase">P95 Latency</div>
                          </div>
                          <div className="glass p-6 rounded-xl text-center">
                            <div className="text-3xl font-bold text-[var(--cyan)] mb-2">99.9%</div>
                            <div className="text-xs font-mono text-[var(--foreground)]/50 uppercase">Uptime</div>
                          </div>
                          <div className="glass p-6 rounded-xl text-center">
                            <div className="text-3xl font-bold text-[var(--foreground)] mb-2">40x</div>
                            <div className="text-xs font-mono text-[var(--foreground)]/50 uppercase">Speedup</div>
                          </div>
                       </div>
                     </div>
                   )}

                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
