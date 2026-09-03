/**
 * scripts/create-pixel-summonsign.mjs
 * Generates an authentic 100% pure pixel-art Dark Souls Golden Summon Sign SVG.
 * Strictly orthogonal pixel rects (shape-rendering="crispEdges"),
 * retro pixel dither, pixel sun sigil, pixel runes, and stepped ember motes.
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'assets', 'scenes', 'summonsign.svg');

const S = 4; // 1 pixel = 4x4 screen pixels
const COLS = 120; // 480px width
const ROWS = 60;  // 240px height
const W = COLS * S;
const H = ROWS * S;

// Palette
const C = {
  abyss: '#080706',
  groundDark: '#120f0c',
  stoneSeam: '#1f1914',

  ditherGold1: '#261a06',
  ditherGold2: '#523408',
  ditherGold3: '#8c590d',

  goldDark: '#664a1f',
  goldMid: '#997333',
  gold: '#c9a876',
  goldHi: '#f5d698',
  goldCore: '#fff7e0',

  amberDark: '#994400',
  amber: '#f4a742',
  amberHi: '#ffc043',
};

// Convert string matrix to pixel rects
function parseMatrix(map, pal, startCol, startRow) {
  const rects = [];
  for (let r = 0; r < map.length; r++) {
    const line = map[r];
    let c = 0;
    while (c < line.length) {
      const ch = line[c];
      const color = pal[ch];
      if (!color) { c++; continue; }
      let len = 1;
      while (c + len < line.length && line[c + len] === ch) len++;
      rects.push(`<rect x="${(startCol + c) * S}" y="${(startRow + r) * S}" width="${len * S}" height="${S}" fill="${color}"/>`);
      c += len;
    }
  }
  return rects.join('');
}

// 1. Radiant Sun Sigil Matrix (26 cols x 26 rows)
// Placed at center col 47, row 17
const SUN_SIGIL = [
  '............YY............',
  '...........YYYY...........',
  '..........YY..YY..........',
  '.....Y.....YYYY.....Y.....',
  '....YYY...YY..YY...YYY....',
  '...YYYYY.YYYYYYYY.YYYYY...',
  '....YY..YYggggggYY..YY....',
  '.....Y.YYggggggggYY.Y.....',
  '......YYggGGGGGGggYY......',
  '.....YYggGGGGGGGGggYY.....',
  '....YYggGGWWGGWWGGggYY....',
  '...YYYggGGWKGGWKGGggYYY...',
  '..YYYYggGGGGGGGGGGggYYYY..',
  '..YYYYggGGGGGGGGGGggYYYY..',
  '...YYYggGGKWGGKWGGggYYY...',
  '....YYggGGGGKKGGGGggYY....',
  '.....YYggGGGGGGGGggYY.....',
  '......YYggGGGGGGggYY......',
  '.....Y.YYggggggggYY.Y.....',
  '....YY..YYggggggYY..YY....',
  '...YYYYY.YYYYYYYY.YYYYY...',
  '....YYY...YY..YY...YYY....',
  '.....Y.....YYYY.....Y.....',
  '..........YY..YY..........',
  '...........YYYY...........',
  '............YY............',
];

const SUN_PAL = {
  Y: C.amberHi,
  g: C.gold,
  G: C.goldCore,
  W: '#ffffff',
  K: C.groundDark,
};

// 2. Soapstone Pixel Frame (80 cols x 32 rows, centered col 20, row 14)
function generatePixelFrame() {
  const rects = [];
  const c0 = 18, r0 = 12, w = 84, h = 36;

  // Outer Border
  rects.push(`<rect x="${c0 * S}" y="${r0 * S}" width="${w * S}" height="${S}" fill="${C.gold}"/>`);
  rects.push(`<rect x="${c0 * S}" y="${(r0 + h - 1) * S}" width="${w * S}" height="${S}" fill="${C.gold}"/>`);
  rects.push(`<rect x="${c0 * S}" y="${r0 * S}" width="${S}" height="${h * S}" fill="${C.gold}"/>`);
  rects.push(`<rect x="${(c0 + w - 1) * S}" y="${r0 * S}" width="${S}" height="${h * S}" fill="${C.gold}"/>`);

  // Inner Border (amber highlight)
  rects.push(`<rect x="${(c0 + 2) * S}" y="${(r0 + 2) * S}" width="${(w - 4) * S}" height="${S}" fill="${C.amber}"/>`);
  rects.push(`<rect x="${(c0 + 2) * S}" y="${(r0 + h - 3) * S}" width="${(w - 4) * S}" height="${S}" fill="${C.amber}"/>`);
  rects.push(`<rect x="${(c0 + 2) * S}" y="${(r0 + 2) * S}" width="${S}" height="${(h - 4) * S}" fill="${C.amber}"/>`);
  rects.push(`<rect x="${(c0 + w - 3) * S}" y="${(r0 + 2) * S}" width="${S}" height="${(h - 4) * S}" fill="${C.amber}"/>`);

  // Stepped Corner Brackets
  const corners = [
    [c0 - 1, r0 - 1], [c0 + w - 2, r0 - 1],
    [c0 - 1, r0 + h - 2], [c0 + w - 2, r0 + h - 2]
  ];
  for (const [cx, cy] of corners) {
    rects.push(`<rect x="${cx * S}" y="${cy * S}" width="${3 * S}" height="${3 * S}" fill="${C.goldHi}"/>`);
  }

  // Cardinal Diamonds
  // Top center
  rects.push(`<rect x="${(COLS / 2 - 1) * S}" y="${(r0 - 3) * S}" width="${2 * S}" height="${2 * S}" fill="${C.goldHi}"/>`);
  rects.push(`<rect x="${(COLS / 2 - 2) * S}" y="${(r0 - 2) * S}" width="${4 * S}" height="${S}" fill="${C.amber}"/>`);
  // Bottom center
  rects.push(`<rect x="${(COLS / 2 - 1) * S}" y="${(r0 + h + 1) * S}" width="${2 * S}" height="${2 * S}" fill="${C.goldHi}"/>`);
  rects.push(`<rect x="${(COLS / 2 - 2) * S}" y="${(r0 + h) * S}" width="${4 * S}" height="${S}" fill="${C.amber}"/>`);
  // Left center
  rects.push(`<rect x="${(c0 - 3) * S}" y="${(ROWS / 2 - 1) * S}" width="${2 * S}" height="${2 * S}" fill="${C.goldHi}"/>`);
  // Right center
  rects.push(`<rect x="${(c0 + w + 1) * S}" y="${(ROWS / 2 - 1) * S}" width="${2 * S}" height="${2 * S}" fill="${C.goldHi}"/>`);

  return rects.join('');
}

// 3. Ancient Pixel Runes (Left & Right Flanks)
function generatePixelRunes() {
  const rects = [];
  // Left Flank Runes (Cols 24 to 42, Rows 18 to 42)
  const leftRunes = [
    // Row 18
    [24, 18, 5], [31, 18, 3], [36, 18, 6],
    // Row 21
    [26, 21, 4], [32, 21, 8],
    // Row 24 (sigils)
    [24, 24, 2], [28, 24, 4], [34, 24, 3], [39, 24, 4],
    // Row 27
    [25, 27, 6], [33, 27, 2], [37, 27, 5],
    // Row 30
    [24, 30, 4], [30, 30, 6], [38, 30, 4],
    // Row 33
    [26, 33, 3], [31, 33, 5], [38, 33, 3],
    // Row 36
    [24, 36, 6], [32, 36, 4], [38, 36, 4],
    // Row 39
    [26, 39, 4], [32, 39, 8],
    // Row 42
    [24, 42, 5], [31, 42, 4], [37, 42, 5],
  ];
  for (const [c, r, w] of leftRunes) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${C.amber}"/>`);
  }

  // Right Flank Runes (Cols 78 to 96, Rows 18 to 42)
  const rightRunes = [
    // Row 18
    [78, 18, 6], [86, 18, 3], [91, 18, 5],
    // Row 21
    [80, 21, 8], [90, 21, 4],
    // Row 24
    [78, 24, 4], [84, 24, 3], [89, 24, 4], [95, 24, 2],
    // Row 27
    [79, 27, 5], [86, 27, 2], [90, 27, 6],
    // Row 30
    [78, 30, 4], [84, 30, 6], [92, 30, 4],
    // Row 33
    [80, 33, 3], [85, 33, 5], [92, 33, 3],
    // Row 36
    [78, 36, 4], [84, 36, 4], [90, 36, 6],
    // Row 39
    [80, 39, 8], [90, 39, 4],
    // Row 42
    [78, 42, 5], [85, 42, 4], [91, 42, 5],
  ];
  for (const [c, r, w] of rightRunes) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${C.amber}"/>`);
  }

  // Vertical dividing line dashes between runes and sun
  for (let r = 16; r < 44; r += 2) {
    rects.push(`<rect x="${44 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.goldDark}"/>`);
    rects.push(`<rect x="${75 * S}" y="${r * S}" width="${S}" height="${S}" fill="${C.goldDark}"/>`);
  }

  return rects.join('');
}

// 4. Pixel Dither Ground Glow Rings
function generateDitherAura() {
  const rects = [];
  const cx = 60, cy = 30;
  for (let r = 4; r < 56; r += 2) {
    for (let c = 8; c < 112; c += 2) {
      const dx = (c - cx);
      const dy = (r - cy) * 1.8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 48 && dist > 14) {
        if ((c + r) % 4 === 0) {
          let fill = C.ditherGold1;
          if (dist < 26) fill = C.ditherGold3;
          else if (dist < 38) fill = C.ditherGold2;
          rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${fill}"/>`);
        }
      }
    }
  }
  return rects.join('');
}

// 5. Rising Pixel Wisps / Motes
function generateWisps() {
  const wisps = [
    { cls: 'w1', col: 30, row: 28, dur: '3.2s', dly: '0s' },
    { cls: 'w2', col: 38, row: 32, dur: '3.8s', dly: '0.6s' },
    { cls: 'w3', col: 52, row: 20, dur: '2.8s', dly: '1.2s' },
    { cls: 'w4', col: 66, row: 22, dur: '3.5s', dly: '1.8s' },
    { cls: 'w1', col: 82, row: 30, dur: '3.0s', dly: '0.9s' },
    { cls: 'w2', col: 90, row: 26, dur: '3.6s', dly: '1.5s' },
    { cls: 'w3', col: 60, row: 14, dur: '2.5s', dly: '2.2s' },
  ];
  return wisps.map(w =>
    `<rect class="${w.cls}" x="${w.col * S}" y="${w.row * S}" width="${S}" height="${2 * S}" fill="${C.goldCore}" style="animation-duration:${w.dur};animation-delay:${w.dly};"/>`
  ).join('');
}

const css = `
  /* Breathing Holy Radiance */
  .sign-breathe { animation: sBreathe 2.6s step-end infinite; }
  @keyframes sBreathe { 0%,100% { opacity: 0.9; } 50% { opacity: 1; filter: drop-shadow(0 0 4px #f4a742); } }

  .dither-breathe { animation: dPulse 2s step-end infinite; }
  @keyframes dPulse { 0%,100% { opacity: 0.65; } 50% { opacity: 1; } }

  /* Sun Emblem Shimmer */
  .sun-glow { animation: sGlow 3.2s step-end infinite; }
  @keyframes sGlow { 0%,100% { opacity: 1; } 50% { opacity: 0.8; } }

  /* Rising Pixel Wisps */
  .w1 { animation: wRise1 3s step-end infinite; }
  .w2 { animation: wRise2 3.6s step-end infinite; }
  .w3 { animation: wRise3 2.8s step-end infinite; }
  .w4 { animation: wRise4 3.4s step-end infinite; }

  @keyframes wRise1 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 1; }
    50% { transform: translate(-4px, -24px); opacity: 0.8; }
    75% { transform: translate(-8px, -48px); opacity: 0.5; }
    100% { transform: translate(-12px, -72px); opacity: 0; }
  }
  @keyframes wRise2 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 1; }
    50% { transform: translate(4px, -20px); opacity: 0.8; }
    75% { transform: translate(8px, -44px); opacity: 0.5; }
    100% { transform: translate(12px, -68px); opacity: 0; }
  }
  @keyframes wRise3 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 1; }
    50% { transform: translate(-2px, -28px); opacity: 0.9; }
    75% { transform: translate(-4px, -56px); opacity: 0.6; }
    100% { transform: translate(-6px, -84px); opacity: 0; }
  }
  @keyframes wRise4 {
    0% { transform: translate(0, 0); opacity: 0; }
    25% { opacity: 1; }
    50% { transform: translate(6px, -24px); opacity: 0.8; }
    75% { transform: translate(10px, -52px); opacity: 0.5; }
    100% { transform: translate(14px, -76px); opacity: 0; }
  }

  .caption-pulse { animation: cPulse 2.4s step-end infinite; }
  @keyframes cPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }
`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Dark Souls — Authentic Pixel Art Golden Summon Sign</title>
  <style><![CDATA[
${css}
  ]]></style>

  <!-- Dark Flagstone Floor -->
  <rect width="${W}" height="${H}" fill="${C.abyss}"/>

  <!-- Flagstone Pixel Seams -->
  <rect y="${8 * S}" width="${W}" height="${S}" fill="${C.stoneSeam}"/>
  <rect y="${26 * S}" width="${W}" height="${S}" fill="${C.stoneSeam}"/>
  <rect y="${44 * S}" width="${W}" height="${S}" fill="${C.stoneSeam}"/>
  <rect x="${20 * S}" y="${8 * S}" width="${S}" height="${18 * S}" fill="${C.stoneSeam}"/>
  <rect x="${60 * S}" y="${8 * S}" width="${S}" height="${18 * S}" fill="${C.stoneSeam}"/>
  <rect x="${100 * S}" y="${8 * S}" width="${S}" height="${18 * S}" fill="${C.stoneSeam}"/>
  <rect x="${40 * S}" y="${26 * S}" width="${S}" height="${18 * S}" fill="${C.stoneSeam}"/>
  <rect x="${80 * S}" y="${26 * S}" width="${S}" height="${18 * S}" fill="${C.stoneSeam}"/>

  <!-- Pixel Dither Ambient Golden Glow -->
  <g class="dither-breathe">
    ${generateDitherAura()}
  </g>

  <!-- ============================================================== -->
  <!-- GOLDEN SOAPSTONE SUMMON SIGN (100% PURE PIXEL ART)             -->
  <!-- ============================================================== -->
  <g class="sign-breathe">
    <!-- Soapstone Tablet Floor Inscription Base -->
    <rect x="${18 * S}" y="${12 * S}" width="${84 * S}" height="${36 * S}" fill="${C.groundDark}"/>

    <!-- Soapstone Pixel Frame & Cardinal Terminals -->
    ${generatePixelFrame()}

    <!-- Ancient Soapstone Runes on Left & Right Flanks -->
    ${generatePixelRunes()}

    <!-- Central Radiant Sun Sigil (Warrior of Sunlight Emblem) -->
    <g class="sun-glow">
      ${parseMatrix(SUN_SIGIL, SUN_PAL, 47, 17)}
    </g>
  </g>

  <!-- Rising Pixel Wisps (Divine Light Motes) -->
  ${generateWisps()}

  <!-- Pixel Art Caption Inscription -->
  <g class="caption-pulse">
    <!-- Centered Pixel Diamond Accent -->
    <rect x="${59 * S}" y="${51 * S}" width="${2 * S}" height="${2 * S}" fill="${C.goldHi}"/>
    <rect x="${58 * S}" y="${51.5 * S}" width="${4 * S}" height="${S}" fill="${C.amber}"/>
    <text x="${W / 2}" y="${56 * S}" font-family="'Press Start 2P', monospace" font-size="8" letter-spacing="3" fill="${C.gold}" text-anchor="middle">⚡ WARRIOR OF SUNLIGHT · SUMMON SIGN ⚡</text>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svgContent, 'utf-8');
console.log('✨ Generated authentic 100% pixel-art summonsign.svg successfully!');
