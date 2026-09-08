# Asme Landing Page Components

5 sections: HeroSection, AboutSection, FeaturedVideoSection, PhilosophySection, ServicesSection.

## 1. Install dependency

```bash
npm install framer-motion
```

(lucide-react should already be installed in your project.)

## 2. Copy files

Copy the whole `asme/` folder into `client/src/components/asme/`.

## 3. Add to index.css

Add this to the TOP of your existing `client/src/index.css` (keep everything
else in that file as-is, just add these lines):

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
```

And add this new `@layer components` block anywhere after your existing
`@tailwind` directives:

```css
@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

## 4. Use in Certifications.tsx

At the top of `Certifications.tsx`, add these imports:

```tsx
import HeroSection from "../components/asme/HeroSection";
import AboutSection from "../components/asme/AboutSection";
import FeaturedVideoSection from "../components/asme/FeaturedVideoSection";
import PhilosophySection from "../components/asme/PhilosophySection";
import ServicesSection from "../components/asme/ServicesSection";
```

Then, inside the returned `<>...</>`, add the 5 sections BEFORE your existing
`<PageIntro>` block:

```tsx
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />

      <PageIntro
        ...your existing content stays exactly as it was...
```

## Note on videos

The 4 video URLs used (hero, featured, philosophy, 2 service cards) are the
placeholder cloudfront links from the design spec. Replace `HERO_VIDEO_SRC` in
HeroSection.tsx, and the `video` fields in FeaturedVideoSection.tsx,
PhilosophySection.tsx, and ServicesSection.tsx with your own video files
(e.g. `/images/your-video.mp4`) once you have them.
