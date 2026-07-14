'use client';

import { PROJECTS } from '@/lib/constants';
import ProjectCard from './ProjectCard';

export default function ProjectShowcase() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col gap-16 md:gap-24">
          {PROJECTS.map((project, index) => (
            <div key={project.id}>
              <ProjectCard project={project} index={index} />

              {/* Section divider */}
              {index < PROJECTS.length - 1 && (
                <div className="flex justify-center mt-16 md:mt-24">
                  <div className="w-px h-20 bg-gradient-to-b from-white/10 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
