import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { name: "Journey", path: "/experience" },
  { name: "Projects", path: "/archive" },
  { name: "Thinking", path: "/decision-room" },
  { name: "Lab", path: "/lab" },
  { name: "Library", path: "/profile" },
];

export function FloatingNav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blurAmount, setBlurAmount] = useState(8); // base blur

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Dynamic Blur based on scroll depth
      const newBlur = Math.min(24, Math.max(8, currentScrollY / 50));
      setBlurAmount(newBlur);
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 md:px-0"
          >
            <div 
              className="flex items-center gap-2 bg-[var(--surface)]/70 border border-[var(--border)] rounded-full px-6 py-3 shadow-[0_4px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.5)] transition-all duration-300"
              style={{ backdropFilter: `blur(${blurAmount}px)` }}
            >
              <Link to="/" className="text-sm font-bold tracking-tight text-[var(--foreground)] mr-6 hover:opacity-70 transition-opacity">
                NEXUS
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map(link => {
                  const isActive = router.state.location.pathname === link.path || (link.path !== '/' && router.state.location.pathname.startsWith(link.path));
                  return (
                    <Link 
                      key={link.name} 
                      to={link.path}
                      className={`text-sm transition-colors editorial-link ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="hidden md:block ml-6 pl-6 border-l border-[var(--border)]">
                <Link to="/contact" className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors">
                  Contact
                </Link>
              </div>

              {/* Capsule Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="hidden md:flex ml-6 p-1 bg-[var(--muted)] rounded-full items-center relative w-[52px] h-[28px] border border-[var(--border)] transition-colors overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-10 transition-opacity" />
                <motion.div 
                  className="w-5 h-5 bg-[var(--background)] rounded-full flex items-center justify-center shadow-sm absolute z-10"
                  animate={{ x: theme === "dark" ? 23 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-3 h-3 text-[var(--foreground)]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-3 h-3 text-[var(--foreground)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>

              <button 
                className="md:hidden ml-4 text-[var(--foreground)]"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--background)] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm font-bold tracking-tight text-[var(--foreground)]">NEXUS</span>
              <div className="flex items-center gap-6">
                <button onClick={toggleTheme} className="text-[var(--foreground)]">
                   {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-[var(--foreground)]" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-8 text-2xl font-light">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              {NAV_LINKS.map(link => (
                <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="text-[var(--accent)]" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
