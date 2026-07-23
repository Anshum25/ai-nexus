import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert, AlertTriangle, XCircle, Info, ArrowRight, Server, Database, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { DiscoverabilityDrawer } from '../components/portfolio/DiscoverabilityDrawer';

export const Route = createFileRoute('/failure-museum')({
  component: FailureMuseumComponent,
});

function FailureMuseumComponent() {
  return (
    <div className="pt-24 pb-32 bg-[#111111] min-h-screen">
      
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6 border border-red-500/30">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-serif">The Failure Museum</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
            An exhibition of architectural mistakes, catastrophic deployments, and the painful lessons extracted from the wreckage.
          </p>
        </header>

        {/* Exhibit 1: Postgres Crash */}
        <div className="relative flex flex-col md:flex-row gap-12 items-center mb-40 group">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-video bg-[#0a0a0a] border-8 border-[#222] rounded shadow-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden group-hover:border-red-900/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-900" />
              <XCircle className="w-16 h-16 text-red-600/50 mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-mono text-red-500/70 text-center">
                ERROR: connection to server at "db-pool-1"<br/>
                failed: FATAL: too many clients already
              </div>
            </div>
            {/* Exhibit Plaque */}
            <div className="absolute -bottom-6 -right-6 bg-[#222] border-2 border-[#444] p-4 shadow-xl max-w-xs transform rotate-3">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center justify-between">
                Exhibit 001 <Info className="w-3 h-3" />
              </div>
              <div className="font-serif text-sm text-white/80">The Serverless Postgres Crash</div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">The Serverless Connection Crash</h2>
            <div className="flex gap-2 mb-6">
              <span className="px-2 py-1 bg-white/5 text-white/50 text-xs font-mono rounded border border-white/10">AWS Lambda</span>
              <span className="px-2 py-1 bg-white/5 text-white/50 text-xs font-mono rounded border border-white/10">PostgreSQL</span>
            </div>
            
            <div className="space-y-4 text-white/70 leading-relaxed mb-6">
              <p>
                In an early attempt to migrate a legacy Python service to AWS Lambda, I connected directly to an RDS Postgres instance. I assumed Lambda's auto-scaling was magic. It was, until a traffic spike occurred.
              </p>
              <p>
                1,000 concurrent Lambdas spun up instantly. Each one opened a new TCP connection to Postgres. The database exhausted its `max_connections` limit in under 2 seconds, completely taking down the entire application stack.
              </p>
            </div>
            
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-red-400 font-bold text-sm mb-1 uppercase tracking-wider">The Lesson</h4>
              <p className="text-red-300/80 text-sm">Serverless compute scales infinitely. Relational databases do not. You must always use a connection pooler (like PgBouncer or RDS Proxy) between ephemeral compute and persistent relational storage.</p>
            </div>
          </div>
        </div>


        {/* Exhibit 2: Cache Stampede */}
        <div className="relative flex flex-col md:flex-row-reverse gap-12 items-center mb-40 group">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-video bg-[#0a0a0a] border-8 border-[#222] rounded shadow-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden group-hover:border-red-900/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-900" />
              <Activity className="w-16 h-16 text-red-600/50 mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-mono text-red-500/70 text-center text-xs">
                Redis OOM command not allowed when used memory &gt; 'maxmemory'.<br/>
                [CPU at 100%]
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#222] border-2 border-[#444] p-4 shadow-xl max-w-xs transform -rotate-3">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-1 flex items-center justify-between">
                Exhibit 002 <Info className="w-3 h-3" />
              </div>
              <div className="font-serif text-sm text-white/80">The Black Friday Cache Stampede</div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">The Black Friday Cache Stampede</h2>
            <div className="flex gap-2 mb-6">
              <span className="px-2 py-1 bg-white/5 text-white/50 text-xs font-mono rounded border border-white/10">Redis</span>
              <span className="px-2 py-1 bg-white/5 text-white/50 text-xs font-mono rounded border border-white/10">Node.js</span>
            </div>
            
            <div className="space-y-4 text-white/70 leading-relaxed mb-6">
              <p>
                We deployed a Redis cache layer for the product catalog API to handle Black Friday traffic. The cache key expired exactly at midnight.
              </p>
              <p>
                At 00:00:01, the key expired. Simultaneously, 5,000 active users requested the catalog. Since the cache was empty, all 5,000 requests bypassed Redis and hit the primary database at the exact same millisecond. The database CPU pegged at 100% and died.
              </p>
            </div>
            
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-red-400 font-bold text-sm mb-1 uppercase tracking-wider">The Lesson</h4>
              <p className="text-red-300/80 text-sm">Always implement cache-locking or probabilistic early expiration (XFetch) for highly contested keys. Only one process should be allowed to rebuild the cache, while others wait or serve stale data.</p>
            </div>
          </div>
        </div>

        <DiscoverabilityDrawer 
          recommendations={[
            { title: "Architecture Atlas", desc: "View the updated scalable Redis caching architecture.", route: "/architecture-atlas", icon: Box },
            { title: "Research Vault", desc: "Read the classified paper on probabilistic cache expiration.", route: "/research-vault", icon: ShieldAlert },
            { title: "Decision Room", desc: "Read ADR-012: Adopting RDS Proxy for Lambda.", route: "/decision-room", icon: BookOpen }
          ]} 
        />

      </div>
    </div>
  );
}

// Re-using icon
import { Activity } from 'lucide-react';
