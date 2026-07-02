import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
  "Initializing premium design system...",
  "Loading portfolio core modules...",
  "Compiling algorithms & algebra...",
  "Connecting to GitHub profile API...",
  "Initializing CS50 AI neural net...",
  "Setting up React 19 + Vite environment...",
  "Loading Bellemont E-commerce assets...",
  "Fetching Piple Netflix-inspired components...",
  "Optimizing layout grids & aurora backgrounds...",
  "Ready to launch digital experience..."
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Progress increment timer
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setIsLoaded(true);
          return 100;
        }
        // Random incremental steps for natural feel
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    // Message cycler timer
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % BOOT_MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Small delay for cinematic transition
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark font-sans"
          exit={{ 
            opacity: 0,
            y: -50,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
          }}
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-purple/10 rounded-full blur-[100px]" />
          
          <div className="relative w-full max-w-md px-6 text-center">
            {/* Logo Drawing / Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white font-display"
            >
              IKHLASS<span className="text-accent-purple">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-white/50 mb-16"
            >
              Creative Front-End Portfolio
            </motion.p>

            {/* Terminal Boot Log */}
            <div className="h-6 mb-4 text-xs font-mono text-slate-400 select-none">
              <motion.span
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {BOOT_MESSAGES[currentMessageIndex]}
              </motion.span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan"
                style={{ width: `${progress}%` }}
                layoutId="progressBar"
              />
            </div>

            {/* Progress percentage */}
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>SYSTEM STATS: STABLE</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
