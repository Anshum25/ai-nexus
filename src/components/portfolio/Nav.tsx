import { Command, LayoutDashboard, Briefcase, Terminal, BookOpen, User, Menu, X, Rocket, Map, Library, PenTool, Database, Wrench, ShieldQuestion, Award, Activity, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const NAV_GROUPS = [
  {
    label: "Core",
    links: [
      { name: "Home", path: "/", icon: LayoutDashboard },
      { name: "Now", path: "/now", icon: Activity },
      { name: "Work", path: "/work", icon: Briefcase },
    ]
  },
  {
    label: "Engineering",
    links: [
      { name: "Knowledge Hub", path: "/engineering", icon: Database },
      { name: "Tech Atlas", path: "/atlas", icon: Map },
      { name: "Architectures", path: "/architecture", icon: Library },
      { name: "Workflow", path: "/workflow", icon: Activity },
    ]
  },
  {
    label: "Research & Play",
    links: [
      { name: "Playground", path: "/playground", icon: Terminal },
      { name: "Experiment Lab", path: "/lab", icon: Rocket },
      { name: "Notebook", path: "/notebook", icon: PenTool },
      { name: "Case Studies", path: "/case-studies", icon: BookOpen },
    ]
  },
  {
    label: "Identity",
    links: [
      { name: "About", path: "/about", icon: User },
      { name: "Timeline", path: "/timeline", icon: History },
      { name: "Roadmap", path: "/roadmap", icon: Map },
      { name: "Achievements", path: "/achievements", icon: Award },
    ]
  },
  {
    label: "Resources",
    links: [
      { name: "Bookshelf", path: "/bookshelf", icon: BookOpen },
      { name: "Tools I Use", path: "/uses", icon: Wrench },
      { name: "FAQ", path: "/faq", icon: ShieldQuestion },
      { name: "Resources", path: "/resources", icon: Library },
    ]
  }
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const SidebarContent = () => (
    <div className="h-full flex flex-col py-6 px-4 overflow-y-auto scrollbar-none">
      
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 mb-10 px-2 group" onClick={() => setMobileOpen(false)}>
        <div className="w-8 h-8 rounded-lg bg-[var(--electric)]/20 flex items-center justify-center border border-[var(--electric)]/50 group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 100 100" fill="none" className="w-5 h-5 text-[var(--cyan)]">
            <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            <circle cx="50" cy="55" r="10" fill="currentColor" />
          </svg>
        </div>
        <div>
          <div className="font-bold tracking-widest text-white text-sm">NEXUS</div>
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Engineering OS</div>
        </div>
      </Link>

      {/* Search Trigger */}
      <button
        onClick={() => {
          setMobileOpen(false);
          const e = new KeyboardEvent("keydown", { key: "k", metaKey: true });
          window.dispatchEvent(e);
        }}
        className="w-full mb-8 flex items-center justify-between gap-2 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors text-sm"
      >
        <div className="flex items-center gap-2">
          <Command className="w-4 h-4" />
          <span>Search OS...</span>
        </div>
        <kbd className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      {/* Nav Links */}
      <div className="flex-1 space-y-8">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3 px-2">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors [&.active]:bg-[var(--electric)]/10 [&.active]:text-[var(--cyan)] [&.active]:font-medium group"
                >
                  <link.icon className="w-4 h-4 group-[.active]:text-[var(--cyan)] text-white/40 group-hover:text-white transition-colors" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 px-2 flex gap-4">
        <Link to="/resume" className="text-xs font-mono text-white/50 hover:text-white">Resume</Link>
        <Link to="/contact" className="text-xs font-mono text-white/50 hover:text-[var(--cyan)]">Contact</Link>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-72 glass border-r border-white/10 z-40 bg-background/50 backdrop-blur-3xl">
        <SidebarContent />
      </aside>

      {/* Mobile Topbar & Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-white/10 z-40 px-4 flex items-center justify-between">
        <Link to="/" className="font-bold tracking-widest text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[var(--electric)]/20 flex items-center justify-center border border-[var(--electric)]/50">
            <svg viewBox="0 0 100 100" fill="none" className="w-4 h-4 text-[var(--cyan)]">
              <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            </svg>
          </div>
          NEXUS
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const e = new KeyboardEvent("keydown", { key: "k", metaKey: true });
              window.dispatchEvent(e);
            }}
            className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg"
          >
            <Command className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setMobileOpen(true)}
            className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background border-r border-white/10 z-50 lg:hidden shadow-2xl"
            >
              <button 
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 rounded-lg z-50"
              >
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
