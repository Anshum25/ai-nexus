import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Timeline";
import { MissionCaseStudy, type Mission } from "./MissionCaseStudy";

const MISSIONS: Mission[] = [
  {
    id: "m001",
    name: "Enterprise AI Chatbot",
    objective: "Design an intelligent assistant capable of answering enterprise queries using role-aware retrieval, vector search, and production APIs.",
    status: "Production",
    environment: "Enterprise",
    team: "Lead AI Engineer",
    impact: "Operational Efficiency",
    businessProblem: "Employees needed instant answers from enterprise data. Manual searching wasted time, data existed in multiple fragmented systems, and complex permission hierarchies made unified retrieval a massive security risk.",
    engineeringChallenge: "Building a RAG pipeline is easy. Building a RAG pipeline that enforces row-level SQL permissions dynamically, synthesizes queries across multi-tenant architecture, and streams deterministic responses with <1s latency is hard.",
    research: [
      { q: "Which vector database?", a: "Qdrant, for its robust payload filtering which is critical for role-based access." },
      { q: "Embedding strategy?", a: "Chunking at the document section level, embedding via Voyage AI." },
      { q: "Response validation?", a: "Implemented an LLM-as-a-judge guardrail layer before returning the stream." }
    ],
    implementation: [
      { phase: "Phase 1", title: "Backend Foundation", tech: "FastAPI, JWT Auth, Base Routing" },
      { phase: "Phase 2", title: "Knowledge Layer", tech: "Qdrant, Embeddings, Hybrid Search" },
      { phase: "Phase 3", title: "Enterprise Integrations", tech: "ERPNext Webhooks, MySQL Sync" },
      { phase: "Phase 4", title: "Response Generation", tech: "LangChain, Prompt Engineering, Streaming" }
    ],
    challenges: [
      { 
        incident: "High Response Latency", 
        severity: "Medium", 
        rootCause: "Over-fetching payloads from the vector store before reranking.", 
        resolution: "Implemented exact payload filtering pre-retrieval and swapped to a faster embedding model.", 
        outcome: "Response time dropped from 3.2s to 800ms." 
      }
    ],
    tools: [
      { category: "Backend", list: ["Python", "FastAPI"] },
      { category: "Enterprise", list: ["ERPNext", "MySQL"] },
      { category: "AI Layer", list: ["Qdrant", "OpenAI", "Voyage"] },
      { category: "Infra", list: ["Docker", "Linux"] }
    ],
    results: [
      "Reduced manual report generation time by 40x.",
      "Achieved <1% hallucination rate on enterprise evaluations.",
      "Strict enforcement of data silos across 500+ active users."
    ],
    lessons: [
      "Architecture before implementation.",
      "Vector search without metadata filtering is useless in enterprise.",
      "Testing prevents production incidents."
    ]
  },
  {
    id: "m002",
    name: "ERPNext Custom Suite",
    objective: "Re-engineer manufacturing and quality modules for a large-scale industrial client using the Frappe framework.",
    status: "Production",
    environment: "Factory",
    team: "Full-Stack Engineer",
    impact: "Cycle Time Reduction",
    businessProblem: "The factory was operating on disconnected Excel sheets. Tracking a batch of raw material through production to quality check took days of reconciliation.",
    engineeringChallenge: "Mapping deeply complex, non-linear physical manufacturing processes into strict digital DocTypes without overwhelming the floor workers with data entry.",
    research: [
      { q: "Integration Strategy?", a: "Custom Frappe apps hooked into standard ERPNext modules via overrides." },
      { q: "Hardware Integration?", a: "REST endpoints exposed to IoT weight scales on the factory floor." }
    ],
    implementation: [
      { phase: "Phase 1", title: "Schema Design", tech: "Frappe DocTypes, Workflows" },
      { phase: "Phase 2", title: "Logic Binding", tech: "Python Server Scripts, SQL Triggers" },
      { phase: "Phase 3", title: "Hardware APIs", tech: "Whitelisted Frappe API methods" }
    ],
    challenges: [
      { 
        incident: "Database Lock Contention", 
        severity: "High", 
        rootCause: "Hundreds of IoT pings hitting the same bin ledger simultaneously.", 
        resolution: "Refactored to asynchronous queue processing using Redis and RQ.", 
        outcome: "Zero dropped payloads and stable DB CPU." 
      }
    ],
    tools: [
      { category: "Framework", list: ["Frappe", "ERPNext"] },
      { category: "Database", list: ["MariaDB", "Redis"] },
      { category: "Frontend", list: ["JavaScript", "Jinja"] },
      { category: "Hardware", list: ["REST Webhooks"] }
    ],
    results: [
      "Cut manufacturing cycle time by ~30% via workflow automation.",
      "Eliminated manual data entry errors from hardware integration.",
      "Deployed 6 distinct custom modules."
    ],
    lessons: [
      "Automate repetitive work.",
      "Enterprise software requires deep domain knowledge first, code second."
    ]
  },
  {
    id: "m003",
    name: "Chess Mentor AI",
    objective: "Build a real-time AI coach that analyzes your chess games live and provides natural language feedback via sockets.",
    status: "Prototype",
    environment: "Web Application",
    team: "Solo Engineer",
    impact: "Educational tooling",
    businessProblem: "Chess engines output raw evaluations (+2.5). Beginners need *explanations* ('You lost control of the center'), not math.",
    engineeringChallenge: "Bridging a low-level C++ engine (Stockfish) with a high-level LLM over WebSockets while keeping latency under 200ms so the UI feels instantaneous.",
    research: [
      { q: "Engine Communication?", a: "Child process spawning to communicate with Stockfish via UCI protocol." },
      { q: "Prompt Structure?", a: "Injecting FEN strings and engine eval diffs into the LLM context." }
    ],
    implementation: [
      { phase: "Phase 1", title: "Engine Wrapper", tech: "Node.js, Child Processes" },
      { phase: "Phase 2", title: "Socket Layer", tech: "Socket.io, Express" },
      { phase: "Phase 3", title: "LLM Orchestration", tech: "LangChain, Streaming" }
    ],
    challenges: [
      { 
        incident: "Socket Congestion", 
        severity: "Medium", 
        rootCause: "Sending eval requests on every single fast move overwhelmed the LLM queue.", 
        resolution: "Implemented debouncing and only triggered LLM on >1.0 eval swings (blunders).", 
        outcome: "Clean UX and reduced API costs by 80%." 
      }
    ],
    tools: [
      { category: "Backend", list: ["Node.js", "Socket.io"] },
      { category: "Engine", list: ["Stockfish 16", "UCI"] },
      { category: "AI", list: ["OpenAI", "Prompting"] },
      { category: "Frontend", list: ["React", "Chessboard.js"] }
    ],
    results: [
      "Successfully translates raw engine evaluations into pedagogical feedback.",
      "Maintains stable websocket connections under rapid play."
    ],
    lessons: [
      "Not every action needs an LLM call.",
      "Latency is the enemy of good UX."
    ]
  }
];

// Fake logs for the live terminal
const LOGS = [
  "Deploying API... [OK]",
  "Retrieving embeddings... [OK]",
  "Generating report... [PROCESSING]",
  "Building Docker image... [CACHED]",
  "Refreshing ERP cache... [OK]",
  "Running vector search... [0.12s]",
  "Evaluating prompt guards... [PASS]",
  "Syncing MariaDB replicas... [OK]"
];

export function MissionControl() {
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [logIndex, setLogIndex] = useState(0);

  // Rotate logs slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % (LOGS.length - 4));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="missions" className="relative mx-auto max-w-7xl px-6 py-32 z-20">
      <SectionHeading eyebrow="Operations Center" title="Mission Control" subtitle="Engineering impact, tracked as completed missions." />
      
      {/* Dashboard Top Level */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Status Screen */}
        <div className="lg:col-span-3 glass rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,180,255,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            {/* Decorative radar/grid */}
            <div className="w-48 h-48 rounded-full border border-[var(--cyan)] border-dashed animate-[spin_60s_linear_infinite]" />
          </div>

          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cyan)] mb-8">System Status</h3>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div>
              <div className="text-[4rem] font-bold text-[var(--foreground)] leading-none tracking-tighter flex items-center gap-4">
                <span className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-pulse" />
                ONLINE
              </div>
              <div className="mt-2 text-[var(--foreground)]/50 font-mono text-sm uppercase">Core Infrastructure</div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-2">
              <div>
                <div className="text-3xl font-semibold text-[var(--foreground)]">8</div>
                <div className="text-xs text-[var(--foreground)]/40 font-mono uppercase mt-1">Active Missions</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[var(--foreground)]">12+</div>
                <div className="text-xs text-[var(--foreground)]/40 font-mono uppercase mt-1">Prod Deployments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Terminal Sidebar */}
        <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--electric)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--electric)] animate-pulse" /> Live Feed
          </h3>
          <div className="flex-1 font-mono text-[10px] text-[var(--foreground)]/60 space-y-2 overflow-hidden flex flex-col justify-end">
            {LOGS.slice(logIndex, logIndex + 5).map((log, i) => (
              <motion.div 
                key={log + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === 4 ? "text-[var(--foreground)]" : ""}
              >
                &gt; {log}
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Mission Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MISSIONS.map((mission) => (
          <motion.button
            key={mission.id}
            layoutId={`mission-${mission.id}`}
            onClick={() => setActiveMission(mission)}
            className="group relative glass p-6 rounded-2xl border border-white/5 hover:border-[var(--cyan)] transition-all duration-300 text-left overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.1)]"
            data-cursor="explore"
          >
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="font-mono text-[10px] uppercase text-[var(--cyan)] tracking-widest">{mission.id}</div>
                <div className="font-mono text-[10px] uppercase text-[var(--foreground)]/40">{mission.environment}</div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{mission.name}</h3>
              <p className="text-sm text-[var(--foreground)]/50 line-clamp-2">{mission.objective}</p>
              
              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase">
                <span className="text-[var(--electric)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--electric)]" />
                  {mission.status}
                </span>
                <span className="text-[var(--foreground)]/30 group-hover:text-[var(--cyan)] transition-colors">Access Case Study →</span>
              </div>
            </div>
          </motion.button>
        ))}
        
        {/* Placeholder for missing missions */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center opacity-50">
          <div className="font-mono text-[10px] uppercase text-[var(--foreground)]/30 tracking-widest mb-2">Restricted Access</div>
          <div className="text-sm text-[var(--foreground)]/50">Additional missions classified.</div>
        </div>
      </div>

      <MissionCaseStudy mission={activeMission} onClose={() => setActiveMission(null)} />

    </section>
  );
}
