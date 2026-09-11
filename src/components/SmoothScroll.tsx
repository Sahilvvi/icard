"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";

let lenisInstance: Lenis | null = null;
export function getLenis() {
  return lenisInstance;
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el as HTMLElement, { offset: -8, duration: 1.4 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const onLoaded = new MutationObserver(() => {
      if (document.documentElement.classList.contains("is-loaded")) {
        refresh();
        onLoaded.disconnect();
      }
    });
    onLoaded.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (prefersReducedMotion()) {
      refresh();
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("load", refresh);
        onLoaded.disconnect();
      };
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      onLoaded.disconnect();
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
