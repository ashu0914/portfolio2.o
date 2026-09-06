import { useRef, useEffect } from "react";

interface HoverMaskRevealProps {
  grayscaleImg: string;
  colorImg: string;
  brushRadius?: number;
}

interface TrailPoint {
  x: number;
  y: number;
  birth: number;    // timestamp when created
  radius: number;   // varies with speed for fluid feel
  maxLife: number;   // how long it lives (ms)
}

export default function HoverMaskReveal({
  grayscaleImg,
  colorImg,
  brushRadius = 120,
}: HoverMaskRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: -400, y: -400 });
  const smoothPos = useRef({ x: -400, y: -400 });
  const prevPos = useRef({ x: -400, y: -400 });
  const trailRef = useRef<TrailPoint[]>([]);
  const grayscaleLoadedRef = useRef<HTMLImageElement | null>(null);
  const isActive = useRef(false);

  // Draw grayscale with object-fit: cover
  function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) * 0.2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.closest(".landing-hero-fullbleed") || canvas.parentElement;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth || window.innerWidth;
      canvas.height = parent?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Load grayscale
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      grayscaleLoadedRef.current = img;
      drawCover(ctx, img, canvas.width, canvas.height);
      startLoop();
    };
    img.src = grayscaleImg;

    // Add trail points between two positions (fill gaps for smooth strokes)
    function addTrailPoints(x0: number, y0: number, x1: number, y1: number, speed: number) {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const step = Math.max(8, brushRadius * 0.12);
      const count = Math.max(Math.ceil(dist / step), 1);
      const now = performance.now();

      // Speed affects radius — faster = larger, more fluid spread
      const speedFactor = Math.min(speed / 15, 1.8);
      const baseRadius = brushRadius * (0.7 + speedFactor * 0.5);

      for (let i = 0; i <= count; i++) {
        const t = i / count;
        trailRef.current.push({
          x: x0 + dx * t,
          y: y0 + dy * t,
          birth: now,
          radius: baseRadius * (0.85 + Math.random() * 0.3), // slight variation
          maxLife: 2000 + Math.random() * 500, // 2-2.5s lifetime
        });
      }
    }

    function loop() {
      if (!ctx || !canvas) return;
      const now = performance.now();

      // Smooth interpolation
      const lerp = 0.15;
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * lerp;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * lerp;

      // Add new trail points if mouse is active
      if (isActive.current) {
        const sx = smoothPos.current.x;
        const sy = smoothPos.current.y;
        const px = prevPos.current.x;
        const py = prevPos.current.y;
        const speed = Math.sqrt((sx - px) ** 2 + (sy - py) ** 2);

        if (speed > 1.5) {
          addTrailPoints(px, py, sx, sy, speed);
          prevPos.current.x = sx;
          prevPos.current.y = sy;
        }
      }

      // Remove dead trail points
      trailRef.current = trailRef.current.filter((p) => now - p.birth < p.maxLife);

      // 1. Redraw full grayscale
      if (grayscaleLoadedRef.current) {
        ctx.globalCompositeOperation = "source-over";
        drawCover(ctx, grayscaleLoadedRef.current, canvas.width, canvas.height);
      }

      // 2. Erase at each trail point — opacity fades with age
      ctx.globalCompositeOperation = "destination-out";

      for (let i = 0; i < trailRef.current.length; i++) {
        const p = trailRef.current[i];
        const age = now - p.birth;
        const life = age / p.maxLife; // 0→1

        // Smooth ease-out fade: full opacity at start, fades toward end
        // Hold full opacity for first 40%, then smooth fade out
        let alpha: number;
        if (life < 0.4) {
          alpha = 1;
        } else {
          // Smooth cubic fade from 1 to 0
          const fadeProgress = (life - 0.4) / 0.6;
          alpha = 1 - fadeProgress * fadeProgress * fadeProgress;
        }

        if (alpha <= 0.01) continue;

        // Fluid: radius slightly grows then shrinks over lifetime
        const sizeLife = life < 0.2
          ? 0.85 + life * 0.75   // grow slightly at start
          : 1.0 - (life - 0.2) * 0.25; // shrink slowly
        const r = p.radius * sizeLife;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, `rgba(0,0,0,${alpha})`);
        grad.addColorStop(0.5, `rgba(0,0,0,${alpha * 0.7})`);
        grad.addColorStop(0.75, `rgba(0,0,0,${alpha * 0.25})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    }

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!isActive.current) {
        smoothPos.current.x = x;
        smoothPos.current.y = y;
        prevPos.current.x = x;
        prevPos.current.y = y;
        isActive.current = true;
      }

      mousePos.current.x = x;
      mousePos.current.y = y;
    };

    const handleMouseLeave = () => {
      isActive.current = false;
    };

    const eventTarget = container || document;
    eventTarget.addEventListener("mousemove", handleMouseMove as EventListener);
    eventTarget.addEventListener("mouseleave", handleMouseLeave as EventListener);

    return () => {
      window.removeEventListener("resize", resize);
      eventTarget.removeEventListener("mousemove", handleMouseMove as EventListener);
      eventTarget.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [grayscaleImg, brushRadius]);

  return (
    <div className="mask-reveal-container">
      <img src={colorImg} alt="Ashirwad Jha" className="mask-reveal-color" />
      <canvas ref={canvasRef} className="mask-reveal-canvas" />
    </div>
  );
}
