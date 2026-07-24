import { motion } from "framer-motion";

export function ChapterMission() {
  return (
    <section className="w-full min-h-screen py-32 px-6 lg:px-12 flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
      
      {/* Sticky Left: Huge Text */}
      <div className="w-full md:w-5/12 relative">
        <div className="sticky top-40 flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
            01 / Current Mission
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] leading-[1.1] text-balance">
            Architecting autonomy.
          </h2>
          <p className="mt-8 text-xl text-[var(--muted-foreground)] font-light leading-relaxed max-w-md">
            Moving beyond simple prompts to orchestrate complex, multi-agent systems that reason, act, and verify their own work within enterprise boundaries.
          </p>
        </div>
      </div>

      {/* Scrolling Right: Live Architecture */}
      <div className="w-full md:w-7/12 flex flex-col gap-12 pt-20">
        
        {/* Abstract Visualization Block */}
        <div className="w-full aspect-square md:aspect-auto md:h-[600px] border border-[var(--border)] rounded-sm bg-[var(--background)] relative overflow-hidden flex flex-col p-8">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
          
          <div className="flex justify-between items-center w-full pb-4 border-b border-[var(--border)]">
             <div className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">System Status</div>
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
               <div className="text-[10px] font-mono text-[var(--accent)] uppercase">Online</div>
             </div>
          </div>

          <div className="flex-1 w-full relative mt-8">
            {/* Animated SVG Nodes simulating an active architecture */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="none">
               <path d="M 50 100 Q 200 100 200 200 T 350 300" stroke="var(--border)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
               <path d="M 50 300 Q 200 300 200 200 T 350 100" stroke="var(--border)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
               
               {/* Pulsing nodes */}
               <circle cx="50" cy="100" r="4" fill="var(--muted-foreground)" />
               <circle cx="50" cy="300" r="4" fill="var(--muted-foreground)" />
               
               <circle cx="200" cy="200" r="8" fill="transparent" stroke="var(--accent)" strokeWidth="1" className="animate-[ping_3s_infinite]" />
               <circle cx="200" cy="200" r="4" fill="var(--accent)" />
               
               <circle cx="350" cy="100" r="4" fill="var(--foreground)" />
               <circle cx="350" cy="300" r="4" fill="var(--foreground)" />
            </svg>
            
            {/* Minimal Labels */}
            <div className="absolute top-[80px] left-[60px] text-[10px] font-mono text-[var(--muted-foreground)]">Query Layer</div>
            <div className="absolute top-[280px] left-[60px] text-[10px] font-mono text-[var(--muted-foreground)]">Data Lake</div>
            
            <div className="absolute top-[170px] left-[215px] text-[10px] font-mono text-[var(--accent)]">Inference Engine</div>
            
            <div className="absolute top-[80px] right-[60px] text-[10px] font-mono text-[var(--foreground)]">Client A</div>
            <div className="absolute top-[280px] right-[60px] text-[10px] font-mono text-[var(--foreground)]">Client B</div>
          </div>
        </div>

        {/* Supplementary Text Block */}
        <div className="w-full p-8 border border-[var(--border)] rounded-sm bg-[var(--background)]/50">
           <h3 className="text-xl font-medium text-[var(--foreground)] tracking-tight mb-4">The Complexity Bottleneck</h3>
           <p className="text-sm text-[var(--muted-foreground)] leading-relaxed font-light">
             Modern AI applications fail when they treat LLMs as databases rather than reasoning engines. By decoupling retrieval from generation, and introducing deterministic verification layers, we can guarantee 99.9% semantic accuracy.
           </p>
        </div>

      </div>
    </section>
  );
}
