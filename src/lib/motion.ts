"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef, useSyncExternalStore, type DependencyList, type RefObject } from "react";

const noopSubscribe = () => () => {};

/** Read a browser-only value on the client; `fallback` is used during SSR/hydration. */
export function useClientValue<T>(read: () => T, fallback: T): T {
  return useSyncExternalStore(noopSubscribe, read, () => fallback);
}

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };

export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
}

export function isDesktop() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px)").matches;
}

/**
 * Runs a GSAP setup function inside a scoped gsap.context so every tween,
 * ScrollTrigger and SplitText created inside is reverted on unmount.
 * The callback receives the scope element and a `reduced` flag; when reduced
 * motion is preferred it should skip or shorten animations.
 */
export function useGsap<T extends HTMLElement>(
  setup: (ctx: { scope: T; reduced: boolean; mm: gsap.MatchMedia }) => void | (() => void),
  deps: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);
  useLayoutEffect(() => {
    registerGsap();
    if (!scope.current) return;
    const mm = gsap.matchMedia();
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ scope: scope.current as T, reduced: prefersReducedMotion(), mm });
    }, scope);
    return () => {
      cleanup?.();
      mm.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}

/** Fade + rise reveal for a set of elements when they enter the viewport. */
export function revealUp(targets: gsap.TweenTarget, opts: { trigger?: Element; stagger?: number; y?: number; start?: string } = {}) {
  return gsap.from(targets, {
    y: opts.y ?? 40,
    autoAlpha: 0,
    duration: 1.1,
    stagger: opts.stagger ?? 0.08,
    ease: EASE.out,
    scrollTrigger: {
      trigger: opts.trigger ?? (targets as Element),
      start: opts.start ?? "top 85%",
      once: true,
    },
  });
}

/** Splits a heading into lines and reveals them with a masked slide. */
export function revealLines(el: Element, opts: { trigger?: Element; delay?: number; scroll?: boolean } = {}) {
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
  const tween = gsap.from(split.lines, {
    yPercent: 110,
    duration: 1.2,
    stagger: 0.09,
    ease: EASE.out,
    delay: opts.delay ?? 0,
    scrollTrigger:
      opts.scroll === false
        ? undefined
        : {
            trigger: opts.trigger ?? el,
            start: "top 85%",
            once: true,
          },
  });
  return { split, tween };
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
