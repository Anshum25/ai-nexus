import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function Ch12_Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("anshum25506@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-transparent py-40 px-6 lg:px-12 flex flex-col items-center justify-center min-h-[80vh] border-t border-[var(--border)] relative z-10">
      
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-12 block">
          12 / Initialization
        </span>
        
        <h2 className="text-[60px] md:text-[100px] lg:text-[140px] font-medium leading-[0.9] tracking-tighter text-[var(--foreground)] mb-16 hover:text-[var(--accent)] transition-colors cursor-crosshair">
          Let's talk.
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <button 
            onClick={handleCopy}
            className="group flex flex-col items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-serif italic text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
              anshum25506@gmail.com
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? "Address Copied" : "Click to copy"}
            </span>
          </button>
          
          <a href="/Anshum_Dev.pdf" target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-serif italic text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            View Resume
          </a>
        </div>

        <div className="mt-32 pt-12 w-full border-t border-[var(--border)] flex flex-col gap-12 items-center text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="font-serif italic text-2xl md:text-4xl text-[var(--foreground)]/40"
          >
            "There is so much left to build."
          </motion.div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              SYSTEM ONLINE
            </div>
            <span>© {new Date().getFullYear()} NEXUS Engineering</span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="https://github.com/anshum25" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">Github</a>
              <a href="https://www.linkedin.com/in/anshum-dev-11115a288/" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
              <a href="https://x.com/TheAnshumDev" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">X (Twitter)</a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
