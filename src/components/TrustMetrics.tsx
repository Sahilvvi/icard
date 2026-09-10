"use client";

import { trustMetrics } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";

export function TrustMetrics() {
  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    const nums = scope.querySelectorAll<HTMLElement>("[data-count]");
    nums.forEach((el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      if (reduced) {
        el.textContent = `${end}${suffix}`;
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.v)}${suffix}`;
        },
      });
    });

    if (reduced) return;
    const items = scope.querySelectorAll(".tm-item");
    // network "coming online": first rises, second emerges from behind, third locks in
    gsap.from(items[0], { y: 40, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: scope, start: "top 85%", once: true } });
    gsap.from(items[1], { z: -120, scale: 0.92, autoAlpha: 0, duration: 1.2, delay: 0.12, scrollTrigger: { trigger: scope, start: "top 85%", once: true } });
    gsap.from(items[2], { x: 24, autoAlpha: 0, duration: 0.9, delay: 0.26, ease: "back.out(1.4)", scrollTrigger: { trigger: scope, start: "top 85%", once: true } });
    gsap.from(".tm-divider", { scaleY: 0, duration: 1, stagger: 0.1, transformOrigin: "top", scrollTrigger: { trigger: scope, start: "top 85%", once: true } });
    gsap.fromTo(".tm-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: scope, start: "top 90%", end: "bottom 40%", scrub: true } });
  }, []);

  return (
    <section ref={scope} aria-label="Network metrics" className="relative border-y border-line bg-paper">
      <div className="container-x">
        <div className="grid grid-cols-3 perspective-1200">
          {trustMetrics.map((m, i) => (
            <div key={m.label} className="tm-item relative flex flex-col items-center gap-1 py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-center lg:gap-5">
              {i > 0 && <span className="tm-divider absolute left-0 top-6 bottom-6 w-px bg-line" />}
              <span
                data-count={m.value}
                data-suffix={m.suffix}
                className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em] text-coral tabular-nums"
              >
                0{m.suffix}
              </span>
              <span className="micro pb-1 text-graphite lg:pb-3">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="tm-progress absolute bottom-0 left-0 h-px w-full origin-left bg-coral" aria-hidden />
    </section>
  );
}
