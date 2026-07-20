import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { SectionHeading } from "./Timeline";

type Project = {
  name: string;
  tag: string;
  summary: string;
  stack: string[];
  metric: string;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    name: "TRMS Enterprise AI Chatbot",
    tag: "RAG · Multi-tenant",
    summary:
      "Role-aware chatbot over live ERPNext data — intent routing, SQL synthesis, vector recall, guardrails.",
    stack: ["FastAPI", "Qdrant", "Gemini", "ERPNext", "Docker"],
    metric: "40× faster answers vs manual reports",
    accent: "from-[var(--electric)] to-[var(--indigo-glow)]",
  },
  {
    name: "Chess Mentor AI",
    tag: "Realtime Coach",
    summary:
      "Live game analysis, position evaluation, and natural-language coaching from your own play.",
    stack: ["Next.js", "Stockfish", "Python", "WebSockets"],
    metric: "sub-200ms move insight",
    accent: "from-[var(--cyan)] to-[var(--electric)]",
  },
  {
    name: "ERPNext Custom Suite",
    tag: "Frappe · Manufacturing",
    summary:
      "Quality, production, and dispatch workflows tuned for a 200+ user manufacturing floor.",
    stack: ["Frappe", "Python", "MariaDB", "REST"],
    metric: "6 modules · 30% cycle-time cut",
    accent: "from-[var(--indigo-glow)] to-[var(--cyan)]",
  },
  {
    name: "SkyERP Platform Site",
    tag: "Marketing · CMS",
    summary:
      "Design system, animations, and headless CMS for a B2B ERP product launch.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    metric: "98 Lighthouse across the board",
    accent: "from-[var(--electric)] to-[var(--cyan)]",
  },
  {
    name: "AI Learning Engine",
    tag: "Agents · Curriculum",
    summary:
      "Personalized learning agent that plans, teaches, and evaluates using tool use + memory.",
    stack: ["LangGraph", "Postgres", "OpenAI"],
    metric: "in production preview",
    accent: "from-[var(--indigo-glow)] to-[var(--electric)]",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="Selected Work" title="Systems shipped, not just prototypes." />
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.name} project={p} large={i === 0} />
        ))}
      </div>
    </section>
  );
}

function TiltCard({ project, large }: { project: Project; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-2xl glass p-8 transition-shadow duration-500 hover:glow-ring ${large ? "md:col-span-2 md:p-12" : ""}`}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--electric) 18%, transparent), transparent 60%)",
        }}
      />
      <div className={`absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${project.accent} opacity-20 blur-3xl`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--cyan)]">{project.tag}</span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <h3 className={`mt-4 font-semibold tracking-tight ${large ? "text-4xl md:text-5xl" : "text-2xl"}`}>{project.name}</h3>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-foreground/80">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-foreground/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--electric)] shadow-[0_0_10px_var(--electric)]" />
          {project.metric}
        </div>
      </div>
    </motion.div>
  );
}
