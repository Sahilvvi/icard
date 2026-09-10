"use client";

import { useRef, useState, type MouseEvent } from "react";
import { idCardFeatures } from "@/lib/content";
import { gsap, isFinePointer, prefersReducedMotion, useGsap } from "@/lib/motion";
import { IDCard, type CardTheme } from "./ui/IDCard";
import { Eyebrow } from "./ui/SectionHeader";

type FeatureId = (typeof idCardFeatures)[number]["id"];

// camera targets per feature: where the "lens" moves and how far it zooms
const FOCUS: Record<FeatureId, { x: number; y: number; scale: number; rotY: number }> = {
  rfid: { x: 22, y: 6, scale: 1.55, rotY: -18 },
  security: { x: -20, y: 34, scale: 1.45, rotY: 14 },
  design: { x: 0, y: 30, scale: 1.3, rotY: 0 },
  pvc: { x: -6, y: 0, scale: 1.4, rotY: 62 },
  nfc: { x: 14, y: -26, scale: 1.5, rotY: -10 },
  lanyard: { x: 0, y: 46, scale: 1.35, rotY: 6 },
};

export function IDCardExperience() {
  const [active, setActive] = useState<FeatureId | null>(null);
  const [theme, setTheme] = useState<CardTheme>("purple");
  const card = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll("[data-reveal]"), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: scope, start: "top 75%", once: true } });
    gsap.from(".ide-card", { y: 80, rotateX: 18, autoAlpha: 0, duration: 1.4, scrollTrigger: { trigger: scope, start: "top 70%", once: true } });
    gsap.from(".ide-label", { scale: 0.8, autoAlpha: 0, stagger: 0.06, duration: 0.8, delay: 0.4, ease: "back.out(1.6)", scrollTrigger: { trigger: scope, start: "top 70%", once: true } });
  }, []);

  const focus = (id: FeatureId | null) => {
    setActive(id);
    if (!card.current) return;
    const f = id ? FOCUS[id] : { x: 0, y: 0, scale: 1, rotY: 0 };
    gsap.to(card.current, { xPercent: f.x, yPercent: f.y, scale: f.scale, rotateY: f.rotY, rotateX: 0, duration: prefersReducedMotion() ? 0 : 1.1, ease: "expo.out", overwrite: "auto" });
    if (id === "design") {
      setTheme((t) => (t === "purple" ? "charcoal" : t === "charcoal" ? "coral" : "purple"));
    }
  };

  const onMove = (e: MouseEvent) => {
    if (active || !isFinePointer() || prefersReducedMotion() || !stage.current || !card.current) return;
    const r = stage.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card.current, { rotateY: px * 22, rotateX: -py * 16, duration: 0.8, ease: "power3.out" });
  };
  const onLeave = () => {
    if (active || !card.current) return;
    gsap.to(card.current, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "expo.out" });
  };

  const current = idCardFeatures.find((f) => f.id === active);

  return (
    <section ref={scope} className="relative overflow-hidden border-y border-line bg-cream py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-center">
        <div>
          <div data-reveal>
            <Eyebrow label="Anatomy of a card" index="08" />
          </div>
          <h2 data-reveal className="h-section mt-6">
            One card.
            <br />
            <span className="text-purple">Every layer</span> handled.
          </h2>
          <p data-reveal className="lede mt-6 max-w-md">
            Move across the card to inspect it. Select a feature to look closer at the material, the data layer and the finish.
          </p>

          <div data-reveal className="mt-8 min-h-[120px] rounded-2xl border border-line bg-paper p-5" aria-live="polite">
            {current ? (
              <>
                <p className="micro text-coral">{current.label}</p>
                <p className="mt-2 font-display text-xl font-semibold">{current.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-graphite">{current.body}</p>
                <button type="button" onClick={() => focus(null)} className="link-line micro mt-4 text-ink" data-cursor="button">
                  Reset view
                </button>
              </>
            ) : (
              <>
                <p className="micro text-ash">Select a feature</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {idCardFeatures.map((f) => (
                    <li key={f.id}>
                      <button type="button" onClick={() => focus(f.id)} data-cursor="button" className="rounded-full border border-line px-3 py-1.5 text-[12px] font-medium transition-colors hover:border-ink">
                        {f.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div ref={stage} onMouseMove={onMove} onMouseLeave={onLeave} className="relative mx-auto aspect-square w-full max-w-[560px]" style={{ perspective: "1400px" }}>
          {/* backdrop: PVC sheet with crop marks */}
          <div aria-hidden className="crop absolute inset-[8%] rounded-[18px] border border-ink/10 bg-paper/60 text-ink" />
          <div aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="size-[58%] rounded-full border border-dashed border-ink/10" />
          </div>

          <div className="ide-card absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 preserve-3d">
            <div ref={card} className="relative preserve-3d text-[clamp(11px,1.6vw,17px)]" style={{ willChange: "transform" }}>
              <IDCard theme={theme} chip name="A. Sharma" role="Student" />
              {/* card edge to show thickness when rotated */}
              <span aria-hidden className="absolute right-0 top-[2%] h-[96%] w-[6px] origin-right rounded-r bg-ivory shadow-[inset_-1px_0_0_rgba(22,20,26,0.15)]" style={{ transform: "rotateY(90deg) translateX(6px)" }} />
              {/* RFID overlay */}
              <div className={`pointer-events-none absolute inset-0 rounded-[10px] transition-opacity duration-500 ${active === "rfid" || active === "nfc" ? "opacity-100" : "opacity-0"}`}>
                <svg viewBox="0 0 54 85.6" className="h-full w-full" aria-hidden>
                  <rect x="5" y="5" width="44" height="75.6" rx="3" fill="none" stroke="#5b3fd1" strokeWidth="0.6" strokeDasharray="1.5 1" />
                  <rect x="7.5" y="7.5" width="39" height="70.6" rx="2.5" fill="none" stroke="#5b3fd1" strokeWidth="0.6" strokeDasharray="1.5 1" />
                  <rect x="10" y="10" width="34" height="65.6" rx="2" fill="none" stroke="#5b3fd1" strokeWidth="0.6" strokeDasharray="1.5 1" />
                  <rect x="6" y="39" width="8" height="6" rx="1" fill="#5b3fd1" opacity="0.9" />
                  <rect x="0" y="0" width="54" height="85.6" rx="4" fill="#5b3fd1" opacity="0.08" />
                </svg>
              </div>
              {/* Security overlay */}
              <div className={`pointer-events-none absolute inset-0 rounded-[10px] bg-[repeating-linear-gradient(45deg,rgba(91,63,209,0.18)_0_2px,transparent_2px_8px)] transition-opacity duration-500 ${active === "security" ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>

          {/* floating labels */}
          {idCardFeatures.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => focus(active === f.id ? null : f.id)}
              aria-pressed={active === f.id}
              data-cursor="button"
              className={`ide-label absolute flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform] duration-500 hover:-translate-y-0.5 ${
                active === f.id ? "border-coral bg-coral text-ink" : "border-ink/20 bg-paper/90 text-ink backdrop-blur"
              }`}
              style={{ left: `${50 + f.pos.x * 34}%`, top: `${50 + f.pos.y * 38}%`, transform: "translate(-50%,-50%)" }}
            >
              <span className={`size-1.5 rounded-full ${active === f.id ? "bg-ink" : "bg-coral"}`} />
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
