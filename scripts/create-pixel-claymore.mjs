/**
 * scripts/create-pixel-claymore.mjs
 * Generates an ultra-detailed, majestic Pixel Art Claymore Greatsword (+10 Refined / Sacred Buffed):
 * - Faceted glowing Ruby of Sunlight set in the center crossguard medallion
 * - Criss-crossing antique gold wire wrapped around rich Cordovan leather grip with spacer ring
 * - Ancient glowing golden runes pulsing along the deep central fuller
 * - Razor-sharp mirror polished Damascus edges with animated light shimmer
 * - Sacred celestial ring halo & floating golden sparks/embers
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'assets', 'scenes', 'claymore-pixel.svg');

const S = 4; // 1 pixel = 4x4 screen pixels
const COLS = 48; // 192px width
const ROWS = 74; // 296px height
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

// Background Sacred Halo / Celestial Circle
function generateCelestialHalo() {
  const rects = [];
  const cx = 24, cy = 38, radius = 21;

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
  // 1. POMMEL: Octagonal Scent-Stopper with Gold Medallion (Rows 5 to 10)
  // =========================================================
  const pommel = [
    // Top Peen block
    [23, 5, 2, C.steelWhite],
    // Upper facet
    [22, 6, 4, C.goldMid], [23, 6, 2, C.goldBright],
    // Octagonal body with gold inlay ring
    [21, 7, 6, C.steelDark], [22, 7, 4, C.goldHi], [23, 7, 2, C.goldBright],
    [20, 8, 8, C.steelMid], [21, 8, 2, C.goldMid], [23, 8, 2, C.steelWhite], [25, 8, 2, C.steelShadow],
    [21, 9, 6, C.steelDark], [22, 9, 4, C.goldDark], [23, 9, 2, C.goldMid],
    // Pommel neck collar
    [22, 10, 4, C.steelShadow], [23, 10, 2, C.goldMid],
  ];
  for (const [c, r, w, fill] of pommel) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // =========================================================
  // 2. TWO-HANDED GRIP: Leather + Gold Wire Bindings + Mid-Ring (Rows 11 to 21)
  // =========================================================
  // Grip is 4 pixels wide: Cols 22, 23, 24, 25
  for (let r = 11; r <= 21; r++) {
    // Base rich cordovan leather
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

    // Ergonomic Steel & Gold Spacer Ring at center grip (Row 16)
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
    // Main crossbar (Row 23)
    [14, 23, 20, C.steelMid], [21, 23, 6, C.goldMid], [23, 23, 2, C.goldBright],
    // Upper quillon sweep (Row 24)
    [12, 24, 8, C.steelDark], [18, 24, 12, C.steelMid], [28, 24, 8, C.steelShadow],
    // Lower bevel & underguard (Row 25)
    [11, 25, 6, C.steelMid], [31, 25, 6, C.steelDark],
    // Left Quillon Quatrefoil Finial (Cols 7-11, Rows 23-27)
    [8, 23, 3, C.goldMid], [7, 24, 5, C.goldHi], [6, 25, 7, C.steelMid],
    [7, 26, 5, C.goldDark], [8, 27, 3, C.goldShadow],
    // Pierced quatrefoil holes
    [8, 24, 1, C.steelShadow], [10, 24, 1, C.steelShadow],
    [8, 26, 1, C.steelShadow], [10, 26, 1, C.steelShadow],

    // Right Quillon Quatrefoil Finial (Cols 37-41, Rows 23-27)
    [37, 23, 3, C.goldMid], [36, 24, 5, C.goldHi], [35, 25, 7, C.steelDark],
    [36, 26, 5, C.goldDark], [37, 27, 3, C.goldShadow],
    // Pierced holes right
    [37, 24, 1, C.steelShadow], [39, 24, 1, C.steelShadow],
    [37, 26, 1, C.steelShadow], [39, 26, 1, C.steelShadow],
  ];
  for (const [c, r, w, fill] of crossguard) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // --- FACETED RUBY OF SUNLIGHT (Rows 23-26, Center of Guard) ---
  // Gold Bezel
  rects.push(`<rect x="${21 * S}" y="${23 * S}" width="${6 * S}" height="${4 * S}" fill="${C.goldDark}"/>`);
  rects.push(`<rect x="${22 * S}" y="${23 * S}" width="${4 * S}" height="${4 * S}" fill="${C.goldHi}"/>`);
  // Ruby Body (4x4)
  rects.push(`<rect x="${22 * S}" y="${24 * S}" width="${4 * S}" height="${2 * S}" fill="${C.rubyMid}"/>`);
  rects.push(`<rect x="${23 * S}" y="${24 * S}" width="${2 * S}" height="${2 * S}" fill="${C.rubyBright}"/>`);
  // Top-left glint
  rects.push(`<rect class="ruby-glint" x="${22 * S}" y="${24 * S}" width="${S}" height="${S}" fill="${C.rubyGlint}"/>`);
  // Bottom shadow
  rects.push(`<rect x="${22 * S}" y="${26 * S}" width="${4 * S}" height="${S}" fill="${C.rubyShadow}"/>`);

  // =========================================================
  // 4. RICASSO: Unsharpened Blade Base with Steel Lugs (Rows 27 to 30)
  // =========================================================
  for (let r = 27; r <= 30; r++) {
    rects.push(`<rect x="${21 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${4 * S}" height="${S}" fill="${C.steelMid}"/>`);
    rects.push(`<rect x="${26 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);
  }
  // Side parrying lugs
  rects.push(`<rect x="${20 * S}" y="${29 * S}" width="${S}" height="${2 * S}" fill="${C.goldMid}"/>`);
  rects.push(`<rect x="${27 * S}" y="${29 * S}" width="${S}" height="${2 * S}" fill="${C.goldMid}"/>`);

  // =========================================================
  // 5. CLAYMORE GREATSWORD BLADE (+10 BUFFED WITH SUNLIGHT RUNES) (Rows 31 to 65)
  // =========================================================
  // Width: 6 pixels (Cols 21 to 26)
  for (let r = 31; r <= 63; r++) {
    // Col 21: Polished Mirror Cutting Edge (Animated Razor Shimmer)
    rects.push(`<rect class="edge-gleam" x="${21 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);

    // Col 22: Left Primary Bevel (Damascus highlight)
    const bevelShade = (r % 3 === 0) ? C.steelHighlight : C.steelEdge;
    rects.push(`<rect x="${22 * S}" y="${r * S}" width="${S}" height="${S}" fill="${bevelShade}"/>`);

    // Cols 23 & 24: Central Fuller with Glowing Runes (Runs down to Row 56)
    if (r <= 56) {
      // Dark hollow fuller channel
      rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelFuller}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelShadow}"/>`);

      // GLOWING ANCIENT RUNES INSIDE FULLER (Every 3-4 rows)
      if (r === 33 || r === 37 || r === 41 || r === 45 || r === 49 || r === 53) {
        rects.push(`<rect class="rune-pulse" x="${23 * S}" y="${r * S}" width="${2 * S}" height="${S}" fill="${C.runeGold}"/>`);
        rects.push(`<rect class="rune-pulse" x="${23 * S + 1}" y="${r * S}" width="${S}" height="${S}" fill="${C.runeWhite}"/>`);
      } else if (r === 35 || r === 39 || r === 43 || r === 47 || r === 51) {
        // Vertical connector rune line
        rects.push(`<rect class="rune-pulse" x="${23 * S + 2}" y="${r * S}" width="${1}" height="${S}" fill="${C.runeAmber}"/>`);
      }
    } else {
      // Tapering blade diamond ridge below fuller
      rects.push(`<rect x="${23 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);
      rects.push(`<rect x="${24 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
    }

    // Col 25: Right Primary Bevel (Shadowed steel)
    rects.push(`<rect x="${25 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelMid}"/>`);

    // Col 26: Right Outer Razor Edge
    rects.push(`<rect x="${26 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);
  }

  // =========================================================
  // 6. NEEDLE-SHARP THRUSTING TIP (Rows 64 to 69)
  // =========================================================
  // Row 64: 5 pixels
  rects.push(`<rect x="${21 * S}" y="${64 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${22 * S}" y="${64 * S}" width="${2 * S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${64 * S}" width="${2 * S}" height="${S}" fill="${C.steelDark}"/>`);

  // Row 65: 4 pixels
  rects.push(`<rect x="${22 * S}" y="${65 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${23 * S}" y="${65 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${65 * S}" width="${2 * S}" height="${S}" fill="${C.steelDark}"/>`);

  // Row 66: 3 pixels
  rects.push(`<rect x="${22 * S}" y="${66 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${23 * S}" y="${66 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);
  rects.push(`<rect x="${24 * S}" y="${66 * S}" width="${S}" height="${S}" fill="${C.steelDark}"/>`);

  // Row 67: 2 pixels
  rects.push(`<rect x="${23 * S}" y="${67 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);
  rects.push(`<rect x="${24 * S}" y="${67 * S}" width="${S}" height="${S}" fill="${C.steelEdge}"/>`);

  // Row 68: 1 sharp needle point
  rects.push(`<rect x="${23 * S}" y="${68 * S}" width="${S}" height="${S}" fill="${C.steelWhite}"/>`);

  // Row 69: Final needle gleam glint
  rects.push(`<rect class="edge-gleam" x="${23 * S + 1}" y="${69 * S}" width="2" height="2" fill="${C.goldBright}"/>`);

  return rects.join('');
}

// Drifting Golden Sunlight Embers & Sparks
function generateSacredEmbers() {
  const embers = [
    { cls: 'eb1', col: 17, row: 42, dur: '3.0s', dly: '0s', c: C.goldBright },
    { cls: 'eb2', col: 29, row: 36, dur: '3.6s', dly: '0.5s', c: C.goldHi },
    { cls: 'eb3', col: 14, row: 26, dur: '2.8s', dly: '1.0s', c: C.rubyBright },
    { cls: 'eb1', col: 32, row: 50, dur: '3.2s', dly: '1.6s', c: C.goldHi },
    { cls: 'eb2', col: 19, row: 56, dur: '3.4s', dly: '0.8s', c: C.goldBright },
    { cls: 'eb3', col: 28, row: 62, dur: '2.9s', dly: '1.4s', c: C.goldHi },
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
  <title>Refined Claymore Greatsword +10 — Dark Souls Pixel Art</title>
  <style><![CDATA[
${css}
  ]]></style>

  <!-- 1. Sacred Celestial Halo & Starburst Rays -->
  ${generateCelestialHalo()}

  <!-- 2. The Refined +10 Claymore Greatsword -->
  ${generateClaymore()}

  <!-- 3. Rising Golden Sparks & Ash Embers -->
  ${generateSacredEmbers()}
</svg>
`;

writeFileSync(OUT_FILE, svgContent, 'utf-8');
console.log('✨ Generated ultra-beautiful Refined +10 Claymore (claymore-pixel.svg) successfully!');
