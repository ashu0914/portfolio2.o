import React, { useState, useEffect } from 'react';

// Drop this in as your site-wide navbar. It's self-contained (no props needed) —
// pin it near the top of every page's layout, above your Three.js/GSAP content.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on ESC, lock body scroll while the mobile menu is open
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Matches your 5-page structure — edit hrefs/filenames if they differ
  const navLinks = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Skills', href: 'skills.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav className="flex items-center border mx-auto w-full max-w-5xl px-6 py-4 border-slate-700 rounded-full text-white text-sm bg-black/40 backdrop-blur-md">
        {/* Logo — swap for your own mark/initials */}
        <a href="index.html" aria-label="Home" className="flex items-center">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
            <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
          </svg>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 ml-8">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="relative overflow-hidden h-6 group">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {label}
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden ml-auto md:flex items-center gap-4">
          <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
            Resume
          </button>
          <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Contact
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Open menu"
          className="md:hidden ml-auto text-gray-300 hover:text-white"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile overlay */}
        <div
          role="dialog"
          aria-modal="true"
          className={[
            'fixed inset-0 w-full h-full bg-black text-base md:hidden flex-col items-center justify-center gap-6 z-50',
            mobileOpen ? 'flex' : 'hidden',
          ].join(' ')}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-lg hover:text-indigo-400"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setMobileOpen(false)}
            className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
          >
            Contact
          </button>
          <button
            aria-label="Close menu"
            className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
