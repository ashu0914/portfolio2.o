// Machined Editorial Certifications: verified evidence first, direct links always visible.
import HeroSection from "../components/asme/HeroSection";
import AboutSection from "../components/asme/AboutSection";
import FeaturedVideoSection from "../components/asme/FeaturedVideoSection";
import PhilosophySection from "../components/asme/PhilosophySection";
import ServicesSection from "../components/asme/ServicesSection";

import { ArrowUpRight, BadgeCheck, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { certifications } from "@/lib/siteData";
import { PageIntro, Rule, SectionHeading } from "@/components/PagePrimitives";

export default function Certifications() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />

            <PageIntro
        index=""
        kicker="Certifications / evidence"
        title="Proof is part of the interface."
        description="An expanded, verified record of the courses that are shaping how I think about security, generative AI, and usable systems."
      >
        <div className="intro-footnote" data-reveal data-reveal-delay="0.3"><span>Four verified credentials</span><span>Links open the original record</span></div>
      </PageIntro>

      <section className="cert-section section-pad" data-reveal-group>
        <SectionHeading index="01" eyebrow="Verified record" title="Credentials with a source trail." detail="Select a credential to verify it at the issuer." />
        <div className="cert-list" data-stagger-cards>
          {certifications.map((cert) => (
            <article className={`cert-card ${cert.image ? "cert-card-featured" : ""}`} key={cert.index} data-reveal-item>
              <div className="cert-card-meta">
                <span className="cert-number">{cert.index}</span>
                <span className="issuer">{cert.issuer}</span>
                <BadgeCheck size={18} className="badge-check" />
              </div>
              <div className="cert-card-body">
                <div>
                  <p className="eyebrow">{cert.detail}</p>
                  <h2>{cert.title}</h2>
                  <div className="cert-date">Completed by Ashirwad Jha <span>·</span> {cert.date}</div>
                  <a href={cert.verify} target="_blank" rel="noreferrer" className="text-link" data-cursor-label="Verify credential">
                    Verify on Coursera <ExternalLink size={15} />
                  </a>
                </div>
                {cert.image ? (
                  <div className="certificate-image-frame" data-image-reveal>
                    <img src={cert.image} alt={cert.imageAlt} loading="lazy" />
                    <span>Original supplied evidence</span>
                  </div>
                ) : (
                  <div className="verification-panel" aria-label="Verification details">
                    <ShieldCheck size={25} />
                    <strong>Account verified</strong>
                    <span>Course record available at the issuer</span>
                    <span className="verification-id">VVD7POTHRO6B</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cert-note section-pad">
        <div className="cert-note-mark" data-reveal>↗</div>
        <div className="cert-note-copy" data-reveal>
          <p className="eyebrow">Expanding the record</p>
          <h2 className="display-md">The record matters more than the badge.</h2>
          <p>Each card keeps the original verification path visible so the credential can be checked in context. The record will continue to expand as new skills are verified.</p>
        </div>
      </section>

      <section className="closing-cta section-pad closing-cta-compact">
        <div className="cta-index">03</div>
        <div className="cta-copy">
          <p className="eyebrow" data-reveal>Continue the inspection</p>
          <h2 className="display-lg" data-motion-text>Let’s talk about what you’re building.</h2>
          <Link href="/contact" className="button button-primary" data-magnetic data-cursor-label="Contact me">Contact me <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
