import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectDirectory } from "./ProjectDirectory";
import { ProjectDossier } from "./ProjectDossier";

export function EngineeringArchives() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  return (
    <section className="w-full relative py-32 px-4 lg:px-8 bg-background" id="archives">
      <div className="max-w-[1400px] mx-auto relative min-h-[800px]">
        
        <AnimatePresence mode="wait">
          {!activeProjectId ? (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* Header */}
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[var(--foreground)] font-mono uppercase mb-4">
                  Engineering Archives
                </h2>
                <p className="text-[var(--foreground)]/50 text-lg font-serif italic tracking-wide max-w-2xl mb-10">
                  Every project tells a story of research, engineering decisions, failures, and deployment.
                </p>
                
                {/* Stats Row */}
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {[
                    { l: "Projects", v: "42" },
                    { l: "Case Studies", v: "14" },
                    { l: "Architecture Files", v: "156" },
                    { l: "Research", v: "28" },
                    { l: "Deployments", v: "1.2k" },
                    { l: "Experiments", v: "89" }
                  ].map(stat => (
                    <div key={stat.l} className="flex flex-col">
                      <span className="text-xl font-bold text-[var(--foreground)] font-mono">{stat.v}</span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)]/40">{stat.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blueprint Divider */}
              <div className="w-full h-[1px] bg-white/10 relative mb-16">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20" />
              </div>

              <ProjectDirectory onOpenProject={(id) => setActiveProjectId(id)} />
            </motion.div>
          ) : (
            <div key="dossier" className="absolute inset-0 z-50">
               <ProjectDossier onClose={() => setActiveProjectId(null)} />
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
