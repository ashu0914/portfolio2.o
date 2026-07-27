import { Metadata } from 'next';
import SkillsContent from './SkillsContent';

export const metadata: Metadata = {
  title: 'Skills | Ashirwad Jha',
  description: 'Technical skills, tools, and certifications.',
};

export default function SkillsPage() {
  return <SkillsContent />;
}
