"use client";

import { useRef, useState, type MouseEvent } from "react";
import { products } from "@/lib/content";
import { gsap, isFinePointer, prefersReducedMotion, useGsap } from "@/lib/motion";
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
      className="pc-card group relative w-[72vw] shrink-0 snap-center sm:w-[380px] lg:w-[min(400px,40vh)] preserve-3d"
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

  const scope = useGsap<HTMLElement>(({ scope, reduced, mm }) => {
    mm.add("(min-width: 1024px)", () => {
      const track = scope.querySelector<HTMLElement>(".pc-track")!;
      const stage = scope.querySelector<HTMLElement>(".pc-stage")!;
      const cards = gsap.utils.toArray<HTMLElement>(".pc-card", scope);
      const getDist = () => track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => `+=${getDist() * 1.1}`,
          pin: stage,
          anticipatePin: 1,
          scrub: reduced ? true : 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(n - 1, Math.round(self.progress * (n - 1)));
            setIdx((c) => (c === i ? c : i));
            if (reduced) return;
            const cx = window.innerWidth / 2;
            cards.forEach((c) => {
              const r = c.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - cx) / window.innerWidth;
              const s = 1 - Math.min(0.12, d * 0.24);
              gsap.set(c, { scale: s, rotateZ: (r.left + r.width / 2 - cx) / window.innerWidth * -1.4 });
            });
          },
        },
      });
      gsap.fromTo(".pc-bar", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: scope, start: "top top", end: () => `+=${getDist() * 1.1}`, scrub: true } });
    });

    mm.add("(max-width: 1023px)", () => {
      const track = scope.querySelector<HTMLElement>(".pc-track")!;
      const onScroll = () => {
        const cards = Array.from(track.children) as HTMLElement[];
        const cx = track.scrollLeft + track.clientWidth / 2;
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
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => track.removeEventListener("scroll", onScroll);
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

  return (
    <section id="products" ref={scope} className="relative bg-ivory">
      <div className="pc-stage relative bg-ivory lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
        <div className="container-x flex flex-col gap-6 pt-20 sm:pt-28 lg:shrink-0 lg:flex-row lg:items-end lg:justify-between lg:pb-4 lg:pt-24">
          <SectionHeader label={products.label} index="03" title={products.title} accentLine={1} sub={products.sub} />
          <div className="micro flex items-center gap-4 text-graphite">
            <span className="text-ink tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
            <span className="relative h-px w-28 bg-line">
              <span className="pc-bar absolute inset-0 origin-left bg-coral lg:block" style={{ transform: `scaleX(${(idx + 1) / n})` }} />
            </span>
            <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
            <span className="hidden lg:inline">Products</span>
          </div>
        </div>

        <div
          data-cursor="drag"
          className="pc-track no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-14 sm:gap-7 sm:px-8 lg:mt-0 lg:min-h-0 lg:flex-1 lg:items-center lg:overflow-visible lg:px-14 lg:pb-0 xl:px-20"
          style={{ perspective: "1200px" }}
        >
          {products.items.map((p, i) => (
            <ProductCard key={p.id} item={p} index={i} />
          ))}
          <div className="w-[14vw] shrink-0 lg:w-[30vw]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
