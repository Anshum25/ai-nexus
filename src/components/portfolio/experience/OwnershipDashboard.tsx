import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Shield, Cpu, Network, Lock, Zap, Bot } from 'lucide-react';

interface OwnershipItem {
  id: string;
  title: string;
  icon: any;
  desc: string;
  architecture: string;
}

export function OwnershipDashboard({ items }: { items: OwnershipItem[] }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-4 flex items-center gap-2">
        <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
        System Ownership
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
            className={`p-6 rounded-2xl border cursor-pointer transition-all group overflow-hidden relative ${
              activeItem === item.id 
              ? 'bg-[var(--accent)]/10 border-[var(--accent)]/50 col-span-2 md:col-span-4 shadow-[0_0_30px_rgba(37,99,235,0.1)]' 
              : 'bg-[var(--foreground)]/[0.02] border-[var(--border)] hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/5'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeItem === item.id ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]' : 'bg-[var(--background)]/50 border-[var(--border)] text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className={`font-mono text-sm uppercase tracking-widest ${activeItem === item.id ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/70 group-hover:text-[var(--foreground)]'}`}>
                  {item.title}
                </h3>
              </div>
            </div>

            <AnimatePresence>
              {activeItem === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 border-t border-[var(--border)] pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
                >
                  <div>
                    <div className="font-mono text-[9px] text-[var(--muted-foreground)] uppercase tracking-widest mb-2">Responsibilities</div>
                    <p className="text-sm text-[var(--foreground)]/80 leading-relaxed font-serif">{item.desc}</p>
                  </div>
                  <div className="bg-[var(--background)]/50 p-4 rounded-xl border border-[var(--border)]">
                    <div className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest mb-2">Architecture Stack</div>
                    <div className="font-mono text-xs text-[var(--foreground)]/60 leading-relaxed whitespace-pre-wrap">
                      {item.architecture}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
