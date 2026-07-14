'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function ProjectsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-cyan/5 blur-[100px]" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 text-center container-custom"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm uppercase tracking-[0.2em] font-mono">
            Portfolio
          </span>
          <div className="w-8 h-px bg-accent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-gradient">Projects</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto"
        >
          A showcase of my work in AI, web development, and creative technology.
          Each project represents a step forward in building intelligent systems.
        </motion.p>
      </motion.div>
    </section>
  );
}
