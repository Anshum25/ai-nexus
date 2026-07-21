import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Box, Cpu, FileJson, FileText, Regex, Settings2, ShieldCheck, Zap, Server, Code2, X } from 'lucide-react';

export const Route = createFileRoute('/playground')({
  component: PlaygroundComponent,
})

const TOOLS = [
  { id: "ai-assistant", name: "AI Portfolio Assistant", icon: Cpu, type: "mock" },
  { id: "architecture", name: "Architecture Builder", icon: Box, type: "mock" },
  { id: "api", name: "API Explorer", icon: Zap, type: "mock" },
  { id: "rag", name: "RAG Visualizer", icon: Database, type: "mock" },
  { id: "prompt", name: "Prompt Studio", icon: Code2, type: "mock" },
  { id: "docker", name: "Docker Explorer", icon: Server, type: "mock" },
  { id: "db-viewer", name: "DB Relationship Viewer", icon: ShieldCheck, type: "mock" },
  { id: "terminal", name: "Terminal", icon: Terminal, type: "mock" },
  { id: "regex", name: "Regex Tester", icon: Regex, type: "functional" },
  { id: "json", name: "JSON Formatter", icon: FileJson, type: "functional" },
  { id: "markdown", name: "Markdown Preview", icon: FileText, type: "functional" },
  { id: "system-design", name: "System Design Sandbox", icon: Settings2, type: "mock" },
];

function PlaygroundComponent() {
  const [activeTool, setActiveTool] = useState<typeof TOOLS[0] | null>(null);

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Playground
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A suite of interactive engineering tools and sandbox environments.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool, i) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveTool(tool)}
              className="glass p-6 text-left rounded-2xl border border-white/5 hover:border-[var(--electric)]/50 transition-colors group flex flex-col justify-between h-40"
            >
              <div className="flex justify-between items-start">
                <tool.icon className="w-8 h-8 text-white/40 group-hover:text-[var(--cyan)] transition-colors" />
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${tool.type === 'functional' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'}`}>
                  {tool.type === 'functional' ? 'Live' : 'Simulated'}
                </span>
              </div>
              <h3 className="font-bold text-white group-hover:text-[var(--electric)] transition-colors">{tool.name}</h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tool Modal */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-4">
                <activeTool.icon className="w-6 h-6 text-[var(--cyan)]" />
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Interactive Tool</div>
                  <h2 className="text-xl font-bold text-white">{activeTool.name}</h2>
                </div>
              </div>
              <button onClick={() => setActiveTool(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6 md:p-12">
              <div className="max-w-4xl mx-auto w-full">
                {activeTool.type === 'mock' && (
                  <div className="h-[60vh] border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                    <Settings2 className="w-16 h-16 text-white/20 mb-6 animate-spin-slow" />
                    <h3 className="text-2xl font-bold text-white mb-2">Simulation Engine Online</h3>
                    <p className="text-white/50 max-w-md">This environment is currently running a high-fidelity visual simulation. Full interactive capabilities are locked for guests.</p>
                  </div>
                )}
                
                {activeTool.id === 'json' && <JSONFormatter />}
                {activeTool.id === 'regex' && <RegexTester />}
                {activeTool.id === 'markdown' && <MarkdownPreviewer />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function JSONFormatter() {
  const [input, setInput] = useState('{"hello": "world", "status": 200}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[60vh]">
      <div className="flex flex-col h-full">
        <label className="text-xs font-mono uppercase text-white/40 mb-2">Raw JSON</label>
        <textarea 
          className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-white focus:border-[var(--electric)] outline-none resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={format} className="mt-4 py-3 bg-[var(--electric)]/20 text-[var(--cyan)] font-mono text-sm rounded-xl hover:bg-[var(--electric)]/30 transition-colors">Format Data</button>
      </div>
      <div className="flex flex-col h-full">
        <label className="text-xs font-mono uppercase text-white/40 mb-2">Formatted Output</label>
        <div className={`flex-1 bg-black/40 border rounded-xl p-4 text-sm font-mono overflow-auto ${error ? 'border-red-500/50 text-red-400' : 'border-white/10 text-green-400'}`}>
          {error ? `ERROR: ${error}` : <pre>{output}</pre>}
        </div>
      </div>
    </div>
  );
}

function RegexTester() {
  const [regex, setRegex] = useState('[A-Z]\\w+');
  const [text, setText] = useState('Hello World, this is a Regex test.');
  const [flags, setFlags] = useState('g');
  
  let matches: string[] = [];
  try {
    const re = new RegExp(regex, flags);
    matches = text.match(re) || [];
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Regular Expression</label>
        <div className="flex gap-2">
          <span className="p-3 bg-white/5 rounded-l-xl border border-white/10 text-white/50 border-r-0">/</span>
          <input 
            type="text" 
            className="flex-1 bg-black/40 border border-white/10 p-3 font-mono text-[var(--cyan)] outline-none"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
          />
          <span className="p-3 bg-white/5 border border-white/10 text-white/50 border-l-0 border-r-0">/</span>
          <input 
            type="text" 
            className="w-16 bg-black/40 border border-white/10 rounded-r-xl p-3 font-mono text-white/50 outline-none"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Test String</label>
        <textarea 
          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-white focus:border-[var(--electric)] outline-none resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs font-mono uppercase text-white/40 mb-2 block">Matches ({matches.length})</label>
        <div className="flex flex-wrap gap-2">
          {matches.map((m, i) => (
            <span key={i} className="px-3 py-1.5 bg-green-500/20 text-green-400 font-mono text-sm rounded border border-green-500/30">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarkdownPreviewer() {
  const [md, setMd] = useState('# Hello Nexus\n\nThis is a **Markdown** previewer.\n\n- Write logic\n- Build systems\n- Ship products');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[60vh]">
      <div className="flex flex-col h-full">
        <label className="text-xs font-mono uppercase text-white/40 mb-2">Markdown Editor</label>
        <textarea 
          className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-white focus:border-[var(--electric)] outline-none resize-none"
          value={md}
          onChange={(e) => setMd(e.target.value)}
        />
      </div>
      <div className="flex flex-col h-full">
        <label className="text-xs font-mono uppercase text-white/40 mb-2">Live Preview</label>
        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-8 overflow-auto prose prose-invert prose-p:text-white/80">
          <div dangerouslySetInnerHTML={{ __html: md.replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>').replace(/^\- (.*$)/gim, '<li>$1</li>') }} />
        </div>
      </div>
    </div>
  );
}
