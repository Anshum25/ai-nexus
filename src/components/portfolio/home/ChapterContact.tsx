import { useState } from "react";
import { motion } from "framer-motion";

export function ChapterContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("anshum@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[var(--background)] py-40 px-6 lg:px-12 flex flex-col items-center justify-center min-h-[80vh]">
      
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-12 block">
          10 / Initialization
        </span>
        
        <h2 className="text-[60px] md:text-[100px] lg:text-[140px] font-medium leading-[0.9] tracking-tighter text-[var(--foreground)] mb-16 hover:text-[var(--accent)] transition-colors cursor-crosshair">
          Let's talk.
        </h2>

        <button 
          onClick={handleCopy}
          className="group flex flex-col items-center gap-4"
        >
          <span className="text-xl md:text-2xl font-serif italic text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
            anshum@example.com
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? "Address Copied" : "Click to copy"}
          </span>
        </button>

        <div className="mt-32 pt-12 w-full border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest">
          <span>© {new Date().getFullYear()} NEXUS Engineering</span>
          <div className="flex gap-8">
            <a href="https://github.com" className="hover:text-[var(--foreground)] transition-colors">Github</a>
            <a href="https://linkedin.com" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
            <a href="https://twitter.com" className="hover:text-[var(--foreground)] transition-colors">X</a>
          </div>
        </div>
      </div>

    </section>
  );
}
