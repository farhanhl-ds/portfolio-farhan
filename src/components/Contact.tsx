import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Mail,
  MapPin,
  Calendar,
  Check,
  Send,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please key in all required fields to send dispatch.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please input a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/maqkpaaz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Dispatch failed. Please try again or email directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      icon: <Mail className="w-4 h-4 text-[#DEDBC8]" />,
      title: "ELECTRONIC DISPATCH",
      detail: "farhanhamidlubis@gmail.com",
      href: "mailto:farhanhamidlubis@gmail.com",
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#DEDBC8]" />,
      title: "STATION LOCATION",
      detail: "Bandung, Indonesia • Remote Available",
    },
    {
      icon: <Calendar className="w-4 h-4 text-[#DEDBC8]" />,
      title: "ENGINEERING CAPACITY",
      detail: "Open for standard consultancy & active full-time roles",
    },
  ];

  return (
    <section
      id="contact"
      className="bg-[#050505] py-24 px-4 sm:px-6 md:px-8 w-full block min-h-screen relative flex flex-col justify-center"
      ref={sectionRef}
    >
      <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8 justify-between"
          >
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[#DEDBC8]/60 font-mono text-xs tracking-[0.25em] uppercase block mb-3">
                  System Dispatch
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-none">
                  Let's craft the{" "}
                  <span className="font-serif italic text-[#DEDBC8]">
                    data engine
                  </span>{" "}
                  of tomorrow.
                </h2>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-[1.65]">
                Have a challenging storage problem, a machine learning
                orchestration roadblock, or an enterprise pipeline deployment
                requiring ironclad automation? Fire a dispatch.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              {contacts.map((item, idx) => (
                <div
                  key={idx}
                  className="liquid-glass p-4 rounded-xl flex gap-4 items-start shadow-sm border border-white/5"
                >
                  <div className="w-9 h-9 rounded-md bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono tracking-widest text-[#DEDBC8]/50 block uppercase mb-0.5">
                      {item.title}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-xs sm:text-sm text-white hover:text-[#DEDBC8] transition-colors hover:underline block truncate font-light"
                      >
                        {item.detail}{" "}
                        <ArrowUpRight className="inline-block w-3.5 h-3.5 ml-0.5 text-[#DEDBC8]" />
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm text-zinc-300 block font-light leading-snug">
                        {item.detail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 hidden lg:block">
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
                System Time Check: {new Date().toISOString().slice(0, 10)} UTC
              </span>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 liquid-glass p-6 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-sm border border-white/5"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 relative z-10"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="text-lg font-mono text-[#DEDBC8]">
                      COMMUNICATIONS TUNNEL
                    </h3>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[10px] font-mono tracking-widest text-[#DEDBC8]/60 block"
                      htmlFor="contact-name"
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DEDBC8] focus:ring-1 focus:ring-[#DEDBC8]/50 transition-all duration-300 font-light placeholder:text-zinc-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[10px] font-mono tracking-widest text-[#DEDBC8]/60 block"
                      htmlFor="contact-email"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., jane@company.com"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DEDBC8] focus:ring-1 focus:ring-[#DEDBC8]/50 transition-all duration-300 font-light placeholder:text-zinc-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[10px] font-mono tracking-widest text-[#DEDBC8]/60 block"
                      htmlFor="contact-message"
                    >
                      MESSAGE CONTEXT *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Detail your system goals, pipeline requirements or general project queries..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DEDBC8] focus:ring-1 focus:ring-[#DEDBC8]/50 transition-all duration-300 font-light resize-none leading-relaxed placeholder:text-zinc-600"
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-red-950/20 border border-red-900/50 text-red-200 text-xs px-4 py-3 rounded-lg flex items-center gap-2 font-mono"
                      >
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black font-semibold rounded-full py-3.5 px-6 flex items-center justify-center gap-2 transition-all cursor-pointer duration-300 text-sm disabled:opacity-55"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Routing communications packets...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Submit Dispatch</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-12 px-6 gap-6 relative z-10 min-h-[420px]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#DEDBC8] flex items-center justify-center text-black shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono tracking-[0.3em] text-[#DEDBC8]/70 uppercase">
                      DISPATCH GATED SUCCESSFULLY
                    </span>
                    <h3 className="text-2xl font-light text-white tracking-tight">
                      Communication node open!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-sm mx-auto leading-relaxed mt-2">
                      Your diagnostic parameters have been logged. Farhan Hamid
                      Lubis will review and establish contact inside the next 24
                      hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-mono text-[#DEDBC8] font-bold hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10 rounded-full px-5 py-2 mt-4 bg-white/5"
                  >
                    SEND ANOTHER PACKET
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
