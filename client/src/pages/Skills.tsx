import { ArrowUpRight, Check, Code2 } from "lucide-react";
import { Link } from "wouter";
import { PageIntro, Rule, SectionHeading } from "@/components/PagePrimitives";
import { profile, skillGroups, tools } from "@/lib/siteData";
import FrameSequence from "@/components/FrameSequence";

export default function Skills() {
  return (
    <>
      <FrameSequence
        frameCount={300}
        framePath={(i) => `${import.meta.env.BASE_URL}images/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`}
        scrollLengthVh={3}
        fit="cover" // <-- "contain" ki jagah "cover" kar dein
      />

      <PageIntro
        index="02"
        kicker="Skills / system map"
        title="The stack is a sequence of decisions."
        description="I work across the full path of an intelligent application: listen carefully, reason with context, and give the system a useful next move."
        accent
      >
        <div className="intro-footnote" data-reveal data-reveal-delay="0.3">
          <span>Based in {profile.location}</span>
          <span>Open to Agentic AI internships</span>
        </div>
      </PageIntro>

      <section className="atlas-section section-pad">
        <div className="atlas-visual" data-image-reveal data-parallax-section>
          <img
            src={`${import.meta.env.BASE_URL}images/ashirwad-systems-atlas.png`}
            alt="Abstract editorial system map showing connected nodes, prompts, memory, and command paths."
            data-parallax-image
          />
          <span className="atlas-label">System atlas / 001</span>
        </div>
        <div className="atlas-copy" data-reveal>
          <p className="eyebrow">How I think about the build</p>
          <h2 className="display-md">
            A good assistant is not one model. It is the choreography around the model.
          </h2>
          <p>
            That means clear modules, bounded actions, explicit state, and interfaces that keep the human in control. My current work focuses on making those parts understandable enough to build on.
          </p>
          <Link href="/contact" className="text-link" data-cursor-label="Discuss a system">
            Discuss a system <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="skills-index-section section-pad" data-reveal-group>
        <SectionHeading
          index="03"
          eyebrow="Core capabilities"
          title="From signal to system."
          detail="The working vocabulary behind Jaya AI."
        />
        <div className="skills-index">
          {skillGroups.map((group) => (
            <article className="skill-index-row" key={group.index} data-reveal-item>
              <div className="skill-index-number">{group.index}</div>
              <div className="skill-index-title">
                <h3>{group.title}</h3>
                <p>{group.note}</p>
              </div>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">
                    <Check size={13} />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-section section-pad">
        <div className="tools-lead" data-reveal>
          <span className="section-index">04</span>
          <div>
            <p className="eyebrow">Tools & languages</p>
            <h2 className="display-md">The practical layer.</h2>
          </div>
        </div>
        <div className="tools-panel" data-reveal-group>
          <div className="tools-panel-head">
            <Code2 size={19} />
            <span>ashirwad / working-environment</span>
            <span className="status-dot" />
          </div>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <span key={tool} data-reveal-item>
                <small>0{index + 1}</small>
                {tool}
              </span>
            ))}
          </div>
          <Rule />
          <p className="tools-note">
            Git version control, GitHub repository management, API integrations, environment variables, modular architecture, OOP, and debugging are part of the daily build—not afterthoughts.
          </p>
        </div>
      </section>

      <section className="closing-cta section-pad closing-cta-compact">
        <div className="cta-index">05</div>
        <div className="cta-copy">
          <p className="eyebrow" data-reveal>
            Go deeper
          </p>
          <h2 className="display-lg" data-motion-text>
            See the proof in the work.
          </h2>
          <Link
            href="/certifications"
            className="button button-dark"
            data-magnetic
            data-cursor-label="View certifications"
          >
            View certifications <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}