import { motion } from "framer-motion";
import { Folder, ChevronRight, Lock } from "lucide-react";

interface ProjectDirectoryProps {
  onOpenProject: (id: string) => void;
}

export function ProjectDirectory({ onOpenProject }: ProjectDirectoryProps) {
  const filters = ["Artificial Intelligence", "Enterprise", "ERP", "Backend", "Frontend", "Research", "Open Source", "Experimental", "Production", "Archived"];
  
  const folders = [
    { id: "enterprise-ai", name: "Enterprise AI Assistant", status: "Production", active: true },
    { id: "chess-mentor", name: "Chess Mentor AI", status: "Development", active: false },
    { id: "erpnext-solutions", name: "ERPNext Solutions", status: "Production", active: false },
    { id: "skyerp", name: "SkyERP", status: "Design Phase", active: false },
    { id: "ai-research", name: "AI Research Lab", status: "Experimental", active: false },
  ];

  return (
    <div className="w-full">
      
      {/* Search System / Filters */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, i) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full border border-white/10 text-xs font-mono transition-colors ${i === 0 ? 'bg-white/10 text-[var(--foreground)]' : 'bg-transparent text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:bg-white/5'}`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Directory List */}
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 px-6 py-2 border-b border-white/10 text-[10px] font-mono text-[var(--foreground)]/30 uppercase tracking-widest">
          <div className="col-span-8 md:col-span-6">Name</div>
          <div className="hidden md:block col-span-4">Access Level</div>
          <div className="col-span-4 md:col-span-2 text-right">Status</div>
        </div>

        {folders.map((folder, i) => (
          <motion.button
            key={folder.id}
            onClick={() => onOpenProject(folder.id)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-full grid grid-cols-12 gap-4 px-6 py-4 items-center rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group text-left"
          >
            <div className="col-span-8 md:col-span-6 flex items-center gap-4">
              <Folder className="w-5 h-5 text-[var(--cyan)] opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="font-semibold text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] transition-colors">{folder.name}</span>
            </div>
            <div className="hidden md:flex col-span-4 items-center gap-2">
              <Lock className="w-3 h-3 text-[var(--foreground)]/30" />
              <span className="text-xs font-mono text-[var(--foreground)]/40">Level 4 Authorized</span>
            </div>
            <div className="col-span-4 md:col-span-2 flex justify-end items-center gap-3">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${folder.status === 'Production' ? 'text-green-400' : 'text-[var(--foreground)]/40'}`}>
                {folder.status}
              </span>
              <ChevronRight className="w-4 h-4 text-[var(--foreground)]/20 group-hover:text-[var(--foreground)] group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>

    </div>
  );
}
