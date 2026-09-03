/**
 * scripts/create-pixel-bonfire.mjs
 * Generates an authentic, realistic pixel-art Dark Souls Bonfire SVG.
 * Features:
 * - 4-stage organic, turbulent flame animation with multiple licking tongues & detached sparks
 * - Convection-driven flame physics: left, center, and right flame spires dancing asymmetrically
 * - Multi-depth layering: back fire body + straight vertical sword + front licking tongues
 * - Dithered radiant ambient glow and embers
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

  // Fire palette (5 rich thermal levels)
  fireWhite: '#ffffff',
  fireYellow: '#fff176',
  fireOrange: '#ff8f00',
  fireRed: '#d00000',
  fireDark: '#6a040f',

  swordDark: '#1a1613',
  swordSteel: '#544b42',
  swordHi: '#9c9182',
  swordBright: '#ded7cd',
  swordGold: '#c9a876',
  swordGoldHi: '#f5d698',
};

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

// 2. STRAIGHT VERTICAL PIXEL SWORD
function generateStraightVerticalSword() {
  const rects = [];

  // --- A. POMMEL (Rows 13-16, centered at Col 59-60) ---
  const pommel = [
    [58, 13, 4, C.swordGold],
    [57, 14, 2, C.swordGold], [59, 14, 2, C.swordDark], [61, 14, 2, C.swordGold],
    [57, 15, 2, C.swordGold], [59, 15, 2, C.swordGoldHi], [61, 15, 2, C.swordGold],
    [58, 16, 4, C.swordGold],
  ];
  for (const [c, r, w, fill] of pommel) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // --- B. HILT / GRIP (Rows 17-22, Cols 59-60) ---
  for (let r = 17; r <= 22; r++) {
    const fill = (r % 2 === 0) ? C.swordDark : C.swordSteel;
    rects.push(`<rect x="${59 * S}" y="${r * S}" width="${2 * S}" height="${S}" fill="${fill}"/>`);
  }

  // --- C. STRAIGHT HORIZONTAL CROSSGUARD (Rows 23-25, Cols 49-70) ---
  const guard = [
    // Upper trim
    [52, 23, 16, C.swordGold],
    // Main solid crossbar
    [49, 24, 3, C.swordGoldHi], [52, 24, 16, C.swordSteel], [68, 24, 3, C.swordGoldHi],
    // Center medallion & lower bevel
    [58, 24, 4, C.swordGold],
    [50, 25, 3, C.swordGold], [53, 25, 14, C.swordDark], [67, 25, 3, C.swordGold],
    [59, 25, 2, C.swordGold],
  ];
  for (const [c, r, w, fill] of guard) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // --- D. STRAIGHT VERTICAL DOUBLE-EDGED BLADE (Rows 26 to 62) ---
  for (let r = 26; r <= 62; r++) {
    let edgeL = C.swordBright;
    let bevelL = C.swordHi;
    let ridge = C.swordSteel;
    let edgeR = C.swordDark;

    if (r >= 55) {
      edgeL = C.fireWhite;
      bevelL = C.fireWhite;
      ridge = C.fireYellow;
      edgeR = C.fireOrange;
    } else if (r >= 46) {
      edgeL = C.swordBright;
      bevelL = C.fireYellow;
      ridge = C.fireOrange;
      edgeR = C.fireRed;
    } else if (r >= 38) {
      edgeL = C.swordBright;
      bevelL = C.swordHi;
      ridge = C.swordSteel;
      edgeR = C.swordDark;
    }

    rects.push(`<rect x="${58 * S}" y="${r * S}" width="${S}" height="${S}" fill="${edgeL}"/>`);
    rects.push(`<rect x="${59 * S}" y="${r * S}" width="${S}" height="${S}" fill="${bevelL}"/>`);
    rects.push(`<rect x="${60 * S}" y="${r * S}" width="${S}" height="${S}" fill="${ridge}"/>`);
    rects.push(`<rect x="${61 * S}" y="${r * S}" width="${S}" height="${S}" fill="${edgeR}"/>`);
  }

  // Blade Tip (Row 63)
  rects.push(`<rect x="${59 * S}" y="${63 * S}" width="${2 * S}" height="${S}" fill="${C.fireWhite}"/>`);

  return rects.join('');
}

// 3. REALISTIC TURBULENT FLAME ANIMATION (44 cols x 40 rows)
// Col 38 to 81, Row 22 to 61
const FLAME_PAL = {
  W: C.fireWhite,
  Y: C.fireYellow,
  O: C.fireOrange,
  R: C.fireRed,
  D: C.fireDark,
};

// FRAME 1: Left tongue crests high and licks left, right tongue mid, center core surging
const FLAME_1 = [
  '..........D.................................',
  '.........DRD................................',
  '........DRORD..................D............',
  '.......DROYORD................DRD...........',
  '.......DROYYORD..............DRORD..........',
  '......DROYYYYORD............DROYORD.........',
  '......DROYYWYYORD..........DROYYORD.........',
  '.....DROYYWWYYORD.........DROYYYYORD........',
  '.....DROYYWWYYORD........DROYYWWYYORD.......',
  '....DROYYWWWWYYORD......DROYYWWWWYYORD......',
  '....DROYYWWWWYYORD.....DROYYWWWWWWYYORD.....',
  '...DROYYYWWWWYYYORD....DROYYWWWWWWYYYORD....',
  '...DROYYWWWWWWYYYORD..DROYYYWWWWWWYYYYORD...',
  '..DROYYYWWWWWWYYYYORD.DROYYYWWWWWWYYYYYORD..',
  '..DROYYYYWWWWWWYYYYORDROYYYYWWWWWWYYYYYYORD.',
  '.DROYYYYYWWWWWWYYYYYYROYYYYYWWWWWWYYYYYYORD.',
  '.DROYYYYYYWWWWWWYYYYYYOYYYYYWWWWWWYYYYYYORD.',
  'DROOYYYYYYWWWWWWWWYYYYOYYYYYWWWWWWYYYYYYOORD',
  'DROOYYYYYYWWWWWWWWYYYYOYYYYYWWWWWWYYYYYYOORD',
  'DROOYYYYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYYYOORD',
  'DROOYYYYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYYYOORD',
  '.DROOYYYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYYYOORD',
  '.DROOYYYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYYYOORD',
  '..DROOYYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYYOORD.',
  '..DROOYYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYYOORD.',
  '...DROOYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYOORD..',
  '...DROOYYYWWWWWWWWWWYYOYYYYYWWWWWWYYYYOORD..',
  '....DROOYYWWWWWWWWWWYYOYYYYYWWWWWWYYYOORD...',
  '.....DROOYYWWWWWWWWWYYOYYYYYWWWWWWYYOORD....',
  '......DROOYYWWWWWWWWYYOYYYYYWWWWWWYYOORD....',
  '.......DROOYYWWWWWWWYYOYYYYYWWWWWYYOORD.....',
  '........DROOYYWWWWWWYYOYYYYYWWWWYYOORD......',
  '.........DROOYYWWWWWYYOYYYYYWWWYYOORD.......',
  '..........DROOYYYYYYYYOYYYYYYYYYOORD........',
  '...........DROOOOOOOOOOOOOOOOOOOORD.........',
  '............DRRRRRRRRRRRRRRRRRRRRD..........',
  '.............DDDDDDDDDDDDDDDDDDDD...........',
  '............................................',
  '............................................',
  '............................................',
];

// FRAME 2: Left tongue detaches into ember cluster, center surges tall, right curls in
const FLAME_2 = [
  '........................D...................',
  '.......................DRD..................',
  '......................DRORD.................',
  '..........D..........DROYORD................',
  '.........DRD........DROYYORD................',
  '.........DRORD.....DROYYWWYYORD.............',
  '..........DRD.....DROYYWWWWYYORD............',
  '.................DROYYWWWWWWYYORD...........',
  '.......D........DROYYYWWWWWWYYYORD..........',
  '......DRD......DROYYYYWWWWWWYYYYORD.........',
  '.....DRORD....DROYYYYYWWWWWWYYYYYORD........',
  '....DROYORD..DROYYYYYYWWWWWWYYYYYYORD.......',
  '...DROYYORD..DROYYYYYYWWWWWWYYYYYYYORD......',
  '..DROYYWWYYORDROYYYYYYWWWWWWYYYYYYYYORD.....',
  '..DROYYWWYYORDROYYYYYYWWWWWWYYYYYYYYORD.....',
  '.DROYYYWWYYYORDYYYYYYYWWWWWWYYYYYYYYYORD....',
  '.DROYYYWWWWYYORDYYYYYYWWWWWWYYYYYYYYYORD....',
  'DROOYYYWWWWYYORDYYYYYYWWWWWWYYYYYYYYYOORD...',
  'DROOYYYYWWWWYYORDYYYYYWWWWWWYYYYYYYYYOORD...',
  'DROOYYYYWWWWYYORDYYYYYWWWWWWYYYYYYYYYOORD...',
  'DROOYYYYWWWWYYYORDYYYYWWWWWWYYYYYYYYYOORD...',
  '.DROYYYYWWWWYYYORDYYYYWWWWWWYYYYYYYYYOORD...',
  '.DROYYYYWWWWWWYYORDYYYWWWWWWYYYYYYYYYOORD...',
  '..DROOYYWWWWWWYYORDYYYWWWWWWYYYYYYYYOORD....',
  '..DROOYYWWWWWWYYORDYYYWWWWWWYYYYYYYYOORD....',
  '...DROOYYWWWWWYYORDYYYWWWWWWYYYYYYYOORD.....',
  '...DROOYYWWWWWYYORDYYYWWWWWWYYYYYYYOORD.....',
  '....DROOYYWWWWYYORDYYYWWWWWWYYYYYYOORD......',
  '.....DROOYYWWWYYORDYYYWWWWWWYYYYYOORD.......',
  '......DROOYYWWYYORDYYYWWWWWWYYYYOORD........',
  '.......DROOYYWYYORDYYYWWWWWWYYYOORD.........',
  '........DROOYYYYORDYYYWWWWWWYYOORD..........',
  '.........DROOYYYORDYYYWWWWWYYOORD...........',
  '..........DROOYYORDYYYWWWWYYOORD............',
  '...........DROOOOOOOOOOOOOOOOOORD...........',
  '............DRRRRRRRRRRRRRRRRRRD............',
  '.............DDDDDDDDDDDDDDDDDD.............',
  '............................................',
  '............................................',
  '............................................',
];

// FRAME 3: Center tongue curls right, right tongue crests tall, left builds from base
const FLAME_3 = [
  '..............................D.............',
  '.............................DRD............',
  '............................DRORD...........',
  '...........................DROYORD..........',
  '..........................DROYYORD..........',
  '.........................DROYYWWYYORD.......',
  '........................DROYYWWWWYYORD......',
  '.......................DROYYWWWWWWYYORD.....',
  '......................DROYYYWWWWWWYYYORD....',
  '.....................DROYYYYWWWWWWYYYYORD...',
  '.........D..........DROYYYYYWWWWWWYYYYYORD..',
  '........DRD........DROYYYYYYWWWWWWYYYYYYORD.',
  '.......DRORD......DROYYYYYYYWWWWWWYYYYYYORD.',
  '......DROYORD....DROYYYYYYYYWWWWWWYYYYYYORD.',
  '.....DROYYORD...DROYYYYYYYYYWWWWWWYYYYYYORD.',
  '....DROYYWWYYORDROYYYYYYYYYYWWWWWWYYYYYYORD.',
  '...DROYYYWWYYYORDYYYYYYYYYYYWWWWWWYYYYYYORD.',
  '..DROYYYYWWWWYYORDYYYYYYYYYYWWWWWWYYYYYYOORD',
  '..DROYYYYWWWWYYORDYYYYYYYYYYWWWWWWYYYYYYOORD',
  '.DROOYYYYWWWWYYORDYYYYYYYYYYWWWWWWYYYYYYOORD',
  '.DROOYYYYWWWWYYYORDYYYYYYYYYWWWWWWYYYYYYOORD',
  'DROOOYYYYWWWWYYYORDYYYYYYYYYWWWWWWYYYYYYOORD',
  'DROOOYYYYWWWWYYYORDYYYYYYYYYWWWWWWYYYYYYOORD',
  '.DROOYYYYWWWWYYYORDYYYYYYYYYWWWWWWYYYYYOORD.',
  '.DROOYYYYWWWWWWYYORDYYYYYYYYWWWWWWYYYYYOORD.',
  '..DROOYYYWWWWWWYYORDYYYYYYYYWWWWWWYYYYOORD..',
  '..DROOYYYWWWWWWYYORDYYYYYYYYWWWWWWYYYYOORD..',
  '...DROOYYWWWWWWYYORDYYYYYYYYWWWWWWYYYOORD...',
  '....DROOYYWWWWWYYORDYYYYYYYYWWWWWWYYOORD....',
  '.....DROOYYWWWWYYORDYYYYYYYYWWWWWWYYOORD....',
  '......DROOYYWWWYYORDYYYYYYYYWWWWWYYOORD.....',
  '.......DROOYYWWYYORDYYYYYYYYWWWWYYOORD......',
  '........DROOYYWYYORDYYYYYYYYWWWYYOORD.......',
  '.........DROOYYYORDYYYYYYYYYYYYYOORD........',
  '..........DROOOOOOOOOOOOOOOOOOOOORD.........',
  '...........DRRRRRRRRRRRRRRRRRRRRRD..........',
  '............DDDDDDDDDDDDDDDDDDDDD...........',
  '............................................',
  '............................................',
  '............................................',
];

// FRAME 4: Right tongue detaches, left flares wide, twin licking spires
const FLAME_4 = [
  '................................D...........',
  '...............................DRD..........',
  '........D......................DRORD........',
  '.......DRD......................DRD.........',
  '......DRORD.................................',
  '.....DROYORD.................D..............',
  '....DROYYORD................DRD.............',
  '...DROYYWWYYORD............DRORD............',
  '..DROYYYWWYYYORD..........DROYORD...........',
  '..DROYYYYWWWWYYORD.......DROYYORD...........',
  '.DROYYYYYWWWWYYYORD.....DROYYWWYYORD........',
  '.DROYYYYYYWWWWYYYORD...DROYYWWWWYYORD.......',
  'DROYYYYYYYWWWWYYYYORD..DROYYWWWWWWYYORD.....',
  'DROYYYYYYYYWWWWYYYYORDDROYYYWWWWWWYYYORD....',
  'DROYYYYYYYYWWWWYYYYYORDROYYYWWWWWWYYYYORD...',
  'DROYYYYYYYYYWWWWYYYYYORDROYYWWWWWWYYYYYORD..',
  'DROOYYYYYYYYWWWWYYYYYYORDROYYWWWWWWYYYYYORD.',
  'DROOYYYYYYYYWWWWYYYYYYORDROYYWWWWWWYYYYYOORD',
  '.DROOYYYYYYYWWWWYYYYYYORDROYYWWWWWWYYYYYOORD',
  '.DROOYYYYYYYWWWWWWYYYYORDROYYWWWWWWYYYYYOORD',
  '..DROOYYYYYYWWWWWWYYYYORDROYYWWWWWWYYYYYOORD',
  '..DROOYYYYYYWWWWWWYYYYORDROYYWWWWWWYYYYYOORD',
  '...DROOYYYYYWWWWWWYYYYORDROYYWWWWWWYYYYYOORD',
  '...DROOYYYYYWWWWWWYYYYORDROYYWWWWWWYYYYOORD.',
  '....DROOYYYYWWWWWWYYYYORDROYYWWWWWWYYYYOORD.',
  '....DROOYYYYWWWWWWYYYYORDROYYWWWWWWYYYYOORD.',
  '.....DROOYYYWWWWWWYYYYORDROYYWWWWWWYYYOORD..',
  '......DROOYYWWWWWWYYYYORDROYYWWWWWWYYOORD...',
  '......DROOYYWWWWWWYYYYORDROYYWWWWWWYYOORD...',
  '.......DROOYYWWWWWYYYORDROOYYWWWWWYYOORD....',
  '........DROOYYWWWWYYYORDROOYYWWWWYYOORD.....',
  '.........DROOYYWWWYYORD.ROOYYWWWYYOORD......',
  '..........DROOYYWWYYORD..ROOYYWWYYOORD......',
  '...........DROOYYYORD.....ROOYYYOORD........',
  '............DROOOOORD.....ROOOOOORD.........',
  '.............DRRRRRRD.....RRRRRRRD..........',
  '..............DDDDD.........DDDD............',
  '............................................',
  '............................................',
  '............................................',
];

// 4. FOREGROUND FLAME LICKS (Licking across the lower sword at row 54-62)
// Makes the sword physically submerged inside the fire
const FG_FLAME_PAL = {
  W: C.fireWhite,
  Y: C.fireYellow,
  O: C.fireOrange,
  R: C.fireRed,
};
const FG_FLAME_1 = [
  '..R......R..',
  '.ROR....ROR.',
  'ROYYO..ROYYO',
  'OYYWYO.OYYWO',
  'YYWWYYOYYWWY',
  'YWWWWYYYYWWY',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
];
const FG_FLAME_2 = [
  '.R......R...',
  'ROR....ROR..',
  'OYYO..ROYYO.',
  'YYWYO.OYYWYO',
  'YWWYYOYYWWYY',
  'WWWWYYYYWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
];
const FG_FLAME_3 = [
  '...R......R.',
  '..ROR....ROR',
  '.ROYYO..ROYY',
  'ROYYWYO.OYYW',
  'OYYWWYYOYYWW',
  'YYWWWWYYYYWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
];
const FG_FLAME_4 = [
  '....R....R..',
  '...ROR..ROR.',
  '..ROYYOROYO.',
  '.ROYYWYYWYO.',
  'ROYYWWYYWWYY',
  'YYWWWWYYYYWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
];

// Build Ash Mound pixel blocks
function generateAshMound() {
  const rects = [];
  const tiers = [
    { r: 58, cStart: 48, width: 24, fill: C.ashLight },
    { r: 59, cStart: 44, width: 32, fill: C.ashHi },
    { r: 60, cStart: 40, width: 40, fill: C.ashHi },
    { r: 61, cStart: 36, width: 48, fill: C.ashMid },
    { r: 62, cStart: 32, width: 56, fill: C.ashMid },
    { r: 63, cStart: 28, width: 64, fill: C.ashDark },
    { r: 64, cStart: 24, width: 72, fill: C.ashDark },
    { r: 65, cStart: 20, width: 80, fill: C.ashDark },
    { r: 66, cStart: 18, width: 84, fill: C.groundDark },
    { r: 67, cStart: 16, width: 88, fill: C.groundDark },
  ];
  for (const t of tiers) {
    rects.push(`<rect x="${t.cStart * S}" y="${t.r * S}" width="${t.width * S}" height="${S}" fill="${t.fill}"/>`);
  }

  // Glowing Coal pixels
  const coals = [
    [48, 60, 4, C.fireRed], [58, 61, 6, C.fireOrange], [66, 60, 5, C.fireRed],
    [44, 62, 5, C.fireOrange], [53, 62, 8, C.fireYellow], [64, 62, 6, C.fireOrange],
    [50, 63, 6, C.fireOrange], [58, 63, 7, C.fireYellow], [68, 63, 4, C.fireRed],
    [46, 64, 4, C.fireRed], [62, 64, 5, C.fireOrange], [56, 64, 4, C.fireYellow]
  ];
  for (const [c, r, w, fill] of coals) {
    rects.push(`<rect x="${c * S}" y="${r * S}" width="${w * S}" height="${S}" fill="${fill}"/>`);
  }

  // Charred logs (pixel blocks)
  const logs = [
    // Left log
    [34, 64, 9], [36, 63, 9], [38, 62, 8], [40, 61, 7], [42, 60, 6],
    // Right log
    [77, 64, 9], [75, 63, 9], [73, 62, 8], [71, 61, 7], [69, 60, 6],
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
  for (let r = 20; r < 76; r += 2) {
    for (let c = 16; c < 104; c += 2) {
      const dx = (c - cx);
      const dy = (r - cy) * 1.4;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 48 && dist > 18) {
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
  for (let r = 66; r < ROWS; r += 5) {
    lines.push(`<rect x="0" y="${r * S}" width="${W}" height="${S}" fill="${C.stoneSeam}"/>`);
  }
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
    { cls: 'e1', col: 54, row: 38, dur: '2.4s', dly: '0s' },
    { cls: 'e2', col: 65, row: 36, dur: '2.9s', dly: '0.3s' },
    { cls: 'e3', col: 50, row: 32, dur: '2.2s', dly: '0.7s' },
    { cls: 'e4', col: 69, row: 30, dur: '3.1s', dly: '1.1s' },
    { cls: 'e1', col: 57, row: 24, dur: '2.6s', dly: '1.5s' },
    { cls: 'e2', col: 63, row: 22, dur: '2.8s', dly: '1.9s' },
    { cls: 'e3', col: 48, row: 26, dur: '3.0s', dly: '0.5s' },
    { cls: 'e4', col: 72, row: 28, dur: '3.4s', dly: '1.3s' },
  ];
  return embers.map(e =>
    `<rect class="${e.cls}" x="${e.col * S}" y="${e.row * S}" width="${S}" height="${S}" fill="${C.fireYellow}" style="animation-duration:${e.dur};animation-delay:${e.dly};"/>`
  ).join('');
}

const css = `
  /* 4-Frame Dynamic Flame Animation (0.44s loop = ~9 FPS retro speed) */
  .fA { animation: pFlame1 0.44s step-end infinite; }
  .fB { animation: pFlame2 0.44s step-end infinite; }
  .fC { animation: pFlame3 0.44s step-end infinite; }
  .fD { animation: pFlame4 0.44s step-end infinite; }

  @keyframes pFlame1 { 0%,100% { opacity: 1; } 25% { opacity: 0; } 50% { opacity: 0; } 75% { opacity: 0; } }
  @keyframes pFlame2 { 0%,100% { opacity: 0; } 25% { opacity: 1; } 50% { opacity: 0; } 75% { opacity: 0; } }
  @keyframes pFlame3 { 0%,100% { opacity: 0; } 25% { opacity: 0; } 50% { opacity: 1; } 75% { opacity: 0; } }
  @keyframes pFlame4 { 0%,100% { opacity: 0; } 25% { opacity: 0; } 50% { opacity: 0; } 75% { opacity: 1; } }

  /* Dither Ambient Pulse */
  .dither-pulse { animation: dPulse 1.6s step-end infinite; }
  @keyframes dPulse { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }

  /* Pixel Ember Flights */
  .e1 { animation: eFlight1 2.5s step-end infinite; }
  .e2 { animation: eFlight2 2.8s step-end infinite; }
  .e3 { animation: eFlight3 2.3s step-end infinite; }
  .e4 { animation: eFlight4 3.0s step-end infinite; }

  @keyframes eFlight1 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(-8px, -36px); opacity: 0.9; }
    80% { transform: translate(-16px, -76px); opacity: 0.6; }
    100% { transform: translate(-24px, -116px); opacity: 0; }
  }
  @keyframes eFlight2 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(10px, -32px); opacity: 0.9; }
    80% { transform: translate(18px, -70px); opacity: 0.6; }
    100% { transform: translate(26px, -110px); opacity: 0; }
  }
  @keyframes eFlight3 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(-4px, -40px); opacity: 0.9; }
    80% { transform: translate(-8px, -84px); opacity: 0.5; }
    100% { transform: translate(-12px, -124px); opacity: 0; }
  }
  @keyframes eFlight4 {
    0% { transform: translate(0, 0); opacity: 0; }
    20% { opacity: 1; }
    50% { transform: translate(8px, -36px); opacity: 0.9; }
    80% { transform: translate(14px, -80px); opacity: 0.5; }
    100% { transform: translate(18px, -120px); opacity: 0; }
  }

  /* Title Blink */
  .title-blink { animation: tBlink 2.4s step-end infinite; }
  @keyframes tBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.65; } }
`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Dark Souls — Authentic Realistic Pixel Art Bonfire</title>
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

  <!-- Left Skull (Col 36, Row 61) -->
  ${parseMatrix(SKULL_MAP, SKULL_PAL, 36, 61)}

  <!-- Right Skull (Col 74, Row 62) -->
  ${parseMatrix(SKULL_MAP, SKULL_PAL, 74, 62)}

  <!-- 1. BACK FLAME: 4-Frame Dynamic Turbulent Flames (Col 38, Row 22) -->
  <g class="fA">${parseMatrix(FLAME_1, FLAME_PAL, 38, 22)}</g>
  <g class="fB">${parseMatrix(FLAME_2, FLAME_PAL, 38, 22)}</g>
  <g class="fC">${parseMatrix(FLAME_3, FLAME_PAL, 38, 22)}</g>
  <g class="fD">${parseMatrix(FLAME_4, FLAME_PAL, 38, 22)}</g>

  <!-- 2. STRAIGHT VERTICAL SWORD (Foreground, sharp and majestic) -->
  ${generateStraightVerticalSword()}

  <!-- 3. FOREGROUND FLAME LICKS (Licking around lower sword blade at Col 54, Row 55) -->
  <g class="fA">${parseMatrix(FG_FLAME_1, FG_FLAME_PAL, 54, 55)}</g>
  <g class="fB">${parseMatrix(FG_FLAME_2, FG_FLAME_PAL, 54, 55)}</g>
  <g class="fC">${parseMatrix(FG_FLAME_3, FG_FLAME_PAL, 54, 55)}</g>
  <g class="fD">${parseMatrix(FG_FLAME_4, FG_FLAME_PAL, 54, 55)}</g>

  <!-- 4. Stepped Pixel Embers Floating Skyward -->
  ${generatePixelEmbers()}

  <!-- Pixel Art Title Header -->
  <g class="title-blink">
    <!-- Centered Pixel Diamond -->
    <rect x="${58 * S}" y="${6 * S}" width="${4 * S}" height="${4 * S}" fill="${C.swordGold}"/>
    <rect x="${59 * S}" y="${7 * S}" width="${2 * S}" height="${2 * S}" fill="${C.fireWhite}"/>
    <text x="${W / 2}" y="${14 * S}" font-family="'Press Start 2P', monospace" font-size="12" letter-spacing="4" fill="${C.swordGold}" text-anchor="middle">BONFIRE LIT</text>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svgContent, 'utf-8');
console.log('✨ Generated realistic turbulent pixel-art bonfire.svg successfully!');
