"use client";

import { useRef, useState, type MouseEvent } from "react";
import { products } from "@/lib/content";
import { gsap, isFinePointer, prefersReducedMotion, ScrollTrigger, useGsap } from "@/lib/motion";
import { AssetImage } from "./ui/AssetImage";
import { SectionHeader } from "./ui/SectionHeader";

function ProductCard({ item, index }: { item: (typeof products.items)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: MouseEvent) => {
    if (!isFinePointer() || prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * 10, rotateX: -py * 8, duration: 0.6, ease: "power3.out", transformPerspective: 900 });
  };
  const onLeave = () => ref.current && gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "expo.out" });

  return (
    <article
      ref={ref}
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="pc-card group relative w-[72vw] shrink-0 snap-center sm:w-[340px] lg:w-[380px] preserve-3d"
    >
      <div className="card-surface crop relative overflow-hidden text-ink transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-24px_rgba(22,20,26,0.45)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
            <AssetImage src={item.asset} alt={`${item.name} — product photograph`} />
          </div>
          <span className="micro absolute left-4 top-4 rounded-full bg-paper/90 px-2.5 py-1 text-graphite">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-end justify-between gap-4 border-t border-line/70 p-5">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.name}</h3>
            <p className="micro mt-1.5 text-ash">{item.spec}</p>
          </div>
          <span className="barcode h-6 w-14 text-ink/60" aria-hidden />
        </div>
      </div>
    </article>
  );
}

export function ProductCarousel() {
  const [idx, setIdx] = useState(0);
  const n = products.items.length;

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    const track = scope.querySelector<HTMLElement>(".pc-track")!;
    const viewport = scope.querySelector<HTMLElement>(".pc-viewport")!;

    if (reduced) {
      const onScroll = () => {
        const cards = gsap.utils.toArray<HTMLElement>(".pc-card", track).slice(0, n);
        const cx = viewport.scrollLeft + viewport.clientWidth / 2;
        let best = 0;
        let bd = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - cx);
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        setIdx(best);
      };
      viewport.addEventListener("scroll", onScroll, { passive: true });
      return () => viewport.removeEventListener("scroll", onScroll);
    }

    const loop = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: n * 4.5,
      repeat: -1,
      onUpdate: () => {
        const i = Math.floor(loop.progress() * n) % n;
        setIdx((c) => (c === i ? c : i));
      },
    });

    const slow = () => gsap.to(loop, { timeScale: 0, duration: 0.6, overwrite: true });
    const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
    viewport.addEventListener("pointerenter", slow);
    viewport.addEventListener("pointerleave", resume);
    viewport.addEventListener("focusin", slow);
    viewport.addEventListener("focusout", resume);

    ScrollTrigger.create({
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
    });

    gsap.from(scope.querySelectorAll("[data-reveal-group] > *"), {
      y: 30,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 1,
      scrollTrigger: { trigger: scope, start: "top 75%", once: true },
    });

    return () => {
      viewport.removeEventListener("pointerenter", slow);
      viewport.removeEventListener("pointerleave", resume);
      viewport.removeEventListener("focusin", slow);
      viewport.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <section id="products" ref={scope} className="relative overflow-hidden bg-ivory pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pt-24">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader label={products.label} index="03" title={products.title} accentLine={1} sub={products.sub} />
        <div className="micro flex items-center gap-4 text-graphite">
          <span className="text-ink tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
          <span className="relative h-px w-28 bg-line">
            <span className="pc-bar absolute inset-0 origin-left bg-coral transition-transform duration-500" style={{ transform: `scaleX(${(idx + 1) / n})` }} />
          </span>
          <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
          <span className="hidden lg:inline">Products</span>
        </div>
      </div>

      <div
        data-cursor="view"
        className="pc-viewport no-scrollbar mt-10 overflow-hidden motion-reduce:overflow-x-auto sm:mt-14"
        style={{ perspective: "1200px" }}
        aria-roledescription="carousel"
        aria-label="Products"
      >
        <div className="pc-track flex w-max motion-reduce:px-5 motion-reduce:sm:px-8">
          {[0, 1].map((copy) => (
            <div key={copy} className={copy ? "flex gap-5 pr-5 sm:gap-7 sm:pr-7 motion-reduce:hidden" : "flex gap-5 pr-5 sm:gap-7 sm:pr-7"} aria-hidden={copy === 1}>
              {products.items.map((p, i) => (
                <ProductCard key={p.id} item={p} index={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
