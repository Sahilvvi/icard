"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion, useClientValue } from "@/lib/motion";

const readEnabled = () => isFinePointer() && !prefersReducedMotion();

type Mode = "default" | "button" | "view" | "drag";

/**
 * Desktop-only cursor. Elements opt in with data-cursor="button" | "view" | "drag".
 * Disabled entirely for touch/coarse pointers and reduced motion.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const enabled = useClientValue(readEnabled, false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.42, ease: "power3.out" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.42, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xDot(pos.x);
      yDot(pos.y);
      xRing(pos.x);
      yRing(pos.y);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = (target?.dataset.cursor as Mode | undefined) ?? "default";
      setMode((m) => (m === next ? m : next));
    };
    const onLeave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    const onEnter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ring.current) return;
    const size = mode === "default" ? 36 : mode === "button" ? 56 : 84;
    gsap.to(ring.current, { width: size, height: size, duration: 0.5, ease: "expo.out" });
    gsap.to(dot.current, { scale: mode === "default" ? 1 : 0, duration: 0.3 });
  }, [mode, enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference"
        style={{ background: "#fff" }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white mix-blend-difference"
      >
        <span className={`micro text-white transition-opacity duration-200 ${mode === "view" ? "opacity-100" : "opacity-0"}`}>View</span>
        <span className={`absolute inset-0 flex items-center justify-between px-3 text-white transition-opacity duration-200 ${mode === "drag" ? "opacity-100" : "opacity-0"}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M6 1 2 5l4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="m4 1 4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
    </>
  );
}
