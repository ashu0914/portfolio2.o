import { useState } from "react";

const NAV_LINKS = [""];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <>
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">

        {/* Desktop nav links */}
        <nav className="hidden items-center text-[23px] text-black md:flex">
            {NAV_LINKS.map((link, index) => (
            <span key={link} className="flex items-center">
                <a href="#" className="transition-opacity hover:opacity-60">
                {link}
                </a>
                {index < NAV_LINKS.length - 1 && <span>,&nbsp;</span>}
            </span>
                ))}
        </nav>

        {/* Desktop CTA */}
        <a
            href="#"
            className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
            Get in touch
            </a>

        {/* Mobile hamburger */}
        <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex flex-col items-center justify-center gap-[5px] md:hidden"
        >
            <span
            className="h-[2px] w-6 bg-black transition-transform duration-300"
            style={{
                transform: menuOpen
                ? "rotate(45deg) translateY(7px)"
                : "rotate(0deg) translateY(0)",
            }}
            />
            <span
            className="h-[2px] w-6 bg-black transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
            className="h-[2px] w-6 bg-black transition-transform duration-300"
            style={{
                transform: menuOpen
                ? "rotate(-45deg) translateY(-7px)"
                : "rotate(0deg) translateY(0)",
            }}
            />
        </button>
        </header>

      {/* Mobile overlay */}
        <div
        className="absolute inset-0 z-[9] flex flex-col justify-center gap-8 bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        style={{
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
        }}
        >
        {NAV_LINKS.map((link) => (
            <a
            key={link}
            href="#"
            className="text-[32px] font-medium text-black"
            onClick={() => setMenuOpen(false)}
            >
            {link}
            </a>
        ))}
        <a
            href="#"
            className="text-[32px] font-medium text-black underline underline-offset-2"
            onClick={() => setMenuOpen(false)}
        >
            Get in touch
        </a>
        </div>
    </>
    );
}