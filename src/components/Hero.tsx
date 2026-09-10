"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { gsap, ScrollTrigger, isDesktop, prefersReducedMotion, useClientValue, useGsap } from "@/lib/motion";
import { Button } from "./ui/Button";
import { IDCard } from "./ui/IDCard";

const readWebgl = () => isDesktop() && !prefersReducedMotion();
const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export function Hero() {
  const scroll = useRef(0);
  const webgl = useClientValue(readWebgl, false);

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    const lines = scope.querySelectorAll(".hero-line");
    if (!reduced) {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "expo.out" })
        .from(".hero-copy", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.55)
        .from(".hero-cta", { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.85)
        .from(".hero-meta", { autoAlpha: 0, duration: 0.8 }, 1.1)
        .from(".hero-cards-css", { y: 60, autoAlpha: 0, duration: 1.4 }, 0.4);
    }
    ScrollTrigger.create({
      trigger: scope,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scroll.current = self.progress;
      },
    });
    if (!reduced) {
      gsap.to(".hero-text", {
        y: -80,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-cards-css", {
        y: -140,
        rotate: -4,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
      });
    }
  }, []);

  return (
    <section id="top" ref={scope} className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28 lg:pt-0" aria-labelledby="hero-title">
      {/* faint registration grid */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.5]">
        <div className="container-x relative h-full">
          <span className="absolute left-5 top-0 h-full w-px bg-line/60 sm:left-8 lg:left-14 xl:left-20" />
          <span className="absolute right-5 top-0 h-full w-px bg-line/60 sm:right-8 lg:right-14 xl:right-20" />
        </div>
      </div>

      <div className="container-x relative grid min-h-[100svh] items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="hero-text relative z-10 max-w-[720px] pb-10 lg:py-28">
          <p className="hero-copy micro mb-6 flex items-center gap-3 text-graphite">
            <span className="reg-mark">
              <span />
            </span>
            {hero.sub}
          </p>
          <h1 id="hero-title" className="display !text-[clamp(2.5rem,6.2vw,5.6rem)]">
            {hero.lines.map((l) => (
              <span key={l.text} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <span className={`hero-line block ${l.accent ? "text-coral" : ""}`}>{l.text}</span>
              </span>
            ))}
          </h1>
          <p className="hero-copy lede mt-6 max-w-[520px]">{hero.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="hero-cta">
              <Button href="#contact" variant="primary">
                {hero.primaryCta}
              </Button>
            </span>
            <span className="hero-cta">
              <Button href="#ecosystem" variant="ghost">
                {hero.secondaryCta}
              </Button>
            </span>
          </div>
          <div className="hero-meta mt-14 hidden items-center gap-6 text-graphite lg:flex">
            <span className="h-10 w-px bg-line" />
            <div className="micro">
              <p>{hero.caption}</p>
              <p className="mt-1 text-ash">Scroll to explore</p>
            </div>
            <span aria-hidden className="relative ml-2 block h-10 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_2.2s_var(--ease-in-out-quart)_infinite] bg-coral" />
            </span>
          </div>
        </div>

        <div className="relative h-[52vh] min-h-[380px] lg:h-[100svh] lg:min-h-0">
          {webgl ? (
            <HeroScene scroll={scroll} />
          ) : (
            <div className="hero-cards-css relative mx-auto h-full w-full max-w-[420px] perspective-1200">
              <div className="absolute left-[8%] top-[8%] w-[46%] rotate-[-9deg] text-[13px]" style={{ transform: "translateZ(-80px) rotate(-9deg)" }}>
                <IDCard theme="charcoal" role="Staff" name="R. Mehta" />
              </div>
              <div className="absolute right-[4%] top-[28%] w-[44%] rotate-[8deg] text-[12px]">
                <IDCard theme="coral" role="Event" name="Delegate" />
              </div>
              <div className="absolute left-[26%] top-[18%] w-[50%] rotate-[-2deg] text-[14px]">
                <IDCard theme="purple" role="Student" name="A. Sharma" chip />
                <span className="absolute -top-[36%] left-[46%] h-[40%] w-[6px] rounded-full bg-purple" />
              </div>
            </div>
          )}
          <p className="micro absolute bottom-6 right-0 hidden text-ash lg:block">Interactive · move your cursor</p>
        </div>
      </div>

      <style>{`@keyframes scrollhint{0%{transform:translateY(-100%)}60%,100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
