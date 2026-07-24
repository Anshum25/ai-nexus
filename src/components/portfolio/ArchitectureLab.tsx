import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Beaker, Network, Database, Server, BrainCircuit, Play, ShieldAlert, ArrowRight, Activity } from "lucide-react";
import { SectionHeading } from "./Timeline";

type LabSection = "system" | "backend" | "data" | "infra" | "ai";

export function ArchitectureLab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The Entry Portal placed on the main OS flow */}
      <section className="relative w-full py-32 bg-black z-10 flex flex-col items-center justify-center border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
        
        <div className="relative z-10 text-center px-6">
          <SectionHeading eyebrow="Laboratory 01" title="Architecture Lab" subtitle="Design before Code." />
          
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow"
          >
            <Beaker className="w-5 h-5" />
            Enter Laboratory
          </motion.button>
        </div>
      </section>

      {/* The Massive Laboratory Overlay */}
      <AnimatePresence>
        {isOpen && (
          <LabOverlay onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function LabOverlay({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<LabSection>("system");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex flex-col bg-[var(--background)] text-slate-900 overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#0ea5e9 1px, transparent 1px),
            linear-gradient(90deg, #0ea5e9 1px, transparent 1px),
            linear-gradient(#0ea5e9 1px, transparent 1px),
            linear-gradient(90deg, #0ea5e9 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Beaker className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Architecture Laboratory</h1>
            <div className="text-xs font-mono text-slate-500">NEXUS_OS // ENGINEERING_FACILITY</div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-red-500 transition-colors shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white/50 backdrop-blur-sm p-6 flex flex-col gap-2 relative z-10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Laboratories</div>
          <TabButton active={activeTab === "system"} onClick={() => setActiveTab("system")} icon={<Network />} label="01. System Architecture" />
          <TabButton active={activeTab === "backend"} onClick={() => setActiveTab("backend")} icon={<Activity />} label="02. Backend Engineering" />
          <TabButton active={activeTab === "data"} onClick={() => setActiveTab("data")} icon={<Database />} label="03. Data Engineering" />
          <TabButton active={activeTab === "infra"} onClick={() => setActiveTab("infra")} icon={<Server />} label="04. Infrastructure" />
          <TabButton active={activeTab === "ai"} onClick={() => setActiveTab("ai")} icon={<BrainCircuit />} label="05. AI Engineering" />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative z-10 p-12">
          {activeTab === "system" && <SystemArchitectureLab />}
          {activeTab === "backend" && <BackendEngineeringLab />}
          {activeTab === "data" && <DataEngineeringLab />}
          {activeTab === "infra" && <InfrastructureLab />}
          {activeTab === "ai" && <AIEngineeringLab />}
        </main>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
        active 
          ? "bg-blue-600 text-[var(--foreground)] shadow-md" 
          : "text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200"
      }`}
    >
      <div className={`w-4 h-4 ${active ? "text-blue-200" : "text-slate-400"}`}>{icon}</div>
      {label}
    </button>
  );
}

// -----------------------------------------------------------------------------
// LAB 01: SYSTEM ARCHITECTURE
// -----------------------------------------------------------------------------
function SystemArchitectureLab() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);

  const steps = [
    { id: "browser", label: "Browser Client" },
    { id: "gateway", label: "API Gateway" },
    { id: "auth", label: "Auth Service" },
    { id: "rag", label: "Knowledge Retrieval" },
    { id: "llm", label: "LLM Generation" }
  ];

  useEffect(() => {
    if (!isSimulating) return;
    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => { setIsSimulating(false); setSimStep(-1); }, 2000);
      } else {
        setSimStep(step);
        step++;
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">System Architecture</h2>
        <p className="text-slate-500">Live Request Simulator. Watch how data propagates through a distributed environment.</p>
      </header>

      {/* Live Request Simulator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
        <div className="flex gap-4 mb-12">
          <input 
            type="text" 
            readOnly 
            value="Show pending hostel complaints." 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono text-slate-700"
          />
          <button 
            onClick={() => !isSimulating && setIsSimulating(true)}
            className="bg-blue-600 text-[var(--foreground)] px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Play className="w-4 h-4" /> Execute Request
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 relative">
          {/* Animated Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block" />
          
          {steps.map((step, idx) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center bg-white transition-all duration-300 ${
                simStep === idx ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-110" :
                simStep > idx ? "border-green-500 opacity-50" : "border-slate-200"
              }`}>
                <Network className={`w-6 h-6 ${simStep === idx ? "text-blue-500" : simStep > idx ? "text-green-500" : "text-slate-300"}`} />
              </div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center w-24">
                {step.label}
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Logs */}
        <div className="mt-8 bg-slate-900 rounded-xl p-4 font-mono text-xs text-green-400 h-32 overflow-hidden flex flex-col justify-end">
          {simStep >= 0 && <div>[{(new Date()).toISOString()}] [INFO] Client emitted POST /api/chat...</div>}
          {simStep >= 1 && <div>[{(new Date()).toISOString()}] [INFO] Gateway matched route, forwarding...</div>}
          {simStep >= 2 && <div>[{(new Date()).toISOString()}] [SUCCESS] JWT Verified. Role: Principal...</div>}
          {simStep >= 3 && <div>[{(new Date()).toISOString()}] [INFO] Qdrant Similarity Search completed in 42ms...</div>}
          {simStep >= 4 && <div className="text-blue-400">[{(new Date()).toISOString()}] [STREAM] LLM generation initiated...</div>}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// LAB 02: BACKEND ENGINEERING & FAILURE LAB
// -----------------------------------------------------------------------------
function BackendEngineeringLab() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Backend Engineering & Failure Lab</h2>
        <p className="text-slate-500">Demonstrating request lifecycles and senior-level failure mitigation.</p>
      </header>

      {/* The Failure Lab */}
      <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-bold text-slate-900">Failure Laboratory</h3>
        </div>
        <p className="text-sm text-slate-600 mb-8 max-w-3xl">
          Amateur architecture assumes the happy path. Production architecture assumes everything will fail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FailureCard 
            title="Database Connection Timeout"
            detection="Connection pooling exhausted or DB CPU spiked > 90%."
            fix="Implement a Circuit Breaker pattern. If > 5 requests fail, trip breaker, serve stale cache, and alert on-call."
          />
          <FailureCard 
            title="LLM API Rate Limiting"
            detection="429 Too Many Requests from OpenAI."
            fix="Implement exponential backoff and retry strategy via Redis message queues. Degrade UI gracefully."
          />
          <FailureCard 
            title="Qdrant Payload Bloat"
            detection="Retrieval latency jumps from 40ms to 800ms."
            fix="Separate heavy metadata (HTML strings) from vector payloads. Store only foreign keys in Qdrant, join with SQL later."
          />
        </div>
      </div>
    </div>
  );
}

function FailureCard({ title, detection, fix }: { title: string, detection: string, fix: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm relative overflow-hidden group hover:border-red-400 transition-colors">
      <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
      <h4 className="font-bold text-slate-900 mb-4">{title}</h4>
      <div className="mb-4">
        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1">Detection</span>
        <p className="text-xs text-slate-600">{detection}</p>
      </div>
      <div>
        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-1">Mitigation Strategy</span>
        <p className="text-xs text-slate-600">{fix}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// LAB 03: DATA ENGINEERING
// -----------------------------------------------------------------------------
function DataEngineeringLab() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Data Engineering</h2>
        <p className="text-slate-500">Entity relationship visualization and database explorer.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-blue-500" /> Relational (MySQL)</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="font-mono text-sm font-bold text-slate-800">Users</div>
              <div className="text-xs text-slate-500 mt-1">id (PK), email, role_id (FK), created_at</div>
            </div>
            <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-slate-300 rotate-90" /></div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="font-mono text-sm font-bold text-slate-800">Roles</div>
              <div className="text-xs text-slate-500 mt-1">id (PK), permissions (JSON), hierarchy_level</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-purple-500" /> Vector (Qdrant)</h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
              <div className="font-mono text-sm font-bold text-purple-900">Knowledge_Base_Collection</div>
              <div className="text-xs text-purple-700 mt-1">vector (768d), payload (tenant_id, role_access, sql_ref_id)</div>
            </div>
            <div className="p-4 bg-slate-900 text-slate-300 rounded-lg font-mono text-xs">
              <span className="text-slate-500"># Payload Filtering guarantees security</span><br/>
              Query( <br/>
                &nbsp;&nbsp;vector=user_embedding,<br/>
                &nbsp;&nbsp;filter={"{"} "role_access": "Admin" {"}"} <br/>
              )
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// LAB 04: INFRASTRUCTURE (Docker Lab)
// -----------------------------------------------------------------------------
function InfrastructureLab() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Infrastructure & Deployment</h2>
        <p className="text-slate-500">Visualizing the CI/CD pipeline and containerized orchestration.</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-300"><Code2 className="w-6 h-6 text-slate-700" /></div>
            <span className="text-xs font-bold mt-2">Commit</span>
          </div>
          <ArrowRight className="text-slate-300 w-5 h-5 hidden md:block" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-300"><Server className="w-6 h-6 text-blue-600" /></div>
            <span className="text-xs font-bold mt-2">Build Image</span>
          </div>
          <ArrowRight className="text-slate-300 w-5 h-5 hidden md:block" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-200 shadow-inner"><Database className="w-6 h-6 text-blue-500" /></div>
            <span className="text-xs font-bold mt-2">Registry</span>
          </div>
          <ArrowRight className="text-slate-300 w-5 h-5 hidden md:block" />
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700 shadow-2xl group-hover:scale-105 transition-transform">
              <Activity className="w-8 h-8 text-green-400" />
            </div>
            <span className="text-xs font-bold mt-2 text-slate-900">Production Swarm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// LAB 05: AI ENGINEERING
// -----------------------------------------------------------------------------
function AIEngineeringLab() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">AI Engineering</h2>
        <p className="text-slate-500">RAG Visualization and Prompt Construction architecture.</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="border-b border-slate-100 p-6 bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-500" /> Dynamic Prompt Builder
          </h3>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-4 space-y-2">
            {/* The Layers */}
            <div className="p-3 border border-slate-200 bg-white rounded shadow-sm text-xs font-bold text-slate-700">1. System Instructions</div>
            <div className="p-3 border border-blue-200 bg-blue-50 rounded shadow-sm text-xs font-bold text-blue-800">2. Injected Role Permissions</div>
            <div className="p-3 border border-purple-200 bg-purple-50 rounded shadow-sm text-xs font-bold text-purple-800">3. Retrieved Vector Context</div>
            <div className="p-3 border border-green-200 bg-green-50 rounded shadow-sm text-xs font-bold text-green-800">4. User Query</div>
            <div className="p-3 border border-orange-200 bg-orange-50 rounded shadow-sm text-xs font-bold text-orange-800">5. Output Formatting Rules</div>
          </div>
          
          <div className="col-span-8 bg-slate-900 rounded-xl p-6 font-mono text-xs leading-relaxed text-slate-300 shadow-inner">
            <span className="text-slate-500"># The Final Compiled Prompt sent to LLM</span><br/><br/>
            <span className="text-[var(--foreground)]">You are a corporate assistant.</span><br/><br/>
            <span className="text-blue-400">The user has role: "HR Manager". They may view salary bands but not individual compensation.</span><br/><br/>
            <span className="text-purple-400">Context: [Document 1: Policy 2024], [Document 2: Band Structure]</span><br/><br/>
            <span className="text-green-400">Query: "What is the ceiling for L4 engineers?"</span><br/><br/>
            <span className="text-orange-400">Respond in strict JSON format.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
