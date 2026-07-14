'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitFork, ExternalLink, Sparkles, Clock } from 'lucide-react';
import { Project } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
    >
      <TiltCard intensity={8}>
        <div className="gradient-border">
          <div className="glass p-8 md:p-10 rounded-2xl relative overflow-hidden">
            {/* Top gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{
                background: `linear-gradient(90deg, ${project.accent}40, ${project.accent}10)`,
              }}
            />

            {/* Ambient glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-10"
              style={{ backgroundColor: project.accent }}
            />

            {/* Header */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono tracking-wider uppercase" style={{ color: project.accent }}>
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  {project.status === 'In Development' ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                      <Clock className="w-3 h-3" />
                      In Development
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                      <Sparkles className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                {project.title}
              </h3>

              <p className="text-text-muted text-base leading-relaxed mb-6 max-w-3xl">
                {project.longDescription}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-text-subtle mb-3">
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.slice(0, 6).map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-text-muted text-xs hover:border-white/10 hover:text-white transition-colors duration-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-text-subtle mb-3">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full font-mono text-xs border transition-colors duration-200"
                      style={{
                        borderColor: `${project.accent}30`,
                        color: project.accent,
                        backgroundColor: `${project.accent}08`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <MagneticButton
                    href={project.github}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <GitFork className="w-4 h-4" />
                    View on GitHub
                  </MagneticButton>
                )}
                {project.live && (
                  <MagneticButton
                    href={project.live}
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
