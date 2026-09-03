/**
 * scripts/generate-code-achievements.mjs
 * Generates an authentic Dark Fantasy Pixel Art "Coding Achievements" card:
 * - Real GitHub coding achievements (YOLO, Pull Shark, Quickdraw, Arctic Code Vault)
 * - Art-directed and illustrated as legendary Dark Souls relics & trophies
 * - Stepped pixel stone frame, antique gold corner rivets, and top gold shimmer line
 * - 4 Hand-crafted 18x18 pixel art icons (scaled 2x to 36x36):
 *   1. YOLO (Fearless Abyss Strider — Flame Skull)
 *   2. PULL SHARK (Fork Conqueror — Molten Shark Fin)
 *   3. QUICKDRAW (Sunlight Reflex — Lightning Scroll)
 *   4. ARCTIC CODE VAULT (Scholar of Archive — Frost Crystal Monolith)
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
const H = 154;
const S = 2; // pixel scale for 18x18 icons -> 36x36px

// Stepped pixel frame with gold corner rivets
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
// 4 HAND-CRAFTED 18x18 CODING ACHIEVEMENT ICONS (DARK SOULS ART STYLE)
// -------------------------------------------------------------

// 1. YOLO (Flaming Skull / Fearless Knight — Merged to Main without review)
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

// 3. QUICKDRAW (Sunlight Lightning Bolt / Rapid Issue Dispatch)
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

// 4. ARCTIC CODE VAULT (Frost Monolith / Immortal 1,000-Year Archive)
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
  'd': '#334155', // slate shark grey
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Coding Achievements &amp; Repository Honors — radityabhardana</title>

  <style>
    .ach-header {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 10.5px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .ach-tag {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
    .ach-name {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 9px;
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
      font-size: 9.5px;
      fill: #8b949e;
    }
    .badge-gold   { fill: #f59e0b; }
    .badge-silver { fill: #94a3b8; }
    .badge-cyan   { fill: #38bdf8; }
  </style>

  <!-- Stepped Pixel Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row -->
  <g transform="translate(24, 20)">
    <!-- Gold Pixel Diamond -->
    <rect x="0" y="2" width="2" height="2" fill="#e3b341"/>
    <rect x="2" y="0" width="2" height="6" fill="#fff5cc"/>
    <rect x="4" y="2" width="2" height="2" fill="#e3b341"/>

    <text x="14" y="5" class="ach-header">ENGINEERING HONORS &amp; CODING ACHIEVEMENTS</text>
    <text x="842" y="5" text-anchor="end" class="ach-tag">GITHUB VERIFIED · SOULS CODEX</text>
  </g>

  <!-- Horizontal Pixel Divider with Diamond Accent -->
  <rect x="20" y="36" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="35" width="4" height="3" fill="#c9a876"/>

  <!-- ================= 4 CODING ACHIEVEMENT TILES ================= -->

  <!-- TILE 1: YOLO (Abyss Strider) -->
  <g transform="translate(24, 52)">
    <!-- Frame Box -->
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
    ${parseIcon(ICON_YOLO, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-name">YOLO</text>
      <text x="0" y="28" class="ach-badge badge-gold">[ UNLOCKED &#183; GOLD ]</text>
      <text x="0" y="44" class="ach-desc">Merged direct to main branch.</text>
      <text x="0" y="58" class="ach-desc">Fearless production deploy.</text>
    </g>
  </g>

  <!-- Vertical Divider 1 -->
  <rect x="238" y="46" width="1" height="88" fill="#1e242d"/>

  <!-- TILE 2: PULL SHARK (Fork Conqueror) -->
  <g transform="translate(254, 52)">
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
    ${parseIcon(ICON_SHARK, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-name">Pull Shark</text>
      <text x="0" y="28" class="ach-badge badge-silver">[ UNLOCKED &#183; PRO ]</text>
      <text x="0" y="44" class="ach-desc">Clean multi-branch merges.</text>
      <text x="0" y="58" class="ach-desc">Distributed code synthesis.</text>
    </g>
  </g>

  <!-- Vertical Divider 2 -->
  <rect x="468" y="46" width="1" height="88" fill="#1e242d"/>

  <!-- TILE 3: QUICKDRAW (Sunlight Reflex) -->
  <g transform="translate(484, 52)">
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
    ${parseIcon(ICON_QUICKDRAW, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-name">Quickdraw</text>
      <text x="0" y="28" class="ach-badge badge-gold">[ UNLOCKED &#183; SPEED ]</text>
      <text x="0" y="44" class="ach-desc">Closed issue within 5 mins.</text>
      <text x="0" y="58" class="ach-desc">Instant triage &amp; hotfix.</text>
    </g>
  </g>

  <!-- Vertical Divider 3 -->
  <rect x="682" y="46" width="1" height="88" fill="#1e242d"/>

  <!-- TILE 4: ARCTIC CODE VAULT (Scholar of Archive) -->
  <g transform="translate(698, 52)">
    <rect x="0" y="0" width="44" height="44" fill="#090c10"/>
    <rect x="0" y="0" width="44" height="44" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
    ${parseIcon(ICON_VAULT, 4, 4)}

    <g transform="translate(52, 0)">
      <text x="0" y="14" class="ach-name">Arctic Vault</text>
      <text x="0" y="28" class="ach-badge badge-cyan">[ 1,000-YR ARCHIVE ]</text>
      <text x="0" y="44" class="ach-desc">Code preserved in permafrost.</text>
      <text x="0" y="58" class="ach-desc">Immortal production heritage.</text>
    </g>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated authentic Dark Fantasy Coding Achievements (code-achievements.svg) successfully!');
