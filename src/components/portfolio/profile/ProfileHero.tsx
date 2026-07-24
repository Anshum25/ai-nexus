import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, TerminalSquare, Monitor, BookOpen, Coffee, Keyboard } from 'lucide-react';

export function ProfileHero() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const deskItems = [
    { id: 'laptop', label: 'MacBook Pro M3 Max', icon: Laptop, text: 'My primary workhorse. I rely heavily on Apple Silicon for running local LLMs and heavy Docker container meshes without thermal throttling.' },
    { id: 'monitor', label: 'Studio Display', icon: Monitor, text: 'Dual setups are distracting. One high-density 5K display forces me to use virtual desktops and keep only the active context visible.' },
    { id: 'keyboard', label: 'HHKB Professional', icon: Keyboard, text: 'Topre switches and a Unix layout. Removing the arrow keys forced me to master Vim motions, doubling my navigation speed.' },
    { id: 'terminal', label: 'Alacritty + Tmux', icon: TerminalSquare, text: 'GPU-accelerated terminal multiplexing. I rarely leave the terminal for Git, file management, or server monitoring.' },
    { id: 'notebook', label: 'Dot Grid Leuchtturm', icon: BookOpen, text: 'Before I write a single line of code, the architecture is sketched in pen. Writing physically forces me to slow down and think.' },
    { id: 'coffee', label: 'Pour Over Coffee', icon: Coffee, text: 'The ritual of making it manually provides a 5-minute mental reset when debugging a complex race condition.' },
  ];

  return (
    <div className="w-full space-y-32">
      {/* SECTION 01: WHO I AM */}
      <section id="who-i-am" className="scroll-mt-32">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--foreground)] mb-8"
          >
            I build <span className="text-[var(--cyan)] font-serif italic font-normal">resilient backend systems</span> and <span className="text-[var(--electric)] font-serif italic font-normal">AI-native architectures</span> that scale elegantly.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 group mt-12 bg-black/50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            
            {/* Elegant Portrait Placeholder */}
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 rounded-full border border-[var(--cyan)]/30 mx-auto mb-4 bg-[var(--cyan)]/5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-tr from-[var(--cyan)]/20 to-transparent" />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--foreground)]/50 group-hover:text-[var(--cyan)] transition-colors">
                Visual Identity // Placeholder
              </div>
            </div>

            {/* Mouse interaction elements */}
            <div className="absolute -left-20 top-1/2 w-40 h-40 bg-[var(--electric)]/20 blur-[100px] rounded-full group-hover:bg-[var(--cyan)]/20 transition-colors duration-1000" />
            <div className="absolute -right-20 top-1/2 w-40 h-40 bg-[var(--cyan)]/20 blur-[100px] rounded-full group-hover:bg-[var(--electric)]/20 transition-colors duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 06: MY DESK */}
      <section id="my-desk" className="scroll-mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-2">Section 06</div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">My Desk</h2>
          <p className="text-[var(--foreground)]/50 text-sm max-w-xl font-serif italic">Every tool is a deliberate choice. I optimize for flow state and deep work.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deskItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                activeItem === item.id 
                ? 'bg-[var(--cyan)]/10 border-[var(--cyan)]/50 shadow-[0_0_30px_rgba(0,180,255,0.1)]' 
                : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${activeItem === item.id ? 'bg-[var(--cyan)]/20 border-[var(--cyan)] text-[var(--cyan)]' : 'bg-black/50 border-white/10 text-[var(--foreground)]/50'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className={`font-mono text-sm font-bold uppercase tracking-widest ${activeItem === item.id ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/70'}`}>
                  {item.label}
                </h3>
              </div>
              
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[var(--foreground)]/80 leading-relaxed font-serif pt-2 border-t border-white/10">
                      {item.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
