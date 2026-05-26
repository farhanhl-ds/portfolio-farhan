import { HERO_CONFIG } from "../constants/hero";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Github,
  Linkedin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WordsPullUp } from "./animations";

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Hero({ onScrollTo }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen bg-[#050505] p-4 md:p-6 overflow-hidden"
    >
      {/* Nav Bar */}
      <nav className="fixed top-6 left-0 right-0 px-4 md:px-8 lg:px-16 z-50 flex items-center justify-between w-full pointer-events-none">
        {/* Left — Logo */}
        <div className="pointer-events-auto">
          <button
            onClick={() => onScrollTo("home")}
            className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass text-[#E1E0CC] hover:bg-white/10 transition-colors cursor-pointer"
            title="Farhan Home"
          >
            <span className="font-serif italic text-2xl lowercase leading-none select-none">
              f
            </span>
          </button>
        </div>

        {/* Center — Desktop Nav */}
        <div className="hidden lg:flex items-center justify-between liquid-glass rounded-full px-2 py-1.5 gap-6 pointer-events-auto">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollTo(link.id)}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-[#E1E0CC] transition-colors cursor-pointer select-none"
              >
                {link.name}
              </button>
            ))}
          </div>
          <a
            href={HERO_CONFIG.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-[#DEDBC8] transition-all cursor-pointer select-none"
          >
            Download CV
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right — Mobile Toggle */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full liquid-glass text-[#E1E0CC] hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 bg-black/95 rounded-3xl p-6 z-40 block lg:hidden border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onScrollTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-4 rounded-xl hover:bg-white/5 text-[#E1E0CC] text-lg font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <hr className="border-white/10 my-1" />
              <a
                href={HERO_CONFIG.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full py-3 px-4 bg-[#DEDBC8] text-black rounded-xl font-bold text-center mt-2 group"
              >
                <span>Download CV</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-950">
        {/* Background Video */}
        <video
          ref={videoRef}
          src={HERO_CONFIG.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_CONFIG.videoPoster}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 z-10 pointer-events-none" />

        {/* Status Bar */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-12 z-20 hidden md:flex items-center gap-4 text-xs font-medium">
          <span className="text-[#E1E0CC]/40 tracking-wider">
            FARHAN HAMID LUBIS &copy; 2026
          </span>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2 text-[#DEDBC8] font-mono tracking-wider select-none text-[10px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DEDBC8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DEDBC8]" />
            </span>
            STATUS: OPEN TO WORK
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-8 md:px-12 pb-10 sm:pb-12 md:pb-16">
          <div className="w-full max-w-7xl mx-auto">
            {/* Name & Title */}
            <div className="flex flex-col items-start justify-end">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-mono text-[#E1E0CC]/55 text-xs sm:text-sm tracking-[0.25em] uppercase font-light leading-none mb-1"
              >
                Hello, I am
              </motion.p>

              <WordsPullUp
                text="Farhan"
                className="font-sans font-medium tracking-tighter text-[#E1E0CC] select-none leading-none
                          text-[22vw] sm:text-[20vw] md:text-[19vw] lg:text-[17vw] xl:text-[16vw] 2xl:text-[14vw]"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-mono text-[#E1E0CC]/55 text-[12px] sm:text-xs md:text-sm lg:text-base xl:text-lg tracking-[0.32em] uppercase font-light leading-relaxed mb-8"
              >
                Data Engineer · MLOps · Data Scientist
              </motion.p>

              {/* Social + CTA — inline, left-aligned */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-3"
              >
                <a
                  href={HERO_CONFIG.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full liquid-glass text-[#E1E0CC] hover:bg-white/10 transition-colors cursor-pointer border border-white/20 bg-white/5"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href={HERO_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full liquid-glass text-[#E1E0CC] hover:bg-white/10 transition-colors cursor-pointer border border-white/20 bg-white/5"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>

                {/* Divider */}
                <div className="w-px h-6 bg-white/15" />

                <button
                  onClick={() => onScrollTo("projects")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 group cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <span className="bg-black rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-[#DEDBC8]" />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
