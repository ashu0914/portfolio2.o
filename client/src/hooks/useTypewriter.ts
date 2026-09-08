import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  speed?: number;
  startDelay?: number;
}

interface UseTypewriterResult {
  displayed: string;
  done: boolean;
}

/**
 * Reveals `text` one character at a time.
 * `speed` is the delay (ms) between characters.
 * `startDelay` is the delay (ms) before typing begins.
 */
export function useTypewriter(
  text: string,
  { speed = 38, startDelay = 600 }: UseTypewriterOptions = {}
): UseTypewriterResult {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
