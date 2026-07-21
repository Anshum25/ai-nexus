import { createFileRoute } from '@tanstack/react-router';
import { GitCommit, GitMerge, GitBranch, GitPullRequest } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/timeline')({
  component: TimelineGitComponent,
});

const COMMITS = [
  {
    id: "a1b2c3d",
    type: "init",
    date: "May 2021",
    message: "Initial commit: B.S. Computer Science",
    details: "Graduated with honors. Heavy focus on Systems Architecture and Data Structures.",
    branch: "main",
    icon: GitCommit
  },
  {
    id: "f4e5d6c",
    type: "branch",
    date: "Aug 2021",
    message: "checkout -b backend-engineering",
    details: "Started career focusing on monolithic architectures and relational databases.",
    branch: "backend",
    icon: GitBranch
  },
  {
    id: "b7c8d9e",
    type: "commit",
    date: "2022 - 2023",
    message: "feat(erp): scale enterprise resource planning monolith",
    details: "Maintained and scaled Frappe/ERPNext systems for manufacturing clients. Learned the hard way why database indexes matter.",
    branch: "backend",
    icon: GitCommit
  },
  {
    id: "x1y2z3a",
    type: "branch",
    date: "Jan 2024",
    message: "checkout -b artificial-intelligence",
    details: "Started exploring LLMs, vector databases, and semantic search independently.",
    branch: "ai",
    icon: GitBranch
  },
  {
    id: "p9q8r7s",
    type: "merge",
    date: "Nov 2024",
    message: "Merge branch 'artificial-intelligence' into 'backend-engineering'",
    details: "Realized that AI is just another component of backend architecture. Began building AI-augmented enterprise tools.",
    branch: "main",
    icon: GitMerge
  },
  {
    id: "m4n5b6v",
    type: "pr",
    date: "Present",
    message: "Lead AI Engineer role",
    details: "Currently architecting multi-tenant RAG pipelines and autonomous agents for enterprise deployment.",
    branch: "main",
    icon: GitPullRequest
  }
];

function TimelineGitComponent() {
  return (
    <div className="pt-24 pb-32 bg-[#050505] min-h-screen font-mono">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white">git log --oneline --graph</h1>
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Execution History & Branch Merges
          </p>
        </header>

        <div className="relative">
          {/* Main trunk line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-white/10" />

          <div className="space-y-8">
            {COMMITS.map((commit, i) => (
              <motion.div 
                key={commit.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16 group"
              >
                {/* Node */}
                <div className={`absolute left-4 top-1 w-8 h-8 rounded-full border-2 bg-[#050505] flex items-center justify-center z-10 transition-colors
                  ${commit.branch === 'main' ? 'border-[var(--electric)] text-[var(--cyan)] group-hover:bg-[var(--electric)]/20' : 
                    commit.branch === 'backend' ? 'border-green-500 text-green-400 group-hover:bg-green-500/20' : 
                    'border-purple-500 text-purple-400 group-hover:bg-purple-500/20'}
                `}>
                  <commit.icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="glass p-6 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-yellow-500 font-bold">{commit.id}</span>
                    <span className="text-white/40 text-xs">({commit.date})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider
                      ${commit.branch === 'main' ? 'bg-[var(--electric)]/20 text-[var(--cyan)] border border-[var(--electric)]/30' : 
                        commit.branch === 'backend' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'}
                    `}>
                      {commit.branch}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{commit.message}</h3>
                  <p className="text-white/60 font-sans text-sm leading-relaxed">{commit.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* End of log */}
          <div className="pl-16 mt-8 flex items-center gap-4 text-white/30 text-sm">
            <span className="animate-pulse">_</span>
            (END)
          </div>

        </div>
      </div>
    </div>
  );
}
