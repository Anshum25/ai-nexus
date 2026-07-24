import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Timeline";
import { ProjectWorld, type ProjectData } from "./ProjectWorld";
import { EnterpriseCommandCenter } from "./EnterpriseCommandCenter";
import { ChessMentorAcademy } from "./ChessMentorAcademy";
import { ERPWorld } from "./ERPWorld";
import { SkyCloudEcosystem } from "./SkyCloudEcosystem";

const GALAXY_PROJECTS: ProjectData[] = [
  {
    id: "p-enterprise-ai",
    name: "Enterprise AI Core",
    status: "Production",
    environment: "Enterprise",
    technologies: ["FastAPI", "Qdrant", "LangChain", "ERPNext"],
    timeline: "2023 - Present",
    objective: "Intelligent assistant capable of understanding enterprise data using retrieval, permissions, and large language models.",
    orbit: 1,
    color: "#00b4ff", // Electric Blue
    q1: "Employees needed instant answers from enterprise data, but manual searching wasted time across fragmented systems. The core issue wasn't search—it was security. How do you let an AI search everything without violating row-level user permissions?",
    q2: "Building a standard RAG pipeline is easy. Building a RAG pipeline that enforces strict multi-tenant SQL permissions dynamically and synthesizes queries deterministically across millions of records is extremely difficult.",
    q3: "I realized the LLM shouldn't do the filtering. The vector database needed to handle exact-match payload filtering *before* similarity search to guarantee security. The LLM's only job is synthesis.",
    q4: "A decoupled architecture. FastAPI handles the client, Qdrant stores vectors with heavy metadata payloads, and a background worker syncs changes from the ERP database in near real-time.",
    q5: "I built the integration layer first—writing Python hooks inside ERPNext that fired webhooks to a FastAPI ingestion service whenever a document was saved. Then I tuned the Voyage AI embeddings for technical language.",
    q6: "We achieved a <1% hallucination rate on enterprise evaluations and reduced manual report generation time by 40x.",
    research: "Evaluated Pinecone vs Qdrant. Chose Qdrant for its open-source self-hosting capabilities and superior payload filtering logic which was critical for role-based access.",
    architecture: "[ ERPNext MySQL ] → (Webhooks) → [ FastAPI Ingestion ] → (Voyage Embeddings) → [ Qdrant ]. User queries hit FastAPI, retrieve secure context, and stream back via OpenAI.",
    engineeringDecisions: [
      "Decoupled the vector sync from the main ERP request cycle to prevent blocking.",
      "Used JSON Web Tokens (JWT) to pass user roles directly into the vector query payload.",
      "Implemented a streaming response layer to keep perceived latency under 500ms."
    ],
    implementationSteps: [
      { phase: "Discovery", desc: "Mapped out all data silos and permission matrices." },
      { phase: "Foundation", desc: "Built the FastAPI routing and JWT auth middleware." },
      { phase: "Ingestion", desc: "Wrote the ERPNext python hooks for real-time document syncing." },
      { phase: "Retrieval", desc: "Tuned Qdrant hybrid search (sparse + dense vectors)." },
      { phase: "Generation", desc: "Engineered strict system prompts to prevent data leakage." }
    ],
    challenges: [
      { problem: "Vector payload size was bloating memory and slowing down retrieval.", solution: "Stripped HTML and Markdown from the ERP data before embedding, and quantized the vectors." }
    ],
    metrics: [
      { label: "Avg Latency", value: "< 800ms" },
      { label: "Daily Queries", value: "10,000+" },
      { label: "Data Nodes", value: "2.4M" }
    ],
    lessons: [
      "Vector search without metadata filtering is useless in a B2B enterprise context.",
      "Never trust an LLM to enforce permissions."
    ],
    future: "Expanding the agent's capabilities from read-only retrieval to active tool-use (e.g., generating purchase orders).",
    links: { demo: "https://example.com" }
  },
  {
    id: "p-chess",
    name: "Chess Mentor",
    status: "Prototype",
    environment: "Web Application",
    technologies: ["Node.js", "Socket.io", "Stockfish", "React"],
    timeline: "Q3 2023",
    objective: "Real-time AI coach that analyzes chess games live and provides natural language pedagogical feedback.",
    orbit: 2,
    color: "#ff00aa", // Neon Pink
    q1: "Chess engines output raw evaluations (+2.5). Beginners need explanations ('You lost control of the center'), not math.",
    q2: "Bridging a low-level C++ engine (Stockfish) with a high-level LLM over WebSockets while keeping latency under 200ms so the UI feels instantaneous.",
    q3: "I needed a way to translate numerical evaluation diffs into contextual prompts. If the evaluation drops by 2 points, it's a blunder. I can pass the FEN state and the blunder metric to the LLM.",
    q4: "A Node.js socket server manages the state. It spawns a Stockfish child process for raw analysis, and queues API calls to the LLM only when significant evaluation shifts occur.",
    q5: "I built the React chessboard frontend first, wired it to the Node socket, and then spent weeks tuning the engine depth so it wouldn't bottleneck the event loop.",
    q6: "Players can now understand *why* they blundered immediately, rather than just seeing a red arrow on the board.",
    research: "Experimented with multiple LLMs. Found that GPT-4 is uniquely good at understanding FEN strings compared to smaller models.",
    architecture: "[ React Frontend ] ↔ (Socket.io) ↔ [ Node.js Server ]. Server manages [ Stockfish Child Process ] and calls [ OpenAI API ].",
    engineeringDecisions: [
      "Used UCI (Universal Chess Interface) protocol to stream engine evaluations continuously.",
      "Debounced LLM calls to prevent API rate limits during fast bullet games.",
      "Stored game states in memory for instant rollback."
    ],
    implementationSteps: [
      { phase: "Engine Wrapper", desc: "Wrote a Node script to interact with Stockfish via stdin/stdout." },
      { phase: "Socket Layer", desc: "Built real-time bidirectional communication for move broadcasting." },
      { phase: "LLM Pipeline", desc: "Created dynamic prompt templates injecting FEN strings and PGN history." }
    ],
    challenges: [
      { problem: "Socket congestion during fast play.", solution: "Implemented debouncing and only triggered the LLM on eval swings > 1.0." }
    ],
    metrics: [
      { label: "Socket Latency", value: "45ms" },
      { label: "Engine Depth", value: "18" },
      { label: "API Cost/Game", value: "$0.02" }
    ],
    lessons: [
      "Latency is the ultimate killer of good UX.",
      "Not every user action needs to trigger an LLM."
    ],
    future: "Adding voice-to-text integration for hands-free coaching.",
    links: { github: "https://github.com/example/chess" }
  },
  {
    id: "p-skyerp",
    name: "SkyERP Core",
    status: "Deprecated",
    environment: "Cloud Platform",
    technologies: ["Vue.js", "Python", "MariaDB"],
    timeline: "2021",
    objective: "A unified dashboard for managing multi-tenant cloud ERP instances.",
    orbit: 3,
    color: "#00ffaa", // Neon Green
    q1: "Managing 50+ unique ERP deployments required SSHing into 50 different servers to run updates.",
    q2: "Each deployment had custom modules and specific dependency versioning requirements.",
    q3: "I needed a centralized control plane. A single interface that could dispatch bash commands via an agent installed on each worker node.",
    q4: "A central Vue/Python dashboard that communicates with lightweight Python agents running on the host servers via secure REST webhooks.",
    q5: "Wrote the worker agent first. It listens for signed payloads, executes the git pulls and bench commands, and streams the stdout back to the central dashboard.",
    q6: "Cut deployment time across the fleet from 3 days to 45 minutes.",
    research: "Looked into Ansible, but needed a more visual, client-friendly interface that non-technical account managers could use to trigger updates.",
    architecture: "[ Central Vue UI ] → [ Central API ] → (Signed Webhooks) → [ Worker Agents on Nodes ]",
    engineeringDecisions: [
      "Used asymmetric encryption to sign webhooks, preventing unauthorized deployment triggers.",
      "Streamed deployment logs via WebSockets to the UI so users knew it wasn't hanging."
    ],
    implementationSteps: [
      { phase: "Agent Design", desc: "Built the lightweight server agent in Python." },
      { phase: "Control Plane", desc: "Designed the central database to track tenant versions." },
      { phase: "UI", desc: "Built the Vue.js dashboard for 1-click deployments." }
    ],
    challenges: [
      { problem: "Agent processes dying silently.", solution: "Wrapped the agent in a systemd service with automatic restart rules and dead-man switch alerting." }
    ],
    metrics: [
      { label: "Tenants Managed", value: "50+" },
      { label: "Update Time", value: "-80%" },
      { label: "Uptime", value: "99.9%" }
    ],
    lessons: [
      "Infrastructure as code is essential.",
      "Build visual tools for internal operations; it democratizes maintenance."
    ],
    future: "Migrated concepts into modern Kubernetes operators.",
    links: {}
  },
  {
    id: "p-skycloud",
    name: "SkyERP Cloud",
    status: "Active",
    environment: "SaaS Ecosystem",
    technologies: ["Next.js", "React", "Tailwind", "Framer Motion"],
    timeline: "2024 - Present",
    objective: "Premium cloud software ecosystem designed with uncompromising attention to typography, spacing, and micro-interactions.",
    orbit: 4,
    color: "#ffffff", // Pristine White
    q1: "Enterprise software shouldn't feel like a spreadsheet. How do we make a complex B2B platform feel as intuitive and premium as a consumer app?",
    q2: "The challenge was building a cohesive design system that scales across marketing sites, authentication flows, and dense data dashboards without losing visual consistency.",
    q3: "I adopted a rigorous token-based approach. Every color, spacing increment, and typographic scale is mapped to a semantic variable, ensuring that the entire ecosystem breathes together.",
    q4: "A Next.js App Router architecture utilizing Server Components for the marketing pages to maximize SEO, and Client Components for the rich interactive dashboards.",
    q5: "I built the interactive Component Library first. Establishing the primitive building blocks (buttons, inputs, cards) meant that assembling complex views later took minutes instead of days.",
    q6: "The resulting platform reduced onboarding time by 60% and established a brand identity that immediately communicates trust and modern engineering.",
    research: "Analyzed the design languages of Stripe, Vercel, and Linear. Adopted their approach to subtle borders (ring-1), soft shadows, and high-contrast typography.",
    architecture: "[ User ] → (Next.js Edge Network) → [ React Server Components ] ↔ [ Client Interactivity ] ↔ [ Secure APIs ]",
    engineeringDecisions: [
      "Used Tailwind's arbitrary values and CSS variables to handle theming instead of heavy JS context providers.",
      "Leveraged Framer Motion for `layoutId` transitions to make navigation feel like a native app."
    ],
    implementationSteps: [
      { phase: "Design System", desc: "Defined the core visual tokens (colors, fonts, radii)." },
      { phase: "Primitives", desc: "Built the base interactive components with all states (hover, focus, disabled)." },
      { phase: "Layouts", desc: "Created the responsive shell and sidebar navigation." },
      { phase: "Features", desc: "Assembled the authentication and dashboard views." }
    ],
    challenges: [
      { problem: "Maintaining performance with complex animations.", solution: "Delegated non-essential animations to CSS transitions and reserved Framer Motion strictly for structural layout changes." }
    ],
    metrics: [
      { label: "Lighthouse", value: "100" },
      { label: "Bundle Size", value: "< 80kb" },
      { label: "Accessibility", value: "WCAG AA" }
    ],
    lessons: [
      "Good design is invisible. If the user notices the UI, it's getting in the way.",
      "Consistency scales better than cleverness."
    ],
    future: "Expanding the ecosystem with a native mobile application using React Native.",
    links: {}
  }
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  // Helper to determine orbit size and speed based on the orbit level
  const getOrbitStyles = (orbit: number) => {
    switch(orbit) {
      case 1: return { size: "w-[300px] h-[300px] md:w-[400px] md:h-[400px]", duration: "60s" };
      case 2: return { size: "w-[500px] h-[500px] md:w-[700px] md:h-[700px]", duration: "90s" };
      case 3: return { size: "w-[700px] h-[700px] md:w-[1000px] md:h-[1000px]", duration: "140s" };
      case 4: return { size: "w-[900px] h-[900px] md:w-[1300px] md:h-[1300px]", duration: "200s" };
      default: return { size: "w-[400px] h-[400px]", duration: "60s" };
    }
  };

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black z-20 py-32">
      
      {/* Background Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-black to-[#050510]" />
        {/* We can imagine a canvas starfield here, but CSS noise works for now */}
        <div className="absolute inset-0 opacity-30 grain mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full px-6 mb-24 text-center pointer-events-none">
        <SectionHeading eyebrow="Project Universe" title="Explore the Architecture." subtitle="Hover to scan. Click to enter orbit." />
      </div>

      {/* The Orbital Galaxy */}
      <div className="relative flex items-center justify-center w-full h-[600px] md:h-[800px] perspective-[1000px]">
        
        {/* The Central Core */}
        <div className="absolute z-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white shadow-[0_0_100px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 animate-[spin_10s_linear_infinite] border-dashed" />
        </div>

        {/* The Orbits */}
        {[1, 2, 3, 4].map(level => {
          const orbitProjects = GALAXY_PROJECTS.filter(p => p.orbit === level);
          if (orbitProjects.length === 0) return null;
          
          const { size, duration } = getOrbitStyles(level);

          return (
            <div key={`orbit-${level}`} className={`absolute border border-white/10 rounded-full flex items-center justify-center ${size}`}>
              
              {/* Rotating Container for the projects on this orbit */}
              <div 
                className="absolute inset-0 rounded-full animate-[spin_linear_infinite]"
                style={{ animationDuration: duration }}
              >
                {orbitProjects.map((project, index) => {
                  // Distribute projects evenly along the orbit
                  const angle = (index / orbitProjects.length) * 360;
                  
                  return (
                    <div 
                      key={project.id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
                      style={{ 
                        transform: `rotate(${angle}deg) translateX(${level === 1 ? '150px' : level === 2 ? '250px' : level === 3 ? '350px' : '450px'})` // Very rough approx for responsive radius
                      }}
                    >
                      {/* Counter-rotate the actual project node so it stays upright */}
                      <div 
                        className="animate-[spin_linear_infinite_reverse]"
                        style={{ animationDuration: duration }}
                      >
                        <motion.button
                          layoutId={`project-sphere-${project.id}`}
                          onClick={() => setActiveProject(project)}
                          className="relative w-8 h-8 md:w-12 md:h-12 rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-150"
                          style={{ 
                            background: `radial-gradient(circle at 30% 30%, #ffffff, ${project.color})`,
                            boxShadow: `0 0 30px ${project.color}80`
                          }}
                        >
                          {/* Hover Summary Tooltip */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-48 text-center bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl scale-75 group-hover:scale-100 origin-top">
                            <div className="text-[10px] font-mono uppercase text-[var(--foreground)]/50 tracking-widest mb-1">{project.status}</div>
                            <div className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-2">{project.name}</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {project.technologies.slice(0, 2).map(t => (
                                <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[var(--foreground)]/70">{t}</span>
                              ))}
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {activeProject?.id === "p-enterprise-ai" ? (
        <EnterpriseCommandCenter project={activeProject} onClose={() => setActiveProject(null)} />
      ) : activeProject?.id === "p-chess" ? (
        <ChessMentorAcademy project={activeProject} onClose={() => setActiveProject(null)} />
      ) : activeProject?.id === "p-skyerp" ? (
        <ERPWorld project={activeProject} onClose={() => setActiveProject(null)} />
      ) : activeProject?.id === "p-skycloud" ? (
        <SkyCloudEcosystem project={activeProject} onClose={() => setActiveProject(null)} />
      ) : (
        <ProjectWorld project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
