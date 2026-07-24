import { createFileRoute } from '@tanstack/react-router';
import { Network, Lock, Unlock, Database, Cpu, Globe, Server, Code2, Bot, Shield, Box } from 'lucide-react';

export const Route = createFileRoute('/roadmap')({
  component: RPGTechTreeComponent,
});

const SKILL_TREE = [
  {
    tier: 1,
    title: "Foundations",
    nodes: [
      { id: "ts", name: "TypeScript", icon: Code2, unlocked: true, desc: "Type-safe web development." },
      { id: "python", name: "Python", icon: Code2, unlocked: true, desc: "Data processing & backend." },
      { id: "sql", name: "PostgreSQL", icon: Database, unlocked: true, desc: "Relational data modeling." }
    ]
  },
  {
    tier: 2,
    title: "Systems Architecture",
    nodes: [
      { id: "docker", name: "Docker", icon: Box, unlocked: true, desc: "Containerization & deployment." },
      { id: "kafka", name: "Kafka", icon: Network, unlocked: true, desc: "Event streaming & messaging." },
      { id: "fastapi", name: "FastAPI", icon: Server, unlocked: true, desc: "High-perf async APIs." }
    ]
  },
  {
    tier: 3,
    title: "AI Integration",
    nodes: [
      { id: "vector", name: "Vector DBs", icon: Database, unlocked: true, desc: "Qdrant, Pinecone semantic search." },
      { id: "llm", name: "LLM Orch.", icon: Bot, unlocked: true, desc: "Langchain, native integrations." },
      { id: "go", name: "Go (Golang)", icon: Cpu, unlocked: true, desc: "High concurrency ingestion." }
    ]
  },
  {
    tier: 4,
    title: "Advanced Systems (Locked)",
    nodes: [
      { id: "rust", name: "Rust", icon: Shield, unlocked: false, desc: "Memory-safe systems programming." },
      { id: "k8s", name: "Kubernetes", icon: Globe, unlocked: false, desc: "Cluster orchestration at scale." },
      { id: "cuda", name: "CUDA/GPU", icon: Cpu, unlocked: false, desc: "Custom kernel optimization." }
    ]
  }
];

function RPGTechTreeComponent() {
  return (
    <div className="pt-24 pb-32 bg-[var(--background)] min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-[var(--foreground)]">Skill Tree</h1>
          <p className="text-[var(--foreground)]/40 text-sm uppercase tracking-widest font-mono">
            Dependency graph & future unlock paths
          </p>
        </header>

        <div className="flex flex-col gap-12 relative">
          
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0" />

          {SKILL_TREE.map((tier, i) => (
            <div key={tier.tier} className="relative z-10">
              
              <div className="text-center mb-8 relative">
                <span className="bg-[var(--background)] px-4 font-mono text-[var(--electric)] text-xs uppercase tracking-widest border border-[var(--electric)]/30 rounded-full py-1">
                  Tier {tier.tier} // {tier.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tier.nodes.map((node) => (
                  <div 
                    key={node.id} 
                    className={`relative p-6 rounded-2xl border transition-all duration-300 group
                      ${node.unlocked 
                        ? 'bg-black/40 border-[var(--cyan)]/30 hover:border-[var(--cyan)] shadow-[inset_0_0_20px_rgba(0,180,255,0.05)]' 
                        : 'bg-black/20 border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'}
                    `}
                  >
                    {/* Status Icon */}
                    <div className="absolute top-4 right-4">
                      {node.unlocked 
                        ? <Unlock className="w-4 h-4 text-[var(--cyan)] opacity-50" />
                        : <Lock className="w-4 h-4 text-[var(--foreground)]/30" />
                      }
                    </div>

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                      ${node.unlocked ? 'bg-[var(--cyan)]/10 text-[var(--cyan)]' : 'bg-white/5 text-[var(--foreground)]/40'}
                    `}>
                      <node.icon className="w-6 h-6" />
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${node.unlocked ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/50'}`}>
                      {node.name}
                    </h3>
                    <p className={`text-sm leading-relaxed ${node.unlocked ? 'text-[var(--foreground)]/60' : 'text-[var(--foreground)]/30'}`}>
                      {node.desc}
                    </p>

                    {/* Node Glow (Unlocked) */}
                    {node.unlocked && (
                      <div className="absolute inset-0 bg-[var(--cyan)]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
                    )}
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
