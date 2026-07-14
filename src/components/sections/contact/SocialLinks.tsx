'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitFork, Globe, Code2, Mail } from 'lucide-react';
import { SOCIALS } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, staggerItem } from '@/lib/animations';

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@ashu0914',
    href: SOCIALS.github,
    icon: GitFork,
    color: '#60a5fa',
  },
  {
    name: 'LinkedIn',
    handle: 'Ashirwad Jha',
    href: SOCIALS.linkedin,
    icon: Globe,
    color: '#0077b5',
  },
  {
    name: 'LeetCode',
    handle: '@ashujha0914',
    href: SOCIALS.leetcode,
    icon: Code2,
    color: '#ffa116',
  },
  {
    name: 'Email',
    handle: 'ashujha0914@gmail.com',
    href: SOCIALS.email,
    icon: Mail,
    color: '#a78bfa',
  },
];

export default function SocialLinks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-custom">
        <SectionHeading
          label="Connect"
          title="Find Me Online"
          description="Let's connect on your preferred platform."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="glass p-6 rounded-2xl text-center group cursor-pointer hover:border-white/10 transition-all duration-300 block"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:shadow-lg"
                style={{
                  backgroundColor: `${social.color}12`,
                }}
              >
                <social.icon
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: social.color }}
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-1">
                {social.name}
              </h3>
              <p className="text-text-subtle text-xs font-mono truncate">
                {social.handle}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
