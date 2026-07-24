import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert, Fingerprint, Lock, Database, Code2, Network, Terminal, Activity, Zap } from 'lucide-react';
import { DiscoverabilityDrawer } from '../components/portfolio/DiscoverabilityDrawer';

export const Route = createFileRoute('/research-vault')({
  component: ResearchVaultComponent,
});

function ResearchVaultComponent() {
  return (
    <div className="pt-24 pb-32 bg-[var(--background)] min-h-screen font-mono text-green-500/80 selection:bg-green-500/30">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(0,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <header className="mb-16 border-b-2 border-green-900 pb-8 relative">
          <div className="absolute top-0 right-0 border-2 border-red-900 text-red-700 px-4 py-1 text-2xl font-bold uppercase tracking-widest transform rotate-12 opacity-80 pointer-events-none">
            CLASSIFIED
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <ShieldAlert className="w-12 h-12 text-red-800" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--foreground)] uppercase">Research Vault</h1>
          </div>
          <div className="flex gap-6 text-sm opacity-60">
            <span>CLEARANCE: LEVEL 4</span>
            <span>AUTH: NEXUS_ENG_09</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </header>

        {/* Dossier Item 1 */}
        <div className="mb-20">
          <div className="bg-green-950/20 border border-green-900 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20"><Fingerprint className="w-24 h-24" /></div>
            
            <div className="text-xs tracking-widest mb-6 opacity-50 uppercase border-b border-green-900/50 pb-2">
              Document ID: 0x9A4B // Subject: Multi-Tenant Vector Isolation
            </div>
            
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 uppercase">I. The Isolation Problem</h2>
            
            <div className="space-y-4 text-sm leading-relaxed mb-8">
              <p>
                Initial research into deploying RAG pipelines for enterprise clients revealed a critical vulnerability: 
                <span className="bg-black text-transparent hover:text-green-500 hover:bg-transparent transition-all px-1 cursor-help ml-1">data leakage across tenant boundaries within the vector index.</span>
              </p>
              <p>
                Standard vector databases (e.g., Pinecone, Chroma) rely heavily on ANN (Approximate Nearest Neighbor) search. If metadata filtering is applied <span className="underline decoration-red-500/50">post-search</span>, the top-K results might belong to a different tenant, resulting in zero valid hits being returned to the LLM context window.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 uppercase mt-12">II. Qdrant Payload Filtering</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-sm leading-relaxed mb-4">
                  The solution was found in Qdrant's exact-match payload filtering. By enforcing the filter *during* the graph traversal, we guarantee that all returned K-vectors strictly belong to `tenant_id`.
                </p>
                <div className="border-l-4 border-red-900 pl-4 py-2 mt-4 text-xs opacity-70">
                  <Lock className="w-4 h-4 mb-2 inline-block" />
                  "Security by architecture, not by convention. If the database engine doesn't support pre-filtering, it cannot be used for multi-tenant RAG."
                </div>
              </div>
              <div className="bg-black/50 border border-green-900/50 p-4 font-mono text-xs overflow-x-auto text-green-400">
                <pre>{`Filter(
    must=[
        FieldCondition(
            key="tenant_id",
            match=MatchValue(value="org_123")
        )
    ]
)`}</pre>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-green-900/50 flex justify-between items-center">
              <span className="text-xs opacity-50">STATUS: DEPLOYED TO PRODUCTION</span>
            </div>
          </div>
        </div>

        {/* Dossier Item 2 */}
        <div className="mb-20">
          <div className="bg-green-950/20 border border-green-900 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20"><Activity className="w-24 h-24" /></div>
            
            <div className="text-xs tracking-widest mb-6 opacity-50 uppercase border-b border-green-900/50 pb-2 flex justify-between">
              <span>Document ID: 0x7F22 // Subject: WebAssembly (Wasm) Frontend Performance</span>
              <span className="text-red-500 font-bold">REDACTED</span>
            </div>
            
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 uppercase">I. The Hypothesis</h2>
            
            <div className="space-y-4 text-sm leading-relaxed mb-8">
              <p>
                Can we entirely bypass Javascript and write a high-performance web dashboard entirely in Go compiled to WebAssembly? The hypothesis was that avoiding JS garbage collection and leveraging Go's strict typing would result in a faster, more secure execution environment.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 uppercase mt-12">II. The Reality</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-sm leading-relaxed mb-4">
                  While compute-heavy tasks (like data parsing) were indeed faster in Wasm, the <span className="bg-black text-transparent hover:text-green-500 hover:bg-transparent transition-all px-1 cursor-help ml-1">DOM manipulation overhead was disastrous.</span> Every time Go needed to update the UI, it had to cross the Wasm-to-JS bridge, incurring massive serialization costs.
                </p>
                <p className="text-sm leading-relaxed mb-4 text-red-400/80">
                  Conclusion: Wasm is not a Javascript replacement for UI rendering. It is a coprocessor for heavy lifting.
                </p>
              </div>
              <div className="bg-black/50 border border-green-900/50 p-4 font-mono text-xs overflow-x-auto text-green-400">
                <pre>{`// Inefficient DOM bridge in Go Wasm
func updateUI(val string) {
    // This call is extremely expensive!
    js.Global().Get("document").
       Call("getElementById", "app").
       Set("innerHTML", val)
}`}</pre>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-green-900/50 flex justify-between items-center">
              <span className="text-xs opacity-50">STATUS: ARCHIVED (FAILED EXPERIMENT)</span>
            </div>
          </div>
        </div>

        <DiscoverabilityDrawer 
          recommendations={[
            { title: "Prompt Laboratory", desc: "Interact with the live RAG pipeline discussed in Dossier 0x9A4B.", route: "/prompt-lab", icon: Terminal },
            { title: "Architecture Atlas", desc: "View the Multi-Tenant RAG Pipeline topology.", route: "/architecture-atlas", icon: Network },
            { title: "Innovation Lab", desc: "View the archived Wasm dashboard source code.", route: "/innovation-lab", icon: Zap }
          ]} 
        />

      </div>
    </div>
  );
}
