import { Command } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed left-1/2 top-4 z-40 -translate-x-1/2">
      <nav className="glass flex items-center gap-1 rounded-full px-2 py-1.5 text-sm">
        <a href="#top" className="flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wide">
          <span className="h-2 w-2 rounded-full bg-[var(--electric)] shadow-[0_0_10px_var(--electric)]" />
          portfolio.os
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
          className="ml-1 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition hover:text-foreground"
          aria-label="Open command palette"
        >
          <Command className="h-3 w-3" /> K
        </button>
      </nav>
    </header>
  );
}
