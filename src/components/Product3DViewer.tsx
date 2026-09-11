"use client";

import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { AssetImage } from "./ui/AssetImage";
import { Eyebrow } from "./ui/SectionHeader";

const ITEMS = products.items.slice(0, 8);
const N = ITEMS.length;
const STEP = 360 / N;
const AUTOPLAY_MS = 2800;

export function Product3DViewer() {
  const ring = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const angle = useRef(0);

  const rotateTo = (i: number) => {
    const next = ((i % N) + N) % N;
    // shortest path
    const target = -next * STEP;
    const cur = angle.current;
    const delta = ((target - cur + 540) % 360) - 180;
    angle.current = cur + delta;
    setActive(next);
    if (!ring.current) return;
    gsap.to(ring.current, {
      rotateY: angle.current,
      duration: prefersReducedMotion() ? 0.6 : 1.1,
      ease: prefersReducedMotion() ? "power2.out" : "elastic.out(1, 0.85)",
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") rotateTo(active + 1);
      if (e.key === "ArrowLeft") rotateTo(active - 1);
    };
    const el = ring.current?.parentElement;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = window.setInterval(() => rotateTo(active + 1), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [active, paused, inView]);

  return (
    <section aria-labelledby="p3d-title" className="relative overflow-hidden border-y border-line bg-cream py-20 sm:py-28">
      <div className="container-x mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow label="Catalogue in the round" index="04" />
          <h2 id="p3d-title" className="h-sub mt-4 max-w-md">
            Every category, from a single trusted platform.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => rotateTo(active - 1)}
            aria-label="Previous product"
            data-cursor="button"
            className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-ivory"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M14 8H3m4.5 4.5L3 8l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => rotateTo(active + 1)}
            aria-label="Next product"
            data-cursor="button"
            className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-ivory"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={stage}
        className="relative mx-auto h-[400px] w-full max-w-[1100px] outline-none [--ring-r:300px] [perspective:1800px] sm:h-[460px] sm:[--ring-r:400px] lg:[--ring-r:520px] lg:[perspective:1400px]"
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Product categories"
      >
        <div ref={ring} className="absolute left-1/2 top-1/2 preserve-3d" style={{ transform: "rotateY(0deg)", transformStyle: "preserve-3d" }}>
          {ITEMS.map((p, i) => {
            const rel = ((i - active) % N + N) % N;
            const dist = Math.min(rel, N - rel); // 0..N/2
            const isActive = dist === 0;
            return (
              <figure
                key={p.id}
                aria-hidden={!isActive}
                onClick={() => rotateTo(i)}
                data-cursor={isActive ? undefined : "view"}
                className="absolute left-0 top-0 w-[180px] sm:w-[230px] lg:w-[260px]"
                style={{
                  transform: `translate(-50%,-50%) rotateY(${i * STEP}deg) translateZ(var(--ring-r))`,
                  filter: dist >= 2 ? `blur(${Math.min(3, (dist - 1) * 1.2)}px)` : "none",
                  opacity: dist >= 3 ? 0.35 : 1,
                  transition: "filter 0.6s var(--ease-out-expo), opacity 0.6s var(--ease-out-expo)",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <div className={`card-surface overflow-hidden transition-shadow duration-700 ${isActive ? "shadow-[0_40px_80px_-30px_rgba(22,20,26,0.5)]" : ""}`}>
                  <div className="aspect-[4/5] bg-cream">
                    <AssetImage src={p.asset} alt={`${p.name} — product photograph`} />
                  </div>
                  <figcaption className="flex items-center justify-between p-4">
                    <span className="font-display text-base font-semibold">{p.name}</span>
                    <span className="micro text-ash">{String(i + 1).padStart(2, "0")}</span>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
        {/* floor shadow */}
        <div aria-hidden className="absolute bottom-6 left-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[100%] bg-ink/15 blur-2xl" />
      </div>

      <div className="container-x mt-8 flex items-center justify-between">
        <p className="micro text-graphite">
          <span className="text-ink">{ITEMS[active].name}</span> · {ITEMS[active].spec}
        </p>
        <ol className="flex gap-1.5" aria-label="Slides">
          {ITEMS.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                aria-label={`Show ${p.name}`}
                aria-current={i === active}
                onClick={() => rotateTo(i)}
                className={`h-1 rounded-full transition-[width,background-color] duration-500 ${i === active ? "w-8 bg-coral" : "w-3 bg-ink/20"}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
