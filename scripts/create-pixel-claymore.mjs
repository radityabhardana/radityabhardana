/**
 * scripts/create-pixel-claymore.mjs
 * Generates an authentic, pure pixel-art Dark Souls Claymore Greatsword SVG.
 * Replaces the animated knight avatar in the Character / About Me section.
 * Features:
 * - Iconic Claymore geometry: angled quillons with circular quatrefoils, long two-handed grip, deep central fuller
 * - Cold tempered Damascus steel palette with polished razor highlight edge
 * - Subtle animated steel light gleam & drifting ash embers
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'assets', 'scenes', 'claymore-pixel.svg');

const S = 4; // 1 pixel = 4x4 screen pixels
const COLS = 48; // 192px width
const ROWS = 72; // 288px height
const W = COLS * S;
const H = ROWS * S;

// Palette
const C = {
  abyss: '#070605',
  bgRing: '#1a140e',
  bgRingHi: '#2d2216',

  // Steel
  steelBright: '#ffffff',
  steelEdge: '#dce3ea',
  steelMid: '#8a94a0',
  steelDark: '#444d56',
  steelFuller: '#1f2429',
  steelShadow: '#13171a',

  // Brass / Gold Accents
  goldBright: '#fff5cc',
  goldHi: '#f4a742',
  goldMid: '#c9a876',
  goldDark: '#755831',
  goldShadow: '#3d2c14',

  // Grip leather wrap
  leatherHi: '#5a3d24',
  leatherMid: '#3b2614',
  leatherDark: '#21150a',
  leatherWrap: '#8a623a',

  // Ambient embers
  emberGold: '#f4a742',
  emberWhite: '#fff8db',
};

function generateBackgroundRunes() {
  const rects = [];
  const cx = 24, cy = 38, radius = 20;

  // Delicate decorative pixel ring behind the crossguard & upper blade
  for (let r = cy - radius; r <= cy + radius; r += 2) {
    for (let c = cx - radius; c <= cx + radius; c += 2) {
      const dx = c - cx;
      const dy = r - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (Math.abs(dist - radius) < 1.2) {
        rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.bgRing}"/>`);
      } else if (Math.abs(dist - (radius - 4)) < 1.0 && (c + r) % 4 === 0) {
        rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.bgRingHi}"/>`);
      }
    }
  }
  return rects.join('');
}

function generateClaymore() {
  const rects = [];

  // --- A. POMMEL (Rows 5 to 9, Centered at Col 23-24) ---
  const pommel = [
    // Top pin
    [23, 5, 2, C.goldHi],
    // Main wheel pommel
    [22, 6, 4, C.goldMid], [23, 6, 2, C.goldBright],
    [21, 7, 6, C.steelMid], [22, 7, 2, C.goldHi], [24, 7, 2, C.steelDark],
    [21, 8, 6, C.steelDark], [22, 8, 4, C.goldDark],
    [22, 9, 4, C.goldShadow],
    // Pommel collar
    [23, 10, 2, C.goldMid],
  ];
  for (const [c, r, w, fill] of pommel) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // --- B. TWO-HANDED GRIP (Rows 11 to 21, 3 pixels wide: Cols 23, 24, 25) ---
  for (let r = 11; r <= 21; r++) {
    let wrapColor = C.leatherMid;
    if (r % 2 === 0) wrapColor = C.leatherDark;
    if (r % 4 === 0) wrapColor = C.leatherWrap;

    rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.leatherHi}"/>`);
    rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${wrapColor}"/>`);
    rects.push(`<rect x="${25 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.leatherDark}"/>`);
  }

  // Grip / Crossguard Collar (Row 22)
  rects.push(`<rect x="${22 * S}" y="${22 * S}" width="${4 * S}" height="${S}" fill="${C.goldMid}"/>`);

  // --- C. ICONIC CLAYMORE CROSSGUARD & ANGLED QUILIONS (Rows 23 to 27) ---
  // Splayed forward-swept quillons with decorative quatrefoil ends (Cols 10 to 37)
  const crossguard = [
    // Main horizontal crossbar (Row 23)
    [15, 23, 18, C.steelMid], [22, 23, 4, C.goldHi],
    // Angled forward sweep (Row 24)
    [13, 24, 6, C.steelDark], [19, 24, 10, C.steelMid], [29, 24, 6, C.steelDark],
    // Lower bevel & center shield (Row 25)
    [12, 25, 4, C.steelMid], [23, 25, 2, C.goldBright], [32, 25, 4, C.steelDark],
    // Left Quillon Quatrefoil Finial (Cols 9-12, Rows 24-27)
    [9, 24, 3, C.goldMid], [8, 25, 4, C.goldHi], [9, 26, 3, C.goldDark], [10, 27, 2, C.goldShadow],
    // Right Quillon Quatrefoil Finial (Cols 35-38, Rows 24-27)
    [36, 24, 3, C.goldMid], [36, 25, 4, C.goldHi], [36, 26, 3, C.goldDark], [36, 27, 2, C.goldShadow],
    // Quillon upper ribs
    [16, 22, 4, C.goldMid], [28, 22, 4, C.goldMid],
  ];
  for (const [c, r, w, fill] of crossguard) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // Center Crossguard Diamond Medallion
  rects.push(`<rect x="${23 * S}" y="${23 * S}" width="${2 * S}" height="${2 * S}" fill="${C.goldBright}"/>`);

  // --- D. RICASSO (Rows 26 to 29) ---
  // Unsharpened blade base gripping the guard (Cols 22 to 25)
  for (let r = 26; r <= 29; r++) {
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
    rects.push(`<rect x="${23 * S}" y="${r * S}" width="${2 * S}" height="${S}" fill="${C.steelMid}"/>`);
    rects.push(`<rect x="${25 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);
  }

  // --- E. CLAYMORE GREATSWORD BLADE (Rows 30 to 65) ---
  // 5 pixels wide:
  // - Col 21: Left razor cutting edge (bright white / polished steel)
  // - Col 22: Left primary bevel (light tempered steel)
  // - Col 23: Central fuller left (dark recessed groove)
  // - Col 24: Central fuller right (deep hollow shadow)
  // - Col 25: Right primary bevel (shadowed steel)
  // - Col 26: Right cutting edge (dark steel contour)
  for (let r = 30; r <= 62; r++) {
    // Left razor edge
    rects.push(`<rect class="edge-shimmer" x="${21 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelBright}"/>`);
    // Left bevel
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);

    // Central Fuller (runs down to Row 54)
    if (r <= 54) {
      rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelFuller}"/>`);
    } else {
      // Blade diamond ridge below the fuller
      rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
    }

    // Right bevel
    rects.push(`<rect x="${25 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);
    // Right outer edge
    rects.push(`<rect x="${26 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);
  }

  // --- F. POINTED THRUSTING TIP (Rows 63 to 67) ---
  // Stepped tapering down to a single needle pixel
  // Row 63: 5 pixels (Cols 21-25)
  rects.push(`<rect x="${21 * S}" y="${63 * S}" width="${S}" height="${S}" fill="${C.steelBright}"/>`);
  rects.push(`<rect x="${22 * S}" y="${63 * S}" width="${2 * S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${63 * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);
  rects.push(`<rect x="${25 * S}" y="${63 * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);

  // Row 64: 4 pixels (Cols 22-25)
  rects.push(`<rect x="${22 * S}" y="${64 * S}" width="${S}" height="${S}" fill="${C.steelBright}"/>`);
  rects.push(`<rect x="${23 * S}" y="${64 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${64 * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);
  rects.push(`<rect x="${25 * S}" y="${64 * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);

  // Row 65: 3 pixels (Cols 22-24)
  rects.push(`<rect x="${22 * S}" y="${65 * S}" width="${S}" height="${S}" fill="${C.steelBright}"/>`);
  rects.push(`<rect x="${23 * S}" y="${65 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${65 * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);

  // Row 66: 2 pixels (Cols 23-24)
  rects.push(`<rect x="${23 * S}" y="${66 * S}" width="${S}" height="${S}" fill="${C.steelBright}"/>`);
  rects.push(`<rect x="${24 * S}" y="${66 * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);

  // Row 67: 1 sharp needle point
  rects.push(`<rect x="${23 * S}" y="${67 * S}" width="${S}" height="${S}" fill="${C.steelBright}"/>`);

  return rects.join('');
}

// Drifting ash embers around the Claymore
function generateEmbers() {
  const embers = [
    { cls: 'eb1', col: 18, row: 45, dur: '3.2s', dly: '0s' },
    { cls: 'eb2', col: 28, row: 38, dur: '3.8s', dly: '0.6s' },
    { cls: 'eb3', col: 15, row: 28, dur: '2.9s', dly: '1.2s' },
    { cls: 'eb1', col: 31, row: 52, dur: '3.4s', dly: '1.8s' },
    { cls: 'eb2', col: 20, row: 58, dur: '3.6s', dly: '0.9s' },
  ];
  return embers.map(e =>
    `<rect class="${e.cls}" x="${e.col * S}" y="${e.row * S}" width="${S}" height="${S}" fill="${C.emberGold}" style="animation-duration:${e.dur};animation-delay:${e.dly};"/>`
  ).join('');
}

const css = `
  /* Ambient Shimmer along the polished cutting edge */
  .edge-shimmer {
    animation: sGleam 4.2s ease-in-out infinite;
  }
  @keyframes sGleam {
    0%, 100% { opacity: 0.85; }
    50% { opacity: 1; filter: drop-shadow(0 0 2px #fff5cc); }
  }

  /* Drifting Embers */
  .eb1 { animation: ebFloat1 3.2s step-end infinite; }
  .eb2 { animation: ebFloat2 3.8s step-end infinite; }
  .eb3 { animation: ebFloat3 2.9s step-end infinite; }

  @keyframes ebFloat1 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 0.9; }
    60% { transform: translate(-8px, -28px); opacity: 0.6; }
    100% { transform: translate(-14px, -60px); opacity: 0; }
  }
  @keyframes ebFloat2 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 0.9; }
    60% { transform: translate(8px, -24px); opacity: 0.6; }
    100% { transform: translate(14px, -56px); opacity: 0; }
  }
  @keyframes ebFloat3 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 0.9; }
    60% { transform: translate(-4px, -26px); opacity: 0.6; }
    100% { transform: translate(-8px, -52px); opacity: 0; }
  }
`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Dark Souls — Authentic Pixel Art Claymore Greatsword</title>
  <style><![CDATA[
${css}
  ]]></style>

  <!-- Background decorative ring -->
  ${generateBackgroundRunes()}

  <!-- The Claymore Greatsword -->
  ${generateClaymore()}

  <!-- Drifting Ash Embers -->
  ${generateEmbers()}
</svg>
`;

writeFileSync(OUT_FILE, svgContent, 'utf-8');
console.log('✨ Generated authentic pixel-art claymore-pixel.svg successfully!');
