'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { PERSONAL } from '@/lib/constants';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });
const HolographicGlobe = dynamic(() => import('@/components/three/HolographicGlobe'), { ssr: false });
const SkillCubes = dynamic(() => import('@/components/three/SkillCubes'), { ssr: false });

export default function AboutHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const paragraphs = PERSONAL.aboutLong.split('\n\n');

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-purple/5 blur-[120px]" />

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-32">
        {/* Text content */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-accent-purple" />
            <span className="text-accent-purple text-sm uppercase tracking-[0.2em] font-mono">
              About Me
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
          >
            <span className="text-gradient">The Story</span>
            <br />
            <span className="text-white">Behind the Code</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-muted text-lg leading-relaxed mb-6"
          >
            {PERSONAL.bio}
          </motion.p>

          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
              className="text-text-muted text-base leading-relaxed mb-4"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 mt-8"
          >
            <div className="glass px-5 py-2.5 rounded-full">
              <span className="text-accent text-sm font-mono">📍 {PERSONAL.location}</span>
            </div>
            <div className="glass px-5 py-2.5 rounded-full">
              <span className="text-accent-purple text-sm font-mono">🎓 CS Engineering</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="order-1 lg:order-2 h-[400px] lg:h-[600px] relative"
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#a78bfa" />
            <HolographicGlobe />
            <SkillCubes />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
