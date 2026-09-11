# IDCARD — website

Marketing site for IDCARD, "India's Fastest ID Card Printing & B2B Printing
Ecosystem". Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
GSAP + ScrollTrigger · Lenis · React Three Fiber.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Structure

```
src/
  app/            layout (fonts, metadata, JSON-LD), page (section order), globals.css (design tokens)
  lib/content.ts  ALL copy, numbers and asset paths (from the IDCARD reference PDF)
  lib/motion.ts   GSAP registration, useGsap scoped hook, reduced-motion / pointer helpers
  components/     one file per section, ui/ primitives, three/ hero scene
```

Content lives only in `src/lib/content.ts`; components are presentation.
Missing photography is documented in [ASSETS.md](./ASSETS.md) and rendered as
labelled placeholders until supplied.

## Motion system

All animation goes through `useGsap()` (`src/lib/motion.ts`), which scopes a
`gsap.context`, exposes a `gsap.matchMedia` instance and a `reduced` flag, and
reverts everything on unmount. Lenis drives smooth scroll and feeds
`ScrollTrigger.update`.

| Section | Desktop | Mobile / reduced motion |
| --- | --- | --- |
| Loader | Registration lines + wordmark assemble, compress, curtain lifts (~2.6s, once per session) | Skipped |
| Hero | R3F scene: cards assemble from off-screen, float, react to pointer, separate on scroll | CSS card stack with light parallax; no WebGL |
| Trust metrics | Count-up on enter | Static values |
| Marquee | Two rows, opposite directions, hover pauses | Same (CSS) |
| Ecosystem | Stage pinned for 3.4 viewports; panels wipe in via `clip-path`, section colour shifts | Stacked, fade-in |
| Products | Pinned; vertical scroll → horizontal track, centre card scales, hover tilt | Native horizontal swipe |
| 3D carousel | DOM `preserve-3d` ring, arrows / keyboard / dots | Same |
| Partnership | Tabs; panel clip-path + scale transition | Same, tabs scroll horizontally |
| Story | Sticky viewport, images wipe as steps advance | Same (sticky is cheap) |
| Industries | Tabs; image wipe, staggered stats | Same |
| Card anatomy | Pointer tilt; feature focus moves "camera" (translate/scale/rotateY) and shows layer overlays | Tap labels; no tilt |
| Proof stats | Masked number reveal, scanning line, drifting grid | Static |
| CTA | Materials fly in and assemble, light scroll parallax | Fade-in |
| FAQ | Grid-row height accordion, plus→minus | Same |

Custom cursor (`data-cursor="button|view|drag"`) and magnetic buttons are
enabled only for fine pointers without `prefers-reduced-motion`.

## Contact form

Client-side only for now: the submit handler simulates a request and shows the
success state. Wire `onSubmit` in `src/components/ContactForm.tsx` to an API
route / CRM when ready.
