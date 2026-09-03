/**
 * scripts/generate-plates.mjs
 * Generates larger, bolder, highly readable Dark Souls section header plates:
 * - Canvas: 800x74px (expanded height for generous breathing room)
 * - Title: 20px (was 13px) - bold, clear, authoritative
 * - Subtitle: 11.5px (was 8px) - crisp, easily readable gold/ashen
 * - Crest numeral: 11px (was 7.5px) - prominent chapter sigil
 * - Elegant tapering wings framing the wider text
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLATES_DIR = join(__dirname, '..', 'assets', 'plates');
mkdirSync(PLATES_DIR, { recursive: true });

const plates = [
  {
    filename: 'plate-about.svg',
    numeral: 'I',
    title: 'ABOUT ME',
    subtitle: 'PROFILE & BACKGROUND',
    textSpanHalf: 130, // For wing spacing
  },
  {
    filename: 'plate-stack.svg',
    numeral: 'II',
    title: 'TECH STACK',
    subtitle: 'TOOLS & TECHNOLOGIES',
    textSpanHalf: 145,
  },
  {
    filename: 'plate-projects.svg',
    numeral: 'III',
    title: 'FEATURED PROJECTS',
    subtitle: 'SELECTED REPOSITORIES & SYSTEMS',
    textSpanHalf: 195,
  },
  {
    filename: 'plate-activity.svg',
    numeral: 'IV',
    title: 'CONTRIBUTIONS',
    subtitle: 'GITHUB ACTIVITY & EXPEDITIONS',
    textSpanHalf: 165,
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const p of plates) {
  const leftEdge = 400 - p.textSpanHalf;
  const rightEdge = 400 + p.textSpanHalf;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="74" viewBox="0 0 800 74" shape-rendering="crispEdges">
  <title>${escXml(p.title)}</title>
  <defs>
    <!-- Tapering Left Wing Gradient -->
    <linearGradient id="fadeL_${p.numeral}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="60%" stop-color="#8a7455" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#f4a742" stop-opacity="1"/>
    </linearGradient>
    <!-- Tapering Right Wing Gradient -->
    <linearGradient id="fadeR_${p.numeral}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f4a742" stop-opacity="1"/>
      <stop offset="40%" stop-color="#8a7455" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
    <!-- Gold Text Shimmer -->
    <linearGradient id="goldText_${p.numeral}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff5cc"/>
      <stop offset="40%" stop-color="#f4a742"/>
      <stop offset="100%" stop-color="#c9a876"/>
    </linearGradient>
  </defs>

  <style>
    .crest-glow { animation: cPulse 2.4s ease-in-out infinite; }
    @keyframes cPulse {
      0%, 100% { opacity: 0.75; }
      50% { opacity: 1; }
    }
  </style>

  <!-- Left Horizontal Tapering Wing -->
  <line x1="40" y1="41" x2="${leftEdge - 30}" y2="41" stroke="url(#fadeL_${p.numeral})" stroke-width="1.8"/>
  <rect x="${leftEdge - 26}" y="39.5" width="4" height="4" fill="#f4a742"/>
  <rect x="${leftEdge - 18}" y="38" width="6" height="6" fill="#c9a876"/>
  <line x1="${leftEdge - 8}" y1="41" x2="${leftEdge}" y2="41" stroke="#f4a742" stroke-width="1.8"/>

  <!-- Right Horizontal Tapering Wing -->
  <line x1="${rightEdge}" y1="41" x2="${rightEdge + 8}" y2="41" stroke="#f4a742" stroke-width="1.8"/>
  <rect x="${rightEdge + 12}" y="38" width="6" height="6" fill="#c9a876"/>
  <rect x="${rightEdge + 22}" y="39.5" width="4" height="4" fill="#f4a742"/>
  <line x1="${rightEdge + 30}" y1="41" x2="760" y2="41" stroke="url(#fadeR_${p.numeral})" stroke-width="1.8"/>

  <!-- Top Center Roman Crest -->
  <g class="crest-glow">
    <polygon points="400,2 406,8 400,14 394,8" fill="#f4a742"/>
    <polygon points="400,4 403,8 400,12 397,8" fill="#fff5cc"/>
    <text x="400" y="24" font-family="'Press Start 2P', ui-monospace, monospace" font-size="10.5" font-weight="bold" fill="#f4a742" text-anchor="middle">${escXml(p.numeral)}</text>
  </g>

  <!-- Main Section Title (Prominent, Bold & Clear) -->
  <text x="400" y="48" font-family="'Press Start 2P', ui-monospace, monospace" font-size="19" letter-spacing="4.5" fill="url(#goldText_${p.numeral})" text-anchor="middle">${escXml(p.title)}</text>

  <!-- Subtitle Caption (Crisp & Readable) -->
  <text x="400" y="67" font-family="ui-monospace, Consolas, monospace" font-size="11.5" font-weight="600" letter-spacing="3.5" fill="#c9a876" text-anchor="middle">${escXml(p.subtitle)}</text>
</svg>
`;

  writeFileSync(join(PLATES_DIR, p.filename), svg);
  console.log(`Generated larger plate: ${p.filename}`);
}

console.log('✨ All section header plates regenerated with larger, prominent typography!');
