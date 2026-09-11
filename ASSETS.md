# Asset manifest

No stock or AI-generated imagery is shipped. Every image slot references a
descriptive path under `public/assets/`. Until the real file exists the UI
renders a labelled "Photography · pending" proof-sheet placeholder showing the
filename and the intended shot (`src/components/ui/AssetImage.tsx`), so missing
assets are obvious and never silently blank.

Drop the files below into `public/assets/` (WebP, sRGB, max 2400px on the long
edge, ≤ 350 KB each) and they appear automatically — no code change needed.

## Hero / OG

| Path | Used in | Intended content |
| --- | --- | --- |
| `assets/og-idcard.webp` (1200×630) | `layout.tsx` Open Graph / Twitter | Printed IDCARD ID cards with lanyard on ivory background, wordmark bottom-left |

The hero itself is rendered procedurally (Three.js cards with canvas textures;
CSS fallback), so no hero photo is required.

## Ecosystem (pinned panels)

| Path | Intended content |
| --- | --- |
| `assets/raw-materials.webp` | PVC sheets, clips and lanyard rolls stacked in an IDCARD warehouse |
| `assets/software-platform.webp` | Order / plant management dashboard on a laptop, production floor behind |
| `assets/printing-production.webp` | Finished ID cards being packed, cartons labelled for dispatch |

## Product catalogue (`assets/products/`)

Square-ish product photographs, single product, ivory/paper background, soft
top-left light, slight shadow. One per category:

`id-card-holders`, `id-card-sheets`, `lanyards`, `smart-cards`,
`id-card-accessories`, `metal-plastic`, `pvc-ntr-sheets`, `custom-printed`,
`rfid-nfc`, `clips-reels` (all `.webp`).

## Partnership paths

| Path | Intended content |
| --- | --- |
| `assets/partner-workspace.webp` | Printing vendor at a workstation using the IDCARD app |
| `assets/warehouse.webp` | Raw-material warehouse racks with PVC sheet cartons |
| `assets/production-floor.webp` | Card printers running on a partner production floor |

## Manufacturing story (full-bleed, 16:9 or taller)

| Path | Intended content |
| --- | --- |
| `assets/story-source.webp` | Hands inspecting a stack of PVC sheets |
| `assets/story-print.webp` | ID cards moving through a card printer |
| `assets/story-verify.webp` | Operator checking printed cards against a QC sheet |
| `assets/story-deliver.webp` | Packed cartons of ID cards ready for dispatch |

## Industry solutions (16:9)

| Path | Intended content |
| --- | --- |
| `assets/school-id-cards.webp` | Student ID cards with school lanyards on a desk |
| `assets/event-badges.webp` | Event badges and lanyards at a registration counter |
| `assets/corporate-id-cards.webp` | Employee access cards with RFID reader |

## Partner logos (`assets/logos/partner-01.svg` … `partner-12.svg`)

Monochrome SVG logos of client schools / corporates, ~120×40 viewBox, single
colour `currentColor`. Until supplied, the marquee renders a labelled
"PARTNER 01" wordmark tile. Update `partnerLogos` in `src/lib/content.ts` with
real names for alt text once logos are available.
