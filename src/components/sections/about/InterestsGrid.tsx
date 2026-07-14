'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { INTERESTS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, staggerItem } from '@/lib/animations';

const interestIcons: Record<string, string> = {
  'Artificial Intelligence': '🤖',
  'Machine Learning': '🧠',
  'Python Development': '🐍',
  'Generative AI': '✨',
  'Voice AI Assistants': '🎙️',
  'Interactive Web Experiences': '🌐',
  '3D Visualization': '🎨',
  'Interior Design & Rendering': '🏠',
};

export default function InterestsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          label="Passions"
          title="Areas of Interest"
          description="The domains and technologies that drive my curiosity and projects."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {INTERESTS.map((interest, index) => (
            <motion.div
              key={interest}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-5 rounded-2xl cursor-default group hover:border-accent/20 transition-all duration-300"
            >
              <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                {interestIcons[interest] || '💡'}
              </span>
              <h3 className="text-white text-sm font-medium leading-tight">
                {interest}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
