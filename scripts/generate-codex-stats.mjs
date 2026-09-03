/**
 * scripts/generate-codex-stats.mjs
 * Generates an authentic Dark Fantasy Pixel Art System Codex summary card:
 * - shape-rendering="crispEdges"
 * - Stepped pixel stone borders with gold corner rivets and top pixel shimmer
 * - Retro pixel typography ('Press Start 2P') for headers, numbers, and prompt markers
 * - Pixelated blocky arsenal distribution bar
 * - Perfectly matches the Dark Fantasy Pixel aesthetic of the repo cards and banner!
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'codex-stats.svg');

const W = 890;
const H = 150;

// Stepped pixel frame with antique gold corner rivets
function generatePixelFrame(x, y, w, h) {
  return `
    <!-- Stone Base -->
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#111418"/>
    <!-- Outer Charcoal Stepped Outline -->
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#262c35" stroke-width="2"/>
    <!-- Inner Dark Inset -->
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="none" stroke="#181c22" stroke-width="1"/>
    <!-- Antique Gold Pixel Corner Rivets (4 Corners) -->
    <!-- Top-Left -->
    <rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 5}" y="${y + 2}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + 2}" y="${y + 5}" width="2" height="2" fill="#8a6833"/>
    <!-- Top-Right -->
    <rect x="${x + w - 5}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 7}" y="${y + 2}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + w - 5}" y="${y + 5}" width="2" height="2" fill="#8a6833"/>
    <!-- Bottom-Left -->
    <rect x="${x + 2}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 5}" y="${y + h - 4}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + 2}" y="${y + h - 7}" width="2" height="2" fill="#8a6833"/>
    <!-- Bottom-Right -->
    <rect x="${x + w - 5}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 7}" y="${y + h - 4}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + w - 5}" y="${y + h - 7}" width="2" height="2" fill="#8a6833"/>
    <!-- Top Pixel Shimmer Accent Line -->
    <rect x="${x + 16}" y="${y + 1}" width="${w - 32}" height="1" fill="#4d3a1f"/>
    <rect x="${x + w / 2 - 60}" y="${y + 1}" width="120" height="1" fill="#c9a876"/>
    <rect x="${x + w / 2 - 20}" y="${y + 1}" width="40" height="1" fill="#fff5cc"/>
  `;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Engineering Codex &amp; Activity Summary — radityabhardana</title>

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
    .px-stat-num {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 16px;
      letter-spacing: 0.5px;
      fill: #f0f6fc;
    }
    .px-stat-label {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 8.5px;
      letter-spacing: 0.8px;
      fill: #c9a876;
    }
    .px-stat-sub {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10.5px;
      fill: #8b949e;
    }
    .px-lang-item {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10.5px;
      fill: #c9d1d9;
    }
    .px-lang-pct {
      fill: #8b949e;
      font-size: 9.5px;
    }
  </style>

  <!-- Pixel Stone Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row -->
  <g transform="translate(24, 22)">
    <!-- Small Pixel Gold Diamond -->
    <rect x="0" y="0" width="3" height="3" fill="#e3b341"/>
    <rect x="3" y="-3" width="3" height="3" fill="#fff5cc"/>
    <rect x="3" y="3" width="3" height="3" fill="#8a6833"/>
    <rect x="6" y="0" width="3" height="3" fill="#e3b341"/>

    <text x="18" y="4" class="px-title">SYSTEM CODEX &amp; PRODUCTION ARCHIVE</text>
    <text x="842" y="4" text-anchor="end" class="px-tag">radityabhardana · 2026 ARCHIVE</text>
  </g>

  <!-- Horizontal Pixel Divider with Diamond Accent -->
  <rect x="20" y="36" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="35" width="4" height="3" fill="#c9a876"/>

  <!-- ================= COLUMN 1: CONTRIBUTIONS ================= -->
  <g transform="translate(30, 52)">
    <text x="0" y="24" class="px-stat-num">679+</text>
    <text x="0" y="46" class="px-stat-label">&gt; TOTAL SOULS</text>
    <text x="0" y="68" class="px-stat-sub">365-day active cadence</text>
  </g>

  <!-- Vertical Pixel Divider 1 -->
  <rect x="210" y="48" width="1" height="82" fill="#1e242d"/>

  <!-- ================= COLUMN 2: COMMITS ================= -->
  <g transform="translate(235, 52)">
    <text x="0" y="24" class="px-stat-num">291+</text>
    <text x="0" y="46" class="px-stat-label">&gt; PROD COMMITS</text>
    <text x="0" y="68" class="px-stat-sub">Deterministic backend pushes</text>
  </g>

  <!-- Vertical Pixel Divider 2 -->
  <rect x="410" y="48" width="1" height="82" fill="#1e242d"/>

  <!-- ================= COLUMN 3: DISCIPLINE GRADE ================= -->
  <g transform="translate(435, 52)">
    <text x="0" y="24" class="px-stat-num">
      <tspan fill="#e3b341">[ A+ ]</tspan>
    </text>
    <text x="0" y="46" class="px-stat-label">&gt; DISCIPLINE</text>
    <text x="0" y="68" class="px-stat-sub">Top-tier daily cadence</text>
  </g>

  <!-- Vertical Pixel Divider 3 -->
  <rect x="580" y="48" width="1" height="82" fill="#1e242d"/>

  <!-- ================= COLUMN 4: ARSENAL DISTRIBUTION ================= -->
  <g transform="translate(605, 52)">
    <text x="0" y="6" class="px-stat-label">&gt; ARSENAL SHARE</text>

    <!-- Stepped Pixel Bar (260px wide, 8px high) -->
    <g transform="translate(0, 16)">
      <!-- Pixel Outline Box -->
      <rect x="0" y="0" width="260" height="8" fill="#090c10"/>
      <rect x="0" y="0" width="260" height="8" fill="none" stroke="#262c35" stroke-width="1"/>

      <!-- JavaScript 31% (80px) -->
      <rect x="1" y="1" width="80" height="6" fill="#f1e05a"/>
      <!-- TypeScript 25% (65px) -->
      <rect x="81" y="1" width="65" height="6" fill="#3178c6"/>
      <!-- CSS/UI 22% (57px) -->
      <rect x="146" y="1" width="57" height="6" fill="#563d7c"/>
      <!-- C# 13% (34px) -->
      <rect x="203" y="1" width="34" height="6" fill="#178600"/>
      <!-- PHP 9% (22px) -->
      <rect x="237" y="1" width="22" height="6" fill="#777bb4"/>
    </g>

    <!-- Legend Row 1 -->
    <g transform="translate(0, 44)">
      <rect x="0" y="-4" width="5" height="5" fill="#f1e05a"/>
      <text x="9" y="1" class="px-lang-item">JS <tspan class="px-lang-pct">31%</tspan></text>

      <rect x="76" y="-4" width="5" height="5" fill="#3178c6"/>
      <text x="85" y="1" class="px-lang-item">TS <tspan class="px-lang-pct">25%</tspan></text>

      <rect x="152" y="-4" width="5" height="5" fill="#563d7c"/>
      <text x="161" y="1" class="px-lang-item">CSS <tspan class="px-lang-pct">22%</tspan></text>
    </g>

    <!-- Legend Row 2 -->
    <g transform="translate(0, 64)">
      <rect x="0" y="-4" width="5" height="5" fill="#178600"/>
      <text x="9" y="1" class="px-lang-item">C# <tspan class="px-lang-pct">13%</tspan></text>

      <rect x="76" y="-4" width="5" height="5" fill="#777bb4"/>
      <text x="85" y="1" class="px-lang-item">PHP <tspan class="px-lang-pct">9%</tspan></text>
    </g>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated authentic Dark Fantasy Pixel Art codex-stats.svg successfully!');
