'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL, STATS, PHILOSOPHY, MARQUEE_WORDS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  Brain, 
  Sparkles, 
  Code2, 
  Mic, 
  Box, 
  Terminal,
  Lightbulb,
  Target,
  Zap,
  Eye,
  Heart
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Map strings to lucide icons if the constants define icons as strings
const iconMap: Record<string, any> = {
  Target, Lightbulb, Zap, Eye, Brain, Heart, Sparkles, Code2, Mic, Box, Terminal
};

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // GSAP animations
    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl.from('.hero-element', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Hero Parallax
      gsap.to('.hero-content', {
        y: 100,
        opacity: 0.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Stats Reveal
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      });

      // Services Reveal
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)'
      });

      // Quote Reveal
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.quote-word');
        gsap.fromTo(words, 
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: true
            }
          }
        );
      }

      // Philosophy grid
      gsap.from('.philosophy-item', {
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
      
    });

    return () => ctx.revert();
  }, []);

  const quoteText = 'I believe the best technology is the kind that feels invisible — intuitive, elegant, and built with purpose.';
  
  const services = [
    { title: 'AI & Machine Learning', desc: 'Building predictive models and intelligent systems.', icon: Brain, cardClass: 'card-indigo', color: 'bg-indigo-500' },
    { title: 'Generative AI', desc: 'Leveraging LLMs and diffusion models for creative solutions.', icon: Sparkles, cardClass: 'card-purple', color: 'bg-purple-500' },
    { title: 'Full-Stack Web Dev', desc: 'Crafting responsive, performant web applications.', icon: Code2, cardClass: 'card-cyan', color: 'bg-cyan-500' },
    { title: 'Voice AI Systems', desc: 'Developing conversational interfaces and TTS/STT pipelines.', icon: Mic, cardClass: 'card-rose', color: 'bg-rose-500' },
    { title: '3D Visualization', desc: 'Creating immersive web-based 3D experiences.', icon: Box, cardClass: 'card-amber', color: 'bg-amber-500' },
    { title: 'Python Ecosystem', desc: 'Advanced scripting, data engineering, and automation.', icon: Terminal, cardClass: 'card-emerald', color: 'bg-emerald-500' },
  ];

  const marqueeWords = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  const marqueeColors = ['text-accent', 'text-accent-purple', 'text-accent-cyan', 'text-accent-rose', 'text-accent-amber', 'text-accent-emerald'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden">
          {/* Decorative Orb */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/20 blur-3xl z-0" />
          
          <div className="container-custom relative z-10 hero-content">
            <div className="hero-element mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-accent font-medium">
                Aspiring AI/ML Engineer
              </span>
            </div>
            
            <h1 ref={headingRef} className="hero-element font-display text-6xl md:text-7xl lg:text-[8rem] font-bold leading-[1.1] tracking-tight mb-6">
              <span className="text-text-primary">Ashirwad</span>
              <br />
              <span className="text-gradient from-accent to-accent-purple">Jha.</span>
            </h1>
            
            <div className="hero-element h-12 mb-6 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="font-display text-2xl md:text-3xl text-text-secondary font-medium absolute"
                >
                  {PERSONAL.roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <p className="hero-element text-text-secondary text-lg max-w-xl mb-10 leading-relaxed">
              {PERSONAL.bio}
            </p>
            
            <div className="hero-element flex flex-wrap items-center gap-4">
              <Link href="/projects" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-3.5 font-medium transition-colors flex items-center gap-2">
                View Projects <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="border border-neutral-300 hover:border-neutral-400 text-text-primary rounded-full px-8 py-3.5 font-medium transition-colors bg-white/50 backdrop-blur-sm">
                Get In Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Marquee Strip */}
        <section className="py-6 border-y border-neutral-200 bg-surface/50 overflow-hidden relative flex">
          <motion.div 
            className="flex whitespace-nowrap gap-12 px-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          >
            {marqueeWords.map((word, i) => (
              <span key={i} className={`font-display text-5xl md:text-7xl font-bold opacity-10 hover:opacity-40 transition-opacity cursor-default ${marqueeColors[i % marqueeColors.length]}`}>
                {word}
              </span>
            ))}
          </motion.div>
        </section>

        {/* Stats Row */}
        <section ref={statsRef} className="py-20 border-b border-neutral-200 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x-0 md:divide-x divide-neutral-200">
              {STATS.map((stat, i) => (
                <div key={i} className="stat-item flex flex-col items-center md:items-start md:pl-12 first:pl-0 text-center md:text-left">
                  <span className={`font-display text-4xl md:text-5xl font-bold mb-2 ${marqueeColors[i % marqueeColors.length].replace('text-', 'text-')}`}>
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What I Do Section */}
        <section ref={servicesRef} className="section-padding bg-surface">
          <div className="container-custom">
            <div className="mb-16">
              <span className="font-mono text-sm uppercase tracking-widest text-accent mb-4 block">Expertise</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary">What I Do</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className={`service-card ${service.cardClass} p-8 rounded-2xl border border-neutral-200 hover:border-transparent transition-all duration-300 relative group overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm text-neutral-700">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                        {service.title}
                        <span className={`w-2 h-2 rounded-full ${service.color}`} />
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div ref={quoteRef} className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="font-display text-3xl md:text-5xl font-medium leading-tight text-text-primary">
                {quoteText.split(' ').map((word, i) => (
                  <span key={i} className="quote-word inline-block mr-[0.3em] opacity-10">
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            <div ref={philosophyRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {PHILOSOPHY.map((item: any, i: number) => {
                const Icon = typeof item.icon === 'string' ? iconMap[item.icon] || Target : (item.icon || Target);
                
                return (
                  <div key={i} className="philosophy-item p-8 bg-surface rounded-2xl border border-neutral-200 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-accent">
                      {Icon && <Icon size={24} />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-surface relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]" />
          
          <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-text-primary">
              Let's build something <br />
              <span className="text-gradient from-accent-rose to-accent-amber">extraordinary.</span>
            </h2>
            <p className="text-text-secondary text-xl mb-10">
              Open for new opportunities and exciting projects. Let's create something impactful together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto bg-text-primary text-background rounded-full px-8 py-4 font-medium hover:bg-neutral-800 transition-colors">
                Start a Conversation
              </Link>
              <a href={`mailto:${PERSONAL.email}`} className="w-full sm:w-auto border border-neutral-300 text-text-primary rounded-full px-8 py-4 font-medium hover:bg-neutral-50 transition-colors">
                Email Me
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
