import { useState } from 'react';
import { Code, Key, Hash, LayoutTemplate, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sandbox() {
  const [activeTab, setActiveTab] = useState<'json' | 'base64' | 'uuid'>('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Tools
  const formatJSON = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const handleBase64 = (type: 'encode' | 'decode') => {
    try {
      setError('');
      if (type === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e: any) {
      setError("Invalid Base64 string");
      setOutput('');
    }
  };

  const generateUUID = () => {
    setError('');
    const uuid = crypto.randomUUID();
    setOutput(uuid);
    setInput('');
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-mono uppercase tracking-tight text-[var(--foreground)] mb-2">Engineering Sandbox</h2>
        <p className="text-[var(--foreground)]/50 text-sm">Real utility tools running locally in your browser.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'json', label: 'JSON Formatter', icon: Code },
          { id: 'base64', label: 'Base64 Encoder', icon: Key },
          { id: 'uuid', label: 'UUID Generator', icon: Hash }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as any); setInput(''); setOutput(''); setError(''); }}
            className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-colors border ${activeTab === tab.id ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border-[var(--cyan)]/30' : 'bg-white/5 text-[var(--foreground)]/50 border-white/5 hover:bg-white/10'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-mono text-[var(--foreground)]/40 uppercase tracking-widest flex items-center justify-between">
            <span>Input</span>
            {activeTab === 'json' && (
              <button onClick={formatJSON} className="text-[var(--cyan)] hover:text-[var(--foreground)] transition-colors">Format</button>
            )}
            {activeTab === 'base64' && (
              <div className="flex gap-4">
                <button onClick={() => handleBase64('encode')} className="text-[var(--cyan)] hover:text-[var(--foreground)] transition-colors">Encode</button>
                <button onClick={() => handleBase64('decode')} className="text-[var(--cyan)] hover:text-[var(--foreground)] transition-colors">Decode</button>
              </div>
            )}
            {activeTab === 'uuid' && (
              <button onClick={generateUUID} className="text-[var(--cyan)] hover:text-[var(--foreground)] transition-colors">Generate V4</button>
            )}
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={activeTab === 'uuid'}
            placeholder={
              activeTab === 'json' ? '{"paste": "unformatted json here"}' : 
              activeTab === 'base64' ? 'Paste text or base64...' : 
              'Click Generate V4 ->'
            }
            className={`flex-1 bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 font-mono text-sm text-[var(--foreground)]/80 resize-none focus:outline-none focus:border-[var(--cyan)]/50 transition-colors ${activeTab === 'uuid' ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          {error && <div className="text-red-400 text-xs font-mono">{error}</div>}
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-mono text-[var(--cyan)] uppercase tracking-widest flex items-center justify-between">
            <span>Output</span>
            <button onClick={copyToClipboard} className="text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors flex items-center gap-1">
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="flex-1 bg-[var(--background)] border border-white/5 rounded-xl p-4 font-mono text-sm text-[var(--foreground)] overflow-y-auto whitespace-pre-wrap break-all relative">
            {output ? output : <span className="text-[var(--foreground)]/20">Output will appear here...</span>}
            
            {/* Decoration */}
            <div className="absolute bottom-4 right-4 text-[var(--cyan)]/20 pointer-events-none">
              <LayoutTemplate className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
