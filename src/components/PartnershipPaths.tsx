"use client";

import { useRef, useState } from "react";
import { partnershipPaths } from "@/lib/content";
import { gsap, prefersReducedMotion, useGsap } from "@/lib/motion";
import { AssetImage } from "./ui/AssetImage";
import { Button } from "./ui/Button";
import { SectionHeader } from "./ui/SectionHeader";

export function PartnershipPaths() {
  const [active, setActive] = useState(1);
  const prev = useRef(1);
  const paths = partnershipPaths.paths;

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll("[data-reveal-group] > *"), {
      y: 30,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 1,
      scrollTrigger: { trigger: scope, start: "top 75%", once: true },
    });
    gsap.from(".pp-nav > *", { x: -24, autoAlpha: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: scope, start: "top 65%", once: true } });
    gsap.from(".pp-visual", { clipPath: "inset(10% 0 10% 0 round 16px)", autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: scope, start: "top 65%", once: true } });
    gsap.to(".pp-img-parallax", { yPercent: -8, ease: "none", scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true } });
  }, []);

  const panelScope = useGsap<HTMLDivElement>(
    ({ scope }) => {
      const dir = active > prev.current ? 1 : -1;
      prev.current = active;
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        scope.querySelector(".pp-img"),
        { clipPath: dir > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", scale: 1.12 },
        { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.1, ease: "power4.out" },
      ).from(scope.querySelectorAll(".pp-in"), { y: 18 * dir, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.2);
    },
    [active],
  );

  const p = paths[active];

  return (
    <section id="software" ref={scope} className="relative bg-paper py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader label={partnershipPaths.label} index="05" title={partnershipPaths.title} accentLine={1} sub={partnershipPaths.sub} />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14">
          {/* Vertical nav */}
          <div role="tablist" aria-label="Partnership paths" aria-orientation="vertical" className="pp-nav flex flex-col border-t border-line">
            {paths.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  role="tab"
                  id={`pp-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls="pp-panel"
                  onClick={() => setActive(i)}
                  data-cursor="button"
                  className={`group relative flex items-start gap-5 border-b border-line py-6 text-left transition-colors duration-500 ${on ? "text-ink" : "text-ash hover:text-graphite"}`}
                >
                  <span className={`micro mt-1.5 tabular-nums ${on ? "text-coral" : ""}`}>0{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{item.nav}</span>
                    {item.badge && (
                      <span className={`micro mt-2 inline-block rounded-full px-2.5 py-1 transition-colors ${on ? "bg-coral text-ink" : "bg-line/60 text-graphite"}`}>{item.badge}</span>
                    )}
                  </span>
                  <span className={`mt-2 h-px transition-[width,background-color] duration-500 ease-[var(--ease-out-expo)] ${on ? "w-12 bg-coral" : "w-5 bg-line"}`} />
                </button>
              );
            })}
          </div>

          {/* Visual panel */}
          <div id="pp-panel" role="tabpanel" aria-labelledby={`pp-tab-${p.id}`} ref={panelScope} className="pp-visual relative">
            <div className="relative overflow-hidden rounded-2xl bg-charcoal text-ivory" style={{ boxShadow: "0 40px 80px -40px rgba(22,20,26,0.6)" }}>
              <div className="pp-img relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]" style={{ willChange: "clip-path, transform" }}>
                <div className="pp-img-parallax h-[112%] w-full">
                  <AssetImage src={p.asset} alt={p.assetAlt} tone="dark" caption="top" />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal to-transparent" />
              </div>
              <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="pp-in h-sub">{p.title}</h3>
                  <p className="pp-in mt-4 text-[15px] leading-relaxed text-ivory/70">{p.body}</p>
                  <div className="pp-in mt-6">
                    <Button href="#contact" variant="coral">
                      {p.cta}
                    </Button>
                  </div>
                </div>
                <ul className="space-y-3 border-t border-ivory/10 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  {p.points.map((pt) => (
                    <li key={pt} className="pp-in flex items-start gap-3 text-[14px] leading-snug text-ivory/85">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-0.5 shrink-0 text-coral">
                        <path d="M2 7.5 5.5 11 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
