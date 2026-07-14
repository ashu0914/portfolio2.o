import ClientLayout from '@/components/layout/ClientLayout';
import HeroSection from '@/components/sections/home/HeroSection';
import HighlightsSection from '@/components/sections/home/HighlightsSection';
import CTASection from '@/components/sections/home/CTASection';

export default function HomePage() {
  return (
    <ClientLayout>
      <HeroSection />
      <HighlightsSection />
      <CTASection />
    </ClientLayout>
  );
}
