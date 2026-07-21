import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Network, Zap, Clock, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/now')({
  component: SystemTelemetryComponent,
});

function SystemTelemetryComponent() {
  const [uptime, setUptime] = useState(0);
  const [pulse, setPulse] = useState(0);

  // Simulate live data
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
      setPulse(Math.floor(Math.random() * 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-24 pb-32 bg-[#050505] min-h-screen font-mono">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white flex items-center gap-4">
              <Activity className="w-8 h-8 text-[var(--electric)]" />
              System Telemetry
            </h1>
            <p className="text-white/40 text-sm uppercase tracking-widest">
              Real-time engineering dashboard & current focus matrix
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col items-end">
              <span className="text-white/30 uppercase text-[10px]">Session Uptime</span>
              <span className="text-[var(--cyan)] text-lg">{formatUptime(uptime)}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-white/30 uppercase text-[10px]">Status</span>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> OPERATIONAL
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Mission Panel */}
          <div className="md:col-span-8 glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--electric)] to-[var(--cyan)] opacity-50" />
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white/50 text-xs uppercase tracking-widest flex items-center gap-2">
                <Network className="w-4 h-4" /> Primary Execution Thread
              </h2>
              <div className="px-2 py-1 bg-[var(--electric)]/20 text-[var(--cyan)] text-[10px] rounded border border-[var(--electric)]/30">PRIORITY_0</div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Multi-Tenant RAG Pipeline</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl font-sans">
              Currently engineering a high-throughput Retrieval-Augmented Generation system. Focusing on implementing strict exact-match payload filters in Qdrant to guarantee tenant data isolation before passing context to the LLM.
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
              <div>
                <div className="text-white/30 text-[10px] uppercase mb-1">Stack</div>
                <div className="text-white/70 text-sm">FastAPI, Qdrant, OpenAI</div>
              </div>
              <div>
                <div className="text-white/30 text-[10px] uppercase mb-1">Status</div>
                <div className="text-yellow-400 text-sm">Testing Semantic Cache</div>
              </div>
              <div>
                <div className="text-white/30 text-[10px] uppercase mb-1">ETA</div>
                <div className="text-white/70 text-sm">Sprint 42</div>
              </div>
            </div>
          </div>

          {/* System Load / Charts */}
          <div className="md:col-span-4 space-y-6 flex flex-col">
            <div className="glass flex-1 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <h2 className="text-white/50 text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4" /> Cognitive Load
              </h2>
              <div className="flex items-end gap-2 h-24 mt-auto">
                {[40, 65, 80, 45, 90, 75, pulse, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-[var(--electric)]/20 rounded-t-sm relative group">
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 bg-[var(--electric)] rounded-t-sm"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-white/30 mt-2">
                <span>T-7 DAYS</span>
                <span>NOW</span>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10">
              <h2 className="text-white/50 text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
                <HardDrive className="w-4 h-4" /> Deep Work Blocks
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">4.5<span className="text-lg text-white/40">hrs</span></span>
                <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
              </div>
              <div className="text-[10px] text-white/40 mt-2">Today's total uninterrupted focus time</div>
            </div>
          </div>

          {/* Activity Stream */}
          <div className="md:col-span-12 glass p-6 rounded-2xl border border-white/10 mt-6">
            <h2 className="text-white/50 text-xs uppercase tracking-widest flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4" /> Sub-Processes & Queue
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-[var(--cyan)] text-xs mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full animate-pulse" /> IN PROGRESS
                </div>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Building robust eval framework for the RAG output.</li>
                  <li>Migrating staging DB to Postgres 16.</li>
                </ul>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white/20 rounded-full" /> QUEUED
                </div>
                <ul className="space-y-3 text-sm text-white/50">
                  <li>Experiment with Llama 3 8B locally via Ollama.</li>
                  <li>Write RFC for event-driven webhook architecture.</li>
                </ul>
              </div>
              <div>
                <div className="text-green-400 text-xs mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> RECENTLY COMPLETED
                </div>
                <ul className="space-y-3 text-sm text-white/70 line-through opacity-50">
                  <li>Decouple auth service from monolith.</li>
                  <li>Implement rate limiting on public API.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
