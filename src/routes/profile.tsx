import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileHero } from '../components/portfolio/profile/ProfileHero';
import { PhilosophyEngine } from '../components/portfolio/profile/PhilosophyEngine';
import { WorkflowTimeline } from '../components/portfolio/profile/WorkflowTimeline';
import { KnowledgeVault } from '../components/portfolio/profile/KnowledgeVault';
import { ProfileAppendices } from '../components/portfolio/profile/ProfileAppendices';

export const Route = createFileRoute('/profile')({
  component: EngineeringProfile,
});

function EngineeringProfile() {
  const [activeSection, setActiveSection] = useState('who-i-am');

  const navItems = [
    { id: 'who-i-am', label: 'Who I Am' },
    { id: 'my-desk', label: 'My Desk' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'how-i-think', label: 'How I Think' },
    { id: 'values', label: 'Values' },
    { id: 'day-inside', label: 'A Day Inside' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'bookshelf', label: 'Bookshelf' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'next', label: 'What\'s Next' },
    { id: 'fun-facts', label: 'Core Dumps' },
    { id: 'faq', label: 'FAQ' },
  ];

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[var(--background)] min-h-screen text-[var(--foreground)] relative">
      
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-[var(--cyan)]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1400px] flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Sticky Left Navigation (TOC) */}
        <div className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-32 flex flex-col gap-2">
            <div className="font-mono text-[9px] text-[var(--cyan)] uppercase tracking-widest mb-4 pl-4">Contents</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-r-full border-l-2 ${
                  activeSection === item.id 
                  ? 'border-[var(--cyan)] text-[var(--cyan)] bg-[var(--cyan)]/5' 
                  : 'border-transparent text-[var(--foreground)]/40 hover:text-[var(--foreground)] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl min-w-0 pb-32 space-y-32">
          <ProfileHero />
          <PhilosophyEngine />
          <WorkflowTimeline />
          <KnowledgeVault />
          <ProfileAppendices />
        </div>

      </div>
    </div>
  );
}
