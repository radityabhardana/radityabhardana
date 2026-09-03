/**
 * scripts/create-pixel-knight-bonfire.mjs
 * Generates an authentic 2D Pixel Art scene inspired by the iconic Dark Souls chibi illustration:
 * - Left: Sacred Bonfire with ash mound, protruding bones/ribs, coiled sword, 4-frame dynamic flames & embers
 * - Right: Adorable Chibi Elite Knight sitting peacefully on the ground with outstretched legs and cute boot soles
 * - Top: Glowing "BONFIRE LIT" title in gold ember typography
 * - Smooth CSS animations: turbulent fire convection, rising embers, and subtle gentle knight breathing loop
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'bonfire.svg');

// Canvas dimensions: 600 x 360
const W = 600;
const H = 360;

// Pixel Scale S = 4
const S = 4;

// -------------------------------------------------------------
// 1. PALETTES
// -------------------------------------------------------------

// Fire Palette
const FIRE_PAL = {
  '.': null,
  'k': '#3a0800', // deep dark ember rim
  'R': '#8b1400', // dark red
  'F': '#d93800', // ember red
  'O': '#f76a00', // flame orange
  'Y': '#ffaa00', // bright orange gold
  'G': '#ffd233', // intense yellow
  'W': '#fffbeb', // core white heat
};

// Knight Palette (Astora Elite Knight)
const KNIGHT_PAL = {
  '.': null,
  'k': '#080b10', // black outline
  'd': '#18202c', // deep armor shadow
  'm': '#334155', // mid armor steel
  's': '#64748b', // silver steel
  'h': '#94a3b8', // light highlight steel
  'w': '#f1f5f9', // white specular shine
  'v': '#05070a', // deep visor slit
  'g': '#382a10', // dark gold shadow
  'G': '#a1782f', // antique gold
  'Y': '#f0b832', // bright gold
  'c': '#451212', // dark crimson scarf
  'C': '#802222', // crimson cloth
  'b': '#0f172a', // navy surcoat shadow
  'B': '#1e293b', // navy surcoat mid
  'U': '#2e4166', // navy surcoat light
  'l': '#2b180a', // dark boot leather
  'L': '#543015', // mid boot leather
  'H': '#824c24', // light boot leather
  'f': '#d95a00', // warm fire glow reflection
};

// -------------------------------------------------------------
// 2. PIXEL MATRICES
// -------------------------------------------------------------

// 4-Frame Turbulent Fire Sprites (24 cols x 34 rows)
const FLAME_FRAMES = [
  // Frame 1
  [
    '...........WW...........',
    '..........WWWW..........',
    '.........WWGGWW.........',
    '........WWGGGGWW........',
    '.......WGGYYYYGGW.......',
    '......WGGYYYYYYGGW......',
    '.....WGGYYOOOOYYGGW.....',
    '....WGGYYOOOOOOYYGGW....',
    '...WGGYYOOFFFFOOYYGGW...',
    '..WGGYYOOFFRRFFOOYYGGW..',
    '..GGYYOOFFRRRRFFOOYYGG..',
    '.GGYYOOFFRR..RRFFOOYYGG.',
    '.GGYYOOFFRR..RRFFOOYYGG.',
    'GYYOOFFRR......RRFFOOYYG',
    'GYYOOFFRR......RRFFOOYYG',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    '.YYOOFFRR......RRFFOOYY.',
    '.YYOOFFRR......RRFFOOYY.',
    '..YYOOFFRR....RRFFOOYY..',
    '..GYYOOFFRR..RRFFOOYYG..',
    '...GYYOOFFRRRRFFOOYYG...',
    '....GGYYOOFFFFFFOOYYG...',
    '.....GGYYOOOOOOOOYYG....',
    '......GGYYYYYYYYYYG.....',
    '.......GGGYYYYYYGGG......',
    '........GGGGGGGGGG......',
    '.........GGGGGGGG.......',
    '..........GGGGGG........',
    '...........GGGG.........',
    '............GG..........',
  ],
  // Frame 2 (Turbulent Sway Left)
  [
    '..........WW............',
    '.........WWWW...........',
    '........WWGGWW..........',
    '.......WWGGGGWW...W.....',
    '......WGGYYYYGGW.WW.....',
    '.....WGGYYYYYYGGWGW.....',
    '....WGGYYOOOOYYGGWW.....',
    '...WGGYYOOOOOOYYGGW.....',
    '..WGGYYOOFFFFOOYYGGW....',
    '.WGGYYOOFFRRFFOOYYGGW...',
    '.GGYYOOFFRRRRFFOOYYGG...',
    'GGYYOOFFRR..RRFFOOYYGG..',
    'GGYYOOFFRR..RRFFOOYYGG..',
    'GYYOOFFRR....RRFFOOYYG..',
    'YYOOFFRR......RRFFOOYYG.',
    'YYOOFFRR......RRFFOOYY..',
    'YYOOFFRR.......RRFFOOYY.',
    'YYOOFFRR.......RRFFOOYY.',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    '.YYOOFFRR......RRFFOOYY.',
    '.YYOOFFRR......RRFFOOYY.',
    '..YYOOFFRR....RRFFOOYY..',
    '...YYOOFFRR..RRFFOOYYG..',
    '....GYYOOFFRRRRFFOOYYG..',
    '.....GGYYOOFFFFFFOOYYG..',
    '......GGYYOOOOOOOOYYG...',
    '.......GGYYYYYYYYYYG....',
    '........GGGYYYYYYGGG....',
    '.........GGGGGGGGGG.....',
    '..........GGGGGGGG......',
    '...........GGGGGG.......',
    '............GGGG........',
    '.............GG.........',
  ],
  // Frame 3 (Core Flare High)
  [
    '...........WW...........',
    '..........WWWW..........',
    '.........WWWWWW.........',
    '........WWGGGGWW........',
    '.......WGGYYYYGGW.......',
    '......WGGYYYYYYGGW......',
    '.....WGGYYOOOOYYGGW.....',
    '....WGGYYOOOOOOYYGGW....',
    '...WGGYYOOFFFFOOYYGGW...',
    '..WGGYYOOFFRRFFOOYYGGW..',
    '..GGYYOOFFRRRRFFOOYYGG..',
    '.GGYYOOFFRR..RRFFOOYYGG.',
    '.GGYYOOFFRR..RRFFOOYYGG.',
    'GYYOOFFRR......RRFFOOYYG',
    'GYYOOFFRR......RRFFOOYYG',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    '.YYOOFFRR......RRFFOOYY.',
    '..YYOOFFRR....RRFFOOYY..',
    '...YYOOFFRR..RRFFOOYY...',
    '....GYYOOFFRRRRFFOOYY...',
    '.....GYYOOFFFFFFOOYYG...',
    '......GGYYOOOOOOOOYYG...',
    '.......GGYYYYYYYYYYG....',
    '........GGGYYYYYYGGG....',
    '.........GGGGGGGGGG.....',
    '..........GGGGGGGG......',
    '...........GGGGGG.......',
    '............GGGG........',
    '.............GG.........',
    '..............G.........',
    '........................',
  ],
  // Frame 4 (Turbulent Sway Right)
  [
    '............WW..........',
    '...........WWWW.........',
    '..........WWGGWW........',
    '.....W...WWGGGGWW.......',
    '.....WW.WGGYYYYGGW......',
    '.....WGWGGYYYYYYGGW.....',
    '.....WWGGYYOOOOYYGGW....',
    '.....WGGYYOOOOOOYYGGW...',
    '....WGGYYOOFFFFOOYYGGW..',
    '...WGGYYOOFFRRFFOOYYGGW.',
    '...GGYYOOFFRRRRFFOOYYGG.',
    '..GGYYOOFFRR..RRFFOOYYGG',
    '..GGYYOOFFRR..RRFFOOYYGG',
    '..GYYOOFFRR....RRFFOOYYG',
    '.GYYOOFFRR......RRFFOOYY',
    '..YYOOFFRR......RRFFOOYY',
    '.YYOOFFRR.......RRFFOOYY',
    '.YYOOFFRR.......RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    'YYOOFFRR........RRFFOOYY',
    '.YYOOFFRR......RRFFOOYY.',
    '.YYOOFFRR......RRFFOOYY.',
    '..YYOOFFRR....RRFFOOYY..',
    '..GYYOOFFRR..RRFFOOYY...',
    '..GYYOOFFRRRRFFOOYYG....',
    '..GYYOOFFFFFFOOYYGG.....',
    '...GYYOOOOOOOOYYGG......',
    '....GYYYYYYYYYYGG.......',
    '....GGGYYYYYYGGG........',
    '.....GGGGGGGGGG.........',
    '......GGGGGGGG..........',
    '.......GGGGGG...........',
    '........GGGG............',
    '.........GG.............',
  ],
];

// Foreground Licking Flame Sprites at sword base (14 cols x 12 rows)
const FG_FLAME = [
  '.....WW.......',
  '....WGGW......',
  '...WGGYYW...W.',
  '..WGGYYOOW.WW.',
  '.WGGYYOOFFWGGW',
  'WGGYYOOFFRRFFW',
  'GGYYOOFFRRRRFW',
  'GYYOOFFRR..RFW',
  'YYOOFFRR....RW',
  'YYOOFFRR....RW',
  '.YYOOFFRR..RW.',
  '..GYYOOFFRRW..',
];

// Chibi Elite Knight Sitting Matrix (38 cols x 46 rows)
// Facing slightly left toward the fire, sitting comfortably with outstretched legs & visible boot soles
const CHIBI_KNIGHT = [
  '..............kkkkkkkkk...............',
  '...........kkkswwwwwwwskkk............',
  '.........kkshwwwwwwwwwwwshkk..........',
  '........ksshhhhhhhhhhhhhhsssk.........',
  '.......kshhhhmmmmmmmmmmmmhhhsk........',
  '......kshhhmmddddddddddddmmhhhsk......',
  '.....kshhhmddddddddddddddddmhhhsk.....',
  '....kshhmddddddddddddddddddddmhhsk....',
  '....kshmddddddddddddddddddddddmhsk....',
  '...kshmddddddddddddddddddddddddmhsk...',
  '...kshmddkkkkkkkkkkkkkkkkkkkdddmhsk...',
  '...kshmddkvvvvvvvvvvvvvvvvvkdddmhsk...',
  '...kshmddkvvvvvvvvvvvvvvvvvkdddmhsk...',
  '...kshmddkkkkkkkkkkkkkkkkkkkdddmhsk...',
  '...kshmdddsmsmsmsmsmsmsmsmsddddmhsk...',
  '....kshmddddddddddddddddddddddmhsk....',
  '....kshmddkdkdkdkdkdkdkdkdkdddmhsk....',
  '.....kshmmddddddddddddddddddmmhsk.....',
  '......ksshmmmmmmmmmmmmmmmmmmhssk......',
  '.......kksshsssssssssssssshhskk.......',
  '.........kkkshhshshshshshskkk.........',
  '...........kkkcccccccccckkk...........',
  '.........kkccCCCCCCCYCCCCkk...........',
  '.......kkcCCCCCCCCCYYYYCCCCkk.........',
  '......kcCCCCCCCCCCYYYYYYCCCCck........',
  '.....kccmsssssmCCCYYYYYYCcsssmkk......',
  '....kssmsssssssmmCCYCCmmssssssmkk.....',
  '...kssmssssssssssmBkBmsssssssssmk.....',
  '...ksshssssssssssbBBbssssssssshsk.....',
  '..kshhsssssssssssbBBbsssssssssshhsk...',
  '..kshhsssssssmssbBBBBbssssssssshhsk...',
  '..kshhsssssmdddmbBBBBbmssssssmshhsk...',
  '..ksshsssmdddddmkBBBBkmdddddmmshhsk...',
  '...kksssmddddddmkBBBBkmdddddmksskk....',
  '....kkkssssssssmkBBBBkmsssssssskk.....',
  '.....kllllllllkbbBBBBbbkllllllllk.....',
  '....kLLLLLLLLLkbbBBBBbbkLLLLLLLLLk....',
  '...kLLHHHHHHHLLkbbBBbbkLLHHHHHHHLLk...',
  '..kLLHHwwwwwHHLLkbbbbkLLHHwwwwwHHLLk..',
  '..kLHHwLLLLLLwHLLkkkkLLHwLLLLLLwHLLk..',
  '..kLHHwLLLLLLwHLLkmmkLLHwLLLLLLwHLLk..',
  '..kLHHwLLLLLLwHLLksskLLHwLLLLLLwHLLk..',
  '..kLLHHwwwwwHHLLksssskkLLHHwwwwwHHLLk.',
  '...kLLHHHHHHHLLkssssssskLLHHHHHHHLLk..',
  '....kLLLLLLLLLkssssssssskLLLLLLLLLk...',
  '.....kkkkkkkkkssssssssssskkkkkkkkk....',
];

// Helper to convert matrix to SVG rects
function parseMatrix(matrix, palette, startX, startY, pixelSize = S) {
  const rects = [];
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      const color = palette[char];
      if (color) {
        rects.push(`<rect x="${startX + c * pixelSize}" y="${startY + r * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`);
      }
    }
  }
  return rects.join('');
}

// Generate the Coiled Sword Planted in the Mound
function generateCoiledSword(cx, cy) {
  const rects = [];
  // Ring / Looped Pommel at top
  // cx, cy is the center of the ring pommel
  const pommel = [
    '..YYYY..',
    '.YYwwYY.',
    'YYw..wYY',
    'YYw..wYY',
    '.YYwwYY.',
    '..YYYY..',
  ];
  rects.push(parseMatrix(pommel, KNIGHT_PAL, cx - 4 * S, cy - 18 * S));

  // Hilt
  for (let r = 0; r < 4; r++) {
    rects.push(`<rect x="${cx - 1 * S}" y="${cy - 12 * S + r * S}" width="${2 * S}" height="${S}" fill="#f0b832"/>`);
  }

  // Crossguard (curved medieval crossguard)
  const crossguard = [
    '..kYYk........kYYk..',
    '.kYYYYkkkkkkkkYYYYk.',
    'kYYYYYYYYYYYYYYYYYYk',
    '.kYYYYkkkkkkkkYYYYk.',
  ];
  rects.push(parseMatrix(crossguard, KNIGHT_PAL, cx - 10 * S, cy - 8 * S));

  // Coiled/Twisted Blade with Molten Ember Ribbons (downward into the ash)
  // 24 pixel rows
  for (let r = 0; r < 24; r++) {
    const y = cy - 4 * S + r * S;
    // Core iron blade (width 3S)
    rects.push(`<rect x="${cx - 1.5 * S}" y="${y}" width="${3 * S}" height="${S}" fill="#64748b"/>`);
    rects.push(`<rect x="${cx - 0.5 * S}" y="${y}" width="${1 * S}" height="${S}" fill="#94a3b8"/>`);

    // Coiled spiraling ember ribbon around the blade
    const spiralOffset = Math.sin(r * 0.7) * 2;
    rects.push(`<rect x="${cx + (spiralOffset - 1) * S}" y="${y}" width="${2 * S}" height="${S}" fill="${r > 16 ? '#fff5cc' : '#ffaa00'}"/>`);
    rects.push(`<rect x="${cx + (spiralOffset - 0.5) * S}" y="${y}" width="${1 * S}" height="${S}" fill="#ffffff"/>`);
  }

  return rects.join('');
}

// Generate the Ash Mound with protruding bones/ribs
function generateAshMound(cx, baseY) {
  const rects = [];

  // Ash Mound tiers
  const tiers = [
    { w: 20, y: baseY - 24, fill: '#334155' },
    { w: 32, y: baseY - 20, fill: '#334155' },
    { w: 46, y: baseY - 16, fill: '#1e293b' },
    { w: 60, y: baseY - 12, fill: '#1e293b' },
    { w: 76, y: baseY - 8,  fill: '#0f172a' },
    { w: 92, y: baseY - 4,  fill: '#0f172a' },
    { w: 108, y: baseY,     fill: '#090d16' },
  ];

  for (const t of tiers) {
    rects.push(`<rect x="${cx - (t.w / 2) * S}" y="${t.y}" width="${t.w * S}" height="${4}" fill="${t.fill}"/>`);
  }

  // White Bones & Ribs protruding from the ash (inspired by the art!)
  // Left protruding rib cage curves
  const rib1 = [
    '..WW..',
    '.WWk..',
    'WWk...',
    'WWk...',
    '.WWk..',
    '..WWk.',
  ];
  rects.push(parseMatrix(rib1, KNIGHT_PAL, cx - 38 * S, baseY - 14));

  const rib2 = [
    '...WW.',
    '..WWk.',
    '.WWk..',
    '.WWk..',
    '..WWk.',
    '...WWk',
  ];
  rects.push(parseMatrix(rib2, KNIGHT_PAL, cx - 28 * S, baseY - 18));

  // Bone segment on right
  const boneRight = [
    'kWWk..kWWk',
    'kWWWWWWWWk',
    'kWWk..kWWk',
  ];
  rects.push(parseMatrix(boneRight, KNIGHT_PAL, cx + 18 * S, baseY - 8));

  return rects.join('');
}

// Floating rising pixel embers
function generatePixelEmbers() {
  const embers = [
    { x: 155, y: 130, c: '#ffaa00', d: '0s', dur: '2.4s' },
    { x: 175, y: 110, c: '#fff5cc', d: '0.6s', dur: '2.1s' },
    { x: 190, y: 95,  c: '#ff7700', d: '1.2s', dur: '2.7s' },
    { x: 145, y: 80,  c: '#ffd233', d: '1.8s', dur: '2.3s' },
    { x: 210, y: 120, c: '#ff5500', d: '0.4s', dur: '2.9s' },
    { x: 170, y: 60,  c: '#ffffff', d: '1.5s', dur: '2.2s' },
    { x: 130, y: 140, c: '#ff9900', d: '0.9s', dur: '2.5s' },
  ];

  return embers.map((e, idx) => `
    <rect class="ember ember-${idx}" x="${e.x}" y="${e.y}" width="4" height="4" fill="${e.c}" style="animation: emberFloat ${e.dur} ease-in-out infinite ${e.d};"/>
  `).join('');
}

// -------------------------------------------------------------
// 3. ASSEMBLE FULL SCENE
// -------------------------------------------------------------
const bonfireCenterX = 175;
const groundY = 285;
const knightStartX = 290;
const knightStartY = 110;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Bonfire Lit — Dark Souls Chibi Knight &amp; Bonfire</title>
  <defs>
    <!-- Dark Vignette Background Gradient -->
    <radialGradient id="caveGlow" cx="30%" cy="65%" r="70%">
      <stop offset="0%" stop-color="#241408" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#140d07" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0a0807" stop-opacity="1"/>
    </radialGradient>

    <!-- Warm Firelight Floor Reflection -->
    <radialGradient id="floorGlow" cx="29%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#5c2606" stop-opacity="0.75"/>
      <stop offset="35%" stop-color="#2b1406" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0d0a08" stop-opacity="0"/>
    </radialGradient>

    <!-- Glowing Title Gradient -->
    <linearGradient id="goldTitle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff8e7"/>
      <stop offset="40%" stop-color="#f4a742"/>
      <stop offset="100%" stop-color="#c9a876"/>
    </linearGradient>

    <!-- Filter for Heavenly Ember Title Glow -->
    <filter id="emberGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    /* 4-Frame Dynamic Flame Animation (Convection Physics) */
    .f1, .f2, .f3, .f4 { display: none; }
    @keyframes flameCycle {
      0%, 24.9%   { opacity: 1; display: block; }
      25%, 100%   { opacity: 0; display: none; }
    }
    .f1 { animation: flameCycle 0.52s infinite; }
    .f2 { animation: flameCycle 0.52s infinite -0.39s; }
    .f3 { animation: flameCycle 0.52s infinite -0.26s; }
    .f4 { animation: flameCycle 0.52s infinite -0.13s; }

    /* Knight Gentle Breathing Idle Loop */
    .chibi-knight {
      animation: knightBreathe 3.4s ease-in-out infinite;
      transform-origin: ${knightStartX + 76}px ${groundY}px;
    }
    @keyframes knightBreathe {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-3px); }
    }

    /* Floating Rising Embers */
    @keyframes emberFloat {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 0.2;
      }
      50% {
        transform: translate(6px, -24px) scale(1.2);
        opacity: 1;
      }
      100% {
        transform: translate(-4px, -52px) scale(0.6);
        opacity: 0;
      }
    }

    /* Ambient Pulsing Title */
    .title-aura {
      animation: titlePulse 2.8s ease-in-out infinite;
    }
    @keyframes titlePulse {
      0%, 100% { opacity: 0.88; }
      50%      { opacity: 1; }
    }
  </style>

  <!-- 1. Background Atmosphere -->
  <rect width="${W}" height="${H}" fill="url(#caveGlow)"/>
  <!-- Floor Warmth -->
  <ellipse cx="220" cy="${groundY + 15}" rx="280" ry="50" fill="url(#floorGlow)"/>

  <!-- Ground Line Pixel Shadow -->
  <rect x="0" y="${groundY + 28}" width="${W}" height="${H - groundY - 28}" fill="#0a0807"/>
  <line x1="0" y1="${groundY + 28}" x2="${W}" y2="${groundY + 28}" stroke="#1f160e" stroke-width="2"/>

  <!-- 2. "BONFIRE LIT" Title Header (Faithful to Illustration) -->
  <g class="title-aura" filter="url(#emberGlow)">
    <text x="${W / 2}" y="48" font-family="'Press Start 2P', Georgia, monospace" font-size="20" letter-spacing="8" fill="url(#goldTitle)" text-anchor="middle">BONFIRE LIT</text>
  </g>

  <!-- 3. Shadow under Bonfire & Knight -->
  <!-- Bonfire Ash Mound Shadow -->
  <ellipse cx="${bonfireCenterX}" cy="${groundY + 6}" rx="120" ry="22" fill="#000000" opacity="0.6"/>
  <!-- Knight Ground Shadow -->
  <ellipse cx="${knightStartX + 76}" cy="${groundY + 6}" rx="84" ry="20" fill="#000000" opacity="0.65"/>

  <!-- 4. Sacred Bonfire -->
  <!-- Ash Mound with Protruding Ribs & Bones -->
  ${generateAshMound(bonfireCenterX, groundY)}

  <!-- Coiled Sword (center of ash mound) -->
  ${generateCoiledSword(bonfireCenterX, groundY - 32)}

  <!-- 4-Frame Dynamic Animated Turbulent Flame (Col 175 - 48 = 127, Row 110) -->
  <g class="f1">${parseMatrix(FLAME_FRAMES[0], FIRE_PAL, bonfireCenterX - 48 * (S / 4), 116, S)}</g>
  <g class="f2">${parseMatrix(FLAME_FRAMES[1], FIRE_PAL, bonfireCenterX - 48 * (S / 4), 116, S)}</g>
  <g class="f3">${parseMatrix(FLAME_FRAMES[2], FIRE_PAL, bonfireCenterX - 48 * (S / 4), 116, S)}</g>
  <g class="f4">${parseMatrix(FLAME_FRAMES[3], FIRE_PAL, bonfireCenterX - 48 * (S / 4), 116, S)}</g>

  <!-- Foreground Flame Licking Lower Sword Hilt -->
  <g class="f1">${parseMatrix(FG_FLAME, FIRE_PAL, bonfireCenterX - 28, groundY - 56, S)}</g>
  <g class="f3">${parseMatrix(FG_FLAME, FIRE_PAL, bonfireCenterX - 26, groundY - 58, S)}</g>

  <!-- Floating Rising Pixel Embers -->
  ${generatePixelEmbers()}

  <!-- 5. Adorable Chibi Elite Knight Sitting Down (Right Side) -->
  <g class="chibi-knight">
    ${parseMatrix(CHIBI_KNIGHT, KNIGHT_PAL, knightStartX, knightStartY, S)}
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated authentic 2D Pixel Art Chibi Knight & Bonfire scene successfully!');
