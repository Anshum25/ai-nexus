import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const STATEMENTS = [
  {
    title: "Simple scales.",
    desc: "Complexity is a debt you pay every time you deploy. A simple architecture outlasts a clever one.",
  },
  {
    title: "Automation beats repetition.",
    desc: "If you have to do it twice, script it. If you have to do it three times, architect a system for it.",
  },
  {
    title: "Architecture first.",
    desc: "Code is temporary. Data structures and communication protocols dictate the lifespan of a product.",
  },
];

export function Ch10_Philosophy() {
  return (
    <section className="w-full bg-[var(--foreground)] text-[var(--background)] py-40 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--background)]/60 mb-24 block">
          10 / Engineering Philosophy
        </span>

        <div className="flex flex-col gap-40 mb-32">
          {STATEMENTS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex flex-col md:flex-row gap-8 md:gap-24 md:items-center"
            >
              <h2 className="text-4xl md:text-[80px] font-medium leading-[1] tracking-tight w-full md:w-1/2">
                {item.title}
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--background)]/80 w-full md:w-1/2 mt-4 md:mt-0">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <Link to="/decision-room" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--background)] border-b border-[var(--background)]/30 hover:border-[var(--background)] pb-1 transition-colors">
          Read Philosophy <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
