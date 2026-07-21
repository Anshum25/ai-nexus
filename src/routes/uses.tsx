import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/uses')({
  component: UsesComponent,
});

function UsesComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Tools I Use.</h1>
          <p className="text-xl text-white/70">The exact stack I rely on daily, and why.</p>
        </header>
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-[var(--electric)] mb-2">Cursor (IDE)</h2>
            <p className="text-white/80">Replaced VS Code. The deep codebase contextualization saves hours of boilerplate generation and context switching.</p>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-[var(--electric)] mb-2">Docker</h2>
            <p className="text-white/80">Every project starts with a `docker-compose.yml`. 'It works on my machine' is not a valid excuse in 2026.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
