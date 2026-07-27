import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact | Ashu Portfolio',
  description: 'Get in touch for opportunities, projects, and collaborations.',
};

export default function ContactPage() {
  return <ContactContent />;
}
