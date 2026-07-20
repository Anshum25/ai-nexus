import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, GitBranch, PenTool, BookOpen, AlertTriangle, PenLine, ArrowRight } from "lucide-react";
import type { ProjectData } from "./ProjectWorld";

type ThinkingTab = "decision" | "failed" | "notebook" | "lessons";

export function ThinkingMode({ project, onClose }: { project: ProjectData, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<ThinkingTab>("decision");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#fdfbf7] text-[#2d2822] overflow-hidden font-serif selection:bg-yellow-200"
    >
      {/* Notebook Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
        }}
      />
      {/* Notebook binding edge */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-stone-300 via-stone-200 to-transparent border-r border-stone-300/50 shadow-[5px_0_15px_rgba(0,0,0,0.05)] z-0" />

      {/* Header */}
      <header className="relative z-20 flex flex-col md:flex-row md:items-center justify-between p-6 pl-12 md:pl-24 border-b border-stone-200 bg-[#fdfbf7]/90 backdrop-blur-md">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
            <PenLine className="w-6 h-6 text-stone-400" />
            Engineering Notebook
          </h1>
          <div className="text-sm text-stone-500 font-sans uppercase tracking-widest">{project.name} // Thinking Mode</div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
          <TabButton active={activeTab === "decision"} onClick={() => setActiveTab("decision")} icon={<GitBranch />} label="Decision Tree" />
          <TabButton active={activeTab === "failed"} onClick={() => setActiveTab("failed")} icon={<AlertTriangle />} label="Failed Ideas" />
          <TabButton active={activeTab === "notebook"} onClick={() => setActiveTab("notebook")} icon={<BookOpen />} label="Tradeoffs" />
          <TabButton active={activeTab === "lessons"} onClick={() => setActiveTab("lessons")} icon={<PenTool />} label="Lessons Learned" />
        </div>
      </header>

      {/* Content Area */}
      <main className="relative z-10 pl-12 md:pl-24 p-8 overflow-y-auto h-[calc(100vh-140px)]">
        <div className="max-w-4xl mx-auto pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "decision" && <DecisionTreeView project={project} />}
              {activeTab === "failed" && <FailedIdeasView project={project} />}
              {activeTab === "notebook" && <TradeoffExplorer project={project} />}
              {activeTab === "lessons" && <LessonsLearnedView project={project} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all whitespace-nowrap ${
        active ? "bg-stone-800 text-stone-100 shadow-sm" : "text-stone-600 hover:bg-stone-200"
      }`}
    >
      <div className="w-4 h-4">{icon}</div>
      {label}
    </button>
  );
}

// -----------------------------------------------------------------------------
// VIEWS
// -----------------------------------------------------------------------------

function DecisionTreeView({ project }: { project: ProjectData }) {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-serif text-stone-900 border-b-2 border-stone-200 pb-4">Architectural Decision Tree</h2>
        <p className="text-stone-600 text-lg leading-relaxed font-sans">
          Tracing the logic behind the technology stack for {project.name}.
        </p>
      </div>

      <div className="pl-4 md:pl-8 border-l-2 border-stone-300 space-y-12 font-sans relative">
        <DecisionNode 
          problem="Need a core framework"
          alternatives={["Flask", "Django", "FastAPI"]}
          choice="FastAPI"
          reason="Native async support required for streaming LLM responses, plus automatic OpenAPI docs saved days of work."
        />
        <div className="h-12 w-0.5 bg-stone-300 absolute left-[-2px]" />
        <DecisionNode 
          problem="Need semantic search"
          alternatives={["Elasticsearch", "Pinecone", "Qdrant"]}
          choice="Qdrant"
          reason="Rust-based performance, local deployment capable (crucial for enterprise), and superior metadata filtering capabilities."
        />
        <div className="h-12 w-0.5 bg-stone-300 absolute left-[-2px]" />
        <DecisionNode 
          problem="Need to enforce permissions"
          alternatives={["LLM System Prompt", "Post-generation filter", "Vector DB Payload Filter"]}
          choice="Vector DB Payload Filter"
          reason="Never trust an LLM to enforce security. Filtering vectors before similarity search guarantees mathematical security."
        />
      </div>
    </div>
  );
}

function DecisionNode({ problem, alternatives, choice, reason }: { problem: string, alternatives: string[], choice: string, reason: string }) {
  return (
    <div className="relative">
      <div className="absolute w-4 h-4 rounded-full bg-stone-800 -left-[25px] md:-left-[41px] top-1 border-4 border-[#fdfbf7]" />
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-2">Problem</div>
        <div className="text-xl font-bold text-stone-900 mb-6">{problem}</div>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {alternatives.map((alt, i) => (
            <div key={alt} className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${alt === choice ? "bg-stone-800 text-white shadow-md" : "bg-stone-100 text-stone-500 line-through"}`}>
                {alt}
              </span>
              {i < alternatives.length - 1 && <ArrowRight className="w-4 h-4 text-stone-300" />}
            </div>
          ))}
        </div>

        <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-2">Rationale</div>
        <p className="text-stone-700 leading-relaxed font-serif text-lg">{reason}</p>
      </div>
    </div>
  );
}

function FailedIdeasView({ project }: { project: ProjectData }) {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-serif text-stone-900 border-b-2 border-stone-200 pb-4">The Graveyard of Failed Ideas</h2>
        <p className="text-stone-600 text-lg leading-relaxed font-sans">
          Engineering maturity isn't hiding mistakes. It's documenting why they failed so you don't repeat them.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 font-sans">
        {project.challenges.map((c, i) => (
          <div key={i} className="bg-red-50 p-6 rounded-xl border border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-bold text-red-900">Attempt {i + 1} Failed</h3>
            </div>
            <div className="mb-4">
              <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-1">The Problem</div>
              <p className="text-red-950 font-serif text-lg">{c.problem}</p>
            </div>
            <div>
              <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">The Fix</div>
              <p className="text-green-950 font-serif text-lg">{c.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradeoffExplorer({ project }: { project: ProjectData }) {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-serif text-stone-900 border-b-2 border-stone-200 pb-4">Tradeoff Explorer</h2>
        <p className="text-stone-600 text-lg leading-relaxed font-sans">
          Every architecture decision is a compromise.
        </p>
      </div>

      <div className="space-y-8 font-sans">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Caching (Redis)</h3>
            <p className="text-sm text-stone-500 leading-relaxed">Used to store frequent vector query results to bypass LLM generation entirely.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Advantages</div>
              <ul className="text-sm text-green-900 space-y-1 list-disc pl-4">
                <li>Massively reduces LLM API costs</li>
                <li>Drops latency from 2s to 50ms</li>
                <li>Handles traffic spikes easily</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <div className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-2">Disadvantages</div>
              <ul className="text-sm text-orange-900 space-y-1 list-disc pl-4">
                <li>Requires cache invalidation logic</li>
                <li>Increases infrastructure footprint</li>
                <li>Risk of serving stale data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonsLearnedView({ project }: { project: ProjectData }) {
  return (
    <div className="space-y-12 font-serif text-lg text-stone-800 leading-relaxed">
      <div className="space-y-4 font-sans">
        <h2 className="text-3xl font-bold font-serif text-stone-900 border-b-2 border-stone-200 pb-4">Lessons Learned</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-stone-900">What surprised me</h3>
          <p>The hardest part of AI engineering isn't the LLM prompt. It's the data pipeline. Getting clean, chunked, and properly vectorized data into the database took 80% of the total project time.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-stone-900">What I would change</h3>
          <p>I initially tried to build everything synchronously. If I did this again, I would use an event-driven architecture (like Kafka or RabbitMQ) from day one to handle the heavy background tasks without blocking the main API threads.</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-xl text-stone-900">The Takeaway</h3>
          <ul className="list-disc pl-6 space-y-2 font-sans">
            {project.lessons.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
