/**
 * scripts/generate-code-achievements.mjs
 * Generates an authentic, distinct Dark Fantasy "Altar of Coding Honors":
 * - Instead of a duplicate single monolithic box, it renders 4 DISTINCT Relic Plaques
 * - Each plaque is an individual carved obsidian stone tablet with antique gold rivets
 * - Central illuminated Relic Shrine with elemental glowing auras (Flame, Ocean, Sunlight, Frost)
 * - 4 Hand-crafted 18x18 pixel art icons (scaled 2x to 36x36px):
 *   1. YOLO (Flaming Skull / Fearless Knight)
 *   2. PULL SHARK (Obsidian Shark Fin in Molten Gold)
 *   3. QUICKDRAW (Sunlight Lightning Bolt)
 *   4. ARCTIC CODE VAULT (Immortal Frost Crystal)
 * - Perfectly fitted typography with ZERO text truncation or overflow
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'code-achievements.svg');

const W = 890;
const H = 166;
const S = 2; // pixel scale for 18x18 icons -> 36x36px

// Individual Stone Plaque Generator (208px wide x 156px tall)
function generatePlaqueFrame(x, y, w, h, auraColor) {
  return `
    <!-- Stone Plaque Base -->
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f1318"/>
    <!-- Outer Stepped Charcoal Border -->
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#232932" stroke-width="2"/>
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="none" stroke="#161a20" stroke-width="1"/>

    <!-- Antique Gold Corner Rivets -->
    <rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 5}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 2}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 5}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>

    <!-- Top Shimmer Line -->
    <rect x="${x + 12}" y="${y + 1}" width="${w - 24}" height="1" fill="#3d2f19"/>
    <rect x="${x + w / 2 - 25}" y="${y + 1}" width="50" height="1" fill="#c9a876"/>
    <rect x="${x + w / 2 - 10}" y="${y + 1}" width="20" height="1" fill="#fff5cc"/>

    <!-- Relic Shrine Window (46x46px) -->
    <rect x="${x + w / 2 - 23}" y="${y + 12}" width="46" height="46" fill="#07090c"/>
    <rect x="${x + w / 2 - 23}" y="${y + 12}" width="46" height="46" fill="none" stroke="${auraColor}" stroke-width="1.5"/>
    <!-- Inner Aura Glow Corner Accents -->
    <rect x="${x + w / 2 - 22}" y="${y + 13}" width="2" height="2" fill="${auraColor}"/>
    <rect x="${x + w / 2 + 20}" y="${y + 13}" width="2" height="2" fill="${auraColor}"/>
    <rect x="${x + w / 2 - 22}" y="${y + 55}" width="2" height="2" fill="${auraColor}"/>
    <rect x="${x + w / 2 + 20}" y="${y + 55}" width="2" height="2" fill="${auraColor}"/>
  `;
}

// -------------------------------------------------------------
// 4 HAND-CRAFTED 18x18 CODING ACHIEVEMENT ICONS (DARK SOULS STYLE)
// -------------------------------------------------------------

// 1. YOLO (Flaming Skull / Fearless Knight)
const ICON_YOLO = [
  '.......kYYk.......',
  '......kYYYYk......',
  '.....kYYffYYk.....',
  '....kYYffffYYk....',
  '...kYYffWWffYYk...',
  '..kYYfwwwwwwfYYk..',
  '..kYYwkkwwkkwfYYk.',
  '.kYYfwwwkkwwwfYk..',
  '.kYYfwwwwwwwwfYk..',
  '..kYYfwwwwwwfYk...',
  '...kYYfwwwwfYk....',
  '...kYYfwkwkfYk....',
  '....kYYfwwfYk.....',
  '.....kYYffYYk.....',
  '......kYYYYk......',
  '.......kYYk.......',
  '........kk........',
  '..................',
];

// 2. PULL SHARK (Obsidian Shark Fin / Fork Conqueror)
const ICON_SHARK = [
  '........kk........',
  '.......kddk.......',
  '......kddddk......',
  '.....kddddddk.....',
  '....kddddddddk....',
  '...kddddddddddk...',
  '..kddddddddddddk..',
  '.kddddddddddddddk.',
  '.kddddddddddddddk.',
  '..kddddddddddddk..',
  '...kddddddddddk...',
  '..kddkddddddkddk..',
  '.kYYk.kddddk.kYYk.',
  'kYYYYkkkddkkkYYYYk',
  'kYYYYYYYYYYYYYYYYk',
  '.kYYkkYYYYYYYYkk..',
  '..kk..kkkkkkkk....',
  '..................',
];

// 3. QUICKDRAW (Sunlight Lightning Bolt / Instant Triage)
const ICON_QUICKDRAW = [
  '.......kWWk.......',
  '......kWWWWk......',
  '.....kWWYYWk......',
  '....kWWYYYk.......',
  '...kWWYYYk........',
  '..kWWYYYYkkkk.....',
  '.kWWYYYYYYYYk.....',
  '..kkkYYYYWWk......',
  '....kYYYWWk.......',
  '...kYYYWWk........',
  '..kYYYWWk.........',
  '.kYYYYWk..........',
  '.kYYYWk...........',
  '..kYWk............',
  '...kk.............',
  '..................',
  '..................',
  '..................',
];

// 4. ARCTIC CODE VAULT (Frost Monolith / 1,000-Yr Archive)
const ICON_VAULT = [
  '......kkkkkk......',
  '.....kCCCCCCk.....',
  '....kCCbbbbCCk....',
  '...kCCbbWWbbCCk...',
  '..kCCbbWWWWbbCCk..',
  '.kCCbbWWkkWWbbCCk.',
  '.kCCbbWWkkWWbbCCk.',
  '.kCCbbWWWWWWbbCCk.',
  '.kCCbbWWWWWWbbCCk.',
  '.kCCbbWWkkWWbbCCk.',
  '.kCCbbWWkkWWbbCCk.',
  '.kCCbbWWWWWWbbCCk.',
  '..kCCbbWWWWbbCCk..',
  '...kCCbbWWbbCCk...',
  '....kCCbbbbCCk....',
  '.....kCCCCCCk.....',
  '......kkkkkk......',
  '..................',
];

const PAL = {
  '.': null,
  'k': '#080b10', // black outline
  'd': '#3b4859', // slate shark grey
  'w': '#ffffff', // white
  'Y': '#f59e0b', // gold
  'f': '#f97316', // flame orange
  'C': '#38bdf8', // arctic cyan
  'b': '#0284c7', // deep ocean
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

// Card definitions: 4 plaques
const CARDS = [
  {
    x: 8,
    name: 'YOLO',
    badge: '[ UNLOCKED · GOLD ]',
    badgeColor: '#f59e0b',
    auraColor: '#f59e0b',
    sub1: 'Direct to main branch',
    sub2: 'Fearless prod deploy',
    matrix: ICON_YOLO,
  },
  {
    x: 230,
    name: 'Pull Shark',
    badge: '[ UNLOCKED · PRO ]',
    badgeColor: '#94a3b8',
    auraColor: '#94a3b8',
    sub1: 'Multi-branch merges',
    sub2: 'Distributed synthesis',
    matrix: ICON_SHARK,
  },
  {
    x: 452,
    name: 'Quickdraw',
    badge: '[ UNLOCKED · SPEED ]',
    badgeColor: '#f59e0b',
    auraColor: '#f59e0b',
    sub1: 'Issue closed in 5m',
    sub2: 'Instant triage &amp; hotfix',
    matrix: ICON_QUICKDRAW,
  },
  {
    x: 674,
    name: 'Arctic Vault',
    badge: '[ 1,000-YR ARCHIVE ]',
    badgeColor: '#38bdf8',
    auraColor: '#38bdf8',
    sub1: 'Preserved in ice',
    sub2: 'Immortal code heritage',
    matrix: ICON_VAULT,
  },
];

const CARD_W = 208;
const CARD_H = 156;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Engineering Honors &amp; Coding Achievements — radityabhardana</title>

  <style>
    .card-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 10px;
      letter-spacing: 0.6px;
      fill: #f0f6fc;
    }
    .card-badge {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7px;
      letter-spacing: 0.5px;
    }
    .card-sub {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 9.5px;
      fill: #8b949e;
    }
  </style>

  <!-- ================= 4 INDIVIDUAL RELIC PLAQUES ================= -->
  ${CARDS.map(c => `
    <g>
      <!-- Plaque Frame -->
      ${generatePlaqueFrame(c.x, 4, CARD_W, CARD_H, c.auraColor)}

      <!-- Centered Icon in Relic Shrine Window -->
      ${parseIcon(c.matrix, c.x + CARD_W / 2 - 18, 21)}

      <!-- Achievement Info (Centered & Comfortable) -->
      <text x="${c.x + CARD_W / 2}" y="80" text-anchor="middle" class="card-title">${c.name}</text>
      <text x="${c.x + CARD_W / 2}" y="98" text-anchor="middle" class="card-badge" fill="${c.badgeColor}">${c.badge}</text>
      <text x="${c.x + CARD_W / 2}" y="122" text-anchor="middle" class="card-sub">${c.sub1}</text>
      <text x="${c.x + CARD_W / 2}" y="138" text-anchor="middle" class="card-sub">${c.sub2}</text>
    </g>
  `).join('')}
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated 4 distinct Relic Plaques for code-achievements.svg successfully!');
