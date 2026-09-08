import { useEffect, useRef } from "react";
import { ArrowRight, Globe, Instagram, Twitter } from "lucide-react";

const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

const FADE_MS = 500;

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const opacityRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number | null = null;

    const animateOpacityTo = (target: number, duration: number) => {
      if (rafId) cancelAnimationFrame(rafId);
      const start = opacityRef.current;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        opacityRef.current = start + (target - start) * progress;
        video.style.opacity = String(opacityRef.current);
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {});
      animateOpacityTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && remaining > 0) {
        animateOpacityTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      opacityRef.current = 0;
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateOpacityTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div className="relative -mt-[74px] flex min-h-screen flex-col overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        style={{ opacity: 0 }}
      />
      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-32 text-center">
        <h1
  className="max-w-5xl text-5xl tracking-tight text-white md:text-7xl lg:text-8xl"
  style={{ fontFamily: "'Instrument Serif', serif" }}
    >
          Proof Of Continuous <em className="italic">Growth</em>.
        </h1>
        <form
          className="liquid-glass mt-10 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-6 pr-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-white p-3 text-black"
            aria-label="Subscribe"
          >
            <ArrowRight size={20} />
          </button>
        </form>
        <p className="mt-6 max-w-xl px-4 text-sm leading-relaxed text-white">
          Stay updated with the latest news and insights. Subscribe to our
          newsletter today and never miss out on exciting updates.
        </p>
        <button
          type="button"
          className="liquid-glass mt-8 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          Manifesto
        </button>
      </div>
      {/* Social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button
          type="button"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </button>
        <button
          type="button"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          aria-label="Twitter"
        >
          <Twitter size={20} />
        </button>
        <button
          type="button"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          aria-label="Site"
        >
          <Globe size={20} />
        </button>
      </div>
    </div>
  );
}
