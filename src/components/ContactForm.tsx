"use client";

import { useState, type FormEvent } from "react";
import { contact, site } from "@/lib/content";
import { gsap, useGsap } from "@/lib/motion";
import { SectionHeader } from "./ui/SectionHeader";

type Status = "idle" | "sending" | "sent";

function Field({ id, label, type = "text", required, as }: { id: string; label: string; type?: string; required?: boolean; as?: "textarea" }) {
  const cls =
    "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-6 text-[15px] text-ink outline-none transition-colors placeholder-transparent focus:border-ink";
  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea id={id} name={id} rows={4} required={required} placeholder={label} className={`${cls} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} required={required} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-[15px] text-ash transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-purple peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]"
      >
        {label}
        {required ? <span className="text-coral"> *</span> : null}
      </label>
      <span aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-purple transition-transform duration-500 ease-[var(--ease-out-expo)] peer-focus:scale-x-100" />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState<"printing" | "software">("printing");

  const scope = useGsap<HTMLElement>(({ scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope.querySelectorAll(".cf-row"), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: scope, start: "top 70%", once: true } });
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // No backend is wired yet: simulate the request so the success state is demonstrable.
    window.setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <section id="contact" ref={scope} className="relative border-t border-line bg-cream py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
        <div>
          <SectionHeader label={contact.label} index="11" title={contact.title} accentLine={1} sub={contact.body} />
          <dl className="mt-12 space-y-8">
            <div>
              <dt className="micro text-ash">Phone</dt>
              <dd className="mt-2">
                <a href={site.phoneHref} className="link-line font-display text-2xl font-semibold tracking-[-0.02em]" data-cursor="button">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="micro text-ash">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="link-line font-display text-2xl font-semibold tracking-[-0.02em]" data-cursor="button">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="micro text-ash">Office</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-graphite">
                {site.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-2 block text-ink">{site.location}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="card-surface relative !rounded-2xl p-6 sm:p-10" aria-live="polite">
          {status === "sent" ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center">
              <span className="reg-mark text-coral">
                <span />
              </span>
              <p className="micro mt-8 text-ash">Inquiry received</p>
              <h3 className="h-sub mt-3">Thank you. We&apos;ll be in touch shortly.</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-graphite">
                Our team reviews every inquiry and typically responds within one business day. For urgent requirements call {site.phone}.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="link-line micro mt-8" data-cursor="button">
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false} className="space-y-8">
              <div className="cf-row grid gap-8 sm:grid-cols-2">
                <Field id="company" label="Company / Institution" required />
                <Field id="city" label="City" required />
              </div>
              <div className="cf-row grid gap-8 sm:grid-cols-2">
                <Field id="email" label="Email" type="email" required />
                <Field id="phone" label="Phone" type="tel" required />
              </div>

              <fieldset className="cf-row">
                <legend className="micro text-ash">I&apos;m interested in</legend>
                <div className="mt-3 inline-flex rounded-full border border-line p-1">
                  {(["printing", "software"] as const).map((t) => (
                    <label key={t} className="relative cursor-pointer" data-cursor="button">
                      <input type="radio" name="interest" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                      <span className="block rounded-full px-5 py-2 text-[13px] font-semibold capitalize transition-colors peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-purple">
                        {t === "printing" ? "Printing services" : "Software platform"}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="cf-row relative">
                <label htmlFor="product" className="micro text-ash">
                  Product
                </label>
                <select id="product" name="product" defaultValue="" className="mt-3 w-full appearance-none border-b border-line bg-transparent pb-3 text-[15px] outline-none focus:border-ink" data-cursor="button">
                  <option value="" disabled>
                    Select a product
                  </option>
                  {contact.productOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute bottom-4 right-0 text-ash">
                  ↓
                </span>
              </div>

              <div className="cf-row">
                <Field id="message" label="Tell us about your requirement (quantities, deadlines, cities)" as="textarea" required />
              </div>

              <div className="cf-row flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-[12px] text-ash">We respond within one business day.</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor="button"
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-[14px] font-semibold text-ivory transition-[background-color,transform] hover:bg-purple disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Inquiry"}
                  <span aria-hidden className={status === "sending" ? "animate-spin" : ""}>
                    {status === "sending" ? "◌" : "→"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
