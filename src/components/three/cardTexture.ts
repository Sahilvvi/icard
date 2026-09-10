import * as THREE from "three";

export type CardPalette = { band: string; accent: string; label: string; name: string; role: string };

export const PALETTES: Record<string, CardPalette> = {
  purple: { band: "#5b3fd1", accent: "#ff7a45", label: "IVYPRINTS", name: "A. SHARMA", role: "STUDENT" },
  charcoal: { band: "#232028", accent: "#ff7a45", label: "IVYPRINTS", name: "R. MEHTA", role: "STAFF" },
  coral: { band: "#ff7a45", accent: "#5b3fd1", label: "IVYPRINTS", name: "DELEGATE", role: "EVENT" },
  ivory: { band: "#efe7d8", accent: "#5b3fd1", label: "IVYPRINTS", name: "VISITOR", role: "PASS" },
};

/** Paints a CR80 card face onto a canvas and returns it as a texture. */
export function makeCardTexture(p: CardPalette, chip = false): THREE.CanvasTexture {
  const w = 512;
  const h = 810;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#fbf8f2";
  ctx.fillRect(0, 0, w, h);

  // header band
  ctx.fillStyle = p.band;
  ctx.fillRect(0, 0, w, h * 0.26);
  ctx.fillStyle = p.band === "#efe7d8" ? "#16141a" : "#f6f1e7";
  ctx.font = "bold 30px Archivo, Inter, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(p.label.split("").join("\u200A"), 40, 44);
  ctx.font = "500 18px 'IBM Plex Mono', monospace";
  ctx.globalAlpha = 0.75;
  ctx.fillText(p.role, w - 40 - ctx.measureText(p.role).width, 50);
  ctx.globalAlpha = 1;

  // photo box
  ctx.fillStyle = "#efe7d8";
  roundRect(ctx, 40, h * 0.26 + 48, 200, 260, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(22,20,26,0.12)";
  ctx.lineWidth = 2;
  roundRect(ctx, 40, h * 0.26 + 48, 200, 260, 8);
  ctx.stroke();

  // name + lines
  ctx.fillStyle = "#16141a";
  ctx.font = "600 34px Archivo, Inter, sans-serif";
  ctx.fillText(p.name, 40, h * 0.26 + 340);
  ctx.fillStyle = "rgba(22,20,26,0.16)";
  roundRect(ctx, 40, h * 0.26 + 396, 300, 8, 4);
  ctx.fill();
  roundRect(ctx, 40, h * 0.26 + 420, 200, 8, 4);
  ctx.fill();
  ctx.fillStyle = "#4b4750";
  ctx.font = "400 20px 'IBM Plex Mono', monospace";
  ctx.fillText("IVY-2026-0418", 40, h * 0.26 + 452);

  // barcode
  ctx.fillStyle = "rgba(22,20,26,0.75)";
  let x = 40;
  const widths = [2, 4, 2, 6, 2, 2, 4, 2, 6, 2, 4, 2, 2, 6, 2, 4, 2, 2, 4, 6, 2, 2, 4, 2, 6, 2, 4];
  for (let i = 0; i < widths.length; i++) {
    if (i % 2 === 0) ctx.fillRect(x, h - 100, widths[i] * 1.6, 44);
    x += widths[i] * 1.6 + 3;
  }

  // accent dot
  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.arc(w - 64, h - 78, 22, 0, Math.PI * 2);
  ctx.fill();

  if (chip) {
    ctx.fillStyle = "#d6b46a";
    roundRect(ctx, 40, h * 0.26 + 120, 70, 54, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(22,20,26,0.35)";
    ctx.lineWidth = 1.5;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(40, h * 0.26 + 120 + (54 / 3) * i);
      ctx.lineTo(110, h * 0.26 + 120 + (54 / 3) * i);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(75, h * 0.26 + 120);
    ctx.lineTo(75, h * 0.26 + 174);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
