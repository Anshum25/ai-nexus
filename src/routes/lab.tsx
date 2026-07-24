import { createFileRoute } from '@tanstack/react-router';
import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Network, Server, Terminal, Database, Box, Zap, Share2, FlaskConical, LayoutTemplate, X, Loader2 } from 'lucide-react';

// Lazy loaded labs
const PromptLab = lazy(() => import('../components/portfolio/lab/PromptLab').then(m => ({ default: m.PromptLab })));
const ArchitectureBuilder = lazy(() => import('../components/portfolio/lab/ArchitectureBuilder').then(m => ({ default: m.ArchitectureBuilder })));
const SystemDesignLab = lazy(() => import('../components/portfolio/lab/SystemDesignLab').then(m => ({ default: m.SystemDesignLab })));
const Sandbox = lazy(() => import('../components/portfolio/lab/Sandbox').then(m => ({ default: m.Sandbox })));
const RAGVisualizer = lazy(() => import('../components/portfolio/lab/ShellLabs').then(m => ({ default: m.RAGVisualizer })));
const ApiExplorer = lazy(() => import('../components/portfolio/lab/ShellLabs').then(m => ({ default: m.ApiExplorer })));
const DatabaseExplorer = lazy(() => import('../components/portfolio/lab/ShellLabs').then(m => ({ default: m.DatabaseExplorer })));
const DockerLab = lazy(() => import('../components/portfolio/lab/ShellLabs').then(m => ({ default: m.DockerLab })));
const PerformanceLab = lazy(() => import('../components/portfolio/lab/ShellLabs').then(m => ({ default: m.PerformanceLab })));
const Experiments = lazy(() => import('../components/portfolio/lab/ShellLabs').then(m => ({ default: m.Experiments })));

export const Route = createFileRoute('/lab')({
  component: EngineeringLab,
});

const LAB_DIRECTORY = [
  { id: 'prompt', title: 'Prompt Lab', icon: Bot, color: 'text-purple-400', component: PromptLab },
  { id: 'rag', title: 'RAG Visualizer', icon: Share2, color: 'text-pink-400', component: RAGVisualizer },
  { id: 'arch', title: 'Architecture Builder', icon: Network, color: 'text-blue-400', component: ArchitectureBuilder },
  { id: 'api', title: 'API Explorer', icon: Terminal, color: 'text-green-400', component: ApiExplorer },
  { id: 'db', title: 'Database Explorer', icon: Database, color: 'text-yellow-400', component: DatabaseExplorer },
  { id: 'docker', title: 'Docker Lab', icon: Box, color: 'text-[#0db7ed]', component: DockerLab },
  { id: 'perf', title: 'Performance Lab', icon: Zap, color: 'text-orange-400', component: PerformanceLab },
  { id: 'system', title: 'System Design Lab', icon: Server, color: 'text-red-400', component: SystemDesignLab },
  { id: 'experiments', title: 'Experiments', icon: FlaskConical, color: 'text-emerald-400', component: Experiments },
  { id: 'sandbox', title: 'Sandbox', icon: LayoutTemplate, color: 'text-[var(--foreground)]', component: Sandbox },
];

function EngineeringLab() {
  const [activeLab, setActiveLab] = useState<string | null>(null);

  const activeLabData = LAB_DIRECTORY.find(l => l.id === activeLab);
  const ActiveComponent = activeLabData?.component;

  return (
    <div className="pt-24 pb-32 bg-[var(--background)] min-h-screen text-[var(--foreground)] relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--cyan)]/5 via-[#050505]/0 to-[#050505]/0" />

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        
        {/* Header */}
        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-4">
            Interactive Facilities
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-mono uppercase">
            Engineering Lab
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-[var(--foreground)]/50 max-w-2xl font-serif italic mb-8">
            Interact with engineering concepts rather than reading about them. Welcome to the facility.
          </motion.p>
        </header>

        {/* Directory Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {LAB_DIRECTORY.map((lab, i) => (
            <motion.button
              key={lab.id}
              layoutId={`lab-container-${lab.id}`}
              onClick={() => setActiveLab(lab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-6 bg-white/[0.02] border border-white/10 rounded-2xl text-left flex flex-col gap-4 overflow-hidden group hover:border-white/30 hover:bg-white/[0.05] transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div layoutId={`lab-icon-${lab.id}`} className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center relative z-10 shadow-lg">
                <lab.icon className={`w-6 h-6 ${lab.color}`} />
              </motion.div>
              <motion.div layoutId={`lab-title-${lab.id}`} className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)]/90 relative z-10 font-bold">
                {lab.title}
              </motion.div>
              <div className="font-mono text-[9px] text-[var(--foreground)]/30 uppercase tracking-widest mt-auto">Initialize Module →</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Expanded Lab Modal */}
        <AnimatePresence>
          {activeLab && ActiveComponent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pt-24 pb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveLab(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              />
              
              <motion.div
                layoutId={`lab-container-${activeLab}`}
                className="w-full max-w-7xl h-full bg-[var(--background)] border border-white/20 rounded-3xl relative z-10 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              >
                {/* Modal Header */}
                <div className="h-16 border-b border-white/10 bg-black/50 flex items-center justify-between px-6 shrink-0 relative z-20">
                  <div className="flex items-center gap-3">
                    <motion.div layoutId={`lab-icon-${activeLab}`} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {activeLabData && <activeLabData.icon className={`w-4 h-4 ${activeLabData.color}`} />}
                    </motion.div>
                    <motion.div layoutId={`lab-title-${activeLab}`} className="font-mono text-sm uppercase tracking-widest text-[var(--foreground)] font-bold">
                      {activeLabData?.title}
                    </motion.div>
                  </div>
                  <button 
                    onClick={() => setActiveLab(null)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Content - Lazy Loaded */}
                <div className="flex-1 overflow-hidden relative">
                  <Suspense fallback={
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[var(--cyan)]">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <div className="font-mono text-[10px] uppercase tracking-widest">Loading Module...</div>
                    </div>
                  }>
                    <ActiveComponent />
                  </Suspense>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
