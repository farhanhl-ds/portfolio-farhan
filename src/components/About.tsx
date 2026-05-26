import React from "react";
import { motion } from "motion/react";

import founderImg from "@/assets/images/founder_portrait_square.webp";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#050505] py-24 sm:py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Subtle radial light backdrops */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-zinc-950/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-zinc-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Principal Director Portrait instead of retro CRT TV */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative rounded-[2rem] overflow-hidden group select-none min-h-[450px] lg:min-h-full flex shadow-2xl shadow-black/80 border border-white/[0.05]"
          >
            <img
              src={founderImg}
              alt="Farhan Hamid Lubis - Data Engineer & MLOps"
              className="w-full h-full object-cover object-center transition-all duration-1000 ease-out scale-100 group-hover:scale-[1.03] filter brightness-[0.95]"
            />

            {/* Overlay Gradient that accentuates portrait depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />
            
            {/* Subtle overlay typography */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col pointer-events-none">
              <span className="text-zinc-500 text-[10px] tracking-[0.2em] font-mono mb-1">
                PORTFOLIO OWNER
              </span>
              <span className="text-[#E1E0CC] text-lg font-serif italic font-light tracking-tight">
                Farhan Hamid Lubis
              </span>
              <span className="text-white/40 text-[10px] tracking-wider font-mono">
                Data Engineer · MLOps · Data Scientist
              </span>
            </div>

            {/* Sleek subtle border gloss */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />

            {/* Eye click/hover state indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/0 hover:bg-[#050505]/20 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dark Elegant Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 liquid-glass border border-white/5 rounded-[2rem] p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between shadow-2xl shadow-black/80 relative overflow-hidden group min-h-[500px]"
          >
            {/* Subtle light gloss background scale trigger on group hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* TOP Section: Elegant Lead Headline */}
            <div className="mb-12">
              <span className="text-zinc-600 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-mono block mb-6 select-none">
                MY PHILOSOPHY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif italic text-white font-normal tracking-tight leading-[1.12]">
                Designing resilient data{" "}
                <span className="text-white/90">pipelines & systems.</span>
              </h2>
            </div>

            {/* MIDDLE Section: Precise Description */}
            <div className="mb-12">
              <p className="text-zinc-400 font-sans font-light text-sm sm:text-base leading-relaxed tracking-wide max-w-[560px]">
                I am a specialized data practitioner operating at the
                intersection of robust Data Engineering/MLOps, explanatory Data
                Science, and strategic Data Analysis. I construct modern
                analytical pipelines and high-efficiency feature serving layers
                to turn unstructured complexity into direct business
                intelligence.
              </p>
            </div>

            {/* BOTTOM Section: Core Statistics Breakdown */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/[0.08] pt-10 mt-auto">
              <div>
                <span className="text-3xl sm:text-4xl font-light text-white tracking-tight font-sans block mb-1">
                  10+
                </span>
                <span className="text-[10px] tracking-[0.18em] text-zinc-500 font-mono block uppercase">
                  YEARS OF PYTHON PROGRAMMING
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-light text-white tracking-tight font-sans block mb-1">
                  3+
                </span>
                <span className="text-[10px] tracking-[0.18em] text-zinc-500 font-mono block uppercase">
                  YEARS DATA-INTENSIVE EXPERIENCE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
