import type { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectShowcase from '@/components/sections/projects/ProjectShowcase';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore projects by Ashirwad Jha — including Jaya AI Voice Assistant, NutriPlex Smart Nutrition Platform, and a 3D interactive portfolio.',
};

export default function ProjectsPage() {
  return (
    <ClientLayout>
      <ProjectsHero />
      <ProjectShowcase />
    </ClientLayout>
  );
}
