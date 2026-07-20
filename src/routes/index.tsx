import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootLoader } from "@/components/portfolio/BootLoader";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Timeline } from "@/components/portfolio/Timeline";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { TechOrbit } from "@/components/portfolio/TechOrbit";
import { AITerminal } from "@/components/portfolio/AITerminal";
import { CommandPalette } from "@/components/portfolio/CommandPalette";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio.OS — Building Enterprise AI Systems" },
      {
        name: "description",
        content:
          "Production-grade AI systems, RAG pipelines, agents and ERPNext platforms — engineered by an AI & software engineer.",
      },
      { property: "og:title", content: "Portfolio.OS — Building Enterprise AI Systems" },
      { property: "og:description", content: "Production-grade AI systems, RAG pipelines, agents and ERPNext platforms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    // ensure dark theme
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-background text-foreground grain">
      <div className="aurora" />
      <div className="grid-bg" />

      {!booted && <BootLoader onDone={() => setBooted(true)} />}

      <CursorGlow />
      <CommandPalette />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Projects />
        <Experience />
        <TechOrbit />
        <AITerminal />
        <footer className="border-t border-white/5 py-10 text-center font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · designed &amp; engineered from scratch · press ⌘K
        </footer>
      </main>
    </div>
  );
}
