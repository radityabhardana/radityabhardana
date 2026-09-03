/**
 * scripts/generate-plates.mjs
 * Generates sleek, cinematic Soft Dark Souls section headers:
 * - NO ugly clunky rectangular boxes or heavy borders
 * - Elegant tapering horizontal wings fading into transparency
 * - Sharp pixel diamond accents and Roman numeral crests
 * - Crisp, letter-spaced gold typography with subtle subtitle
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
  },
  {
    filename: 'plate-stack.svg',
    numeral: 'II',
    title: 'TECH STACK',
    subtitle: 'TOOLS & TECHNOLOGIES',
  },
  {
    filename: 'plate-projects.svg',
    numeral: 'III',
    title: 'FEATURED PROJECTS',
    subtitle: 'SELECTED REPOSITORIES & SYSTEMS',
  },
  {
    filename: 'plate-activity.svg',
    numeral: 'IV',
    title: 'CONTRIBUTIONS',
    subtitle: 'GITHUB ACTIVITY & EXPEDITIONS',
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const p of plates) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="56" viewBox="0 0 800 56" shape-rendering="crispEdges">
  <title>${escXml(p.title)}</title>
  <defs>
    <!-- Tapering Left Wing Gradient -->
    <linearGradient id="fadeL" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="60%" stop-color="#8a7455" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#f4a742" stop-opacity="1"/>
    </linearGradient>
    <!-- Tapering Right Wing Gradient -->
    <linearGradient id="fadeR" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f4a742" stop-opacity="1"/>
      <stop offset="40%" stop-color="#8a7455" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
    <!-- Gold Text Shimmer -->
    <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff5cc"/>
      <stop offset="45%" stop-color="#f4a742"/>
      <stop offset="100%" stop-color="#c9a876"/>
    </linearGradient>
  </defs>

  <style>
    .crest-glow { animation: cPulse 2.4s ease-in-out infinite; }
    @keyframes cPulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
  </style>

  <!-- Left Horizontal Tapering Wing -->
  <line x1="80" y1="28" x2="260" y2="28" stroke="url(#fadeL)" stroke-width="1.5"/>
  <rect x="264" y="27" width="3" height="3" fill="#f4a742"/>
  <rect x="270" y="26" width="5" height="5" fill="#c9a876"/>
  <line x1="278" y1="28" x2="294" y2="28" stroke="#f4a742" stroke-width="1.5"/>

  <!-- Right Horizontal Tapering Wing -->
  <line x1="506" y1="28" x2="522" y2="28" stroke="#f4a742" stroke-width="1.5"/>
  <rect x="525" y="26" width="5" height="5" fill="#c9a876"/>
  <rect x="533" y="27" width="3" height="3" fill="#f4a742"/>
  <line x1="540" y1="28" x2="720" y2="28" stroke="url(#fadeR)" stroke-width="1.5"/>

  <!-- Top Center Roman Crest -->
  <g class="crest-glow">
    <polygon points="400,2 404,7 400,12 396,7" fill="#f4a742"/>
    <text x="400" y="19" font-family="'Press Start 2P', ui-monospace, monospace" font-size="7.5" fill="#c9a876" text-anchor="middle">${escXml(p.numeral)}</text>
  </g>

  <!-- Main Section Title (Cinematic Dark Souls Typography) -->
  <text x="400" y="36" font-family="'Press Start 2P', ui-monospace, monospace" font-size="13" letter-spacing="4" fill="url(#goldText)" text-anchor="middle">${escXml(p.title)}</text>

  <!-- Subtitle Caption -->
  <text x="400" y="49" font-family="ui-monospace, Consolas, monospace" font-size="8" letter-spacing="3" fill="#8a7455" text-anchor="middle">${escXml(p.subtitle)}</text>
</svg>
`;

  writeFileSync(join(PLATES_DIR, p.filename), svg);
  console.log(`Generated ${p.filename}`);
}

console.log('✨ All sleek cinematic Dark Souls headers generated successfully!');
