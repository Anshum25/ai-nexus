import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Ch04_Project() {
  return (
    <section className="w-full bg-[var(--background)] py-40">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-8">
          04 / Featured Project
        </span>
      </div>

      {/* Immersive Image Reveal */}
      <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group mb-16">
        <motion.div 
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-40"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-[56px] font-medium leading-[1.05] tracking-tight text-[var(--foreground)] mb-8">
            NEXUS Data Core.
          </h2>
          <Link 
            to="/archive" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] editorial-link w-fit pb-1"
          >
            Open Case Study <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-4">The Problem</h3>
            <p className="text-lg text-[var(--foreground)] font-light leading-relaxed">
              Enterprise data is fragmented across thousands of PDFs, CRM records, and SQL databases. LLMs hallucinate when forced to read unstructured dumps without strict context windows.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-4">The Result</h3>
            <p className="text-lg text-[var(--foreground)] font-light leading-relaxed">
              A highly-concurrent retrieval pipeline that parses 100k+ documents, chunks them semantically, and provides perfect-context answers in under 400ms.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
