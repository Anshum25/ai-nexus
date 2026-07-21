import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight, X, ChevronRight, FileText, Code2, Link as LinkIcon, Box } from 'lucide-react';

export const Route = createFileRoute('/writing')({
  component: WritingComponent,
})

const CATEGORIES = ["AI", "Backend", "ERPNext", "System Design", "Career", "Learning Notes", "Tutorials", "Architecture"];

const ARTICLES = [
  {
    id: "art-1",
    title: "System prompts as code: Version controlling prompt engineering",
    category: "AI",
    date: "July 21, 2026",
    readingTime: "8 min read",
    excerpt: "Why treating system prompts as raw strings in your codebase is a scaling disaster, and how to build a versioned prompt registry.",
    content: "Prompt engineering is software engineering. If you wouldn't deploy a major database schema change without version control and testing, you shouldn't change your core RAG system prompt without the same rigor.\n\n### The Problem with String Prompts\nWhen prompts are hardcoded into Python files, tracking performance regressions becomes impossible. Did the accuracy drop because of the new embedding model, or because a developer tweaked the prompt to 'be more helpful'?\n\n### Building a Prompt Registry\nWe shifted to a system where prompts are stored in a database, versioned, and requested at runtime via an internal API.",
    code: `# Fetching versioned prompt
def execute_agent(user_query, version="v1.2.0"):
    prompt = prompt_registry.get("support_agent", version)
    return llm.invoke(prompt + user_query)`,
    related: ["art-2"]
  },
  {
    id: "art-2",
    title: "Optimizing Docker builds for React/Node applications",
    category: "DevOps",
    date: "July 12, 2026",
    readingTime: "5 min read",
    excerpt: "How we reduced our CI/CD pipeline build times by 70% using multi-stage builds and aggressive layer caching.",
    content: "Docker build times directly impact developer velocity. In this article, I walk through the exact Dockerfile optimizations that shaved 15 minutes off our deployment pipeline.\n\n### Multi-Stage Builds\nBy separating the build environment from the runtime environment, we reduced the final image size from 1.2GB to 85MB.",
    code: `FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html`,
    related: []
  }
];

function WritingComponent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<typeof ARTICLES[0] | null>(null);

  const filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-16">
        
        {/* Main Feed */}
        <div className="flex-1">
          <div className="mb-16 border-b border-white/10 pb-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Publication</h1>
            <p className="text-xl text-muted-foreground">Technical deep dives, architectural thoughts, and engineering journals.</p>
          </div>

          <div className="space-y-12">
            {filtered.map((article, i) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveArticle(article)}
              >
                <div className="flex items-center gap-4 mb-4 font-mono text-xs uppercase tracking-widest text-[var(--cyan)]">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/40 flex items-center gap-2"><Calendar className="w-3 h-3"/> {article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/40 flex items-center gap-2"><Clock className="w-3 h-3"/> {article.readingTime}</span>
                </div>
                <h2 className="text-3xl font-bold text-white group-hover:text-[var(--electric)] transition-colors mb-4 leading-snug">
                  {article.title}
                </h2>
                <p className="text-white/60 leading-relaxed text-lg mb-6 max-w-3xl">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight className="w-4 h-4 text-[var(--electric)]" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Sidebar Topics */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="sticky top-32 glass p-8 rounded-3xl border border-white/5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <Box className="w-4 h-4" /> Topics
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setActiveCategory("All")}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeCategory === "All" ? "bg-[var(--electric)]/20 text-[var(--cyan)]" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                All Publications
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat ? "bg-[var(--electric)]/20 text-[var(--cyan)]" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Article Viewer Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl overflow-y-auto"
          >
            <div className="sticky top-0 p-6 flex justify-end z-10 bg-gradient-to-b from-black/80 to-transparent">
              <button onClick={() => setActiveArticle(null)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-xl transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="max-w-3xl mx-auto px-6 pb-32">
              <header className="mb-16 text-center">
                <div className="inline-flex items-center justify-center gap-4 mb-8 text-xs font-mono uppercase tracking-widest text-[var(--cyan)] bg-[var(--electric)]/10 px-4 py-2 rounded-full border border-[var(--electric)]/20">
                  <span>{activeArticle.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--cyan)]" />
                  <span>{activeArticle.readingTime}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-8">
                  {activeArticle.title}
                </h1>
                <div className="text-white/40 font-mono text-sm">{activeArticle.date}</div>
              </header>

              {/* Table of Contents (Mock) */}
              <div className="glass p-6 rounded-2xl mb-12 border border-white/5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Table of Contents
                </h4>
                <ul className="space-y-2 text-sm text-[var(--electric)] cursor-pointer">
                  <li className="hover:underline">1. The Problem with String Prompts</li>
                  <li className="hover:underline">2. Building a Prompt Registry</li>
                  <li className="hover:underline">3. Conclusion</li>
                </ul>
              </div>

              <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-p:leading-relaxed prose-headings:font-bold prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10">
                <div dangerouslySetInnerHTML={{ __html: activeArticle.content.replace(/\n\n/g, '<br/><br/>').replace(/### (.*)/g, '<h3>$1</h3>') }} />
                
                {activeArticle.code && (
                  <pre className="my-8 rounded-xl p-6 overflow-x-auto text-sm font-mono text-green-400">
                    {activeArticle.code}
                  </pre>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
