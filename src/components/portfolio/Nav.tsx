import { Command } from "lucide-react";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <header className="fixed left-1/2 top-4 z-40 -translate-x-1/2">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass flex items-center gap-1 rounded-full px-2 py-1.5 text-sm"
      >
        <a href="#top" className="flex items-center justify-center rounded-full px-3 py-1 font-mono text-xs font-semibold tracking-wide">
          <motion.div layoutId="nexus-logo" className="h-5 w-5 mr-2">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M50 10 L90 80 L10 80 Z" stroke="var(--cyan)" strokeWidth="4" strokeLinejoin="round" />
              <circle cx="50" cy="55" r="15" stroke="var(--electric)" strokeWidth="4" />
              <path d="M50 40 L50 70" stroke="white" strokeWidth="4" />
            </svg>
          </motion.div>
          NEXUS
        </a>
        <div className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
        {[
          ["Work", "#projects"],
          ["Journey", "#journey"],
          ["Stack", "#stack"],
          ["Contact", "#contact"],
        ].map(([l, h]) => (
          <a key={l} href={h} className="hidden rounded-full px-3 py-1.5 text-foreground/75 transition hover:bg-white/5 hover:text-foreground sm:inline-block">
            {l}
          </a>
        ))}
        <button
          onClick={() => {
            const e = new KeyboardEvent("keydown", { key: "k", metaKey: true });
            window.dispatchEvent(e);
          }}
          className="ml-1 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition hover:text-foreground hover:bg-white/10"
          aria-label="Open command palette"
        >
          <Command className="h-3 w-3" /> K
        </button>
      </motion.nav>
    </header>
  );
}
