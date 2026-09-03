/**
 * scripts/generate-assets.mjs
 * -----------------------------------------------------------------
 * DARK SOULS // ASHEN ONE ASSET FACTORY
 * Zero-dependency Node.js pipeline to generate hand-crafted,
 * fully-animated, pixel-art SVGs for Raditya Bagus Hardana's profile.
 * 
 * Features:
 * - Deterministic pseudo-random generation for skies and ruins
 * - Optimized run-length encoded SVG paths from string-matrices
 * - Self-contained CSS keyframe animations (step-end / steps(n))
 * - Full-bleed 1012px GitHub README standard width
 * - Authentic Dark Souls palette: Abyss, Cinder, Aged Gold, Soul Mist
 * 
 * Usage: node scripts/generate-assets.mjs
 * -----------------------------------------------------------------
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'assets');

mkdirSync(join(ASSETS, 'scenes'), { recursive: true });
mkdirSync(join(ASSETS, 'plates'), { recursive: true });
mkdirSync(join(ASSETS, 'dividers'), { recursive: true });

/* ------------------------------------------------------------------ */
/* 1. PALETTE SYSTEM                                                  */
/* ------------------------------------------------------------------ */
const C = {
  abyss: '#070707',
  bg0: '#0d0d0d',
  bg1: '#141210',
  bg2: '#1c1815',
  bg3: '#28231d',
  stoneDark: '#1f1c19',
  stoneMid: '#342f2a',
  stoneHi: '#4d463e',
  stoneEdge: '#695f54',
  lineDark: '#3a2f1f',
  lineGold: '#78613d',

  goldDim: '#6b5433',
  goldMid: '#947547',
  gold: '#c9a876',
  goldHi: '#ecd2a4',
  goldShine: '#fff3db',

  bloodDark: '#420b0b',
  blood: '#731414',
  bloodHi: '#a82727',

  cinderDark: '#852800',
  cinder: '#d94e00',
  amber: '#f4a742',
  flameHi: '#ffc043',
  flameCore: '#fff5d6',

  soulDark: '#16283b',
  soulMid: '#2d537a',
  soul: '#528cb8',
  soulHi: '#8ac4e6',
  soulCore: '#eef8ff',

  ashDark: '#423d38',
  ash: '#706962',
  ashHi: '#9e968d',
};

const MONO_FONT = `'Press Start 2P', ui-monospace, 'Cascadia Mono', Consolas, monospace`;

/* ------------------------------------------------------------------ */
/* 2. CORE HELPERS & STRING-MAP SPRITE ENGINE                         */
/* ------------------------------------------------------------------ */

// Run-length encoded path compiler from 2D pixel string map
function px(map, palette, { x = 0, y = 0, s = 1, cls = '', opacity = 1 } = {}) {
  const byColor = {};
  for (let r = 0; r < map.length; r++) {
    const row = map[r];
    let c = 0;
    while (c < row.length) {
      const ch = row[c];
      const fill = palette[ch];
      if (!fill) { c++; continue; }
      let w = 1;
      while (c + w < row.length && row[c + w] === ch) w++;
      (byColor[fill] ||= []).push([c, r, w]);
      c += w;
    }
  }
  const parts = Object.entries(byColor).map(([fill, runs]) => {
    const d = runs.map(([rx, ry, rw]) => `M${x + rx * s} ${y + ry * s}h${rw * s}v${s}h${-rw * s}z`).join('');
    return `<path d="${d}" fill="${fill}"/>`;
  });
  const attrs = (cls ? ` class="${cls}"` : '') + (opacity !== 1 ? ` opacity="${opacity}"` : '');
  return `<g${attrs}>${parts.join('')}</g>`;
}

const svgOpen = (w, h, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"${extra}>`;

const styleBlock = (css) => `<style><![CDATA[\n${css.trim()}\n]]></style>`;

function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* 3. SPRITE DEFINITIONS (PIXEL-ART MATRICES)                         */
/* ------------------------------------------------------------------ */

// Ashen Knight Body & Armor (20x24)
const KNIGHT_BODY = [
  '........GG..........',
  '.......GssG.........',
  '......GssssG........',
  '......GsEEsG........', // EE: glowing eye slit
  '......GssssG........',
  '.......GGGG.........',
  '......SSSSSS........',
  '.....SSSSSSSS.......',
  '....SSSSSSSSSS......',
  '....SASSSSSSSA......',
  '....SASSGGSSSA......',
  '...SSAASSSSAASS.....',
  '...SSSSSSSSSSSS.....',
  '....SSSSSSSSSS......',
  '.....GG....GG.......',
  '.....SS....SS.......',
  '.....SS....SS.......',
  '.....SS....SS.......',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
];

const KNIGHT_LEGS_A = [
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '.....SS....SS.......',
  '....SSS.....SS......',
  '...SSSS......SS.....',
  '...SS.........SS....',
  '..GG...........GG...',
  '..GG...........GGG..',
  '....................',
  '....................',
];

const KNIGHT_LEGS_B = [
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '......SS...SS.......',
  '.....SS.....SSS.....',
  '....SS......SSSS....',
  '...SS.........SS....',
  '..GGG..........GG...',
  '..GGG..........GG...',
  '....................',
  '....................',
];

const KNIGHT_CAPE_A = [
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '...CC...............',
  '..CCCC..............',
  '.CCCCCC.............',
  '.CCCCCCC............',
  'CCCCCCCC............',
  'CCCCCCCC............',
  '.CCCCCCC............',
  '..CCCCCC............',
  '...CCCC.............',
  '....CC..............',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
];

const KNIGHT_CAPE_B = [
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '..CC................',
  '.CCCC...............',
  'CCCCCC..............',
  'CCCCCCC.............',
  'CCCCCCCC............',
  '.CCCCCCCC...........',
  '..CCCCCCC...........',
  '...CCCCCC...........',
  '....CCCC............',
  '.....CC.............',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
];

const KNIGHT_SWORD = [
  '...................W',
  '..................WW',
  '.................WW.',
  '................WW..',
  '...............WW...',
  '..............WW....',
  '.............WW.....',
  '............WW......',
  '...........WW.......',
  '..........WW........',
  '.........WW.........',
  '........gGg.........',
  '.......GgG..........',
  '......ggg...........',
  '.....HH.............',
  '....HH..............',
  '...HH...............',
  '..G.................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
  '....................',
];

const KNIGHT_PAL = {
  G: C.stoneHi,
  s: C.stoneMid,
  S: C.stoneMid,
  A: C.stoneDark,
  E: C.amber,
  C: C.blood,
  W: C.ashHi,
  g: C.goldMid,
  H: C.goldDim,
};

// Bonfire Coiled Sword & Flame Base (22x24)
const BONFIRE_BASE = [
  '..........W...........',
  '.........WWW..........',
  '..........W...........',
  '.........WWW..........',
  '..........W...........',
  '.........WWW..........',
  '..........W...........',
  '.........WWW..........',
  '..........W...........',
  '.........gGg..........',
  '........GgGgG.........',
  '.........ggg..........',
  '..........H...........',
  '.........HHH..........',
  '........LLLLLL........',
  '......LLLLBBLLLL......',
  '.....LLLBBBBBBLLL.....',
  '....LLLBBBBBBBBLLL....',
  '...LLLBBSSSSSSBBLLL...',
  '..LLBBSSSSSSSSSSBBLL..',
  '.LLBBSSSSSSSSSSSSBBLL.',
  'LLBBSSSSSSSSSSSSSSBBLL',
  'SSSSSSSSSSSSSSSSSSSSSS',
  'SSSSSSSSSSSSSSSSSSSSSS',
];

const BONFIRE_BASE_PAL = {
  W: C.ashHi,
  G: C.gold,
  g: C.goldMid,
  H: C.goldDim,
  L: C.stoneDark,
  B: C.bloodDark,
  S: C.ashDark,
};

// Bonfire Flame Frame 1 (18x18)
const FLAME_FRAME_1 = [
  '........FF........',
  '.......FFFF.......',
  '......FFAAFFF.....',
  '.....FFAAAAAFF....',
  '....FFAAYYYAAFF...',
  '...FFAAYYWWYYAFF..',
  '...FFAYYWWWWYYAF..',
  '..FFAYYWWWWWWYAAFF',
  '..FFAYYWWWWWWYAAFF',
  '..FAAYYWWWWWWYAAF.',
  '..FAAYYWWWWWWYAAF.',
  '...FAAYYWWWWYAAF..',
  '...FFAAYYWWYYAFF..',
  '....FFAAYYYAAFF...',
  '.....FFAAAAAFF....',
  '......FFAAFFF.....',
  '.......FFFF.......',
  '........FF........',
];

// Bonfire Flame Frame 2 (18x18 - shifted dynamic flame)
const FLAME_FRAME_2 = [
  '.......FF.........',
  '......FFFF........',
  '.....FFFAAFF......',
  '....FFAAAAAFF.....',
  '...FFAAYYYAAFF....',
  '..FFAAYYWWYYAAFF..',
  '..FAAYYWWWWYYAAF..',
  '.FAAYYWWWWWWYAAF..',
  '.FAAYYWWWWWWYAAF..',
  '..FAAYYWWWWWWYAAFF',
  '..FAAYYWWWWWWYAAFF',
  '...FFAAYYWWYYAFF..',
  '....FFAAYYYAAFF...',
  '.....FFAAAAAFF....',
  '......FFAAFFF.....',
  '.......FFFF.......',
  '........FF........',
  '..................',
];

const FLAME_PAL = {
  F: C.cinder,
  A: C.amber,
  Y: C.flameHi,
  W: C.flameCore,
};

// Soul Flame Wisp (for divider) (14x12)
const SOUL_WISP = [
  '....SSSS....',
  '...SHHHHS...',
  '..SHHWWwwS..',
  '.SHHWWWWwwS.',
  'SHHWWWWWWwwS',
  'SHWWWWWWWWwS',
  'SHWWWWWWWWwS',
  '.SHWWWWWWwS.',
  '..SHHWWwwS..',
  '...SHHHHS...',
  '....SSSS....',
  '.....SS.....',
];

const SOUL_PAL = {
  S: C.soulMid,
  H: C.soul,
  W: C.soulHi,
  w: C.soulCore,
};

// Gothic Pixel Medallion (16x16)
const MEDALLION = [
  '.......GG.......',
  '......GGGG......',
  '.....GGhhGG.....',
  '....GGhhhhGG....',
  '...GGhhEwhhGG...',
  '..GGhhEwwwwhhGG.',
  '.GGhhEwwwwEhhGG',
  'GGhhEwwwwwwEhhGG',
  'GGhhEwwwwwwEhhGG',
  '.GGhhEwwwwEhhGG',
  '..GGhhEwwwwhhGG.',
  '...GGhhEwhhGG...',
  '....GGhhhhGG....',
  '.....GGhhGG.....',
  '......GGGG......',
  '.......GG.......',
];

const MEDALLION_PAL = {
  G: C.stoneDark,
  h: C.goldMid,
  E: C.amber,
  w: C.flameCore,
};

/* ------------------------------------------------------------------ */
/* 4. ASSET: BANNER (1012x250)                                        */
/* ------------------------------------------------------------------ */
function generateBanner() {
  const W = 1012, H = 250;
  const rand = rng(133742);

  // Background Lothric Castle Ruins
  const ruins = [];
  let rx = -20;
  while (rx < W + 40) {
    const rw = 28 + Math.floor(rand() * 4) * 16;
    const rh = 40 + Math.floor(rand() * 5) * 18;
    const spire = rand() > 0.45;
    ruins.push(`<rect x="${rx}" y="${180 - rh}" width="${rw}" height="${rh}" fill="${C.bg2}"/>`);
    if (spire) {
      ruins.push(`<polygon points="${rx + rw/2 - 6},${180 - rh} ${rx + rw/2},${180 - rh - 28} ${rx + rw/2 + 6},${180 - rh}" fill="${C.bg2}"/>`);
      ruins.push(`<rect x="${rx + rw/2 - 1}" y="${180 - rh - 34}" width="2" height="8" fill="${C.stoneMid}"/>`);
    }
    // Ember windows
    const winCols = Math.floor(rw / 14);
    const winRows = Math.floor(rh / 20);
    for (let c = 0; c < winCols; c++) {
      for (let r = 0; r < winRows; r++) {
        if (rand() > 0.68) {
          const wx = rx + 6 + c * 14;
          const wy = 180 - rh + 8 + r * 20;
          const delay = (rand() * 5).toFixed(2);
          ruins.push(`<rect class="ruin-win" x="${wx}" y="${wy}" width="4" height="6" fill="${C.cinder}" style="animation-delay:${delay}s"/>`);
        }
      }
    }
    rx += rw + 4 + Math.floor(rand() * 3) * 8;
  }

  // Floating Ash Particles (36 embers)
  const embers = [];
  for (let i = 0; i < 36; i++) {
    const ex = Math.round(rand() * W);
    const ey = 140 + Math.round(rand() * 100);
    const size = rand() > 0.7 ? 3 : 2;
    const dur = (4 + rand() * 4).toFixed(2);
    const delay = (rand() * 6).toFixed(2);
    const color = rand() > 0.5 ? C.amber : (rand() > 0.5 ? C.cinder : C.ashHi);
    embers.push(`<rect class="spark" x="${ex}" y="${ey}" width="${size}" height="${size}" fill="${color}" style="animation-duration:${dur}s;animation-delay:${delay}s;"/>`);
  }

  // Fog generator
  const fogRow = (y, cls, op) => {
    let rects = '';
    for (let fx = -200; fx < W + 400; fx += 24) {
      const fw = 18 + Math.floor(rand() * 4) * 6;
      const fh = 6 + Math.floor(rand() * 3) * 4;
      rects += `<rect x="${fx}" y="${y}" width="${fw}" height="${fh}" fill="${C.bg1}"/>`;
    }
    return `<g class="${cls}" opacity="${op}">${rects}</g>`;
  };

  const css = `
    .txt-title { font-family: ${MONO_FONT}; font-weight: 700; }
    .ruin-win { animation: winPulse 4.5s step-end infinite; }
    @keyframes winPulse { 0%,100% { opacity: .7; } 50% { opacity: .2; } }

    .fogA { animation: driftA 48s linear infinite; }
    .fogB { animation: driftB 68s linear infinite; }
    @keyframes driftA { from { transform: translateX(0); } to { transform: translateX(-400px); } }
    @keyframes driftB { from { transform: translateX(-400px); } to { transform: translateX(0); } }

    /* Bonfire Flames */
    .f1 { animation: flameStepA 0.5s step-end infinite; }
    .f2 { animation: flameStepB 0.5s step-end infinite; }
    @keyframes flameStepA { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes flameStepB { 0%,100% { opacity: 0; } 50% { opacity: 1; } }

    /* Knight Walk Across Screen */
    .knight-walker { animation: knightWalk 24s linear infinite; }
    @keyframes knightWalk { from { transform: translateX(-90px); } to { transform: translateX(1060px); } }

    .k-legsA { animation: kLegsA 0.44s step-end infinite; }
    .k-legsB { animation: kLegsB 0.44s step-end infinite; }
    @keyframes kLegsA { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes kLegsB { 0%,100% { opacity: 0; } 50% { opacity: 1; } }

    .k-capeA { animation: kLegsA 0.44s step-end infinite; }
    .k-capeB { animation: kLegsB 0.44s step-end infinite; }

    /* Ash Embers rising */
    .spark { animation: ashRise 6s linear infinite; }
    @keyframes ashRise {
      0% { transform: translate(0, 0); opacity: 0; }
      15% { opacity: 0.9; }
      50% { transform: translate(-14px, -60px); opacity: 0.6; }
      100% { transform: translate(-28px, -130px); opacity: 0; }
    }

    /* Glows & Cursor */
    .cinder-glow { animation: cGlow 2.8s ease-in-out infinite; }
    @keyframes cGlow { 0%,100% { opacity: 0.4; } 50% { opacity: 0.85; } }

    .cur { animation: curBlink 1s step-end infinite; }
    @keyframes curBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
  `;

  return `${svgOpen(W, H)}
<title>Raditya Bagus Hardana — Dark Souls Pixel Banner</title>
<desc>Ashen Knight walking through Lothric ruins with burning bonfire and drifting embers.</desc>
${styleBlock(css)}

<defs>
  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${C.abyss}"/>
    <stop offset="65%" stop-color="${C.bg0}"/>
    <stop offset="100%" stop-color="${C.bg1}"/>
  </linearGradient>
  <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${C.stoneDark}"/>
    <stop offset="100%" stop-color="${C.abyss}"/>
  </linearGradient>
  <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="2" fill="${C.abyss}" opacity="0.3"/>
  </pattern>
</defs>

<!-- Sky -->
<rect width="${W}" height="${H}" fill="url(#skyGrad)"/>

<!-- Far Gothic Ruins -->
<g>${ruins.join('')}</g>

<!-- Fog Layer 1 -->
${fogRow(135, 'fogA', 0.65)}
${fogRow(150, 'fogB', 0.45)}

<!-- Ground Battleground -->
<rect y="180" width="${W}" height="${H - 180}" fill="url(#groundGrad)"/>
<rect y="180" width="${W}" height="3" fill="${C.stoneMid}"/>
<rect y="183" width="${W}" height="1" fill="${C.goldDim}" opacity="0.5"/>

<!-- Floating Ash Embers -->
<g>${embers.join('')}</g>

<!-- Central Static Bonfire -->
<g transform="translate(485, 126)">
  <!-- Ember Glow Aura -->
  <circle cx="27" cy="35" r="45" fill="${C.cinder}" opacity="0.18" class="cinder-glow"/>
  <!-- Bonfire Base & Coiled Sword -->
  ${px(BONFIRE_BASE, BONFIRE_BASE_PAL, { s: 2 })}
  <!-- Animated Flames -->
  <g transform="translate(4, -8)">
    ${px(FLAME_FRAME_1, FLAME_PAL, { s: 2, cls: 'f1' })}
    ${px(FLAME_FRAME_2, FLAME_PAL, { s: 2, cls: 'f2' })}
  </g>
</g>

<!-- Walking Ashen Knight -->
<g class="knight-walker" transform="translate(0, 118)">
  <g transform="translate(0,0)">
    ${px(KNIGHT_CAPE_A, KNIGHT_PAL, { s: 3, cls: 'k-capeA' })}
    ${px(KNIGHT_CAPE_B, KNIGHT_PAL, { s: 3, cls: 'k-capeB' })}
    ${px(KNIGHT_BODY, KNIGHT_PAL, { s: 3 })}
    ${px(KNIGHT_LEGS_A, KNIGHT_PAL, { s: 3, cls: 'k-legsA' })}
    ${px(KNIGHT_LEGS_B, KNIGHT_PAL, { s: 3, cls: 'k-legsB' })}
    ${px(KNIGHT_SWORD, KNIGHT_PAL, { s: 3, x: 10, y: -4 })}
  </g>
</g>

<!-- Left Gothic Medallion Accent -->
<g transform="translate(40, 48)">
  ${px(MEDALLION, MEDALLION_PAL, { s: 3 })}
</g>

<!-- Title Typography (Shadow + Glow + Fore) -->
<g transform="translate(108, 0)">
  <!-- Glow Shadow -->
  <text class="txt-title cinder-glow" x="0" y="80" font-size="28" letter-spacing="4" fill="${C.goldHi}" opacity="0.35">RADITYA BAGUS HARDANA</text>
  <!-- Foreground Crisp Text -->
  <text class="txt-title" x="-1" y="79" font-size="28" letter-spacing="4" fill="${C.goldShine}">RADITYA BAGUS HARDANA</text>

  <!-- Divider Line -->
  <rect x="0" y="94" width="460" height="3" fill="${C.lineGold}"/>
  <rect x="0" y="94" width="90" height="3" fill="${C.amber}"/>

  <!-- Subtitles -->
  <text class="txt-title" x="0" y="118" font-size="12" letter-spacing="3" fill="${C.amber}">SORCERER-PYROMANCER OF AUTOMATION</text>
  <text class="txt-title" x="0" y="136" font-size="10" letter-spacing="2" fill="${C.ashHi}">CHOSEN UNDEAD · INDONESIA · BONFIRE LIT</text>
  <rect class="cur" x="382" y="126" width="7" height="12" fill="${C.gold}"/>
</g>

<!-- Right Gothic Crest -->
<g transform="translate(900, 48)">
  ${px(MEDALLION, MEDALLION_PAL, { s: 3 })}
</g>

<!-- Scanline Texture Overlay -->
<rect width="${W}" height="${H}" fill="url(#scanlines)" pointer-events="none"/>

<!-- Gothic Frame Border -->
<rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" fill="none" stroke="${C.stoneMid}" stroke-width="3"/>
<rect x="5.5" y="5.5" width="${W - 11}" height="${H - 11}" fill="none" stroke="${C.goldDim}" stroke-width="1" opacity="0.6"/>

<!-- Stepped Corner Embellishments -->
<g fill="${C.gold}">
  <rect x="3" y="3" width="9" height="9"/>
  <rect x="${W - 12}" y="3" width="9" height="9"/>
  <rect x="3" y="${H - 12}" width="9" height="9"/>
  <rect x="${W - 12}" y="${H - 12}" width="9" height="9"/>
</g>

</svg>`;
}

/* ------------------------------------------------------------------ */
/* 5. ASSET: DIVIDER (1012x30) with TRAVELING SOUL WISP               */
/* ------------------------------------------------------------------ */
function generateDivider() {
  const W = 1012, H = 30;
  const dashes = [];
  for (let x = 16; x < W - 16; x += 32) {
    dashes.push(`<rect x="${x}" y="13" width="16" height="3" fill="${C.lineDark}"/>`);
    dashes.push(`<rect x="${x + 20}" y="14" width="6" height="1" fill="${C.goldDim}"/>`);
  }

  const css = `
    .soul-glide { animation: soulTravel 14s linear infinite; }
    @keyframes soulTravel {
      from { transform: translateX(-40px); }
      to { transform: translateX(1040px); }
    }
    .wisp-pulse { animation: wPulse 1.2s ease-in-out infinite; }
    @keyframes wPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
    .center-glow { animation: cPulse 2s ease-in-out infinite; }
    @keyframes cPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
  `;

  return `${svgOpen(W, H)}
<title>Dark Souls Gothic Section Divider</title>
${styleBlock(css)}

<rect width="${W}" height="${H}" fill="${C.bg0}"/>

<!-- Dashes -->
<g>${dashes.join('')}</g>

<!-- Central Rune Diamond -->
<g class="center-glow" transform="translate(${W / 2 - 12}, 3)">
  ${px(MEDALLION, MEDALLION_PAL, { s: 1.5 })}
</g>

<!-- Traveling Soul Wisp -->
<g class="soul-glide" transform="translate(0, 3)">
  <g class="wisp-pulse">
    ${px(SOUL_WISP, SOUL_PAL, { s: 1.8 })}
  </g>
</g>

<!-- Terminus Diamonds -->
<g fill="${C.gold}">
  <polygon points="4,15 10,11 16,15 10,19"/>
  <polygon points="${W - 16},15 ${W - 10},11 ${W - 4},15 ${W - 10},19"/>
</g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* 6. ASSET: CHAPTER PLATES (1012x80)                                 */
/* ------------------------------------------------------------------ */
const PLATES = [
  { id: 'plate-character', ch: 'CHAPTER I', title: 'CHARACTER SHEET', sub: 'THE CHOSEN UNDEAD OF AUTOMATION' },
  { id: 'plate-stats', ch: 'CHAPTER II', title: 'ATTRIBUTES & STATS', sub: 'SOULS LEVEL & CAPABILITIES' },
  { id: 'plate-equipment', ch: 'CHAPTER III', title: 'ARSENAL & EQUIPMENT', sub: 'LANGUAGES, RUNTIMES, TOOLS' },
  { id: 'plate-bosses', ch: 'CHAPTER IV', title: 'BOSSES DEFEATED', sub: 'FEATS & REPOSITORIES SLAIN' },
  { id: 'plate-covenant', ch: 'CHAPTER V', title: 'COVENANT OF AUTOMATONS', sub: 'UNBROKEN CREED & PROTOCOLS' },
  { id: 'plate-battle-log', ch: 'CHAPTER VI', title: 'BATTLE LOG & TROPHIES', sub: 'RECORD OF GLORY & STREAKS' },
  { id: 'plate-summon', ch: 'CHAPTER VII', title: 'GOLDEN SUMMON SIGN', sub: 'LEAVE A MARK TO CALL FORTH' },
];

function generatePlate(p) {
  const W = 1012, H = 84;
  const css = `
    .p-text { font-family: ${MONO_FONT}; font-weight: 700; text-anchor: middle; }
    .gem-glow { animation: gemPulse 2.4s ease-in-out infinite; }
    @keyframes gemPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
  `;

  return `${svgOpen(W, H)}
<title>${p.ch} — ${p.title}</title>
${styleBlock(css)}

<!-- Dark Stone Tablet Background -->
<rect width="${W}" height="${H}" fill="${C.bg0}"/>
<rect x="8" y="8" width="${W - 16}" height="${H - 16}" fill="${C.stoneDark}"/>

<!-- Pattern Hairlines -->
<rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="${C.stoneMid}" stroke-width="2"/>
<rect x="20" y="20" width="${W - 40}" height="${H - 40}" fill="none" stroke="${C.lineDark}" stroke-width="1"/>

<!-- Corner Stepped Brackets -->
<g fill="${C.gold}">
  <rect x="10" y="10" width="8" height="8"/>
  <rect x="${W - 18}" y="10" width="8" height="8"/>
  <rect x="10" y="${H - 18}" width="8" height="8"/>
  <rect x="${W - 18}" y="${H - 18}" width="8" height="8"/>
</g>

<!-- Left Decorative Flank Medallion -->
<g transform="translate(180, 22)">
  ${px(MEDALLION, MEDALLION_PAL, { s: 2.5 })}
</g>

<!-- Center Chapter & Title -->
<g transform="translate(${W / 2}, 0)">
  <!-- Chapter Roman / Heading -->
  <text class="p-text" y="28" font-size="10" letter-spacing="4" fill="${C.goldMid}">${p.ch}</text>
  <!-- Main Title -->
  <text class="p-text gem-glow" y="48" font-size="18" letter-spacing="3" fill="${C.goldShine}">${p.title}</text>
  <!-- Subtitle -->
  <text class="p-text" y="66" font-size="8" letter-spacing="2" fill="${C.ashHi}">${p.sub}</text>
</g>

<!-- Right Decorative Flank Medallion -->
<g transform="translate(${W - 220}, 22)">
  ${px(MEDALLION, MEDALLION_PAL, { s: 2.5 })}
</g>

</svg>`;
}

/* ------------------------------------------------------------------ */
/* 7. ASSET: STANDALONE BONFIRE (480x260)                             */
/* ------------------------------------------------------------------ */
function generateBonfireScene() {
  const W = 480, H = 260;
  const rand = rng(9991);
  const embers = [];
  for (let i = 0; i < 24; i++) {
    const ex = 200 + Math.round(rand() * 80);
    const ey = 180 + Math.round(rand() * 40);
    const dur = (3 + rand() * 3).toFixed(2);
    const delay = (rand() * 4).toFixed(2);
    embers.push(`<rect class="spark" x="${ex}" y="${ey}" width="3" height="3" fill="${rand() > 0.5 ? C.amber : C.flameHi}" style="animation-duration:${dur}s;animation-delay:${delay}s"/>`);
  }

  const css = `
    .f1 { animation: fStepA 0.45s step-end infinite; }
    .f2 { animation: fStepB 0.45s step-end infinite; }
    @keyframes fStepA { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes fStepB { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
    .spark { animation: ashRise 4.5s linear infinite; }
    @keyframes ashRise {
      0% { transform: translate(0,0); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translate(-20px, -110px); opacity: 0; }
    }
    .glow { animation: gPulse 2.4s ease-in-out infinite; }
    @keyframes gPulse { 0%,100% { opacity: 0.25; } 50% { opacity: 0.65; } }
  `;

  return `${svgOpen(W, H)}
<title>Dark Souls Bonfire Lit</title>
${styleBlock(css)}
<rect width="${W}" height="${H}" fill="${C.bg0}"/>

<!-- Ground Ash Mound -->
<ellipse cx="240" cy="220" rx="140" ry="24" fill="${C.stoneDark}"/>
<circle cx="240" cy="180" r="70" fill="${C.cinder}" class="glow"/>

<!-- Coiled Sword & Wood Base -->
<g transform="translate(195, 120)">
  ${px(BONFIRE_BASE, BONFIRE_BASE_PAL, { s: 4 })}
  <g transform="translate(8, -14)">
    ${px(FLAME_FRAME_1, FLAME_PAL, { s: 4, cls: 'f1' })}
    ${px(FLAME_FRAME_2, FLAME_PAL, { s: 4, cls: 'f2' })}
  </g>
</g>

<!-- Sparks -->
<g>${embers.join('')}</g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* 8. ASSET: STANDALONE PIXEL KNIGHT (360x220)                        */
/* ------------------------------------------------------------------ */
function generateKnightScene() {
  const W = 360, H = 220;
  const css = `
    .idle { animation: kIdle 2.2s step-end infinite; }
    @keyframes kIdle { 0%,100% { transform: translateY(0); } 50% { transform: translateY(2px); } }
    .sword-gleam { animation: sGleam 2.8s step-end infinite; }
    @keyframes sGleam { 0%,100% { opacity: 0.8; } 50% { opacity: 1; } }
    .eye-cinder { animation: eCinder 1.6s step-end infinite; }
    @keyframes eCinder { 0%,100% { fill: ${C.amber}; } 50% { fill: ${C.flameCore}; } }
  `;

  return `${svgOpen(W, H)}
<title>Ashen Knight of Automation</title>
${styleBlock(css)}
<rect width="${W}" height="${H}" fill="${C.bg0}"/>

<!-- Shadow -->
<ellipse cx="180" cy="190" rx="55" ry="12" fill="${C.stoneDark}"/>

<!-- Animated Knight Figure -->
<g class="idle" transform="translate(140, 50)">
  ${px(KNIGHT_CAPE_A, KNIGHT_PAL, { s: 4 })}
  ${px(KNIGHT_BODY, KNIGHT_PAL, { s: 4 })}
  ${px(KNIGHT_LEGS_A, KNIGHT_PAL, { s: 4 })}
  ${px(KNIGHT_SWORD, KNIGHT_PAL, { s: 4, x: 12, y: -6, cls: 'sword-gleam' })}
</g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* 9. ASSET: GOLDEN SUMMON SIGN (480x180)                             */
/* ------------------------------------------------------------------ */
function generateSummonSign() {
  const W = 480, H = 180;
  const css = `
    .aura { animation: sAura 2.6s ease-in-out infinite; }
    @keyframes sAura { 0%,100% { opacity: 0.35; } 50% { opacity: 0.85; } }
    .runes { animation: rBlink 1.8s step-end infinite; }
    @keyframes rBlink { 0%,100% { opacity: 0.9; } 50% { opacity: 0.6; } }
  `;

  return `${svgOpen(W, H)}
<title>Golden Summon Sign</title>
${styleBlock(css)}
<rect width="${W}" height="${H}" fill="${C.bg0}"/>

<!-- Ground Shadow -->
<ellipse cx="${W/2}" cy="${H/2}" rx="180" ry="50" fill="${C.goldDim}" opacity="0.12"/>
<ellipse cx="${W/2}" cy="${H/2}" rx="140" ry="36" fill="${C.gold}" opacity="0.25" class="aura"/>

<!-- Concentric Rings & Glyphs -->
<g class="runes" stroke="${C.gold}" fill="none" stroke-width="2">
  <rect x="80" y="40" width="320" height="100" stroke-width="2"/>
  <rect x="110" y="55" width="260" height="70" stroke-width="1" stroke="${C.goldHi}"/>
  <line x1="80" y1="40" x2="110" y2="55"/>
  <line x1="400" y1="40" x2="370" y2="55"/>
  <line x1="80" y1="140" x2="110" y2="125"/>
  <line x1="400" y1="140" x2="370" y2="125"/>
</g>

<!-- Central Golden Summon Glyph -->
<g transform="translate(${W/2 - 24}, ${H/2 - 24})">
  ${px(MEDALLION, MEDALLION_PAL, { s: 3 })}
</g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* 10. COMPILATION RUNNER                                             */
/* ------------------------------------------------------------------ */
console.log('⚔️  Starting Dark Souls SVG Asset Generation...');

// 1. Banner
writeFileSync(join(ASSETS, 'scenes', 'banner.svg'), generateBanner(), 'utf-8');
console.log('✓ Generated assets/scenes/banner.svg');

// 2. Divider
writeFileSync(join(ASSETS, 'dividers', 'divider.svg'), generateDivider(), 'utf-8');
console.log('✓ Generated assets/dividers/divider.svg');

// 3. Chapter Plates
for (const p of PLATES) {
  writeFileSync(join(ASSETS, 'plates', `${p.id}.svg`), generatePlate(p), 'utf-8');
  console.log(`✓ Generated assets/plates/${p.id}.svg`);
}

// 4. Standalone Scenes
writeFileSync(join(ASSETS, 'scenes', 'bonfire.svg'), generateBonfireScene(), 'utf-8');
console.log('✓ Generated assets/scenes/bonfire.svg');

writeFileSync(join(ASSETS, 'scenes', 'knight-pixel.svg'), generateKnightScene(), 'utf-8');
console.log('✓ Generated assets/scenes/knight-pixel.svg');

writeFileSync(join(ASSETS, 'scenes', 'summonsign.svg'), generateSummonSign(), 'utf-8');
console.log('✓ Generated assets/scenes/summonsign.svg');

console.log('✨ All Dark Souls pixel assets successfully forged!');
