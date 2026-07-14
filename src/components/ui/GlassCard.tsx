"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "purple" | "cyan" | "none";
}

const glowStyles = {
  blue: "shadow-[0_0_30px_-5px_rgba(96,165,250,0.15)] hover:shadow-[0_0_40px_-5px_rgba(96,165,250,0.25)]",
  purple: "shadow-[0_0_30px_-5px_rgba(167,139,250,0.15)] hover:shadow-[0_0_40px_-5px_rgba(167,139,250,0.25)]",
  cyan: "shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.25)]",
  none: "",
};

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass",
        glow !== "none" && glowStyles[glow],
        hover && "transition-all duration-300",
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              borderColor: "rgba(255, 255, 255, 0.12)",
            }
          : undefined
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
