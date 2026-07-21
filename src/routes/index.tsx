import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { TechOrbit } from "@/components/portfolio/TechOrbit";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Database, Layout, ShieldCheck, Box, Server, Mail, MessageSquare, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS OS — Engineering Product" },
      {
        name: "description",
        content: "An immersive operating system demonstrating architectural thought, scalable design, and AI-native engineering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="pt-24 pb-20 w-full overflow-x-hidden">
      
      {/* 01. Hero */}
      <Hero />
      
      <div className="container mx-auto px-6 max-w-7xl space-y-40 mt-32">
        
        {/* 02. Current Work */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Current Work</h2>
              <p className="text-muted-foreground text-lg max-w-xl">Actively engineering systems across the stack. Track real-time progress on active initiatives.</p>
            </div>
            <Link to="/work" className="hidden md:flex items-center gap-2 text-sm font-mono text-[var(--electric)] hover:text-white transition-colors">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Enterprise AI Gateway", status: "Production", progress: 100, color: "bg-green-500", desc: "Routing millions of LLM tokens securely." },
              { title: "Next.js Micro-frontend", status: "In Development", progress: 65, color: "bg-yellow-500", desc: "Decoupling monolithic legacy UI." },
              { title: "Agentic RAG Engine", status: "Research", progress: 30, color: "bg-purple-500", desc: "Evaluating multi-agent reasoning paths." },
              { title: "ERPNext Cloud Sync", status: "Archived", progress: 100, color: "bg-slate-500", desc: "Legacy synchronization script." },
            ].map((work, i) => (
              <motion.div 
                key={work.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[10px] uppercase text-white/50">{work.status}</span>
                    <span className="text-xs font-mono">{work.progress}%</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{work.title}</h3>
                  <p className="text-sm text-white/60 mb-8">{work.desc}</p>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${work.color} shadow-[0_0_10px_currentColor]`} style={{ width: `${work.progress}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 03. Featured Case Study */}
        <section>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-12">Featured Engineering</h2>
          <Link to="/case-studies" className="block relative group overflow-hidden rounded-[2rem] glass border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--electric)]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 md:p-20 flex flex-col justify-center relative z-10">
                <div className="font-mono text-xs uppercase text-[var(--cyan)] tracking-widest mb-4">Case Study — 01</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Multi-Tenant AI Integration</h3>
                <p className="text-lg text-white/70 mb-8 max-w-md leading-relaxed">
                  How we bypassed standard RAG limitations to enforce strict SQL-level row permissions directly within the Vector DB payload filters.
                </p>
                <div className="flex items-center gap-2 font-mono text-sm text-[var(--electric)] group-hover:text-white transition-colors">
                  Read Full Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center p-12 relative z-10">
                <div className="w-full aspect-square max-w-sm rounded-2xl border border-white/10 bg-black/50 p-6 font-mono text-[10px] text-[var(--cyan)] shadow-2xl flex flex-col justify-center">
                   <pre className="opacity-70 group-hover:opacity-100 transition-opacity">
{`Query(
  vector=user_embedding,
  filter={
    "must": [
      {"key": "tenant", "match": "A"},
      {"key": "role", "match": "admin"}
    ]
  }
)`}
                   </pre>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 04. Engineering Highlights */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Engineering Hub</h2>
            <Link to="/engineering" className="hidden md:flex items-center gap-2 text-sm font-mono text-[var(--electric)] hover:text-white transition-colors">
              Explore Knowledge Base <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Architecture", icon: Box },
              { name: "AI Systems", icon: Cpu },
              { name: "Backend", icon: Terminal },
              { name: "ERP Solutions", icon: Database },
              { name: "Frontend", icon: Layout },
              { name: "DevOps", icon: Server },
            ].map((hub, i) => (
              <Link key={hub.name} to="/engineering" className="glass aspect-square rounded-2xl flex flex-col items-center justify-center p-4 gap-4 border border-white/5 hover:border-[var(--electric)] hover:bg-[var(--electric)]/5 transition-all group">
                <hub.icon className="w-8 h-8 text-white/40 group-hover:text-[var(--cyan)] transition-colors" />
                <span className="font-mono text-xs font-semibold text-center group-hover:text-white">{hub.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 05 & 06. Latest Engineering Notes & Featured Articles */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white">Engineering Notes</h2>
            </div>
            <div className="space-y-4">
              {[
                { date: "2026-07-21", title: "Debugging Qdrant memory spikes in production" },
                { date: "2026-07-15", title: "Why I stopped using ORMs for analytics queries" },
                { date: "2026-07-02", title: "Implementing JWT invalidation at the edge" },
                { date: "2026-06-28", title: "React 19 compiler: First impressions" }
              ].map((note, i) => (
                <Link key={i} to="/writing" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass hover:border-[var(--electric)]/50 transition-colors border border-white/5 group">
                  <span className="text-white/80 font-medium group-hover:text-white">{note.title}</span>
                  <span className="text-xs font-mono text-white/40 shrink-0">{note.date}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white">Featured Articles</h2>
            </div>
            <div className="space-y-6">
              {[
                { title: "System prompts as code: Version controlling prompt engineering", tags: ["AI", "Workflow"] },
                { title: "Optimizing Docker builds for React/Node applications", tags: ["DevOps", "Docker"] }
              ].map((article, i) => (
                <Link key={i} to="/writing" className="block p-8 rounded-2xl glass border border-white/5 hover:bg-white/5 transition-colors group">
                  <div className="flex gap-2 mb-4">
                    {article.tags.map(t => (
                      <span key={t} className="px-2 py-1 bg-[var(--electric)]/10 text-[var(--cyan)] font-mono text-[10px] rounded uppercase">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors mb-4">{article.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                    Read Publication <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 07. Technology Stack */}
        <section>
           <TechOrbit />
        </section>

        {/* 08. Testimonials */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Colleague Feedback</h2>
            <p className="text-muted-foreground text-lg">What it's like collaborating in the trenches.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass p-8 rounded-2xl border border-white/5">
                <Quote className="w-8 h-8 text-[var(--electric)] mb-6 opacity-50" />
                <p className="text-white/80 leading-relaxed mb-6 italic">
                  "An exceptional ability to bridge the gap between high-level business requirements and deep technical implementation. Delivers highly reliable architecture."
                </p>
                <div>
                  <div className="font-bold text-white">Engineering Director</div>
                  <div className="text-xs font-mono text-white/40">Enterprise Client</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 09. Contact CTA */}
        <section className="pb-32">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full bg-gradient-to-br from-[var(--electric)]/20 to-[var(--cyan)]/20 rounded-[3rem] p-12 md:p-24 text-center border border-[var(--cyan)]/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">Initialize Collaboration.</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 relative z-10">
              Ready to architect scalable systems or integrate production-ready AI into your enterprise? Let's connect.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-10">
              <Mail className="w-5 h-5" /> Open Comm Channel
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
