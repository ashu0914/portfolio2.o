'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import GradientText from '@/components/ui/GradientText';
import { fadeInUp } from '@/lib/animations';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(167,139,250,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        ref={ref}
        className="container-custom relative z-10 flex flex-col items-center text-center"
      >
        {/* Heading */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Let&apos;s Build Something{' '}
          <GradientText>Amazing</GradientText>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="mt-6 max-w-xl text-text-muted text-lg font-body leading-relaxed"
        >
          Whether it&apos;s an AI-powered product, a stunning web experience, or
          something entirely new — I&apos;d love to collaborate and bring bold
          ideas to life.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="/projects" variant="primary">
            View Projects
          </MagneticButton>
          <MagneticButton href="/contact" variant="secondary">
            Get in Touch
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
