import { motion } from 'framer-motion';
import { Sun, Code, Search, Brain, Moon, Coffee, Briefcase, GraduationCap, Award, Star } from 'lucide-react';

export function WorkflowTimeline() {
  const daySchedule = [
    { time: '08:00 AM', label: 'Morning Research', icon: Search, desc: 'Reading whitepapers, reviewing pull requests, and catching up on arXiv releases.' },
    { time: '09:30 AM', label: 'Deep Planning', icon: Brain, desc: 'Writing architecture documents, drawing flowcharts, and defining API schemas before touching code.' },
    { time: '11:00 AM', label: 'Flow State Coding', icon: Code, desc: 'Headphones on. Terminal open. Executing the morning\'s architecture plan with zero distractions.' },
    { time: '02:00 PM', label: 'Testing & CI/CD', icon: Coffee, desc: 'Writing unit tests, fixing pipeline failures, and ensuring Docker containers build cleanly.' },
    { time: '06:00 PM', label: 'Evening Reflection', icon: Moon, desc: 'Reviewing the day\'s diffs, updating documentation, and writing down tomorrow\'s hardest problem.' },
  ];

  const careerTimeline = [
    { year: '2024 - Present', role: 'Senior AI Engineer', org: 'Nexus Corporation', icon: Star, type: 'current', desc: 'Leading the architecture and deployment of multi-agent LLM systems and custom RAG pipelines.' },
    { year: '2022 - 2024', role: 'Backend Engineer', org: 'DataFlow Inc', icon: Briefcase, type: 'past', desc: 'Scaled FastAPI microservices to handle 10k RPS. Migrated legacy monolith to Kubernetes.' },
    { year: '2021', role: 'Software Engineering Intern', org: 'TechNova', icon: Briefcase, type: 'past', desc: 'Built internal admin dashboards and optimized SQL queries reducing latency by 40%.' },
    { year: '2021', role: 'B.S. Computer Science', org: 'University of Engineering', icon: GraduationCap, type: 'past', desc: 'Specialized in Distributed Systems and Machine Learning. Published paper on vector search optimization.' },
    { year: '2019', role: 'First Production App', org: 'Side Project', icon: Award, type: 'past', desc: 'Deployed a full-stack Django application that acquired 1,000 active users in the first month.' },
  ];

  return (
    <div className="w-full space-y-32">
      
      {/* SECTION 04: A DAY INSIDE */}
      <section id="day-inside" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 04</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">A Day Inside My Workspace</h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-xl font-serif italic">Structure prevents burnout. This is how I organize my mental energy.</p>
        </motion.div>

        <div className="relative pl-6 md:pl-8 border-l border-white/10 space-y-12">
          {daySchedule.map((slot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full bg-black border-2 border-[var(--cyan)]/30 group-hover:border-[var(--cyan)] group-hover:shadow-[0_0_10px_var(--cyan)] transition-all z-10" />
              
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="w-32 shrink-0">
                  <div className="font-mono text-xs text-[var(--cyan)] uppercase tracking-widest">{slot.time}</div>
                </div>
                
                <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-2xl group-hover:bg-white/[0.05] group-hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <slot.icon className="w-4 h-4 text-[var(--foreground)]/50" />
                    <h3 className="font-bold text-[var(--foreground)] uppercase tracking-wider text-sm">{slot.label}</h3>
                  </div>
                  <p className="text-[var(--foreground)]/60 text-sm font-serif">{slot.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 09: TIMELINE */}
      <section id="timeline" className="scroll-mt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 09</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">Career Timeline</h2>
        </motion.div>

        <div className="relative pl-6 md:pl-8 border-l border-white/10 space-y-12">
          {careerTimeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group cursor-default"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full border-2 transition-all z-10 ${item.type === 'current' ? 'bg-[var(--electric)] border-[var(--electric)] shadow-[0_0_15px_var(--electric)]' : 'bg-black border-white/30 group-hover:border-white'}`} />
              
              <div className="flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-1">{item.year}</div>
                <h3 className={`text-xl font-bold mb-1 ${item.type === 'current' ? 'text-[var(--electric)]' : 'text-[var(--foreground)]'}`}>{item.role}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <item.icon className="w-3 h-3 text-[var(--foreground)]/30" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/50">{item.org}</span>
                </div>
                <p className="text-sm text-[var(--foreground)]/70 max-w-2xl leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
