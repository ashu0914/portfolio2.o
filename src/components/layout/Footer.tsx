"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitFork, Globe, Code2 } from "lucide-react";
import { SOCIALS, PERSONAL } from "@/lib/constants";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const socialLinks = [
  { icon: GitFork, href: SOCIALS.github, label: "GitHub" },
  { icon: Globe, href: SOCIALS.linkedin, label: "LinkedIn" },
  { icon: Code2, href: SOCIALS.leetcode, label: "LeetCode" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="border-t border-white/5">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container-custom py-8 md:py-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <motion.p
            variants={staggerItem}
            className="text-text-muted text-sm order-2 md:order-1"
          >
            &copy; {new Date().getFullYear()} {PERSONAL.name}
          </motion.p>

          {/* Center: Social Icons */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4 order-1 md:order-2"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative p-2.5 rounded-xl text-text-muted hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Hover glow background */}
                <span className="absolute inset-0 rounded-xl bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <Icon size={20} className="relative z-10" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Tagline */}
          <motion.p
            variants={staggerItem}
            className="text-text-subtle text-sm order-3"
          >
            Crafted with{" "}
            <span className="text-accent-purple">passion</span>
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}
