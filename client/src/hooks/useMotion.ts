// Machined Editorial motion: one calm, instrument-like system shared by every route.
import { useEffect } from "react";
import { useLocation } from "wouter";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 0.85 });

type MotionElement = HTMLElement & {
  __motionCleanups?: Array<() => void>;
};

export function useMotion() {
  const [location] = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const root = document.documentElement;
    root.classList.toggle("has-motion", !reduced);
    window.scrollTo({ top: 0, behavior: "auto" });

    if (reduced) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    const ctx = gsap.context(() => {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        anchors: true,
      });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const revealPreset = {
        from: { y: 30, autoAlpha: 0, filter: "blur(8px)" },
        to: { y: 0, autoAlpha: 1, filter: "blur(0px)" },
      };

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, revealPreset.from, {
          ...revealPreset.to,
          duration: 0.9,
          delay: Number(element.dataset.revealDelay || 0),
          ease: "power4.out",
            immediateRender: false,
            scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        gsap.fromTo(
          items,
          { y: 34, autoAlpha: 0, filter: "blur(6px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            immediateRender: false,
            duration: 0.85,
            stagger: 0.075,
            ease: "power4.out",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-motion-text]").forEach((element) => {
        const text = element.textContent?.trim() || "";
        if (!text || element.dataset.motionSplit === "true") return;
        element.setAttribute("aria-label", text);
        element.textContent = "";
        text.split(/(\s+)/).forEach((part) => {
          if (!part.trim()) {
            element.appendChild(document.createTextNode(part));
            return;
          }
          const mask = document.createElement("span");
          const word = document.createElement("span");
          mask.className = "motion-word-mask";
          mask.setAttribute("aria-hidden", "true");
          word.className = "motion-word";
          word.textContent = part;
          mask.appendChild(word);
          element.appendChild(mask);
        });
        element.dataset.motionSplit = "true";
        gsap.set(element, { autoAlpha: 1 });
        gsap.fromTo(
          element.querySelectorAll(".motion-word"),
          { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            immediateRender: false,
            duration: 0.9,
            stagger: 0.045,
            ease: "power4.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-image]").forEach((image) => {
        const section = image.closest<HTMLElement>("[data-parallax-section]") || image;
        gsap.to(image, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-line]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: line, start: "top 88%", once: true },
          },
        );
      });

      // Horizontal slide-in from left
      gsap.utils.toArray<HTMLElement>("[data-slide-left]").forEach((element) => {
        gsap.fromTo(element,
          { x: -80, autoAlpha: 0, filter: "blur(6px)" },
          {
            x: 0, autoAlpha: 1, filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            immediateRender: false,
            scrollTrigger: { trigger: element, start: "top 84%", once: true },
          },
        );
      });

      // Horizontal slide-in from right
      gsap.utils.toArray<HTMLElement>("[data-slide-right]").forEach((element) => {
        gsap.fromTo(element,
          { x: 80, autoAlpha: 0, filter: "blur(6px)" },
          {
            x: 0, autoAlpha: 1, filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            immediateRender: false,
            scrollTrigger: { trigger: element, start: "top 84%", once: true },
          },
        );
      });

      // Scale reveal — elements scale up from 0.85 with soft blur
      gsap.utils.toArray<HTMLElement>("[data-scale-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { scale: 0.85, autoAlpha: 0, filter: "blur(10px)" },
          {
            scale: 1, autoAlpha: 1, filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          },
        );
      });

      // Stagger cards — children stagger in with subtle rotation
      gsap.utils.toArray<HTMLElement>("[data-stagger-cards]").forEach((container) => {
        const cards = container.children;
        gsap.fromTo(cards,
          { y: 50, autoAlpha: 0, rotateY: 4, filter: "blur(5px)" },
          {
            y: 0, autoAlpha: 1, rotateY: 0, filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.12,
            ease: "power4.out",
            immediateRender: false,
            scrollTrigger: { trigger: container, start: "top 82%", once: true },
          },
        );
      });

      // Image reveal — clip-path wipe animation
      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((frame) => {
        gsap.fromTo(frame,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.3,
            ease: "power3.inOut",
            immediateRender: false,
            scrollTrigger: { trigger: frame, start: "top 80%", once: true },
          },
        );
      });

      // Nav compact on scroll
      const nav = document.querySelector<HTMLElement>("[data-nav]");
      if (nav) {
        ScrollTrigger.create({
          start: "top -80",
          onUpdate: (self) => {
            nav.classList.toggle("nav-compact", self.direction === 1 && self.scroll() > 80);
          },
        });
      }

      if (!coarse) {
        const cursor = document.querySelector<HTMLElement>("[data-cursor]");
        const cursorLabel = cursor?.querySelector<HTMLElement>("[data-cursor-label]");
        if (cursor) {
          const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
          const handleMove = (event: PointerEvent) => {
            xTo(event.clientX);
            yTo(event.clientY);
          };
          document.addEventListener("pointermove", handleMove, { passive: true });
          const targets = document.querySelectorAll<HTMLElement>("[data-cursor-label]:not([data-cursor])");
          const targetCleanups: Array<() => void> = [];
          targets.forEach((target) => {
            const enter = () => {
              if (cursorLabel) cursorLabel.textContent = target.dataset.cursorLabel || "";
              gsap.to(cursor, { scale: 1.65, duration: 0.3, ease: "power3.out" });
            };
            const leave = () => {
              if (cursorLabel) cursorLabel.textContent = "";
              gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
            };
            target.addEventListener("pointerenter", enter);
            target.addEventListener("pointerleave", leave);
            targetCleanups.push(() => {
              target.removeEventListener("pointerenter", enter);
              target.removeEventListener("pointerleave", leave);
            });
          });
          (cursor as MotionElement).__motionCleanups = [
            () => document.removeEventListener("pointermove", handleMove),
            ...targetCleanups,
          ];
        }

        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((element) => {
          const strength = Number(element.dataset.magnetic || 0.16);
          const xTo = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3.out" });
          const yTo = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            xTo((event.clientX - rect.left - rect.width / 2) * strength);
            yTo((event.clientY - rect.top - rect.height / 2) * strength);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", leave);
          (element as MotionElement).__motionCleanups = [
            () => element.removeEventListener("pointermove", move),
            () => element.removeEventListener("pointerleave", leave),
          ];
        });

        gsap.utils.toArray<HTMLElement>("[data-mouse-parallax]").forEach((section) => {
          const layers = section.querySelectorAll<HTMLElement>("[data-mouse-depth]");
          const setters = Array.from(layers).map((layer) => ({
            layer,
            depth: Number(layer.dataset.mouseDepth || 0.035),
            xTo: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }),
            yTo: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" }),
          }));
          const move = (event: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            setters.forEach(({ depth, xTo, yTo }) => {
              xTo(x * depth);
              yTo(y * depth);
            });
          };
          const leave = () => setters.forEach(({ xTo, yTo }) => {
            xTo(0);
            yTo(0);
          });
          section.addEventListener("pointermove", move);
          section.addEventListener("pointerleave", leave);
          (section as MotionElement).__motionCleanups = [
            () => section.removeEventListener("pointermove", move),
            () => section.removeEventListener("pointerleave", leave),
          ];
        });
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      window.setTimeout(refresh, 80);

      return () => {
        window.removeEventListener("load", refresh);
        lenis.off("scroll", onScroll);
        gsap.ticker.remove(onTick);
        lenis.destroy();
        document.querySelectorAll<MotionElement>("[data-magnetic], [data-mouse-parallax], [data-cursor]").forEach((element) => {
          element.__motionCleanups?.forEach((cleanup) => cleanup());
          delete element.__motionCleanups;
        });
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location]);
}
