import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Ch07_Research() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        <div className="w-full lg:w-1/3">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
            07 / Research Lab Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
            The bleeding edge.
          </h2>
          <p className="text-[var(--muted-foreground)] font-light leading-relaxed mb-12">
            Production engineering is about stability, but innovation requires experimentation. This is where I test theoretical models before they hit production.
          </p>
          <Link to="/lab" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-medium hover:bg-[var(--foreground)]/90 transition-colors rounded-full text-sm">
            Enter Research Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Notebook Block 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-[var(--border)] bg-[var(--surface)] rounded-sm hover:border-[var(--accent)] transition-colors cursor-crosshair group flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)]">Latest Experiment</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              </div>
              <h3 className="text-xl font-medium text-[var(--foreground)] mb-4 group-hover:text-[var(--accent)] transition-colors">
                WASM-compiled RAG execution
              </h3>
              <p className="text-sm font-light text-[var(--muted-foreground)] leading-relaxed">
                Testing the latency implications of running vector similarity search directly in the browser using WebAssembly and Rust.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[var(--border)] uppercase mt-8">Exp. ID // 4099</div>
          </motion.div>

          {/* Notebook Block 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 border border-[var(--border)] bg-[var(--surface)] rounded-sm hover:border-[var(--foreground)] transition-colors cursor-crosshair group flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)]">Current Reading</span>
              </div>
              <h3 className="text-xl font-medium text-[var(--foreground)] mb-4 group-hover:text-[var(--foreground)] transition-colors">
                "Attention is Not All You Need"
              </h3>
              <p className="text-sm font-light text-[var(--muted-foreground)] leading-relaxed">
                Analyzing the recent paper on the necessity of deterministic verification layers on top of transformer models for enterprise security.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[var(--border)] uppercase mt-8">Reading // Vol. 42</div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
