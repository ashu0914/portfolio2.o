import type { Metadata } from 'next';
import ProjectsContent from './projects-client';

export const metadata: Metadata = {
  title: 'Projects | Ashu',
  description: 'A showcase of my recent work spanning artificial intelligence, modern web development, and interactive experiences.',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
