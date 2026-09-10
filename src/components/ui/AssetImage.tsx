"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders a real asset from /public/assets when present. Until the photography
 * is supplied, the file 404s and we fall back to a clearly-labelled physical
 * "proof sheet" placeholder that names the file and describes the intended shot
 * (see ASSETS.md).
 */
export function AssetImage({ src, alt, className = "", tone = "light", priority = false, sizes = "100vw" }: Props) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const file = src.split("/").pop();

  // The 404 can fire before hydration attaches onError; re-check once mounted.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, [src]);

  if (missing) {
    const dark = tone === "dark";
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grain relative flex h-full w-full items-end overflow-hidden ${dark ? "bg-charcoal text-ivory grain-dark" : "bg-cream text-ink"} ${className}`}
      >
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, transparent 0 22px, ${dark ? "rgba(255,255,255,0.07)" : "rgba(22,20,26,0.07)"} 22px 23px)`,
          }}
        />
        <span className="reg-mark absolute left-4 top-4 opacity-60">
          <span />
        </span>
        <span className="reg-mark absolute right-4 top-4 opacity-60">
          <span />
        </span>
        <div className="relative z-10 w-full p-4 sm:p-5">
          <p className="micro opacity-60">Photography · pending</p>
          <p className="mt-1 font-mono text-[11px] sm:text-xs break-all opacity-90">{file}</p>
          <p className="mt-2 max-w-md text-[12px] sm:text-[13px] leading-snug opacity-75">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={img}
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setMissing(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
