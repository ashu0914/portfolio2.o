import { Metadata } from 'next';
import AboutContent from './about-client';

export const metadata: Metadata = {
  title: 'About Me | Portfolio',
  description: 'The story behind the code. Learn about my journey, experience, and the tools I use.',
};

export default function AboutPage() {
  return <AboutContent />;
}
