'use client';

import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PERSONAL, TIMELINE, APPROACH, INTERESTS, TOOLS } from '@/lib/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Briefcase, Code, Award, Calendar } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero clip-path reveal
      gsap.from('.hero-heading', {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2,
      });

      // 2. Timeline line grow
      gsap.to('.timeline-line', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });

      // Timeline items slide in
      gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
        const isLeft = i % 2 === 0;
        gsap.from(item, {
          x: isLeft ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        });
      });

      // 3. Approach progress line
      gsap.to('.approach-line', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.approach-section',
          start: 'top center',
          end: 'center center',
          scrub: true,
        }
      });

      // Approach cards stagger
      gsap.from('.approach-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.approach-section',
          start: 'top 70%',
        }
      });

      // 4. Interests pop-in
      gsap.from('.interest-pill', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.interests-section',
          start: 'top 80%',
        }
      });

      // 5. Tools stagger
      gsap.from('.tool-pill', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.tools-section',
          start: 'top 80%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Projects', value: '10+', color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: Briefcase },
    { label: 'Technologies', value: '20+', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Code },
    { label: 'Certifications', value: '8+', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: Award },
    { label: 'Years Experience', value: '2+', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: Calendar },
  ];

  const colors = [
    'text-indigo-500', 'text-purple-500', 'text-cyan-500', 'text-rose-500', 'text-amber-500', 'text-emerald-500'
  ];
  const bgColors = [
    'bg-indigo-500/10', 'bg-purple-500/10', 'bg-cyan-500/10', 'bg-rose-500/10', 'bg-amber-500/10', 'bg-emerald-500/10'
  ];
  const borderColors = [
    'border-indigo-500/20', 'border-purple-500/20', 'border-cyan-500/20', 'border-rose-500/20', 'border-amber-500/20', 'border-emerald-500/20'
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      <main>
        {/* 1. Hero Section */}
        <section className="container-custom pt-40 pb-20 lg:pt-48 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 lg:mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                About Me
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8">
                <span className="hero-heading inline-block text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent-purple to-accent-cyan" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
                  The Story
                </span>
                <br />
                <span className="hero-heading inline-block text-text-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
                  Behind the Code.
                </span>
              </h1>
              
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed max-w-2xl">
                <p>{PERSONAL.bio}</p>
                {Array.isArray(PERSONAL.aboutLong) ? (
                  PERSONAL.aboutLong.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                ) : (
                  <p>{PERSONAL.aboutLong}</p>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                        className={`p-6 rounded-2xl border ${stat.bg} ${stat.border} flex flex-col items-start gap-4 backdrop-blur-sm`}
                      >
                        <div className={`p-3 rounded-xl bg-surface/50 shadow-sm ${stat.color}`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <div className={`text-3xl font-display font-bold mb-1 ${stat.color}`}>
                            {stat.value}
                          </div>
                          <div className="text-sm font-medium text-text-secondary">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Timeline Section */}
        <section className="timeline-section section-padding bg-blue-50/30 dark:bg-blue-900/5 relative">
          <div className="container-custom">
            <div className="text-center mb-16 lg:mb-24">
              <div className="inline-block px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple font-medium text-sm mb-4">
                Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-8">
                My Timeline
              </h2>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-text-muted/20 origin-top transform md:-translate-x-1/2">
                <div className="timeline-line absolute top-0 left-0 w-full bg-accent transform scale-y-0 origin-top" style={{ height: '100%' }}></div>
              </div>
              
              <div className="space-y-12 md:space-y-24 relative z-10">
                {TIMELINE.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  const colorClass = colors[idx % colors.length];
                  const bgClass = bgColors[idx % bgColors.length];
                  const borderClass = borderColors[idx % borderColors.length];
                  
                  return (
                    <div key={idx} className="timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                      {/* Left side spacer or content */}
                      <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isLeft ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'} mb-4 md:mb-0`}>
                        <div className={`inline-block px-4 py-1 rounded-full ${bgClass} ${colorClass} font-mono text-sm font-bold border ${borderClass} mb-4`}>
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Center dot */}
                      <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-surface border-4 border-text-muted/20 transform -translate-x-1/2 flex items-center justify-center shadow-md md:order-1 z-10 top-0 md:top-auto">
                        <div className={`w-3 h-3 rounded-full bg-current ${colorClass}`}></div>
                      </div>
                      
                      {/* Right side spacer */}
                      <div className={`hidden md:block w-5/12 ${isLeft ? 'md:order-2' : 'md:order-0'}`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Approach Section */}
        <section className="approach-section section-padding bg-orange-50/30 dark:bg-orange-900/5 relative overflow-hidden">
          <div className="container-custom">
            <div className="mb-16 lg:mb-24 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-accent-amber/10 text-accent-amber font-medium text-sm mb-4">
                Process
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-8">
                My Approach
              </h2>
            </div>
            
            <div className="relative">
              {/* Horizontal line (desktop only) */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-text-muted/20 origin-left">
                <div className="approach-line absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent-amber via-accent-rose to-accent-purple transform scale-x-0 origin-left"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {APPROACH.map((item, idx) => {
                  const colorClass = colors[(idx + 2) % colors.length];
                  const bgClass = bgColors[(idx + 2) % bgColors.length];
                  
                  return (
                    <div key={idx} className="approach-card relative pt-4 lg:pt-0">
                      <div className={`w-16 h-16 rounded-2xl ${bgClass} ${colorClass} flex items-center justify-center font-display font-bold text-xl mb-6 relative z-10 lg:-mt-8 shadow-sm backdrop-blur-sm border border-white/20 mx-auto lg:mx-0`}>
                        {item.step}
                      </div>
                      <h3 className="text-xl font-display font-bold text-text-primary mb-3 text-center lg:text-left">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-center lg:text-left">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Interests Section */}
        <section className="interests-section section-padding">
          <div className="container-custom text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-accent-rose/10 text-accent-rose font-medium text-sm mb-4">
              Personal
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-12">
              Beyond Code
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {INTERESTS.map((interest, idx) => {
                const colorClass = colors[idx % colors.length];
                const bgClass = bgColors[idx % bgColors.length];
                const borderClass = borderColors[idx % borderColors.length];
                
                return (
                  <div 
                    key={idx} 
                    className={`interest-pill px-6 py-3 rounded-full ${bgClass} ${colorClass} border ${borderClass} font-medium text-lg shadow-sm`}
                  >
                    {interest}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Tools Section */}
        <section className="tools-section section-padding bg-emerald-50/30 dark:bg-emerald-900/5">
          <div className="container-custom text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-medium text-sm mb-4">
              Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-12">
              Tools I Use
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {TOOLS.map((tool, idx) => {
                const isDesign = tool.category?.toLowerCase().includes('design');
                const isDev = tool.category?.toLowerCase().includes('development') || tool.category?.toLowerCase().includes('frontend') || tool.category?.toLowerCase().includes('backend');
                const isProductivity = tool.category?.toLowerCase().includes('productivity') || tool.category?.toLowerCase().includes('devops');
                
                let toolColor = 'text-accent border-accent/20 bg-accent/5';
                if (isDesign) toolColor = 'text-accent-rose border-accent-rose/20 bg-accent-rose/5';
                if (isProductivity) toolColor = 'text-accent-emerald border-accent-emerald/20 bg-accent-emerald/5';
                if (isDev) toolColor = 'text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5';

                return (
                  <div 
                    key={idx} 
                    className={`tool-pill px-4 py-2 rounded-lg border ${toolColor} text-sm font-medium hover:scale-105 transition-transform cursor-default`}
                  >
                    {tool.name}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
