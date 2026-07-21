import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bookshelf')({
  component: BookshelfComponent,
});

function BookshelfComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Bookshelf.</h1>
          <p className="text-xl text-white/70">Engineering books, key lessons, and how I applied them.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-3xl border border-white/10 flex gap-6">
            <div className="w-32 h-48 bg-white/10 rounded border border-white/20 shadow-xl shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-1">Designing Data-Intensive Applications</h2>
              <p className="text-sm text-white/50 mb-4">Martin Kleppmann</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Fundamentally changed how I view database replication and eventual consistency. Applied these concepts when decoupling the ERP monolith to ensure event-driven state syncing didn't fail silently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
