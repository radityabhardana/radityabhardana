/**
 * scripts/create-pixel-claymore.mjs
 * Generates an elongated, towering Greatsword version of the Refined Claymore +10:
 * - Truly elongated Greatsword blade proportion (ROWS increased from 74 to 96)
 * - Extended fuller featuring 10 ancient glowing Sunlight/Astora runes
 * - Longer razor-sharp Damascus cutting edges with animated light shimmer
 * - Faceted Ruby of Sunlight in the crossguard medallion
 * - Gold wire-wrapped Cordovan leather grip with ergonomic central spacer ring
 * - Sacred celestial halo centered around the quillons
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'assets', 'scenes', 'claymore-pixel.svg');

const S = 4; // 1 pixel = 4x4 screen pixels
const COLS = 48; // 192px width
const ROWS = 96; // 384px height (Elongated Greatsword)
const W = COLS * S;
const H = ROWS * S;

// Palette
const C = {
  // Steel & Blade
  steelWhite: '#ffffff',
  steelHighlight: '#e8eff7',
  steelEdge: '#cdd9e5',
  steelMid: '#8695a5',
  steelDark: '#445161',
  steelFuller: '#1d232b',
  steelShadow: '#0e1217',

  // Gold Wire & Ornaments
  goldBright: '#fff8db',
  goldHi: '#f5b547',
  goldMid: '#cca052',
  goldDark: '#7d5f2a',
  goldShadow: '#3e2e12',

  // Ruby Gemstone (Crossguard Center)
  rubyGlint: '#ffffff',
  rubyBright: '#ff4d4d',
  rubyMid: '#c91a1a',
  rubyDark: '#730a0a',
  rubyShadow: '#360202',

  // Cordovan Leather Grip
  leatherHi: '#5e381b',
  leatherMid: '#3b2210',
  leatherDark: '#211308',

  // Glowing Sunlight Runes & Aura
  runeWhite: '#ffffff',
  runeGold: '#fcd34d',
  runeAmber: '#f59e0b',
  auraGlow: '#c9a876',
  haloRing: '#261c10',
  haloBright: '#523a1c',
};

// Background Sacred Halo / Celestial Circle (Centered at Crossguard)
function generateCelestialHalo() {
  const rects = [];
  const cx = 24, cy = 30, radius = 22;

  for (let r = cy - radius; r <= cy + radius; r++) {
    for (let c = cx - radius; c <= cx + radius; c++) {
      const dx = c - cx;
      const dy = r - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Outer delicate dotted halo
      if (Math.abs(dist - radius) < 0.8 && (c + r) % 2 === 0) {
        rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.haloRing}"/>`);
      }
      // Inner sacred accents at 8 cardinal points
      if (Math.abs(dist - (radius - 4)) < 0.9 && (c === cx || r === cy || Math.abs(dx) === Math.abs(dy))) {
        rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.haloBright}"/>`);
      }
    }
  }

  // Radiating four cardinal starburst rays
  const rays = [
    [cx, cy - radius - 2, C.goldHi], [cx, cy - radius - 3, C.goldBright],
    [cx - radius - 2, cy, C.goldHi], [cx - radius - 3, cy, C.goldBright],
    [cx + radius + 2, cy, C.goldHi], [cx + radius + 3, cy, C.goldBright],
    [cx, cy + radius + 2, C.goldHi], [cx, cy + radius + 3, C.goldBright],
  ];
  for (const [c, r, fill] of rays) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${fill}"/>`);
  }

  return rects.join('');
}

function generateClaymore() {
  const rects = [];

  // =========================================================
  // 1. POMMEL: Octagonal Scent-Stopper with Gold Inlay (Rows 5 to 10)
  // =========================================================
  const pommel = [
    [23, 5, 2, C.steelWhite],
    [22, 6, 4, C.goldMid], [23, 6, 2, C.goldBright],
    [21, 7, 6, C.steelDark], [22, 7, 4, C.goldHi], [23, 7, 2, C.goldBright],
    [20, 8, 8, C.steelMid], [21, 8, 2, C.goldMid], [23, 8, 2, C.steelWhite], [25, 8, 2, C.steelShadow],
    [21, 9, 6, C.steelDark], [22, 9, 4, C.goldDark], [23, 9, 2, C.goldMid],
    [22, 10, 4, C.steelShadow], [23, 10, 2, C.goldMid],
  ];
  for (const [c, r, w, fill] of pommel) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // =========================================================
  // 2. TWO-HANDED GRIP: Leather + Gold Wire Bindings + Mid-Ring (Rows 11 to 21)
  // =========================================================
  for (let r = 11; r <= 21; r++) {
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.leatherHi}"/>`);
    rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.leatherMid}"/>`);
    rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.leatherMid}"/>`);
    rects.push(`<rect x="${25 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.leatherDark}"/>`);

    // Gold Wire Wrapping diagonally criss-crossing
    if (r === 12 || r === 15 || r === 18 || r === 21) {
      rects.push(`<rect x="${22 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.goldHi}"/>`);
      rects.push(`<rect x="${23 * S}" y="${(r - 1) * S}" width="${S}" height="${S}" fill="${C.goldBright}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.goldMid}"/>`);
      rects.push(`<rect x="${25 * S}" y="${(r + 1) * S}" width="${S}" height="${S}" fill="${C.goldDark}"/>`);
    }

    // Ergonomic Spacer Ring at center grip (Row 16)
    if (r === 16) {
      rects.push(`<rect x="${21 * S}" y="${16 * S}" width="${6 * S}" height="${S}" fill="${C.goldMid}"/>`);
      rects.push(`<rect x="${23 * S}" y="${16 * S}" width="${2 * S}" height="${S}" fill="${C.goldBright}"/>`);
    }
  }

  // Grip / Crossguard Ferrule Collar (Row 22)
  rects.push(`<rect x="${21 * S}" y="${22 * S}" width="${6 * S}" height="${S}" fill="${C.goldMid}"/>`);
  rects.push(`<rect x="${23 * S}" y="${22 * S}" width="${2 * S}" height="${S}" fill="${C.goldBright}"/>`);

  // =========================================================
  // 3. CROSSGUARD: Splayed Forward Quillons + Quatrefoils + Ruby Medallion (Rows 23 to 27)
  // =========================================================
  const crossguard = [
    [14, 23, 20, C.steelMid], [21, 23, 6, C.goldMid], [23, 23, 2, C.goldBright],
    [12, 24, 8, C.steelDark], [18, 24, 12, C.steelMid], [28, 24, 8, C.steelShadow],
    [11, 25, 6, C.steelMid], [31, 25, 6, C.steelDark],
    // Left Quillon Quatrefoil Finial (Cols 8-11, Rows 23-27)
    [8, 23, 3, C.goldMid], [7, 24, 5, C.goldHi], [6, 25, 7, C.steelMid],
    [7, 26, 5, C.goldDark], [8, 27, 3, C.goldShadow],
    [8, 24, 1, C.steelShadow], [10, 24, 1, C.steelShadow],
    [8, 26, 1, C.steelShadow], [10, 26, 1, C.steelShadow],
    // Right Quillon Quatrefoil Finial (Cols 37-41, Rows 23-27)
    [37, 23, 3, C.goldMid], [36, 24, 5, C.goldHi], [35, 25, 7, C.steelDark],
    [36, 26, 5, C.goldDark], [37, 27, 3, C.goldShadow],
    [37, 24, 1, C.steelShadow], [39, 24, 1, C.steelShadow],
    [37, 26, 1, C.steelShadow], [39, 26, 1, C.steelShadow],
  ];
  for (const [c, r, w, fill] of crossguard) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // --- FACETED RUBY OF SUNLIGHT (Rows 23-26, Center of Guard) ---
  rects.push(`<rect x="${21 * S}" y="${23 * S}" width="${6 * S}" height="${4 * S}" fill="${C.goldDark}"/>`);
  rects.push(`<rect x="${22 * S}" y="${23 * S}" width="${4 * S}" height="${4 * S}" fill="${C.goldHi}"/>`);
  rects.push(`<rect x="${22 * S}" y="${24 * S}" width="${4 * S}" height="${2 * S}" fill="${C.rubyMid}"/>`);
  rects.push(`<rect x="${23 * S}" y="${24 * S}" width="${2 * S}" height="${2 * S}" fill="${C.rubyBright}"/>`);
  rects.push(`<rect class="ruby-glint" x="${22 * S}" y="${24 * S}" width="${S}" height="${S}" fill="${C.rubyGlint}"/>`);
  rects.push(`<rect x="${22 * S}" y="${26 * S}" width="${4 * S}" height="${S}" fill="${C.rubyShadow}"/>`);

  // =========================================================
  // 4. RICASSO: Unsharpened Blade Base with Steel Lugs (Rows 27 to 30)
  // =========================================================
  for (let r = 27; r <= 30; r++) {
    rects.push(`<rect x="${21 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${4 * S}" height="${S}" fill="${C.steelMid}"/>`);
    rects.push(`<rect x="${26 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);
  }
  rects.push(`<rect x="${20 * S}" y="${29 * S}" width="${S}" height="${2 * S}" fill="${C.goldMid}"/>`);
  rects.push(`<rect x="${27 * S}" y="${29 * S}" width="${S}" height="${2 * S}" fill="${C.goldMid}"/>`);

  // =========================================================
  // 5. ELONGATED GREATSWORD BLADE (Rows 31 to 86 = 56 ROWS OF STEEL!)
  // =========================================================
  for (let r = 31; r <= 86; r++) {
    // Col 21: Polished Mirror Razor Cutting Edge
    rects.push(`<rect class="edge-gleam" x="${21 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);

    // Col 22: Left Primary Bevel (Damascus ripple pattern)
    const bevelShade = (r % 3 === 0) ? C.steelHighlight : C.steelEdge;
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${S}" height="${S}" fill="${bevelShade}"/>`);

    // Cols 23 & 24: Central Fuller with Glowing Ancient Runes (Extended down to Row 72!)
    if (r <= 72) {
      rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelFuller}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);

      // 10 GLOWING RUNES ALONG THE ELONGATED FULLER
      const runeRows = [33, 37, 41, 45, 49, 53, 57, 61, 65, 69];
      if (runeRows.includes(r)) {
        rects.push(`<rect class="rune-pulse" x="${23 * S}" y="${r * S}" width="${2 * S}" height="${S}" fill="${C.runeGold}"/>`);
        rects.push(`<rect class="rune-pulse" x="${23 * S + 1}" y="${r * S}" width="${S}" height="${S}" fill="${C.runeWhite}"/>`);
      } else if (r % 2 === 1) {
        // Vertical connecting thread
        rects.push(`<rect class="rune-pulse" x="${23 * S + 2}" y="${r * S}" width="${1}" height="${S}" fill="${C.runeAmber}"/>`);
      }
    } else {
      // Blade Diamond Ridge below the fuller (Rows 73 to 86)
      rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
    }

    // Col 25: Right Primary Bevel
    rects.push(`<rect x="${25 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);

    // Col 26: Right Outer Razor Edge
    rects.push(`<rect x="${26 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
  }

  // =========================================================
  // 6. ELONGATED NEEDLE THRUSTING TIP (Rows 87 to 92)
  // =========================================================
  // Row 87: 5 pixels
  rects.push(`<rect x="${21 * S}" y="${87 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${22 * S}" y="${87 * S}" width="${2 * S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${87 * S}" width="${2 * S}" height="${S}" fill="${C.steelDark}"/>`);

  // Row 88: 4 pixels
  rects.push(`<rect x="${22 * S}" y="${88 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${23 * S}" y="${88 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${88 * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);

  // Row 89: 3 pixels
  rects.push(`<rect x="${22 * S}" y="${89 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${23 * S}" y="${89 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${89 * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);

  // Row 90: 2 pixels
  rects.push(`<rect x="${23 * S}" y="${90 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${24 * S}" y="${90 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);

  // Row 91: 1 sharp needle point
  rects.push(`<rect x="${23 * S}" y="${91 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);

  // Row 92: Final needle gleam glint
  rects.push(`<rect class="edge-gleam" x="${23 * S + 1}" y="${92 * S}" width="2" height="2" fill="${C.goldBright}"/>`);

  return rects.join('');
}

// Drifting Golden Sunlight Embers & Sparks along the full sword length
function generateSacredEmbers() {
  const embers = [
    { cls: 'eb1', col: 17, row: 38, dur: '3.0s', dly: '0s', c: C.goldBright },
    { cls: 'eb2', col: 30, row: 48, dur: '3.6s', dly: '0.5s', c: C.goldHi },
    { cls: 'eb3', col: 14, row: 28, dur: '2.8s', dly: '1.0s', c: C.rubyBright },
    { cls: 'eb1', col: 32, row: 64, dur: '3.2s', dly: '1.6s', c: C.goldHi },
    { cls: 'eb2', col: 18, row: 76, dur: '3.4s', dly: '0.8s', c: C.goldBright },
    { cls: 'eb3', col: 29, row: 84, dur: '2.9s', dly: '1.4s', c: C.goldHi },
  ];
  return embers.map(e =>
    `<rect class="${e.cls}" x="${e.col * S}" y="${e.row * S}" width="${S}" height="${S}" fill="${e.c}" style="animation-duration:${e.dur};animation-delay:${e.dly};"/>`
  ).join('');
}

const css = `
  /* Breathing Sunlight Runes Pulsing along the Fuller */
  .rune-pulse {
    animation: runeGlow 2.8s ease-in-out infinite;
  }
  @keyframes runeGlow {
    0%, 100% { opacity: 0.75; fill: ${C.runeAmber}; }
    50%      { opacity: 1;    fill: ${C.runeWhite}; filter: drop-shadow(0 0 2px ${C.goldHi}); }
  }

  /* Traveling Razor Edge Gleam */
  .edge-gleam {
    animation: edgeShimmer 4.0s ease-in-out infinite;
  }
  @keyframes edgeShimmer {
    0%, 100% { opacity: 0.85; }
    50%      { opacity: 1; filter: drop-shadow(0 0 3px #ffffff); }
  }

  /* Ruby Medallion Heartbeat Gleam */
  .ruby-glint {
    animation: rubyPulse 2.4s ease-in-out infinite;
  }
  @keyframes rubyPulse {
    0%, 100% { opacity: 0.8; }
    50%      { opacity: 1; filter: drop-shadow(0 0 3px ${C.rubyBright}); }
  }

  /* Rising Golden Ash Embers */
  .eb1 { animation: ebFloat1 3.0s step-end infinite; }
  .eb2 { animation: ebFloat2 3.6s step-end infinite; }
  .eb3 { animation: ebFloat3 2.8s step-end infinite; }

  @keyframes ebFloat1 {
    0%   { transform: translate(0, 0); opacity: 0; }
    25%  { opacity: 0.95; }
    60%  { transform: translate(-8px, -28px); opacity: 0.7; }
    100% { transform: translate(-14px, -60px); opacity: 0; }
  }
  @keyframes ebFloat2 {
    0%   { transform: translate(0, 0); opacity: 0; }
    25%  { opacity: 0.95; }
    60%  { transform: translate(8px, -24px); opacity: 0.7; }
    100% { transform: translate(14px, -56px); opacity: 0; }
  }
  @keyframes ebFloat3 {
    0%   { transform: translate(0, 0); opacity: 0; }
    25%  { opacity: 0.95; }
    60%  { transform: translate(-4px, -26px); opacity: 0.7; }
    100% { transform: translate(-8px, -52px); opacity: 0; }
  }
`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Elongated Refined Claymore Greatsword +10 — Dark Souls Pixel Art</title>
  <style><![CDATA[
${css}
  ]]></style>

  <!-- 1. Sacred Celestial Halo & Starburst Rays -->
  ${generateCelestialHalo()}

  <!-- 2. The Towering Elongated Claymore Greatsword -->
  ${generateClaymore()}

  <!-- 3. Rising Golden Sparks & Ash Embers -->
  ${generateSacredEmbers()}
</svg>
`;

writeFileSync(OUT_FILE, svgContent, 'utf-8');
console.log('✨ Generated towering elongated Refined +10 Claymore successfully!');
