import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NODES = [
  { id: "api", name: "API Gateway", x: 20, y: 50, desc: "FastAPI serving as the main entry point with strict Pydantic validation." },
  { id: "queue", name: "Message Broker", x: 50, y: 20, desc: "Redis / Kafka for decoupled async event processing." },
  { id: "worker", name: "Agent Swarm", x: 80, y: 50, desc: "LangGraph-powered workers executing complex multi-step reasoning." },
  { id: "db", name: "Vector DB", x: 50, y: 80, desc: "Qdrant cluster containing highly-dimensional semantic enterprise data." },
];

export function ChapterArchitecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center">
        
        {/* Left: Interactive Diagram */}
        <div className="w-full md:w-1/2 aspect-square relative border border-[var(--border)] rounded-sm overflow-hidden bg-[var(--background)]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Grid */}
            <pattern id="smallGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="var(--border)" strokeWidth="0.2" />
            </pattern>
            <rect width="100" height="100" fill="url(#smallGrid)" />

            {/* Connecting Lines */}
            <path d="M 20 50 L 50 20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />
            <path d="M 20 50 L 50 80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />
            <path d="M 50 20 L 80 50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />
            <path d="M 50 80 L 80 50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1 1" />

            {/* Nodes */}
            {NODES.map((node) => (
              <g 
                key={node.id} 
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r="3" 
                  fill={activeNode === node.id ? "var(--accent)" : "var(--background)"} 
                  stroke={activeNode === node.id ? "var(--accent)" : "var(--foreground)"} 
                  strokeWidth="0.5" 
                />
                <text 
                  x={node.x} 
                  y={node.y + 8} 
                  textAnchor="middle" 
                  fontSize="3" 
                  fill={activeNode === node.id ? "var(--foreground)" : "var(--muted-foreground)"}
                  className="font-mono tracking-widest uppercase"
                >
                  {node.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right: Text context */}
        <div className="w-full md:w-1/2 flex flex-col items-start min-h-[300px]">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
            05 / Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
            The standard blueprint.
          </h2>
          
          <div className="relative w-full h-[120px]">
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
                  [ Hover over nodes to inspect system flow ]
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
