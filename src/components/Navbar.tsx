import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" }
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scrolling to add borders and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor intersection of sections
  useEffect(() => {
    const observers = NAV_ITEMS.map((item) => {
      const element = document.querySelector(item.href);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.href.substring(1));
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-[#050816]/75 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="text-2xl font-black tracking-tight text-white font-display select-none group"
          >
            IKHLASS
            <span className="text-accent-purple group-hover:text-accent-cyan transition-colors duration-300">
              .
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-full tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-accent-purple/20 border border-accent-purple/40 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/ikhlass-ce"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 bg-white/5 border border-white/5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
            >
              <Github size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-blue text-xs font-bold rounded-full text-white border border-white/10 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white bg-white/5 border border-white/5 rounded-full transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden bg-[#050816]/95 backdrop-blur-xl flex flex-col justify-center"
          >
            {/* Background glowing blob */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent-purple/15 rounded-full blur-[100px] pointer-events-none" />

            <nav className="flex flex-col items-center gap-6 px-6">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className={`text-2xl font-bold tracking-tight ${
                      isActive
                        ? "text-accent-purple"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              {/* Extra social links in drawer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.5 }}
                className="flex gap-4 mt-8"
              >
                <a
                  href="https://github.com/ikhlass-ce"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 border border-white/5 rounded-full text-slate-300 hover:text-white"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:arina11mit@gmail.com"
                  className="p-3 bg-white/5 border border-white/5 rounded-full text-slate-300 hover:text-white"
                >
                  <Mail size={20} />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
