// Machined Editorial Contact: direct, human, and honest about the no-backend inquiry flow.
import { FormEvent, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { profile } from "@/lib/siteData";
import { PageIntro, Rule } from "@/components/PagePrimitives";
import BackgroundVideo from "../components/mainframe/BackgroundVideo";
import Navbar from "../components/mainframe/Navbar";
import Hero from "../components/mainframe/Hero";
import Waves from "@/components/interactive-waves";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Hi Ashirwad,\n\n${message}\n\nReply to: ${email}`;
    setSent(true);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  <div className="relative h-[500px] w-full">
  <Waves />
  </div>

  return (
    <>
      <div className="relative min-h-screen w-full">
        <BackgroundVideo />
        <Navbar />
        <Hero />
      </div>
      <div className="relative h-[1000px] w-full">
  <Waves />
  </div>

      <PageIntro
        index=""
        kicker="Contact / collaboration"
        title="Bring a hard workflow. I’ll bring the system map."
        description="I’m looking for an Agentic AI internship or a thoughtful team working on real-world intelligent products. If the problem is worth unpacking, I’d like to hear about it."
        accent
      >
        <div className="intro-footnote" data-reveal data-reveal-delay="0.3"><span>ashujha0914@gmail.com</span><span>Delhi NCR, India</span></div>
      </PageIntro>

      <section className="contact-section section-pad">
        <div className="contact-visual" data-image-reveal data-parallax-section>
          <img src={`${import.meta.env.BASE_URL}images/ashirwad-contact-desk.png`} alt="Quiet editorial desk still life with a note, pencil, and compact technical instrument." data-parallax-image />
          <div className="contact-visual-caption">Open channel / 24·7</div>
        </div>
        <div className="contact-content">
          <div className="contact-links" data-reveal-group>
            <a href={`mailto:${profile.email}`} className="contact-link" data-reveal-item data-cursor-label="Send an email"><span><Mail size={18} /> Email</span><strong>{profile.email}</strong><ArrowUpRight size={17} /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link" data-reveal-item data-cursor-label="Open GitHub"><span><Github size={18} /> GitHub</span><strong>/ashu0914</strong><ArrowUpRight size={17} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link" data-reveal-item data-cursor-label="Open LinkedIn"><span><Linkedin size={18} /> LinkedIn</span><strong>/in/ashirwad-jha-65152b403</strong><ArrowUpRight size={17} /></a>
          </div>

          <div className="inquiry-block" data-reveal>
            <div className="inquiry-head"><span className="section-index">01</span><div><p className="eyebrow">Start with the signal</p><h2 className="display-md">Tell me what needs to move.</h2></div></div>
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <label><span>Your name</span><input name="name" type="text" placeholder="A name I can reply to" required /></label>
              <label><span>Your email</span><input name="email" type="email" placeholder="you@company.com" required /></label>
              <label className="field-wide"><span>The workflow</span><textarea name="message" rows={5} placeholder="What are you trying to make easier, smarter, or more autonomous?" required /></label>
              <div className="form-submit-row">
                <button type="submit" className="button button-dark" data-magnetic data-cursor-label="Open your mail client">{sent ? "Mail client opened" : "Compose inquiry"} <Send size={16} /></button>
                <span>This opens your email client. Nothing is stored on this site.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-footer section-pad">
        <Rule />
        <div className="contact-footer-grid">
          <p className="eyebrow">A short answer is still an answer.</p>
          <h2 className="display-md">Good systems start with a clear question.</h2>
          <a href={`mailto:${profile.email}`} className="text-link" data-magnetic data-cursor-label="Email Ashirwad">Say hello <ArrowUpRight size={15} /></a>
        </div>
      </section>
    </>
  );
}