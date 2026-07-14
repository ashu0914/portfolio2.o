'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function JourneyTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[100px]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="My Path"
          title="The Journey So Far"
          description="A timeline of my growth in technology and creative fields."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-20 relative max-w-3xl mx-auto"
        >
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          {TIMELINE.map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                index % 2 === 0
                  ? 'md:flex-row'
                  : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_rgba(96,165,250,0.4)] z-10" />

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-32px)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div
                  className={`glass p-6 rounded-2xl hover:border-accent/20 transition-colors duration-300 ${
                    index % 2 === 0 ? '' : ''
                  }`}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono mb-3">
                    {item.year}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[calc(50%-32px)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
