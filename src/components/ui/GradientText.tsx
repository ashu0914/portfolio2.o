"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-accent via-accent-purple to-accent-cyan bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
