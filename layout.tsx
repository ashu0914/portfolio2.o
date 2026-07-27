import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ashirwad Jha — AI/ML Engineer Portfolio',
    template: '%s | Ashirwad Jha',
  },
  description:
    'Portfolio of Ashirwad Jha — Aspiring AI/ML Engineer, Python Developer, Generative AI Explorer, and Voice AI Assistant Builder. Explore projects, skills, and certifications.',
  keywords: [
    'AI Engineer',
    'ML Engineer',
    'Python Developer',
    'Generative AI',
    'Voice AI',
    'Portfolio',
    'Ashirwad Jha',
    'Next.js',
    'Three.js',
  ],
  authors: [{ name: 'Ashirwad Jha' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ashirwad Jha — AI/ML Engineer Portfolio',
    description:
      'Aspiring AI/ML Engineer building intelligent systems with Python, Generative AI, and interactive web experiences.',
    siteName: 'Ashirwad Jha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashirwad Jha — AI/ML Engineer Portfolio',
    description:
      'Aspiring AI/ML Engineer building intelligent systems with Python, Generative AI, and interactive web experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-background text-text-primary antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
