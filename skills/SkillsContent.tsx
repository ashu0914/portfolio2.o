'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Layout, Palette, Award, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SKILL_CATEGORIES, TOOLS, CERTIFICATIONS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'code':
      return <Code className="w-6 h-6" />;
    case 'brain':
      return <Brain className="w-6 h-6" />;
    case 'layout':
      return <Layout className="w-6 h-6" />;
    case 'palette':
      return <Palette className="w-6 h-6" />;
    default:
      return <Code className="w-6 h-6" />;
  }
};

export default function SkillsContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Entrance
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );
    }

    // Skills Grid
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.skill-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Tools
    if (toolsRef.current) {
      const bars = toolsRef.current.querySelectorAll('.tool-bar-fill');
      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    }

    // Certifications
    if (certsRef.current) {
      const cards = certsRef.current.querySelectorAll('.cert-card');
      gsap.fromTo(
        cards,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: certsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* 1. Hero */}
      <section className="pt-40 pb-20 container-custom" ref={heroRef}>
        <div className="mb-6 inline-block rounded-full bg-accent-cyan/10 px-4 py-1.5 border border-accent-cyan/20">
          <span className="text-sm font-mono text-accent-cyan uppercase tracking-wider">
            Capabilities
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-8 leading-tight">
          Skills That Shape <br className="hidden md:block" /> the Future.
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mb-12 font-body">
          A blend of engineering precision, creative problem solving, and a passion for emerging technologies. Here is the toolkit I use to bring ideas to life.
        </p>

        <div className="flex flex-wrap gap-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-surface"
              style={{ borderColor: `${cat.color}40` }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center bg-opacity-10"
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
              >
                {getIcon(cat.icon)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-text-secondary">{cat.title}</span>
                <span className="text-lg font-bold text-text-primary">
                  {cat.skills.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Skills Grid */}
      <section className="section-padding bg-[#fff8f0]" ref={gridRef}>
        <div className="container-custom">
          <div className="mb-16">
            <span className="text-accent uppercase tracking-wider text-sm font-bold mb-4 block">
              Technical Skills
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
              Areas of Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="skill-card p-8 rounded-3xl bg-surface border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary">
                    {cat.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 rounded-full text-sm font-medium border"
                      style={{
                        backgroundColor: `${cat.color}10`,
                        borderColor: `${cat.color}30`,
                        color: cat.color
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tools Proficiency */}
      <section className="section-padding" ref={toolsRef}>
        <div className="container-custom">
          <div className="mb-16">
            <span className="text-accent-purple uppercase tracking-wider text-sm font-bold mb-4 block">
              Tools I Use
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
              Software & Frameworks
            </h2>
          </div>

          <div className="max-w-4xl space-y-6">
            {TOOLS.map((tool, idx) => {
              const gradients = [
                'bg-gradient-to-r from-accent to-accent-cyan',
                'bg-gradient-to-r from-accent-purple to-accent-rose',
                'bg-gradient-to-r from-accent-cyan to-accent-emerald',
                'bg-gradient-to-r from-accent-amber to-accent-rose'
              ];
              const gradient = gradients[idx % gradients.length];
              
              return (
                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-48 flex justify-between md:block">
                    <span className="font-bold text-text-primary">{tool.name}</span>
                    <span className="text-sm text-text-secondary md:hidden">{tool.proficiency}%</span>
                  </div>
                  
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className={`tool-bar-fill h-full rounded-full ${gradient}`}
                      data-width={tool.proficiency}
                      style={{ width: '0%' }}
                    />
                  </div>
                  
                  <span className="hidden md:block text-sm text-text-secondary font-mono w-12 text-right">
                    {tool.proficiency}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Certifications */}
      <section className="section-padding bg-[#f0f8ff]" ref={certsRef}>
        <div className="container-custom">
          <div className="mb-16">
            <span className="text-accent-emerald uppercase tracking-wider text-sm font-bold mb-4 block">
              Certifications
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
              Continuous Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="cert-card group p-6 rounded-2xl bg-surface border border-gray-200/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-text-secondary bg-gray-100 px-3 py-1 rounded-full">
                      {cert.platform}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
