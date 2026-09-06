// Machined Editorial chrome: a document spine, signal-orange actions, and quiet interaction cues.
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/siteData";
import { useMotion } from "@/hooks/useMotion";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  useMotion();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-frame">
      <div className="cursor-orb" data-cursor aria-hidden="true">
        <span data-cursor-label="" />
      </div>

      <header className="site-nav" data-nav>
        <Link href="/" className="brand-lockup" aria-label="Ashirwad Jha home" onClick={() => setMenuOpen(false)}>
          <img className="brand-mark" src="/images/ashirwad-aj-mark.png" alt="AJ monogram" />
          <span className="brand-wordmark">AJ / <em>systems</em></span>
        </Link>

        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${location === item.href ? "is-active" : ""}`}
              aria-current={location === item.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              data-cursor-label={`Open ${item.label}`}
            >
              <span className="nav-index">{item.index}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-email" href={`mailto:${profile.email}`} data-cursor-label="Send an email">
            <span>Available for a good problem</span>
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className="site-rail" aria-hidden="true"><span>AJ / 26</span><span className="site-rail-line" /></div>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-rule" data-scroll-line />
        <div className="footer-grid">
          <p className="eyebrow">Ashirwad Jha / Delhi NCR</p>
          <p className="footer-note">Built around the belief that useful intelligence should be understandable, modular, and ready to act.</p>
          <a href={`mailto:${profile.email}`} className="footer-mail" data-magnetic data-cursor-label="Email Ashirwad">
            {profile.email}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ashirwad Jha</span>
          <span>Python / GenAI / Agentic systems</span>
        </div>
      </footer>
    </div>
  );
}
