'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Brain, Layout, Palette } from 'lucide-react';
import { SkillCategory as SkillCategoryType } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';
import GlassCard from '@/components/ui/GlassCard';

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  brain: Brain,
  layout: Layout,
  palette: Palette,
};

interface SkillCategoryProps {
  category: SkillCategoryType;
  index: number;
}

export default function SkillCategory({ category, index }: SkillCategoryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const IconComponent = iconMap[category.icon] || Code;

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard hover glow="none" className="p-6 md:p-8 h-full">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <IconComponent
              className="w-5 h-5"
              style={{ color: category.color }}
            />
          </div>
          <h3 className="font-display text-xl font-semibold text-white">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 rounded-lg text-sm font-mono transition-colors duration-200 cursor-default"
              style={{
                backgroundColor: `${category.color}08`,
                border: `1px solid ${category.color}20`,
                color: `${category.color}cc`,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
