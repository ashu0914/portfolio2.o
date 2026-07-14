'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { fadeInUp } from '@/lib/animations';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });
const SkillGalaxy = dynamic(() => import('@/components/three/SkillGalaxy'), { ssr: false });

export default function SkillsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <SkillGalaxy />
        </Canvas>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[120px]" />

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
          <div className="w-8 h-px bg-accent-purple" />
          <span className="text-accent-purple text-sm uppercase tracking-[0.2em] font-mono">
            Expertise
          </span>
          <div className="w-8 h-px bg-accent-purple" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-gradient">Skills</span>
          <span className="text-white"> & </span>
          <span className="text-gradient">Certifications</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto"
        >
          Technologies, tools, and credentials that power my work across
          AI, development, and creative domains.
        </motion.p>
      </motion.div>
    </section>
  );
}
