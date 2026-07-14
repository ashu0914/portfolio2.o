"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center"
      )}
    >
      {/* Label with accent line */}
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="w-8 h-px bg-accent" />
        <span className="uppercase tracking-[0.2em] text-accent text-sm font-medium">
          {label}
        </span>
        {align === "center" && <span className="w-8 h-px bg-accent" />}
      </div>

      {/* Title */}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-text-muted text-lg mt-4 max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
