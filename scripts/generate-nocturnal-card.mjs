/**
 * scripts/generate-nocturnal-card.mjs
 * Generates an authentic Dark Fantasy / Pixel Art "Nocturnal Cadence & Night Enjoyer" Graphic Card:
 * - 890x154px widescreen SVG matching codex-stats.svg & code-achievements.svg
 * - Stepped pixel obsidian stone frame with antique gold corner rivets & amethyst shimmer
 * - Bespoke 20x20 Pixel Art Relic: The Nocturnal Owl of Astora with crescent moon & glowing amber eyes
 * - 24-Hour Circadian Timeline Dial graphically highlighting the 21:00 - 04:00 WIB active flow window
 * - Dedicated telemetry: 7+ Hrs Nightly Cadence, Zero Distraction Silent Environment
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'nocturnal-cadence.svg');

const W = 890;
const H = 154;

// 20x20 Pixel Art: Nocturnal Owl with Crescent Moon & Glowing Amber Eyes
const OWL_SPRITE = [
  '.......kkkkk........',
  '.....kkcWWcckk......',
  '...kkccWkkkcccGk....',
  '..kcWkk.....kccGk...',
  '.kcWk.kk...kk.kcGk..',
  'kcWk.kmmk.kmmk.kcck.',
  'kcWk.kYYk.kYYk.kcGk.',
  'kcWk.kYWk.kYWk.kcvk.',
  'kcWk.kmmk.kmmk.kcvk.',
  'kcWk..kkvvkk...kcvk.',
  'kcWk.kpvvvvpk..kcvk.',
  '.kcWkkmvvvvmmkkcvk..',
  '..kcWkmvvvvmmkcvk...',
  '...kkcWmvvvmmkck....',
  '....kkcWvvvmmkk.....',
  '.....kkcWvvmmk......',
  '......kkcWmmk.......',
  '.......kkcWk........',
  '........kkkk........',
  '....................',
];

const PAL = {
  '.': null,
  'k': '#080b10', // void outline
  'm': '#251b3a', // deep midnight plum
  'v': '#7c3aed', // vibrant violet
  'p': '#a855f7', // luminous purple
  'c': '#c4b5fd', // starlight crescent
  'W': '#ffffff', // pure celestial white
  'G': '#c9a876', // antique gold
  'Y': '#f59e0b', // glowing amber eye
};

function renderPixelSprite(matrix, startX, startY, scale = 2.4) {
  const rects = [];
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      const color = PAL[char];
      if (color) {
        rects.push(`<rect x="${startX + c * scale}" y="${startY + r * scale}" width="${scale}" height="${scale}" fill="${color}"/>`);
      }
    }
  }
  return rects.join('');
}

// Stepped pixel frame with antique gold corner rivets & amethyst shimmer
function generatePixelFrame(x, y, w, h) {
  return `
    <!-- Stone Base -->
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

    <!-- Top Shimmer Line with Amethyst / Starlight Centerpiece -->
    <rect x="${x + 16}" y="${y + 1}" width="${w - 32}" height="1" fill="#2d233d"/>
    <rect x="${x + w / 2 - 80}" y="${y + 1}" width="160" height="1" fill="#7c3aed"/>
    <rect x="${x + w / 2 - 25}" y="${y + 1}" width="50" height="1" fill="#c4b5fd"/>
  `;
}

// 24-Hour Circadian Bar Generator
function generateCircadianBar(startX, startY) {
  const blockW = 15;
  const blockH = 17;
  const gap = 2;
  const blocks = [];

  for (let h = 0; h < 24; h++) {
    const x = startX + h * (blockW + gap);
    const isNightActive = (h >= 21 || h <= 4); // 21:00 to 04:00 (user active hours)

    if (isNightActive) {
      // Illuminated Nocturnal Block
      blocks.push(`
        <!-- Hour ${h}: Active Nocturnal -->
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="#4c1d95"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="3" fill="#a855f7"/>
        <rect x="${x + 1}" y="${startY + blockH - 2}" width="${blockW - 2}" height="1" fill="#c4b5fd"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="none" stroke="#7c3aed" stroke-width="1"/>
      `);
    } else {
      // Dormant / Standby Block
      blocks.push(`
        <!-- Hour ${h}: Standby -->
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="#0d1117"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="none" stroke="#1c222b" stroke-width="1"/>
        <rect x="${x + 3}" y="${startY + 7}" width="${blockW - 6}" height="2" fill="#161b22"/>
      `);
    }
  }

  return blocks.join('');
}

function generateSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Nocturnal Cadence &amp; Operating Window — radityabhardana</title>

  <style>
    .px-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 10.5px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .px-tag {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #c4b5fd;
    }
    .px-stat-num {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 12px;
      letter-spacing: 0.5px;
      fill: #f0f6fc;
    }
    .px-stat-label {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 8px;
      letter-spacing: 0.8px;
      fill: #c9a876;
    }
    .px-stat-sub {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 9.5px;
      fill: #8b949e;
    }
    .px-hour-marker {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 8.5px;
      fill: #545d68;
    }
    .px-hour-active {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7px;
      fill: #c4b5fd;
    }
    .px-flow-banner {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7.5px;
      fill: #f59e0b;
      letter-spacing: 0.6px;
    }
  </style>

  <!-- Stepped Pixel Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row -->
  <g transform="translate(24, 21)">
    <!-- Starlight Amethyst Crest -->
    <rect x="0" y="0" width="3" height="3" fill="#a855f7"/>
    <rect x="3" y="-3" width="3" height="3" fill="#c4b5fd"/>
    <rect x="3" y="3" width="3" height="3" fill="#5b21b6"/>
    <rect x="6" y="0" width="3" height="3" fill="#a855f7"/>

    <text x="18" y="4" class="px-title">NOCTURNAL CADENCE · THE NIGHT WATCH</text>
    <text x="842" y="4" text-anchor="end" class="px-tag">PRIME FLOW WINDOW: 21:00 — 04:00 WIB</text>
  </g>

  <!-- Horizontal Pixel Divider with Diamond Accent -->
  <rect x="20" y="34" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="33" width="4" height="3" fill="#a855f7"/>

  <!-- ================= COLUMN 1: NOCTURNAL SHRINE & CHRONOTYPE ================= -->
  <g transform="translate(24, 46)">
    <!-- Relic Shrine Frame (52x52) -->
    <rect x="0" y="2" width="52" height="52" fill="#090c11"/>
    <rect x="0" y="2" width="52" height="52" fill="none" stroke="#352654" stroke-width="1.5"/>
    <!-- Shrine Corner Accents -->
    <rect x="2" y="4" width="2" height="2" fill="#a855f7"/>
    <rect x="48" y="4" width="2" height="2" fill="#a855f7"/>
    <rect x="2" y="50" width="2" height="2" fill="#a855f7"/>
    <rect x="48" y="50" width="2" height="2" fill="#a855f7"/>

    <!-- Pixel Owl & Crescent Sprite -->
    ${renderPixelSprite(OWL_SPRITE, 2, 3, 2.4)}

    <!-- Chronotype Info -->
    <text x="62" y="16" class="px-stat-num">NIGHT ENJOYER</text>
    <text x="62" y="32" class="px-stat-label">&gt; CHRONOTYPE</text>
    <text x="62" y="48" class="px-stat-sub">Peak cognitive velocity at night</text>

    <!-- Status Pill -->
    <rect x="62" y="56" width="136" height="17" fill="#151022"/>
    <rect x="62" y="56" width="136" height="17" fill="none" stroke="#4c1d95" stroke-width="1"/>
    <rect x="66" y="62" width="5" height="5" fill="#a855f7"/>
    <text x="77" y="68" class="px-hour-active">NOCTURNAL DEV</text>
  </g>

  <!-- Vertical Divider 1 -->
  <rect x="268" y="44" width="1" height="96" fill="#1e242d"/>

  <!-- ================= COLUMN 2: 24-HOUR CIRCADIAN TIMELINE ================= -->
  <g transform="translate(288, 46)">
    <!-- Section Header -->
    <text x="0" y="10" class="px-stat-label">&gt; 24-HOUR CIRCADIAN TIMELINE</text>
    <text x="406" y="10" text-anchor="end" class="px-stat-sub">UTC+7 · Jakarta Time</text>

    <!-- Active Window Indicator Brackets Over Timeline -->
    <g transform="translate(0, 18)">
      <!-- Left active segment bracket (00:00 - 04:00: 5 blocks = 83px) -->
      <rect x="0" y="0" width="83" height="2" fill="#a855f7"/>
      <rect x="0" y="0" width="2" height="6" fill="#a855f7"/>
      <rect x="81" y="0" width="2" height="6" fill="#a855f7"/>

      <!-- Right active segment bracket (21:00 - 24:00: 3 blocks = 49px from x=357) -->
      <rect x="357" y="0" width="49" height="2" fill="#a855f7"/>
      <rect x="357" y="0" width="2" height="6" fill="#a855f7"/>
      <rect x="404" y="0" width="2" height="6" fill="#a855f7"/>

      <!-- Center Flow Callout -->
      <text x="203" y="4" text-anchor="middle" class="px-flow-banner">★ ACTIVE RUN: 21:00 — 04:00 ★</text>
    </g>

    <!-- 24 Segmented Hour Blocks -->
    <g transform="translate(0, 30)">
      ${generateCircadianBar(0, 0)}
    </g>

    <!-- Timeline Hour Markers -->
    <g transform="translate(0, 58)">
      <text x="0" y="0" class="px-hour-active">00:00</text>
      <text x="68" y="0" class="px-hour-active">04:00</text>
      <text x="136" y="0" class="px-hour-marker">08:00</text>
      <text x="204" y="0" class="px-hour-marker">12:00</text>
      <text x="272" y="0" class="px-hour-marker">16:00</text>
      <text x="357" y="0" class="px-hour-active">21:00</text>
      <text x="406" y="0" text-anchor="end" class="px-hour-active">24:00</text>
    </g>

    <!-- Timeline Caption -->
    <g transform="translate(0, 78)">
      <rect x="0" y="-3" width="5" height="5" fill="#7c3aed"/>
      <text x="9" y="2" class="px-stat-sub">High Throughput Flow (21:00–04:00)</text>

      <rect x="230" y="-3" width="5" height="5" fill="#1c222b"/>
      <text x="239" y="2" class="px-stat-sub">Standby / Off-Grid (05:00–20:00)</text>
    </g>
  </g>

  <!-- Vertical Divider 2 -->
  <rect x="712" y="44" width="1" height="96" fill="#1e242d"/>

  <!-- ================= COLUMN 3: NOCTURNAL TELEMETRY ================= -->
  <g transform="translate(730, 46)">
    <!-- Stat 1: Cadence -->
    <text x="0" y="16" class="px-stat-num">7 HOURS</text>
    <text x="0" y="32" class="px-stat-label">&gt; NIGHT CADENCE</text>
    <text x="0" y="46" class="px-stat-sub">Daily 21:00 – 04:00 window</text>

    <!-- Stat 2: Cognitive State -->
    <g transform="translate(0, 56)">
      <text x="0" y="14" class="px-stat-num" fill="#c4b5fd">DEEP FLOW</text>
      <text x="0" y="28" class="px-stat-label">&gt; ENVIRONMENT</text>
      <text x="0" y="40" class="px-stat-sub">Silent world, maximum speed</text>
    </g>
  </g>
</svg>
`;
}

const svg = generateSvg();
writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Successfully updated nocturnal-cadence.svg with crisp dimensions!');
