import { motion } from 'framer-motion';

export function ElevatorNavigation({ floors, activeFloor, setFloor }: { floors: any[], activeFloor: number, setFloor: (i: number) => void }) {
  return (
    <div className="hidden lg:flex w-64 shrink-0 border-r border-[var(--border)] h-screen sticky top-0 bg-[var(--background)] flex-col py-32 px-8 z-50">
      
      <div className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest mb-12">
        Building Directory //
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2 relative">
        {/* Elevator Shaft Line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-px bg-[var(--border)]" />

        {floors.map((floor, i) => {
          const isActive = activeFloor === i;
          
          return (
            <button
              key={floor.id}
              onClick={() => {
                document.getElementById(`company-${floor.id}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative flex items-center gap-6 py-4 text-left transition-all"
            >
              {/* Floor Indicator Node */}
              <div className="relative flex items-center justify-center shrink-0 z-10">
                <div className={`w-6 h-6 rounded bg-[var(--background)] border transition-all duration-500 ${isActive ? 'border-[var(--accent)]' : 'border-[var(--border)] group-hover:border-[var(--muted-foreground)]'}`} />
                <div className={`absolute w-2 h-2 rounded-sm transition-all duration-500 ${isActive ? 'bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]' : 'bg-transparent'}`} />
              </div>

              {/* Floor Label */}
              <div className="flex flex-col">
                <div className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'}`}>
                  Floor {String(i + 1).padStart(2, '0')}
                </div>
                <div className={`font-bold font-mono text-xs uppercase tracking-widest transition-all duration-500 ${isActive ? 'text-[var(--foreground)] scale-105 origin-left' : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'}`}>
                  {floor.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-4" />
        <div className="text-[10px] font-mono text-center text-[var(--muted-foreground)] uppercase tracking-widest">
          Scroll to explore
        </div>
      </div>

    </div>
  );
}
