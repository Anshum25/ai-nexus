import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { WelcomeModal } from "@/components/portfolio/WelcomeModal";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BootLoader } from "@/components/portfolio/BootLoader";
import { CursorEngine } from "@/components/portfolio/CursorEngine";
import { Nav } from "@/components/portfolio/Nav";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { NexusAIGuide } from "@/components/portfolio/NexusAIGuide";
import { EnvironmentEngine } from "@/components/portfolio/EnvironmentEngine";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center z-50 relative">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center z-50 relative">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portfolio.OS — Building Enterprise AI Systems" },
      { name: "description", content: "Production-grade AI systems, RAG pipelines, agents and ERPNext platforms." },
      { property: "og:title", content: "Portfolio.OS — Building Enterprise AI Systems" },
      { property: "og:description", content: "Production-grade AI systems, RAG pipelines, agents and ERPNext platforms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [booted, setBooted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // ensure dark theme
    document.documentElement.classList.add("dark");
  }, []);

  const handleBootDone = () => {
    setBooted(true);
    setShowWelcome(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div id="top" className="relative min-h-screen bg-background text-foreground grain overflow-clip selection:bg-[var(--electric)] selection:text-white">
        {/* LAYER 2: Invisible Intelligence (Background Engine) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="aurora opacity-70" />
          <div className="grid-bg opacity-40" />
        </div>

        {/* Boot Sequence Overlay */}
        {!booted && <BootLoader onDone={handleBootDone} />}

        {/* Welcome Modal Overlay */}
        <AnimatePresence>
          {showWelcome && <WelcomeModal onDismiss={() => setShowWelcome(false)} />}
        </AnimatePresence>

        {/* Global Ambient Layer */}
        <EnvironmentEngine />

        {/* Global Interface Elements */}
        <CursorEngine />
        <CommandPalette />
        <NexusAIGuide />
        
        {/* Only show Nav after boot */}
        {booted && <Nav />}

        <main className={`relative z-10 transition-opacity duration-1000 lg:pl-72 ${booted ? "opacity-100" : "opacity-0"}`}>
          <Outlet />
          {booted && (
            <footer className="border-t border-white/5 py-12 text-center font-mono text-xs text-muted-foreground flex flex-col items-center justify-center gap-4 mt-20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--electric)] animate-pulse" />
                NEXUS OS v2.0 Online
              </div>
              <div>© {new Date().getFullYear()} · engineered from scratch · press ⌘K</div>
            </footer>
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}
