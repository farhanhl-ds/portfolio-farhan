import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 py-10 px-4 sm:px-8 lg:px-16 w-full relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left coordinates */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 selection:bg-zinc-900 selection:text-white">
          <p className="text-[#DEDBC8]/90 font-serif text-base italic tracking-tight">
            Farhan Hamid Lubis
          </p>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
            © {currentYear} · All systems compiled out-of-core
          </span>
        </div>

        {/* Right coordinates handles */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/farhanhl-ds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/farhanhamidlubis/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:farhanhamidlubis@gmail.com"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Email Dispatch"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
