'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PERSONAL } from '@/lib/constants';
import {
  fadeInUp,
  charRevealContainer,
  charRevealItem,
  staggerContainer,
  staggerItem,
} from '@/lib/animations';
import { cn } from '@/lib/utils';

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);
const FloatingBrain = dynamic(
  () => import('@/components/three/FloatingBrain'),
  { ssr: false }
);
const ParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false }
);
const NeuralGrid = dynamic(
  () => import('@/components/three/NeuralGrid'),
  { ssr: false }
);

const nameChars = 'Ashirwad Jha'.split('');

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── Radial gradient overlay for depth ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(96,165,250,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(167,139,250,0.06) 0%, transparent 60%)',
        }}
      />

      {/* ── 3D Canvas background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <pointLight position={[-10, -5, 5]} intensity={0.3} color="#a78bfa" />
          <FloatingBrain />
          <ParticleField />
          <NeuralGrid />
        </Canvas>
      </div>

      {/* ── Content overlay ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        {/* Name — char-by-char reveal */}
        <motion.h1
          variants={charRevealContainer}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight"
        >
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              variants={charRevealItem}
              className={cn(
                'inline-block',
                char === ' ' && 'w-[0.3em]'
              )}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-text-muted font-body max-w-2xl"
        >
          {PERSONAL.title}
        </motion.p>

        {/* Role pills */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {PERSONAL.roles.map((role: string) => (
            <motion.span
              key={role}
              variants={staggerItem}
              className="glass px-4 py-2 rounded-full text-sm font-mono text-text-muted border border-white/5 backdrop-blur-md"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted/60 uppercase tracking-widest font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
