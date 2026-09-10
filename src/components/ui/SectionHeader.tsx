import type { ReactNode } from "react";

type Props = {
  label: string;
  index?: string;
  title: string[];
  accentLine?: number;
  sub?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: ReactNode;
};

export function Eyebrow({ label, index, tone = "light" }: { label: string; index?: string; tone?: "light" | "dark" }) {
  return (
    <div className={`micro flex items-center gap-3 ${tone === "dark" ? "text-ivory/60" : "text-graphite"}`}>
      <span className="reg-mark shrink-0">
        <span />
      </span>
      {index && <span className="tabular-nums">{index}</span>}
      <span>{label}</span>
    </div>
  );
}

export function SectionHeader({ label, index, title, accentLine, sub, align = "left", tone = "light", children }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`} data-reveal-group>
      <Eyebrow label={label} index={index} tone={tone} />
      <h2 className={`h-section ${dark ? "text-ivory" : "text-ink"}`} data-split>
        {title.map((line, i) => (
          <span key={line} className={`block ${accentLine === i ? (dark ? "text-coral" : "text-purple") : ""}`}>
            {line}
          </span>
        ))}
      </h2>
      {sub && <p className={`lede max-w-xl ${dark ? "text-ivory/70" : ""}`}>{sub}</p>}
      {children}
    </div>
  );
}
