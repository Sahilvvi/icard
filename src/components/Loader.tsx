"use client";

import { useEffect, useState } from "react";
import { gsap, prefersReducedMotion, useClientValue, useGsap } from "@/lib/motion";

const SESSION_KEY = "idcard-loaded";
const readSkip = () => prefersReducedMotion() || sessionStorage.getItem(SESSION_KEY) !== null;

/**
 * 1.4s intro: registration marks + thin rules assemble into the wordmark, the
 * wordmark compresses to a point, the curtain lifts. Skipped on repeat visits
 * within the session and under prefers-reduced-motion.
 */
export function Loader() {
  const skip = useClientValue(readSkip, false);
  const [done, setDone] = useState(false);
  const show = !skip && !done;

  useEffect(() => {
    if (skip) document.documentElement.classList.add("is-loaded");
  }, [skip]);

  const scope = useGsap<HTMLDivElement>(
    ({ scope, reduced }) => {
      if (!show || reduced) return;
      document.documentElement.classList.add("lenis-stopped");
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "1");
          document.documentElement.classList.remove("lenis-stopped");
          document.documentElement.classList.add("is-loaded");
          setDone(true);
        },
      });
      tl.fromTo(".ld-h", { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.05 }, 0)
        .fromTo(".ld-v", { scaleY: 0 }, { scaleY: 1, duration: 0.7, stagger: 0.05 }, 0.05)
        .fromTo(".ld-mark", { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.06 }, 0.3)
        .fromTo(".ld-letter", { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.035 }, 0.45)
        .to(".ld-word", { scaleX: 0.02, scaleY: 0.6, duration: 0.55, ease: "power4.in" }, 1.35)
        .to([".ld-h", ".ld-v", ".ld-mark"], { autoAlpha: 0, duration: 0.3 }, 1.35)
        .to(scope, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.75);
    },
    [show],
  );

  if (!show) return null;

  return (
    <div ref={scope} aria-hidden className="fixed inset-0 z-[100] grain grain-dark bg-ink text-ivory" style={{ willChange: "transform" }}>
      <div className="ld-h absolute left-0 right-0 top-[18%] h-px origin-left bg-ivory/25" />
      <div className="ld-h absolute left-0 right-0 bottom-[18%] h-px origin-right bg-ivory/25" />
      <div className="ld-v absolute top-0 bottom-0 left-[10%] w-px origin-top bg-ivory/25" />
      <div className="ld-v absolute top-0 bottom-0 right-[10%] w-px origin-bottom bg-ivory/25" />
      {[
        "left-[10%] top-[18%]",
        "right-[10%] top-[18%]",
        "left-[10%] bottom-[18%]",
        "right-[10%] bottom-[18%]",
      ].map((pos) => (
        <span key={pos} className={`ld-mark reg-mark absolute ${pos} -translate-x-1/2 -translate-y-1/2 text-coral`}>
          <span />
        </span>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="ld-word flex overflow-hidden font-display text-[12vw] sm:text-[8vw] font-bold leading-none tracking-[-0.04em]">
          {"IDCARD".split("").map((l, i) => (
            <span key={i} className="ld-letter inline-block">
              {l}
            </span>
          ))}
        </div>
      </div>
      <p className="micro absolute bottom-[calc(18%+1rem)] left-1/2 -translate-x-1/2 text-ivory/50">Printing at scale</p>
    </div>
  );
}
