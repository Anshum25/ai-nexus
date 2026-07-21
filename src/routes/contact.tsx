import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Key, MessageSquare, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute('/contact')({
  component: ContactComponent,
})

function ContactComponent() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'NEXUS Secure Communications Protocol Initialized.' },
    { type: 'system', text: 'Enter your message below to establish connection.' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<'email' | 'message' | 'done'>('email');
  const [email, setEmail] = useState('');
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (step === 'email') {
      setHistory(prev => [
        ...prev, 
        { type: 'user', text: `> ${input}` },
        { type: 'system', text: `Email registered: ${input}` },
        { type: 'system', text: `Please transmit your message payload:` }
      ]);
      setEmail(input);
      setStep('message');
    } else if (step === 'message') {
      setHistory(prev => [
        ...prev, 
        { type: 'user', text: `> ${input}` },
        { type: 'system', text: `[ENCRYPTING PAYLOAD...]` },
        { type: 'system', text: `[TRANSMITTING...]` },
        { type: 'system', text: `Payload received. You will be contacted via ${email} shortly.` }
      ]);
      setStep('done');
    }
    setInput('');
  };

  return (
    <div className="pt-24 pb-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Initialize Contact.</h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
            Open a secure channel for enterprise architecture consulting, AI integration inquiries, or general collaboration.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Terminal Contact Form */}
          <div className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[600px] shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-black/60 px-4 py-3 flex items-center gap-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs font-mono text-white/40 ml-4 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> nexus_sh — 80x24
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-6 font-mono text-sm bg-black/80 overflow-y-auto flex flex-col">
              <div className="space-y-4 mb-4 flex-1">
                {history.map((h, i) => (
                  <div key={i} className={h.type === 'user' ? 'text-[var(--cyan)]' : 'text-green-400'}>
                    {h.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {step !== 'done' && (
                <form onSubmit={handleSubmit} className="flex gap-2 text-[var(--cyan)]">
                  <span>{step === 'email' ? 'Enter Email >' : 'Enter Message >'}</span>
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white focus:border-b focus:border-white/20 transition-colors pb-1"
                    autoFocus
                  />
                </form>
              )}
            </div>
          </div>

          {/* Secure Channels & Availability */}
          <div className="space-y-12">
            
            {/* Availability */}
            <section className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe className="w-32 h-32" />
              </div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Clock className="w-5 h-5 text-[var(--electric)]" /> Availability Status</h2>
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="text-sm font-mono text-white/50 mb-1">Timezone</div>
                  <div className="font-bold text-white text-lg">Pacific Time (PT) — UTC-8</div>
                </div>
                <div>
                  <div className="text-sm font-mono text-white/50 mb-1">Current Status</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="font-bold text-yellow-500">Limited Capacity</span>
                  </div>
                  <p className="text-sm text-white/60 mt-2 max-w-sm">
                    Currently accepting select enterprise architecture and AI consulting engagements starting Q4 2026.
                  </p>
                </div>
              </div>
            </section>

            {/* Secure Channels */}
            <section className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Shield className="w-5 h-5 text-green-400" /> Secure Channels</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-mono text-white/50 mb-2">
                    <MessageSquare className="w-4 h-4" /> Matrix Protocol
                  </div>
                  <div className="bg-black/40 border border-white/5 px-4 py-3 rounded-xl font-mono text-sm text-[var(--cyan)] selection:bg-[var(--electric)]/30">
                    @alex.mercer:nexus.dev
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm font-mono text-white/50 mb-2">
                    <Key className="w-4 h-4" /> PGP Public Key
                  </div>
                  <div className="bg-black/40 border border-white/5 px-4 py-3 rounded-xl font-mono text-xs text-white/60 overflow-x-auto whitespace-pre">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
mQINBGZ... [simulated key block] ...
-----END PGP PUBLIC KEY BLOCK-----`}
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  )
}
