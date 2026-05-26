/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Analytics } from '@vercel/analytics/react';
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Small delay to let mobile drawers toggle gracefully if needed
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <div className="bg-black text-white selection:bg-[#DEDBC8] selection:text-black min-h-screen relative font-sans overflow-x-hidden antialiased">
      {/* Dynamic continuous background lighting overlay */}
      <div className="absolute top-[15%] left-[20%] w-[35rem] h-[35rem] bg-[#DEDBC8]/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[40rem] h-[40rem] bg-[#DEDBC8]/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[75%] left-[5%] w-[30rem] h-[30rem] bg-[#DEDBC8]/4 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section (Section 1) */}
      <Hero onScrollTo={handleScrollTo} />

      {/* About Section (Section 2) */}
      <About />

      {/* Services Section (Section 3) */}
      <Services onScrollTo={handleScrollTo} />

      {/* Projects Section (Section 4) */}
      <Projects />

      {/* Contact Section & Footer */}
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
}

