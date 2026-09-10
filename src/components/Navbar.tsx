"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { getLenis } from "./SmoothScroll";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="IvyPrints home" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[6px] bg-purple text-ivory">
        <span className="absolute inset-[3px] rounded-[3px] border border-ivory/40" />
        <span className="absolute left-[7px] top-[8px] h-[3px] w-[10px] rounded-sm bg-coral" />
        <span className="absolute bottom-[7px] left-[7px] h-px w-[14px] bg-ivory/70" />
        <span className="absolute bottom-[10px] left-[7px] h-px w-[9px] bg-ivory/70" />
      </span>
      <span className="font-display text-[15px] font-bold tracking-[0.08em]">IVYPRINTS</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.classList.add("lenis-stopped");
    } else {
      lenis?.start();
      document.documentElement.classList.remove("lenis-stopped");
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const menu = useGsap<HTMLDivElement>(
    ({ scope, reduced }) => {
      if (!open) return;
      if (reduced) {
        gsap.set(scope, { autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(scope, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" })
        .from(".mn-link", { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.35)
        .from(".mn-meta", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0.7);
    },
    [open],
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] ${
          scrolled ? "bg-ivory/80 shadow-[0_1px_0_rgba(22,20,26,0.08)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-20 sm:h-24"}`}>
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="link-line text-[13px] font-medium tracking-[0.02em] text-graphite hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="micro hidden text-graphite xl:block hover:text-ink">
              {site.phone}
            </a>
            <a
              href="#contact"
              data-cursor="button"
              className={`hidden items-center gap-2 rounded-full px-5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-[background-color,height] duration-500 sm:inline-flex ${
                scrolled ? "h-10 bg-ink text-ivory hover:bg-charcoal" : "h-11 bg-ink text-ivory hover:bg-charcoal"
              }`}
            >
              Get Started
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-11 place-items-center rounded-full border border-ink/15 lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-[var(--ease-in-out-quart)] ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-[var(--ease-in-out-quart)] ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menu}
          className="grain grain-dark fixed inset-0 z-[55] flex flex-col bg-ink text-ivory"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-32">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {nav.map((n, i) => (
                <div key={n.label} className="overflow-hidden border-b border-ivory/10 py-3">
                  <a href={n.href} onClick={() => setOpen(false)} className="mn-link flex items-baseline gap-4 font-display text-[11vw] font-bold leading-none tracking-[-0.03em] sm:text-6xl">
                    <span className="micro w-8 text-coral">0{i + 1}</span>
                    {n.label}
                  </a>
                </div>
              ))}
            </nav>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="mn-meta">
                <p className="micro text-ivory/50">Call</p>
                <a href={site.phoneHref} className="mt-1 block text-lg">
                  {site.phone}
                </a>
              </div>
              <div className="mn-meta">
                <p className="micro text-ivory/50">Email</p>
                <a href={`mailto:${site.email}`} className="mt-1 block text-lg">
                  {site.email}
                </a>
              </div>
              <a href="#contact" onClick={() => setOpen(false)} className="mn-meta inline-flex h-12 w-fit items-center rounded-full bg-coral px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
