import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootLoader } from "@/components/portfolio/BootLoader";
import { CursorEngine } from "@/components/portfolio/CursorEngine";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Timeline } from "@/components/portfolio/Timeline";
import { Projects } from "@/components/portfolio/Projects";
import { ArchitectureLab } from "@/components/portfolio/ArchitectureLab";
import { IdentityPanels } from "@/components/portfolio/IdentityPanels";
import { DecisionPoints } from "@/components/portfolio/DecisionPoints";
import { MissionControl } from "@/components/portfolio/MissionControl";
import { TechOrbit } from "@/components/portfolio/TechOrbit";
import { AITerminal } from "@/components/portfolio/AITerminal";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { NexusAIGuide } from "@/components/portfolio/NexusAIGuide";
import { EnvironmentEngine } from "@/components/portfolio/EnvironmentEngine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS OS — Engineering Intelligence" },
      {
        name: "description",
        content:
          "Not a portfolio. An immersive operating system demonstrating architectural thought, scalable design, and AI-native engineering.",
      },
      { property: "og:title", content: "NEXUS OS — Engineering Intelligence" },
      { property: "og:description", content: "Not a portfolio. An immersive operating system demonstrating architectural thought." },
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
    <div id="top" className="relative min-h-screen bg-background text-foreground grain overflow-clip selection:bg-[var(--electric)] selection:text-white">
      {/* LAYER 2: Invisible Intelligence (Background Engine) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="aurora opacity-70" />
        <div className="grid-bg opacity-40" />
      </div>

      {/* Boot Sequence Overlay */}
      {!booted && <BootLoader onDone={() => setBooted(true)} />}

      {/* Global Ambient Layer */}
      <EnvironmentEngine />

      {/* Global Interface Elements */}
      <CursorEngine />
      <CommandPalette />
      <NexusAIGuide />
      
      {/* Only show Nav after boot */}
      {booted && <Nav />}

      {/* LAYER 1: Visible Interface (Scrollable Content) */}
      <main 
        className={`relative z-10 transition-opacity duration-1000 ${booted ? "opacity-100" : "opacity-0"}`}
      >
        <Hero />
        
        {/* The Scroll Storytelling Journey */}
        <div className="relative z-10 shadow-[0_-40px_100px_rgba(0,0,0,0.5)]">
          <Timeline />
          
          <div className="relative bg-background/90 backdrop-blur-md">
            <IdentityPanels />
            <DecisionPoints />
          </div>

          <div className="relative bg-background">
            <MissionControl />
          </div>

          <Projects />
          
          <ArchitectureLab />
          
          <div className="relative bg-background/80 backdrop-blur-md">
            <TechOrbit />
            <AITerminal />
            
            <footer className="border-t border-white/5 py-12 text-center font-mono text-xs text-muted-foreground flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--electric)] animate-pulse" />
                NEXUS OS v1.0.0 Online
              </div>
              <div>© {new Date().getFullYear()} · engineered from scratch · press ⌘K</div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
