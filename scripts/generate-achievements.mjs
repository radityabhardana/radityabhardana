/**
 * scripts/generate-achievements.mjs
 * Generates an authentic Dark Fantasy Pixel Art "Lord Souls & Achievements" milestone card:
 * - 890x120px full-width card matching codex-stats.svg & card-spectre-hero.svg
 * - Stepped pixel stone frame, antique gold corner rivets, and top gold shimmer
 * - 4 Hand-crafted 16x16 pixel Lord Soul relics:
 *   1. Soul of Flame (99.9% Uptime Reliability)
 *   2. Soul of Lightning (100K+ Events Dispatched)
 *   3. Soul of the Void (0-Sec Manual Intervention)
 *   4. Soul of Sorcery (100% Type-Safe Architecture)
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'achievements.svg');

const W = 890;
const H = 124;
const S = 2; // scale for 16x16 icons -> 32x32px

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

// 1. Soul of Flame (Fire Red/Orange/Yellow)
const SOUL_FLAME = [
  '.....kYYYYk.....',
  '....kYYYYYYk....',
  '...kYYffffYYk...',
  '..kYYffffffffk..',
  '..kYffWWWWffYk..',
  '.kYffWWWWWWffYk.',
  '.kYffWWWWWWffYk.',
  '.kYffffWWffffYk.',
  '..kYffffffffYk..',
  '..kYYffffffYYk..',
  '...kYYYffYYYk...',
  '....kYYYYYYk....',
  '.....kYYYYk.....',
  '......kYYk......',
  '.......kk.......',
  '................',
];

// 2. Soul of Lightning (Sunlight Gold/White)
const SOUL_LIGHTNING = [
  '.......kWWk.....',
  '......kWWWWk....',
  '.....kWWYYWk....',
  '....kWWYYYk.....',
  '...kWWYYYk......',
  '..kWWYYYYkkkk...',
  '.kWWYYYYYYYYk...',
  '..kkkYYYYWWk....',
  '....kYYYWWk.....',
  '...kYYYWWk......',
  '..kYYYWWk.......',
  '.kYYYYWk........',
  '.kYYYWk.........',
  '..kYWk..........',
  '...kk...........',
  '................',
];

// 3. Soul of the Abyss (Void Purple/Violet)
const SOUL_VOID = [
  '.....kPPPPk.....',
  '....kPPvvPPk....',
  '...kPPvvvvPPk...',
  '..kPPvvWWvvPPk..',
  '..kPvvWWWWvvPk..',
  '.kPvvWWkkWWvvPk.',
  '.kPvvWWkkWWvvPk.',
  '.kPvvWWWWWWvvPk.',
  '..kPvvWWWWvvPk..',
  '..kPPvvWWvvPPk..',
  '...kPPvvvvPPk...',
  '....kPPvvPPk....',
  '.....kPPPPk.....',
  '......kPPk......',
  '.......kk.......',
  '................',
];

// 4. Soul of Sorcery (Cyan/Crystal Blue)
const SOUL_CRYSTAL = [
  '......kCCk......',
  '.....kCCCCk.....',
  '....kCCbbCCk....',
  '...kCCbbbbCCk...',
  '..kCCbbWWbbCCk..',
  '.kCCbbWWWWbbCCk.',
  'kCCbbWWWWWWbbCCk',
  '.kCCbbWWWWbbCCk.',
  '..kCCbbWWbbCCk..',
  '...kCCbbbbCCk...',
  '....kCCbbCCk....',
  '.....kCCCCk.....',
  '......kCCk......',
  '.......kk.......',
  '................',
  '................',
];

const PALETTE = {
  '.': null,
  'k': '#080b10',
  'W': '#ffffff',
  'Y': '#f7b928',
  'f': '#f97316',
  'P': '#a855f7',
  'v': '#6b21a8',
  'C': '#38bdf8',
  'b': '#0284c7',
};

function parseMatrix(matrix, startX, startY) {
  const rects = [];
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      const color = PALETTE[char];
      if (color) {
        rects.push(`<rect x="${startX + c * S}" y="${startY + r * S}" width="${S}" height="${S}" fill="${color}"/>`);
      }
    }
  }
  return rects.join('');
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Lord Souls &amp; System Milestones — radityabhardana</title>

  <style>
    .px-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .px-tag {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
    .px-metric {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 13.5px;
      letter-spacing: 0.5px;
      fill: #e3b341;
    }
    .px-label {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7.5px;
      letter-spacing: 0.6px;
      fill: #c9a876;
    }
    .px-sub {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
  </style>

  <!-- Stepped Pixel Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row -->
  <g transform="translate(24, 22)">
    <!-- Small Gold Pixel Diamond -->
    <rect x="0" y="0" width="3" height="3" fill="#e3b341"/>
    <rect x="3" y="-3" width="3" height="3" fill="#fff5cc"/>
    <rect x="3" y="3" width="3" height="3" fill="#8a6833"/>
    <rect x="6" y="0" width="3" height="3" fill="#e3b341"/>

    <text x="18" y="4" class="px-title">LORD SOULS HARVESTED &amp; SYSTEM MILESTONES</text>
    <text x="842" y="4" text-anchor="end" class="px-tag">PROOF OF WORK · DETERMINISTIC METRICS</text>
  </g>

  <!-- Horizontal Pixel Divider -->
  <rect x="20" y="36" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="35" width="4" height="3" fill="#c9a876"/>

  <!-- ================= 4 MILESTONE COLUMNS ================= -->

  <!-- MILESTONE 1: SOUL OF FLAME (UPTIME) -->
  <g transform="translate(24, 50)">
    ${parseMatrix(SOUL_FLAME, 0, 4)}
    <g transform="translate(42, 0)">
      <text x="0" y="16" class="px-metric">99.9%</text>
      <text x="0" y="34" class="px-label">&gt; UPTIME CADENCE</text>
      <text x="0" y="52" class="px-sub">Unsupervised bot loops</text>
    </g>
  </g>

  <!-- Divider 1 -->
  <rect x="225" y="46" width="1" height="66" fill="#1e242d"/>

  <!-- MILESTONE 2: SOUL OF LIGHTNING (THROUGHPUT) -->
  <g transform="translate(245, 50)">
    ${parseMatrix(SOUL_LIGHTNING, 0, 4)}
    <g transform="translate(42, 0)">
      <text x="0" y="16" class="px-metric">100K+</text>
      <text x="0" y="34" class="px-label">&gt; EVENTS PROCESSED</text>
      <text x="0" y="52" class="px-sub">High-frequency executions</text>
    </g>
  </g>

  <!-- Divider 2 -->
  <rect x="445" y="46" width="1" height="66" fill="#1e242d"/>

  <!-- MILESTONE 3: SOUL OF THE ABYSS (AUTONOMY) -->
  <g transform="translate(465, 50)">
    ${parseMatrix(SOUL_VOID, 0, 4)}
    <g transform="translate(42, 0)">
      <text x="0" y="16" class="px-metric">0-SEC</text>
      <text x="0" y="34" class="px-label">&gt; MANUAL REBOOTS</text>
      <text x="0" y="52" class="px-sub">Self-healing state machines</text>
    </g>
  </g>

  <!-- Divider 3 -->
  <rect x="665" y="46" width="1" height="66" fill="#1e242d"/>

  <!-- MILESTONE 4: SOUL OF SORCERY (TYPE SAFETY) -->
  <g transform="translate(685, 50)">
    ${parseMatrix(SOUL_CRYSTAL, 0, 4)}
    <g transform="translate(42, 0)">
      <text x="0" y="16" class="px-metric">100%</text>
      <text x="0" y="34" class="px-label">&gt; TYPE-SAFE RIGOR</text>
      <text x="0" y="52" class="px-sub">Deterministic schema types</text>
    </g>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated authentic Dark Fantasy Pixel Art achievements.svg successfully!');
