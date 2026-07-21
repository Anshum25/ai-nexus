import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronRight, Activity, Server, Cpu, Database, Layout, ShieldCheck, Box, Zap, Settings, BookOpen, Layers } from 'lucide-react';

export const Route = createFileRoute('/work')({
  component: WorkComponent,
})

// --- MOCK DATA ---
const CATEGORIES = [
  "Enterprise AI", "ERP Solutions", "AI Products", "Research Projects", "Frontend Projects", "Utilities"
];

const PROJECTS = [
  {
    id: "p1",
    title: "Nexus Semantic Router",
    category: "Enterprise AI",
    status: "Production",
    difficulty: "High",
    timeline: "2023 - Present",
    tags: ["Python", "FastAPI", "Qdrant", "RAG"],
    overview: "A highly concurrent semantic routing layer for multi-tenant LLM applications.",
    problem: "Traditional RAG pipelines failed to enforce strict row-level SQL permissions before the LLM generation phase, leading to potential data leakage.",
    architecture: "Decoupled FastAPI gateway communicating with Qdrant vector database via gRPC. Payload filtering enforces JWT-based authorization before similarity search.",
    backend: "Asynchronous Python with FastAPI, Pydantic for validation, and SQLAlchemy for metadata tracking.",
    database: "Qdrant for vector storage, PostgreSQL for ERP metadata and tenant configurations.",
    ai: "SentenceTransformers for local embedding generation to reduce API costs. GPT-4 for synthesis.",
    challenges: "Handling memory spikes during massive concurrent vector search operations.",
    lessons: "Pre-filtering payloads is exponentially faster and safer than post-filtering vector results.",
  },
  {
    id: "p2",
    title: "SkyCloud ERP Extensions",
    category: "ERP Solutions",
    status: "Deployed",
    difficulty: "Medium",
    timeline: "2022 - 2023",
    tags: ["Frappe", "Python", "MariaDB", "Vue.js"],
    overview: "Custom manufacturing and logistics modules built on top of the Frappe framework.",
    problem: "The client needed a specialized warehouse routing algorithm not present in standard ERPNext.",
    architecture: "Monolithic Frappe architecture with custom DocTypes and a decoupled Vue.js frontend for the warehouse tablets.",
    backend: "Frappe Python backend utilizing custom Server Scripts and background jobs via Redis Queue.",
    database: "MariaDB heavily optimized with custom indexing for geolocation queries.",
    ai: "N/A",
    challenges: "Navigating the deep legacy codebase of Frappe to ensure seamless upgrades.",
    lessons: "Always use Frappe hooks rather than overriding core controllers to maintain upgradeability.",
  }
];

const TABS = [
  "Overview", "Problem", "Architecture", "Backend", "Database", "Artificial Intelligence", "Challenges", "Lessons Learned"
];

function WorkComponent() {
  const [activeCategory, setActiveCategory] = useState("Enterprise AI");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const filteredProjects = PROJECTS.filter(p => 
    p.category === activeCategory && 
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Categories */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-32">
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">Work Categories</h2>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    activeCategory === cat 
                    ? "bg-[var(--electric)]/10 text-white border border-[var(--electric)]/20 shadow-[inset_0_0_20px_rgba(0,180,255,0.1)]" 
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">{activeCategory}</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter workspace..." 
                  className="pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-[var(--electric)] transition-colors w-full md:w-64"
                />
              </div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                <Filter className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
                No projects initialized in this sector.
              </div>
            ) : (
              filteredProjects.map((project, i) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => { setSelectedProject(project); setActiveTab("Overview"); }}
                  className="glass p-6 md:p-8 rounded-2xl border border-white/10 hover:border-[var(--electric)]/50 transition-colors cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors">{project.title}</h3>
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] uppercase text-white/60">{project.status}</span>
                      </div>
                      <p className="text-white/70 mb-6">{project.overview}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(t => (
                          <span key={t} className="px-2 py-1 bg-[var(--electric)]/10 text-[var(--electric)] font-mono text-xs rounded">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 font-mono text-xs text-white/50 shrink-0 bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between gap-8"><span>Difficulty</span> <span className="text-white/80">{project.difficulty}</span></div>
                      <div className="flex justify-between gap-8"><span>Timeline</span> <span className="text-white/80">{project.timeline}</span></div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Project Workspace Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-4">
                <Box className="w-6 h-6 text-[var(--cyan)]" />
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Project Workspace</div>
                  <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Workspace Sidebar */}
              <div className="w-64 border-r border-white/10 bg-black/20 overflow-y-auto p-4 hidden md:block">
                <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4 px-4">Architecture Data</div>
                <div className="space-y-1">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab ? "bg-[var(--electric)]/20 text-[var(--cyan)]" : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Workspace Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-16">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">{activeTab}</h3>
                  <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-white/80">
                    <p className="text-lg">
                      {activeTab === "Overview" && selectedProject.overview}
                      {activeTab === "Problem" && selectedProject.problem}
                      {activeTab === "Architecture" && selectedProject.architecture}
                      {activeTab === "Backend" && selectedProject.backend}
                      {activeTab === "Database" && selectedProject.database}
                      {activeTab === "Artificial Intelligence" && selectedProject.ai}
                      {activeTab === "Challenges" && selectedProject.challenges}
                      {activeTab === "Lessons Learned" && selectedProject.lessons}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
