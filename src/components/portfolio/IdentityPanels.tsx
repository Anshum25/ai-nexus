import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./Timeline";
import { ChevronDown, Code2, Database, BrainCircuit, Blocks } from "lucide-react";

const PANELS = [
  {
    id: "ai",
    icon: <BrainCircuit className="w-5 h-5" />,
    title: "AI Engineer",
    description: "Designing intelligent systems that act autonomously and reliably.",
    values: [
      { v: "Think before building", desc: "Architecture over impulse. Plan the agentic flow before writing prompts." },
      { v: "Measure before optimizing", desc: "Build evals first. You can't improve what you don't track." }
    ]
  },
  {
    id: "backend",
    icon: <Database className="w-5 h-5" />,
    title: "Backend Developer",
    description: "Building the invisible engines that power the experience.",
    values: [
      { v: "Build for maintainability", desc: "Code is read 10x more than written. Clean abstractions matter." },
      { v: "Performance matters", desc: "From sub-200ms websocket responses to optimizing vector lookups." }
    ]
  },
  {
    id: "enterprise",
    icon: <Blocks className="w-5 h-5" />,
    title: "Enterprise Systems",
    description: "Mapping complex business workflows into seamless software.",
    values: [
      { v: "Automate repetitive work", desc: "If a human does it twice, a script should do it the third time." },
      { v: "Document important systems", desc: "Code explains how, documentation explains why." }
    ]
  },
];

export function IdentityPanels() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32 z-20">
      <SectionHeading eyebrow="Engineering Identity" title="Who I am." subtitle="Roles defined by values, not job titles." />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-3xl p-8 transition-all duration-500 cursor-pointer border ${activePanel === panel.id ? 'border-[var(--electric)] shadow-[0_0_40px_rgba(0,180,255,0.15)]' : 'border-white/5 hover:border-white/20'}`}
            onClick={() => setActivePanel(activePanel === panel.id ? null : panel.id)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-2xl ${activePanel === panel.id ? 'bg-[var(--electric)] text-black' : 'bg-white/5 text-[var(--electric)]'} transition-colors`}>
                {panel.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{panel.title}</h3>
            </div>
            
            <p className="text-sm text-[var(--foreground)]/50 mb-6">{panel.description}</p>
            
            <AnimatePresence>
              {activePanel === panel.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-white/10 pt-6 mt-6"
                >
                  <div className="space-y-6">
                    {panel.values.map((val, idx) => (
                      <div key={idx}>
                        <h4 className="text-sm font-mono text-[var(--cyan)] uppercase tracking-wider mb-2">{val.v}</h4>
                        <p className="text-sm text-[var(--foreground)]/70">{val.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-end">
              <ChevronDown className={`w-4 h-4 text-[var(--foreground)]/30 transition-transform duration-300 ${activePanel === panel.id ? 'rotate-180 text-[var(--cyan)]' : ''}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
