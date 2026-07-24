import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const NODES = [
  { id: "db", name: "Database", desc: "Qdrant Vector Store + PostgreSQL for transactional persistence." },
  { id: "api", name: "API Gateway", desc: "FastAPI with strict Pydantic models handling ingress traffic." },
  { id: "ai", name: "AI Layer", desc: "LangChain-orchestrated agents running on custom Llama 3 weights." },
  { id: "deploy", name: "Deployment", desc: "Kubernetes cluster managed via Terraform on AWS." },
];

export function Ch05_Architecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center">
        
        {/* Left: Interactive Diagram */}
        <div className="w-full md:w-1/2 aspect-square relative border border-[var(--border)] rounded-sm overflow-hidden bg-[var(--surface)]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Grid */}
            <pattern id="smallGrid2" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="var(--border)" strokeWidth="0.2" />
            </pattern>
            <rect width="100" height="100" fill="url(#smallGrid2)" />

            {/* Connecting Lines */}
            <path d="M 20 20 L 50 50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />
            <path d="M 80 20 L 50 50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />
            <path d="M 50 50 L 50 80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />

            {/* Render Nodes mapped from state */}
            {[
              { id: "db", x: 20, y: 20 },
              { id: "api", x: 80, y: 20 },
              { id: "ai", x: 50, y: 50 },
              { id: "deploy", x: 50, y: 80 },
            ].map((pos) => {
              const node = NODES.find(n => n.id === pos.id)!;
              return (
                <g 
                  key={node.id} 
                  className="cursor-crosshair transition-all duration-300"
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r="3" 
                    fill={activeNode === node.id ? "var(--accent)" : "var(--background)"} 
                    stroke={activeNode === node.id ? "var(--accent)" : "var(--foreground)"} 
                    strokeWidth="0.5" 
                  />
                  <text 
                    x={pos.x} 
                    y={pos.y + 8} 
                    textAnchor="middle" 
                    fontSize="3" 
                    fill={activeNode === node.id ? "var(--foreground)" : "var(--muted-foreground)"}
                    className="font-mono tracking-widest uppercase"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Text context */}
        <div className="w-full md:w-1/2 flex flex-col items-start min-h-[300px]">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
            05 / Architecture Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
            System mapping.
          </h2>
          
          <div className="relative w-full h-[120px] mb-12">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-0"
                >
                  <h3 className="text-2xl font-medium text-[var(--foreground)] mb-2">
                    {NODES.find(n => n.id === activeNode)?.name}
                  </h3>
                  <p className="text-[var(--muted-foreground)] font-light leading-relaxed">
                    {NODES.find(n => n.id === activeNode)?.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center text-[var(--muted-foreground)] font-mono text-sm"
                >
                  [ Hover over nodes to inspect flow ]
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] editorial-link pb-1">
            View Architecture Atlas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
