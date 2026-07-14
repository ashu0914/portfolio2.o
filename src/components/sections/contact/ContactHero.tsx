'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { fadeInUp } from '@/lib/animations';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });
const FloatingSphere = dynamic(() => import('@/components/three/FloatingSphere'), { ssr: false });
const NetworkLines = dynamic(() => import('@/components/three/NetworkLines'), { ssr: false });

export default function ContactHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#60a5fa" />
          <FloatingSphere />
          <NetworkLines />
        </Canvas>
      </div>

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />

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
            Connect
          </span>
          <div className="w-8 h-px bg-accent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-gradient">Get in Touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto"
        >
          Have a project in mind or want to collaborate?
          Let&apos;s connect and build something amazing together.
        </motion.p>
      </motion.div>
    </section>
  );
}
