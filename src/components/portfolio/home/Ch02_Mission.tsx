import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Ch02_Mission() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left: Sticky Text */}
        <div className="w-full md:w-1/2 relative">
          <div className="sticky top-40 flex flex-col items-start">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
              02 / Currently Building
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
              The Autonomous Analyst
            </h2>
            
            <div className="flex flex-col gap-6 w-full max-w-sm mb-12">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                <span className="text-sm font-mono text-[var(--muted-foreground)] uppercase">Current Phase</span>
                <span className="text-sm font-medium text-[var(--foreground)]">Architecture</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                <span className="text-sm font-mono text-[var(--muted-foreground)] uppercase">Progress</span>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent)] w-[65%]" />
                  </div>
                  <span className="text-sm font-mono text-[var(--accent)]">65%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                <span className="text-sm font-mono text-[var(--muted-foreground)] uppercase">Stack</span>
                <span className="text-sm font-medium text-[var(--foreground)]">Python, Qdrant, React</span>
              </div>
            </div>

            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] editorial-link pb-1">
              View Mission <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Architecture Illustration */}
        <div className="w-full md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full aspect-[4/5] bg-[var(--surface)] border border-[var(--border)] rounded-sm relative overflow-hidden flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
            
            {/* Minimal SVG Architecture Representation */}
            <svg viewBox="0 0 200 250" className="w-full h-full opacity-80" preserveAspectRatio="xMidYMid meet">
               <rect x="20" y="20" width="160" height="40" rx="2" fill="none" stroke="var(--border)" strokeDasharray="2 2" />
               <text x="100" y="44" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8" className="font-mono">User Intent Parser</text>
               
               <path d="M 100 60 L 100 90" stroke="var(--accent)" strokeWidth="1" fill="none" />
               <circle cx="100" cy="75" r="2" fill="var(--accent)" className="animate-pulse" />
               
               <rect x="50" y="90" width="100" height="60" rx="2" fill="none" stroke="var(--foreground)" />
               <text x="100" y="120" textAnchor="middle" fill="var(--foreground)" fontSize="10" fontWeight="500">Reasoning Engine</text>
               
               <path d="M 100 150 L 100 180" stroke="var(--border)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
               
               <rect x="20" y="180" width="70" height="40" rx="2" fill="none" stroke="var(--border)" />
               <text x="55" y="204" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8" className="font-mono">Vector DB</text>
               
               <rect x="110" y="180" width="70" height="40" rx="2" fill="none" stroke="var(--border)" />
               <text x="145" y="204" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8" className="font-mono">Tool Exec</text>
            </svg>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
