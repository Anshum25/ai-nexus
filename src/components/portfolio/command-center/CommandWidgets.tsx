import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Code2, Database, Box, BookOpen, Terminal, ChevronRight, Zap, Play, Search, Folder, MessageSquare, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Base Widget Container for consistent styling
function Widget({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden p-6 relative group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

// ==========================================
// 1. CURRENT MISSION
// ==========================================
export function WidgetCurrentMission({ delay }: { delay: number }) {
  return (
    <Widget delay={delay} className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[var(--cyan)]/5 to-transparent border-[var(--cyan)]/20 hover:border-[var(--cyan)]/40">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full animate-pulse shadow-[0_0_8px_var(--cyan)]" />
          Priority 01
        </div>
        <div className="text-[10px] text-[var(--cyan)]/50 font-mono">Sprint 14 • Week 3</div>
      </div>
      
      <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Enterprise AI Assistant</h3>
      <p className="text-sm text-[var(--cyan)]/80 mb-6">Objective: Agentic RAG Architecture</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Status", value: "Building" },
          { label: "Complexity", value: "High" },
          { label: "Team Size", value: "Personal" },
          { label: "Next Milestone", value: "Beta v0.9" }
        ].map(item => (
          <div key={item.label}>
            <div className="text-[9px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest mb-1">{item.label}</div>
            <div className="text-sm font-semibold text-[var(--foreground)]/90">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="flex justify-between text-[10px] font-mono text-[var(--foreground)]/50 mb-2">
          <span>Overall Progress</span>
          <span>68%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "68%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: "circOut" }}
            className="h-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]"
          />
        </div>
        
        <Link to="/work" className="inline-flex items-center gap-2 text-[10px] font-mono text-[var(--foreground)] hover:text-[var(--cyan)] transition-colors tracking-widest uppercase">
          Open Mission <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </Widget>
  );
}

// ==========================================
// 2. ACTIVE PROJECTS
// ==========================================
export function WidgetActiveProjects({ delay }: { delay: number }) {
  const projects = [
    { name: "Enterprise AI Assistant", status: "Building", tech: "FastAPI, LangChain", diff: "Hard", updated: "2h ago" },
    { name: "Chess Mentor AI", status: "Refactoring", tech: "Next.js, Python", diff: "Medium", updated: "1d ago" },
    { name: "SkyERP Solutions", status: "Maintenance", tech: "ERPNext, Frappe", diff: "Complex", updated: "3d ago" }
  ];

  return (
    <Widget delay={delay} className="col-span-1 md:col-span-2 lg:col-span-2">
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-6">Active Projects</div>
      <div className="flex flex-col gap-2 h-full justify-between">
        {projects.map((proj, i) => (
          <Link key={proj.name} to="/work" className="group/proj relative glass rounded-xl border border-white/5 p-4 hover:bg-white/5 hover:border-white/10 transition-all flex flex-col justify-center">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold text-sm text-[var(--foreground)] group-hover/proj:text-[var(--cyan)] transition-colors">{proj.name}</h4>
              <span className="text-[9px] font-mono text-[var(--foreground)]/30">{proj.updated}</span>
            </div>
            
            {/* Expanded Content on Hover */}
            <div className="grid grid-rows-[0fr] group-hover/proj:grid-rows-[1fr] transition-all duration-300 ease-in-out">
              <div className="overflow-hidden">
                <div className="pt-4 flex gap-4 text-[9px] font-mono text-[var(--foreground)]/50">
                  <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> {proj.tech}</span>
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {proj.diff}</span>
                </div>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-4 opacity-0 group-hover/proj:opacity-100 transition-opacity text-[var(--cyan)]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </Widget>
  );
}

// ==========================================
// 3. TODAY'S ENGINEERING
// ==========================================
export function WidgetEngineeringActivity({ delay }: { delay: number }) {
  const events = [
    { text: "Implemented JWT Auth", type: "feat" },
    { text: "Improved SQL Optimizer", type: "perf" },
    { text: "Added Metadata Filters", type: "feat" },
    { text: "Optimized Docker Compose", type: "ops" },
    { text: "Built Prompt Pipeline", type: "feat" },
  ];

  return (
    <Widget delay={delay}>
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-6 flex justify-between">
        <span>Today's Engineering</span>
        <Activity className="w-3 h-3" />
      </div>
      <div className="relative border-l border-white/10 ml-2 space-y-5 flex-1">
        {events.map((ev, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 + (i * 0.1) }}
            className="relative pl-6"
          >
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[var(--electric)] ring-4 ring-background" />
            <div className="text-xs text-[var(--foreground)]/80">{ev.text}</div>
          </motion.div>
        ))}
      </div>
    </Widget>
  );
}

// ==========================================
// 4. CURRENT RESEARCH
// ==========================================
export function WidgetCurrentResearch({ delay }: { delay: number }) {
  const topics = ["Multi-Agent Systems", "MCP", "Vision Models", "RAG Evaluation", "Memory Systems"];
  return (
    <Widget delay={delay}>
      <div className="font-mono text-[10px] text-[var(--electric)] uppercase tracking-widest mb-6 flex justify-between">
        <span>Current Research</span>
        <Search className="w-3 h-3" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {topics.map((t, i) => (
          <Link key={t} to="/research-vault" className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
            <span className="text-xs font-serif text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] group-hover:italic transition-all">{t}</span>
            <ChevronRight className="w-3 h-3 text-[var(--foreground)]/20 group-hover:text-[var(--foreground)]/60 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </Widget>
  );
}

// ==========================================
// 5. CURRENTLY LEARNING
// ==========================================
export function WidgetCurrentlyLearning({ delay }: { delay: number }) {
  const items = [
    { title: "Designing Data Intensive Apps", type: "Book", progress: 45 },
    { title: "Advanced FastAPI Patterns", type: "Docs", progress: 80 },
    { title: "Attention Is All You Need", type: "Paper", progress: 25 },
  ];
  return (
    <Widget delay={delay}>
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-6 flex justify-between">
        <span>Currently Learning</span>
        <BookOpen className="w-3 h-3" />
      </div>
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        {items.map(item => (
          <div key={item.title}>
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-[9px] font-mono text-[var(--foreground)]/30 uppercase">{item.type}</div>
                <div className="text-xs text-[var(--foreground)]/90 font-medium truncate max-w-[150px]">{item.title}</div>
              </div>
              <div className="text-[9px] font-mono text-[var(--foreground)]/50">{item.progress}%</div>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${item.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                className="h-full bg-[var(--electric)]"
              />
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
}

// ==========================================
// 6. ENGINEERING DECISIONS
// ==========================================
export function WidgetEngineeringDecisions({ delay }: { delay: number }) {
  return (
    <Widget delay={delay} className="col-span-1 md:col-span-2 relative overflow-hidden">
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-4">Engineering Decision</div>
      <div className="flex items-center gap-4 h-full">
        {/* Flowchart Diagram */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-2 p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="flex flex-col items-center">
            <div className="text-[9px] font-mono text-[var(--foreground)]/40 mb-2 uppercase">Need</div>
            <div className="px-3 py-1.5 bg-white/5 rounded text-xs text-[var(--foreground)]/80 border border-white/10">Vector DB</div>
          </div>
          
          <ChevronRight className="w-4 h-4 text-[var(--foreground)]/20 hidden sm:block" />
          
          <div className="flex flex-col items-center">
            <div className="text-[9px] font-mono text-[var(--foreground)]/40 mb-2 uppercase">Selected</div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.5, type: "spring" }}
              className="px-3 py-1.5 bg-[var(--cyan)]/20 text-[var(--cyan)] rounded text-xs border border-[var(--cyan)]/50 shadow-[0_0_15px_rgba(0,180,255,0.2)] font-bold"
            >
              Qdrant
            </motion.div>
          </div>
          
          <ChevronRight className="w-4 h-4 text-[var(--foreground)]/20 hidden sm:block" />
          
          <div className="flex flex-col items-center">
            <div className="text-[9px] font-mono text-[var(--foreground)]/40 mb-2 uppercase">Reason</div>
            <div className="px-3 py-1.5 bg-white/5 rounded text-[10px] text-[var(--foreground)]/70 border border-white/10">Payload Filtering</div>
          </div>
        </div>
        
        <Link to="/decision-room" className="shrink-0 group flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-[var(--electric)] transition-colors">
            <ArrowUpRight className="w-4 h-4 text-[var(--foreground)]/50 group-hover:text-[var(--electric)] transition-colors" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)]/40 group-hover:text-[var(--foreground)]/80">Read</span>
        </Link>
      </div>
    </Widget>
  );
}

// ==========================================
// 7. RECENT FAILURES
// ==========================================
export function WidgetRecentFailures({ delay }: { delay: number }) {
  const failures = [
    { text: "Hallucinating Retrieval", status: "Solved" },
    { text: "Slow Query", status: "Investigating" },
    { text: "Prompt Drift", status: "Learning" },
  ];
  return (
    <Widget delay={delay}>
      <div className="font-mono text-[10px] text-red-400 uppercase tracking-widest mb-6 flex justify-between">
        <span>Recent Failures</span>
        <AlertTriangle className="w-3 h-3" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {failures.map(f => (
          <Link key={f.text} to="/failure-museum" className="group flex items-center justify-between p-3 rounded-lg border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 transition-colors">
            <span className="text-xs text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] transition-colors">{f.text}</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${f.status === 'Solved' ? 'bg-green-500' : f.status === 'Investigating' ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500'}`} />
              <span className="text-[9px] font-mono text-[var(--foreground)]/40">{f.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </Widget>
  );
}

// ==========================================
// 8. SYSTEM HEALTH
// ==========================================
export function WidgetSystemHealth({ delay }: { delay: number }) {
  return (
    <Widget delay={delay} className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col relative overflow-hidden">
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-4 flex justify-between relative z-10">
        <span>System Health</span>
        <Activity className="w-3 h-3 text-[var(--electric)]" />
      </div>
      
      {/* Animated SVG Sparkline */}
      <div className="absolute inset-0 top-1/2 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,25 Q10,5 20,25 T40,25 T60,10 T80,30 T100,20"
            fill="none"
            stroke="var(--electric)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto relative z-10">
        <div>
          <div className="text-2xl font-bold text-[var(--foreground)] font-mono">14</div>
          <div className="text-[9px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest">Projects Online</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[var(--foreground)] font-mono">03</div>
          <div className="text-[9px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest">Experiments</div>
        </div>
        <div>
          <div className="text-xl font-bold text-[var(--foreground)] font-mono">1.2k</div>
          <div className="text-[9px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest">Learning Hrs</div>
        </div>
        <div>
          <div className="text-xl font-bold text-[var(--foreground)] font-mono">24</div>
          <div className="text-[9px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest">Repositories</div>
        </div>
      </div>
    </Widget>
  );
}

// ==========================================
// 9. TODAY'S NOTE
// ==========================================
export function WidgetTodaysNote({ delay }: { delay: number }) {
  return (
    <Widget delay={delay} className="col-span-1 md:col-span-1 lg:col-span-2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-blend-overlay opacity-90 border-[var(--cyan)]/10 flex flex-col justify-between group">
      <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-4">Today's Lesson</div>
      <div className="font-serif italic text-xl text-[var(--foreground)]/90 leading-relaxed font-light">
        "The fastest architecture is often the simplest one."
      </div>
      <Link to="/journal" className="mt-6 flex items-center gap-2 text-[9px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest hover:text-[var(--foreground)] transition-colors">
        Open Notebook <ArrowUpRight className="w-3 h-3" />
      </Link>
    </Widget>
  );
}

// ==========================================
// 10. QUICK ACCESS
// ==========================================
export function WidgetQuickAccess({ delay }: { delay: number }) {
  const links = [
    { name: "Architecture", to: "/architecture-atlas", icon: Box },
    { name: "Projects", to: "/work", icon: Code2 },
    { name: "Research", to: "/research-vault", icon: Search },
    { name: "Notebook", to: "/journal", icon: BookOpen },
    { name: "Prompt Lab", to: "/prompt-lab", icon: Terminal },
    { name: "Decision Rm", to: "/decision-room", icon: Database },
  ];

  return (
    <Widget delay={delay} className="col-span-1 md:col-span-2 lg:col-span-1">
      <div className="font-mono text-[10px] text-[var(--foreground)]/50 uppercase tracking-widest mb-6">Quick Access</div>
      <div className="grid grid-cols-2 gap-2 h-full">
        {links.map((link, i) => (
          <Link 
            key={link.name} 
            to={link.to}
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[var(--cyan)] transition-colors border border-transparent hover:border-[var(--cyan)]/30 group"
          >
            <link.icon className="w-4 h-4 mb-2 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <span className="text-[8px] font-mono uppercase text-center opacity-70 group-hover:opacity-100">{link.name}</span>
          </Link>
        ))}
      </div>
    </Widget>
  );
}
