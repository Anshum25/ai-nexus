import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Factory, Package, Truck, FileText, CheckCircle2, ShieldCheck, Database, LayoutTemplate, Workflow, Wrench, Rewind, Brain } from "lucide-react";
import type { ProjectData } from "./ProjectWorld";
import { EngineeringReplay } from "./EngineeringReplay";
import { ThinkingMode } from "./ThinkingMode";

type ViewMode = "business" | "engineering";

const WORKFLOW_STEPS = [
  { id: "sales", label: "Sales Order", icon: <FileText />, color: "border-blue-400 text-blue-400" },
  { id: "procurement", label: "Procurement", icon: <Package />, color: "border-orange-400 text-orange-400" },
  { id: "warehouse", label: "Warehouse Entry", icon: <Database />, color: "border-yellow-500 text-yellow-500" },
  { id: "manufacturing", label: "Manufacturing", icon: <Factory />, color: "border-slate-400 text-slate-400" },
  { id: "quality", label: "Quality Control", icon: <ShieldCheck />, color: "border-green-400 text-green-400" },
  { id: "delivery", label: "Dispatch", icon: <Truck />, color: "border-cyan-400 text-cyan-400" },
];

export function ERPWorld({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("business");
  const [workflowActive, setWorkflowActive] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [showReplay, setShowReplay] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  // The Living Workflow Simulation
  useEffect(() => {
    if (!workflowActive) return;
    let current = 0;
    const interval = setInterval(() => {
      if (current >= WORKFLOW_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          setWorkflowActive(false);
          setActiveStep(-1);
        }, 2000);
      } else {
        setActiveStep(current);
        current++;
      }
    }, 1200); // Slower, more deliberate simulation for manufacturing

    return () => clearInterval(interval);
  }, [workflowActive]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex flex-col overflow-y-auto"
          style={{ 
            backgroundColor: "#0f172a", // Slate 900 base
            color: "#f8fafc", // Slate 50
          }}
        >
          {/* Subtle industrial grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ 
                 backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
               }} 
          />

          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/90 backdrop-blur-md shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded bg-slate-800 border border-slate-600 shadow-inner">
                <Factory className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white uppercase">Enterprise Operations Platform</h1>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Where software becomes business.</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex bg-slate-800 rounded-md p-1 border border-slate-700">
                <button 
                  onClick={() => setViewMode("business")}
                  className={`px-4 py-1.5 rounded text-xs font-semibold tracking-wide uppercase transition-all ${
                    viewMode === "business" ? "bg-orange-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Campus View
                </button>
                <button 
                  onClick={() => setViewMode("engineering")}
                  className={`px-4 py-1.5 rounded text-xs font-semibold tracking-wide uppercase flex items-center gap-2 transition-all ${
                    viewMode === "engineering" ? "bg-slate-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Wrench className="w-3 h-3" /> Architecture
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => setShowReplay(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-900/40 text-orange-300 hover:text-white hover:bg-orange-800/60 text-xs font-medium border border-orange-700/50 transition-colors">
                  <Rewind className="w-3.5 h-3.5" /> Replay Build
                </button>
                <button onClick={() => setShowThinking(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-medium border border-slate-700 transition-colors">
                  <Brain className="w-3.5 h-3.5" /> Thinking Mode
                </button>
                <button onClick={onClose} className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full relative z-10">
            {viewMode === "business" ? (
              <BusinessView 
                workflowActive={workflowActive} 
                setWorkflowActive={setWorkflowActive}
                activeStep={activeStep}
              />
            ) : (
              <EngineeringView />
            )}
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

// -----------------------------------------
// BUSINESS VIEW (The Industrial Campus)
// -----------------------------------------
function BusinessView({ workflowActive, setWorkflowActive, activeStep }: { workflowActive: boolean, setWorkflowActive: (v: boolean) => void, activeStep: number }) {
  return (
    <div className="space-y-16 pb-32">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight">The Living Business</h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
            ERPNext isn't just a database. It's the central nervous system of a physical campus. 
            When a sales order is logged, physical trucks move, warehouse robots dispatch goods, and factory lines activate.
          </p>
        </div>
        
        {/* Quick KPI Dashboard */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Daily Production</div>
            <div className="text-2xl font-bold text-white">14,205 <span className="text-sm text-slate-500 font-normal">units</span></div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Quality Pass Rate</div>
            <div className="text-2xl font-bold text-green-400">99.1%</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Active Job Cards</div>
            <div className="text-2xl font-bold text-orange-400">34</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Pending Dispatches</div>
            <div className="text-2xl font-bold text-cyan-400">12</div>
          </div>
        </div>
      </div>

      {/* The Hero Animation: Living Workflow */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Document Flow Visualization</h3>
            <p className="text-sm text-slate-400">Watch how data propagates through the physical organization.</p>
          </div>
          <button 
            onClick={() => !workflowActive && setWorkflowActive(true)}
            className={`px-6 py-3 rounded font-bold uppercase tracking-widest text-xs transition-all ${
              workflowActive 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" 
                : "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
            }`}
          >
            {workflowActive ? "Processing Order..." : "Simulate Customer Order"}
          </button>
        </div>

        {/* Workflow Diagram */}
        <div className="relative flex flex-wrap justify-center gap-4 py-8">
          {/* Animated data packet that physically moves across */}
          {workflowActive && activeStep >= 0 && (
            <motion.div 
              className="absolute top-1/2 left-0 w-full h-0.5 bg-orange-500/20 -translate-y-1/2 pointer-events-none"
            >
              <motion.div 
                className="w-32 h-1 bg-orange-500 shadow-[0_0_10px_#f97316]"
                initial={{ x: "-100%" }}
                animate={{ x: `${(activeStep / (WORKFLOW_STEPS.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </motion.div>
          )}

          {WORKFLOW_STEPS.map((step, i) => {
            const isActive = activeStep === i;
            const isCompleted = activeStep > i;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`
                  w-20 h-20 md:w-32 md:h-32 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-500
                  ${isActive ? `bg-slate-800 ${step.color} scale-110 shadow-[0_0_30px_currentColor]` : 
                    isCompleted ? 'bg-slate-800/80 border-slate-600 text-slate-300' : 
                    'bg-slate-900 border-slate-800 text-slate-600'}
                `}>
                  <div className="w-8 h-8 md:w-10 md:h-10 mb-2">{step.icon}</div>
                  <div className="text-[10px] font-bold uppercase text-center leading-tight px-2 hidden md:block">{step.label}</div>
                  {isCompleted && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-green-500" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Context panel for the active step */}
        <div className="mt-8 h-24 bg-slate-800 rounded border border-slate-700 p-4 flex items-center justify-center text-center">
          {activeStep === -1 && <span className="text-slate-500 font-mono text-sm">System Idle. Waiting for input.</span>}
          {activeStep === 0 && <span className="text-blue-400 font-mono text-sm">Sales order logged. Submitting requirements to MRP engine.</span>}
          {activeStep === 1 && <span className="text-orange-400 font-mono text-sm">Material Request generated. Purchase Order dispatched to supplier.</span>}
          {activeStep === 2 && <span className="text-yellow-500 font-mono text-sm">Raw materials received. Serial numbers scanned and binned.</span>}
          {activeStep === 3 && <span className="text-slate-300 font-mono text-sm">Work Order issued. Job Cards assigned to factory workstations.</span>}
          {activeStep === 4 && <span className="text-green-400 font-mono text-sm">Finished goods inspected. Quality parameters logged and verified.</span>}
          {activeStep === 5 && <span className="text-cyan-400 font-mono text-sm">Delivery Note generated. Truck assigned. Invoice mailed.</span>}
        </div>
      </div>

      {/* Client Solutions Grid */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-tight">Client Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SolutionCard 
            title="Fleet Tracking Logistics"
            challenge="Managing 500+ GPS devices with serial numbers, vehicle assignments, and subscription renewals."
            solution="Custom Frappe app linking serials to customer vehicles. Automated daily CRON jobs generating renewal invoices."
          />
          <SolutionCard 
            title="Precision Manufacturing"
            challenge="High-defect rates due to manual data entry on the factory floor."
            solution="Built a React frontend tailored for rugged tablets, hitting ERPNext REST APIs to log Job Card completions instantly."
          />
          <SolutionCard 
            title="B2B E-Commerce Sync"
            challenge="Inventory mismatches between Shopify and the physical warehouse."
            solution="Implemented real-time webhooks syncing Stock Ledgers directly to Shopify inventory counts, eliminating overselling."
          />
        </div>
      </div>
    </div>
  );
}

function SolutionCard({ title, challenge, solution }: { title: string; challenge: string; solution: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-slate-500 transition-colors">
      <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
      <div className="mb-4">
        <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block mb-1">Challenge</span>
        <p className="text-sm text-slate-300 leading-relaxed">{challenge}</p>
      </div>
      <div>
        <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest block mb-1">Engineering Solution</span>
        <p className="text-sm text-slate-300 leading-relaxed">{solution}</p>
      </div>
    </div>
  );
}

// -----------------------------------------
// ENGINEERING VIEW (Architecture breakdown)
// -----------------------------------------
function EngineeringView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-16 pb-32"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">Architecture & Customization</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          ERPNext is built on the Frappe Framework. True mastery requires understanding when to use built-in configurations and when to write low-level Python hooks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <LayoutTemplate className="w-5 h-5 text-orange-500" /> Custom DocTypes
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Doctypes are the foundation of Frappe. Instead of hacking core modules (which breaks upgrades), I create custom DocTypes that link back to standard controllers.
          </p>
          <div className="bg-slate-900 p-4 rounded border border-slate-700 font-mono text-xs text-slate-400">
            <span className="text-purple-400">class</span> <span className="text-yellow-200">VehicleTracker</span>(Document):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-300">validate</span>(self):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># Enforce business rules before DB save</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-300">if</span> not self.gps_serial:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;frappe.throw("Serial required")
          </div>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Workflow className="w-5 h-5 text-orange-500" /> Automation Engine
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Leveraging Frappe's Server Scripts, Webhooks, and Background Jobs (Redis/RQ) to eliminate manual data entry.
          </p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> <strong>Document Hooks:</strong> Fire Python code `on_submit` or `on_cancel`.</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> <strong>Scheduler:</strong> Run nightly invoice generators via `daily` CRON jobs.</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> <strong>REST API:</strong> Expose custom endpoints using `@frappe.whitelist()`.</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Engineering Decisions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="text-orange-400 font-bold mb-2">Why customize via Custom Apps?</h4>
            <p className="text-slate-300 leading-relaxed">Modifying ERPNext core files prevents the client from safely updating to newer versions. By encapsulating all logic, scripts, and views into a standalone custom Frappe App, the core system remains pristine.</p>
          </div>
          <div>
            <h4 className="text-orange-400 font-bold mb-2">Why Redis Background Jobs?</h4>
            <p className="text-slate-300 leading-relaxed">Processing 500+ monthly invoices simultaneously would block the WSGI worker thread, freezing the UI for the user. Passing heavy loops to Redis queues ensures the application remains responsive.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
