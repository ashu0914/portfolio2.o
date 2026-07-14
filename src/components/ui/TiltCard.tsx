"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className,
  intensity = 15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Normalize to -1...1 range, then scale by intensity
    const normalizedX = mouseY / (rect.height / 2);
    const normalizedY = mouseX / (rect.width / 2);

    // Invert X so tilting "toward" the cursor feels natural
    rotateX.set(-normalizedX * intensity);
    rotateY.set(normalizedY * intensity);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
