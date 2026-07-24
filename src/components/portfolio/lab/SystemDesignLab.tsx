import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Database, Server, Smartphone, Zap, Shield, Play } from 'lucide-react';

export function SystemDesignLab() {
  const [activeSystem, setActiveSystem] = useState<'chat' | 'ride' | 'video' | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  const systems = [
    { id: 'chat', label: 'Global Chat System', desc: '10M DAU WhatsApp Clone' },
    { id: 'ride', label: 'Ride Sharing App', desc: 'Real-time geo-matching' },
    { id: 'video', label: 'Video Streaming', desc: 'Adaptive bitrate Netflix clone' },
  ];

  const handleRun = (id: any) => {
    setActiveSystem(id);
    setAnimationStep(0);
    // Simulate progression
    setTimeout(() => setAnimationStep(1), 1000); // Load Balancer
    setTimeout(() => setAnimationStep(2), 2500); // Web Sockets / API
    setTimeout(() => setAnimationStep(3), 4000); // Cache / PubSub
    setTimeout(() => setAnimationStep(4), 5500); // DB Layer
  };

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-mono uppercase tracking-tight text-[var(--foreground)] mb-2">System Design</h2>
        <p className="text-[var(--foreground)]/50 text-sm">Select a high-scale system to visualize its architectural layers assembling.</p>
      </div>

      <div className="flex gap-4 mb-8">
        {systems.map(sys => (
          <button
            key={sys.id}
            onClick={() => handleRun(sys.id)}
            className={`flex-1 p-4 rounded-xl border text-left transition-all ${activeSystem === sys.id ? 'bg-[var(--cyan)]/10 border-[var(--cyan)]/50 shadow-[0_0_20px_rgba(0,180,255,0.1)]' : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/5'}`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`font-mono text-xs uppercase tracking-widest ${activeSystem === sys.id ? 'text-[var(--cyan)]' : 'text-[var(--foreground)]/80'}`}>{sys.label}</span>
              {activeSystem === sys.id && <Play className="w-3 h-3 text-[var(--cyan)] animate-pulse" />}
            </div>
            <div className="text-[10px] text-[var(--foreground)]/40">{sys.desc}</div>
          </button>
        ))}
      </div>

      <div className="flex-1 bg-[var(--background)] border border-white/10 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--electric) 1px, transparent 1px), linear-gradient(90deg, var(--electric) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <AnimatePresence mode="wait">
          {!activeSystem ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[var(--foreground)]/30 font-mono text-sm uppercase tracking-widest text-center">
              <Network className="w-12 h-12 mx-auto mb-4 opacity-20" />
              Select a system to initialize<br/>architecture simulation
            </motion.div>
          ) : (
            <motion.div key="sim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-2xl px-12 relative flex flex-col gap-6">
              
              {/* Clients */}
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center gap-12">
                {[1,2,3].map(i => (
                  <div key={i} className="flex flex-col items-center">
                    <Smartphone className="w-6 h-6 text-[var(--foreground)]/50 mb-2" />
                    <span className="text-[9px] font-mono text-[var(--foreground)]/30 uppercase">Client {i}</span>
                  </div>
                ))}
              </motion.div>

              {/* Load Balancer */}
              <AnimatePresence>
                {animationStep >= 1 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full bg-white/5 border border-white/20 p-3 rounded text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--foreground)]/80 uppercase">
                      <Shield className="w-4 h-4 text-green-400" />
                      Global Load Balancer (Route 53 + ALB)
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* App Servers / Web Sockets */}
              <AnimatePresence>
                {animationStep >= 2 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between gap-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex-1 bg-white/5 border border-[var(--cyan)]/30 p-4 rounded text-center">
                        <Server className="w-5 h-5 text-[var(--cyan)] mx-auto mb-2" />
                        <div className="text-[9px] font-mono text-[var(--foreground)]/60 uppercase">
                          {activeSystem === 'chat' ? 'WebSocket Node' : activeSystem === 'ride' ? 'Location Svc' : 'Video CDN Node'}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PubSub / Cache */}
              <AnimatePresence>
                {animationStep >= 3 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full bg-[var(--electric)]/10 border border-[var(--electric)]/30 p-3 rounded text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--electric)] uppercase">
                      <Zap className="w-4 h-4" />
                      {activeSystem === 'chat' ? 'Redis Pub/Sub (Message Router)' : activeSystem === 'ride' ? 'Kafka Event Stream' : 'Redis Cache Cluster'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Database Layer */}
              <AnimatePresence>
                {animationStep >= 4 && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center gap-8 pt-4">
                    <div className="bg-black border border-white/20 p-6 rounded-xl flex flex-col items-center">
                      <Database className="w-8 h-8 text-blue-400 mb-2" />
                      <div className="text-[10px] font-mono text-[var(--foreground)]/50 uppercase">Primary DB Layer</div>
                      <div className="text-xs font-mono text-[var(--foreground)] font-bold mt-1">
                        {activeSystem === 'chat' ? 'Cassandra / ScyllaDB' : activeSystem === 'ride' ? 'PostgreSQL + PostGIS' : 'CockroachDB'}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
