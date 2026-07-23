import { createFileRoute } from '@tanstack/react-router';
import { BookOpen, Check, X, FileText, Calendar, User, Network, Server, Database, ShieldAlert } from 'lucide-react';
import { DiscoverabilityDrawer } from '../components/portfolio/DiscoverabilityDrawer';

export const Route = createFileRoute('/decision-room')({
  component: DecisionRoomComponent,
});

function DecisionRoomComponent() {
  return (
    <div className="pt-24 pb-32 bg-zinc-50 min-h-screen text-zinc-900">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Architecture Decision Records</h1>
          <p className="text-xl text-zinc-500 max-w-2xl">
            A log of significant architectural decisions. Memory fades, but ADRs remain.
          </p>
        </header>

        <div className="space-y-12">
          
          {/* ADR 1 */}
          <article className="bg-white p-8 border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <header className="border-b border-zinc-100 pb-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">ADR 004: Migrating from REST to tRPC for Internal Tools</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">ACCEPTED</span>
              </div>
              <div className="flex gap-6 text-sm text-zinc-500 font-mono">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 2025-10-12</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> Lead Arch</span>
              </div>
            </header>

            <div className="space-y-6 prose prose-zinc max-w-none">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-zinc-400" /> Context</h3>
                <p className="text-zinc-600">Our internal React dashboards communicate with our Node backend via standard REST APIs. Due to rapid iterations, frontend developers constantly face runtime errors because the backend API responses change without frontend types being updated.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-zinc-400" /> Decision</h3>
                <p className="text-zinc-600">We will adopt <strong>tRPC</strong> for all internal dashboard-to-backend communication. Since our stack is entirely TypeScript (React + Node), tRPC allows us to share types directly across the boundary without generating OpenAPI specs.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-100">
                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2"><Check className="w-4 h-4" /> Positive Consequences</h4>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>End-to-end type safety.</li>
                    <li>Zero build step for API clients.</li>
                    <li>Frontend build fails if backend breaks contract.</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-md border border-red-100">
                  <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2"><X className="w-4 h-4" /> Negative Consequences</h4>
                  <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                    <li>Locks us into TypeScript for both ends.</li>
                    <li>Cannot easily be consumed by external non-TS clients.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>


          {/* ADR 2 */}
          <article className="bg-white p-8 border border-zinc-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <header className="border-b border-zinc-100 pb-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">ADR 008: Choosing Apache Kafka over RabbitMQ for Event Streaming</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">ACCEPTED</span>
              </div>
              <div className="flex gap-6 text-sm text-zinc-500 font-mono">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 2026-02-15</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> Systems Arch</span>
              </div>
            </header>

            <div className="space-y-6 prose prose-zinc max-w-none">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-zinc-400" /> Context</h3>
                <p className="text-zinc-600">The monolithic backend is being decomposed into domain-driven microservices. We need a reliable messaging backbone to handle asynchronous events (e.g., UserCreated, OrderPlaced). We evaluated RabbitMQ (AMQP) and Apache Kafka.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-zinc-400" /> Decision</h3>
                <p className="text-zinc-600">We will use <strong>Apache Kafka</strong>. While RabbitMQ offers better complex routing (fanout, topic exchanges) out of the box, our primary requirement is <em>event replayability</em>. New microservices coming online in the future must be able to replay historical events from the beginning of time to build their own materialized views.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-100">
                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2"><Check className="w-4 h-4" /> Positive Consequences</h4>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>Persistent, replayable event log.</li>
                    <li>Extremely high throughput for analytical pipelines.</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-md border border-red-100">
                  <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2"><X className="w-4 h-4" /> Negative Consequences</h4>
                  <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                    <li>High operational overhead (Zookeeper/KRaft management).</li>
                    <li>Requires strict schema evolution management (Avro/Protobuf).</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

        </div>

        <DiscoverabilityDrawer 
          recommendations={[
            { title: "Architecture Atlas", desc: "View the Event-Driven Microservices topology.", route: "/architecture-atlas", icon: Network },
            { title: "Engineering Archive", desc: "Case Study: Scaling Kafka to 1M events/sec.", route: "/archive", icon: Database },
            { title: "Failure Museum", desc: "Exhibit: The Great RabbitMQ Message Loss of 2024.", route: "/failure-museum", icon: ShieldAlert }
          ]} 
        />

      </div>
    </div>
  );
}
