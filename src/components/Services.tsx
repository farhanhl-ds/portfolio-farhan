import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { WordsPullUpMultiStyle } from "./animations";

export default function Services({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const headerSegments = [
    { text: "End-to-end data systems, ", className: "text-[#E1E0CC]" },
    { text: "built for the long run.", className: "text-gray-500 font-light" }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const servicesData = [
    {
      id: "01",
      title: "Data Engineering",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
      items: [
        "Pipeline design with Apache Airflow",
        "Data warehouse & lakehouse architecture",
        "ETL/ELT with dbt & Spark",
        "Real-time streaming with Kafka",
      ],
    },
    {
      id: "02",
      title: "MLOps & Model Deployment",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
      items: [
        "ML experiment tracking with MLflow",
        "Model serving & API deployment (FastAPI, Docker)",
        "CI/CD pipelines for ML workflows",
      ],
    },
    {
      id: "03",
      title: "Data Science & Analytics",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
      items: [
        "Exploratory data analysis & visualization",
        "Churn prediction & customer segmentation",
        "Business intelligence dashboards (Superset, Metabase)",
      ],
    },
  ];

  return (
    <section id="services" className="relative bg-black py-24 sm:py-32 px-4 md:px-8 flex flex-col justify-center min-h-screen">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 sm:gap-16">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase block mb-4 font-semibold">
            Capabilities
          </span>
          <WordsPullUpMultiStyle
            segments={headerSegments}
            className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.25] text-left justify-start"
          />
        </div>

        {/* Responsive Grid with useInView animation */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-2 lg:h-[500px]"
          id="services-grid"
        >
          {/* Card 1: Video Card with immersive loop background */}
          <motion.div
            variants={cardVariants}
            className="relative lg:h-full h-[320px] rounded-[1.75rem] overflow-hidden bg-zinc-950 group border border-white/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(222,219,200,0.08)] transition-all duration-300"
            id="service-card-video"
          >
            {/* Background Video */}
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 z-10" />

            {/* Bottom text: "Where data meets decisions." */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <p className="text-lg sm:text-xl font-medium tracking-wide leading-snug" style={{ color: "#E1E0CC" }}>
                Where data meets decisions.
              </p>
              <div className="w-8 h-[2px] bg-primary mt-2 group-hover:w-16 transition-all duration-500" />
            </div>
          </motion.div>

          {/* Cards 2, 3, 4: Detailed descriptive list cards */}
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="bg-[#121212]/80 backdrop-blur-md rounded-[1.75rem] p-6 flex flex-col justify-between border border-white/5 hover:border-primary/25 hover:shadow-[0_20px_50px_rgba(222,219,200,0.08)] transition-all duration-300 lg:h-full min-h-[360px] group relative"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Small Image Icon at Top */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center p-2.5 border border-white/5">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] text-primary/30 tracking-widest font-mono select-none">
                    {service.id}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-6 tracking-wide group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Checklist items */}
                <ul className="flex flex-col gap-3.5">
                  {service.items.map((item, id) => (
                    <li key={id} className="flex items-start gap-2.5">
                      <div className="p-0.5 bg-neutral-800/80 rounded-md border border-white/5 mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400 font-light leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom "Learn more" interactive link */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span
                  onClick={() => onScrollTo("projects")}
                  className="text-xs font-medium text-primary/70 cursor-pointer">
                  Learn more
                </span>
                <span
                onClick={() => onScrollTo("projects")}
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors duration-300 cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 text-[#E1E0CC] group-hover:text-black transition-transform duration-300" />
                </span>
              </div>
            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
}
