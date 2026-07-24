import { motion } from 'framer-motion';
import { Terminal, Database, Box, Zap, FlaskConical, GitMerge } from 'lucide-react';

export function ShellLab({ title, desc, icon: Icon, color }: { title: string, desc: string, icon: any, color: string }) {
  return (
    <div className="w-full h-full flex flex-col p-6 items-center justify-center text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 relative"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]" />
        <Icon className={`w-10 h-10 ${color}`} />
      </motion.div>
      <h2 className="text-2xl font-mono uppercase tracking-tight text-[var(--foreground)] mb-3">{title}</h2>
      <p className="text-[var(--foreground)]/50 text-sm max-w-sm mb-8">{desc}</p>
      
      <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/30">
        Module loading sequence initialized...
      </div>
    </div>
  );
}

// Exports for lazy loading mapping
export const RAGVisualizer = () => <ShellLab title="RAG Visualizer" desc="Interactive visualizer mapping high-dimensional vector similarities to chunk retrieval." icon={GitMerge} color="text-purple-400" />;
export const ApiExplorer = () => <ShellLab title="API Explorer" desc="Live Swagger-style interface executing actual endpoint calls against the internal sandbox." icon={Terminal} color="text-green-400" />;
export const DatabaseExplorer = () => <ShellLab title="Database Explorer" desc="Visual ER diagram with animated relationships and live schema introspection." icon={Database} color="text-blue-400" />;
export const DockerLab = () => <ShellLab title="Docker Lab" desc="Visual Docker compose simulation demonstrating internal network traffic routing." icon={Box} color="text-[#0db7ed]" />;
export const PerformanceLab = () => <ShellLab title="Performance Lab" desc="A/B testing environment comparing unoptimized queries against Redis-cached outputs." icon={Zap} color="text-yellow-400" />;
export const Experiments = () => <ShellLab title="Experiments" desc="Unpublished research, future AI prototypes, and unfinished engineering notes." icon={FlaskConical} color="text-pink-400" />;
