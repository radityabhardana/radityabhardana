/**
 * scripts/create-pixel-solaire.mjs
 * Generates an authentic, animated 2D Pixel Art masterpiece of Solaire of Astora:
 * - Iconic "Praise the Sun!" \ [T] / pose: arms outstretched upward to the heavens
 * - Cylindrical iron greathelm with eye slit and swaying bright crimson feather plume
 * - White/ash surcoat with the iconic hand-painted smiling Sun emblem on the chest
 * - Chainmail sleeves, iron pauldrons, leather belt, and iron greaves
 * - Giant incandescent Golden Sun radiating pulsating pixel rays behind him
 * - Floating golden holy motes & "PRAISE THE SUN \ [T] /" retro pixel typography
 * - 100% crisp pixel art (shape-rendering="crispEdges")
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'solaire-praise-the-sun.svg');

const W = 480;
const H = 340;
const S = 4; // 1 pixel = 4x4 canvas units

// -------------------------------------------------------------
// PALETTES
// -------------------------------------------------------------
const P = {
  '.': null,
  'k': '#090c10', // black outline
  'd': '#1b222c', // deep iron shadow
  'm': '#384353', // mid iron steel
  's': '#6a788a', // silver steel
  'h': '#9ab0c7', // bright highlight steel
  'w': '#f0f6fc', // white specular shine
  'v': '#05070a', // deep helmet visor slit

  // Red Plume
  'r': '#5c0f0f', // dark ruby plume
  'R': '#a81d1d', // crimson plume
  'E': '#e02828', // bright scarlet plume
  'Q': '#ff7373', // plume highlight

  // Holy Surcoat (Off-white / Ash linen)
  'c': '#52575e', // linen dark fold
  'C': '#8d95a1', // linen shadow
  'T': '#cfd7e3', // linen base
  'W': '#f8fafc', // bright linen

  // Sun Emblem & Gold Accents
  'g': '#5e4313', // antique gold shadow
  'G': '#b38222', // warm gold
  'Y': '#f7b928', // bright sun yellow
  'O': '#f97316', // sun flame orange
  'Z': '#fff5cc', // radiant core shine

  // Leather & Belt
  'l': '#2b1b0e', // dark leather
  'L': '#5a381d', // mid leather
  'B': '#87532a', // light leather
};

// Solaire Character Matrix (38 cols x 52 rows)
// Perfectly proportioned Solaire in \ [T] / pose:
// - Left arm raised diagonally up-left
// - Right arm raised diagonally up-right
// - Head tilted up
// - Sun emblem centered on chest
const SOLAIRE_BODY = [
  // Rows 0-7: Red Feather Plume waving from the helm apex
  '.................kk...................',
  '................kEEkk.................',
  '...............kEEEERk................',
  '..............kEEEEERRk...............',
  '.............kQEEERRRrk...............',
  '.............kEEEERRrrk...............',
  '............kEEERRRrrkk...............',
  '............kERRRrrkk.................',
  // Rows 8-18: Cylindrical Iron Greathelm with Cross Slit
  '..............kkkkkkkkkk..............',
  '............kkshhhhhhhshkk............',
  '...........kshhhhhhhhhhhshk...........',
  '...........kssmmmmmmmmmmssk...........',
  '...........ksmddddddddddmsk...........',
  '...........ksmddvvvvvvddmsk...........',
  '...........ksmddvvvvvvddmsk...........',
  '...........ksmdvkvvvvvkdmsk...........',
  '...........ksmddvvvvvvddmsk...........',
  '...........ksmddddddddddmsk...........',
  '...........kssmmmmmmmmmmssk...........',
  '............kkshhhhhhhshkk............',
  // Rows 19-28: Raised Arms \ [T] / and Shoulders
  '..kkk............................kkk..',
  '.kssskk........................kksssk.',
  'kssssshk......................khsssssk',
  'ksshhsshk....................khsshsssk',
  '.kshdssshk...kkkkkkkkkkkk...khsssdhsk.',
  '..kddsssdhkkkCCCCCCCCCCCCkkkhdsssddk..',
  '...kdmdsssdhTCCCCWWWWCCCCTkdsssddmk...',
  '....kddmdsssdhWWWWWWWWWWkdsssddmdk....',
  '.....kdddmdssdhWWWWWWWWkdssdmdddk.....',
  '......kddddmdkTTWWWWWWTTkdmddddk......',
  // Rows 29-41: Torso with Smiling Sun Emblem
  '........kkkkkTTTTWWWWTTTTkkkkk........',
  '.......kddddkTTTYYYYYYTTkddddk........',
  '......kdddddkTTYOOOOOOYTTkdddddk......',
  '......kssmdskTYOOZZZZOOYkksmdssk......',
  '......kssmdskTYOZkkkkZOYkksmdssk......',
  '......kssmdskTYOZk..kZOYkksmdssk......',
  '......kdddddkTYOZZZZZZOYkdddddkk......',
  '......kdddddkTTYZkkkkZYTTkdddddk......',
  '.......kddddkTTTYO..OYTTkddddk........',
  '........kkkkkTTTYYYYYYTTkkkkk.........',
  '............kTTTTWWWWTTTTk............',
  '............kTTTTWWWWTTTTk............',
  '............kTTTTWWWWTTTTk............',
  // Rows 42-45: Leather Belt & Buckle
  '............klllLLLLLLlllk............',
  '............kLLLGZZZZGLLLk............',
  '............kLLLGZZZZGLLLk............',
  '............klllLLLLLLlllk............',
  // Rows 46-51: Surcoat Split & Iron Greaves
  '...........kTTTkkk..kkkTTTk...........',
  '..........kTTTksmd..dmskTTTk..........',
  '.........kTTTkssmd..dmsskTTTk.........',
  '.........kTTTkssmd..dmsskTTTk.........',
  '.........kTTTkddmd..dmddkTTTk.........',
  '.........kkkkkddkk..kkddkkkkk.........',
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

// Generate Radiant Sun in the Background (Center X: 240, Center Y: 105)
function generateRadiantSun(cx, cy) {
  const rects = [];
  const R = 18; // Sun disc radius in pixels

  // 1. Solid glowing Sun Disc
  for (let r = cy - R; r <= cy + R; r += 2) {
    for (let c = cx - R; c <= cx + R; c += 2) {
      const dx = c - cx;
      const dy = r - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= R) {
        let col = '#f59e0b';
        if (dist <= R * 0.4) col = '#ffffff';
        else if (dist <= R * 0.7) col = '#fde047';
        else if (dist <= R * 0.9) col = '#f5b547';
        rects.push(`<rect x="${c * S}" y="${r * S}" width="${2 * S}" height="${2 * S}" fill="${col}"/>`);
      }
    }
  }

  // 2. Majestic Triangular Sun Rays (16 rays around the Sun)
  const rayAngles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];
  for (const angle of rayAngles) {
    const rad = (angle * Math.PI) / 180;
    const rayLen = (angle % 45 === 0) ? 36 : 26;
    for (let d = R + 2; d <= R + rayLen; d += 2) {
      const rx = Math.round(cx + Math.cos(rad) * d);
      const ry = Math.round(cy + Math.sin(rad) * d);
      const intensity = 1 - (d - R) / rayLen;
      const col = intensity > 0.6 ? '#fde047' : (intensity > 0.3 ? '#f59e0b' : '#c9a876');
      rects.push(`<rect class="sun-ray" x="${rx * S}" y="${ry * S}" width="${2 * S}" height="${2 * S}" fill="${col}"/>`);
    }
  }

  return rects.join('');
}

// Floating Holy Sunlight Motes / Golden Sparkles
function generateSunlightMotes() {
  const motes = [
    { x: 120, y: 80,  c: '#ffffff', dur: '2.8s', d: '0s' },
    { x: 340, y: 70,  c: '#fde047', dur: '3.4s', d: '0.4s' },
    { x: 160, y: 150, c: '#f59e0b', dur: '2.5s', d: '1.0s' },
    { x: 310, y: 140, c: '#ffffff', dur: '3.0s', d: '0.7s' },
    { x: 200, y: 60,  c: '#fde047', dur: '2.9s', d: '1.5s' },
    { x: 280, y: 55,  c: '#f5b547', dur: '3.2s', d: '1.2s' },
    { x: 100, y: 190, c: '#fde047', dur: '3.1s', d: '0.2s' },
    { x: 380, y: 180, c: '#ffffff', dur: '2.7s', d: '0.9s' },
  ];

  return motes.map((m, i) => `
    <rect class="mote mote-${i}" x="${m.x}" y="${m.y}" width="4" height="4" fill="${m.c}" style="animation: moteFloat ${m.dur} ease-in-out infinite ${m.d};"/>
  `).join('');
}

// Assemble Scene
const groundY = 275;
const solaireStartX = 240 - 19 * S; // Centered
const solaireStartY = groundY - 52 * S;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Solaire of Astora — Praise The Sun! \ [T] /</title>
  <defs>
    <!-- Warm Solar Sky Gradient -->
    <radialGradient id="solarSky" cx="50%" cy="32%" r="70%">
      <stop offset="0%" stop-color="#3d270f" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#1c1308" stop-opacity="0.98"/>
      <stop offset="100%" stop-color="#0b0806" stop-opacity="1"/>
    </radialGradient>

    <!-- Golden Floor Reflection -->
    <radialGradient id="solarFloor" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#6e4414" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#2b1a09" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0b0806" stop-opacity="0"/>
    </radialGradient>

    <!-- Title Glow Gradient -->
    <linearGradient id="praiseGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <!-- Sun Bloom Filter -->
    <filter id="sunBloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    /* Solaire Gentle Breathing Loop */
    .solaire-body {
      animation: solaireBreathe 3.2s ease-in-out infinite;
      transform-origin: 240px ${groundY}px;
    }
    @keyframes solaireBreathe {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-3px); }
    }

    /* Radiant Sun Pulse */
    .radiant-sun {
      animation: sunPulse 4.0s ease-in-out infinite;
      transform-origin: 240px 105px;
    }
    @keyframes sunPulse {
      0%, 100% { opacity: 0.92; transform: scale(1); }
      50%      { opacity: 1;    transform: scale(1.03); }
    }

    /* Floating Holy Sunlight Motes */
    @keyframes moteFloat {
      0% {
        transform: translate(0, 0);
        opacity: 0.2;
      }
      50% {
        transform: translate(4px, -18px);
        opacity: 1;
      }
      100% {
        transform: translate(-3px, -36px);
        opacity: 0;
      }
    }

    /* Title Glow Aura */
    .praise-title {
      animation: titleGlow 2.6s ease-in-out infinite;
    }
    @keyframes titleGlow {
      0%, 100% { opacity: 0.9; }
      50%      { opacity: 1; filter: drop-shadow(0 0 6px #f59e0b); }
    }
  </style>

  <!-- 1. Background Atmosphere -->
  <rect width="${W}" height="${H}" fill="url(#solarSky)"/>
  <!-- Golden Floor Glow -->
  <ellipse cx="240" cy="${groundY + 12}" rx="200" ry="36" fill="url(#solarFloor)"/>

  <!-- Stepped Ground Horizon -->
  <rect x="0" y="${groundY + 22}" width="${W}" height="${H - groundY - 22}" fill="#0b0806"/>
  <line x1="0" y1="${groundY + 22}" x2="${W}" y2="${groundY + 22}" stroke="#2b1a09" stroke-width="2"/>

  <!-- 2. The Incandescent Radiant Sun -->
  <g class="radiant-sun" filter="url(#sunBloom)">
    ${generateRadiantSun(60, 26)}
  </g>

  <!-- 3. Floating Sunlight Motes -->
  ${generateSunlightMotes()}

  <!-- 4. Solaire Ground Shadow -->
  <ellipse cx="240" cy="${groundY + 6}" rx="64" ry="14" fill="#000000" opacity="0.6"/>

  <!-- 5. Solaire of Astora \ [T] / -->
  <g class="solaire-body">
    ${parseMatrix(SOLAIRE_BODY, P, solaireStartX, solaireStartY, S)}
  </g>

  <!-- 6. Iconic Title Header -->
  <g class="praise-title" filter="url(#sunBloom)">
    <text x="240" y="322" font-family="'Press Start 2P', ui-monospace, monospace" font-size="12" letter-spacing="3" fill="url(#praiseGold)" text-anchor="middle">PRAISE THE SUN \ [T] /</text>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated authentic Solaire Praise The Sun (solaire-praise-the-sun.svg) successfully!');
