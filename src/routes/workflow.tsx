import { createFileRoute } from '@tanstack/react-router';
import { Lightbulb, Code2, Rocket, Server, Activity, Database, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/workflow')({
  component: WorkflowComponent,
});

const WORKFLOW_STEPS = [
  {
    title: "1. The Inception",
    icon: Lightbulb,
    desc: "Problem definition and domain boundary mapping.",
    details: "I don't write code on day one. I write RFCs. I map out exactly what business value this feature provides and define the bounded contexts. If we don't know the exact inputs and expected outputs, engineering is just guessing."
  },
  {
    title: "2. Architecture Design",
    icon: Server,
    desc: "System topology, database schemas, and API contracts.",
    details: "I draw it out. Which database fits the query pattern? Will this need to scale horizontally? I define OpenAPI specs or GraphQL schemas first, so frontend and backend can work in parallel immediately."
  },
  {
    title: "3. Core Implementation",
    icon: Code2,
    desc: "Writing boring, maintainable, and typed code.",
    details: "No clever tricks. Strict typing (TypeScript/Pydantic), exhaustive error handling, and robust logging. The code should read like a story, and the business logic must remain completely decoupled from the framework."
  },
  {
    title: "4. Autonomous Validation",
    icon: CheckCircle2,
    desc: "Unit, integration, and end-to-end testing.",
    details: "Coverage isn't just a vanity metric. If a pipeline breaks, the CI/CD runner should catch it before it ever hits staging. I rely heavily on pytest for Python and Vitest for TS/React."
  },
  {
    title: "5. Production Deployment",
    icon: Rocket,
    desc: "Containerized, orchestrated, and zero-downtime.",
    details: "Everything is containerized via Docker. Configurations are injected via environment variables. Infrastructure is defined as code (Terraform) and deployments are automated via GitHub Actions."
  },
  {
    title: "6. Observability",
    icon: Activity,
    desc: "Metrics, tracing, and alerts.",
    details: "You cannot manage what you cannot measure. Datadog or Prometheus/Grafana stacks are essential. I instrument critical paths so when P99 latency spikes, I get a Slack alert, not a customer complaint."
  }
];

function WorkflowComponent() {
  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Execution Workflow.</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            From raw domain problem to monitored production system. Predictable software delivery requires a disciplined framework.
          </p>
        </header>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--electric)] to-transparent -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step.title} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Visual Side */}
                <div className={`w-full md:w-1/2 flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="glass p-8 rounded-3xl border border-[var(--electric)]/30 w-full max-w-sm relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <step.icon className="w-12 h-12 text-[var(--cyan)] mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[var(--electric)] font-mono text-sm">{step.desc}</p>
                  </div>
                </div>

                {/* Center Node (hidden on mobile) */}
                <div className="hidden md:flex w-12 h-12 rounded-full bg-background border-2 border-[var(--cyan)] items-center justify-center z-10 shadow-[0_0_20px_var(--cyan)]">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 text-white/70 text-lg leading-relaxed px-4 md:px-8">
                  {step.details}
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
