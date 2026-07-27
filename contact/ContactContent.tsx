'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin, CheckCircle, GitFork, Globe, Code2 } from 'lucide-react';
import { PERSONAL, SOCIALS } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Form animations
      gsap.from('.form-elem', {
        scrollTrigger: {
          trigger: '.form-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Social cards
      gsap.from('.social-card', {
        scrollTrigger: {
          trigger: socialRef.current,
          start: 'top 85%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" ref={containerRef}>
      <Navbar />
      
      <main className="flex-grow pt-40 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32">
            <div className="lg:col-span-7">
              <div className="inline-block px-4 py-2 rounded-full bg-accent-rose/10 text-accent-rose font-mono text-sm mb-6 hero-elem">
                Connect
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-6 hero-elem leading-tight">
                Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-purple to-accent-cyan">Something Together.</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl hero-elem font-body">
                I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="hero-elem">
                <a 
                  href={`mailto:${PERSONAL.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-text-primary text-surface rounded-xl font-medium hover:bg-text-secondary transition-colors"
                >
                  Send Email <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <div className="p-8 rounded-2xl bg-accent-rose/5 border border-accent-rose/10 flex items-start gap-4 hero-elem hover:shadow-lg transition-shadow">
                <div className="p-3 bg-white rounded-xl shadow-sm text-accent-rose">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-text-secondary mb-1">Email</h3>
                  <a href={`mailto:${PERSONAL.email}`} className="text-lg font-medium text-text-primary hover:text-accent-rose transition-colors">
                    {PERSONAL.email}
                  </a>
                </div>
              </div>
              
              <div className="p-8 rounded-2xl bg-accent/5 border border-accent/10 flex items-start gap-4 hero-elem hover:shadow-lg transition-shadow">
                <div className="p-3 bg-white rounded-xl shadow-sm text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-text-secondary mb-1">Location</h3>
                  <p className="text-lg font-medium text-text-primary">
                    {PERSONAL.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section bg-cool */}
        <section className="section-padding bg-slate-50 form-section">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12 form-elem">
                <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-mono text-sm mb-4">
                  Send a Message
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                  Drop me a line
                </h2>
              </div>

              {isSubmitted ? (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-neutral-100 text-center form-elem">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-accent-emerald/10 text-accent-emerald mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">Message Sent!</h3>
                  <p className="text-text-secondary mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-text-primary text-surface rounded-xl font-medium hover:bg-text-secondary transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 form-elem">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-text-primary">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-text-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-text-primary">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-text-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 form-elem">
                    <label htmlFor="subject" className="text-sm font-medium text-text-primary">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-text-primary"
                      placeholder="How can I help you?"
                    />
                  </div>
                  <div className="space-y-2 form-elem">
                    <label htmlFor="message" className="text-sm font-medium text-text-primary">Message</label>
                    <textarea 
                      id="message" 
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-text-primary resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <div className="form-elem">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-accent via-accent-purple to-accent-cyan hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Social Links Section bg-warm */}
        <section className="section-padding bg-amber-50/30" ref={socialRef}>
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full bg-accent-amber/10 text-accent-amber font-mono text-sm mb-4">
                Find Me Online
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                Let's Connect
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="social-card p-6 md:p-8 rounded-2xl bg-accent/5 border border-accent/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform hover:shadow-xl hover:shadow-accent/5 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <GitFork className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-1">GitHub</h3>
                <span className="text-sm text-text-secondary font-mono">@ashu</span>
              </a>
              
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="social-card p-6 md:p-8 rounded-2xl bg-accent-cyan/5 border border-accent-cyan/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform hover:shadow-xl hover:shadow-accent-cyan/5 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-accent-cyan mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-1">LinkedIn</h3>
                <span className="text-sm text-text-secondary font-mono">Connect</span>
              </a>
              
              <a href={SOCIALS.leetcode} target="_blank" rel="noopener noreferrer" className="social-card p-6 md:p-8 rounded-2xl bg-accent-amber/5 border border-accent-amber/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform hover:shadow-xl hover:shadow-accent-amber/5 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-accent-amber mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Code2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-1">LeetCode</h3>
                <span className="text-sm text-text-secondary font-mono">Solve</span>
              </a>
              
              <a href={`mailto:${PERSONAL.email}`} className="social-card p-6 md:p-8 rounded-2xl bg-accent-rose/5 border border-accent-rose/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform hover:shadow-xl hover:shadow-accent-rose/5 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-accent-rose mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-1">Email</h3>
                <span className="text-sm text-text-secondary font-mono">Message</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
