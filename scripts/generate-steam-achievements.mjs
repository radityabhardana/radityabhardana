/**
 * scripts/generate-steam-achievements.mjs
 * Generates an authentic Dark Souls™: Remastered Steam Achievement Showcase card:
 * - 890x154px full-width card matching codex-stats.svg and card-spectre-hero.svg
 * - Official Steam Achievement Showcase layout with Dark Fantasy aesthetic:
 *   - Header: "★ ACHIEVEMENT SHOWCASE — DARK SOULS™: REMASTERED"
 *   - Progress: "41 OF 41 (100%) COMPLETED" with glowing 100% progress bar
 *   - 4 Iconic Official Dark Souls Achievements:
 *     1. THE DARK SOUL (Platinum · All achievements completed)
 *     2. TO LINK THE FIRE (Gold · Reach 'To Link the Fire' ending)
 *     3. KNIGHT'S HONOR (Silver · Acquire all rare weapons)
 *     4. COVENANT: WARRIOR OF SUNLIGHT (Solar · Discover Sunlight covenant)
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'steam-achievements.svg');

const W = 890;
const H = 154;
const S = 2; // pixel scale for 18x18 icons -> 36x36px

// Stepped pixel frame with antique gold corner rivets
function generatePixelFrame(x, y, w, h) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#111418"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#262c35" stroke-width="2"/>
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="none" stroke="#181c22" stroke-width="1"/>
    <!-- Antique Gold Pixel Corner Rivets -->
    <rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 5}" y="${y + 2}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + 2}" y="${y + 5}" width="2" height="2" fill="#8a6833"/>

    <rect x="${x + w - 5}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 7}" y="${y + 2}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + w - 5}" y="${y + 5}" width="2" height="2" fill="#8a6833"/>

    <rect x="${x + 2}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 5}" y="${y + h - 4}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + 2}" y="${y + h - 7}" width="2" height="2" fill="#8a6833"/>

    <rect x="${x + w - 5}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 7}" y="${y + h - 4}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + w - 5}" y="${y + h - 7}" width="2" height="2" fill="#8a6833"/>
    <!-- Top Pixel Shimmer Line -->
    <rect x="${x + 16}" y="${y + 1}" width="${w - 32}" height="1" fill="#4d3a1f"/>
    <rect x="${x + w / 2 - 60}" y="${y + 1}" width="120" height="1" fill="#c9a876"/>
    <rect x="${x + w / 2 - 20}" y="${y + 1}" width="40" height="1" fill="#fff5cc"/>
  `;
}

// -------------------------------------------------------------
// 4 HAND-CRAFTED 18x18 PIXEL ART ACHIEVEMENT ICONS
// -------------------------------------------------------------

// 1. The Dark Soul (Platinum Soul with Winged Frame)
const ICON_PLATINUM = [
  '.....kkkkkkkk.....',
  '...kkTTTTTTTTkk...',
  '..kTTTTTTTTTTTTk..',
  '.kTTTddddddddTTTk.',
  '.kTTdwwwwwwwwdTTk.',
  'kTTdwwvvvvvvwwdTTk',
  'kTTdwvvBBBBvwwdTTk',
  'kTTdwvvBBBBvwwdTTk',
  'kTTdwvvBBBBvwwdTTk',
  'kTTdwvvBBBBvwwdTTk',
  'kTTdwvvBBBBvwwdTTk',
  'kTTdwwvvvvvvwwdTTk',
  '.kTTdwwwwwwwwdTTk.',
  '.kTTTddddddddTTTk.',
  '..kTTTTTTTTTTTTk..',
  '...kkTTTTTTTTkk...',
  '.....kkkkkkkk.....',
  '..................',
];

// 2. To Link the Fire (Radiant Bonfire & Coiled Sword)
const ICON_FIRE = [
  '........WW........',
  '.......WGGW.......',
  '......WGGYYW......',
  '.....WGGYYYYW.....',
  '....WGGYYOOYYW....',
  '....WGGYYOOYYW....',
  '...WGGYYOOFFYYW...',
  '...WGGYYOOFFYYW...',
  '..WGGYYOOFFFFYYW..',
  '..WGGYYOOFFFFYYW..',
  '..WGGYYOOFFFFYYW..',
  '..WGGYYOOFFFFYYW..',
  '..kYYkkkkkkkkYYk..',
  '.kYYkkddddddkkYYk.',
  'kYYkkkddddddkkkYYk',
  '.kddddddddddddddk.',
  '..kkddddddddddkk..',
  '....kkkkkkkkkk....',
];

// 3. Knight's Honor (Dual Crossed Greatswords Crest)
const ICON_KNIGHT = [
  'ksskk........kkssk',
  'ksddskk....kkdsdsk',
  '.ksddddskksddddsk.',
  '..ksddddssddddsk..',
  '...ksdddssdddsk...',
  '....kssdsdsssk....',
  '.....kssdsssk.....',
  '......kssssk......',
  '.....kddssddk.....',
  '....kdddkkdddk....',
  '...kdddk..kdddk...',
  '..kdddk....kdddk..',
  '.kdddk......kdddk.',
  'kddsk........ksddk',
  'ksddk........kddsk',
  'ksddk........kddsk',
  'ksskk........kkssk',
  '..................',
];

// 4. Covenant: Warrior of Sunlight (Holy Smiling Sun)
const ICON_SUN = [
  '........RR........',
  '...R...RRRR...R...',
  '....RRRRYYYRRR....',
  '..RRRYYYYYYYYRRR..',
  '..RRYYYYZZYYYYRR..',
  '.RRYYYZZZZZZYYYRR.',
  '.RRYYYZkkkkZYYYRR.',
  'RRYYYYZk..kZYYYYRR',
  'RRYYYYZk..kZYYYYRR',
  '.RRYYYZZZZZZYYYRR.',
  '.RRYYYYZkkZYYYYRR.',
  '..RRYYYYO.OYYYRR..',
  '..RRRYYYYYYYYRRR..',
  '....RRRRYYYRRR....',
  '...R...RRRR...R...',
  '........RR........',
  '..................',
  '..................',
];

const PAL = {
  '.': null,
  'k': '#080b10', // black outline
  'd': '#1b222c', // deep shadow
  's': '#8695a5', // mid silver
  'w': '#ffffff', // white
  'T': '#38bdf8', // platinum cyan light
  'v': '#0369a1', // deep cyan
  'B': '#0c4a6e', // navy dark
  'G': '#fde047', // bright yellow
  'Y': '#f59e0b', // gold
  'O': '#f97316', // orange
  'F': '#dc2626', // fire red
  'R': '#991b1b', // sun red
  'Z': '#fef08a', // light sun face
};

function parseIcon(matrix, startX, startY) {
  const rects = [];
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      const color = PAL[char];
      if (color) {
        rects.push(`<rect x="${startX + c * S}" y="${startY + r * S}" width="${S}" height="${S}" fill="${color}"/>`);
      }
    }
  }
  return rects.join('');
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Steam Achievement Showcase — Dark Souls™: Remastered</title>

  <style>
    .showcase-header {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 10.5px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .showcase-tag {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 9px;
      letter-spacing: 0.5px;
      fill: #e3b341;
    }
    .ach-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 9.5px;
      letter-spacing: 0.4px;
      fill: #f0f6fc;
    }
    .ach-badge {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7.5px;
      letter-spacing: 0.6px;
    }
    .ach-desc {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
    .badge-plat { fill: #38bdf8; }
    .badge-gold { fill: #f59e0b; }
    .badge-silv { fill: #94a3b8; }
    .badge-sun  { fill: #eab308; }
  </style>

  <!-- Stepped Pixel Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row: Steam Showcase Header -->
  <g transform="translate(24, 20)">
    <!-- Golden Star Pixel Icon -->
    <rect x="0" y="2" width="2" height="2" fill="#e3b341"/>
    <rect x="2" y="0" width="2" height="6" fill="#fff5cc"/>
    <rect x="4" y="2" width="2" height="2" fill="#e3b341"/>

    <text x="14" y="5" class="showcase-header">STEAM ACHIEVEMENT SHOWCASE — DARK SOULS&#8482;</text>
    <text x="842" y="5" text-anchor="end" class="showcase-tag">41 OF 41 (100%) UNLOCKED</text>
  </g>

  <!-- 100% Completion Gold Bar (20px to 870px = 850px wide) -->
  <g transform="translate(24, 30)">
    <!-- Background Track -->
    <rect x="0" y="0" width="842" height="4" fill="#181d24"/>
    <!-- Completed Gold Fill -->
    <rect x="0" y="0" width="842" height="4" fill="#e3b341"/>
    <!-- Subtle Shimmer Segment -->
    <rect x="360" y="0" width="120" height="4" fill="#fff5cc"/>
  </g>

  <!-- Horizontal Pixel Divider -->
  <rect x="20" y="42" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="41" width="4" height="3" fill="#c9a876"/>

  <!-- ================= 4 ACHIEVEMENT TILES ================= -->

  <!-- TILE 1: THE DARK SOUL (PLATINUM) -->
  <g transform="translate(24, 54)">
    <!-- Icon Box Frame -->
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
    ${parseIcon(ICON_PLATINUM, 4, 4)}

    <!-- Text Info -->
    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-title">The Dark Soul</text>
      <text x="0" y="28" class="ach-badge badge-plat">[ PLATINUM &#183; 100% ]</text>
      <text x="0" y="44" class="ach-desc">All achievements completed.</text>
    </g>
  </g>

  <!-- Vertical Divider 1 -->
  <rect x="238" y="52" width="1" height="84" fill="#1e242d"/>

  <!-- TILE 2: TO LINK THE FIRE (GOLD) -->
  <g transform="translate(254, 54)">
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
    ${parseIcon(ICON_FIRE, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-title">To Link the Fire</text>
      <text x="0" y="28" class="ach-badge badge-gold">[ UNLOCKED ]</text>
      <text x="0" y="44" class="ach-desc">Reach 'To Link Fire' ending.</text>
    </g>
  </g>

  <!-- Vertical Divider 2 -->
  <rect x="468" y="52" width="1" height="84" fill="#1e242d"/>

  <!-- TILE 3: KNIGHT'S HONOR (SILVER) -->
  <g transform="translate(484, 54)">
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
    ${parseIcon(ICON_KNIGHT, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-title">Knight's Honor</text>
      <text x="0" y="28" class="ach-badge badge-silv">[ UNLOCKED ]</text>
      <text x="0" y="44" class="ach-desc">Acquire all rare weapons.</text>
    </g>
  </g>

  <!-- Vertical Divider 3 -->
  <rect x="682" y="52" width="1" height="84" fill="#1e242d"/>

  <!-- TILE 4: WARRIOR OF SUNLIGHT (SOLAR) -->
  <g transform="translate(698, 54)">
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#eab308" stroke-width="1.5"/>
    ${parseIcon(ICON_SUN, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-title">Sunlight Covenant</text>
      <text x="0" y="28" class="ach-badge badge-sun">[ UNLOCKED ]</text>
      <text x="0" y="44" class="ach-desc">Discover Warrior of Sunlight.</text>
    </g>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated authentic Steam Achievement Showcase (steam-achievements.svg) successfully!');
