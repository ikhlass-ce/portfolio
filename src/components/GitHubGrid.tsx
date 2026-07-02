import React from "react";
import { motion } from "framer-motion";
import { GitFork, Star, GitBranch, Sparkles } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

interface RepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  demo?: string;
}

const STATIC_REPOS: RepoData[] = [
  {
    name: "bellemont",
    description: "Premium watch & fashion digital storefront featuring GSAP micro-interactions, Lenis smooth scrolling, and Tailwind v4 themes.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/ikhlass-ce/bellemont",
    demo: "https://bellemont-rosy.vercel.app"
  },
  {
    name: "piple",
    description: "Netflix-inspired movie streaming platform integrated with Supabase for user dashboards, favorites, and trailer playback overlays.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    url: "https://github.com/ikhlass-ce/piple",
    demo: "https://piple-nine.vercel.app"
  },
  {
    name: "love-letter-mohamed",
    description: "Interactive digital memory box card featuring modular components, audio playlist elements, and custom canvas-confetti particle systems.",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/ikhlass-ce/love-letter-mohamed"
  },
  {
    name: "mison",
    description: "Lightweight frontend repository deploying clean HTML structures, responsive modules, and custom styling patterns.",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/ikhlass-ce/mison",
    demo: "https://mison-rho.vercel.app"
  }
];

export const GitHubGrid: React.FC = () => {
  // Generate random data for simulated contribution graph
  // 52 weeks * 7 days
  const generateContributions = () => {
    const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4]; // weights towards lower numbers for realistic look
    const grid = [];
    for (let i = 0; i < 53 * 7; i++) {
      grid.push(levels[Math.floor(Math.random() * levels.length)]);
    }
    return grid;
  };

  const contributions = generateContributions();
  const totalContributions = contributions.reduce((acc, curr) => acc + (curr > 0 ? curr * 2 : 0), 246);

  // Map levels to color values (purple palette)
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-accent-purple/20 border-white/5";
      case 2:
        return "bg-accent-purple/40 border-white/5";
      case 3:
        return "bg-accent-purple/70 border-white/5";
      case 4:
        return "bg-accent-purple border-white/5";
      default:
        return "bg-white/5 border-white/5";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 font-sans">
      
      {/* GitHub Header Profile summary */}
      <div className="glass-panel rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-accent-blue/5 rounded-full blur-[80px]" />
        
        <div className="flex flex-col md:flex-row items-center gap-5 relative z-10 text-center md:text-left">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan p-0.5 shadow-lg">
              <img
                src="https://avatars.githubusercontent.com/u/256426294?v=4"
                alt="ikhlass-ce avatar"
                className="w-full h-full rounded-full bg-bg-dark object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-bg-dark border border-white/10 rounded-full p-1 text-accent-purple">
              <Github size={12} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              ikhlass-ce
              <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-normal text-slate-400">PRO</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
              Web Developer 💻 , Creating modern websites & digital experiences. Passionate about clean code, creative designs, and learning new technologies 🖤
            </p>
          </div>
        </div>

        <div className="flex gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-white font-display">4</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Repositories</div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div>
            <div className="text-2xl font-black text-white font-display">{totalContributions}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">YTD Commits</div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div>
            <div className="text-2xl font-black text-white font-display">1</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Following</div>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns - Left Repos, Right Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Repository Cards (2 Columns Width) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-2 uppercase tracking-widest text-xs">
            <Sparkles size={14} className="text-accent-purple" />
            Pinned Repositories
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATIC_REPOS.map((repo, idx) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between h-[160px] text-left group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-accent-purple transition-colors duration-200 font-display">
                      {repo.name}
                    </span>
                    <GitBranch size={14} className="text-slate-600" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 leading-relaxed font-light">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#f1e05a]" /> {/* yellow for JS */}
                      {repo.language}
                    </span>
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-0.5">
                        <Star size={10} className="fill-slate-600 stroke-none" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-0.5">
                        <GitFork size={10} />
                        {repo.forks}
                      </span>
                    )}
                  </div>
                  {repo.demo && (
                    <span className="text-accent-cyan hover:underline">Demo</span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contribution Graph (1 Column Width) */}
        <div className="lg:col-span-1">
          <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4 uppercase tracking-widest text-xs">
            <Github size={14} className="text-accent-blue" />
            Activity Heatmap
          </h4>

          <div className="glass-panel rounded-3xl p-5 flex flex-col justify-between h-fit relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-accent-purple/5 rounded-full blur-[60px]" />
            
            <div className="text-xs text-slate-300 font-medium mb-3">
              Contribution History
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Stable activity cycle</div>
            </div>

            {/* Grid Container */}
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-cols-[repeat(38,minmax(0,1fr))] gap-[2.5px] min-w-[320px]">
                {contributions.slice(0, 38 * 7).map((level, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-[1px] border-[0.5px] ${getCellColor(level)}`}
                  />
                ))}
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-4 pt-3 border-t border-white/5">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-[1px] bg-white/5" />
                <span className="w-2 h-2 rounded-[1px] bg-accent-purple/20" />
                <span className="w-2 h-2 rounded-[1px] bg-accent-purple/40" />
                <span className="w-2 h-2 rounded-[1px] bg-accent-purple/70" />
                <span className="w-2 h-2 rounded-[1px] bg-accent-purple" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
