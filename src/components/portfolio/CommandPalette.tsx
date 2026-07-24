import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, FileText, Activity, Database, Network, BookOpen, ShieldAlert, Zap, Map, MapPin, User, Briefcase, Award, PenTool, Wrench, ShieldQuestion, LayoutDashboard, Box, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

// The massive map of all OS applications for the search palette
const ACTIONS = [
  { id: 'h', title: 'Home', icon: LayoutDashboard, route: '/' },
  { id: 'b', title: 'Engineer Blueprint', icon: FileText, route: '/blueprint' },
  { id: 'nw', title: 'Current Mission (Now)', icon: Activity, route: '/now' },
  { id: 'mh', title: 'Mission History', icon: Map, route: '/mission-history' },
  { id: 'mc', title: 'Mission Control', icon: MapPin, route: '/mission-control' },
  { id: 'ar', title: 'Engineering Archive', icon: Database, route: '/archive' },
  { id: 'aa', title: 'Architecture Atlas', icon: Network, route: '/architecture-atlas' },
  { id: 'fm', title: 'Failure Museum', icon: ShieldAlert, route: '/failure-museum' },
  { id: 'dr', title: 'Decision Room', icon: BookOpen, route: '/decision-room' },
  { id: 'sd', title: 'System Design Gallery', icon: Network, route: '/system-design' },
  { id: 'rv', title: 'Research Vault', icon: ShieldAlert, route: '/research-vault' },
  { id: 'il', title: 'Innovation Lab', icon: Zap, route: '/innovation-lab' },
  { id: 'xc', title: 'Experiment Canvas', icon: Activity, route: '/lab' },
  { id: 'pl', title: 'Prompt Laboratory', icon: Terminal, route: '/prompt-lab' },
  { id: 'in', title: 'Idea Incubator', icon: Zap, route: '/incubator' },
  { id: 'ta', title: 'Tech Atlas', icon: Database, route: '/atlas' },
  { id: 'ds', title: 'Docker Studio', icon: Database, route: '/docker-studio' },
  { id: 'dc', title: 'Deployment Center', icon: Activity, route: '/deployment-center' },
  { id: 'ae', title: 'API Explorer', icon: Network, route: '/api-explorer' },
  { id: 'de', title: 'Database Explorer', icon: Database, route: '/db-explorer' },
  { id: 'ej', title: 'Engineering Journal', icon: FileText, route: '/journal' },
  { id: 'en', title: 'Engineering Notebook', icon: FileText, route: '/notebook' },
  { id: 'bs', title: 'Bookshelf', icon: BookOpen, route: '/bookshelf' },
  { id: 'rn', title: 'Release Notes', icon: Activity, route: '/release-notes' },
  { id: 'bl', title: 'Build Log', icon: Terminal, route: '/build-log' },
  { id: 'ep', title: 'Engineering Passport', icon: FileText, route: '/passport' },
  { id: 'lr', title: 'Learning Roadmap', icon: Map, route: '/roadmap' },
  { id: 'ft', title: 'Favorite Tools', icon: Wrench, route: '/uses' },
  { id: 'rs', title: 'Resources', icon: Database, route: '/resources' },
  { id: 'fq', title: 'FAQ Terminal', icon: ShieldQuestion, route: '/faq' },
];

type Item = {
  label: string;
  hint: string;
  icon: any;
  action: () => void;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Vim-like quick key buffer
  const [keyBuffer, setKeyBuffer] = useState("");
  const bufferTimeout = useRef<NodeJS.Timeout | null>(null);

  const items: Item[] = useMemo(() => {
    const go = (path: string) => () => {
      setIsOpen(false);
      navigate({ to: path });
    };
    
    return ACTIONS.map(a => ({
      label: `Launch ${a.title}`,
      hint: `app`,
      icon: a.icon,
      action: go(a.route)
    }));
  }, [navigate]);

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lower = search.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.hint.toLowerCase().includes(lower)
    );
  }, [search, items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setKeyBuffer("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) {
        // Vim-like global quick navigation (if not typing in an input)
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          // Accumulate keys for fast jumps e.g. "aa" for architecture atlas
          if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
            const char = e.key.toLowerCase();
            setKeyBuffer(prev => {
              const newBuffer = prev + char;
              
              // Check if buffer matches any action ID directly
              const exactMatch = ACTIONS.find(a => a.id === newBuffer);
              if (exactMatch) {
                navigate({ to: exactMatch.route });
                return ""; // clear buffer after match
              }
              return newBuffer;
            });

            // Clear buffer after 1.5s
            if (bufferTimeout.current) clearTimeout(bufferTimeout.current);
            bufferTimeout.current = setTimeout(() => {
              setKeyBuffer("");
            }, 1500);
          }
        }
        return;
      }
      
      if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "j")) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, filteredItems, selectedIndex, navigate]);

  return (
    <>
      {/* Global Quick Action HUD Indicator */}
      <AnimatePresence>
        {keyBuffer && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--electric)] text-black px-4 py-2 rounded-lg font-mono font-bold shadow-[0_0_20px_rgba(0,180,255,0.4)] flex items-center gap-2"
          >
            <Search className="w-4 h-4" /> 
            <span>{keyBuffer}</span>
            <span className="w-1.5 h-4 bg-black animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[var(--background)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              >
                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                  <Search className="w-5 h-5 text-[var(--foreground)]/40" />
                  <input
                    autoFocus
                    placeholder="Search apps, logs, and research..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedIndex(0);
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-[var(--foreground)] placeholder:text-[var(--foreground)]/30 font-mono"
                  />
                  <div className="flex gap-1">
                    <kbd className="hidden sm:inline-flex px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-[var(--foreground)]/40 font-mono">
                      ESC
                    </kbd>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
                  {filteredItems.length === 0 ? (
                    <div className="py-12 text-center text-[var(--foreground)]/40 font-mono text-sm">
                      No applications found matching "{search}"
                    </div>
                  ) : (
                    filteredItems.map((item, i) => {
                      const isSelected = i === selectedIndex;
                      return (
                        <div
                          key={item.label}
                          onMouseEnter={() => setSelectedIndex(i)}
                          onClick={item.action}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-[var(--electric)]/10 text-[var(--cyan)]"
                              : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-white/5"
                          }`}
                        >
                          <item.icon className="w-5 h-5 opacity-70" />
                          <div className="flex-1 flex flex-col">
                            <span className="font-medium text-sm">{item.label}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest opacity-50 font-mono border border-current px-1.5 py-0.5 rounded">
                            {item.hint}
                          </span>
                          {isSelected && (
                            <ArrowRight className="w-4 h-4 text-[var(--cyan)]" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                
                <div className="px-4 py-2 border-t border-white/10 bg-black/50 text-[10px] text-[var(--foreground)]/30 font-mono flex items-center justify-between">
                  <div className="flex gap-4">
                    <span><kbd className="bg-white/10 px-1 py-0.5 rounded">↑</kbd> <kbd className="bg-white/10 px-1 py-0.5 rounded">↓</kbd> to navigate</span>
                    <span><kbd className="bg-white/10 px-1 py-0.5 rounded">↵</kbd> to select</span>
                  </div>
                  <div>NEXUS_OS // CORE_SYSTEM</div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
