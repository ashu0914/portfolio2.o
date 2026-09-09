import React from "react";

export default function VelorahHero() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap');

        :root {
            --foreground: 0 0% 98%;
            --muted-foreground: 0 0% 78%;
        }

        .liquid-glass {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(18px) saturate(160%);
            -webkit-backdrop-filter: blur(18px) saturate(160%);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        @keyframes fadeRise {
            from {
            opacity: 0;
            transform: translateY(18px);
            }
            to {
            opacity: 1;
            transform: translateY(0);
            }
        }

        .animate-fade-rise {
            animation: fadeRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-fade-rise-delay {
            animation: fadeRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
        }
        .animate-fade-rise-delay-2 {
            animation: fadeRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.34s both;
        }

        @media (prefers-reduced-motion: reduce) {
            .animate-fade-rise,
            .animate-fade-rise-delay,
            .animate-fade-rise-delay-2 {
            animation: none;
            opacity: 1;
            transform: none;
            }
        }

        body {
            font-family: 'Inter', sans-serif;
        }
        `}</style>

      {/* Background video: absolute, full width & height */}
        <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={`${import.meta.env.BASE_URL}images/hero-background.mp4`}
        />

      {/* Dark overlay so text stays legible over the footage */}
        <div className="absolute inset-0 z-0 bg-black/35" />

      {/* Hero content */}
        <main className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-[90px] max-w-7xl mx-auto min-h-[80vh]">
        <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-white text-5xl sm:text-7xl md:text-8xl font-normal leading-[0.95] tracking-tight max-w-7xl animate-fade-rise"
        >
            Where <em className="not-italic text-[hsl(var(--muted-foreground))]">dreams</em> rise <br />
            <em className="not-italic text-[hsl(var(--muted-foreground))]">through the silence.</em>
        </h1>

        <p className="mt-8 max-w-2xl text-[hsl(var(--muted-foreground))] leading-relaxed text-base sm:text-lg animate-fade-rise-delay">
            We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>
        </main>
    </div>
    );
}