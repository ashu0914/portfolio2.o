'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={ref} className="section-padding">
      <div className="container-custom max-w-2xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="glass p-8 md:p-10 rounded-2xl relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent/5 blur-[60px]" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-accent-purple/5 blur-[60px]" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <motion.div variants={staggerItem}>
                <label className="block text-text-muted text-xs uppercase tracking-[0.15em] font-mono mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-text-subtle focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <label className="block text-text-muted text-xs uppercase tracking-[0.15em] font-mono mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-text-subtle focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <label className="block text-text-muted text-xs uppercase tracking-[0.15em] font-mono mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-text-subtle focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </motion.div>

              <motion.div variants={staggerItem} className="pt-2">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 py-3 text-emerald-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-mono text-sm">Message sent successfully!</span>
                  </motion.div>
                ) : (
                  <MagneticButton
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {}}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </MagneticButton>
                )}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
