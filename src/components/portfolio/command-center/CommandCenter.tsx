import { motion } from "framer-motion";
import { 
  WidgetCurrentMission, WidgetActiveProjects, WidgetEngineeringActivity,
  WidgetCurrentResearch, WidgetCurrentlyLearning, WidgetEngineeringDecisions,
  WidgetRecentFailures, WidgetSystemHealth, WidgetTodaysNote, WidgetQuickAccess
} from "./CommandWidgets";

export function CommandCenter() {
  return (
    <section className="w-full relative py-32 px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[var(--foreground)] font-mono uppercase mb-2">
                Command Center
              </h2>
              <p className="text-[var(--foreground)]/50 text-lg font-serif italic tracking-wide">
                A real-time overview of the engineering workspace.
              </p>
            </div>
          </div>
          
          {/* Blueprint Divider */}
          <div className="w-full h-[1px] bg-white/10 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20" />
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/20" />
            <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/20" />
          </div>
        </motion.div>

        {/* Bento Box Grid */}
        {/* 
          Grid strategy:
          4 columns on Large displays.
          Various components span 1 or 2 cols.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
          
          {/* Top Row / Priority Items */}
          <WidgetCurrentMission delay={0.1} />
          <WidgetActiveProjects delay={0.2} />
          
          {/* Middle Density */}
          <WidgetEngineeringActivity delay={0.3} />
          <WidgetCurrentResearch delay={0.4} />
          <WidgetCurrentlyLearning delay={0.5} />
          <WidgetTodaysNote delay={0.6} />

          {/* Lower Density */}
          <WidgetEngineeringDecisions delay={0.7} />
          <WidgetRecentFailures delay={0.8} />
          <WidgetSystemHealth delay={0.9} />
          <WidgetQuickAccess delay={1.0} />

        </div>
      </div>
    </section>
  );
}
