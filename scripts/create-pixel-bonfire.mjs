/**
 * scripts/create-pixel-bonfire.mjs
 * Generates an authentic 100% pure pixel-art Dark Souls Bonfire SVG.
 * Strictly orthogonal pixel rects (shape-rendering="crispEdges"),
 * pixel dithering, pixel skulls, coiled spiral sword, and 4-frame retro flame.
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'assets', 'scenes', 'bonfire.svg');

const S = 4; // 1 pixel = 4x4 screen pixels
const COLS = 120; // 480px width
const ROWS = 80;  // 320px height
const W = COLS * S;
const H = ROWS * S;

// Palette
const C = {
  abyss: '#070605',
  groundDark: '#120f0c',
  stoneSeam: '#1f1914',
  dither1: '#261204',
  dither2: '#4a1d04',
  dither3: '#8a3300',

  ashDark: '#1c1917',
  ashMid: '#322c27',
  ashHi: '#4a423b',
  ashLight: '#6e6359',

  boneWhite: '#d6cec3',
  boneShadow: '#7a7267',

  logDark: '#140f0b',
  logMid: '#261b12',

  emberRed: '#b82800',
  emberOrange: '#ff6600',
  emberGold: '#ffb703',
  emberWhite: '#fff8db',

  swordDark: '#2b2723',
  swordSteel: '#6b6359',
  swordHi: '#a89e90',
  swordGold: '#c9a876',
};

// Helper to convert string matrix to rects
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

// 1. Pixel Skulls (10 cols x 7 rows)
const SKULL_MAP = [
  '..WWWWWW..',
  '.WWWWWWWW.',
  'WWWWWWWWWW',
  'WWSKWWSKWW',
  'WWSSWWSSWW',
  '.WWWWWWWW.',
  '..WWSWW... ',
];
const SKULL_PAL = { W: C.boneWhite, S: C.boneShadow, K: C.ashDark };

// 2. Coiled Sword Matrix (18 cols x 42 rows)
// Placed at center col 51, row 18
const SWORD_MAP = [
  '........GG........',
  '.......GssG.......',
  '.......GssG.......',
  '........GG........',
  '........SS........',
  '........SS........',
  '........SS........',
  '.....GGGGGGGG.....',
  '...GGGHHssssHHGGG.',
  '....GGGGGGGGGG....',
  '........HH........',
  '.......SSSS.......',
  '......SSSSSH......',
  '.....SSSSH........',
  '.....SSSHH........',
  '......SSSSH.......',
  '.......SSSSH......',
  '........SSSH......',
  '.........SSSH.....',
  '..........SSSH....',
  '..........SSSS....',
  '.........SSSSH....',
  '........SSSH......',
  '.......SSSSH......',
  '......SSSSSH......',
  '.....SSSSH........',
  '.....SSSH.........',
  '......SSSH........',
  '.......SSSH.......',
  '........SSSH......',
  '.........SSSH.....',
  '..........SSSH....',
  '..........RRRR....',
  '.........RRROO....',
  '........RRROOO....',
  '.......RRROOOO....',
  '......RRROOOOO....',
  '......RROOOYYO....',
  '......RROOYYYY....',
  '.......ROOYYWW....',
  '........OOYYWW....',
  '.........OYYWW....',
];
const SWORD_PAL = {
  G: C.swordGold,
  H: C.swordHi,
  S: C.swordSteel,
  s: C.swordDark,
  R: C.emberRed,
  O: C.emberOrange,
  Y: C.emberGold,
  W: C.emberWhite,
};

// 3. Flame Frames (24 cols x 32 rows)
// Placed at center col 48, row 28
const FLAME_PAL = {
  R: C.emberRed,
  O: C.emberOrange,
  Y: C.emberGold,
  W: C.emberWhite,
};

const FLAME_1 = [
  '...........RR...........',
  '..........RROO..........',
  '.........RROOOO.........',
  '.........ROOYYOO........',
  '........ROOYYYYOO.......',
  '........ROOYYWWYYO......',
  '.......ROOYYWWWWYYO.....',
  '......RROYYWWWWWWYYO....',
  '.....RROYYWWWWWWWWYYO...',
  '....RROOYYWWWWWWWWYYOO..',
  '...RROOYYYYWWWWWWYYYYOO.',
  '...ROOYYYYYYWWWWYYYYYYO.',
  '..ROOYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYWWWWWWYYYYYYO.',
  '...ROYYYYWWWWWWWWYYYYO..',
  '...RROYYWWWWWWWWWWYYO...',
  '....ROYYWWWWWWWWWWYYO...',
  '....ROOYYWWWWWWWWYYOO...',
  '.....ROOYYWWWWWWYYOO....',
  '.....RROOYYYYYYYYOO.....',
  '......RROOYYYYYYOO......',
  '.......RROOOOOOOO.......',
  '........RROOOOOO........',
  '.........RROOOO.........',
  '..........RROO..........',
  '...........RR...........',
  '........................',
  '........................',
  '........................',
  '........................',
];

const FLAME_2 = [
  '.........RR.............',
  '........RROO............',
  '.......RROOOO...........',
  '.......ROOYYOO..........',
  '......ROOYYYYOO.........',
  '......ROOYYWWYYO........',
  '.....ROOYYWWWWYYO.......',
  '....RROYYWWWWWWYYO......',
  '...RROYYWWWWWWWWYYO.....',
  '..RROOYYWWWWWWWWYYOO....',
  '..ROOYYYYWWWWWWYYYYOO...',
  '.ROOYYYYYYWWWWYYYYYYO...',
  '.ROOYYYYYYYWWWWYYYYYYO..',
  '.ROYYYYYYYYWWWWYYYYYYO..',
  '..ROYYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYWWWWWWYYYYYYO.',
  '...ROYYYYWWWWWWWWYYYYO..',
  '....ROYYWWWWWWWWWWYYO...',
  '....ROYYWWWWWWWWWWYYO...',
  '.....ROOYYWWWWWWWWYYOO..',
  '.....ROOYYWWWWWWYYOO....',
  '......RROOYYYYYYYYOO....',
  '.......RROOYYYYYYOO.....',
  '........RROOOOOOOO......',
  '.........RROOOOOO.......',
  '..........RROOOO........',
  '...........RROO.........',
  '............RR..........',
  '........................',
  '........................',
  '........................',
  '........................',
];

const FLAME_3 = [
  '............RR..........',
  '...........RROO.........',
  '..........RROOOO........',
  '..........ROOYYOO.......',
  '.........ROOYYYYOO......',
  '.........ROOYYWWYYO.....',
  '........ROOYYWWWWYYO....',
  '.......RROYYWWWWWWYYO...',
  '......RROYYWWWWWWWWYYO..',
  '.....RROOYYWWWWWWWWYYOO.',
  '....RROOYYYYWWWWWWYYYYOO',
  '....ROOYYYYYYWWWWYYYYYYO',
  '....ROOYYYYYYYWWWWYYYYYY',
  '....ROYYYYYYYYWWWWYYYYYY',
  '....ROYYYYYYYYWWWWYYYYYY',
  '....ROYYYYYYWWWWWWYYYYYY',
  '.....ROYYYYWWWWWWWWYYYYO',
  '.....RROYYWWWWWWWWWWYYO.',
  '......ROYYWWWWWWWWWWYYO.',
  '......ROOYYWWWWWWWWYYOO.',
  '.......ROOYYWWWWWWYYOO..',
  '.......RROOYYYYYYYYOO...',
  '........RROOYYYYYYOO....',
  '.........RROOOOOOOO.....',
  '..........RROOOOOO......',
  '...........RROOOO.......',
  '............RROO........',
  '.............RR.........',
  '........................',
  '........................',
  '........................',
  '........................',
];

const FLAME_4 = [
  '...........RR...........',
  '..........RROO..........',
  '.........RROOOO.........',
  '........RROOYYOO........',
  '.......ROOYYYYYYOO......',
  '......ROOYYWWWWYYOO.....',
  '.....ROOYYWWWWWWYYOO....',
  '....RROYYWWWWWWWWYYO....',
  '....RROYYWWWWWWWWYYO....',
  '...RROOYYWWWWWWWWYYOO...',
  '..RROOYYYYWWWWWWYYYYOO..',
  '..ROOYYYYYYWWWWYYYYYYO..',
  '..ROOYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYYYWWWWYYYYYYO.',
  '..ROYYYYYYWWWWWWYYYYYYO.',
  '...ROYYYYWWWWWWWWYYYYO..',
  '...RROYYWWWWWWWWWWYYO...',
  '....ROYYWWWWWWWWWWYYO...',
  '....ROOYYWWWWWWWWYYOO...',
  '.....ROOYYWWWWWWYYOO....',
  '.....RROOYYYYYYYYOO.....',
  '......RROOYYYYYYOO......',
  '.......RROOOOOOOO.......',
  '........RROOOOOO........',
  '.........RROOOO.........',
  '..........RROO..........',
  '...........RR...........',
  '........................',
  '........................',
  '........................',
  '........................',
];

// Build Ash Mound pixel blocks
function generateAshMound() {
  const rects = [];
  // Tiered layers centered around col 60, rows 58 to 68
  const tiers = [
    { r: 58, cStart: 50, width: 20, fill: C.ashLight },
    { r: 59, cStart: 46, width: 28, fill: C.ashHi },
    { r: 60, cStart: 42, width: 36, fill: C.ashHi },
    { r: 61, cStart: 38, width: 44, fill: C.ashMid },
    { r: 62, cStart: 34, width: 52, fill: C.ashMid },
    { r: 63, cStart: 30, width: 60, fill: C.ashDark },
    { r: 64, cStart: 26, width: 68, fill: C.ashDark },
    { r: 65, cStart: 22, width: 76, fill: C.ashDark },
    { r: 66, cStart: 20, width: 80, fill: C.groundDark },
    { r: 67, cStart: 18, width: 84, fill: C.groundDark },
  ];
  for (const t of tiers) {
    rects.push(`<rect x="${t.cStart * S}" y="${t.r * S}" width="${t.width * S}" height="${S}" fill="${t.fill}"/>`);
  }

  // Glowing Coal pixels
  const coals = [
    [48, 60, 4, C.emberRed], [58, 61, 6, C.emberOrange], [66, 60, 5, C.emberRed],
    [44, 62, 5, C.emberOrange], [53, 62, 8, C.emberGold], [64, 62, 6, C.emberOrange],
    [50, 63, 6, C.emberOrange], [58, 63, 7, C.emberGold], [68, 63, 4, C.emberRed],
    [46, 64, 4, C.emberRed], [62, 64, 5, C.emberOrange], [56, 64, 4, C.emberGold]
  ];
  for (const [c, r, w, fill] of coals) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // Charred logs (pixel blocks)
  const logs = [
    // Left log
    [36, 64, 8], [38, 63, 8], [40, 62, 7], [42, 61, 6], [44, 60, 5],
    // Right log
    [76, 64, 8], [74, 63, 8], [72, 62, 7], [70, 61, 6], [68, 60, 5],
  ];
  for (const [c, r, w] of logs) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${C.logDark}"/>`);
    rects.push(`<rect x="${(c + 1) * S}" y="${r * S}" width="${(w - 2) * S}" height="${S}" fill="${C.logMid}"/>`);
  }

  return rects.join('');
}

// Generate Dither Pattern for Pixel Ambient Glow
function generateDitherRings() {
  const rects = [];
  const cx = 60, cy = 52;
  // Checkerboard dither pixels in concentric rings
  for (let r = 24; r < 76; r += 2) {
    for (let c = 20; c < 100; c += 2) {
      const dx = (c - cx);
      const dy = (r - cy) * 1.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 46 && dist > 18) {
        if ((c + r) % 4 === 0) {
          let fill = C.dither1;
          if (dist < 26) fill = C.dither3;
          else if (dist < 36) fill = C.dither2;
          rects.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="${fill}"/>`);
        }
      }
    }
  }
  return rects.join('');
}

// Generate Pavement
function generatePavement() {
  const lines = [];
  // Horizontal stone rows
  for (let r = 66; r < ROWS; r += 5) {
    lines.push(`<rect x="0" y="${r * S}" width="${W}" height="${S}" fill="${C.stoneSeam}"/>`);
  }
  // Vertical stone offsets
  const vSeams = [
    [15, 66, 5], [45, 66, 5], [75, 66, 5], [105, 66, 5],
    [30, 71, 5], [60, 71, 5], [90, 71, 5],
    [10, 76, 5], [50, 76, 5], [80, 76, 5], [110, 76, 5]
  ];
  for (const [c, r, h] of vSeams) {
    lines.push(`<rect x="${c * S}" y="${r * S}" width="${S}" height="${h * S}" fill="${C.stoneSeam}"/>`);
  }
  return lines.join('');
}

// Generate Embers (Sparks)
function generatePixelEmbers() {
  const embers = [
    { cls: 'e1', col: 58, row: 44, dur: '2.8s', dly: '0s' },
    { cls: 'e2', col: 62, row: 40, dur: '3.4s', dly: '0.4s' },
    { cls: 'e3', col: 55, row: 36, dur: '2.5s', dly: '0.9s' },
    { cls: 'e4', col: 64, row: 32, dur: '3.8s', dly: '1.3s' },
    { cls: 'e1', col: 59, row: 28, dur: '3.1s', dly: '1.8s' },
    { cls: 'e2', col: 57, row: 24, dur: '2.9s', dly: '2.2s' },
    { cls: 'e3', col: 63, row: 22, dur: '3.6s', dly: '0.7s' },
    { cls: 'e4', col: 60, row: 18, dur: '4.0s', dly: '1.5s' },
  ];
  return embers.map(e =>
    `<rect class="${e.cls}" x="${e.col * S}" y="${e.row * S}" width="${S}" height="${S}" fill="${C.emberGold}" style="animation-duration:${e.dur};animation-delay:${e.dly};"/>`
  ).join('');
}

const css = `
  /* 4-Frame Retro Pixel Flame (0.52s loop = 7.7 FPS) */
  .fA { animation: pFlame1 0.52s step-end infinite; }
  .fB { animation: pFlame2 0.52s step-end infinite; }
  .fC { animation: pFlame3 0.52s step-end infinite; }
  .fD { animation: pFlame4 0.52s step-end infinite; }

  @keyframes pFlame1 { 0%,100% { opacity: 1; } 25% { opacity: 0; } 50% { opacity: 0; } 75% { opacity: 0; } }
  @keyframes pFlame2 { 0%,100% { opacity: 0; } 25% { opacity: 1; } 50% { opacity: 0; } 75% { opacity: 0; } }
  @keyframes pFlame3 { 0%,100% { opacity: 0; } 25% { opacity: 0; } 50% { opacity: 1; } 75% { opacity: 0; } }
  @keyframes pFlame4 { 0%,100% { opacity: 0; } 25% { opacity: 0; } 50% { opacity: 0; } 75% { opacity: 1; } }

  /* Dither Ambient Pulse */
  .dither-pulse { animation: dPulse 1.8s step-end infinite; }
  @keyframes dPulse { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }

  /* Pixel Ember Flights */
  .e1 { animation: eFlight1 3s step-end infinite; }
  .e2 { animation: eFlight2 3.5s step-end infinite; }
  .e3 { animation: eFlight3 2.8s step-end infinite; }
  .e4 { animation: eFlight4 3.6s step-end infinite; }

  @keyframes eFlight1 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(-8px, -40px); opacity: 0.9; }
    80% { transform: translate(-16px, -84px); opacity: 0.6; }
    100% { transform: translate(-24px, -128px); opacity: 0; }
  }
  @keyframes eFlight2 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(12px, -36px); opacity: 0.9; }
    80% { transform: translate(20px, -76px); opacity: 0.6; }
    100% { transform: translate(28px, -120px); opacity: 0; }
  }
  @keyframes eFlight3 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(-4px, -44px); opacity: 0.9; }
    80% { transform: translate(-8px, -92px); opacity: 0.5; }
    100% { transform: translate(-12px, -136px); opacity: 0; }
  }
  @keyframes eFlight4 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(8px, -40px); opacity: 0.9; }
    80% { transform: translate(16px, -88px); opacity: 0.5; }
    100% { transform: translate(20px, -132px); opacity: 0; }
  }

  /* Title Blink */
  .title-blink { animation: tBlink 2.4s step-end infinite; }
  @keyframes tBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.65; } }
`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Dark Souls — Authentic Pixel Art Bonfire</title>
  <style><![CDATA[
${css}
  ]]></style>

  <!-- Dark Background -->
  <rect width="${W}" height="${H}" fill="${C.abyss}"/>

  <!-- Flagstone Ground Seams -->
  <rect y="${66 * S}" width="${W}" height="${(ROWS - 66) * S}" fill="${C.groundDark}"/>
  ${generatePavement()}

  <!-- Pixel Dither Ambient Glow Rings -->
  <g class="dither-pulse">
    ${generateDitherRings()}
  </g>

  <!-- Ash Mound with Buried Logs and Skulls -->
  ${generateAshMound()}

  <!-- Left Skull (Col 37, Row 61) -->
  ${parseMatrix(SKULL_MAP, SKULL_PAL, 36, 61)}

  <!-- Right Skull (Col 74, Row 62) -->
  ${parseMatrix(SKULL_MAP, SKULL_PAL, 74, 62)}

  <!-- Coiled Sword (Col 51, Row 18) -->
  ${parseMatrix(SWORD_MAP, SWORD_PAL, 51, 18)}

  <!-- 4-Frame Dancing Pixel Flame (Col 48, Row 24) -->
  <g class="fA">${parseMatrix(FLAME_1, FLAME_PAL, 48, 24)}</g>
  <g class="fB">${parseMatrix(FLAME_2, FLAME_PAL, 48, 24)}</g>
  <g class="fC">${parseMatrix(FLAME_3, FLAME_PAL, 48, 24)}</g>
  <g class="fD">${parseMatrix(FLAME_4, FLAME_PAL, 48, 24)}</g>

  <!-- Stepped Pixel Embers Floating Skyward -->
  ${generatePixelEmbers()}

  <!-- Pixel Art Title Header -->
  <g class="title-blink">
    <!-- Centered Pixel Diamond -->
    <rect x="${58 * S}" y="${6 * S}" width="${4 * S}" height="${4 * S}" fill="${C.swordGold}"/>
    <rect x="${59 * S}" y="${7 * S}" width="${2 * S}" height="${2 * S}" fill="${C.emberWhite}"/>
    <text x="${W / 2}" y="${14 * S}" font-family="'Press Start 2P', monospace" font-size="12" letter-spacing="4" fill="${C.swordGold}" text-anchor="middle">BONFIRE LIT</text>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svgContent, 'utf-8');
console.log('✨ Generated authentic 100% pixel-art bonfire.svg successfully!');
