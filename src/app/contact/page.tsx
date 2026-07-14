import type { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactForm from '@/components/sections/contact/ContactForm';
import SocialLinks from '@/components/sections/contact/SocialLinks';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Ashirwad Jha. Connect via email, GitHub, LinkedIn, or LeetCode for collaborations, projects, or opportunities.',
};

export default function ContactPage() {
  return (
    <ClientLayout>
      <ContactHero />
      <ContactForm />
      <SocialLinks />
    </ClientLayout>
  );
}
