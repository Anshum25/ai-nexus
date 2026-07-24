import { motion } from 'framer-motion';
import { Figma, GitBranch, Database, Terminal, Cloud, Play, ArrowRight, Server } from 'lucide-react';

interface ScheduleItem {
  time: string;
  label: string;
  desc: string;
}

export function CompanyWorkflow({ schedule }: { schedule: ScheduleItem[] }) {
  
  const workflowTools = [
    { name: 'Figma', icon: Figma, type: 'Design & Req' },
    { name: 'Git / GitHub', icon: GitBranch, type: 'Version Control' },
    { name: 'FastAPI / Node', icon: Terminal, type: 'Backend Logic' },
    { name: 'PostgreSQL', icon: Database, type: 'Persistence' },
    { name: 'Docker / K8s', icon: Server, type: 'Containerization' },
    { name: 'AWS / Vercel', icon: Cloud, type: 'Deployment' },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* Left: Day Inside Timeline */}
      <div>
        <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-8 flex items-center gap-2">
          <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
          A Typical Day
        </div>

        <div className="relative pl-6 border-l border-[var(--border)] space-y-10">
          {schedule.map((slot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[var(--background)] border-2 border-[var(--border)] group-hover:border-[var(--accent)] group-hover:shadow-[0_0_10px_var(--accent)] transition-all z-10" />
              
              <div>
                <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-1">{slot.time}</div>
                <h3 className="font-bold text-[var(--foreground)] uppercase tracking-wider text-sm mb-2">{slot.label}</h3>
                <p className="text-[var(--foreground)]/50 text-sm font-serif leading-relaxed">{slot.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Tools & Workflow Animation */}
      <div>
        <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-8 flex items-center gap-2">
          <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
          Engineering Pipeline
        </div>

        <div className="bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-sm flex flex-col gap-6">
            {workflowTools.map((tool, i) => (
              <div key={tool.name} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-[var(--foreground)]/[0.02] border border-[var(--border)] p-4 rounded-xl hover:bg-[var(--foreground)]/[0.05] hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[var(--background)] rounded-lg border border-[var(--border)] flex items-center justify-center shrink-0">
                    <tool.icon className="w-5 h-5 text-[var(--muted-foreground)]" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[var(--foreground)] uppercase font-bold tracking-widest mb-1">{tool.name}</div>
                    <div className="font-mono text-[9px] text-[var(--muted-foreground)] uppercase tracking-widest">{tool.type}</div>
                  </div>
                </motion.div>

                {i < workflowTools.length - 1 && (
                  <div className="absolute -bottom-6 left-9 w-px h-6 bg-[var(--border)] overflow-hidden">
                    <motion.div
                      animate={{ y: [0, 24] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      className="w-full h-1/2 bg-gradient-to-b from-transparent to-[var(--accent)]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
