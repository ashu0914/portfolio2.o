"use client";

import { useRef, useMemo, ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { charRevealContainer, charRevealItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function AnimatedText({
  text,
  className,
  delay = 0,
  tag = "p",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Split text into individual characters, preserving spaces
  const chars = useMemo(() => text.split(""), [text]);

  // Dynamically choose the wrapper tag
  const Tag = tag as ElementType;

  return (
    <Tag ref={ref} className={cn("overflow-hidden", className)}>
      <motion.span
        variants={charRevealContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap"
        style={{ transitionDelay: `${delay}s` }}
        custom={delay}
      >
        {chars.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: delay + index * 0.03,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
            className="inline-block"
            style={{
              width: char === " " ? "0.3em" : "auto",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
