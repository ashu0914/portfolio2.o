'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Code, Palette } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

const highlights = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Designing intelligent systems that learn, adapt, and solve real-world problems — from neural networks to production-grade ML pipelines.',
    accent: 'from-accent to-accent-cyan',
    glow: 'blue' as const,
  },
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Crafting performant, accessible web experiences with modern frameworks — pixel-perfect interfaces backed by robust architecture.',
    accent: 'from-accent-purple to-accent',
    glow: 'purple' as const,
  },
  {
    icon: Palette,
    title: '3D & Creative Tech',
    description:
      'Bringing ideas to life through immersive 3D visuals, generative art, and interactive experiences that push the boundaries of the web.',
    accent: 'from-accent-cyan to-accent-purple',
    glow: 'cyan' as const,
  },
];

const glowColorMap: Record<string, string> = {
  blue: 'rgba(96,165,250,0.12)',
  purple: 'rgba(167,139,250,0.12)',
  cyan: 'rgba(34,211,238,0.12)',
};

export default function HighlightsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(96,165,250,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="What I Do"
          title="Building the Future with AI"
          align="center"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {highlights.map(({ icon: Icon, title, description, accent, glow }) => (
            <motion.div key={title} variants={staggerItem}>
              <GlassCard
                hover
                glow={glow}
                className="h-full p-8 flex flex-col gap-5 group"
              >
                {/* Icon wrapper */}
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center',
                    'bg-gradient-to-br',
                    accent,
                    'bg-opacity-10'
                  )}
                  style={{
                    background: glowColorMap[glow] ?? glowColorMap.blue,
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-display font-semibold text-text-primary">
                  {title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed font-body">
                  {description}
                </p>

                {/* Decorative bottom line */}
                <div className="mt-auto pt-4">
                  <div
                    className={cn(
                      'h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full bg-gradient-to-r',
                      accent
                    )}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
