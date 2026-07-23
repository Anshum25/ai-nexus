import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { FileText, Download, Briefcase, GraduationCap, Code2, Layers, Cpu, Award, Mail, MapPin, Globe, Github, Printer } from 'lucide-react';

export const Route = createFileRoute('/passport')({
  component: PassportComponent,
});

function PassportComponent() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-24 pb-32 bg-background min-h-screen font-sans">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Action Bar (Hidden when printing) */}
        <div className="flex justify-end gap-4 mb-8 print:hidden">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors border border-white/10">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--electric)]/20 hover:bg-[var(--electric)]/30 text-[var(--cyan)] rounded-lg text-sm transition-colors border border-[var(--electric)]/30">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        {/* Resume Document */}
        <div className="bg-white text-black p-8 md:p-16 rounded-xl shadow-2xl print:shadow-none print:p-0 print:bg-transparent print:text-black">
          
          {/* Header */}
          <header className="border-b-2 border-black pb-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Alex Mercer</h1>
            <h2 className="text-xl text-gray-600 font-medium mb-4">Lead AI & Full Stack Engineer</h2>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA (Remote)</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> alex.mercer@nexus.dev</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> nexus.dev</div>
              <div className="flex items-center gap-2"><Github className="w-4 h-4" /> github.com/alexmercer</div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-black">Professional Summary</h3>
            <p className="text-gray-800 leading-relaxed text-sm">
              Engineering leader with 8+ years of experience architecting high-throughput backend systems and integrating generative AI into strict, multi-tenant enterprise environments. Specialized in decoupling legacy monoliths into scalable, observable microservices using Python, FastAPI, and Go. Proven track record of reducing infrastructure costs while improving system latency.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-black border-b border-gray-300 pb-1">Experience</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-lg">Lead AI Architecture</h4>
                <span className="text-sm font-semibold text-gray-600">2024 — Present</span>
              </div>
              <div className="text-sm italic text-gray-600 mb-3">Nexus Enterprise Solutions</div>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-800">
                <li>Architected a multi-tenant RAG pipeline handling 50k+ daily queries, utilizing Qdrant payload filters to enforce strict row-level SQL permissions at the vector retrieval stage.</li>
                <li>Designed a semantic caching layer with Redis, reducing OpenAI API costs by 45% and dropping P95 latency from 2.5s to 400ms for common query structures.</li>
                <li>Implemented an internal Prompt Registry to version-control system prompts, enabling automated regression testing across multiple LLM endpoints.</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-lg">Senior Backend Engineer</h4>
                <span className="text-sm font-semibold text-gray-600">2021 — 2024</span>
              </div>
              <div className="text-sm italic text-gray-600 mb-3">SkyCloud ERP Systems</div>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-800">
                <li>Led a team of 4 in decoupling a 5-year-old Frappe (Python) monolith into domain-specific microservices using FastAPI and Apache Kafka.</li>
                <li>Optimized monolithic PostgreSQL queries, introducing partial indexes and materialized views, which reduced dashboard load times from 8s to under 1s.</li>
                <li>Built a custom syncing engine that reconciled offline mobile app data with the central ERP database, handling conflict resolution for 10,000+ daily warehouse transactions.</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-lg">Full Stack Developer</h4>
                <span className="text-sm font-semibold text-gray-600">2018 — 2021</span>
              </div>
              <div className="text-sm italic text-gray-600 mb-3">DataFlow Analytics</div>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-800">
                <li>Developed interactive financial dashboards using React and D3.js, consuming high-frequency data via WebSockets.</li>
                <li>Migrated the primary REST API from Express.js to Go, achieving a 3x increase in throughput on identical hardware.</li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-black border-b border-gray-300 pb-1">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div>
                <span className="font-bold block mb-1">Languages & Frameworks</span>
                Python (FastAPI, Flask), TypeScript, React, Next.js, Go, Node.js, SQL.
              </div>
              <div>
                <span className="font-bold block mb-1">Infrastructure & DevOps</span>
                Docker, Kubernetes (K3s), AWS (EC2, S3, RDS), GitHub Actions, Terraform, Linux.
              </div>
              <div>
                <span className="font-bold block mb-1">Databases & State</span>
                PostgreSQL, Qdrant (Vector DB), Redis, MongoDB, MariaDB.
              </div>
              <div>
                <span className="font-bold block mb-1">AI & LLM Tooling</span>
                LangChain, LlamaIndex, OpenAI API, HuggingFace, Prompt Engineering.
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-black border-b border-gray-300 pb-1">Education</h3>
              <div className="mb-3">
                <h4 className="font-bold">B.S. Computer Science</h4>
                <div className="text-sm text-gray-600">University of Technology • 2014 — 2018</div>
                <div className="text-sm text-gray-800 mt-1">Specialization in Distributed Systems</div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-black border-b border-gray-300 pb-1">Certifications</h3>
              <ul className="text-sm text-gray-800 space-y-2">
                <li><strong>AWS Certified Solutions Architect</strong> — Professional</li>
                <li><strong>CKAD</strong> — Certified Kubernetes Application Developer</li>
                <li><strong>DeepLearning.AI</strong> — Natural Language Processing Specialization</li>
              </ul>
            </section>
          </div>

        </div>
      </div>
    </div>
  )
}
