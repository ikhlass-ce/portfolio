import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { 
  Code2, 
  Monitor, 
  Globe, 
  Wrench, 
  Cpu, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Sparkles,
  BookOpen
} from "lucide-react";

// Components
import { LoadingScreen } from "./components/LoadingScreen";
import { Background3D } from "./components/Background3D";
import { Navbar } from "./components/Navbar";
import { BentoGrid } from "./components/BentoGrid";
import { ProjectCard } from "./components/ProjectCard";
import type { ProjectData } from "./components/ProjectCard";
import { GitHubGrid } from "./components/GitHubGrid";
import { ContactForm } from "./components/ContactForm";

// Project static list from CV and GitHub
const PROJECTS_DATA: ProjectData[] = [
  {
    title: "Bellemont",
    category: "Fashion E-commerce Website",
    description: [
      "Designed and developed a premium watch and fashion digital storefront with an elegant dark mode aesthetic.",
      "Implemented Lenis smooth scrolling and custom GSAP animations for interactive product display and collection sweeps.",
      "Integrated React 19 Context API for shopping cart operations, product filters, search, and checkout structures.",
      "Created fully responsive layouts and quick-view modals to minimize user navigation friction."
    ],
    tech: ["React 19", "Tailwind CSS v4", "GSAP", "Lenis", "React Router 7"],
    image: "/bellemont.png",
    github: "https://github.com/ikhlass-ce/bellemont",
    demo: "https://bellemont-rosy.vercel.app"
  },
  {
    title: "Piple",
    category: "Netflix-inspired Platform",
    description: [
      "Built a Netflix-inspired movie platform deploying movie backdrops, trailer playback modals, and explore routes.",
      "Configured Supabase database client handling user dashboards, favorites lists, and real-time reviews.",
      "Optimized poster grid layouts and trailer playback layers for fast loading and cross-device display."
    ],
    tech: ["React", "Vite", "Supabase", "Tailwind CSS", "CSS Modules"],
    image: "/piple.png",
    github: "https://github.com/ikhlass-ce/piple",
    demo: "https://piple-nine.vercel.app"
  },
  {
    title: "Gaming Websites",
    category: "Full-Stack Web Games",
    description: [
      "Shipped interactive gaming websites from scratch, covering frontend UI flows and backend scoring logic.",
      "Managed active gameplay states and scoring systems using vanilla JavaScript and algorithmic logic.",
      "Applied structured data patterns to process game mechanics and render real-time interactive feedback loops."
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "Full-Stack", "Algorithms"],
    image: "/gaming.png",
    github: "https://github.com/ikhlass-ce"
  },
  {
    title: "University Redesign",
    category: "Usability Audit & UX Redesign",
    description: [
      "Conducted a rigorous usability audit of the existing academic portal to locate structural and navigation friction points.",
      "Redesigned the information architecture, reducing the navigation steps to access key education materials.",
      "Developed a modern, clean interface featuring premium spacing, clear typography, and responsive menus."
    ],
    tech: ["UX Research", "HTML5", "CSS3", "Typography", "Architecture"],
    image: "/university.png",
    github: "https://github.com/ikhlass-ce"
  }
];

// Skills catalog
const SKILLS_DATA = [
  {
    category: "Programming Languages",
    icon: <Code2 className="text-accent-purple" size={16} />,
    colorClass: "border-accent-purple/10 hover:border-accent-purple/30",
    glowClass: "bg-accent-purple/5",
    skills: ["JavaScript (ES6+)", "Python", "C++", "C", "Java"]
  },
  {
    category: "Frontend Development",
    icon: <Monitor className="text-accent-blue" size={16} />,
    colorClass: "border-accent-blue/10 hover:border-accent-blue/30",
    glowClass: "bg-accent-blue/5",
    skills: ["React 19", "HTML5 & CSS3", "Tailwind CSS", "Framer Motion", "GSAP Animations"]
  },
  {
    category: "Web Technologies",
    icon: <Globe className="text-accent-cyan" size={16} />,
    colorClass: "border-accent-cyan/10 hover:border-accent-cyan/30",
    glowClass: "bg-accent-cyan/5",
    skills: ["Full-Stack Dev", "REST APIs", "Vite compiler", "Responsive Design", "Routing & Context API"]
  },
  {
    category: "Tools & Platforms",
    icon: <Wrench className="text-accent-purple" size={16} />,
    colorClass: "border-accent-purple/10 hover:border-accent-purple/30",
    glowClass: "bg-accent-purple/5",
    skills: ["Git & GitHub", "VS Code IDE", "Supabase BaaS", "Vercel Deployment", "NPM package managers"]
  },
  {
    category: "Core Computer Science",
    icon: <Cpu className="text-accent-blue" size={16} />,
    colorClass: "border-accent-blue/10 hover:border-accent-blue/30",
    glowClass: "bg-accent-blue/5",
    skills: ["Problem Solving", "Algorithmic Thinking", "Data Structures", "Object-Oriented Design", "Mathematical Logics"]
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-bg-dark text-white selection:bg-accent-purple/30 overflow-x-hidden flex flex-col justify-between">
          {/* 3D background element */}
          <Background3D />

          {/* Navigation Bar */}
          <Navbar />

          {/* MAIN PAGE CONTENTS */}
          <main className="relative z-10 flex-grow">
            
            {/* HERO SECTION */}
            <section
              id="home"
              className="relative min-h-screen flex items-center justify-center pt-24 pb-16"
            >
              <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
                {/* Visual Accent Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/5 rounded-full mb-6 backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                    Available for collaboration
                  </span>
                </motion.div>

                {/* Name Heading with slide-up reveal */}
                <h2 className="sr-only">Ikhlass Dahlouk</h2>
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.3 }}
                    className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white font-display"
                  >
                    Ikhlass Dahlouk
                  </motion.h1>
                </div>

                {/* Roles Description / Aurora effect text */}
                <div className="overflow-hidden mb-8">
                  <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.4 }}
                    className="text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-gradient-aurora max-w-3xl"
                  >
                    Computer Science Student &bull; Front-End Developer &bull; AI Enthusiast
                  </motion.p>
                </div>

                {/* short bio intro */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-sm sm:text-base text-slate-400 font-light max-w-2xl leading-relaxed mb-12"
                >
                  A final-year Computer Science student with a strong mathematical foundation (Baccalauréat score: 17.50/20) and a passion for engineering highly performant, visual user interfaces and exploring machine learning models.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  {/* View Projects */}
                  <button
                    onClick={() => handleScrollTo("#projects")}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full text-sm font-bold shadow-lg shadow-accent-purple/20 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <span>View Projects</span>
                    <ArrowRight size={16} />
                  </button>

                  {/* Contact Me */}
                  <button
                    onClick={() => handleScrollTo("#contact")}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/5 rounded-full text-sm font-semibold hover:bg-white/10 hover:border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-slate-300 hover:text-white"
                  >
                    <span>Contact Me</span>
                  </button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handleScrollTo("#about")}
                >
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500">Scroll</span>
                  <div className="w-[1px] h-10 bg-slate-700 relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1/2 bg-accent-purple"
                      animate={{ y: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>

              </div>
            </section>


            {/* ABOUT ME SECTION */}
            <section id="about" className="py-24 relative">
              <div className="max-w-6xl mx-auto px-6 text-center mb-16">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-purple font-mono">01 // Profile Outline</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 font-display">About Me</h2>
              </div>
              <BentoGrid />
            </section>


            {/* SKILLS SECTION */}
            <section id="skills" className="py-24 relative bg-[#050816]/30">
              <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-blue font-mono">02 // Technical Armament</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 font-display">Professional Skills</h2>
              </div>

              <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SKILLS_DATA.map((group, idx) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.08, duration: 0.6 }}
                    className={`glass-panel rounded-3xl p-6 relative overflow-hidden group border ${group.colorClass} glass-panel-hover`}
                  >
                    <div className={`absolute top-0 right-0 w-[100px] h-[100px] rounded-full blur-[40px] ${group.glowClass}`} />
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                      <div className="p-2.5 bg-white/5 border border-white/5 rounded-2xl">
                        {group.icon}
                      </div>
                      <h3 className="text-sm font-bold text-white tracking-tight uppercase font-mono">
                        {group.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>


            {/* TIMELINE: EXPERIENCE & EDUCATION */}
            <section id="experience" className="py-24 relative">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* EXPERIENCE COLUMN */}
                <div>
                  <div className="mb-12">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-cyan font-mono">03 // Practical Footprint</span>
                    <h2 className="text-3xl font-black tracking-tight text-white mt-1 font-display">Experience</h2>
                  </div>

                  <div className="relative border-l border-white/5 pl-8 ml-4 space-y-12">
                    
                    {/* Item 1: Peer Tutor */}
                    <div className="relative">
                      <div className="absolute -left-[45px] top-1.5 bg-bg-dark border-2 border-accent-cyan w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                        <Briefcase className="text-accent-cyan" size={10} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        Sep 2024 – Present
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 font-display">Peer Tutor &mdash; Algorithms & Algebra</h3>
                      <p className="text-xs text-accent-cyan font-semibold mt-0.5">University of Yahia Fares, Médéa</p>
                      
                      <ul className="text-xs text-slate-400 space-y-2 mt-4 list-disc pl-4 font-light leading-relaxed">
                        <li>Assisted first-year Computer Science students in grasping algorithms, structures, and linear algebra.</li>
                        <li>Simplified complex lecture concepts into working modules to support analytical problem-solving skills.</li>
                        <li>Created custom study guides and worked code scripts to reinforce foundations between classes.</li>
                        <li>Engaged peers consistently, refining tutoring approaches based on individual progress.</li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* EDUCATION COLUMN */}
                <div>
                  <div className="mb-12">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-purple font-mono">04 // Knowledge Foundations</span>
                    <h2 className="text-3xl font-black tracking-tight text-white mt-1 font-display">Education</h2>
                  </div>

                  <div className="relative border-l border-white/5 pl-8 ml-4 space-y-12">
                    
                    {/* Education 1: Bachelor */}
                    <div className="relative">
                      <div className="absolute -left-[45px] top-1.5 bg-bg-dark border-2 border-accent-purple w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                        <GraduationCap className="text-accent-purple" size={10} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        Sep 2024 &ndash; Jul 2027 (Expected)
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 font-display">Bachelor’s Degree in Computer Science</h3>
                      <p className="text-xs text-accent-purple font-semibold mt-0.5">University of Yahia Fares, Médéa</p>
                      <p className="text-xs text-slate-400 mt-2 font-light">
                        Focused on foundational computer science theory, architecture, data structures, algorithms, algebra, database configurations, and web development pipelines.
                      </p>
                    </div>

                    {/* Education 2: Bac Math 2023 */}
                    <div className="relative">
                      <div className="absolute -left-[45px] top-1.5 bg-bg-dark border-2 border-white/10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                        <BookOpen className="text-slate-400" size={10} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        June 2023
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 font-display">Baccalauréat &mdash; Mathematics Series</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">Médéa, Algeria</p>
                      <p className="text-xs text-slate-400 mt-2 font-light">
                        Scored <span className="text-accent-purple font-bold">17.50/20</span> &mdash; Top-tier performance in a nationally competitive exam highlighting math, physics, and science competencies.
                      </p>
                    </div>

                    {/* Education 3: Bac Math Retake 2024 */}
                    <div className="relative">
                      <div className="absolute -left-[45px] top-1.5 bg-bg-dark border-2 border-white/10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                        <BookOpen className="text-slate-400" size={10} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        June 2024
                      </span>
                      <h3 className="text-lg font-bold text-white mt-3 font-display">Baccalauréat &mdash; Mathematics Series (Retake)</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">Médéa, Algeria</p>
                      <p className="text-xs text-slate-400 mt-2 font-light">
                        Scored <span className="text-accent-purple font-bold">16.20/20</span> &mdash; Retook to further challenge academic thresholds and deepen mathematical foundations.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </section>


            {/* PROJECTS SECTION */}
            <section id="projects" className="py-24 relative bg-[#050816]/30">
              <div className="max-w-6xl mx-auto px-6 text-center mb-16">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-purple font-mono">05 // Handcrafted Works</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 font-display">Selected Projects</h2>
              </div>

              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS_DATA.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </section>


            {/* GITHUB INTEGRATION */}
            <section id="github" className="py-24 relative">
              <div className="max-w-6xl mx-auto px-6 text-center mb-16">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-blue font-mono">06 // Open Source Footprint</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 font-display">GitHub Contributions</h2>
              </div>
              <GitHubGrid />
            </section>


            {/* CONTACT SECTION */}
            <section id="contact" className="py-24 relative bg-[#050816]/30">
              <div className="max-w-6xl mx-auto px-6 text-center mb-16">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent-cyan font-mono">07 // Collaboration</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 font-display">Let's Connect</h2>
              </div>
              <ContactForm />
            </section>

          </main>

          {/* FOOTER */}
          <footer className="relative z-10 bg-[#050816] border-t border-white/5 py-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="text-left">
                <div className="text-lg font-black tracking-tight text-white font-display">
                  IKHLASS<span className="text-accent-purple">.</span>
                </div>
                <div className="text-xs text-slate-500 mt-1.5 font-light">
                  &copy; {new Date().getFullYear()} Ikhlass Dahlouk. All rights reserved.
                </div>
              </div>

              <div className="flex gap-6 text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">
                <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollTo("#home"); }} className="hover:text-white transition-colors duration-200">Home</a>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo("#about"); }} className="hover:text-white transition-colors duration-200">About</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); handleScrollTo("#projects"); }} className="hover:text-white transition-colors duration-200">Projects</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo("#contact"); }} className="hover:text-white transition-colors duration-200">Contact</a>
              </div>

              <div className="text-xs text-slate-600 font-light flex items-center gap-1.5">
                <span>Designed & Shipped with</span>
                <Sparkles size={12} className="text-accent-purple" />
              </div>

            </div>
          </footer>

        </div>
      )}
    </>
  );
}

export default App;
