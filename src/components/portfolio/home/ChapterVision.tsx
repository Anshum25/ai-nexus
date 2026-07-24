import { motion } from "framer-motion";

export function ChapterVision() {
  return (
    <section className="w-full py-40 px-6 lg:px-12 bg-gradient-to-b from-[var(--background)] to-[#030303] relative overflow-hidden">
      
      {/* Background hazy flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[var(--accent)]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8 block">
          09 / The Horizon
        </span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-[80px] font-medium tracking-tight text-[var(--foreground)] mb-12 leading-[1.05]"
        >
          Towards truly autonomous enterprise intelligence.
        </motion.h2>
        <p className="text-xl md:text-2xl text-[var(--muted-foreground)] font-light leading-relaxed max-w-2xl">
          We are moving from systems that assist humans to systems that act alongside them as peers. My next focus is on designing the deterministic guardrails that make these autonomous architectures safe for critical enterprise deployment.
        </p>
      </div>
    </section>
  );
}
