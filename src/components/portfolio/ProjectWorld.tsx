import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Globe, Cpu, Code2, TrendingUp, ArrowRight, Github, ExternalLink, ShieldCheck } from "lucide-react";

export type ProjectMode = "story" | "architecture" | "engineering" | "business";

export type ProjectData = {
  id: string;
  name: string;
  status: string;
  environment: string;
  technologies: string[];
  timeline: string;
  objective: string;
  orbit: number;
  color: string;
  
  // The 6 Questions (Theme)
  q1: string; // What problem existed?
  q2: string; // Why was it difficult?
  q3: string; // How did I think about it?
  q4: string; // How did I design it?
  q5: string; // How did I build it?
  q6: string; // What changed?

  // Extended Data
  research: string;
  architecture: string;
  engineeringDecisions: string[];
  implementationSteps: { phase: string; desc: string }[];
  challenges: { problem: string; solution: string }[];
  metrics: { label: string; value: string }[];
  lessons: string[];
  future: string;
  
  links: { github?: string; demo?: string };
};

export function ProjectWorld({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<ProjectMode>("story");

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex bg-black/90 backdrop-blur-3xl overflow-hidden"
        >
          <motion.div
            layoutId={`project-sphere-${project.id}`}
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)` 
            }}
          />

          <div className="relative w-full h-full flex flex-col md:flex-row">
            
            {/* Left Sidebar: Navigation & Modes */}
            <div className="w-full md:w-64 border-r border-white/10 bg-black/40 p-6 flex flex-col z-20 shrink-0">
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors mb-12">
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--cyan)] mb-4">View Modes</div>
              <div className="space-y-2 flex-1">
                <ModeBtn active={mode === "story"} onClick={() => setMode("story")} icon={<Globe className="w-4 h-4" />} label="Story Mode" />
                <ModeBtn active={mode === "architecture"} onClick={() => setMode("architecture")} icon={<Cpu className="w-4 h-4" />} label="Architecture" />
                <ModeBtn active={mode === "engineering"} onClick={() => setMode("engineering")} icon={<Code2 className="w-4 h-4" />} label="Engineering" />
                <ModeBtn active={mode === "business"} onClick={() => setMode("business")} icon={<TrendingUp className="w-4 h-4" />} label="Business Impact" />
              </div>

              <div className="mt-8 font-mono text-[10px] text-white/30">NEXUS OS / {project.id}</div>
            </div>

            {/* Center Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 z-20 scroll-smooth">
              <div className="max-w-4xl mx-auto pb-32">
                
                {/* Header */}
                <div className="mb-16">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-white/70 bg-white/5">{project.status}</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--cyan)]/30 text-xs font-mono text-[var(--cyan)] bg-[var(--cyan)]/5">{project.environment}</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--electric)]/30 text-xs font-mono text-[var(--electric)] bg-[var(--electric)]/5">{project.timeline}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{project.name}</h1>
                  <p className="text-xl text-white/60 font-light leading-relaxed max-w-3xl">{project.objective}</p>
                </div>

                {/* Dynamic Mode Content */}
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {mode === "story" && (
                    <div className="space-y-16">
                      <Section title="The Problem" content={project.q1} />
                      <Section title="Why It Was Difficult" content={project.q2} />
                      <div className="glass p-8 rounded-2xl border-l-2" style={{ borderColor: project.color }}>
                        <h3 className="font-mono text-xs uppercase text-white/40 tracking-widest mb-4">Research & Approach</h3>
                        <p className="text-white/80 leading-relaxed text-lg">{project.research}</p>
                      </div>
                      <Section title="Lessons Learned" list={project.lessons} />
                      <Section title="The Future" content={project.future} />
                    </div>
                  )}

                  {mode === "architecture" && (
                    <div className="space-y-16">
                      <Section title="How I Thought About It" content={project.q3} />
                      <Section title="System Design" content={project.q4} />
                      
                      <div className="glass p-8 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                        <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }} />
                        <div className="text-center relative z-10">
                          <Cpu className="w-12 h-12 mx-auto text-white/40 mb-4" />
                          <h4 className="text-xl text-white font-medium mb-2">Architecture Topology</h4>
                          <p className="text-white/50 text-sm max-w-md">{project.architecture}</p>
                        </div>
                      </div>

                      <Section title="Core Engineering Decisions" list={project.engineeringDecisions} />
                    </div>
                  )}

                  {mode === "engineering" && (
                    <div className="space-y-16">
                      <Section title="How I Built It" content={project.q5} />
                      
                      <div>
                        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-8">Implementation Pipeline</h3>
                        <div className="space-y-4">
                          {project.implementationSteps.map((s, i) => (
                            <div key={i} className="flex gap-6 items-start p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
                              <div className="font-mono text-[10px] uppercase mt-1 shrink-0 w-24" style={{ color: project.color }}>{s.phase}</div>
                              <div className="text-white/80 text-sm leading-relaxed">{s.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-8">Incidents & Solutions</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {project.challenges.map((c, i) => (
                            <div key={i} className="glass p-6 rounded-2xl border border-white/10">
                              <div className="text-red-400 font-mono text-xs mb-2 flex items-center gap-2">Issue / Challenge</div>
                              <div className="text-white mb-6">{c.problem}</div>
                              <div className="text-green-400 font-mono text-xs mb-2 flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Solution Applied</div>
                              <div className="text-white/70">{c.solution}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === "business" && (
                    <div className="space-y-16">
                      <Section title="What Changed? (The Outcome)" content={project.q6} />
                      
                      <div>
                        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-8">Impact Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {project.metrics.map((m, i) => (
                            <div key={i} className="glass p-6 rounded-2xl border-t-2" style={{ borderColor: project.color }}>
                              <div className="text-3xl font-bold text-white mb-2">{m.value}</div>
                              <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {/* Footer Continue Action */}
                <div className="mt-24 pt-12 border-t border-white/10 flex justify-end">
                  <button onClick={onClose} className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors">
                    <span className="font-mono text-xs uppercase tracking-widest">Continue Exploration</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--cyan)] group-hover:bg-[var(--cyan)]/10 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Quick Stats */}
            <div className="w-full md:w-72 bg-black/60 p-8 border-l border-white/10 z-20 shrink-0 hidden lg:block overflow-y-auto">
              <h4 className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-6">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 mb-12">
                {project.technologies.map(t => (
                  <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80">{t}</span>
                ))}
              </div>

              <h4 className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-6">Key Metrics</h4>
              <div className="space-y-4 mb-12">
                {project.metrics.slice(0, 3).map((m, i) => (
                  <div key={i}>
                    <div className="text-lg font-semibold text-white">{m.value}</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">{m.label}</div>
                  </div>
                ))}
              </div>

              <h4 className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-6">Access</h4>
              <div className="space-y-3">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> View Source
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModeBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
        active 
          ? "bg-[var(--electric)]/20 text-white border border-[var(--electric)]/30 shadow-[0_0_15px_rgba(0,180,255,0.2)]" 
          : "text-white/40 hover:bg-white/5 hover:text-white/80 border border-transparent"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Section({ title, content, list }: { title: string; content?: string; list?: string[] }) {
  return (
    <div>
      <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-6">{title}</h3>
      {content && <p className="text-white/80 leading-relaxed text-lg font-light">{content}</p>}
      {list && (
        <ul className="space-y-4">
          {list.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shrink-0" />
              <span className="text-white/80 leading-relaxed text-lg font-light">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
