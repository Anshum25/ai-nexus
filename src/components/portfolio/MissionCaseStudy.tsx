import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Server, AlertTriangle, ShieldCheck, Database, GitMerge, FileCode } from "lucide-react";

export type Mission = {
  id: string;
  name: string;
  objective: string;
  status: string;
  environment: string;
  team: string;
  impact: string;
  businessProblem: string;
  engineeringChallenge: string;
  research: { q: string; a: string }[];
  implementation: { phase: string; title: string; tech: string }[];
  challenges: { incident: string; severity: string; rootCause: string; resolution: string; outcome: string }[];
  tools: { category: string; list: string[] }[];
  results: string[];
  lessons: string[];
};

export function MissionCaseStudy({
  mission,
  onClose,
}: {
  mission: Mission | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {mission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 md:p-8"
        >
          <motion.div
            layoutId={`mission-${mission.id}`}
            className="relative w-full max-w-6xl h-full max-h-[90vh] rounded-3xl glass border border-white/10 shadow-[0_0_100px_rgba(0,180,255,0.15)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--electric)]/20 border border-[var(--electric)]">
                  <Activity className="w-4 h-4 text-[var(--cyan)]" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--cyan)] uppercase tracking-widest">Mission File</div>
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">{mission.name}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-[var(--foreground)]/70" />
              </button>
            </div>

            {/* Scrollable Case Study Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="max-w-4xl mx-auto space-y-24">
                
                {/* 1. Overview */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 01 / Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="text-sm text-[var(--cyan)] font-mono mb-2">Objective</div>
                      <p className="text-lg text-[var(--foreground)]/90 leading-relaxed font-light">{mission.objective}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <div className="text-[var(--foreground)]/40 mb-1">Status</div>
                        <div className="text-[var(--electric)] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--electric)] animate-pulse" /> {mission.status}</div>
                      </div>
                      <div>
                        <div className="text-[var(--foreground)]/40 mb-1">Environment</div>
                        <div className="text-[var(--foreground)]">{mission.environment}</div>
                      </div>
                      <div>
                        <div className="text-[var(--foreground)]/40 mb-1">Team</div>
                        <div className="text-[var(--foreground)]">{mission.team}</div>
                      </div>
                      <div>
                        <div className="text-[var(--foreground)]/40 mb-1">Impact</div>
                        <div className="text-[var(--foreground)]">{mission.impact}</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Business Problem */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 02 / Context
                  </h3>
                  <div className="glass p-8 rounded-2xl border-l-2 border-l-[var(--cyan)]">
                    <h4 className="text-xl font-medium text-[var(--foreground)] mb-4">The Business Problem</h4>
                    <p className="text-[var(--foreground)]/70 leading-relaxed">{mission.businessProblem}</p>
                  </div>
                </section>

                {/* 3. Engineering Challenge */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 03 / Complexity
                  </h3>
                  <h4 className="text-xl font-medium text-[var(--foreground)] mb-4">Engineering Challenges</h4>
                  <p className="text-[var(--foreground)]/70 leading-relaxed mb-6">{mission.engineeringChallenge}</p>
                </section>

                {/* 4. Research */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 04 / Investigation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mission.research.map((r, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="font-mono text-xs text-[var(--electric)] mb-2">Q: {r.q}</div>
                        <div className="text-sm text-[var(--foreground)]/70">{r.a}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Architecture Preview */}
                <section className="relative overflow-hidden rounded-2xl glass p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <Server className="w-12 h-12 text-[var(--foreground)]/20 mb-4" />
                  <h4 className="text-xl font-medium text-[var(--foreground)] mb-2">System Architecture</h4>
                  <p className="text-[var(--foreground)]/50 text-sm mb-6 max-w-md">The full node topography and data flow diagrams are classified in the Architecture Laboratory.</p>
                  <button className="px-6 py-2 rounded-full border border-[var(--cyan)] text-[var(--cyan)] font-mono text-xs hover:bg-[var(--cyan)] hover:text-black transition-colors">
                    Request Architecture Access
                  </button>
                </section>

                {/* 6. Implementation */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 06 / Execution
                  </h3>
                  <div className="space-y-4">
                    {mission.implementation.map((imp, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                        <div className="font-mono text-[10px] text-[var(--cyan)] uppercase w-20 shrink-0">{imp.phase}</div>
                        <div className="text-[var(--foreground)] font-medium flex-1">{imp.title}</div>
                        <div className="font-mono text-xs text-[var(--foreground)]/40">{imp.tech}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. Challenges (Incidents) */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 07 / Incidents
                  </h3>
                  <div className="space-y-6">
                    {mission.challenges.map((c, i) => (
                      <div key={i} className="glass rounded-xl overflow-hidden border-l-2 border-l-red-500">
                        <div className="bg-red-500/10 px-6 py-3 flex items-center justify-between border-b border-red-500/20">
                          <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                            <AlertTriangle className="w-3 h-3" /> INCIDENT: {c.incident}
                          </div>
                          <div className="text-[10px] font-mono uppercase text-red-500/70">Severity: {c.severity}</div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                          <div>
                            <div className="text-[var(--foreground)]/40 font-mono text-[10px] uppercase mb-1">Root Cause</div>
                            <div className="text-[var(--foreground)]/80">{c.rootCause}</div>
                          </div>
                          <div>
                            <div className="text-[var(--foreground)]/40 font-mono text-[10px] uppercase mb-1">Resolution</div>
                            <div className="text-[var(--foreground)]/80">{c.resolution}</div>
                          </div>
                          <div>
                            <div className="text-[var(--cyan)] font-mono text-[10px] uppercase mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Outcome</div>
                            <div className="text-[var(--foreground)]">{c.outcome}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 8. Tools Used */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 08 / Infrastructure
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {mission.tools.map((t, i) => (
                      <div key={i}>
                        <div className="font-mono text-[10px] uppercase text-[var(--foreground)]/40 mb-3">{t.category}</div>
                        <ul className="space-y-2">
                          {t.list.map(tool => (
                            <li key={tool} className="text-sm text-[var(--foreground)]/90 flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-[var(--electric)]" /> {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 9. Results */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 09 / Impact
                  </h3>
                  <div className="glass p-8 rounded-2xl">
                    <ul className="space-y-4">
                      {mission.results.map((r, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                          </div>
                          <p className="text-[var(--foreground)]/90">{r}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* 10. Lessons */}
                <section>
                  <h3 className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/10" /> 10 / Debrief
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mission.lessons.map((l, i) => (
                      <div key={i} className="p-4 border-l-2 border-white/20 bg-white/5 text-sm text-[var(--foreground)]/70 font-mono italic">
                        "{l}"
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
