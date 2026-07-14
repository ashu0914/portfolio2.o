'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent-cyan/3 blur-[100px]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Credentials"
          title="Certifications"
          description="Verified credentials that validate my skills and knowledge."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CERTIFICATIONS.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass p-6 rounded-2xl group cursor-pointer hover:border-accent-cyan/20 transition-all duration-300 block"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-cyan/20 transition-colors duration-300">
                  <Award className="w-6 h-6 text-accent-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-accent-cyan transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-muted text-xs font-mono mb-3">
                    {cert.platform}
                  </span>
                  <div className="flex items-center gap-1.5 text-accent-cyan/70 text-sm group-hover:text-accent-cyan transition-colors duration-300">
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
