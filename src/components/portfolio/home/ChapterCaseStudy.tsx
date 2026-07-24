import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ChapterCaseStudy() {
  return (
    <section className="w-full bg-[var(--background)] py-40">
      
      {/* 03 / Featured Work Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          03 / Featured Case Study
        </span>
      </div>

      {/* Immersive Parallax Image */}
      <div className="w-full h-[70vh] md:h-[90vh] relative overflow-hidden group">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-40"
        />
        
        {/* Gradients to blend back into background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-[80px] font-medium leading-[1.05] tracking-tight text-[var(--foreground)] mb-8 max-w-4xl">
              Building a secure, air-gapped Enterprise LLM.
            </h2>
            <Link 
              to="/archive" 
              className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-full"
            >
              Read the Full Architecture
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
