"use client";

import { useState } from "react";
import { ecosystem } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { AssetImage } from "./ui/AssetImage";
import { SectionHeader } from "./ui/SectionHeader";

const TONES: Record<string, { bg: string; fg: string; sub: string; line: string }> = {
  ivory: { bg: "#f6f1e7", fg: "#16141a", sub: "#4b4750", line: "rgba(22,20,26,0.12)" },
  charcoal: { bg: "#232028", fg: "#f6f1e7", sub: "rgba(246,241,231,0.7)", line: "rgba(246,241,231,0.14)" },
  purple: { bg: "#3a2790", fg: "#f6f1e7", sub: "rgba(246,241,231,0.72)", line: "rgba(246,241,231,0.16)" },
};

export function EcosystemSection() {
  const [active, setActive] = useState(0);
  const pillars = ecosystem.pillars;

  const scope = useGsap<HTMLElement>(({ scope, reduced, mm }) => {
    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".eco-panel", scope);
      const n = panels.length;

      gsap.set(panels, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(panels[0], { clipPath: "inset(0% 0 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          scrub: reduced ? true : 0.6,
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.floor(self.progress * n));
            setActive((a) => (a === idx ? a : idx));
          },
        },
      });

      panels.forEach((p, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1].querySelector(".eco-media"), { scale: 1.08, yPercent: -6, duration: 1, ease: "none" }, i - 1)
          .to(p, { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" }, i - 1)
          .from(p.querySelector(".eco-media"), { yPercent: 18, duration: 1, ease: "none" }, i - 1);
      });
      tl.to({}, { duration: 0.4 });

      const t = scope.querySelector(".eco-track")!;
      gsap.fromTo(t, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: scope, start: "top top", end: () => `+=${window.innerHeight * n}`, scrub: true } });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>(".eco-panel", scope).forEach((p) => {
        gsap.from(p.querySelectorAll(".eco-in"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.9,
          scrollTrigger: { trigger: p, start: "top 80%", once: true },
        });
      });
    });

    if (!reduced) {
      gsap.from(scope.querySelectorAll("[data-reveal-group] > *"), {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        scrollTrigger: { trigger: scope, start: "top 75%", once: true },
      });
    }
  }, []);

  const tone = TONES[pillars[active].tone];

  return (
    <section
      id="ecosystem"
      ref={scope}
      className="relative transition-[background-color,color] duration-700 ease-[var(--ease-in-out-quart)] lg:h-[var(--eco-h)]"
      style={{ backgroundColor: tone.bg, color: tone.fg, "--eco-h": `${(pillars.length + 1.4) * 100}vh` } as React.CSSProperties}
    >
      <div className="eco-stage relative transition-[background-color] duration-700 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden" style={{ backgroundColor: tone.bg }}>
        <div className="container-x grid gap-10 pb-10 pt-20 sm:pt-28 lg:h-full lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:pb-14">
          {/* Left: header + flow */}
          <div className="flex flex-col justify-between">
            <div style={{ color: tone.fg }}>
              <SectionHeader label={ecosystem.label} index="02" title={ecosystem.title} accentLine={1} sub={ecosystem.sub} tone={active === 0 ? "light" : "dark"} />
            </div>

            <ol className="relative mt-12 hidden gap-0 lg:flex lg:flex-col" aria-label="Ecosystem flow">
              <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px" style={{ background: tone.line }} />
              <span className="eco-track absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-coral" />
              {ecosystem.flow.map((step, i) => {
                const on = i <= [0, 1, 4][active];
                return (
                  <li key={step} className="relative flex items-center gap-5 py-2.5">
                    <span
                      className={`relative z-10 size-[15px] rounded-full border-2 transition-colors duration-500 ${on ? "border-coral bg-coral" : ""}`}
                      style={!on ? { borderColor: tone.line, background: tone.bg } : undefined}
                    />
                    <span className={`micro transition-opacity duration-500 ${on ? "opacity-100" : "opacity-45"}`}>{step}</span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 hidden items-center gap-4 lg:flex" aria-hidden>
              <span className="font-display text-5xl font-bold tabular-nums">{pillars[active].index}</span>
              <span className="h-px w-16" style={{ background: tone.line }} />
              <span className="micro" style={{ color: tone.sub }}>
                / 0{pillars.length}
              </span>
            </div>
          </div>

          {/* Right: panels */}
          <div className="relative flex flex-col gap-8 lg:block lg:h-full">
            {pillars.map((p, i) => {
              const t = TONES[p.tone];
              return (
                <article
                  key={p.id}
                  className="eco-panel relative lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center"
                  data-active={i === active}
                  style={{ willChange: "clip-path" }}
                >
                  <div className="grid gap-6 rounded-2xl p-5 sm:p-7 lg:grid-cols-[1fr_1.15fr] lg:gap-8 lg:p-8" style={{ background: t.bg, color: t.fg, boxShadow: `inset 0 0 0 1px ${t.line}` }}>
                    <div className="order-2 flex flex-col justify-between lg:order-1">
                      <div>
                        <div className="eco-in micro flex items-center gap-3" style={{ color: t.sub }}>
                          <span>{p.index}</span>
                          <span className="h-px w-6" style={{ background: t.line }} />
                          <span>{p.eyebrow}</span>
                          {p.badge && <span className="ml-auto rounded-full bg-coral px-2.5 py-1 text-[9px] text-ink">{p.badge}</span>}
                        </div>
                        <h3 className="eco-in h-sub mt-5">{p.title}</h3>
                        <p className="eco-in mt-4 text-[15px] leading-relaxed" style={{ color: t.sub }}>
                          {p.body}
                        </p>
                      </div>
                      <ul className="mt-6 space-y-2.5">
                        {p.points.map((pt) => (
                          <li key={pt} className="eco-in flex items-start gap-3 text-[14px] leading-snug">
                            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-coral" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="eco-in order-1 overflow-hidden rounded-xl lg:order-2 lg:aspect-auto lg:min-h-[420px]" style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.5)" }}>
                      <div className="eco-media aspect-[16/10] w-full will-change-transform sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[420px]">
                        <AssetImage src={p.asset} alt={p.assetAlt} tone={p.tone === "ivory" ? "light" : "dark"} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
