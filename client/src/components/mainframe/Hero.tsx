import { useEffect, useState } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import CopyIcon from "./CopyIcon";

const TYPEWRITER_TEXT =
    "Glad you stopped in. Good taste tends to find us. Now, what are we building?";

const WHITE_PILLS = [
    "",
    "",
    "",
    "",
];

const EMAIL = "ashujha0914@gmail.com";

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, {
    speed: 38,
    startDelay: 600,
  });
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
  };

  return (
    <section className="relative z-[1] flex h-screen flex-col overflow-hidden justify-end px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        {/* Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: "clamp(18px, 4vw, 26px)",
            lineHeight: 1.3,
            fontWeight: 400,
            color: "#000",
            filter: "blur(4px)",
          }}
        >
          <span></span>
          <br />
          <span></span>
        </div>

        {/* Typewriter text */}
        <p
          className="mb-5 text-black sm:mb-6"
          style={{
            fontSize: "clamp(18px, 4vw, 26px)",
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: "54px",
          }}
        >
          {displayed}
          {!done && (
            <span className="typewriter-cursor ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-black" />
          )}
        </p>

        {/* Action pills */}
        <div
          className="flex flex-wrap gap-y-1 transition-all duration-[400ms] ease-out"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {WHITE_PILLS.map((label) => (
            <button
              key={label}
              type="button"
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCopyEmail}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}