import type { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import AboutHero from '@/components/sections/about/AboutHero';
import JourneyTimeline from '@/components/sections/about/JourneyTimeline';
import InterestsGrid from '@/components/sections/about/InterestsGrid';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn about Ashirwad Jha — Aspiring AI/ML Engineer with a Diploma in Computer Science, exploring Python, Generative AI, Voice AI, and 3D Visualization.',
};

export default function AboutPage() {
  return (
    <ClientLayout>
      <AboutHero />
      <JourneyTimeline />
      <InterestsGrid />
    </ClientLayout>
  );
}
