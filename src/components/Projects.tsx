import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, X, Github } from "lucide-react";

import { WordsPullUp } from "./animations";
import ConstellationBackground from "./ConstellationBackground";
import { baseProjects } from "@/data/projects";
import type { ProjectItem } from "@/data/projects";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  const updateTransforms = () => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const containerWidth = containerRect.width;

    const cards = container.querySelectorAll(".project-card-3d");
    let currentClosestIndex = 0;
    let minDistanceValue = Infinity;

    cards.forEach((cardEl, idx) => {
      const card = cardEl as HTMLDivElement;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;

      const halfWidth = containerWidth > 0 ? containerWidth / 2 : 1;
      const dist = (cardCenter - containerCenter) / halfWidth;

      const visualDist = Math.abs(cardCenter - containerCenter);
      if (visualDist < minDistanceValue) {
        minDistanceValue = visualDist;
        currentClosestIndex = idx;
      }

      const rotateY = dist * -16;
      const scale = Math.max(0.85, Math.min(1.02, 1 - Math.abs(dist) * 0.08));
      const translateZ = Math.max(-140, Math.min(0, Math.abs(dist) * -90));
      const opacity = Math.max(0.4, 1 - Math.abs(dist) * 0.45);

      card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
      card.style.opacity = opacity.toString();
    });

    setActiveIndex(currentClosestIndex);

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (maxScrollLeft > 0) {
      // scroll percentage available for future progress bar use
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const timer = setTimeout(() => updateTransforms(), 100);
    const handleScroll = () => updateTransforms();
    const handleResize = () => updateTransforms();

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleDragStart = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStartXRef.current = e.pageX - container.offsetLeft;
    dragScrollLeftRef.current = container.scrollLeft;
    container.style.scrollBehavior = "auto";
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.5;
    container.scrollLeft = dragScrollLeftRef.current - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const container = scrollRef.current;
    if (container) container.style.scrollBehavior = "smooth";
  };

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".project-card-3d");
    const targetCard = cards[index] as HTMLDivElement;
    if (targetCard) {
      container.style.scrollBehavior = "smooth";
      const targetScrollLeft =
        targetCard.offsetLeft -
        container.clientWidth / 2 +
        targetCard.clientWidth / 2;
      container.scrollLeft = targetScrollLeft;
    }
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedProject(baseProjects[index]);
    } else {
      scrollToCard(index);
    }
  };

  const handleArrowScroll = (direction: "left" | "right") => {
    const nextIndex =
      direction === "left"
        ? Math.max(0, activeIndex - 1)
        : Math.min(baseProjects.length - 1, activeIndex + 1);
    scrollToCard(nextIndex);
  };

  return (
    <section
      id="projects"
      className="relative bg-[#050505] py-12 sm:py-16 w-full overflow-hidden select-none"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.0125] z-30"
        style={{ mixBlendMode: "overlay" }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.7 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Radial glows */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none" />

      <ConstellationBackground />

      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase block mb-4 font-semibold animate-pulse">
              Featured Projects
            </span>
            <WordsPullUp
              text="Built.Shipped.Proven."
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#E1E0CC] font-normal leading-none"
            />
          </div>

          <div className="flex flex-col items-end gap-5 self-start md:self-end">
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleArrowScroll("left")}
                className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:border-white/60 hover:text-white flex items-center justify-center transition-all bg-zinc-900/40 cursor-pointer active:scale-95 shadow-md shadow-black/20"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleArrowScroll("right")}
                className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:border-white/60 hover:text-white flex items-center justify-center transition-all bg-zinc-900/40 cursor-pointer active:scale-95 shadow-md shadow-black/20"
                aria-label="Next project"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Track */}
        <div ref={wrapperRef} className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#050505] via-[#050505]/45 to-transparent pointer-events-none z-40" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#050505] via-[#050505]/45 to-transparent pointer-events-none z-40" />

          <div
            ref={scrollRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            className="w-full flex gap-6 overflow-x-auto select-none py-8 scroll-smooth cursor-grab active:cursor-grabbing"
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
              paddingLeft: "calc(50% - 162.5px)",
              paddingRight: "calc(50% - 162.5px)",
              scrollbarWidth: "none",
              scrollSnapType: isDragging ? "none" : "x mandatory",
            }}
          >
            {baseProjects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={project.uid}
                  onClick={() => handleCardClick(index)}
                  className="project-card-3d dark-glass flex-shrink-0 w-[325px] h-[480px] rounded-[1.75rem] flex flex-col justify-between p-7 relative group cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: isDragging
                      ? "transform 0.1s ease-out, opacity 0.3s ease-out"
                      : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease-out",
                    scrollSnapAlign: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.75rem]" />

                  {/* Badge + index number */}
                  <div className="flex justify-between items-start z-10 w-full">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 shadow-inner">
                      <IconComponent className="w-3.5 h-3.5 text-primary/80" />
                      <span className="text-[10px] tracking-[0.2em] font-mono font-semibold text-white/75 uppercase">
                        {project.label}
                      </span>
                    </div>
                    <span className="text-4xl font-serif italic text-white/10 group-hover:text-primary/40 leading-none mr-1 select-none transition-all duration-500">
                      {project.id}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-full h-[180px] rounded-2xl overflow-hidden mt-4 mb-4 relative border border-white/5 group-hover:border-[#DEDBC8]/30 transition-all duration-500 shadow-lg shadow-black/80">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-dashed border-[#DEDBC8]/40 flex items-center justify-center relative">
                        <span className="absolute inset-0 rounded-full border border-dashed border-[#DEDBC8]/20 animate-[spin_8s_linear_infinite]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8] animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2.5 z-10 w-full mt-auto">
                    <h3 className="text-2xl font-light text-white group-hover:text-primary transition-colors duration-300 tracking-wide leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light transition-colors duration-300 line-clamp-3 group-hover:text-zinc-300">
                      {project.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="max-w-md mx-auto w-full px-4 mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2">
            {baseProjects.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={project.uid}
                  onClick={() => scrollToCard(idx)}
                  className="group relative flex items-center justify-center py-2 px-1 cursor-pointer"
                  aria-label={`Go to project ${idx + 1}`}
                >
                  <div
                    className={`h-1 transition-all duration-300 rounded-full ${
                      isActive
                        ? "w-8 bg-[#DEDBC8]"
                        : "w-2.5 bg-white/20 hover:bg-white/50"
                    }`}
                  />
                  <span className="absolute -top-7 text-[10px] font-mono tracking-widest text-[#DEDBC8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 px-1.5 py-0.5 rounded border border-white/10 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {project.id}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#DEDBC8]/40 uppercase mt-1 select-none">
            <span className="text-[#E1E0CC] font-semibold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-white/10">/</span>
            <span>{String(baseProjects.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-zoom-out"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-4xl bg-[#090909] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-12 md:items-stretch max-h-[90vh] md:max-h-[85vh] z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-30 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors hover:bg-black/80 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left: thumbnail column */}
              <div className="relative md:col-span-5 hidden md:block select-none overflow-hidden bg-zinc-950 border-r border-white/5">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30 pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-1.5 pointer-events-none">
                  <span className="text-white/10 text-8xl font-serif italic mb-2 tracking-tight">
                    {selectedProject.id}
                  </span>
                  <div className="flex items-center gap-2 text-primary/70 font-mono text-[10px] tracking-[0.2em] uppercase">
                    {React.createElement(selectedProject.icon, {
                      className: "w-3.5 h-3.5",
                    })}
                    {selectedProject.label}
                  </div>
                </div>
              </div>

              {/* Right: content column */}
              <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col overflow-y-auto max-h-[75vh] md:max-h-[85vh] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
                {/* Label + ID */}
                <div className="flex items-center gap-3 mb-4 select-none">
                  <span className="text-[#DEDBC8] text-[10px] uppercase font-mono tracking-[0.22em] bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    {selectedProject.label}
                  </span>
                  <span className="text-zinc-600 text-xs font-mono">
                    ID: {selectedProject.id}
                  </span>
                </div>

                {/* Title + GitHub */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-[#E1E0CC] font-normal tracking-tight leading-snug pr-2">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-primary border border-white/10 hover:border-primary/40 px-3.5 py-2 rounded-full bg-zinc-900/60 hover:bg-[#DEDBC8]/10 transition-all self-start sm:self-auto shadow-md cursor-pointer shrink-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Repo
                    </a>
                  )}
                </div>

                {/* Full description */}
                <p className="text-zinc-300 font-sans font-light text-sm sm:text-base leading-relaxed tracking-wide mb-8">
                  {selectedProject.fullDescription}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-6 mb-8 select-none">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight leading-none mb-1">
                        {metric.value}
                      </span>
                      <span className="text-[10px] tracking-wider text-zinc-500 font-mono uppercase whitespace-nowrap">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Challenge + Solution */}
                <div className="flex flex-col gap-6 mb-8 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-semibold">
                      THE ENGINEERING CHALLENGE
                    </h4>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-primary/[0.02] border border-primary/10">
                    <h4 className="font-mono text-[10px] text-primary/80 uppercase tracking-widest mb-2 font-semibold">
                      THE SOLUTION
                    </h4>
                    <p className="text-zinc-300 font-light leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mt-auto">
                  <span className="text-[9.5px] tracking-[0.2em] text-zinc-500 font-mono block uppercase mb-3 select-none">
                    OPERATIONAL STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-mono bg-zinc-900 border border-white/5 text-zinc-400 px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
