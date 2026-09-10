"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { SectionHeader } from "./ui/SectionHeader";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll(".faq-item"), { y: 24, autoAlpha: 0, stagger: 0.07, duration: 0.9, scrollTrigger: { trigger: scope, start: "top 75%", once: true } });
  }, []);

  return (
    <section id="faq" ref={scope} className="bg-ivory py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
        <SectionHeader label="FAQs" index="10" title={["Frequently Asked", "Questions"]} accentLine={1} sub="Answers to the most common questions about our B2B printing ecosystem." />

        <ul className="border-t border-line">
          {faqs.map((f, i) => {
            const on = open === i;
            const bid = `${base}-b-${i}`;
            const pid = `${base}-p-${i}`;
            return (
              <li key={f.q} className="faq-item border-b border-line">
                <h3>
                  <button
                    id={bid}
                    type="button"
                    aria-expanded={on}
                    aria-controls={pid}
                    onClick={() => setOpen(on ? null : i)}
                    data-cursor="button"
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex gap-5">
                      <span className="micro mt-1.5 text-ash">0{i + 1}</span>
                      <span className={`font-display text-lg font-semibold tracking-[-0.02em] transition-colors sm:text-xl ${on ? "text-purple" : "text-ink group-hover:text-purple"}`}>{f.q}</span>
                    </span>
                    <span aria-hidden className="relative mt-1 size-6 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
                      <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${on ? "scale-y-0" : "scale-y-100"}`} />
                    </span>
                  </button>
                </h3>
                <div id={pid} role="region" aria-labelledby={bid} className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="pb-7 pl-[calc(1.25rem+1.5ch)] pr-12 text-[15px] leading-relaxed text-graphite">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
