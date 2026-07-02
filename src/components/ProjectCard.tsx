import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

export interface ProjectData {
  title: string;
  category: string;
  description: string[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Setup Motion values for cursor tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt angles
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse positions (-0.5 to 0.5) to rotation degrees (-10deg to 10deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  // Handle cursor positioning on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Get mouse position relative to card center, normalized from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  // Reset rotation when cursor leaves the card
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-full glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:border-accent-purple/30"
    >
      {/* 3D tilt depth container */}
      <div style={{ transform: "translateZ(30px)" }} className="p-6 flex flex-col h-full justify-between">
        
        {/* Mock Browser Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{project.category}</span>
        </div>

        {/* Project Image Showcase */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0a0f29] mb-5 border border-white/5">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/40 to-transparent pointer-events-none" />
        </div>

        {/* Project details */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2 font-display">{project.title}</h3>
          
          <ul className="text-xs text-slate-400 space-y-1 mb-4 list-disc pl-4 font-light">
            {project.description.map((desc, idx) => (
              <li key={idx} className="leading-relaxed">{desc}</li>
            ))}
          </ul>
        </div>

        {/* Tech badges & Actions footer */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200"
              >
                <Github size={14} />
                <span>Source</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-accent-cyan hover:text-white transition-colors duration-200"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
