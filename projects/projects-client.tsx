'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { GitFork, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define tech tags
const techTags = [
  { name: 'AI/ML', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { name: 'Python', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { name: 'Next.js', color: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300' },
  { name: 'Three.js', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { name: 'Voice AI', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  { name: 'WebGL', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
];

const cardColors = ['card-indigo', 'card-purple', 'card-cyan', 'card-rose', 'card-amber', 'card-emerald'];

export default function ProjectsContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      const tl = gsap.timeline();
      tl.fromTo(headingRef.current, 
        { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' }
      );
      
      if (tagsRef.current) {
        tl.fromTo(Array.from(tagsRef.current.children),
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
          "-=0.5"
        );
      }

      // Cards animations
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card as Element,
                start: 'top 85%',
              }
            }
          );
        });
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-text-primary overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="pt-40 pb-20 container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-accent-purple font-mono text-sm font-medium mb-6">
              Portfolio
            </span>
            <h1 ref={headingRef} className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Projects That <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">Push Boundaries.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-body">
              A showcase of my recent work spanning artificial intelligence, modern web development, and interactive experiences.
            </p>
            
            <div ref={tagsRef} className="flex flex-wrap justify-center gap-3">
              {techTags.map((tag, i) => (
                <span key={i} className={`px-4 py-2 rounded-full text-sm font-medium font-mono ${tag.color}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="section-padding bg-surface/50 dark:bg-zinc-900/50">
          <div className="container-custom">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, index) => {
                const cardColor = cardColors[index % cardColors.length];
                const bgGradient = project.gradient || 'bg-gradient-to-r from-indigo-500 to-purple-500';
                const accentColor = project.accent || 'bg-indigo-500';
                
                return (
                  <div key={project.id || index} className={`relative flex flex-col h-full bg-surface dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm transition-shadow hover:shadow-md ${cardColor}`}>
                    {/* Top gradient strip */}
                    <div className={`h-1.5 w-full ${bgGradient}`}></div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-mono font-medium tracking-wider text-text-muted uppercase">
                          {project.category}
                        </span>
                        {project.status && (
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {project.status}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-text-secondary font-body mb-6 flex-1">
                        {project.description}
                      </p>
                      
                      {project.features && project.features.length > 0 && (
                        <ul className="mb-8 space-y-2">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start text-sm text-text-secondary">
                              <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full ${accentColor}`}></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-text-secondary text-xs font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        {project.github && (
                          <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent transition-colors">
                            <GitFork className="w-4 h-4" />
                            Source
                          </Link>
                        )}
                        {project.live && (
                          <Link href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">Have a project idea?</h2>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-text-primary text-background font-medium hover:scale-105 transition-transform duration-300">
              Let's talk
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
