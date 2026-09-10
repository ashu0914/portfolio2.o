import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

// Matches your real routes — no About (that section's been removed from
// Home.tsx, and the /about route is gone from App.tsx too).
const NAV_LINKS = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "Projects", href: "/projects" },
  { index: "03", label: "Skills", href: "/skills" },
  { index: "04", label: "Certifications", href: "/certifications" },
  { index: "05", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Shrink to .nav-compact after a small scroll, matching the CSS transition
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-nav ${compact ? "nav-compact" : ""}`}>
      <Link href="/" className="brand-lockup" aria-label="Home">
        {/* point this at your actual logo file, or drop the <img> and keep just the wordmark */}
        <img src="/images/brand-mark.svg" alt="" className="brand-mark" />
        <span className="brand-wordmark">
          ASHIRWAD <em>JHA</em>
        </span>
      </Link>

      <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${location === item.href ? "is-active" : ""}`}
          >
            <span className="nav-index">{item.index}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <a href="mailto:ashujha0914@gmail.com" className="nav-email">
          ashujha0914@gmail.com
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
