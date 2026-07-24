import { createFileRoute } from '@tanstack/react-router';
import { motion } from "framer-motion";
import { Server, Database, BrainCircuit, Activity, Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Code2 } from "lucide-react";

export const Route = createFileRoute('/case-studies')({
  component: CaseStudiesComponent,
})

const CASE_STUDY = {
  id: "cs-01",
  title: "Enterprise Multi-Tenant AI Integration",
  role: "Lead Architecture",
  domain: "B2B SaaS",
  readingTime: "12 min read",
  difficulty: "Advanced",
  tags: ["Qdrant", "FastAPI", "PostgreSQL", "RAG", "Multi-tenancy"],
  executiveSummary: "Architected and deployed a multi-tenant Generative AI system that enforces strict row-level SQL permissions directly within Vector DB payload filters, eliminating cross-tenant data leakage while maintaining sub-second latency.",
  businessProblem: "The client needed to integrate semantic search and RAG capabilities into their existing ERP. However, their data model relied heavily on complex hierarchical permissions. Traditional post-filtering RAG was too slow and risked exposing metadata to the LLM.",
  requirements: [
    "Zero cross-tenant data leakage",
    "Sub-200ms vector retrieval",
    "Seamless integration with existing JWT auth",
    "Cost-effective embedding generation"
  ],
  architecture: (
    <div className="p-8 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs md:text-sm text-[var(--cyan)] overflow-x-auto my-8 shadow-[inset_0_0_30px_rgba(0,180,255,0.05)]">
      <pre>
{`[Client Application]
       │ (JWT: Tenant A, Role: User)
       ▼
[API Gateway (FastAPI)] ── [Auth Service]
       │
       ├─► (Filter: tenant_id='A')
       │         ▼
       │   [Qdrant Vector DB]
       │         ▲
       │         │ (Async Sync via gRPC)
       │   [Master ERP DB]
       │
       └─► (LLM Context Window)
`}
      </pre>
    </div>
  ),
  implementation: (
    <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 font-mono text-xs my-8 text-slate-300">
      <span className="text-slate-500"># Qdrant Payload Filter Enforcement</span><br/>
      <span className="text-purple-400">async def</span> <span className="text-blue-400">retrieve_secure_context</span>(query: <span className="text-yellow-400">str</span>, user_jwt: <span className="text-yellow-400">dict</span>):<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;tenant_id = user_jwt.get(<span className="text-green-400">"tenant"</span>)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;role = user_jwt.get(<span className="text-green-400">"role"</span>)<br/>
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># The LLM NEVER sees data it shouldn't</span><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;results = <span className="text-purple-400">await</span> qdrant.search(<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;collection_name=<span className="text-green-400">"enterprise_docs"</span>,<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query_vector=embed(query),<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query_filter=Filter(<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;must=[<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FieldCondition(key=<span className="text-green-400">"tenant_id"</span>, match=MatchValue(value=tenant_id)),<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FieldCondition(key=<span className="text-green-400">"access_level"</span>, match=MatchValue(value=role))<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> results
    </div>
  )
};

function CaseStudiesComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-[var(--cyan)]">{CASE_STUDY.id}</span>
            <span>/</span>
            <span>{CASE_STUDY.role}</span>
            <span>/</span>
            <span>{CASE_STUDY.domain}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {CASE_STUDY.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-[var(--foreground)]/50 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2"><Activity className="w-4 h-4" /> {CASE_STUDY.readingTime}</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> {CASE_STUDY.difficulty}</div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" /> 
              {CASE_STUDY.tags.map(t => <span key={t} className="px-2 py-0.5 bg-[var(--electric)]/20 text-[var(--cyan)] rounded">{t}</span>)}
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4">
          
          <h2>Executive Summary</h2>
          <p className="text-xl font-light text-[var(--foreground)]/90">{CASE_STUDY.executiveSummary}</p>

          <h2>Business Problem</h2>
          <div className="p-6 border-l-2 border-red-500 bg-red-500/5 rounded-r-xl">
            <p className="m-0 text-[var(--foreground)]/80">{CASE_STUDY.businessProblem}</p>
          </div>

          <h2>Requirements</h2>
          <ul className="space-y-3">
            {CASE_STUDY.requirements.map(req => (
              <li key={req} className="flex items-center gap-3 text-[var(--foreground)]/80">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> {req}
              </li>
            ))}
          </ul>

          <h2>Solution Architecture</h2>
          <p>
            We designed a completely decoupled architecture where the Vector Database (Qdrant) acts as a high-speed cache for embeddings, but never holds the source of truth for permissions. Permissions are injected dynamically via JWT claims at request time.
          </p>
          {CASE_STUDY.architecture}

          <h2>Implementation & Code</h2>
          <p>
            The critical path required ensuring that the LLM could never synthesize a response using documents outside the user's tenant. We achieved this by pushing the filtering down to the C++ core of Qdrant via payload filters.
          </p>
          {CASE_STUDY.implementation}

          <h2>Tradeoffs & Problems Faced</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="glass p-6 rounded-xl border border-orange-500/30">
              <h4 className="flex items-center gap-2 text-orange-400 font-bold mb-2"><AlertTriangle className="w-4 h-4" /> Memory Overhead</h4>
              <p className="text-sm text-[var(--foreground)]/70 m-0">Storing complex permission metadata inside the vector payload increased memory usage by 15%. We mitigated this by converting string IDs to optimized integer mappings.</p>
            </div>
            <div className="glass p-6 rounded-xl border border-blue-500/30">
              <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-2"><Server className="w-4 h-4" /> Sync Latency</h4>
              <p className="text-sm text-[var(--foreground)]/70 m-0">Keeping ERP permissions in sync with Vector metadata required an asynchronous event bus to prevent blocking the main thread during heavy writes.</p>
            </div>
          </div>

          <h2>Results & Lessons Learned</h2>
          <p>
            The system successfully processed over 10M queries in its first month with zero cross-tenant breaches. The primary lesson learned was that security in generative AI must be enforced at the retrieval layer, not the generation layer. Prompt engineering is not a substitute for hard access controls.
          </p>

        </article>

      </div>
    </div>
  )
}
