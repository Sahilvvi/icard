import type { CSSProperties } from "react";

export type CardTheme = "purple" | "charcoal" | "coral" | "ivory";

const themes: Record<CardTheme, { band: string; bg: string; text: string; accent: string }> = {
  purple: { band: "bg-purple", bg: "bg-paper", text: "text-ink", accent: "bg-coral" },
  charcoal: { band: "bg-charcoal", bg: "bg-paper", text: "text-ink", accent: "bg-coral" },
  coral: { band: "bg-coral", bg: "bg-paper", text: "text-ink", accent: "bg-purple" },
  ivory: { band: "bg-cream", bg: "bg-paper", text: "text-ink", accent: "bg-purple" },
};

type Props = {
  theme?: CardTheme;
  org?: string;
  role?: string;
  name?: string;
  id?: string;
  chip?: boolean;
  className?: string;
  style?: CSSProperties;
  landscape?: boolean;
};

/** DOM rendition of a printed 0.76mm PVC card (CR80 proportions). */
export function IDCard({
  theme = "purple",
  org = "IVYPRINTS",
  role = "Student",
  name = "A. Sharma",
  id = "IVY-2026-0418",
  chip = false,
  className = "",
  style,
  landscape = false,
}: Props) {
  const t = themes[theme];
  return (
    <div
      style={style}
      className={`relative overflow-hidden rounded-[10px] ${t.bg} ${t.text} ${landscape ? "aspect-[85.6/54]" : "aspect-[54/85.6]"} shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_20px_40px_-18px_rgba(22,20,26,0.45),0_2px_6px_rgba(22,20,26,0.12)] ${className}`}
    >
      <div className={`${t.band} ${landscape ? "h-[22%]" : "h-[26%]"} flex items-start justify-between p-[7%] text-ivory`}>
        <span className="font-display text-[0.55em] font-bold tracking-[0.12em]">{org}</span>
        <span className="micro !text-[0.4em] opacity-70">{role}</span>
      </div>
      <div className={`flex ${landscape ? "flex-row items-start gap-[6%]" : "flex-col"} p-[7%]`}>
        <div className={`${landscape ? "w-[30%]" : "w-[44%]"} aspect-[3/4] rounded-[4px] bg-cream ring-1 ring-ink/10`} />
        <div className={`${landscape ? "flex-1" : "mt-[8%]"} space-y-[6%]`}>
          <p className="font-display text-[0.7em] font-semibold leading-none">{name}</p>
          <div className="h-[3px] w-[70%] rounded bg-ink/15" />
          <div className="h-[3px] w-[45%] rounded bg-ink/15" />
          <p className="font-mono text-[0.42em] tracking-[0.1em] text-graphite">{id}</p>
        </div>
      </div>
      {chip && <span className="absolute left-[8%] top-[46%] h-[9%] w-[13%] rounded-[3px] bg-[#d6b46a] ring-1 ring-ink/20" />}
      <span className={`absolute bottom-[7%] left-[7%] h-[6%] w-[45%] barcode text-ink/70`} />
      <span className={`absolute bottom-[7%] right-[7%] size-[8%] rounded-full ${t.accent}`} />
      <span className="pointer-events-none absolute inset-0 rounded-[10px] bg-[linear-gradient(115deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0)_62%,rgba(255,255,255,0.18)_100%)]" />
    </div>
  );
}
