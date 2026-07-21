import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resources')({
  component: ResourcesComponent,
});

function ResourcesComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Resources.</h1>
          <p className="text-xl text-white/70">Recommended blogs, courses, and communities.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-2">Latent Space Podcast</h3>
            <p className="text-white/60 text-sm mb-4">The best pulse on the AI Engineering ecosystem right now.</p>
            <a href="#" className="text-[var(--cyan)] font-mono text-xs uppercase tracking-widest hover:underline">Listen Now ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
