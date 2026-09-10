"use client";

import { useState } from "react";
import { story } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { AssetImage } from "./ui/AssetImage";

export function ManufacturingStory() {
  const [active, setActive] = useState(0);
  const n = story.steps.length;

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    const imgs = gsap.utils.toArray<HTMLElement>(".ms-img", scope);
    gsap.set(imgs, { clipPath: "inset(0 0 100% 0)" });
    gsap.set(imgs[0], { clipPath: "inset(0 0 0% 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom bottom",
        scrub: reduced ? true : 0.5,
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          setActive((a) => (a === i ? a : i));
        },
      },
    });
    imgs.forEach((img, i) => {
      if (i === 0) return;
      tl.to(imgs[i - 1].querySelector(".ms-inner"), { scale: 1.1, duration: 1, ease: "none" }, i - 1)
        .to(img, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "none" }, i - 1)
        .fromTo(img.querySelector(".ms-inner"), { yPercent: 12, scale: 1.05 }, { yPercent: 0, scale: 1, duration: 1, ease: "none" }, i - 1);
    });
    tl.to({}, { duration: 1 });
  }, []);

  const step = story.steps[active];

  return (
    <section id="story" ref={scope} className="relative bg-ink text-ivory" style={{ height: `${n * 100}vh` }} aria-label="Manufacturing story">
      <div className="sticky top-0 h-screen overflow-hidden">
        {story.steps.map((s) => (
          <div key={s.index} className="ms-img absolute inset-0" style={{ willChange: "clip-path" }}>
            <div className="ms-inner h-full w-full will-change-transform">
              <AssetImage src={s.asset} alt={s.alt} tone="dark" caption="none" />
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85 lg:bg-gradient-to-r lg:from-ink/85 lg:via-ink/40 lg:to-ink/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="container-x relative flex h-full flex-col justify-between py-20 sm:py-28">
          <div className="micro flex items-center gap-4 text-ivory/60">
            <span className="reg-mark">
              <span />
            </span>
            {story.label}
            <span className="ml-auto tabular-nums text-ivory/80">
              {step.index} / 0{n}
            </span>
          </div>

          <div className="max-w-xl">
            <p className="micro text-coral" aria-hidden>
              {step.index}
            </p>
            <h2 className="display mt-3" aria-live="polite">
              <span key={step.title} className="block animate-[storyin_0.9s_var(--ease-out-expo)_both]">
                {step.title}.
              </span>
            </h2>
            <p key={step.body} className="lede mt-6 max-w-md !text-ivory/75 animate-[storyin_0.9s_var(--ease-out-expo)_0.1s_both]">
              {step.body}
            </p>
          </div>

          <ol className="grid grid-cols-4 gap-3 sm:gap-6" aria-label="Steps">
            {story.steps.map((s, i) => (
              <li key={s.index} className="micro border-t pt-3 transition-colors duration-500" style={{ borderColor: i <= active ? "#ff7a45" : "rgba(246,241,231,0.2)", color: i === active ? "#f6f1e7" : "rgba(246,241,231,0.5)" }}>
                <span className="block">{s.index}</span>
                <span className="mt-1 hidden sm:block">{s.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style>{`@keyframes storyin{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
