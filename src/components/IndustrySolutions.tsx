"use client";

import { useState } from "react";
import { industries } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { AssetImage } from "./ui/AssetImage";
import { Button } from "./ui/Button";
import { SectionHeader } from "./ui/SectionHeader";

export function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const tab = industries.tabs[active];

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll("[data-reveal-group] > *"), {
      y: 30,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 1,
      scrollTrigger: { trigger: scope, start: "top 75%", once: true },
    });
    gsap.from(".is-tab", { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: scope, start: "top 65%", once: true } });
  }, []);

  const panel = useGsap<HTMLDivElement>(
    ({ scope, reduced }) => {
      if (reduced) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(scope.querySelector(".is-img"), { clipPath: "inset(0 100% 0 0)", scale: 1.1 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.1, ease: "power4.out" })
        .from(scope.querySelectorAll(".is-stat"), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, 0.35)
        .from(scope.querySelectorAll(".is-in"), { y: 14, autoAlpha: 0, stagger: 0.04, duration: 0.7 }, 0.3);
    },
    [active],
  );

  return (
    <section ref={scope} className="relative bg-ivory py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader label={industries.label} index="07" title={industries.title} accentLine={1} sub={industries.sub} />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12">
          <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-0">
            {industries.tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`is-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="is-panel"
                  onClick={() => setActive(i)}
                  data-cursor="button"
                  className={`is-tab group relative shrink-0 rounded-2xl border p-5 text-left transition-[background-color,border-color,color] duration-500 lg:rounded-none lg:border-x-0 lg:border-b lg:border-t-0 lg:p-0 lg:py-7 ${
                    on ? "border-ink bg-ink text-ivory lg:bg-transparent lg:text-ink" : "border-line text-graphite hover:border-ink/40 lg:hover:text-ink"
                  }`}
                >
                  <span className={`micro ${on ? "text-coral" : "text-ash"}`}>{t.kicker}</span>
                  <span className="mt-2 flex items-center justify-between gap-6">
                    <span className={`font-display font-bold tracking-[-0.03em] transition-[font-size] duration-500 ${on ? "text-3xl lg:text-5xl" : "text-2xl lg:text-4xl"}`}>{t.name}</span>
                    <span className={`hidden h-px transition-[width] duration-500 ease-[var(--ease-out-expo)] lg:block ${on ? "w-16 bg-coral" : "w-6 bg-line"}`} />
                  </span>
                </button>
              );
            })}
          </div>

          <div id="is-panel" role="tabpanel" aria-labelledby={`is-tab-${tab.id}`} ref={panel}>
            <div className="card-surface overflow-hidden !rounded-2xl">
              <div className="is-img relative aspect-[16/9] overflow-hidden bg-charcoal text-ivory" style={{ willChange: "clip-path, transform" }}>
                <AssetImage src={tab.asset} alt={tab.assetAlt} tone="dark" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-8 p-6 sm:p-8">
                  {tab.stats.map((s) => (
                    <div key={s.label} className="is-stat">
                      <p className="font-display text-4xl font-bold tracking-[-0.03em] text-coral sm:text-5xl">{s.value}</p>
                      <p className="micro mt-1 text-ivory/70">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="is-in h-sub">{tab.title}</h3>
                  <p className="is-in mt-4 text-[15px] leading-relaxed text-graphite">{tab.body}</p>
                  <p className="is-in micro mt-8 text-ash">Services included</p>
                  <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {tab.services.map((s) => (
                      <li key={s.name} className="is-in border-t border-line pt-3">
                        <p className="font-display text-[15px] font-semibold">{s.name}</p>
                        <p className="mt-1 text-[13px] leading-snug text-graphite">{s.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="is-in micro text-ash">What we provide</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {tab.provide.map((p) => (
                        <li key={p} className="is-in rounded-full border border-line px-3 py-1.5 text-[12px] font-medium">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="is-in micro text-ash">Key partner advantages</p>
                    <ul className="mt-3 space-y-2.5">
                      {tab.advantages.map((a) => (
                        <li key={a} className="is-in flex items-start gap-3 text-[13.5px] leading-snug">
                          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-purple" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="is-in">
                    <Button href="#contact" variant="primary">
                      {tab.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
