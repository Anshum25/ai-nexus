import { createFileRoute } from "@tanstack/react-router";

import { CinematicHero } from "@/components/portfolio/CinematicHero";
import { Ch02_Mission } from "@/components/portfolio/home/Ch02_Mission";
import { Ch03_Journey } from "@/components/portfolio/home/Ch03_Journey";
import { Ch04_Project } from "@/components/portfolio/home/Ch04_Project";
import { Ch05_Architecture } from "@/components/portfolio/home/Ch05_Architecture";
import { Ch06_Experience } from "@/components/portfolio/home/Ch06_Experience";
import { Ch07_Research } from "@/components/portfolio/home/Ch07_Research";
import { Ch08_Journal } from "@/components/portfolio/home/Ch08_Journal";
import { Ch09_Ecosystem } from "@/components/portfolio/home/Ch09_Ecosystem";
import { Ch10_Philosophy } from "@/components/portfolio/home/Ch10_Philosophy";
import { Ch11_Vision } from "@/components/portfolio/home/Ch11_Vision";
import { Ch12_Contact } from "@/components/portfolio/home/Ch12_Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS — Premium Engineering Experience" },
      {
        name: "description",
        content: "A cinematic table of contents exploring architectural thought, scalable design, and AI-native engineering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="w-full bg-transparent">
      <div className="relative z-10 w-full">
        {/* 01. Hero */}
        <CinematicHero />
        
        {/* 02. Mission & Live Architecture */}
        <Ch02_Mission />
        
        {/* 03. Interactive Timeline */}
        <Ch03_Journey />
        
        {/* 04. Cinematic Case Study Reveal */}
        <Ch04_Project />
        
        {/* 05. Interactive Blueprint */}
        <Ch05_Architecture />
        
        {/* 06. Experience Summary */}
        <Ch06_Experience />
        
        {/* 07. Research Lab */}
        <Ch07_Research />
        
        {/* 08. Journal */}
        <Ch08_Journal />
        
        {/* 09. Technology Ecosystem */}
        <Ch09_Ecosystem />
        
        {/* 10. Philosophy Spread (Inverted) */}
        <Ch10_Philosophy />
        
        {/* 11. Future Vision */}
        <Ch11_Vision />
        
        {/* 12. Contact */}
        <Ch12_Contact />
      </div>
    </div>
  );
}
