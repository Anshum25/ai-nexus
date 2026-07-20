import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, LayoutTemplate, Layers, Smartphone, Monitor, Terminal, Code2, Paintbrush, ArrowRight, CheckCircle2, Rewind, Brain } from "lucide-react";
import type { ProjectData } from "./ProjectWorld";
import { EngineeringReplay } from "./EngineeringReplay";
import { ThinkingMode } from "./ThinkingMode";

type ViewMode = "product" | "engineering";
type ResponsiveState = "desktop" | "tablet" | "mobile";

export function SkyCloudEcosystem({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("product");
  const [responsiveSize, setResponsiveSize] = useState<ResponsiveState>("desktop");
  const [showReplay, setShowReplay] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  const getContainerWidth = () => {
    switch (responsiveSize) {
      case "mobile": return "max-w-[400px]";
      case "tablet": return "max-w-[768px]";
      case "desktop": return "max-w-7xl";
      default: return "max-w-7xl";
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex flex-col overflow-y-auto"
          style={{ 
            backgroundColor: "#ffffff", // Pure white base
            color: "#09090b", // Zinc 950
          }}
        >
          {/* Subtle noise and radial gradient for Apple-like pristine feel */}
          <div className="absolute inset-0 pointer-events-none" 
               style={{ 
                 background: 'radial-gradient(circle at top right, rgba(240, 249, 255, 0.5), transparent 50%), radial-gradient(circle at bottom left, rgba(250, 250, 250, 1), transparent 50%)',
               }} 
          />
          <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none grain" />

          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between p-4 md:p-6 border-b border-zinc-200 bg-white/70 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 shadow-sm">
                <LayoutTemplate className="w-4 h-4 text-zinc-700" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-semibold tracking-tight text-zinc-900">SkyERP Cloud Platform</h1>
                <div className="text-[9px] font-sans uppercase tracking-widest text-zinc-500">Enterprise Software Reimagined</div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              {/* Responsive Lab Controls (Only visible in Product view) */}
              {viewMode === "product" && (
                <div className="hidden md:flex items-center p-1 bg-zinc-100/80 rounded-full border border-zinc-200/80 shadow-inner">
                  <button onClick={() => setResponsiveSize("desktop")} className={`p-1.5 rounded-full transition-all ${responsiveSize === "desktop" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"}`}><Monitor className="w-4 h-4" /></button>
                  <button onClick={() => setResponsiveSize("tablet")} className={`p-1.5 rounded-full transition-all ${responsiveSize === "tablet" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"}`}><LayoutTemplate className="w-4 h-4" /></button>
                  <button onClick={() => setResponsiveSize("mobile")} className={`p-1.5 rounded-full transition-all ${responsiveSize === "mobile" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"}`}><Smartphone className="w-4 h-4" /></button>
                </div>
              )}

              {/* View Mode Toggle */}
              <div className="flex bg-zinc-100/80 rounded-full p-1 border border-zinc-200/80 shadow-inner">
                <button 
                  onClick={() => setViewMode("product")}
                  className={`px-3 py-1.5 md:px-4 rounded-full text-[10px] md:text-xs font-medium transition-all ${
                    viewMode === "product" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  Product UX
                </button>
                <button 
                  onClick={() => setViewMode("engineering")}
                  className={`px-3 py-1.5 md:px-4 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-2 transition-all ${
                    viewMode === "engineering" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  <Terminal className="w-3 h-3 hidden md:block" /> Engineering
                </button>
              </div>

              <button onClick={() => setShowReplay(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:bg-white text-xs font-medium border border-zinc-200/80 shadow-inner transition-colors">
                <Rewind className="w-3.5 h-3.5" /> Replay Build
              </button>
              <button onClick={() => setShowThinking(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:bg-white text-xs font-medium border border-zinc-200/80 shadow-inner transition-colors">
                <Brain className="w-3.5 h-3.5" /> Thinking Mode
              </button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full flex justify-center py-12 px-4 md:px-8 relative z-10 transition-all duration-500">
            <motion.div 
              layout
              className={`w-full ${viewMode === "engineering" ? "max-w-7xl" : getContainerWidth()} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            >
              {viewMode === "product" ? (
                <ProductView responsiveSize={responsiveSize} />
              ) : (
                <EngineeringView />
              )}
            </motion.div>
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
// PRODUCT VIEW (Design, UX, Components)
// -----------------------------------------
function ProductView({ responsiveSize }: { responsiveSize: ResponsiveState }) {
  return (
    <div className={`space-y-24 ${responsiveSize !== "desktop" ? "mx-auto ring-1 ring-zinc-200/50 shadow-2xl rounded-[2rem] p-4 md:p-8 bg-white/50 backdrop-blur-md overflow-hidden" : ""}`}>
      
      {/* Hero */}
      <div className="text-center space-y-6 pt-12 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Live Component System
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900" style={{ letterSpacing: "-0.03em" }}>
          Premium SaaS UI.
        </h2>
        <p className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
          The SkyERP Cloud interface was designed to feel like native software. Uncluttered, deeply responsive, and built with microscopic attention to typography and spacing.
        </p>
      </div>

      {/* Component Library Showcase */}
      <div>
        <div className="mb-12 border-b border-zinc-100 pb-4">
          <h3 className="text-xl font-semibold text-zinc-900">Interactive Component Library</h3>
          <p className="text-sm text-zinc-500 mt-1">Live interactive elements demonstrating state management and micro-interactions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Component */}
          <div className="group p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-base font-semibold text-zinc-900 mb-2">Workspace Creation</h4>
            <p className="text-sm text-zinc-500 mb-6">Initialize a new tenant environment with isolated databases and pre-configured permissions.</p>
            <button className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-100 transition-all flex justify-center items-center gap-2 group-hover:gap-3">
              Deploy Workspace <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Form & Input States */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-center space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Company Name (Focus to see effect)</label>
              <input 
                type="text" 
                placeholder="Acme Corp" 
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Verification (Valid State)</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="verified@acme.com"
                  readOnly
                  className="w-full px-3 py-2 rounded-lg border border-green-200 bg-green-50/50 text-green-900 text-sm focus:outline-none pr-10"
                />
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* The Ecosystem Map */}
      <div className="py-12">
        <h3 className="text-xl font-semibold text-zinc-900 text-center mb-12">The App Ecosystem</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="w-full md:w-32 py-4 px-2 rounded-xl bg-white border border-zinc-200 shadow-sm text-center text-sm font-medium text-zinc-700">Marketing</div>
          <ArrowRight className="text-zinc-300 w-5 h-5 rotate-90 md:rotate-0" />
          <div className="w-full md:w-32 py-4 px-2 rounded-xl bg-blue-50 border border-blue-100 shadow-sm text-center text-sm font-medium text-blue-700 ring-1 ring-blue-500/10">Authentication</div>
          <ArrowRight className="text-zinc-300 w-5 h-5 rotate-90 md:rotate-0" />
          <div className="w-full md:w-32 py-4 px-2 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg text-center text-sm font-medium text-white ring-1 ring-black/5">Dashboard</div>
        </div>
      </div>

    </div>
  );
}

// -----------------------------------------
// ENGINEERING VIEW (Next.js, Architecture, Split Screen)
// -----------------------------------------
function EngineeringView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-24"
    >
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-12">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Frontend Architecture</h2>
        <p className="text-zinc-500">
          The SkyERP Cloud Platform is built on Next.js App Router, leveraging Server Components for SEO and initial load speed, while seamlessly hydrating Client Components for rich interactivity.
        </p>
      </div>

      {/* Design to Code Split Screen */}
      <div>
        <h3 className="text-xl font-semibold text-zinc-900 mb-8 flex items-center gap-2 justify-center">
          <Paintbrush className="w-5 h-5 text-blue-500" /> Design to Code Translation <Code2 className="w-5 h-5 text-purple-500" />
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-zinc-200 shadow-xl bg-white">
          
          {/* LEFT: "Design" Visual */}
          <div className="p-8 lg:p-12 bg-zinc-50 border-b lg:border-b-0 lg:border-r border-zinc-200 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs font-mono text-zinc-400">Figma Prototype</div>
            
            {/* Mock Component */}
            <div className="w-full max-w-sm bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-6 ring-1 ring-zinc-950/5">
              <div className="w-10 h-10 rounded-full bg-zinc-100 mb-4" />
              <div className="h-4 w-3/4 bg-zinc-200 rounded mb-2" />
              <div className="h-3 w-1/2 bg-zinc-100 rounded mb-6" />
              <div className="h-10 w-full bg-zinc-900 rounded-lg" />
            </div>
            
            {/* Annotation lines overlay (simulating design specs) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-blue-500" fill="none">
              <line x1="20%" y1="30%" x2="40%" y2="40%" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="40%" cy="40%" r="4" fill="#3b82f6" />
            </svg>
          </div>

          {/* RIGHT: "Implementation" Code */}
          <div className="p-8 lg:p-12 bg-[#0d1117] text-zinc-300 font-mono text-[13px] leading-relaxed overflow-x-auto relative">
            <div className="absolute top-4 left-4 text-xs font-mono text-zinc-500">React + Tailwind UI</div>
            <pre className="mt-6">
<span className="text-pink-400">export function</span> <span className="text-yellow-200">ProfileCard</span>() {'{\n'}
  <span className="text-pink-400">return</span> (
    <span className="text-zinc-500">{'// Uses ring-1 for crisp 1px borders instead of border width'}</span>
    &lt;<span className="text-blue-300">div</span> <span className="text-purple-300">className</span>=<span className="text-green-300">"w-full max-w-sm bg-white rounded-xl shadow-xl ring-1 ring-zinc-950/5 p-6"</span>&gt;
      &lt;<span className="text-blue-300">Avatar</span> <span className="text-purple-300">className</span>=<span className="text-green-300">"w-10 h-10 mb-4 bg-zinc-100"</span> /&gt;
      &lt;<span className="text-blue-300">h3</span> <span className="text-purple-300">className</span>=<span className="text-green-300">"text-base font-medium text-zinc-900"</span>&gt;
        John Doe
      &lt;/<span className="text-blue-300">h3</span>&gt;
      &lt;<span className="text-blue-300">p</span> <span className="text-purple-300">className</span>=<span className="text-green-300">"text-sm text-zinc-500 mb-6"</span>&gt;
        Admin
      &lt;/<span className="text-blue-300">p</span>&gt;
      &lt;<span className="text-blue-300">Button</span> <span className="text-purple-300">className</span>=<span className="text-green-300">"w-full bg-zinc-900 text-white"</span>&gt;
        Manage Profile
      &lt;/<span className="text-blue-300">Button</span>&gt;
    &lt;/<span className="text-blue-300">div</span>&gt;
  );
{'}'}
            </pre>
          </div>
        </div>
      </div>

      {/* Engineering Decisions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-200 pt-16">
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 mb-2">Why Next.js App Router?</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">Layout persistence across route changes prevents the sidebar and navbar from re-rendering, dramatically improving perceived performance for enterprise applications.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 mb-2">Design Tokens & Tailwind</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">Instead of hardcoding colors, the entire app uses semantic variables (e.g., `zinc-900` for primary text) allowing for instant, flawless dark-mode adaptation via CSS variables.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 mb-2">Why Framer Motion?</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">CSS transitions are fine for hover states, but complex orchestrations (like the `layoutId` morphing used to open this exact window) require a dedicated animation runtime.</p>
        </div>
      </div>
    </motion.div>
  );
}
