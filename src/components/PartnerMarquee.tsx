"use client";

import { useEffect, useRef, useState } from "react";
import { partnerLogos } from "@/lib/content";

function LogoMark({ src, alt, i }: { src: string; alt: string; i: number }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, [src]);
  return (
    <li className="group flex h-16 w-40 shrink-0 items-center justify-center px-6 opacity-45 grayscale transition-[opacity,filter] duration-500 hover:opacity-100 hover:grayscale-0">
      {missing ? (
        <span aria-label={alt} role="img" className="flex items-center gap-2 text-ink">
          <span className="grid size-8 place-items-center rounded-full border border-current">
            <span className="size-3 rotate-45 border border-current" />
          </span>
          <span className="micro !tracking-[0.16em]">Partner {String(i + 1).padStart(2, "0")}</span>
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={img} src={src} alt={alt} loading="lazy" onError={() => setMissing(true)} className="max-h-10 w-auto object-contain" />
      )}
    </li>
  );
}

function Row({ dir, offset }: { dir: "left" | "right"; offset: number }) {
  const logos = [...partnerLogos.slice(offset), ...partnerLogos.slice(0, offset)];
  return (
    <div className="group/row relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" data-cursor="drag">
      {[0, 1].map((k) => (
        <ul
          key={k}
          aria-hidden={k === 1}
          className={`flex shrink-0 ${dir === "left" ? "animate-[marquee_70s_linear_infinite]" : "animate-[marquee-r_70s_linear_infinite]"} group-hover/row:[animation-play-state:paused] motion-reduce:animate-none`}
        >
          {logos.map((l, i) => (
            <LogoMark key={`${l.id}-${k}`} src={l.src} alt={l.alt} i={(i + offset) % partnerLogos.length} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function PartnerMarquee() {
  return (
    <section aria-label="Trusted by industry leaders" className="border-b border-line bg-ivory py-12 sm:py-16">
      <div className="container-x mb-8 flex items-center justify-between">
        <p className="micro text-graphite">Trusted by industry leaders</p>
        <p className="micro hidden text-ash sm:block">Schools · Colleges · Corporates · Events</p>
      </div>
      <div className="space-y-4">
        <Row dir="left" offset={0} />
        <Row dir="right" offset={5} />
      </div>
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-100%)}}
        @keyframes marquee-r{from{transform:translateX(-100%)}to{transform:translateX(0)}}
      `}</style>
    </section>
  );
}
