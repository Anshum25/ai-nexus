import { createFileRoute } from '@tanstack/react-router';
import { PenTool, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/journal')({
  component: JournalComponent,
});

function JournalComponent() {
  return (
    <div className="pt-24 pb-32 bg-[var(--background)] min-h-screen text-amber-900 font-serif selection:bg-amber-900/20">
      
      {/* Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />
           
      {/* Notebook Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0" 
           style={{ backgroundImage: 'linear-gradient(transparent 95%, #8B4513 100%)', backgroundSize: '100% 32px', marginTop: '4px' }} />
           
      {/* Red margin line */}
      <div className="fixed left-8 md:left-24 top-0 bottom-0 w-px bg-red-800/30 z-0 pointer-events-none" />
      <div className="fixed left-9 md:left-25 top-0 bottom-0 w-px bg-red-800/30 z-0 pointer-events-none" />

      <div className="container mx-auto px-12 md:px-32 max-w-4xl relative z-10 pt-16">
        
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 opacity-80" style={{ fontFamily: 'Caveat, cursive' }}>Engineering Journal</h1>
          <p className="text-xl opacity-60 italic">
            Thoughts scribbled between deployments.
          </p>
        </header>

        <div className="space-y-24">
          {/* Entry 1 */}
          <article className="relative">
            <div className="text-sm opacity-50 mb-4" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem' }}>October 12th, 2025</div>
            <h2 className="text-3xl font-bold mb-6 opacity-90 leading-tight">The myth of "stateless" services</h2>
            
            <div className="space-y-6 text-lg leading-loose opacity-80">
              <p>
                We spent three months breaking the monolith into stateless microservices. It was the "best practice." But here's the dirty secret nobody tells you: 
                <span className="bg-yellow-200/50 px-1 ml-1" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem' }}>complexity doesn't disappear; it just shifts to the network.</span>
              </p>
              <p>
                Now, instead of a clean local transaction rollback, we have distributed sagas, dead letter queues, and eventual consistency nightmares. The code is "cleaner," but the infrastructure is a chaotic web. 
              </p>
              <p>
                If I had to do it again, I would have built a modular monolith first. Keep the logic separated by domain, but keep the deployment unit singular until the database is screaming for help.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between border-t border-amber-900/20 pt-4">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-amber-900/5 rounded-full text-xs opacity-60 uppercase tracking-widest border border-amber-900/10">Architecture</span>
                <span className="px-3 py-1 bg-amber-900/5 rounded-full text-xs opacity-60 uppercase tracking-widest border border-amber-900/10">Microservices</span>
              </div>
              <button className="flex items-center gap-2 text-amber-900/70 hover:text-amber-900 transition-colors uppercase text-xs tracking-widest font-bold">
                Read Full Entry <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>

      </div>
    </div>
  );
}
