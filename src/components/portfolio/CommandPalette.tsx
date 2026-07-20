import { AnimatePresence, motion } from "framer-motion";
import { Command, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Item = { label: string; hint: string; action: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const items: Item[] = useMemo(() => {
    const go = (id: string) => () => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return [
      { label: "Go to Projects", hint: "section", action: go("projects") },
      { label: "Go to Journey", hint: "section", action: go("journey") },
      { label: "Go to Stack", hint: "section", action: go("stack") },
      { label: "Open AI Terminal", hint: "section", action: go("contact") },
      { label: "Email me", hint: "action", action: () => { window.location.href = "mailto:hello@example.com"; } },
      { label: "Open GitHub", hint: "external", action: () => window.open("https://github.com", "_blank") },
      { label: "Open LinkedIn", hint: "external", action: () => window.open("https://linkedin.com", "_blank") },
    ];
  }, []);

  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl glass glow-ring"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, sections, actions…"
                className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <span className="hidden items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline-flex">
                <Command className="h-3 w-3" /> K
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">No results</div>
              )}
              {filtered.map((it) => (
                <button
                  key={it.label}
                  onClick={it.action}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-foreground/90 transition hover:bg-white/5"
                >
                  <span>{it.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{it.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
