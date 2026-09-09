
// Machined Editorial Home: About-focused landing — identity, story, education, and a clear next step.
import { ArrowDownRight, ArrowUpRight, ExternalLink, GraduationCap, Heart, Sparkles, Star } from "lucide-react";
import { Link } from "wouter";
import { Rule, SectionHeading } from "@/components/PagePrimitives";
import { profile, skillGroups, education, areasOfInterest, coreStrengths } from "@/lib/siteData";
import PixelRevealBackground from "@/components/PixelRevealBackground";

export default function Home() {
  return (
    <>
      <section className="home-hero" data-mouse-parallax>
        {/* Pixel-reveal background — sits behind everything in this section */}
        <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
          <PixelRevealBackground
            image={`${import.meta.env.BASE_URL}images/iron_man.jpeg`}
            revealImage={`${import.meta.env.BASE_URL}images/spider_man.jpeg`}
            pixelSize={14}
            brushRadius={70}
            healSpeed={0.06}
          />
        </div>

        <div className="hero-meta" data-reveal>
          <span className="eyebrow">AI / ML developer</span>
          <span className="hero-meta-line" />
          <span className="mono-text">001 — 004</span>
        </div>
        <div className="hero-copy">
          <p className="hero-overline" data-reveal>Python / Generative AI / Agentic workflows</p>
          <h1 className="hero-title" data-motion-text>I build assistants that move from prompt to action.</h1>
          <p className="hero-lede" data-reveal data-reveal-delay="0.2">{profile.summary.slice(0, 200)}...</p>
          <div className="hero-actions" data-reveal data-reveal-delay="0.32">
            <Link href="/projects" className="button button-primary" data-magnetic data-cursor-label="Explore projects">
              Explore projects <ArrowUpRight size={17} />
            </Link>
            <Link href="/contact" className="text-link" data-cursor-label="Start a conversation">
              Start a conversation <ExternalLink size={15} />
            </Link>
          </div>
        </div>
        <div className="hero-visual" data-mouse-depth="0.025" data-reveal data-reveal-delay="0.1" data-parallax-section>
          <div className="hero-image-frame" data-image-reveal>
            <img src={`${import.meta.env.BASE_URL}images/ashirwad-hero-aperture.png`} alt="Editorial still life of an AI system notebook and technical instrument." data-parallax-image />
            <div className="hero-image-overlay" />
          </div>
          <div className="hero-stamp" data-mouse-depth="0.08">
            <span>ASHIRWAD</span>
            <small>AI / ML / Agentic</small>
          </div>
          <div className="hero-visual-caption">Building intelligence, one module at a time.</div>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-cue" data-cursor-label="Scroll to about">
            <ArrowDownRight size={17} />
            <span>Know more about me</span>
          </a>
          <span className="location-note">Delhi NCR, India · open to agentic AI internships</span>
        </div>
      </section>

      <section id="about" className="about-section section-pad" data-reveal-group>
        <div className="section-spine"><span>02</span><span className="spine-line" /></div>
        <div className="about-content">
          <p className="eyebrow" data-reveal-item>About me</p>
          <h2 className="statement-title" data-motion-text>AI/ML-focused developer with a bias toward building real systems.</h2>
          <p className="about-description" data-reveal-item>{profile.summary}</p>
        </div>
        <div className="about-aside" data-reveal-item>
          <div className="about-quick-facts">
            <div className="quick-fact">
              <Sparkles size={16} />
              <span>AI/ML Developer</span>
            </div>
            <div className="quick-fact">
              <Star size={16} />
              <span>Python-focused</span>
            </div>
            <div className="quick-fact">
              <Heart size={16} />
              <span>Open to internships</span>
            </div>
          </div>
          <Link href="/projects" className="text-link" data-cursor-label="See the builds">See the builds <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <section className="education-section section-pad" data-mouse-parallax>
        <SectionHeading index="" eyebrow="Education" title="The academic foundation." detail="Building from fundamentals toward real-world agentic products." />
        <div className="education-grid" data-stagger-cards>
          {education.map((edu, i) => (
            <article className="education-card" key={i} data-reveal-item data-scale-reveal>
              <div className="edu-card-icon"><GraduationCap size={22} /></div>
              <div className="edu-card-body">
                <p className="eyebrow">{edu.field}</p>
                <h3>{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <span className={`edu-period ${edu.current ? "edu-current" : ""}`}>
                  {edu.current && <span className="status-dot" />}
                  {edu.period}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="interests-section section-pad" data-reveal-group>
        <SectionHeading index="04" eyebrow="Areas of interest" title="Where curiosity meets conviction." detail="The domains I'm actively learning, building, and thinking about." />
        <div className="interests-flow" data-slide-left>
          {areasOfInterest.map((interest) => (
            <span className="interest-pill" key={interest} data-reveal-item>{interest}</span>
          ))}
        </div>
        <Rule />
        <div className="strengths-list" data-reveal-group>
          <p className="eyebrow strengths-eyebrow" data-reveal-item>Core strengths</p>
          <div className="strengths-grid">
            {coreStrengths.map((strength, i) => (
              <div className="strength-item" key={i} data-reveal-item>
                <span className="strength-num">0{i + 1}</span>
                <p>{strength}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities-section section-pad" data-reveal-group>
        <SectionHeading index="05" eyebrow="Capabilities" title="Five layers, one point of view." detail="Follow the system from input to outcome." />
        <div className="capability-list">
          {skillGroups.map((group) => (
            <Link href="/skills" className="capability-row" key={group.index} data-reveal-item data-cursor-label={`Explore ${group.title}`}>
              <span className="capability-index">{group.index}</span>
              <h3>{group.title}</h3>
              <p>{group.note}</p>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-cta section-pad" data-mouse-parallax>
        <div className="cta-index" data-mouse-depth="0.08">06</div>
        <div className="cta-copy">
          <p className="eyebrow" data-reveal>Next signal</p>
          <h2 className="display-lg" data-motion-text>Bring a hard workflow. I'll bring the system map.</h2>
          <Link href="/contact" className="button button-primary" data-magnetic data-cursor-label="Contact Ashirwad">Let's talk <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
