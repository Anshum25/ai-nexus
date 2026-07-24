import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const ARTICLES = [
  { title: "Why your RAG pipeline is failing in production.", date: "Oct 2023" },
  { title: "The illusion of the 10x Engineer.", date: "Aug 2023" },
  { title: "Transitioning from Microservices to Moduliths.", date: "Jan 2023" },
];

export function ChapterJournal() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        
        <div className="w-full md:w-1/3">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
            08 / The Journal
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
            Documenting the process.
          </h2>
          <Link to="/decision-room" className="editorial-link font-medium text-[var(--foreground)] pb-1 inline-flex items-center gap-2">
            Read all entries <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-full md:w-2/3 flex flex-col">
          {ARTICLES.map((article, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border-b border-[var(--border)] py-12 flex flex-col md:flex-row md:items-end justify-between gap-4 cursor-pointer relative"
            >
              {/* Subtle hover background sweep */}
              <div className="absolute inset-0 bg-[var(--accent)]/5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
              
              <h3 className="text-2xl md:text-4xl font-medium text-[var(--foreground)] tracking-tight leading-[1.1] max-w-2xl group-hover:text-[var(--accent)] transition-colors relative z-10">
                {article.title}
              </h3>
              <span className="font-mono text-xs text-[var(--muted-foreground)] relative z-10">
                {article.date}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
