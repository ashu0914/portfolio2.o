'use client';

import { useState, useEffect, ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ScrollProgress from '@/components/layout/ScrollProgress';
import SmoothScroll from '@/components/layout/SmoothScroll';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Smooth Scroll Provider */}
      <SmoothScroll>
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
