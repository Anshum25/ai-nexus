import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sun, Moon, Mouse } from "lucide-react";

const TOP_NAV_LINKS = [
  { name: "Journey", path: "/experience" },
  { name: "Projects", path: "/archive" },
  { name: "Thinking", path: "/decision-room" },
  { name: "Lab", path: "/lab" },
  { name: "Library", path: "/journal" },
  { name: "About", path: "/profile" },
  { name: "Contact", path: "mailto:hello@nexus.os" },
];

const SIDE_NAV_LINKS = [
  { id: "01", name: "Home", path: "/" },
  { id: "02", name: "Problem", path: "/now" },
  { id: "03", name: "Journey", path: "/experience" },
  { id: "04", name: "Projects", path: "/archive" },
  { id: "05", name: "Thinking", path: "/decision-room" },
  { id: "06", name: "Lab", path: "/lab" },
  { id: "07", name: "Library", path: "/journal" },
  { id: "08", name: "About", path: "/profile" },
  { id: "09", name: "Contact", path: "mailto:hello@nexus.os" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  // Minimal theme toggle state (just visual for now since we enforce dark mode globally)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* TOP NAVIGATION BAR */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--background)]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'} px-6 lg:px-12 flex items-center justify-between`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-[var(--cyan)]/50 transition-colors">
            <div className="absolute inset-0 bg-white/5" />
            <svg viewBox="0 0 100 100" fill="none" className="w-4 h-4 text-[var(--foreground)] group-hover:text-[var(--cyan)] transition-colors">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeDasharray="40 20" />
              <path d="M20 50 L80 50" stroke="currentColor" strokeWidth="6" />
            </svg>
          </div>
          <span className="font-bold tracking-[0.2em] text-[var(--foreground)] text-sm uppercase">NEXUS.OS</span>
        </Link>

        {/* Center Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {TOP_NAV_LINKS.map(link => (
            link.path.startsWith('mailto:') ? (
              <a key={link.name} href={link.path} className="text-xs font-semibold text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors">
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-xs font-semibold transition-colors ${router.state.location.pathname === link.path ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/60 hover:text-[var(--foreground)]'}`}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle (Visual matched to screenshot) */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button 
              onClick={() => setIsDark(false)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${!isDark ? 'bg-white/10 text-[var(--foreground)]' : 'text-[var(--foreground)]/40 hover:text-[var(--foreground)]/80'}`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsDark(true)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isDark ? 'bg-white/10 text-[var(--foreground)]' : 'text-[var(--foreground)]/40 hover:text-[var(--foreground)]/80'}`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button className="hidden md:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all text-[var(--foreground)]">
            <ArrowRight className="w-4 h-4" />
          </button>

          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-[var(--foreground)]">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* LEFT SLIM NAVIGATION SIDEBAR */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-24 flex-col justify-center items-center z-40 border-r border-white/5 bg-[var(--background)]/50 backdrop-blur-3xl"
      >
        <div className="flex flex-col gap-8">
          {SIDE_NAV_LINKS.map(link => {
            const isActive = router.state.location.pathname === link.path || (link.path !== '/' && router.state.location.pathname.startsWith(link.path));
            return (
              link.path.startsWith('mailto:') ? (
                <a key={link.id} href={link.path} className="group relative flex items-center justify-center">
                  <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[9px] tracking-widest">{link.id}</span>
                    <span className="text-xs absolute left-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap bg-[var(--background)] px-3 py-1 rounded border border-white/10 text-[var(--foreground)]">
                      {link.name}
                    </span>
                  </div>
                </a>
              ) : (
                <Link key={link.id} to={link.path} className="group relative flex items-center justify-center">
                  <div className={`flex items-center gap-4 transition-opacity ${isActive ? 'opacity-100 text-[var(--cyan)]' : 'opacity-40 hover:opacity-100'}`}>
                    <span className="font-mono text-[9px] tracking-widest font-bold">{link.id}</span>
                    {isActive && <div className="absolute -left-6 w-1 h-1 bg-[var(--cyan)] rounded-full shadow-[0_0_10px_var(--cyan)]" />}
                    <span className={`text-xs absolute left-8 transition-all whitespace-nowrap bg-[var(--background)] px-3 py-1 rounded border border-white/10 ${isActive ? 'opacity-100 translate-x-0 text-[var(--cyan)] border-[var(--cyan)]/30' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--foreground)]'}`}>
                      {link.name}
                    </span>
                  </div>
                </Link>
              )
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50">
          <Mouse className="w-4 h-4" />
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.aside>

      {/* MOBILE MENU overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--background)] z-50 flex flex-col p-6"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setMobileOpen(false)} className="p-2 border border-white/10 rounded-full">
                <X className="w-5 h-5 text-[var(--foreground)]" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {SIDE_NAV_LINKS.map(link => (
                link.path.startsWith('mailto:') ? (
                  <a key={link.id} href={link.path} className="text-3xl font-bold text-[var(--foreground)]/50 flex items-center gap-4">
                    <span className="text-sm font-mono text-[var(--foreground)]/20">{link.id}</span>
                    {link.name}
                  </a>
                ) : (
                  <Link key={link.id} to={link.path} onClick={() => setMobileOpen(false)} className="text-3xl font-bold text-[var(--foreground)] flex items-center gap-4">
                    <span className="text-sm font-mono text-[var(--cyan)]">{link.id}</span>
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
