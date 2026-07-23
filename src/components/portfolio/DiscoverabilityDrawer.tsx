import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Compass, Box, Terminal, Database, ShieldAlert, Network, BookOpen } from 'lucide-react';

interface Recommendation {
  title: string;
  desc: string;
  route: string;
  icon: any;
}

export function DiscoverabilityDrawer({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="mt-32 pt-16 border-t border-white/10 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 py-2 border border-white/10 rounded-full flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
        <Compass className="w-4 h-4" /> Continue Exploring
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, i) => (
          <Link
            key={rec.route}
            to={rec.route}
            className="group block bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:bg-white/5 hover:border-[var(--electric)] transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[var(--electric)]/20 group-hover:text-[var(--cyan)] transition-colors">
                <rec.icon className="w-5 h-5 text-white/40 group-hover:text-[var(--cyan)] transition-colors" />
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[var(--cyan)] transition-colors" />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">{rec.title}</h3>
            <p className="text-sm text-white/50 relative z-10">{rec.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
