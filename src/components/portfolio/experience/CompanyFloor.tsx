import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Users, Lightbulb, BookOpen } from 'lucide-react';
import { OwnershipDashboard } from './OwnershipDashboard';
import { EngineeringProcess } from './EngineeringProcess';
import { CompanyWorkflow } from './CompanyWorkflow';

export interface CompanyData {
  id: string;
  name: string;
  role: string;
  duration: string;
  location: string;
  teamSize: string;
  industry: string;
  overview: string;
  techStack: string[];
  ownership: any[];
  problems: any[];
  schedule: any[];
  lessons: string[];
}

export function CompanyFloor({ company, index }: { company: CompanyData, index: number }) {
  
  return (
    <motion.div
      id={`company-${company.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="w-full py-32 px-6 lg:px-12 flex flex-col gap-32 border-b border-[var(--border)] last:border-b-0"
    >
      
      {/* 1. Dashboard Header */}
      <section>
        <div className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-widest mb-4 flex items-center gap-2">
          Floor {String(index + 1).padStart(2, '0')} // {company.industry}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--foreground)] mb-6 uppercase font-mono">
          {company.name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-12">
          <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-sm uppercase">
            <Building2 className="w-4 h-4" /> {company.role}
          </div>
          <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-sm uppercase">
            <Calendar className="w-4 h-4" /> {company.duration}
          </div>
          <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-sm uppercase">
            <MapPin className="w-4 h-4" /> {company.location}
          </div>
          <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-mono text-sm uppercase">
            <Users className="w-4 h-4" /> {company.teamSize} Eng Team
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-xl text-[var(--foreground)]/70 leading-relaxed font-serif italic mb-8">
              {company.overview}
            </p>
          </div>
          <div className="bg-[var(--foreground)]/[0.02] border border-[var(--border)] p-6 rounded-2xl">
            <div className="font-mono text-[9px] text-[var(--muted-foreground)] uppercase tracking-widest mb-4">Primary Stack</div>
            <div className="flex flex-wrap gap-2">
              {company.techStack.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs text-[var(--foreground)]/80 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ownership */}
      <section>
        <OwnershipDashboard items={company.ownership} />
      </section>

      {/* 3. Engineering Process & Problems */}
      <section>
        <EngineeringProcess problems={company.problems} />
      </section>

      {/* 4. Company Workflow */}
      <section>
        <CompanyWorkflow schedule={company.schedule} />
      </section>

      {/* 5. Lessons Learned */}
      <section className="pb-32">
        <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Lightbulb className="w-48 h-48 text-[var(--accent)]" />
          </div>
          
          <div className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
            <BookOpen className="w-4 h-4" /> What I learned here
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {company.lessons.map((lesson, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 h-1 bg-[var(--accent)] rounded-full mt-2.5 shrink-0" />
                <p className="text-[var(--foreground)]/80 font-serif leading-relaxed">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
}
