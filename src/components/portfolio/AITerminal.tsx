import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./Timeline";
import { motion } from "framer-motion";

type Line = { kind: "in" | "out" | "sys"; text: string; id: string };

const HELP = `Available commands:
  help        Show this help
  about       Who I am
  projects    List selected work
  stack       Tech I ship with
  resume      Download my resume
  github      Open my GitHub
  linkedin    Open my LinkedIn
  hire        Start a conversation
  whoami      Identify current user
  status      System diagnostics
  sudo        Elevate privileges
  clear       Clear the terminal`;

function run(cmd: string): { kind: "sys", text: string }[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  if (c === "help") return [{ kind: "sys", text: HELP }];
  if (c === "about")
    return [{ kind: "sys", text: "AI & software engineer. I build RAG systems, agents, and Enterprise architectures that ship to production." }];
  if (c === "projects")
    return [{ kind: "sys", text: "• TRMS Enterprise AI Chatbot\n• Chess Mentor AI\n• ERPNext Custom Suite\n• SkyERP Platform Site\n• AI Learning Engine" }];
  if (c === "stack")
    return [{ kind: "sys", text: "Python · FastAPI · Next.js · Qdrant · ERPNext · Docker · OpenAI · Gemini" }];
  if (c === "resume") { if (typeof window !== "undefined") window.open("/resume.pdf", "_blank"); return [{ kind: "sys", text: "Opening resume…" }]; }
  if (c === "github") { if (typeof window !== "undefined") window.open("https://github.com", "_blank"); return [{ kind: "sys", text: "Opening GitHub…" }]; }
  if (c === "linkedin") { if (typeof window !== "undefined") window.open("https://linkedin.com", "_blank"); return [{ kind: "sys", text: "Opening LinkedIn…" }]; }
  if (c === "hire") { if (typeof window !== "undefined") window.location.href = "mailto:hello@example.com?subject=Let%27s%20build%20something"; return [{ kind: "sys", text: "Drafting email…" }]; }
  if (c === "clear") return [{ kind: "sys", text: "__CLEAR__" }];
  if (c === "whoami") return [{ kind: "sys", text: "guest@nexus-os" }];
  if (c === "status") return [{ kind: "sys", text: "CPU: 12% | MEM: 4.2GB/16GB | UPTIME: 99.99% | CORE: STABLE" }];
  if (c.startsWith("sudo")) return [{ kind: "sys", text: "nexus-os is reporting this incident to the administrator." }];
  if (c === "matrix") return [{ kind: "sys", text: "Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit." }];
  
  return [{ kind: "sys", text: `command not found: ${c}. type "help" for available commands.` }];
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15); // very fast typing
    return () => clearInterval(interval);
  }, [text]);

  return <pre className="whitespace-pre-wrap font-mono text-white/70" dangerouslySetInnerHTML={{ __html: displayed }} />;
}

export function AITerminal() {
  const [lines, setLines] = useState<Line[]>([
    { id: "init", kind: "sys", text: "welcome to NEXUS OS — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [input, ...history];
    setHistory(newHistory);
    setHistoryIdx(-1);

    const out = run(input);
    if (out.length && out[0].text === "__CLEAR__") {
      setLines([]);
    } else {
      const generatedId = Date.now().toString();
      const mappedOut = out.map((o, i) => ({ ...o, id: `${generatedId}-${i}` }));
      setLines((l) => [...l, { id: generatedId, kind: "in", text: input }, ...mappedOut]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const prevIdx = historyIdx - 1;
        setHistoryIdx(prevIdx);
        setInput(history[prevIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-32 z-20">
      <SectionHeading eyebrow="Terminal Access" title="Execute commands." subtitle="Communicate directly with the OS." />
      
      <div className="mt-12 overflow-hidden rounded-2xl glass border border-white/10 shadow-[0_0_80px_rgba(0,180,255,0.05)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">guest@nexus-os:~</span>
          <div className="w-16" /> {/* spacer */}
        </div>

        {/* Terminal Body */}
        <div className="h-[400px] overflow-y-auto p-6 font-mono text-sm leading-relaxed bg-black/40">
          {lines.map((l) => (
            <div key={l.id} className="mb-2">
              {l.kind === "in" ? (
                <div className="flex items-center gap-2 text-white">
                  <span className="text-[var(--electric)] font-bold text-base">➜</span>
                  <span className="text-[var(--cyan)] font-bold">~</span>
                  <span>{l.text}</span>
                </div>
              ) : (
                <Typewriter text={l.text} />
              )}
            </div>
          ))}
          
          <form onSubmit={submit} className="mt-2 flex items-center gap-2">
            <span className="text-[var(--electric)] font-bold text-base">➜</span>
            <span className="text-[var(--cyan)] font-bold">~</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/20"
              placeholder="awaiting input..."
              spellCheck={false}
            />
            {/* Blinking block cursor */}
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-4 w-2 bg-[var(--electric)] ml-1" 
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </section>
  );
}
