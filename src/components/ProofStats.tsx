"use client";

import { proofStats } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";

export function ProofStats() {
  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll(".ps-num"), {
      yPercent: 110,
      stagger: 0.12,
      duration: 1.3,
      ease: "power4.out",
      scrollTrigger: { trigger: scope, start: "top 70%", once: true },
    });
    gsap.from(scope.querySelectorAll(".ps-meta"), {
      autoAlpha: 0,
      y: 20,
      stagger: 0.12,
      duration: 1,
      delay: 0.4,
      scrollTrigger: { trigger: scope, start: "top 70%", once: true },
    });
    gsap.to(scope.querySelector(".ps-grid"), {
      backgroundPositionY: "120px",
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.fromTo(scope.querySelector(".ps-scan"), { xPercent: -100 }, { xPercent: 100, duration: 2.2, ease: "power2.inOut", scrollTrigger: { trigger: scope, start: "top 70%", once: true } });
  }, []);

  return (
    <section ref={scope} className="relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      {/* warehouse / logistics grid */}
      <div aria-hidden className="ps-grid absolute inset-0 grid-bg opacity-[0.35]" />
      <div aria-hidden className="absolute inset-0 grain-dark" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[12%] w-px bg-ivory/10" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[12%] w-px bg-ivory/10" />
      <div aria-hidden className="ps-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral to-transparent" />

      <div className="container-x relative">
        <p className="micro flex items-center gap-4 text-ivory/50">
          <span className="reg-mark">
            <span />
          </span>
          Proof of scale
          <span className="barcode ml-auto hidden h-4 w-24 sm:block" />
        </p>
        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {proofStats.map((s, i) => (
            <div key={s.label} className={`relative ${i > 0 ? "md:border-l md:border-ivory/10 md:pl-8" : ""}`}>
              <div className="overflow-hidden">
                <p className="ps-num font-display text-[clamp(64px,10vw,152px)] font-bold leading-[0.9] tracking-[-0.05em]">
                  {s.value.replace(/[^0-9]/g, "")}
                  <span className="text-coral">{s.value.replace(/[0-9]/g, "")}</span>
                </p>
              </div>
              <div className="ps-meta mt-5 border-t border-ivory/15 pt-4">
                <p className="font-display text-lg font-semibold">{s.label}</p>
                <p className="micro mt-1 text-ivory/50">{s.kicker}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
