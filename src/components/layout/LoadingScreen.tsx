'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Eased progress: starts fast, slows near the end
      const rawProgress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const percent = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(percent);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 600); // Allow exit animation to play
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Logo text */}
          <motion.h1
            className="text-gradient text-7xl font-bold font-display mb-10 select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            AJ
          </motion.h1>

          {/* Progress bar container */}
          <div className="w-64 relative">
            {/* Track */}
            <div className="w-full h-[2px] bg-surface-light rounded-full overflow-hidden">
              {/* Fill */}
              <motion.div
                className="h-full rounded-full origin-left"
                style={{
                  background:
                    'linear-gradient(to right, var(--color-accent), var(--color-accent-purple), var(--color-accent-cyan))',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            {/* Percentage text */}
            <motion.p
              className="text-text-muted text-xs font-mono mt-3 text-center tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {progress}%
            </motion.p>
          </div>

          {/* Decorative glow */}
          <motion.div
            className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--color-accent), var(--color-accent-purple), transparent)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
