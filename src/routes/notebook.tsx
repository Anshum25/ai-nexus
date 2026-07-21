import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/notebook')({
  component: NotebookComponent,
});

function NotebookComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Notebook.</h1>
          <p className="text-xl text-white/70">Raw, chronological engineering observations.</p>
        </header>
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/10">
            <div className="text-sm font-mono text-[var(--cyan)] mb-4">Observation • July 20, 2026</div>
            <h2 className="text-2xl font-bold mb-4">Prompt Caching is the new Redis</h2>
            <p className="text-white/70">When dealing with autonomous agents, standard Redis caching fails because prompts are highly dynamic. We need semantic caching...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
