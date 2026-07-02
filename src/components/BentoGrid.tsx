import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Languages, BookOpen, BrainCircuit } from "lucide-react";

export const BentoGrid: React.FC = () => {
  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px] max-w-6xl mx-auto px-6"
    >
      {/* 1. Main Bio Card (Takes 2 cols & 2 rows on desktop) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 md:row-span-2 glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-purple/5 rounded-full blur-[80px] group-hover:bg-accent-purple/10 transition-colors duration-500" />
        
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-accent-purple" size={20} />
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-accent-purple">Biography</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 font-display text-white">
            Engineering digital interfaces with mathematical precision.
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 font-light">
            I am a Computer Science student at the University of Yahia Fares with a rigorous mathematical foundation. My academic trajectory began with a Baccalauréat in Mathematics, scoring <span className="text-white font-semibold">17.50/20</span> (top-tier national ranking), which solidified my logical and algorithmic problem-solving capabilities.
          </p>
          <p className="text-sm leading-relaxed text-slate-300 font-light mt-4">
            Passionate about both full-stack web development and artificial intelligence, I build immersive web systems from the ground up, managing frontend UI fluidity alongside backend state logic. Recognized for my academic performance, I serve as a University Peer Tutor in algorithms and algebra, helping first-year students master computer science theory and code design.
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
          <div>
            <span className="text-white font-semibold">Focus:</span> Full-Stack React & AI Integration
          </div>
          <div className="w-[1px] h-3 bg-white/10" />
          <div>
            <span className="text-white font-semibold">Based:</span> Médéa / Algiers, Algeria
          </div>
        </div>
      </motion.div>

      {/* 2. Academic Merit Card (1 col & 1 row) */}
      <motion.div
        variants={itemVariants}
        className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -bottom-10 -right-10 w-[120px] h-[120px] bg-accent-blue/5 rounded-full blur-[50px]" />
        
        <div className="flex items-center justify-between">
          <div className="p-2 bg-accent-blue/10 border border-accent-blue/20 rounded-xl">
            <GraduationCap className="text-accent-blue" size={18} />
          </div>
          <span className="text-[10px] tracking-wider font-mono text-slate-500">2023 - 2027</span>
        </div>

        <div>
          <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400">Education</span>
          <h4 className="text-base font-bold text-white mt-1">Bachelor in Computer Science</h4>
          <p className="text-xs text-slate-400 mt-1">University of Yahia Fares Médéa</p>
        </div>
      </motion.div>

      {/* 3. Languages Card (1 col & 1 row) */}
      <motion.div
        variants={itemVariants}
        className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -bottom-10 -right-10 w-[120px] h-[120px] bg-accent-cyan/5 rounded-full blur-[50px]" />
        
        <div className="flex items-center justify-between">
          <div className="p-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl">
            <Languages className="text-accent-cyan" size={18} />
          </div>
          <span className="text-[10px] tracking-wider font-mono text-slate-500">Multilingual</span>
        </div>

        <div>
          <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400">Communication</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Arabic</span>
              <span className="text-[9px] text-slate-500">Native Speaker</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">English</span>
              <span className="text-[9px] text-slate-500">Fluent / Professional</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">French</span>
              <span className="text-[9px] text-slate-500">Fluent / Professional</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Turkish</span>
              <span className="text-[9px] text-slate-500">Fluent / Conversational</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Mathematics & Tutoring (1 col & 1 row) */}
      <motion.div
        variants={itemVariants}
        className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute -bottom-10 -right-10 w-[120px] h-[120px] bg-accent-purple/5 rounded-full blur-[50px]" />
        
        <div className="flex items-center justify-between">
          <div className="p-2 bg-accent-purple/10 border border-accent-purple/20 rounded-xl">
            <Award className="text-accent-purple" size={18} />
          </div>
          <span className="text-[10px] tracking-wider font-mono text-accent-purple font-semibold">Score: 17.50</span>
        </div>

        <div>
          <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400">Core Foundations</span>
          <h4 className="text-base font-bold text-white mt-1">Mathematics & Tutoring</h4>
          <p className="text-xs text-slate-400 mt-1">Algorithms & Algebra Mentor</p>
        </div>
      </motion.div>

      {/* 5. CS50 AI Certification Card (2 cols & 1 row) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-accent-purple/5 rounded-full blur-[60px]" />
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-purple/10 border border-accent-purple/20 rounded-xl">
              <BrainCircuit className="text-accent-purple" size={18} />
            </div>
            <div>
              <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400">Harvard / edX Certification</span>
              <h4 className="text-base font-bold text-white mt-0.5">CS50's Introduction to Artificial Intelligence</h4>
            </div>
          </div>
          <span className="text-[10px] tracking-wider font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-1 rounded-md">Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/5 pt-4">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">Foundations</div>
            <div className="text-xs text-slate-300 font-semibold mt-0.5">Search & Knowledge</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">ML Core</div>
            <div className="text-xs text-slate-300 font-semibold mt-0.5">Optimization & Probability</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono">Neural Nets</div>
            <div className="text-xs text-slate-300 font-semibold mt-0.5">Deep Learning models</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
