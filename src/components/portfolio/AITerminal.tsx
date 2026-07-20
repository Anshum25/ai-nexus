import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./Timeline";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = `Available commands:
  help        Show this help
  about       Who I am
  projects    List selected work
  stack       Tech I ship with
  experience  Roles &amp; impact
  resume      Download my resume
  github      Open my GitHub
  linkedin    Open my LinkedIn
  hire        Start a conversation
  clear       Clear the terminal`;

function run(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  if (c === "help") return [{ kind: "sys", text: HELP }];
  if (c === "about")
    return [{ kind: "sys", text: "AI &amp; software engineer. I build RAG systems, agents, and ERPNext platforms that ship to production." }];
  if (c === "projects")
    return [{ kind: "sys", text: "• TRMS Enterprise AI Chatbot\n• Chess Mentor AI\n• ERPNext Custom Suite\n• SkyERP Platform Site\n• AI Learning Engine" }];
  if (c === "stack")
    return [{ kind: "sys", text: "Python · FastAPI · Next.js · Qdrant · ERPNext · Docker · OpenAI · Gemini" }];
  if (c === "experience")
    return [{ kind: "sys", text: "Enterprise AI @ manufacturing · ERPNext platform lead · Full-stack AI consultant" }];
  if (c === "resume") { if (typeof window !== "undefined") window.open("/resume.pdf", "_blank"); return [{ kind: "sys", text: "Opening resume…" }]; }
  if (c === "github") { if (typeof window !== "undefined") window.open("https://github.com", "_blank"); return [{ kind: "sys", text: "Opening GitHub…" }]; }
  if (c === "linkedin") { if (typeof window !== "undefined") window.open("https://linkedin.com", "_blank"); return [{ kind: "sys", text: "Opening LinkedIn…" }]; }
  if (c === "hire") { if (typeof window !== "undefined") window.location.href = "mailto:hello@example.com?subject=Let%27s%20build%20something"; return [{ kind: "sys", text: "Drafting email…" }]; }
  if (c === "clear") return [{ kind: "sys", text: "__CLEAR__" }];
  return [{ kind: "sys", text: `command not found: ${cmd}. try \"help\".` }];
}

export function AITerminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: "welcome to portfolio.os — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = run(input);
    if (out.length && out[0].text === "__CLEAR__") {
      setLines([]);
    } else {
      setLines((l) => [...l, { kind: "in", text: input }, ...out]);
    }
    setInput("");
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="Contact" title="Open a terminal. Start a conversation." />
      <div className="mt-12 overflow-hidden rounded-2xl glass">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">~/portfolio — zsh</span>
        </div>
        <div className="max-h-[420px] overflow-y-auto p-6 font-mono text-sm leading-relaxed">
          {lines.map((l, i) => (
            <div key={i} className={l.kind === "in" ? "text-foreground" : "text-foreground/75"}>
              {l.kind === "in" ? (
                <div><span className="text-[var(--electric)]">➜</span>{" "}<span className="text-[var(--cyan)]">~</span>{" "}{l.text}</div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-foreground/75" dangerouslySetInnerHTML={{ __html: l.text }} />
              )}
            </div>
          ))}
          <form onSubmit={submit} className="mt-2 flex items-center gap-2">
            <span className="text-[var(--electric)]">➜</span>
            <span className="text-[var(--cyan)]">~</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/60"
              placeholder="type a command…"
              spellCheck={false}
            />
            <span className="h-4 w-2 animate-pulse bg-[var(--electric)]" />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </section>
  );
}
