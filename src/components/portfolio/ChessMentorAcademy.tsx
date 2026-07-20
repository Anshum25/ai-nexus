import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Play, Rewind, FastForward, Maximize, Brain, Code2, Target, Award, Move, Search, Clock, Zap } from "lucide-react";
import type { ProjectData } from "./ProjectWorld";
import { EngineeringReplay } from "./EngineeringReplay";
import { ThinkingMode } from "./ThinkingMode";

type ViewMode = "academy" | "engineering";

export function ChessMentorAcademy({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("academy");
  const [showReplay, setShowReplay] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [analysisActive, setAnalysisActive] = useState(false);
  const [evalScore, setEvalScore] = useState(0); // Evaluation score

  // Simulate AI Analysis calculation
  useEffect(() => {
    if (!analysisActive) return;
    
    // Simulate thinking process
    const scoreInterval = setInterval(() => {
      setEvalScore(prev => {
        const target = 1.4; // Slightly winning for white
        const diff = target - prev;
        if (Math.abs(diff) < 0.1) {
          clearInterval(scoreInterval);
          return target;
        }
        return prev + diff * 0.2;
      });
    }, 100);

    return () => clearInterval(scoreInterval);
  }, [analysisActive]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex flex-col overflow-y-auto"
          style={{ 
            backgroundColor: "#1c1917", // Dark Walnut / Slate base
            color: "#fafaf9", // Ivory
          }}
        >
          {/* Subtle wooden texture / ambient light */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ background: 'radial-gradient(circle at 50% -20%, #d4af37 0%, transparent 60%)' }} 
          />

          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-[#d4af37]/20 bg-[#1c1917]/90 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <span className="text-xl">♛</span>
              </div>
              <div>
                <h1 className="text-lg font-serif tracking-wide text-[#fafaf9]">Chess Mentor AI</h1>
                <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#d4af37]/70">Learn. Analyze. Improve.</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex bg-[#292524] rounded-full p-1 border border-[#3f3f46]">
                <button 
                  onClick={() => setViewMode("academy")}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    viewMode === "academy" ? "bg-[#d4af37] text-black shadow-sm" : "text-[#a8a29e] hover:text-[#fafaf9]"
                  }`}
                >
                  Academy
                </button>
                <button 
                  onClick={() => setViewMode("engineering")}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all ${
                    viewMode === "engineering" ? "bg-[#d4af37] text-black shadow-sm" : "text-[#a8a29e] hover:text-[#fafaf9]"
                  }`}
                >
                  <Code2 className="w-3 h-3" /> Architecture
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => setShowReplay(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-900/40 text-amber-300 hover:text-white hover:bg-amber-800/60 text-xs font-medium border border-amber-700/50 transition-colors">
                  <Rewind className="w-3.5 h-3.5" /> Replay Build
                </button>
                <button onClick={() => setShowThinking(true)} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-xs font-medium border border-zinc-700 transition-colors">
                  <Brain className="w-3.5 h-3.5" /> Thinking Mode
                </button>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full relative z-10">
            {viewMode === "academy" ? (
              <AcademyView 
                analysisActive={analysisActive} 
                setAnalysisActive={setAnalysisActive}
                evalScore={evalScore}
              />
            ) : (
              <EngineeringView />
            )}
          </main>

          {/* Meta Layers */}
          <AnimatePresence>
            {showReplay && project && <EngineeringReplay project={project} onClose={() => setShowReplay(false)} />}
            {showThinking && project && <ThinkingMode project={project} onClose={() => setShowThinking(false)} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -----------------------------------------
// ACADEMY VIEW (Student perspective)
// -----------------------------------------
function AcademyView({ analysisActive, setAnalysisActive, evalScore }: { analysisActive: boolean, setAnalysisActive: (v: boolean) => void, evalScore: number }) {
  // A simple 8x8 checkerboard generator
  const squares = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isLight = (row + col) % 2 === 0;
    return { id: i, isLight, row, col };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Left Sidebar: Learning Engine */}
      <div className="lg:col-span-3 space-y-8">
        <div>
          <h3 className="font-serif text-xl text-[#d4af37] mb-4 border-b border-[#d4af37]/20 pb-2">Current Lesson</h3>
          <p className="text-sm text-[#d6d3d1] font-light leading-relaxed mb-4">
            Understanding the tension in the center. Notice how white's pawn structure restricts black's knight development.
          </p>
          <div className="flex gap-2 text-xs font-medium">
            <span className="px-2 py-1 rounded bg-[#292524] text-[#a8a29e] border border-[#3f3f46]">Positional</span>
            <span className="px-2 py-1 rounded bg-[#292524] text-[#a8a29e] border border-[#3f3f46]">Advanced</span>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl text-[#d4af37] mb-4 border-b border-[#d4af37]/20 pb-2">Opening Explorer</h3>
          <ul className="space-y-3 text-sm text-[#d6d3d1] font-light">
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="group-hover:text-[#d4af37] transition-colors">Italian Game</span>
              <span className="text-[10px] text-[#78716c]">45%</span>
            </li>
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-[#d4af37]">Ruy Lopez</span>
              <span className="text-[10px] text-[#78716c]">32%</span>
            </li>
            <li className="flex justify-between items-center pl-4 border-l border-[#d4af37]/30 group cursor-pointer">
              <span className="group-hover:text-[#d4af37] transition-colors">Morphy Defense</span>
              <span className="text-[10px] text-[#78716c]">18%</span>
            </li>
            <li className="flex justify-between items-center pl-4 border-l border-[#3f3f46] group cursor-pointer">
              <span className="group-hover:text-[#d4af37] transition-colors">Berlin Defense</span>
              <span className="text-[10px] text-[#78716c]">14%</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Center: The Chessboard */}
      <div className="lg:col-span-5 flex flex-col items-center">
        
        {/* Evaluation Bar */}
        <div className="w-full max-w-[480px] h-2 bg-[#292524] rounded-t-lg overflow-hidden flex relative border-b border-[#3f3f46]">
          {/* White advantage fills from left */}
          <motion.div 
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${50 + (evalScore * 5)}%` }} // Very rough visual mapping
          />
          <div className="h-full bg-black flex-1" />
          <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold mix-blend-difference text-white">
            {evalScore > 0 ? '+' : ''}{evalScore.toFixed(1)}
          </div>
        </div>

        {/* Board */}
        <div className="w-full max-w-[480px] aspect-square grid grid-cols-8 grid-rows-8 border-4 border-[#292524] shadow-2xl relative">
          {squares.map((sq) => (
            <div 
              key={sq.id} 
              className={`w-full h-full relative ${sq.isLight ? 'bg-[#e7e5e4]' : 'bg-[#78716c]'}`}
            >
              {/* Simulate Heatmap if analysis is active */}
              {analysisActive && (
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
                  style={{
                    backgroundColor: (sq.row === 4 && sq.col === 4) ? '#ef4444' : // Red hot center
                                     (sq.row === 3 && sq.col === 4) ? '#ef4444' :
                                     (sq.row > 5) ? '#3b82f6' : // Cool edges
                                     'transparent'
                  }}
                />
              )}

              {/* Just a couple placeholder pieces for aesthetic */}
              {(sq.id === 28) && <div className="absolute inset-0 flex items-center justify-center text-4xl cursor-pointer hover:scale-110 transition-transform">♘</div>}
              {(sq.id === 35) && <div className="absolute inset-0 flex items-center justify-center text-4xl cursor-pointer hover:scale-110 transition-transform text-[#292524]">♟</div>}
              {(sq.id === 12) && <div className="absolute inset-0 flex items-center justify-center text-4xl cursor-pointer hover:scale-110 transition-transform">♗</div>}
              {(sq.id === 60) && <div className="absolute inset-0 flex items-center justify-center text-4xl cursor-pointer hover:scale-110 transition-transform">♔</div>}
            </div>
          ))}

          {/* Analysis Arrows */}
          {analysisActive && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}>
              {/* Arrow from e4 to d6 (approx) */}
              <path d="M 270 330 L 210 210" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
              <polygon points="210,210 200,225 220,225" fill="#d4af37" opacity="0.8" transform="rotate(-26 210 210)" />
            </svg>
          )}
        </div>

        {/* Board Controls */}
        <div className="w-full max-w-[480px] flex justify-between items-center mt-4 bg-[#292524] p-3 rounded-lg border border-[#3f3f46]">
          <div className="flex gap-4 text-[#a8a29e]">
            <button className="hover:text-white transition-colors"><Rewind className="w-4 h-4" /></button>
            <button className="hover:text-white transition-colors"><Play className="w-4 h-4" /></button>
            <button className="hover:text-white transition-colors"><FastForward className="w-4 h-4" /></button>
          </div>
          <button className="text-[#a8a29e] hover:text-white transition-colors"><Maximize className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Right Sidebar: AI Analysis */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex justify-between items-center border-b border-[#3f3f46] pb-4">
          <h2 className="font-serif text-2xl text-white">Coach Insight</h2>
          <button 
            onClick={() => setAnalysisActive(!analysisActive)}
            className={`px-4 py-2 rounded font-sans text-xs uppercase tracking-wider flex items-center gap-2 transition-colors ${
              analysisActive ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/20"
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            {analysisActive ? "Stop Analysis" : "Analyze Position"}
          </button>
        </div>

        {/* Thinking Visualizer */}
        <div className="bg-[#292524] rounded-xl p-6 border border-[#3f3f46] relative overflow-hidden min-h-[300px]">
          {!analysisActive ? (
            <div className="absolute inset-0 flex items-center justify-center text-[#78716c] font-light text-sm italic">
              Awaiting position analysis...
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-[#d4af37] font-sans text-xs uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" /> Evaluating Candidate Moves
              </div>

              {/* Thinking Tree Nodes */}
              <div className="pl-4 border-l border-[#3f3f46] space-y-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-[#d4af37] border-2 border-[#292524]" />
                  <div className="text-white font-medium mb-1">Ne4 (Best Move)</div>
                  <div className="text-sm text-[#a8a29e] font-light leading-relaxed">
                    Controls the center and prepares an attack on f7. Black is forced to respond passively.
                  </div>
                  <div className="mt-2 text-xs font-mono text-green-400">Eval: +1.4</div>
                </div>

                <div className="relative opacity-60">
                  <div className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-[#78716c] border-2 border-[#292524]" />
                  <div className="text-white font-medium mb-1">Bc4</div>
                  <div className="text-sm text-[#a8a29e] font-light leading-relaxed">
                    Solid development, but allows black to equalize with ...d5.
                  </div>
                  <div className="mt-2 text-xs font-mono text-[#a8a29e]">Eval: +0.2</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-sm font-light text-[#d6d3d1] leading-relaxed">
          <strong className="font-serif text-[#d4af37] block mb-2 text-base">Positional Summary</strong>
          White has a space advantage and better piece activity. The goal is to restrict black's counterplay on the queenside while preparing a central breakthrough.
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// ENGINEERING VIEW (Architecture breakdown)
// -----------------------------------------
function EngineeringView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-16 pb-32"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-serif text-[#d4af37] mb-4">Behind the Board</h2>
        <p className="text-[#a8a29e] font-light max-w-2xl mx-auto">
          Building a real-time chess AI requires orchestrating low-level engine binaries with high-level pedagogical logic over persistent WebSocket connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#292524] p-8 rounded-2xl border border-[#3f3f46]">
          <h3 className="text-lg text-white font-medium mb-4 flex items-center gap-2">
            <Server className="w-4 h-4 text-[#d4af37]" /> The Engine Pipeline
          </h3>
          <p className="text-[#d6d3d1] font-light text-sm leading-relaxed mb-6">
            Instead of processing moves on the client, the architecture relies on a persistent Node.js backend. The server wraps a raw C++ Stockfish binary using the UCI (Universal Chess Interface) protocol.
          </p>
          <ul className="space-y-3 text-sm text-[#a8a29e]">
            <li className="flex gap-3"><span className="text-[#d4af37]">01</span> Client emits move (PGN)</li>
            <li className="flex gap-3"><span className="text-[#d4af37]">02</span> Node validates legal state</li>
            <li className="flex gap-3"><span className="text-[#d4af37]">03</span> Stockfish analyzes position at Depth 18</li>
            <li className="flex gap-3"><span className="text-[#d4af37]">04</span> WebSocket broadcasts eval diff</li>
          </ul>
        </div>

        <div className="bg-[#292524] p-8 rounded-2xl border border-[#3f3f46]">
          <h3 className="text-lg text-white font-medium mb-4 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#d4af37]" /> The Pedagogical LLM
          </h3>
          <p className="text-[#d6d3d1] font-light text-sm leading-relaxed mb-6">
            Raw centipawn evaluations (+2.5) are meaningless to beginners. The system triggers an LLM completion *only* when the evaluation drops significantly (a blunder).
          </p>
          <div className="bg-black/50 p-4 rounded font-mono text-[10px] text-[#a8a29e]">
            {`if (prevEval - currentEval > 1.5) {
  // Blunder detected. 
  // Generate natural language explanation.
  const prompt = \`
    FEN: \${currentFen}
    Why was \${lastMove} a blunder?
    Explain in positional terms.
  \`
  generateCoachInsight(prompt);
}`}
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-lg text-[#d4af37] font-medium mb-4">Core Engineering Decisions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#d6d3d1] font-light">
          <div>
            <strong className="text-white block mb-1">State Management</strong>
            React state is notoriously slow for 60fps animations. Board state is entirely decoupled from React's render cycle using custom stores and CSS transforms to handle drag-and-drop physics smoothly.
          </div>
          <div>
            <strong className="text-white block mb-1">Debounced Analysis</strong>
            Running Stockfish and an LLM simultaneously for every rapid move causes thermal throttling and API limits. Analysis requests are heavily debounced and batched during fast-paced play.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
