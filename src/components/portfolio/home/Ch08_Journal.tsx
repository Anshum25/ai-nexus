import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const ARTICLES = [
  { 
    title: "Why your RAG pipeline is failing in production.", 
    time: "8 min read", 
    category: "Architecture",
    preview: "Most RAG implementations treat LLMs as databases. Here is why you need to decouple retrieval from generation to achieve 99% accuracy."
  },
  { 
    title: "The illusion of the 10x Engineer.", 
    time: "5 min read", 
    category: "Philosophy",
    preview: "A 10x engineer doesn't write 10x more code. They make 10x fewer decisions that lead to technical debt."
  },
  { 
    title: "Transitioning from Microservices to Moduliths.", 
    time: "12 min read", 
    category: "Systems",
    preview: "When to stop separating your services and how to build a modular monolith that actually scales without network latency."
  },
];

export function Ch08_Journal() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block text-center">
          08 / Engineering Journal Preview
        </span>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-24 text-center">
          Documenting the process.
        </h2>

        <div className="w-full flex flex-col gap-8 mb-16">
          {ARTICLES.map((article, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border border-[var(--border)] p-8 flex flex-col gap-4 cursor-pointer relative bg-[var(--surface)] hover:bg-[var(--muted)] transition-colors rounded-sm"
            >
              <div className="flex gap-4 items-center">
                <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)] px-2 py-1 border border-[var(--border)] rounded-full">
                  {article.category}
                </span>
                <span className="font-mono text-[10px] uppercase text-[var(--muted-foreground)]">
                  {article.time}
                </span>
              </div>
              
              <h3 className="text-2xl font-medium text-[var(--foreground)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                {article.title}
              </h3>
              
              <p className="text-sm font-light text-[var(--muted-foreground)] leading-relaxed">
                {article.preview}
              </p>
            </motion.div>
          ))}
        </div>

        <Link to="/decision-room" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] editorial-link pb-1">
          Open Journal <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </section>
  );
}
