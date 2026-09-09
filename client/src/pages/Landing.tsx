// Kern-inspired cinematic landing: full-bleed portrait background with overlaid typography.
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import HoverMaskReveal from "@/components/HoverMaskReveal";
import Home from "./Home";
import PixelRevealBackground from "@/components/PixelRevealBackground";
import Auralis from "@/components/auralis";

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".landing-name-char",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.05 },
        0.4,
      )
        .fromTo(
          ".landing-center-content",
          { y: 20, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          0.7,
        )
        .fromTo(
          ".landing-top-bar",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.5,
        )
        .fromTo(
          ".landing-bottom-bar",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.9,
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="landing-page" ref={heroRef}>
      <section className="landing-hero-fullbleed">
        {/* Full-viewport portrait background with mask reveal */}
        <div className="landing-bg">
          <HoverMaskReveal
             grayscaleImg={`${import.meta.env.BASE_URL}images/ashirwad-grayscale.jpg`}
   colorImg={`${import.meta.env.BASE_URL}images/ashirwad-color.jpg`}
            brushRadius={50}
          />
        </div>

        {/* Overlay content */}
        <div className="landing-overlay">
          {/* Top bar */}
          <div className="landing-top-bar">
            <div className="landing-top-left">
              <span className="landing-role-tag">AI / ML Developer</span>
            </div>
            <div className="landing-top-right">
              <span className="landing-status">
                <span className="landing-status-dot" />
                Open to opportunities
              </span>
            </div>
          </div>
          {/* Center content */}
          <div className="landing-center-content">
            <p className="landing-role-line"> AI ML focused software developer </p>
            <p className="landing-location-line">Based in Delhi NCR — Building intelligent systems</p>
          </div>
          {/* Giant name at bottom */}
          <div className="landing-name-block">
            <h1 className="landing-giant-name" aria-label="Ashirwad Jha">
              <span className="landing-name-line">
                {"ASHIRWAD JHA".split("").map((char, i) => (
  <span className="landing-name-char" key={`a-${i}`}>
    {char === " " ? "\u00A0" : char}
  </span>
))}
              </span>
            </h1>
          </div>
          {/* Bottom bar */}
          <div className="landing-bottom-bar">
            <div className="landing-scroll-cue">
              <ArrowDown size={14} />
              <span>Scroll</span>
            </div>
            <div className="landing-bottom-links">
              <a href="https://github.com/ashu0914" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/ashirwad-jha-65152b403" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:ashujha0914@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </section>
{/* Pixel Reveal section — sits right below the full-bleed hero, above Home */}
<section className="relative w-full h-screen overflow-hidden">
  <Home />
  <PixelRevealBackground
    image="/images/iron_man.jpeg"
    revealImage="/images/spider_man.jpeg"
    pixelSize={14}
    brushRadius={70}
    healSpeed={0.25}
  />
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
    <p className="text-center text-white/70 text-sm tracking-[0.14em] uppercase">
    </p>
  </div>
</section>


      

    <section className="landing-strip section-pad" style={{ position: "relative" }}>
  <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
    <Auralis colors={["#ef4444", "#dc2626", "#b91c1c"]} speed={0.3} grain={0.6} height="100%" />
  </div>

  <div className="landing-strip-head" data-reveal>
    <span className="eyebrow">What I build</span>
    <h2 className="display-md" data-motion-text>From prompt to action.</h2>
  </div>
  <div className="landing-strip-grid" data-stagger-cards>
    <div className="landing-strip-card">
      <span className="landing-strip-num">01</span>
      <h3>Voice AI Assistants</h3>
      <p>Modular speech recognition, LLM reasoning, memory, and system automation — production-ready.</p>
    </div>
    <div className="landing-strip-card">
      <span className="landing-strip-num">02</span>
      <h3>Agentic Systems</h3>
      <p>Autonomous workflows with tool use, task execution, and multi-step reasoning chains.</p>
    </div>
    <div className="landing-strip-card">
      <span className="landing-strip-num">03</span>
      <h3>AI Applications</h3>
      <p>Python-based Generative AI applications with LangChain, FastAPI, and modern ML pipelines.</p>
    </div>
  </div>
  <div className="landing-strip-cta" data-reveal>
    <Link href="/projects" className="text-link" data-cursor-label="View work">
      View all projects <ArrowUpRight size={14} />
    </Link>
  </div>
</section>
    </div>
  );
}
