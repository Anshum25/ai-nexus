import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  Command, Terminal, Folder, FileText, Database, ShieldAlert, Cpu, 
  Settings, Server, Cloud, Boxes, Archive, Network, BookOpen, 
  Activity, Search, ChevronRight, X, FlaskConical, Wrench, Menu
} from "lucide-react";

type NavItem = { name: string; path: string; icon: any; isNew?: boolean };
type NavGroup = { label: string; icon: any; items: NavItem[]; defaultOpen?: boolean };

const OS_NAVIGATION: NavGroup[] = [
  {
    label: "Core System",
    icon: Activity,
    defaultOpen: true,
    items: [
      { name: "Home", path: "/", icon: Terminal },
      { name: "Engineer Blueprint", path: "/blueprint", icon: FileText },
      { name: "Current Mission", path: "/now", icon: Activity },
      { name: "Mission History", path: "/mission-history", icon: Archive },
      { name: "Mission Control", path: "/mission-control", icon: Command },
    ]
  },
  {
    label: "Engineering Archive",
    icon: Database,
    defaultOpen: true,
    items: [
      { name: "Project Dossiers", path: "/archive", icon: Folder },
      { name: "Architecture Atlas", path: "/architecture-atlas", icon: Network },
      { name: "Failure Museum", path: "/failure-museum", icon: ShieldAlert, isNew: true },
      { name: "Decision Room", path: "/decision-room", icon: BookOpen, isNew: true },
      { name: "System Design Gallery", path: "/system-design", icon: Boxes },
    ]
  },
  {
    label: "Research & Labs",
    icon: FlaskConical,
    defaultOpen: false,
    items: [
      { name: "Research Vault", path: "/research-vault", icon: ShieldAlert, isNew: true },
      { name: "Innovation Lab", path: "/innovation-lab", icon: Cpu },
      { name: "Experiment Canvas", path: "/lab", icon: Wrench },
      { name: "Prompt Laboratory", path: "/prompt-lab", icon: Terminal },
      { name: "Idea Incubator", path: "/incubator", icon: Cloud },
    ]
  },
  {
    label: "Infrastructure",
    icon: Server,
    defaultOpen: false,
    items: [
      { name: "Tech Atlas", path: "/atlas", icon: Database },
      { name: "Docker Studio", path: "/docker-studio", icon: Boxes },
      { name: "Deployment Center", path: "/deployment-center", icon: Cloud },
      { name: "API Explorer", path: "/api-explorer", icon: Network },
      { name: "DB Explorer", path: "/db-explorer", icon: Database },
    ]
  },
  {
    label: "Logs & Knowledge",
    icon: BookOpen,
    defaultOpen: false,
    items: [
      { name: "Engineering Journal", path: "/journal", icon: FileText },
      { name: "Engineering Notebook", path: "/notebook", icon: FileText },
      { name: "Bookshelf", path: "/bookshelf", icon: BookOpen },
      { name: "Release Notes", path: "/release-notes", icon: Archive },
      { name: "Build Log", path: "/build-log", icon: Activity },
    ]
  },
  {
    label: "Identity & Extras",
    icon: Settings,
    defaultOpen: false,
    items: [
      { name: "Engineering Passport", path: "/passport", icon: FileText },
      { name: "Learning Roadmap", path: "/roadmap", icon: Network },
      { name: "Favorite Tools", path: "/uses", icon: Wrench },
      { name: "Resources", path: "/resources", icon: Folder },
      { name: "FAQ", path: "/faq", icon: Command },
    ]
  }
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    OS_NAVIGATION.reduce((acc, group) => ({ ...acc, [group.label]: !!group.defaultOpen }), {})
  );

  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col py-6 overflow-hidden">
      
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 mb-8 px-6 group" onClick={() => setMobileOpen(false)}>
        <div className="w-8 h-8 rounded-lg bg-[var(--electric)]/20 flex items-center justify-center border border-[var(--electric)]/50 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,180,255,0.2)]">
          <svg viewBox="0 0 100 100" fill="none" className="w-5 h-5 text-[var(--cyan)]">
            <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            <circle cx="50" cy="55" r="10" fill="currentColor" />
          </svg>
        </div>
        <div>
          <div className="font-bold tracking-widest text-white text-sm">NEXUS.OS</div>
          <div className="text-[10px] font-mono text-green-400 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> System Online
          </div>
        </div>
      </Link>

      {/* Global Search Trigger */}
      <div className="px-4 mb-6">
        <button
          onClick={() => {
            setMobileOpen(false);
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
          }}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white/50 hover:bg-white/5 hover:border-[var(--electric)] hover:text-white transition-all text-sm group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 group-hover:text-[var(--cyan)] transition-colors" />
            <span>Search System...</span>
          </div>
          <kbd className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/70">⌘K</kbd>
        </button>
      </div>

      {/* Mac-style Folder Tree Navigation */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-none pb-20">
        {OS_NAVIGATION.map((group) => (
          <div key={group.label} className="mb-2">
            <button 
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-mono uppercase tracking-wider text-white/40 hover:text-white transition-colors"
            >
              <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${openGroups[group.label] ? 'rotate-90' : ''}`} />
              <group.icon className="w-3.5 h-3.5" />
              {group.label}
            </button>
            
            <AnimatePresence initial={false}>
              {openGroups[group.label] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden ml-4 pl-2 border-l border-white/10 mt-1 space-y-0.5"
                >
                  {group.items.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors [&.active]:bg-[var(--electric)]/10 [&.active]:text-[var(--cyan)] [&.active]:font-medium group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <link.icon className="w-3.5 h-3.5 group-[.active]:text-[var(--cyan)] text-white/40 group-hover:text-white transition-colors shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </div>
                      {link.isNew && (
                        <span className="shrink-0 text-[8px] uppercase tracking-widest bg-[var(--electric)]/20 text-[var(--cyan)] px-1.5 py-0.5 rounded font-mono">New</span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <motion.aside 
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="hidden lg:block fixed top-0 left-0 bottom-0 w-72 bg-[#0a0a0a]/95 backdrop-blur-3xl border-r border-white/10 z-40 shadow-2xl"
      >
        <SidebarContent />
      </motion.aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 z-40 px-4 flex items-center justify-between shadow-xl">
        <Link to="/" className="font-bold tracking-widest text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[var(--electric)]/20 flex items-center justify-center border border-[var(--electric)]/50">
            <svg viewBox="0 0 100 100" fill="none" className="w-4 h-4 text-[var(--cyan)]">
              <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            </svg>
          </div>
          NEXUS.OS
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))} className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setMobileOpen(true)} className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#0a0a0a] border-r border-white/10 z-50 lg:hidden shadow-2xl"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 rounded-lg z-50">
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
