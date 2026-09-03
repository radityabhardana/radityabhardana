/**
 * scripts/generate-repo-cards.mjs
 * Generates authentic Pixel Art Dark Souls Equipment & Relic Cards:
 * - shape-rendering="crispEdges"
 * - Stepped pixel stone frames with gold pixel corner rivets
 * - Authentic 16x16 pixel art equipment relics (drawn pixel by pixel)
 * - Retro pixel typography ('Press Start 2P') for titles and prompt markers
 * - Widescreen Flagship Card (card-spectre-hero.svg) + 4 Symmetrical Grid Cards
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, '..', 'assets', 'cards');
mkdirSync(CARDS_DIR, { recursive: true });

// Pixel Palette for Relic Sprites
const P = {
  '.': null,              // transparent
  'k': '#0a0d12',         // deep void outline
  'd': '#1b222c',         // dark stone slate
  'm': '#303946',         // mid stone
  'l': '#566579',         // light stone
  'B': '#5c4118',         // bronze shadow
  'G': '#a67d32',         // antique gold
  'Y': '#e5b642',         // bright gold
  'W': '#fff5cc',         // starlight white
  'C': '#22608a',         // soul cyan dark
  'S': '#4ea4d9',         // soul cyan bright
  'F': '#e65c00',         // ember fire
  'R': '#ff9933',         // fire orange
};

// 16x16 Pixel Art Matrices
const SPRITES = {
  // 1. Spectre Terminal: Scrying Eye & Void Crystal
  spectre: [
    '......GGGG......',
    '....GGYYYYGG....',
    '..GGYYWWWWYYGG..',
    '.GYYWWkkkkWWYYG.',
    '.GYYWkCCCCkWWYG.',
    'GYYWkCSSSSCkWWYG',
    'GYYWkCSWWSCkWWYG',
    'GYYWkCSWWSCkWWYG',
    'GYYWkCSSSSCkWWYG',
    '.GYYWkCCCCkWWYG.',
    '.GYYWWkkkkWWYYG.',
    '..GGYYWWWWYYGG..',
    '....GGYYYYGG....',
    '......GGGG......',
    '.......YY.......',
    '......WWWW......',
  ],

  // 2. Icarus Watermark: Phoenix Quill & Inpainting Feather
  icarus: [
    '..............WW',
    '.............WYY',
    '............WYYk',
    '...........WYYk.',
    '..........WYYGk.',
    '.........WYYGk..',
    '..WW....WYYGk...',
    '.WYYW..WYYGk....',
    '..WYYkWYYGk.....',
    '...kYYGGk.......',
    '....kYYGk.......',
    '.....kYYGk......',
    '......kYYGk.....',
    '.......kYYGk....',
    '........kYGk....',
    '.........kk.....',
  ],

  // 3. Blackbox Signal Lost: Radio Monolith & Frequency Waves
  blackbox: [
    '.......YY.......',
    '..WW...YY...WW..',
    '.W..W..YY..W..W.',
    'W....WkYYkW....W',
    '......kYYk......',
    '.....kkYYkk.....',
    '....kddddddk....',
    '...kddmFFmddk...',
    '...kddFRRFddk...',
    '...kddmFFmddk...',
    '...kddddddddk...',
    '...kddddddddk...',
    '...kddkYYkddk...',
    '...kddkYYkddk...',
    '....kddddddk....',
    '....kkkkkkkk....',
  ],

  // 4. Kalpindo: Knight Crest & Calibration Scale
  kalpindo: [
    '...kkkkkkkkkk...',
    '..kGGYYYYYYGGk..',
    '..kGYYkkkkYYGk..',
    '..kGkYYYYYYkGk..',
    '..kGk.kYYk.kGk..',
    '..kGk.kYYk.kGk..',
    '..kYkkkkkkkkYk..',
    '..kYk.kYYk.kYk..',
    '..kYk.kYYk.kYk..',
    '..kYk.kYYk.kYk..',
    '...kYkYYYYkYk...',
    '...kGkYYYYkGk...',
    '....kGYYYYGk....',
    '.....kGYYGk.....',
    '......kGGk......',
    '.......kk.......',
  ],

  // 5. Smart Study AI: Arcane Tome & Star Glyph
  smartstudy: [
    '.......WW.......',
    '......WYYW......',
    '.....WYYYYW.....',
    '......WYYW......',
    '..kk...WW...kk..',
    '.kYYk.kkkk.kYYk.',
    'kYYYYkddddkYYYYk',
    'kYWWYkddddkYWWYk',
    'kYWWYkddddkYWWYk',
    'kYWWYkddddkYWWYk',
    'kYWWYkddddkYWWYk',
    'kYWWYkddddkYWWYk',
    'kYYYYkddddkYYYYk',
    '.kYYk.kddk.kYYk.',
    '..kk...kk...kk..',
    '................',
  ],
};

// Render 16x16 pixel matrix to SVG string scaled by `scale`
function renderPixelMatrix(matrix, startX, startY, scale = 2) {
  const rects = [];
  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      const color = P[char];
      if (color) {
        rects.push(`<rect x="${startX + c * scale}" y="${startY + r * scale}" width="${scale}" height="${scale}" fill="${color}"/>`);
      }
    }
  }
  return rects.join('');
}

// Generate stepped pixel stone border with gold corner accents
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
    <rect x="${x + 14}" y="${y + 1}" width="${w - 28}" height="1" fill="#4d3a1f"/>
    <rect x="${x + w / 2 - 40}" y="${y + 1}" width="80" height="1" fill="#c9a876"/>
    <rect x="${x + w / 2 - 10}" y="${y + 1}" width="20" height="1" fill="#fff5cc"/>
  `;
}

const projects = [
  {
    id: 'spectre',
    name: 'radityabhardana/spectre_terminal',
    title: 'Spectre Terminal',
    category: 'Fintech · EV Calculus',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    descLine1: 'Polymarket intelligence terminal with mathematical expected-value',
    descLine2: 'guardrails designed for disciplined and deterministic trading decisions.',
    tags: 'Polymarket · EV Math · Trading Terminal',
  },
  {
    id: 'icarus',
    name: 'radityabhardana/icarus-watermark-remover',
    title: 'Icarus Watermark Remover',
    category: 'AI · Computer Vision',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    descLine1: 'AI-assisted web canvas suite for intelligent watermark extraction,',
    descLine2: 'seam-carving object erasure, and high-fidelity image reconstruction.',
    tags: 'AI Canvas · Inpainting · Browser Tool',
  },
  {
    id: 'blackbox',
    name: 'radityabhardana/blackbox_signal_lost',
    title: 'Blackbox: Signal Lost',
    category: 'Simulation · Browser OS',
    lang: 'TypeScript',
    langColor: '#3178c6',
    descLine1: 'Atmospheric detective simulation game set within an enigmatic,',
    descLine2: 'vintage civic operating system with rich terminal mechanics and audio.',
    tags: 'Sim Game · Web Audio · Retro UI',
  },
  {
    id: 'kalpindo',
    name: 'radityabhardana/Kalpindo',
    title: 'Kalpindo Company Profile',
    category: 'Enterprise · Web Platform',
    lang: 'PHP / Web',
    langColor: '#777bb4',
    descLine1: 'Official corporate platform & laboratory testing service catalog',
    descLine2: 'engineered for PT Kalibrasi Pengujian Indonesia.',
    tags: 'B2B Enterprise · Web Portal · Calibration',
  },
  {
    id: 'smartstudy',
    name: 'radityabhardana/smart_study',
    title: 'Smart Study AI',
    category: 'EdTech · Adaptive Learning',
    lang: 'TypeScript',
    langColor: '#3178c6',
    descLine1: 'Intelligent learning companion engineered with automated study planning,',
    descLine2: 'adaptive spaced-revision routines, and context-aware study tools.',
    tags: 'AI Tutor · Study Planner · EdTech',
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 1. Generate 4 Symmetrical Grid Cards (480x165px)
for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="165" viewBox="0 0 480 165" shape-rendering="crispEdges">
  <title>${escXml(p.title)} — ${escXml(p.category)}</title>

  <style>
    .pixel-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 11.5px;
      letter-spacing: 0.5px;
      fill: #f0f6fc;
    }
    .pixel-repo {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
    .pixel-desc {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 11px;
      line-height: 1.5;
      fill: #c9d1d9;
    }
    .pixel-meta {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
    .pixel-link {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 8.5px;
      letter-spacing: 1px;
      fill: #e3b341;
    }
  </style>

  <!-- Pixel Stone Frame -->
  ${generatePixelFrame(0, 0, 480, 165)}

  <!-- Left Pixel Relic Alcove (44x44) -->
  <rect x="16" y="18" width="44" height="44" fill="#090c10"/>
  <rect x="16" y="18" width="44" height="44" fill="none" stroke="#212730" stroke-width="1"/>
  <rect x="17" y="19" width="42" height="42" fill="none" stroke="#161a20" stroke-width="1"/>
  <!-- 16x16 Pixel Relic Sprite (scaled by 2 -> 32x32 centered at x=22, y=24) -->
  ${renderPixelMatrix(SPRITES[p.id], 22, 24, 2)}

  <!-- Title & Repo Header -->
  <text x="72" y="34" class="pixel-title">${escXml(p.title)}</text>
  <text x="72" y="52" class="pixel-repo">${escXml(p.name)}</text>

  <!-- Language Badge (Top Right) -->
  <g transform="translate(464, 34)">
    <text text-anchor="end" class="pixel-meta">
      <tspan fill="${p.langColor}" font-size="12">■ </tspan>${escXml(p.lang)}
    </text>
  </g>

  <!-- Description (Clean Monospace Rhythm) -->
  <text x="72" y="80" class="pixel-desc">${escXml(p.descLine1)}</text>
  <text x="72" y="98" class="pixel-desc">${escXml(p.descLine2)}</text>

  <!-- Pixel Divider Line with Diamond -->
  <rect x="16" y="122" width="448" height="1" fill="#1e242d"/>
  <rect x="238" y="121" width="4" height="3" fill="#c9a876"/>

  <!-- Footer -->
  <!-- Left: Domain Tags with Pixel Prompt -->
  <text x="16" y="145" class="pixel-meta">&gt; ${escXml(p.tags)}</text>

  <!-- Right: Retro Action Prompt -->
  <text x="464" y="145" text-anchor="end" class="pixel-link">[ VIEW REPO ↗ ]</text>
</svg>
`;

  writeFileSync(join(CARDS_DIR, `card-${p.id}.svg`), svg);
  console.log(`Generated pixel art card-${p.id}.svg`);
}

// 2. Generate Flagship Full-Width Hero Card: card-spectre-hero.svg (890x150px)
const heroProject = projects[0];
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="890" height="150" viewBox="0 0 890 150" shape-rendering="crispEdges">
  <title>${escXml(heroProject.title)} — Flagship Repository</title>

  <style>
    .h-pixel-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 13.5px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .h-pixel-badge {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 8px;
      letter-spacing: 1px;
      fill: #e3b341;
    }
    .h-pixel-repo {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 11px;
      fill: #8b949e;
    }
    .h-pixel-desc {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 11.5px;
      line-height: 1.5;
      fill: #c9d1d9;
    }
    .h-pixel-meta {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10.5px;
      fill: #8b949e;
    }
    .h-pixel-link {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 9px;
      letter-spacing: 1.5px;
      fill: #e3b341;
    }
  </style>

  <!-- Pixel Stone Frame -->
  ${generatePixelFrame(0, 0, 890, 150)}

  <!-- Left Pixel Relic Alcove (48x48) -->
  <rect x="20" y="18" width="48" height="48" fill="#090c10"/>
  <rect x="20" y="18" width="48" height="48" fill="none" stroke="#212730" stroke-width="1"/>
  <rect x="21" y="19" width="46" height="46" fill="none" stroke="#161a20" stroke-width="1"/>
  <!-- 16x16 Pixel Relic Sprite (scaled by 2 -> 32x32 centered at x=28, y=26) -->
  ${renderPixelMatrix(SPRITES.spectre, 28, 26, 2)}

  <!-- Title & Flagship Pill -->
  <text x="82" y="34" class="h-pixel-title">${escXml(heroProject.title)}</text>
  <rect x="300" y="21" width="168" height="16" fill="#1c160e" stroke="#4d3b1e" stroke-width="1"/>
  <text x="384" y="32" class="h-pixel-badge" text-anchor="middle">[★ FLAGSHIP RELIC]</text>
  <text x="82" y="52" class="h-pixel-repo">${escXml(heroProject.name)}</text>

  <!-- Language (Top Right) -->
  <g transform="translate(868, 34)">
    <text text-anchor="end" class="h-pixel-meta">
      <tspan fill="${heroProject.langColor}" font-size="13">■ </tspan>${escXml(heroProject.lang)}
    </text>
  </g>

  <!-- Description -->
  <text x="82" y="78" class="h-pixel-desc">${escXml(heroProject.descLine1)}</text>
  <text x="82" y="96" class="h-pixel-desc">${escXml(heroProject.descLine2)}</text>

  <!-- Pixel Divider Line with Diamond -->
  <rect x="20" y="112" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="111" width="4" height="3" fill="#c9a876"/>

  <!-- Footer -->
  <text x="20" y="134" class="h-pixel-meta">&gt; ${escXml(heroProject.tags)}</text>
  <text x="868" y="134" text-anchor="end" class="h-pixel-link">[ EXPLORE FLAGSHIP REPOSITORY ↗ ]</text>
</svg>
`;

writeFileSync(join(CARDS_DIR, 'card-spectre-hero.svg'), heroSvg);
console.log('✨ Regenerated all authentic Pixel Art Dark Souls cards successfully!');
