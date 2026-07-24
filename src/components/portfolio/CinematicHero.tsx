import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";

export function CinematicHero() {
  const { scrollY } = useScroll();
  
  // Transform elements on scroll for the cinematic "zoom in" effect
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden px-6 md:px-12 py-12 z-10 pointer-events-none">
      
      {/* Scroll-affected container with 12-column Grid */}
      <motion.div 
        style={{ opacity, y }}
        className="w-full h-full min-h-[calc(100vh-6rem)] max-w-[1800px] mx-auto pointer-events-auto grid grid-cols-12 gap-4 md:gap-6 relative"
      >
        
        {/* ========================================================
            LAYER 1: IDENTITY (Top Left, minimal)
            ======================================================== */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-12 md:col-span-3 xl:col-span-2 flex flex-col pt-8 md:pt-16"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-lg md:text-xl font-serif text-foreground tracking-wide mb-2"
          >
            Anshum Dev
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-0.5 text-[10px] font-mono text-[var(--muted-foreground)] uppercase tracking-widest mb-6">
            <span>AI Engineer</span>
            <span>Enterprise Systems Architect</span>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xs text-[var(--foreground)] opacity-80 leading-relaxed mb-8 font-sans max-w-[200px]">
            Designing production-grade AI systems for enterprise software.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-3 text-[10px] font-mono uppercase tracking-[0.15em] mb-12">
            <a href="https://github.com/anshum25" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors w-fit">GitHub</a>
            <a href="https://www.linkedin.com/in/anshum-dev-11115a288/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors w-fit">LinkedIn</a>
            <a href="https://x.com/TheAnshumDev" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors w-fit">X (Twitter)</a>
            <a href="/Anshum_Dev.pdf" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors w-fit">Resume</a>
            <a href="mailto:anshum25506@gmail.com" className="hover:text-accent transition-colors w-fit">Email</a>
          </motion.div>

        </motion.div>


        {/* ========================================================
            LAYER 2: HERO STATEMENT (Dominant, Center-Right)
            ======================================================== */}
        <div className="col-span-12 md:col-span-9 xl:col-span-10 flex flex-col justify-start pt-[15vh] md:pt-[15vh] lg:pt-[10vh] relative z-20">
          
          {/* Staggered overlapping typography */}
          <div className="flex flex-col items-start lg:pl-[10%]">
            
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[8vw] lg:text-[7vw] xl:text-[8rem] font-bold leading-[0.8] tracking-tighter text-foreground"
              >
                Building
              </motion.h2>
            </div>
            
            <div className="overflow-hidden ml-[5vw] lg:ml-[8vw] mt-2 z-10">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13vw] md:text-[9vw] lg:text-[8vw] xl:text-[9rem] font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50"
              >
                Intelligent Systems
              </motion.h2>
            </div>
            
            <div className="flex items-center gap-4 ml-[15vw] lg:ml-[20vw] mt-4 z-20">
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[8vw] md:text-[5vw] lg:text-[4vw] xl:text-[5rem] font-medium leading-[0.8] tracking-tight text-foreground/60"
                >
                  for
                </motion.span>
              </div>
              <div className="overflow-hidden pb-4">
                <motion.span 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[14vw] md:text-[10vw] lg:text-[9vw] xl:text-[10rem] font-serif italic text-accent leading-[0.7]"
                >
                  Real
                </motion.span>
              </div>
            </div>
            
            <div className="overflow-hidden ml-[25vw] lg:ml-[35vw] -mt-2">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[8vw] lg:text-[7vw] xl:text-[8rem] font-bold leading-[0.8] tracking-tighter text-foreground"
              >
                Problems
              </motion.h2>
            </div>
          </div>
        </div>

        {/* 3-paragraph Description (Absolutely Positioned) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[10%] left-[10%] md:bottom-[15%] md:left-[10vw] text-sm md:text-base lg:text-lg text-foreground/90 font-serif max-w-[36rem] leading-relaxed tracking-wide drop-shadow-sm flex flex-col gap-4 z-30 pointer-events-auto"
        >
          <p>
            I'm Anshum Dev, an AI Engineer and Full-Stack Developer passionate about building intelligent systems that solve real-world business problems. I specialize in designing scalable AI applications, enterprise software, and production-ready architectures using modern technologies across backend, cloud, and machine learning. Currently pursuing my Bachelor's in Computer Science, I spend most of my time exploring LLMs, RAG systems, multi-agent workflows, system design, and automation. I enjoy transforming complex ideas into reliable products with a strong focus on performance, clean architecture, and user experience. Beyond building software, I'm constantly learning, experimenting, and documenting my engineering journey. I'm always excited to collaborate on ambitious projects and create technology that has a meaningful impact.
          </p>
        </motion.div>

        {/* ========================================================
            CTA & SCROLL INDICATOR (Bottom)
            ======================================================== */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="absolute bottom-0 right-0 flex items-center justify-end z-30"
        >
          <a 
            href="#projects" 
            className="group flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-foreground hover:text-accent transition-colors"
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Explore Engineering</span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-accent">Explore Engineering</span>
            </span>
            <MoveRight size={16} strokeWidth={1} className="transition-transform duration-500 group-hover:translate-x-2" />
          </a>
        </motion.div>

        {/* Vertical Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 flex flex-col items-center gap-3 z-30"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--muted-foreground)]"
          >
            ↓
          </motion.div>
          <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-mono tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
            Enter Mission
          </div>
        </motion.div>
        
      </motion.div>
    </section>
  );
}
