import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Database, Cpu, MessageSquare, ArrowRight, Activity, Code2, Zap } from 'lucide-react';

export const Route = createFileRoute('/prompt-lab')({
  component: PromptLabComponent,
});

const PIPELINE_STAGES = [
  { id: 'query', label: 'User Query', icon: MessageSquare, delay: 0 },
  { id: 'embed', label: 'Embedding Generation', icon: Activity, delay: 1500 },
  { id: 'retrieve', label: 'Vector Retrieval', icon: Database, delay: 3000 },
  { id: 'context', label: 'Context Assembly', icon: Code2, delay: 4500 },
  { id: 'prompt', label: 'Prompt Construction', icon: Terminal, delay: 6000 },
  { id: 'llm', label: 'LLM Synthesis', icon: Cpu, delay: 7500 },
  { id: 'answer', label: 'Final Output', icon: Zap, delay: 10000 },
];

function PromptLabComponent() {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [output, setOutput] = useState('');

  const runPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || isProcessing) return;
    
    setIsProcessing(true);
    setOutput('');
    
    // Simulate pipeline progression
    PIPELINE_STAGES.forEach((stage, index) => {
      setTimeout(() => {
        setActiveStage(stage.id);
        if (stage.id === 'answer') {
          // Simulate streaming output
          const responseText = "Based on the internal knowledge base, the optimal connection pooling strategy for AWS Lambda to PostgreSQL is to deploy PgBouncer on an EC2 instance or use Amazon RDS Proxy to manage the connection limits.";
          let currentText = "";
          let charIndex = 0;
          
          const interval = setInterval(() => {
            currentText += responseText[charIndex];
            setOutput(currentText);
            charIndex++;
            if (charIndex >= responseText.length) {
              clearInterval(interval);
              setIsProcessing(false);
            }
          }, 30);
        }
      }, stage.delay);
    });
  };

  return (
    <div className="pt-24 pb-32 bg-[#09090b] min-h-screen text-zinc-300 font-mono">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <header className="mb-12 border-b border-zinc-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 flex items-center gap-4">
              <Terminal className="w-10 h-10 text-emerald-500" />
              Prompt Laboratory
            </h1>
            <p className="text-zinc-500 uppercase tracking-widest text-sm">
              Retrieval-Augmented Generation (RAG) Pipeline Console
            </p>
          </div>
          <div className="flex gap-4 text-xs bg-black p-3 rounded-lg border border-zinc-800">
            <div className="flex flex-col">
              <span className="text-zinc-600">MODEL</span>
              <span className="text-emerald-500">gpt-4-turbo</span>
            </div>
            <div className="flex flex-col border-l border-zinc-800 pl-4">
              <span className="text-zinc-600">EMBEDDING</span>
              <span className="text-emerald-500">text-embedding-3-large</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & Pipeline Viz */}
          <div className="lg:col-span-4 space-y-8">
            <form onSubmit={runPipeline} className="bg-black p-6 rounded-xl border border-zinc-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-4">Input Query</label>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isProcessing}
                placeholder="Ask about architecture, systems, or engineering decisions..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded p-4 text-sm focus:outline-none focus:border-emerald-500 text-white min-h-[120px] resize-none disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isProcessing || !query}
                className="mt-4 w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 rounded py-2 text-xs uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {isProcessing ? 'Executing Pipeline...' : 'Execute RAG Pipeline'}
              </button>
            </form>

            <div className="bg-black p-6 rounded-xl border border-zinc-800 shadow-2xl">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-6">Execution Trace</h3>
              <div className="space-y-0 relative">
                {/* Connecting Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-zinc-800" />
                
                {PIPELINE_STAGES.map((stage) => {
                  const isActive = activeStage === stage.id;
                  const isPast = PIPELINE_STAGES.findIndex(s => s.id === stage.id) < PIPELINE_STAGES.findIndex(s => s.id === activeStage);
                  
                  return (
                    <div key={stage.id} className="relative pl-10 py-3 group">
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-zinc-900 border flex items-center justify-center transition-colors z-10
                        ${isActive ? 'border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/10' : 
                          isPast ? 'border-zinc-600 text-zinc-500' : 'border-zinc-800 text-zinc-700'}
                      `}>
                        <stage.icon className={`w-4 h-4 ${isActive && stage.id !== 'answer' ? 'animate-pulse' : ''}`} />
                      </div>
                      <div className={`text-sm transition-colors ${isActive ? 'text-white font-bold' : isPast ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {stage.label}
                      </div>
                      {isActive && stage.id !== 'answer' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="text-[10px] text-emerald-500/70 mt-1 uppercase tracking-widest"
                        >
                          Processing...
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Code & Output */}
          <div className="lg:col-span-8 space-y-8 flex flex-col">
            
            {/* Simulated Code Editor View */}
            <div className="bg-black rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex-1 flex flex-col">
              <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  <span className="text-xs text-zinc-500 ml-4">rag_pipeline.py</span>
                </div>
                <div className="text-[10px] text-zinc-600 uppercase">LangChain // Python</div>
              </div>
              <div className="p-6 text-sm overflow-y-auto flex-1 relative font-mono leading-relaxed">
                <AnimatePresence mode="wait">
                  {activeStage === 'query' && (
                     <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                       <span className="text-pink-500">def</span> <span className="text-blue-400">execute_rag</span>(query: <span className="text-emerald-400">str</span>):{'\n'}
                       {'    '}logger.info(<span className="text-yellow-300">f"Received query: </span><span className="text-orange-400">{'{query}'}</span><span className="text-yellow-300">"</span>)
                     </motion.pre>
                  )}
                  {activeStage === 'embed' && (
                     <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                       <span className="text-pink-500">def</span> <span className="text-blue-400">execute_rag</span>(query: <span className="text-emerald-400">str</span>):{'\n'}
                       {'    '}<span className="text-zinc-600"># Generate high-dimensional vector representation</span>{'\n'}
                       {'    '}embedding_model = OpenAIEmbeddings(model=<span className="text-yellow-300">"text-embedding-3-large"</span>){'\n'}
                       {'    '}vector = embedding_model.embed_query(query){'\n'}
                       {'    '}logger.info(<span className="text-yellow-300">f"Generated vector of dimension </span><span className="text-orange-400">{'{len(vector)}'}</span><span className="text-yellow-300">"</span>)
                     </motion.pre>
                  )}
                  {activeStage === 'retrieve' && (
                     <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                       {'    '}<span className="text-zinc-600"># Perform semantic search in vector database</span>{'\n'}
                       {'    '}vector_store = Qdrant(client=client, collection_name=<span className="text-yellow-300">"engineering_docs"</span>){'\n'}
                       {'    '}docs = vector_store.similarity_search_with_score({'\n'}
                       {'        '}query_vector=vector,{'\n'}
                       {'        '}k=<span className="text-orange-400">5</span>,{'\n'}
                       {'        '}filter=models.Filter({'\n'}
                       {'            '}must=[models.FieldCondition(key=<span className="text-yellow-300">"status"</span>, match=models.MatchValue(value=<span className="text-yellow-300">"published"</span>))]{'\n'}
                       {'        '}){'\n'}
                       {'    '})
                     </motion.pre>
                  )}
                  {activeStage === 'context' && (
                     <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                       {'    '}<span className="text-zinc-600"># Assemble context from retrieved documents</span>{'\n'}
                       {'    '}context_parts = []{'\n'}
                       {'    '}<span className="text-pink-500">for</span> doc, score <span className="text-pink-500">in</span> docs:{'\n'}
                       {'        '}<span className="text-pink-500">if</span> score &gt; <span className="text-orange-400">0.85</span>: <span className="text-zinc-600"># Relevance threshold</span>{'\n'}
                       {'            '}context_parts.append(<span className="text-yellow-300">f"Document [{doc.metadata['source']}]:\n{'{doc.page_content}'}"</span>){'\n'}
                       {'    '}{'\n'}
                       {'    '}assembled_context = <span className="text-yellow-300">"\n---\n"</span>.join(context_parts)
                     </motion.pre>
                  )}
                  {activeStage === 'prompt' && (
                     <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                       {'    '}<span className="text-zinc-600"># Inject context and query into system prompt</span>{'\n'}
                       {'    '}system_template = <span className="text-yellow-300">{`"""You are a Senior AI Engineer assistant.\n`}
                       {`    Answer the user's question using ONLY the provided context.\n`}
                       {`    If the context does not contain the answer, say "Insufficient data."\n`}
                       {`    \n`}
                       {`    CONTEXT:\n`}
                       {`    {context}"""`}</span>{'\n'}
                       {'    '}{'\n'}
                       {'    '}prompt = ChatPromptTemplate.from_messages([{'\n'}
                       {'        '}(<span className="text-yellow-300">"system"</span>, system_template),{'\n'}
                       {'        '}(<span className="text-yellow-300">"human"</span>, <span className="text-yellow-300">"{query}"</span>){'\n'}
                       {'    '}])
                     </motion.pre>
                  )}
                  {activeStage === 'llm' && (
                     <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                       {'    '}<span className="text-zinc-600"># Stream response from Large Language Model</span>{'\n'}
                       {'    '}llm = ChatOpenAI({'\n'}
                       {'        '}model=<span className="text-yellow-300">"gpt-4-turbo-preview"</span>,{'\n'}
                       {'        '}temperature=<span className="text-orange-400">0.0</span>,{'\n'}
                       {'        '}streaming=<span className="text-pink-500">True</span>{'\n'}
                       {'    '}){'\n'}
                       {'    '}{'\n'}
                       {'    '}chain = prompt | llm | StrOutputParser(){'\n'}
                       {'    '}<span className="text-pink-500">return</span> chain.stream({'\n'}
                       {'        '}<span className="text-yellow-300">"context"</span>: assembled_context,{'\n'}
                       {'        '}<span className="text-yellow-300">"query"</span>: query{'\n'}
                       {'    '})
                     </motion.pre>
                  )}
                  {activeStage === 'answer' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-500 h-full flex flex-col items-center justify-center opacity-50">
                       <Zap className="w-16 h-16 mb-4" />
                       <div className="tracking-widest uppercase text-sm">Pipeline Execution Complete</div>
                     </motion.div>
                  )}
                  {!activeStage && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-600 h-full flex flex-col items-center justify-center">
                       <Code2 className="w-12 h-12 mb-4 opacity-50" />
                       <div className="tracking-widest uppercase text-sm">Awaiting Pipeline Execution</div>
                     </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-black rounded-xl border border-zinc-800 shadow-2xl p-6 min-h-[200px] relative">
               <div className="absolute top-0 right-6 px-3 py-1 bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-lg text-[10px] text-zinc-500 uppercase tracking-widest">
                 System Output
               </div>
               
               {activeStage === 'answer' || output ? (
                 <div className="text-white whitespace-pre-wrap leading-relaxed">
                   {output}
                   {isProcessing && <span className="inline-block w-2 h-4 ml-1 bg-emerald-500 animate-pulse" />}
                 </div>
               ) : (
                 <div className="text-zinc-700 h-full flex items-center justify-center uppercase tracking-widest text-xs">
                   No output generated yet
                 </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
