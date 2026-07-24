import { motion } from "framer-motion";

export function ChapterPhilosophy() {
  return (
    <section className="w-full bg-[var(--foreground)] text-[var(--background)] py-40 px-6 lg:px-12">
      
      <div className="max-w-7xl mx-auto mb-20">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--background)]/60">
          04 / Philosophy
        </span>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-32">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-[80px] font-medium leading-[1.05] tracking-tight text-balance">
            Code is a liability. <br/> Systems are assets.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start text-left"
        >
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-[var(--background)]/80">
            Every line of code you write is a line you have to maintain, debug, and eventually replace. I prefer writing less code by designing better architectures.
          </p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-[var(--background)]/80">
            A brilliant algorithm wrapped in a fragile pipeline is useless. Reliability is the ultimate feature of any engineering product.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
