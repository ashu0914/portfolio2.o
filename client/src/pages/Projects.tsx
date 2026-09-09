// Machined Editorial Projects: deep, detailed project showcases with scroll-triggered reveals.
import { ArrowUpRight, ExternalLink, MoveUpRight, ChevronRight, Layers, Zap, Brain, Terminal } from "lucide-react";
import { Link } from "wouter";
import { PageIntro, Rule, SectionHeading } from "@/components/PagePrimitives";
import { profile, projects } from "@/lib/siteData";
import VelorahHero from "@/components/VelorahHero";

const iconMap: Record<string, React.ReactNode> = {
  "01": <Brain size={20} />,
  "02": <Zap size={20} />,
};

export default function Projects() {
  return (
    <>
      <VelorahHero />

      <PageIntro
        index=""
        kicker="Projects / builds"
        title="Built to reason, remember, and act."
        description="Each project is a system designed to move from language to outcome. These are the applications I'm building — open-source, modular, and structured for the next generation of AI agents."
        accent
      >
        <div className="intro-footnote" data-reveal data-reveal-delay="0.3"><span>{projects.length} active projects</span><span>All open-source on GitHub</span></div>
      </PageIntro>

      {projects.map((proj, projIdx) => (
        <section
          key={proj.index}
          className={`project-showcase section-pad ${proj.featured ? "project-showcase-featured" : "project-showcase-alt"}`}
          data-mouse-parallax
        >
          <div className="project-showcase-header" data-reveal-group>
            <div className="showcase-index" data-reveal-item>
              <span className="showcase-number">{proj.index}</span>
              <span className="showcase-icon" data-scale-reveal>{iconMap[proj.index] || <Layers size={20} />}</span>
            </div>
            <div className="showcase-intro" data-reveal-item>
              <p className="eyebrow">{proj.kicker}</p>
              <h2 className="showcase-title" data-motion-text>{proj.name}</h2>
              <p className="showcase-tagline">{proj.tagline}</p>
            </div>
          </div>

          <div className="showcase-body">
            <div className="showcase-description" data-reveal>
              <p className="showcase-desc-text">{proj.description}</p>
              <a href={proj.github} target="_blank" rel="noreferrer" className="button button-dark" data-magnetic data-cursor-label="Open repository">
                Open repository <ExternalLink size={16} />
              </a>
            </div>

            {proj.pipeline.length > 0 && (
              <div className="showcase-pipeline" data-stagger-cards>
                {proj.pipeline.map((step) => (
                  <div className="showcase-pipeline-step" key={step.index} data-reveal-item>
                    <div className="pipeline-step-header">
                      <span className="pipeline-step-num">{step.index}</span>
                      <div className="pipeline-step-line" />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                    <MoveUpRight size={14} className="pipeline-step-arrow" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="showcase-details" data-reveal-group>
            <div className="showcase-details-header" data-reveal-item>
              <Terminal size={16} />
              <span>Build log / {proj.name.toLowerCase().replace(/\s+/g, "-")}</span>
              <span className="status-dot" />
            </div>
            <div className="showcase-highlights">
              {proj.highlights.map((highlight, i) => (
                <div className="showcase-highlight-row" key={i} data-reveal-item>
                  <span className="highlight-bullet"><ChevronRight size={13} /></span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <Rule />
          <div className="tag-row showcase-tags" data-reveal data-slide-left>
            {proj.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
          </div>
        </section>
      ))}

      <section className="projects-summary section-pad" data-reveal-group>
        <SectionHeading index="03" eyebrow="What's next" title="The system is always expanding." detail="New modules, new capabilities, new projects — each one structured to compound on the last." />
        <div className="summary-grid">
          <div className="summary-card" data-reveal-item data-scale-reveal>
            <span className="summary-card-num">01</span>
            <h3>Agentic architecture</h3>
            <p>Expanding Jaya AI toward tools, permissions, configurable behavior, and autonomous task execution.</p>
          </div>
          <div className="summary-card" data-reveal-item data-scale-reveal>
            <span className="summary-card-num">02</span>
            <h3>AI-driven nutrition</h3>
            <p>Building Nutriplex into a full-stack AI nutrition platform with personalized recommendations.</p>
          </div>
          <div className="summary-card" data-reveal-item data-scale-reveal>
            <span className="summary-card-num">03</span>
            <h3>Open-source first</h3>
            <p>Every project ships public. Inspect the code, suggest improvements, or build on top.</p>
          </div>
        </div>
      </section>

      <section className="closing-cta section-pad" data-mouse-parallax>
        <div className="cta-index" data-mouse-depth="0.08">04</div>
        <div className="cta-copy">
          <p className="eyebrow" data-reveal>Collaboration</p>
          <h2 className="display-lg" data-motion-text>Have a workflow that needs intelligence? Let's build it.</h2>
          <Link href="/contact" className="button button-primary" data-magnetic data-cursor-label="Contact Ashirwad">Let's talk <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}