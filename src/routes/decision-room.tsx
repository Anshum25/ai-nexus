import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DecisionCard, ArchitectureWhiteboard, DecisionData } from '../components/portfolio/decision-room/DecisionRoomComponents';

export const Route = createFileRoute('/decision-room')({
  component: DecisionRoom,
});

function DecisionRoom() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const decisions: DecisionData[] = [
    {
      id: "backend",
      title: "Backend Framework",
      problem: "Need a high-performance API capable of handling heavy ML inference workloads and asynchronous database operations without blocking the event loop.",
      options: ["Flask", "Django", "FastAPI"],
      chosen: "FastAPI",
      comparison: [
        { feature: "Performance", Flask: "Medium", Django: "Medium", FastAPI: "Extremely High" },
        { feature: "Learning Curve", Flask: "Low", Django: "High", FastAPI: "Low" },
        { feature: "Async Support", Flask: "Limited", Django: "Partial", FastAPI: "Native" },
        { feature: "Documentation", Flask: "Manual", Django: "Manual", FastAPI: "Auto OpenAPI" },
      ],
      tradeoffs: {
        pros: ["Native async support prevents ML blocking", "Pydantic typing ensures data integrity", "Automatic OpenAPI generation saves hours"],
        cons: ["Smaller ecosystem than Django", "Fewer out-of-the-box batteries (e.g., ORM, Admin)"],
        mitigation: "Built custom utilities and integrated SQLAlchemy explicitly to handle database interactions."
      },
      reasoning: "The requirement for native asynchronous handling of heavy LLM requests made FastAPI the undeniable choice. The lack of built-in ORM was actually beneficial, allowing us to implement a highly customized repository pattern.",
      lessons: "If I started today, I would still choose FastAPI, but I would structure the Pydantic models more strictly from day one to separate DB schemas from API schemas."
    },
    {
      id: "vectordb",
      title: "Vector Database",
      problem: "Require semantic retrieval across millions of documents with strict multi-tenant access control. Cannot leak documents across tenants.",
      options: ["Chroma", "Pinecone", "Qdrant", "Weaviate"],
      chosen: "Qdrant",
      comparison: [
        { feature: "Metadata Filtering", Chroma: "Basic", Pinecone: "Good", Qdrant: "Advanced Payload", Weaviate: "Good" },
        { feature: "Deployment", Chroma: "Local/Memory", Pinecone: "Cloud Only", Qdrant: "Rust Binary/Docker", Weaviate: "Go/Docker" },
        { feature: "Performance", Chroma: "Slow at scale", Pinecone: "Fast", Qdrant: "Extremely Fast", Weaviate: "Fast" },
      ],
      tradeoffs: {
        pros: ["Native Rust performance", "Advanced payload filtering prevents data leakage", "Can be deployed locally in Docker for testing"],
        cons: ["Steeper learning curve for payload indexing", "Less community hype than Pinecone"],
        mitigation: "Invested time in writing a robust Python wrapper around the Qdrant client to standardize payload filtering across all services."
      },
      reasoning: "Qdrant's ability to execute complex metadata filtering *before* the HNSW graph search ensures that tenants absolutely cannot retrieve each other's documents, solving our primary security constraint.",
      lessons: "If I started today, I would implement Qdrant's native tenant isolation features earlier rather than relying on manual payload filters initially."
    },
    {
      id: "auth",
      title: "Authentication Strategy",
      problem: "Need stateless authentication that can be verified at the edge across multiple independent microservices without hitting a central database.",
      options: ["Sessions", "JWT", "OAuth"],
      chosen: "JWT",
      comparison: [
        { feature: "State", Sessions: "Stateful (DB/Redis)", JWT: "Stateless", OAuth: "Delegated" },
        { feature: "Edge Verification", Sessions: "Requires DB call", JWT: "Cryptographic check", OAuth: "Requires Provider" },
        { feature: "Revocation", Sessions: "Easy", JWT: "Difficult", OAuth: "Provider dependent" },
      ],
      tradeoffs: {
        pros: ["Completely stateless, saving database round-trips", "Can be verified instantly by any microservice", "Easily passes tenant context in payload"],
        cons: ["Cannot easily revoke a token before expiration", "Increases payload size slightly"],
        mitigation: "Implemented a hybrid approach: Short-lived access tokens (15m) with refresh tokens stored securely in HttpOnly cookies and tracked in Redis."
      },
      reasoning: "The microservice architecture demanded that services could independently verify identities. JWTs provided the cryptographic guarantee needed without coupling every service to a central auth database.",
      lessons: "If I started today, I would use Asymmetric JWTs (RS256) from the beginning so services only need the public key, rather than sharing a symmetric secret."
    },
    {
      id: "frontend",
      title: "Frontend Architecture",
      problem: "Need a highly interactive, SEO-friendly dashboard that can handle complex state while maintaining excellent initial load performance.",
      options: ["React SPA", "Next.js", "Nuxt"],
      chosen: "Next.js",
      comparison: [
        { feature: "SEO", "React SPA": "Poor", "Next.js": "Excellent (SSR)", "Nuxt": "Excellent (SSR)" },
        { feature: "Routing", "React SPA": "Client-side", "Next.js": "App Router (Server)", "Nuxt": "File-based" },
        { feature: "Ecosystem", "React SPA": "Massive", "Next.js": "Massive (React)", "Nuxt": "Large (Vue)" },
      ],
      tradeoffs: {
        pros: ["Server Components reduce client bundle size", "Excellent SEO out of the box", "Unified API routes simplify BFF pattern"],
        cons: ["App router has a steep learning curve", "Caching behavior can be overly aggressive and confusing"],
        mitigation: "Carefully segregated Client Components to the leaves of the render tree and implemented strict cache invalidation tags."
      },
      reasoning: "The combination of Server Components for fast initial loads and the massive React ecosystem for complex interactive dashboard widgets made Next.js the most pragmatic choice for a long-term enterprise project.",
      lessons: "If I started today, I would spend more time explicitly mapping out the caching strategy before writing feature code, as Next.js aggressive caching caused initial deployment headaches."
    },
    {
      id: "deployment",
      title: "Deployment Infrastructure",
      problem: "Need to deploy a multi-service architecture (Frontend, Python API, Vector DB, Redis) with predictable scaling and minimal vendor lock-in.",
      options: ["VMs", "Docker Swarm", "Kubernetes", "Serverless"],
      chosen: "Docker",
      comparison: [
        { feature: "Complexity", VMs: "High (Config Drift)", "Docker Swarm": "Low", Kubernetes: "Extremely High", Serverless: "Low" },
        { feature: "Vendor Lock-in", VMs: "None", "Docker Swarm": "None", Kubernetes: "None", Serverless: "High (AWS/Vercel)" },
        { feature: "Stateful Support", VMs: "Yes", "Docker Swarm": "Yes", Kubernetes: "Yes", Serverless: "No (Hard)" },
      ],
      tradeoffs: {
        pros: ["Predictable environments across Dev and Prod", "Zero vendor lock-in", "Can easily host stateful services (Qdrant, Redis)"],
        cons: ["Requires manual orchestration compared to Serverless", "Scaling requires infrastructure management"],
        mitigation: "Utilized robust Docker Compose setups for single-node deployments, paving the way for a seamless transition to managed Kubernetes when scale demands."
      },
      reasoning: "The requirement to run a stateful Vector DB (Qdrant) and long-running ML inference tasks immediately disqualified standard Serverless. Kubernetes was deemed overkill for the current team size, making containerized Docker deployments the perfect middle ground.",
      lessons: "If I started today, I would containerize every script and cron job instantly, rather than letting them live as local scripts during early development."
    }
  ];

  return (
    <div className="pt-24 pb-32 bg-[var(--background)] min-h-screen text-[var(--foreground)] relative">
      {/* Blueprint Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        
        {/* Header */}
        <header className="mb-20 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-4"
          >
            Architecture Review
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-mono uppercase"
          >
            Decision Room
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--foreground)]/50 font-serif italic mb-8"
          >
            Every architecture is a collection of engineering decisions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white/[0.02] border border-white/10 rounded-xl"
          >
            <p className="text-[var(--foreground)]/80 font-mono text-sm leading-relaxed">
              "Great software isn't built by choosing the newest technology. It is built by making the right tradeoffs."
            </p>
          </motion.div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Decision Cards */}
          <div className="lg:col-span-7 xl:col-span-8">
            {decisions.map((decision) => (
              <DecisionCard 
                key={decision.id}
                data={decision}
                isExpanded={expandedId === decision.id}
                onToggle={() => setExpandedId(expandedId === decision.id ? null : decision.id)}
              />
            ))}
          </div>

          {/* Right: Architecture Whiteboard */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-32">
            <ArchitectureWhiteboard />
          </div>

        </div>

      </div>
    </div>
  );
}
