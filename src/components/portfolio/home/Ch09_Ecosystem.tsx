import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const STACK = [
  { id: "python", name: "Python", x: 20, y: 30 },
  { id: "fastapi", name: "FastAPI", x: 30, y: 60 },
  { id: "docker", name: "Docker", x: 45, y: 25 },
  { id: "qdrant", name: "Qdrant", x: 55, y: 70 },
  { id: "redis", name: "Redis", x: 70, y: 35 },
  { id: "postgres", name: "PostgreSQL", x: 85, y: 60 },
  { id: "react", name: "React", x: 60, y: 50 },
  { id: "llms", name: "LLMs", x: 35, y: 45 },
];

export function Ch09_Ecosystem() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-8 block text-center">
          09 / Technology Ecosystem
        </span>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-24 text-center">
          The nervous system.
        </h2>

        {/* Visual Ecosystem */}
        <div className="w-full max-w-5xl h-[400px] md:h-[500px] relative border border-[var(--border)] rounded-sm bg-[var(--surface)] overflow-hidden mb-16">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Background Lines connecting everything */}
            <path d="M 20 30 L 30 60 L 60 50 L 85 60" stroke="var(--border)" strokeWidth="0.2" fill="none" />
            <path d="M 20 30 L 45 25 L 70 35 L 85 60" stroke="var(--border)" strokeWidth="0.2" fill="none" />
            <path d="M 35 45 L 30 60 L 55 70" stroke="var(--border)" strokeWidth="0.2" fill="none" />
            <path d="M 35 45 L 70 35" stroke="var(--border)" strokeWidth="0.2" fill="none" />
            <path d="M 45 25 L 60 50" stroke="var(--border)" strokeWidth="0.2" fill="none" />
          </svg>
          
          {STACK.map((tech) => (
            <motion.div
              key={tech.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair group"
              style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
              onMouseEnter={() => setHovered(tech.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`w-3 h-3 rounded-full border border-[var(--border)] bg-[var(--background)] transition-colors ${hovered === tech.id ? 'bg-[var(--accent)] border-[var(--accent)] shadow-[0_0_15px_rgba(16,185,129,0.5)]' : ''}`} />
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors ${hovered === tech.id ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
                {tech.name}
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-medium hover:bg-[var(--foreground)]/90 transition-colors rounded-full text-sm">
          Explore Stack <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </section>
  );
}
