"use client";

import { useRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

type Variant = "primary" | "ghost" | "inverse" | "coral";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
};

const styles: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-charcoal",
  coral: "bg-coral text-ink hover:bg-coral-deep",
  ghost: "bg-transparent text-ink border border-ink/25 hover:border-ink",
  inverse: "bg-ivory text-ink hover:bg-paper",
};

export function Button({ variant = "primary", arrow = true, magnetic = true, className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !isFinePointer() || prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    gsap.to(ref.current, { x, y, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <a
      ref={ref}
      data-cursor="button"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative inline-flex h-12 sm:h-13 items-center gap-3 rounded-full px-6 sm:px-7 text-[13px] font-semibold uppercase tracking-[0.12em] transition-[background-color,border-color,transform] duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 will-change-transform ${styles[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
        >
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}
