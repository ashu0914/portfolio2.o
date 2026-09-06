import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FrameSequenceProps {
  frameCount?: number;
  framePath: (index: number) => string;
  scrollLengthVh?: number;
  fit?: "contain" | "cover";
}

export default function FrameSequence({
  frameCount = 300,
  framePath,
  scrollLengthVh = 3,
  fit = "cover", // <-- Yahan "contain" ko badal kar "cover" kar diya hai
}: FrameSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let trigger: gsap.core.Tween | null = null;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = section.clientWidth || window.innerWidth;
      const height = section.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const draw = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      const widthConstrained = fit === "cover" ? ir <= cr : ir >= cr;

      let dw: number, dh: number, dx: number, dy: number;
      if (widthConstrained) {
        dw = cw;
        dh = dw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = dh * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const loadImages = async () => {
      resizeCanvas();

      const loadPromises = Array.from({ length: frameCount }, (_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            loadedCount++;
            setProgress((loadedCount / frameCount) * 100);
            if (i === 0) draw(0);
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            resolve();
          };
          img.src = framePath(i);
          images[i] = img;
        });
      });

      await Promise.all(loadPromises);
      setIsReady(true);
      resizeCanvas();
      draw(0);

      const playhead = { frame: 0 };

      trigger = gsap.fromTo(
        playhead,
        { frame: 0 },
        {
          frame: frameCount - 1,
          ease: "none",
          onUpdate: () => {
            const currentFrameIndex = Math.round(playhead.frame);
            const reversedIndex = (frameCount - 1) - currentFrameIndex;
            draw(reversedIndex);
          },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollLengthVh * window.innerHeight}`,
            scrub: 0.35,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    };

    loadImages();

    const handleResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (trigger) {
        if (trigger.scrollTrigger) trigger.scrollTrigger.kill();
        trigger.kill();
      }
    };
  }, [frameCount, framePath, scrollLengthVh, fit]);

  return (
    <section ref={sectionRef} className="fsr-pin" style={{ width: "100%", height: "100vh", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div className={`fsr-loader ${isReady ? "is-ready" : ""}`}>
        <span className="fsr-loader-label">Loading sequence ({Math.round(progress)}%)</span>
        <div className="fsr-progress">
          <div className="fsr-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}