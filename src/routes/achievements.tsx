import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/achievements')({
  component: AchievementsComponent,
});

function AchievementsComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Achievements.</h1>
          <p className="text-xl text-white/70">Milestones, Open Source, and Technical wins.</p>
        </header>
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[var(--electric)]">Open Source Contributions</h2>
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="font-bold text-lg mb-2">Frappe Framework Core</h3>
              <p className="text-white/70">Merged PR to optimize the database query compiler for bulk inserts, reducing latency by 15% for large data syncs.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
