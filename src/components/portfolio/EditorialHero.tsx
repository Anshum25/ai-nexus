import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { Github, Linkedin, Mail, FileText, Code2, PenTool, MoveRight } from "lucide-react";

export function EditorialHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const textLines = [
    "Building",
    "Intelligent Systems",
    "That Solve",
    "Real Problems."
  ];

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col justify-center overflow-hidden pt-24 pb-12">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* LEFT PANEL: Identity */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-1 lg:col-span-3 flex flex-col gap-8"
        >
          <div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground hover:tracking-wide transition-all duration-500 cursor-default">
              Anshum Dev
            </motion.h1>
            <motion.div variants={itemVariants} className="flex flex-col gap-1 mt-4 text-[var(--muted-foreground)] font-mono text-xs uppercase tracking-widest">
              <span>AI Engineer</span>
              <span>Backend Engineer</span>
              <span>Enterprise Systems Architect</span>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed max-w-sm">
            I design production-grade AI systems, enterprise software, and intelligent automation that solve real business problems.
          </motion.p>

          <motion.div variants={itemVariants} className="p-5 rounded-lg border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md flex flex-col gap-4 text-sm shadow-sm group hover:border-[var(--accent)]/50 transition-colors duration-500">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="font-medium">Open for Opportunities</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
              <span className="text-base">📍</span> India
            </div>
            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
              <span className="text-base">⚡</span> Building Chess Mentor AI
            </div>
            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
              <span className="text-base">☕</span> Coffee Driven
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 items-center">
            <MagneticButton strength={30}>
              <a href="https://github.com/anshum25" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors bg-[var(--surface)]/50 backdrop-blur-sm">
                <Github size={16} />
              </a>
            </MagneticButton>
            <MagneticButton strength={30}>
              <a href="https://linkedin.com/in/anshum-dev" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors bg-[var(--surface)]/50 backdrop-blur-sm">
                <Linkedin size={16} />
              </a>
            </MagneticButton>
            <MagneticButton strength={30}>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors bg-[var(--surface)]/50 backdrop-blur-sm">
                <FileText size={16} />
              </a>
            </MagneticButton>
            <MagneticButton strength={30}>
              <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors bg-[var(--surface)]/50 backdrop-blur-sm">
                <Mail size={16} />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* CENTER PANEL: Hero Story */}
        <motion.div 
          className="col-span-1 lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left gap-10"
        >
          <div className="flex flex-col gap-2">
            {textLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-balance text-foreground"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <MagneticButton strength={15}>
              <a href="#projects" className="group flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all">
                Explore My Work
                <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton strength={15}>
              <a href="#" className="flex items-center gap-2 border border-foreground/20 bg-background/50 backdrop-blur-sm text-foreground px-6 py-3 rounded-full font-medium hover:bg-accent/10 hover:border-accent/30 transition-all">
                <FileText size={16} />
                Download Resume
              </a>
            </MagneticButton>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="hidden lg:flex flex-col items-center gap-2 mt-12 opacity-50 mx-auto lg:mx-0 absolute bottom-12"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL: Mission Control */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-1 lg:col-span-3 flex flex-col gap-6"
        >
          <motion.div variants={itemVariants} className="group relative p-6 rounded-xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)]/80 to-[var(--background)]/80 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-[var(--accent)]/40 transition-colors duration-700">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl group-hover:bg-[var(--accent)]/20 transition-all duration-700 -z-10" />
            
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              CURRENTLY BUILDING
            </div>
            
            <h3 className="text-xl font-bold mb-6">Enterprise AI Assistant</h3>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-[var(--muted-foreground)]">
                  <span>Architecture</span>
                  <span className="text-foreground">100%</span>
                </div>
                <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--foreground)] w-full" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-[var(--muted-foreground)]">
                  <span>Research</span>
                  <span className="text-foreground">80%</span>
                </div>
                <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--foreground)] w-[80%]" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-[var(--muted-foreground)]">
                  <span>Deployment</span>
                  <span className="text-foreground">45%</span>
                </div>
                <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] w-[45%] relative">
                    <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {["FastAPI", "Next.js", "Qdrant", "Docker", "LLMs", "ERPNext"].map(tech => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)]/50 text-[var(--muted-foreground)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Latest Achievements
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-foreground">Production AI Chatbot</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted-foreground)]">
                <div className="w-4 h-4 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5" />
                <span>Chess Mentor AI</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted-foreground)]">
                <div className="w-4 h-4 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5" />
                <span>ERPNext AI Assistant</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
      </div>
      
      {/* BOTTOM NAV CHIPS */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-0 right-0 w-full flex justify-center z-20 pointer-events-auto"
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-lg shadow-sm">
          {["Journey", "Projects", "Architecture", "Research", "Journal", "Experience", "Future"].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="editorial-link text-xs font-mono uppercase tracking-widest text-[var(--muted-foreground)] hover:text-foreground transition-colors py-1 px-2"
            >
              {item} <span className="opacity-50">→</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
