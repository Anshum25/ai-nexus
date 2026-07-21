import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Terminal, BookOpen, LayoutDashboard, Activity, Network, ShieldCheck, Box, Zap, Briefcase, BrainCircuit, PenTool, User, Map, Award, Wrench, ShieldQuestion } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

type Item = {
  label: string;
  hint: string;
  action: () => void;
  icon?: any;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const keyBuffer = useRef<string[]>([]);
  const bufferTimeout = useRef<NodeJS.Timeout | null>(null);

  const items: Item[] = useMemo(() => {
    const go = (path: string) => () => {
      setIsOpen(false);
      navigate({ to: path });
    };
    return [
      { label: "Go to Home", hint: "page", icon: LayoutDashboard, action: go("/") },
      { label: "Go to Now Dashboard", hint: "page", icon: Activity, action: go("/now") },
      { label: "Go to Work", hint: "page", icon: Briefcase, action: go("/work") },
      { label: "Go to Engineering Hub", hint: "page", icon: BrainCircuit, action: go("/engineering") },
      { label: "Go to Technology Atlas", hint: "page", icon: Network, action: go("/atlas") },
      { label: "Go to Architecture Gallery", hint: "page", icon: Box, action: go("/architecture") },
      { label: "Go to Engineering Workflow", hint: "page", icon: Activity, action: go("/workflow") },
      { label: "Go to Playground", hint: "page", icon: Terminal, action: go("/playground") },
      { label: "Go to Experiment Lab", hint: "page", icon: Zap, action: go("/lab") },
      { label: "Go to Engineering Notebook", hint: "page", icon: PenTool, action: go("/notebook") },
      { label: "Go to Case Studies", hint: "page", icon: ShieldCheck, action: go("/case-studies") },
      { label: "Go to Writing", hint: "page", icon: PenTool, action: go("/writing") },
      { label: "Go to About", hint: "page", icon: User, action: go("/about") },
      { label: "Go to Execution Timeline", hint: "page", icon: Activity, action: go("/timeline") },
      { label: "Go to Learning Roadmap", hint: "page", icon: Map, action: go("/roadmap") },
      { label: "Go to Achievements", hint: "page", icon: Award, action: go("/achievements") },
      { label: "Go to Bookshelf", hint: "page", icon: BookOpen, action: go("/bookshelf") },
      { label: "Go to Tools I Use", hint: "page", icon: Wrench, action: go("/uses") },
      { label: "Go to FAQ", hint: "page", icon: ShieldQuestion, action: go("/faq") },
      { label: "Go to Resources", hint: "page", icon: BookOpen, action: go("/resources") },
      { label: "Download Resume", hint: "action", icon: BookOpen, action: () => window.open("/resume.pdf", "_blank") },
      { label: "Contact", hint: "page", icon: Network, action: go("/contact") },
      { label: "Enable X-Ray Mode", hint: "system", icon: Box, action: () => { document.body.classList.toggle('xray-mode'); setIsOpen(false); } },
    ];
  }, [navigate]);

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Ignore if palette is open or user is typing in an input
      if (isOpen || document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      // Single Key Action
      if (e.key.toLowerCase() === "x") {
        document.body.classList.toggle("xray-mode");
      }
      
      // Sequence Shortcuts (G + ...)
      keyBuffer.current.push(e.key.toLowerCase());
      if (keyBuffer.current.length > 2) keyBuffer.current.shift();

      const seq = keyBuffer.current.join("");
      if (seq === "gp") {
        window.scrollTo({ top: document.getElementById('project-universe')?.offsetTop || 2000, behavior: 'smooth' });
        keyBuffer.current = [];
      } else if (seq === "ga") {
        window.scrollTo({ top: document.getElementById('architecture-lab')?.offsetTop || 4000, behavior: 'smooth' });
        keyBuffer.current = [];
      } else if (seq === "gm") {
        window.scrollTo({ top: 1000, behavior: 'smooth' });
        keyBuffer.current = [];
      } else if (seq === "gc") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        keyBuffer.current = [];
      }

      // Clear buffer after 1 second of inactivity
      if (bufferTimeout.current) clearTimeout(bufferTimeout.current);
      bufferTimeout.current = setTimeout(() => { keyBuffer.current = []; }, 1000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (bufferTimeout.current) clearTimeout(bufferTimeout.current);
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filtered[selectedIndex]) {
            filtered[selectedIndex].action();
          }
        } else if (e.key === "Escape") {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, filtered, selectedIndex]);

  useEffect(() => {
    if (listRef.current && isOpen) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[300] flex items-start justify-center bg-black/40 px-4 pt-[20vh] backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-5 w-5 text-[var(--electric)]" />
              <input
                autoFocus 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, navigate OS..."
                className="flex-1 bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground text-white"
              />
            </div>
            
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
              {filtered.length === 0 && (
                <div className="px-3 py-12 text-center text-sm font-mono text-white/40">Command not found.</div>
              )}
              {filtered.map((it, idx) => (
                <button
                  key={it.label}
                  onClick={it.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 ${
                    selectedIndex === idx 
                      ? 'bg-[var(--electric)]/10 text-white shadow-[inset_0_0_20px_rgba(0,180,255,0.1)] border border-[var(--electric)]/20' 
                      : 'text-white/70 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {it.icon && <it.icon className={`h-4 w-4 ${selectedIndex === idx ? 'text-[var(--electric)]' : 'text-zinc-500'}`} />}
                    <span className={`transition-transform duration-300 ${selectedIndex === idx ? 'translate-x-1' : 'translate-x-0'}`}>{it.label}</span>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${selectedIndex === idx ? 'text-[var(--electric)]' : 'text-white/30'}`}>
                    {it.hint}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
