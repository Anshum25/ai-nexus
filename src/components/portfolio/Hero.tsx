import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NeuralCanvas } from "./NeuralCanvas";
import { ArrowUpRight } from "lucide-react";
import { AICore, ProjectOrbit } from "./AICore";
import { LiveStatusPanel } from "./LiveStatusPanel";

const ORBITS = [
  { name: "Enterprise AI Chatbot", radius: 180, duration: 25, reverse: false },
  { name: "Chess Mentor AI", radius: 260, duration: 35, reverse: true },
  { name: "ERPNext Suite", radius: 340, duration: 45, reverse: false },
  { name: "SkyERP Platform", radius: 420, duration: 55, reverse: true },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // As user scrolls down, AI Core drifts up and fades, creating depth for the Memory Vault
  const coreY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background Intelligence Layer */}
      <div className="absolute inset-0 z-0">
        <NeuralCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <LiveStatusPanel />

      <motion.div 
        style={{ y: coreY, opacity, scale }} 
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Typography */}
        <motion.div variants={itemVariants} className="max-w-3xl z-30 pointer-events-none mt-12">
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl text-white">
            Building Enterprise <br/>
            <span className="shimmer bg-clip-text text-transparent bg-gradient-to-r from-[var(--cyan)] to-[var(--electric)]">AI Systems.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-white/50 font-light max-w-xl mx-auto leading-relaxed">
            Engineering intelligent products. I design scalable architectures leveraging FastAPI, ERPNext, and production-grade LLM pipelines to turn complex problems into reliable systems.
          </p>
        </motion.div>

        {/* Primary Actions */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-4 z-30">
          <a 
            href="#projects" 
            data-cursor="launch"
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-black transition-all hover:scale-105 hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          >
            Explore Projects
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a 
            href="/resume.pdf"
            data-cursor="inspect"
            className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-xs font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
          >
            View Resume
          </a>
        </motion.div>

        {/* The AI Core with Orbits */}
        <motion.div variants={itemVariants} className="relative mt-8 mb-24 md:mb-0">
          <AICore>
            {ORBITS.map((orbit, i) => (
              <ProjectOrbit key={i} radius={orbit.radius} duration={orbit.duration} reverse={orbit.reverse}>
                <a
                  href="#projects"
                  data-cursor="explore"
                  className="group relative flex items-center justify-center w-3 h-3 rounded-full bg-[var(--cyan)] shadow-[0_0_15px_var(--cyan)] transition-transform hover:scale-150"
                >
                  {/* Tooltip */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 scale-90 blur-sm group-hover:opacity-100 group-hover:scale-100 group-hover:blur-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    <div className="glass px-3 py-1.5 rounded-md text-[10px] font-mono text-white/80">
                      {orbit.name}
                    </div>
                  </div>
                </a>
              </ProjectOrbit>
            ))}
          </AICore>
        </motion.div>

        {/* Scroll Invitation - AI Pulse downward */}
        <motion.div 
          variants={itemVariants} 
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div 
            animate={{ 
              height: ["0px", "40px", "0px"],
              opacity: [0, 1, 0],
              y: [0, 20, 40]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] bg-gradient-to-b from-[var(--cyan)] to-transparent" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
