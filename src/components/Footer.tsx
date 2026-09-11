import { footer, site } from "@/lib/content";
import { Logo } from "./Navbar";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-purple-ink text-ivory">
      <div aria-hidden className="absolute inset-0 grain-dark" />
      <div className="container-x relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ivory/70">{footer.blurb}</p>
            <div className="mt-8 space-y-3 text-[14px]">
              <a href={site.phoneHref} className="link-line block w-fit" data-cursor="button">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="link-line block w-fit" data-cursor="button">
                {site.email}
              </a>
              <address className="not-italic text-ivory/60">
                {site.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>

            {/* map treatment: stylised India location grid */}
            <div aria-label="Map: New Delhi, India" className="mt-8 grid-bg relative h-32 w-full max-w-sm overflow-hidden rounded-lg border border-ivory/15 opacity-90 [--grid-color:rgba(246,241,231,0.08)]">
              <span className="absolute left-[36%] top-[44%] size-2.5 rounded-full bg-coral shadow-[0_0_0_8px_rgba(255,122,69,0.2)]" />
              <span className="absolute left-[36%] top-[44%] size-2.5 animate-ping rounded-full bg-coral opacity-60" />
              <span className="micro absolute bottom-3 left-3 text-ivory/60">New Delhi · 28.6°N 77.2°E</span>
              <span className="micro absolute right-3 top-3 text-ivory/40">{site.location}</span>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="micro text-coral">{col.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#products" className="text-[13.5px] text-ivory/75 transition-colors hover:text-ivory" data-cursor="button">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-[12px] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-ivory" data-cursor="button">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="transition-colors hover:text-ivory" data-cursor="button">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none px-4 pb-2 text-center font-display text-[16vw] font-bold leading-[0.8] tracking-[-0.06em] text-ivory/[0.05]">
        IDCARD
      </p>
    </footer>
  );
}
