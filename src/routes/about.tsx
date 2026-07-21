import { createFileRoute } from '@tanstack/react-router';
import { motion } from "framer-motion";
import { Terminal, Code2, GitMerge, Server, Headphones, Book, Coffee, ShieldCheck, Database } from "lucide-react";

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

const TIMELINE = [
  { year: "2024 - Present", title: "Lead AI Engineer", desc: "Architecting multi-tenant RAG systems and autonomous agents for enterprise clients." },
  { year: "2022 - 2024", title: "Senior Full Stack Engineer", desc: "Led the decoupling of a massive Frappe monolith into React/FastAPI microservices." },
  { year: "2020 - 2022", title: "Backend Developer", desc: "Built scalable data ingestion pipelines processing millions of rows daily using Python and PostgreSQL." }
];

const EVOLUTION = [
  { era: "2018", stack: "PHP, jQuery, MySQL" },
  { era: "2020", stack: "React, Node.js, MongoDB" },
  { era: "2022", stack: "TypeScript, Python, PostgreSQL" },
  { era: "2024+", stack: "FastAPI, Qdrant, LLMs, Docker" }
];

function AboutComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6 text-[var(--cyan)] font-mono text-sm uppercase tracking-widest">
            <Terminal className="w-5 h-5" />
            <span>Engineer / Architect / Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Building Systems <br/><span className="text-white/40">Not Just Software.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">
            I specialize in the intersection of enterprise architecture and generative AI. My focus is on building resilient, scalable backend systems that can safely integrate autonomous reasoning.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Engineering Philosophy */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Code2 className="w-6 h-6 text-[var(--electric)]" /> Engineering Philosophy</h2>
              <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-p:leading-relaxed">
                <p><strong>Boring tech scales.</strong> I heavily favor proven technologies (PostgreSQL, Python, React) over the latest frameworks. Complexity should only be introduced when the domain demands it.</p>
                <p><strong>Security at the core.</strong> In the age of AI, prompt engineering cannot replace hard access controls. If your vector database doesn't support payload-level filtering, you are fundamentally insecure in a multi-tenant environment.</p>
                <p><strong>Observability over guessing.</strong> If a system goes down, I shouldn't have to SSH into a box to figure out why. Logs, metrics, and traces are first-class citizens in my architecture.</p>
              </div>
            </section>

            {/* Career Timeline */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><GitMerge className="w-6 h-6 text-[var(--electric)]" /> Execution Timeline</h2>
              <div className="space-y-8 pl-4 border-l-2 border-white/10 relative">
                {TIMELINE.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute w-3 h-3 bg-[var(--electric)] rounded-full -left-[23px] top-1.5 shadow-[0_0_10px_var(--electric)]" />
                    <div className="text-sm font-mono text-[var(--cyan)] mb-1">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Homelab */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Server className="w-6 h-6 text-[var(--electric)]" /> Homelab Infrastructure</h2>
              <div className="glass p-8 rounded-3xl border border-white/10 font-mono text-sm text-white/70">
                <div className="flex items-center gap-4 mb-6 text-[var(--cyan)]">
                  <Database className="w-5 h-5" /> <span>NEXUS-NODE-01</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Hardware</span> <span className="text-white">Proxmox VE / 64GB RAM / 2TB NVMe</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Orchestration</span> <span className="text-white">K3s (Kubernetes)</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Monitoring</span> <span className="text-white">Grafana / Prometheus</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>AI</span> <span className="text-white">Local Ollama instance (Llama 3 8B)</span></li>
                  <li className="flex justify-between border-b border-white/5 pb-2"><span>Gateway</span> <span className="text-white">Traefik + Cloudflare Tunnels</span></li>
                </ul>
              </div>
            </section>

            {/* Personal Life */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Coffee className="w-6 h-6 text-[var(--electric)]" /> System Idle</h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                When I'm not compiling code or debugging memory leaks, I'm usually out hiking in the mountains, brewing dangerously strong pour-over coffee, or reading hard science fiction. I believe time completely disconnected from a screen is the ultimate debugger.
              </p>
            </section>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Tech Evolution */}
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Tech Stack Evolution</h3>
              <div className="space-y-4">
                {EVOLUTION.map((evo, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-mono text-[var(--cyan)]">{evo.era}</span>
                    <span className="font-medium text-white/90">{evo.stack}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Reading */}
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2"><Book className="w-4 h-4" /> Currently Reading</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-bold text-white">Designing Data-Intensive Applications</div>
                  <div className="text-xs text-white/50">Martin Kleppmann</div>
                </div>
                <div>
                  <div className="font-bold text-white">System Design Interview</div>
                  <div className="text-xs text-white/50">Alex Xu</div>
                </div>
              </div>
            </div>

            {/* Audio Intake */}
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2"><Headphones className="w-4 h-4" /> Audio Intake</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-bold text-white">Latent Space</div>
                  <div className="text-xs text-white/50">AI Engineering Podcast</div>
                </div>
                <div>
                  <div className="font-bold text-white">Lex Fridman Podcast</div>
                  <div className="text-xs text-white/50">Long-form tech & science</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
