import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cloud, Network, Shield, Cpu, RefreshCw, Layers } from 'lucide-react';

export function ArchitectureBuilder() {
  const components = [
    { id: 'api', label: 'API Gateway', icon: Network, color: 'text-blue-400', border: 'border-blue-400' },
    { id: 'auth', label: 'Authentication', icon: Shield, color: 'text-yellow-400', border: 'border-yellow-400' },
    { id: 'db', label: 'PostgreSQL', icon: Database, color: 'text-blue-500', border: 'border-blue-500' },
    { id: 'redis', label: 'Redis Cache', icon: RefreshCw, color: 'text-red-500', border: 'border-red-500' },
    { id: 'worker', label: 'Worker Node', icon: Cpu, color: 'text-green-400', border: 'border-green-400' },
    { id: 'llm', label: 'LLM Engine', icon: Cloud, color: 'text-[var(--electric)]', border: 'border-[var(--electric)]' },
    { id: 'storage', label: 'S3 Storage', icon: Layers, color: 'text-orange-400', border: 'border-orange-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="mb-6 max-w-2xl">
        <h2 className="text-3xl font-mono uppercase tracking-tight text-[var(--foreground)] mb-2">Architecture Builder</h2>
        <p className="text-[var(--foreground)]/50 text-sm">Drag and drop components to the blueprint canvas to visualize system topography.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[500px]">
        {/* Toolbox */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-3">
          <div className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest mb-2">Available Nodes</div>
          {components.map(comp => (
            <motion.div
              key={comp.id}
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
              className={`bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3 cursor-grab hover:bg-white/10 transition-colors backdrop-blur-md`}
            >
              <div className={`w-8 h-8 rounded border ${comp.border} bg-black/50 flex items-center justify-center shrink-0`}>
                <comp.icon className={`w-4 h-4 ${comp.color}`} />
              </div>
              <span className="text-xs font-mono text-[var(--foreground)]/80">{comp.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-black/60 border border-[var(--cyan)]/20 rounded-2xl relative overflow-hidden flex items-center justify-center">
          {/* Blueprint Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <Server className="w-16 h-16 text-[var(--foreground)]/10 mx-auto mb-4" />
            <div className="font-mono text-[var(--foreground)]/20 uppercase tracking-widest text-sm">Drag components here</div>
            <div className="font-mono text-[var(--foreground)]/10 uppercase tracking-widest text-[10px] mt-2">Connecting lines auto-generate in v2.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
