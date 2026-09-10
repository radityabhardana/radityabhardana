/**
 * scripts/generate-nocturnal-card.mjs
 * Generates an authentic Dark Fantasy / Pixel Art "The Dark Lord — Nocturnal Cadence" Graphic Card:
 * - Concept 1: THE DARK LORD (Sovereign of the Age of Dark)
 * - 890x154px widescreen SVG matching codex-stats.svg & code-achievements.svg
 * - Stepped pixel obsidian stone frame with antique gold corner rivets & black flame shimmer
 * - Bespoke 20x20 Pixel Art Relic: Horned Obsidian Helm & Crown of the Dark Lord with glowing crimson gaze
 * - 24-Hour Circadian Timeline Dial graphically highlighting TWO active windows:
 *   1. Primary Reign: 21:00 - 04:00 WIB (Night Peak / Heavy Velocity & Dominance)
 *   2. Light Radar: 09:00 - 12:00 WIB (Daylight Triage & Light Reconnaissance)
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

// 20x20 Pixel Art: Crown of the Dark Lord, Horned Obsidian Helm, Crimson Gaze & Void Flame Aura
const DARK_LORD_SPRITE = [
  '..Y...........Y.....',
  '.kYGk.......kGYk....',
  '.kYYGk..Y..kGYYk....',
  '..kYYGkkGkkGYYk.....',
  '...kYYGGGGGYYk......',
  '....kGGGGGGGk.......',
  '..vvkoooooookvv.....',
  '.vppkoooGooookppv...',
  'vpppkowrkowrkopppv..',
  '.vppkooorooookppv...',
  '..vkoooooooookv.....',
  '...kooommmmoook.....',
  '..kooommmmmmoook....',
  '.koooGkmmmGkoook....',
  'koooGGGGGGGGooook...',
  'koovvGGGGGGvvoook...',
  '.kk.vvvvvvvv.kk.....',
  '....vvvvvvvv........',
  '.....vv..vv.........',
  '....................',
];

const PAL = {
  '.': null,
  'k': '#080b10', // void black outline
  'o': '#1b1d28', // dark obsidian armor
  'm': '#2e2544', // deep shadowed plate
  'v': '#6b21a8', // void flame violet
  'p': '#a855f7', // ethereal dark magic
  'r': '#ef4444', // crimson eye glow
  'w': '#ffffff', // white-hot eye center
  'G': '#c9a876', // antique gold crown runes
  'Y': '#f59e0b', // blazing gold crown prongs
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

// Stepped pixel frame with antique gold corner rivets & black flame shimmer
function generatePixelFrame(x, y, w, h) {
  return `
    <!-- Stone Base -->
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#101216"/>
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

    <!-- Top Shimmer Line with Crimson & Gold Dark Lord Accent -->
    <rect x="${x + 16}" y="${y + 1}" width="${w - 32}" height="1" fill="#2d1d24"/>
    <rect x="${x + w / 2 - 90}" y="${y + 1}" width="180" height="1" fill="#991b1b"/>
    <rect x="${x + w / 2 - 35}" y="${y + 1}" width="70" height="1" fill="#f59e0b"/>
    <rect x="${x + w / 2 - 10}" y="${y + 1}" width="20" height="1" fill="#fff5cc"/>
  `;
}

// 24-Hour Circadian Bar Generator with TWO active modes
function generateCircadianBar(startX, startY) {
  const blockW = 15;
  const blockH = 17;
  const gap = 2;
  const blocks = [];

  for (let h = 0; h < 24; h++) {
    const x = startX + h * (blockW + gap);
    const isNightDominance = (h >= 21 || h <= 4); // 21:00 to 04:00 (Dark Lord Reign)
    const isDayRadar = (h >= 9 && h <= 11);        // 09:00 to 12:00 (Light Radar / Triage)

    if (isNightDominance) {
      // Dark Lord Heavy Dominance Block (Violet & Crimson)
      blocks.push(`
        <!-- Hour ${h}: Dark Lord Reign -->
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="#4a044e"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="3" fill="#dc2626"/>
        <rect x="${x + 1}" y="${startY + blockH - 2}" width="${blockW - 2}" height="1" fill="#f43f5e"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="none" stroke="#9333ea" stroke-width="1"/>
      `);
    } else if (isDayRadar) {
      // Daylight Radar Block (Tactical Amber / Gold)
      blocks.push(`
        <!-- Hour ${h}: Light Radar -->
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="#382109"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="3" fill="#f59e0b"/>
        <rect x="${x + 1}" y="${startY + blockH - 2}" width="${blockW - 2}" height="1" fill="#fde68a"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="none" stroke="#d97706" stroke-width="1"/>
      `);
    } else {
      // Dormant / Standby Block
      blocks.push(`
        <!-- Hour ${h}: Standby -->
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="#0c0e13"/>
        <rect x="${x}" y="${startY}" width="${blockW}" height="${blockH}" fill="none" stroke="#1c222b" stroke-width="1"/>
        <rect x="${x + 3}" y="${startY + 7}" width="${blockW - 6}" height="2" fill="#161b22"/>
      `);
    }
  }

  return blocks.join('');
}

function generateSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>The Dark Lord Cadence &amp; Operating Window — radityabhardana</title>

  <style>
    .px-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 10px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .px-tag {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #f43f5e;
    }
    .px-stat-num {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 11.5px;
      letter-spacing: 0.5px;
      fill: #f0f6fc;
    }
    .px-stat-label {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7.5px;
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
      font-size: 8px;
      fill: #545d68;
    }
    .px-hour-active {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 6.8px;
      fill: #f43f5e;
    }
    .px-hour-radar {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 6.8px;
      fill: #f59e0b;
    }
    .px-banner-night {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 7px;
      fill: #f43f5e;
      letter-spacing: 0.5px;
    }
    .px-banner-day {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 6.8px;
      fill: #f59e0b;
      letter-spacing: 0.5px;
    }
  </style>

  <!-- Stepped Pixel Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row -->
  <g transform="translate(24, 21)">
    <!-- Dark Lord Red / Gold Crest -->
    <rect x="0" y="0" width="3" height="3" fill="#dc2626"/>
    <rect x="3" y="-3" width="3" height="3" fill="#f59e0b"/>
    <rect x="3" y="3" width="3" height="3" fill="#7f1d1d"/>
    <rect x="6" y="0" width="3" height="3" fill="#dc2626"/>

    <text x="18" y="4" class="px-title">THE DARK LORD · SOVEREIGN OF THE AGE OF DARK</text>
    <text x="842" y="4" text-anchor="end" class="px-tag">NOCTURNAL REIGN: 21:00 — 04:00 WIB</text>
  </g>

  <!-- Horizontal Pixel Divider with Diamond Accent -->
  <rect x="20" y="34" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="33" width="4" height="3" fill="#dc2626"/>

  <!-- ================= COLUMN 1: THE DARK LORD SHRINE ================= -->
  <g transform="translate(24, 46)">
    <!-- Relic Shrine Frame (52x52) with Crimson Border -->
    <rect x="0" y="2" width="52" height="52" fill="#090b10"/>
    <rect x="0" y="2" width="52" height="52" fill="none" stroke="#450a0a" stroke-width="1.5"/>
    <!-- Shrine Corner Accents -->
    <rect x="2" y="4" width="2" height="2" fill="#dc2626"/>
    <rect x="48" y="4" width="2" height="2" fill="#dc2626"/>
    <rect x="2" y="50" width="2" height="2" fill="#dc2626"/>
    <rect x="48" y="50" width="2" height="2" fill="#dc2626"/>

    <!-- Pixel Dark Lord Sprite -->
    ${renderPixelSprite(DARK_LORD_SPRITE, 2, 3, 2.4)}

    <!-- Lore Identity -->
    <text x="62" y="16" class="px-stat-num">THE DARK LORD</text>
    <text x="62" y="32" class="px-stat-label">&gt; SOVEREIGN CADENCE</text>
    <text x="62" y="48" class="px-stat-sub">Dominates the quiet midnight hours</text>

    <!-- Status Pill -->
    <rect x="62" y="56" width="138" height="17" fill="#180b11"/>
    <rect x="62" y="56" width="138" height="17" fill="none" stroke="#7f1d1d" stroke-width="1"/>
    <rect x="66" y="62" width="5" height="5" fill="#dc2626"/>
    <text x="77" y="68" class="px-hour-active">AGE OF DARK · LIVE</text>
  </g>

  <!-- Vertical Divider 1 -->
  <rect x="268" y="44" width="1" height="96" fill="#1e242d"/>

  <!-- ================= COLUMN 2: 24-HOUR CIRCADIAN TIMELINE ================= -->
  <g transform="translate(288, 46)">
    <!-- Section Header -->
    <text x="0" y="10" class="px-stat-label">&gt; 24-HOUR OPERATIONAL RADAR</text>
    <text x="406" y="10" text-anchor="end" class="px-stat-sub">UTC+7 · Jakarta Time</text>

    <!-- Visual Markers Above Timeline -->
    <g transform="translate(0, 18)">
      <!-- Left active night bracket (00:00 - 04:00: 5 blocks = 83px) -->
      <rect x="0" y="0" width="83" height="2" fill="#dc2626"/>
      <rect x="0" y="0" width="2" height="6" fill="#dc2626"/>
      <rect x="81" y="0" width="2" height="6" fill="#dc2626"/>

      <!-- Day radar bracket (09:00 - 12:00: hours 9,10,11 = 3 blocks -> x=153 to 202) -->
      <rect x="153" y="0" width="49" height="2" fill="#f59e0b"/>
      <rect x="153" y="0" width="2" height="6" fill="#f59e0b"/>
      <rect x="200" y="0" width="2" height="6" fill="#f59e0b"/>

      <!-- Right active night bracket (21:00 - 24:00: 3 blocks = 49px from x=357) -->
      <rect x="357" y="0" width="49" height="2" fill="#dc2626"/>
      <rect x="357" y="0" width="2" height="6" fill="#dc2626"/>
      <rect x="404" y="0" width="2" height="6" fill="#dc2626"/>

      <!-- Text Callouts -->
      <text x="280" y="4" text-anchor="middle" class="px-banner-night">★ NIGHT REIGN: 21–04 ★</text>
      <text x="177" y="-3" text-anchor="middle" class="px-banner-day">RADAR: 09–12</text>
    </g>

    <!-- 24 Segmented Hour Blocks -->
    <g transform="translate(0, 30)">
      ${generateCircadianBar(0, 0)}
    </g>

    <!-- Timeline Hour Markers -->
    <g transform="translate(0, 58)">
      <text x="0" y="0" class="px-hour-active">00:00</text>
      <text x="68" y="0" class="px-hour-active">04:00</text>
      <text x="153" y="0" class="px-hour-radar">09:00</text>
      <text x="202" y="0" class="px-hour-radar">12:00</text>
      <text x="272" y="0" class="px-hour-marker">16:00</text>
      <text x="357" y="0" class="px-hour-active">21:00</text>
      <text x="406" y="0" text-anchor="end" class="px-hour-active">24:00</text>
    </g>

    <!-- Timeline Dual Legend -->
    <g transform="translate(0, 78)">
      <rect x="0" y="-3" width="5" height="5" fill="#dc2626"/>
      <text x="9" y="2" class="px-stat-sub">Night Reign 21:00–04:00 (Heavy Engineering)</text>

      <rect x="238" y="-3" width="5" height="5" fill="#f59e0b"/>
      <text x="247" y="2" class="px-stat-sub">Day Radar 09:00–12:00 (Light Triage)</text>
    </g>
  </g>

  <!-- Vertical Divider 2 -->
  <rect x="712" y="44" width="1" height="96" fill="#1e242d"/>

  <!-- ================= COLUMN 3: OPERATIONAL TELEMETRY ================= -->
  <g transform="translate(730, 46)">
    <!-- Stat 1: Dominance Mode -->
    <text x="0" y="16" class="px-stat-num" fill="#f43f5e">DOMINANT</text>
    <text x="0" y="32" class="px-stat-label">&gt; NIGHT CADENCE</text>
    <text x="0" y="46" class="px-stat-sub">Avg 7h flow · 21:00–04:00</text>

    <!-- Stat 2: Daylight Radar -->
    <g transform="translate(0, 56)">
      <text x="0" y="14" class="px-stat-num" fill="#f59e0b">RADAR</text>
      <text x="0" y="28" class="px-stat-label">&gt; DAYLIGHT TRIAGE</text>
      <text x="0" y="40" class="px-stat-sub">Avg 3h recon · 09:00–12:00</text>
    </g>
  </g>
</svg>
`;
}

const svg = generateSvg();
writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Successfully generated Dark Lord nocturnal-cadence.svg with 2-tier schedule!');
