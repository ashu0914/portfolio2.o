// Machined Editorial primitives: every page opens with an index, a thesis, and a visible calibration line.
import type { ReactNode } from "react";

export function PageIntro({
  index,
  kicker,
  title,
  description,
  children,
  accent = false,
}: {
  index: string;
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
  accent?: boolean;
}) {
  return (
    <section className={`page-intro ${accent ? "page-intro-accent" : ""}`}>
      <div className="page-intro-index" data-reveal>
        <span className="index-ring">{index}</span>
        <span className="vertical-label">Field note / {kicker}</span>
      </div>
      <div className="page-intro-copy">
        <p className="eyebrow" data-reveal>{kicker}</p>
        <h1 className="display-xl" data-motion-text>{title}</h1>
        <p className="intro-description" data-reveal data-reveal-delay="0.18">{description}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  detail,
}: {
  index: string;
  eyebrow: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-index" data-reveal>{index}</div>
      <div>
        <p className="eyebrow" data-reveal>{eyebrow}</p>
        <h2 className="display-md" data-motion-text>{title}</h2>
      </div>
      {detail ? <p className="heading-detail" data-reveal>{detail}</p> : null}
    </div>
  );
}

export function Rule() {
  return <div className="calibration-rule" data-scroll-line aria-hidden="true" />;
}
