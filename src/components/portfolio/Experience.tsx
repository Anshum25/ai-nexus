import { motion } from "framer-motion";
import { SectionHeading } from "./Timeline";

const ROLES = [
  {
    when: "2024 — Now",
    title: "AI Engineer · Enterprise",
    place: "Manufacturing sector",
    bullets: [
      "Built a multi-tenant RAG chatbot over live ERPNext data (Qdrant + FastAPI + Gemini).",
      "Designed role-aware SQL synthesis and guardrails; reduced hallucinations to <1% on eval set.",
      "Shipped Dockerized deployment with rolling updates and per-tenant isolation.",
    ],
  },
  {
    when: "2022 — 2024",
    title: "ERPNext / Frappe Engineer",
    place: "Multiple clients",
    bullets: [
      "Delivered 6 custom modules across production, quality, and dispatch.",
      "Cut manufacturing cycle time by ~30% via workflow automation.",
      "Integrated third-party APIs and hardware over REST + webhooks.",
    ],
  },
  {
    when: "2021 — 2022",
    title: "Full-Stack Engineer",
    place: "Product studio",
    bullets: [
      "Next.js + FastAPI apps with strict typing, testing, and observability.",
      "Design systems, marketing sites, and internal tools.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="Experience" title="Impact, not job descriptions." />
      <div className="mt-16 space-y-4">
        {ROLES.map((r, i) => (
          <motion.article
            key={r.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group grid grid-cols-1 gap-6 rounded-2xl glass p-6 transition-all duration-500 hover:glow-ring md:grid-cols-[220px_1fr] md:p-8"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--cyan)]">{r.when}</div>
              <div className="mt-2 text-sm text-muted-foreground">{r.place}</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold md:text-2xl">{r.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--electric)] shadow-[0_0_8px_var(--electric)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
