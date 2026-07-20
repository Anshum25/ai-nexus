import { motion } from "framer-motion";
import { SectionHeading } from "./Timeline";

const TECH = [
  "Python", "FastAPI", "Next.js", "React", "TypeScript",
  "Qdrant", "Postgres", "Docker", "ERPNext", "Frappe",
  "OpenAI", "Gemini", "LangGraph", "Tailwind", "Git",
];

export function TechOrbit() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="Stack" title="Tools I actually ship with." />

      <div className="relative mt-20 flex items-center justify-center">
        <div className="relative aspect-square w-full max-w-[560px]">
          {/* rings */}
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              className="absolute inset-0 rounded-full border border-white/10"
              style={{ transform: `scale(${0.42 + r * 0.18})` }}
            />
          ))}

          {/* center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl glass glow-ring">
              <motion.div
                className="absolute inset-1 rounded-xl"
                style={{ background: "conic-gradient(from 0deg, var(--electric), var(--cyan), var(--indigo-glow), var(--electric))" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10 rounded-xl bg-background/80 px-4 py-2 font-mono text-sm font-semibold">AI</div>
            </div>
          </div>

          {TECH.map((t, i) => {
            const ring = i % 3; // 0,1,2
            const items = TECH.filter((_, k) => k % 3 === ring).length;
            const idxInRing = Math.floor(i / 3);
            const angle = (idxInRing / items) * Math.PI * 2;
            const radius = (0.42 + (ring + 1) * 0.18) * 280;
            return (
              <div
                key={t}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))` }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="cursor-default rounded-full glass px-3 py-1.5 text-xs font-mono text-foreground/85 hover:text-foreground hover:glow-ring"
                >
                  {t}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
