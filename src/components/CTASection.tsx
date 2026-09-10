"use client";

import { cta } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { Button } from "./ui/Button";
import { IDCard } from "./ui/IDCard";

export function CTASection() {
  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll("[data-reveal]"), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: scope, start: "top 70%", once: true } });
    // assembled composition: pieces fly in from edges
    gsap.from(".cta-piece", {
      x: (i) => [180, -160, 120][i % 3],
      y: (i) => [-120, 140, 200][i % 3],
      rotate: (i) => [30, -24, 18][i % 3],
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: scope, start: "top 65%", once: true },
    });
    gsap.to(".cta-piece", {
      y: (i) => [-30, 24, -18][i % 3],
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section id="get-started" ref={scope} className="relative overflow-hidden bg-purple-ink py-24 text-ivory sm:py-32">
      <div aria-hidden className="absolute inset-0 grain-dark" />
      <div aria-hidden className="absolute -left-40 top-1/2 size-[640px] -translate-y-1/2 rounded-full bg-purple/40 blur-[160px]" />
      <div aria-hidden className="crop absolute inset-6 border border-ivory/10 text-ivory/40 sm:inset-10" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p data-reveal className="micro text-ivory/60">
            Get started
          </p>
          <h2 data-reveal className="display mt-6">
            {cta.title[0]}
            <br />
            <span className="text-coral">{cta.title[1]}</span>
          </h2>
          <p data-reveal className="lede mt-6 max-w-lg !text-ivory/75">
            {cta.body}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Button href="#contact" variant="coral" arrow magnetic>
              {cta.primary}
            </Button>
            <Button href="#contact" variant="inverse">
              {cta.secondary}
            </Button>
          </div>
          <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {cta.chips.map((c) => (
              <li key={c} className="micro flex items-center gap-2 text-ivory/70">
                <span className="size-1.5 rounded-full bg-coral" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="relative mx-auto aspect-[4/5] w-full max-w-[420px] preserve-3d" style={{ perspective: "1200px" }}>
          {/* PVC sheet */}
          <div className="cta-piece absolute left-[4%] top-[6%] h-[72%] w-[66%] rounded-md border border-ivory/20 bg-ivory/[0.06] backdrop-blur-[2px]" style={{ transform: "rotate(-6deg)" }}>
            <div className="grid h-full grid-cols-2 gap-[6%] p-[8%]">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="rounded-[4px] border border-dashed border-ivory/25" />
              ))}
            </div>
          </div>
          {/* lanyard */}
          <svg className="cta-piece absolute -right-[6%] top-[-4%] h-[70%] w-[70%]" viewBox="0 0 200 260" fill="none">
            <path d="M40 0 C 40 120, 160 120, 160 0" stroke="#ff7a45" strokeWidth="14" strokeLinecap="round" />
            <path d="M40 0 C 40 120, 160 120, 160 0" stroke="#ffb290" strokeWidth="2" strokeDasharray="6 10" />
            <rect x="92" y="112" width="16" height="22" rx="3" fill="#f6f1e7" />
          </svg>
          {/* card */}
          <div className="cta-piece absolute bottom-[4%] right-[4%] w-[62%] text-[clamp(10px,1.4vw,15px)]" style={{ transform: "rotate(8deg)" }}>
            <IDCard theme="coral" chip role="Partner" name="Your Business" id="IVY-PARTNER" />
          </div>
        </div>
      </div>
    </section>
  );
}
