import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
}

export function WordsPullUp({ text, className = "" }: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden -ml-[0.085em] select-none"
          style={{ position: "relative" }}
        >
          <motion.span
            variants={wordVariants}
            className="inline-block relative"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export function WordsPullUpMultiStyle({
  segments,
  className = "",
}: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const wordsWithStyle = segments.flatMap((seg) =>
    seg.text.split(" ").map((word) => ({
      word,
      className: seg.className || "",
    })),
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {wordsWithStyle.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-[0.22em] pb-[0.05em] select-none"
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
