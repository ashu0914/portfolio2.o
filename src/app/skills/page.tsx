import type { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import SkillsHero from '@/components/sections/skills/SkillsHero';
import SkillCategory from '@/components/sections/skills/SkillCategory';
import CertificationsSection from '@/components/sections/skills/CertificationsSection';
import { SKILL_CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Skills & Certifications',
  description:
    'Skills and certifications of Ashirwad Jha — Programming, AI/ML, Web Development, 3D Visualization, with verified Coursera credentials.',
};

export default function SkillsPage() {
  return (
    <ClientLayout>
      <SkillsHero />

      {/* Skills Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((category, index) => (
              <SkillCategory key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CertificationsSection />
    </ClientLayout>
  );
}
