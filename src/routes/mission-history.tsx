import { createFileRoute } from '@tanstack/react-router';
import { Rocket, Satellite, Radio, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/mission-history')({
  component: MissionHistoryComponent,
});

const COMMITS = [
  {
    id: "M-001",
    status: "COMPLETE",
    date: "T-MINUS 5 YEARS",
    title: "Primary Academic Ignition",
    details: "Graduated with honors. Heavy focus on Systems Architecture and Data Structures.",
    sys: "CORE",
    icon: Rocket
  },
  {
    id: "M-002",
    status: "COMPLETE",
    date: "T-MINUS 4 YEARS",
    title: "Backend Orbit Insertion",
    details: "Started career focusing on monolithic architectures and relational databases.",
    sys: "BACKEND",
    icon: Satellite
  },
  {
    id: "M-003",
    status: "COMPLETE",
    date: "T-MINUS 2 YEARS",
    title: "Enterprise Payload Deployed",
    details: "Maintained and scaled Frappe/ERPNext systems for manufacturing clients. Learned the hard way why database indexes matter.",
    sys: "BACKEND",
    icon: Radio
  },
  {
    id: "M-004",
    status: "ACTIVE",
    date: "T-MINUS 0",
    title: "AI Systems Architect",
    details: "Currently architecting multi-tenant RAG pipelines and autonomous agents for enterprise deployment.",
    sys: "AI_CORE",
    icon: Crosshair
  }
];

function MissionHistoryComponent() {
  return (
    <div className="pt-24 pb-32 bg-black min-h-screen font-mono text-white selection:bg-red-900 selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl relative">
        
        {/* Background Grid */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <header className="mb-20 border-b border-red-900/50 pb-8 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-4 h-4 bg-red-600 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Mission Logs</h1>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-white/50 tracking-widest uppercase">
            <span>SYS_TIME: {new Date().toISOString()}</span>
            <span>DATA_LINK: STABLE</span>
            <span>TELEMETRY: ACTIVE</span>
          </div>
        </header>

        <div className="relative z-10">
          {/* Main trunk line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-red-900/50" />

          <div className="space-y-12">
            {COMMITS.map((commit, i) => (
              <motion.div 
                key={commit.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16 group"
              >
                {/* Node */}
                <div className={`absolute left-[13px] top-1 w-7 h-7 rounded border bg-black flex items-center justify-center z-10 transition-colors
                  ${commit.status === 'ACTIVE' ? 'border-red-600 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'border-white/20 text-white/40'}
                `}>
                  <commit.icon className="w-3.5 h-3.5" />
                </div>

                {/* Content */}
                <div className="bg-[#050505] p-6 border border-white/10 relative overflow-hidden group-hover:border-red-900/50 transition-colors">
                  <div className="absolute top-0 right-0 px-2 py-1 bg-white/5 text-[10px] text-white/30 tracking-widest">{commit.sys}</div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-red-500 font-bold">{commit.id}</span>
                    <span className="text-white/40 text-xs tracking-widest">{commit.date}</span>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider
                      ${commit.status === 'ACTIVE' ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 'bg-white/5 text-white/50'}
                    `}>
                      {commit.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{commit.title}</h3>
                  <p className="text-white/60 font-sans text-sm leading-relaxed max-w-2xl">{commit.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
