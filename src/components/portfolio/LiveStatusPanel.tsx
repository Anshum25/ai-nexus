import { Activity } from "lucide-react";

export function LiveStatusPanel() {
  return (
    <div className="absolute bottom-12 left-6 md:left-12 glass p-4 rounded-2xl w-64 text-xs z-30 font-mono transition-transform hover:-translate-y-1">
      <div className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 border-b border-white/5 pb-2">
        <Activity className="h-3 w-3 text-[var(--electric)]" />
        <span className="uppercase tracking-widest text-[10px]">Live Status</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-[var(--foreground)]/40 mb-1">Current Focus</div>
          <div className="text-[var(--foreground)]">Building Enterprise AI Systems</div>
        </div>

        <div>
          <div className="text-[var(--foreground)]/40 mb-1">Availability</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)] shadow-[0_0_8px_var(--electric)] animate-pulse" />
            <span className="text-[var(--foreground)]">Open to Opportunities</span>
          </div>
        </div>

        <div>
          <div className="text-[var(--foreground)]/40 mb-1">Latest Project</div>
          <div className="text-[var(--cyan)]">Enterprise AI Chatbot</div>
        </div>
      </div>
    </div>
  );
}
