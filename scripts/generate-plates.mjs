/**
 * scripts/generate-plates.mjs
 * Generates custom professional Dark Souls gothic gold plate SVGs:
 * 1. plate-about.svg       -> "ABOUT ME"
 * 2. plate-stack.svg       -> "TECH STACK"
 * 3. plate-projects.svg    -> "FEATURED PROJECTS"
 * 4. plate-activity.svg    -> "CONTRIBUTIONS"
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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="110" viewBox="0 0 900 110" shape-rendering="crispEdges">
  <title>${escXml(p.title)}</title>
  <style>
    .blink-diamond { animation: bk 1.6s step-end infinite; }
    @keyframes bk { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.45; } }
  </style>

  <!-- Dark Cathedral Stone Base -->
  <rect width="900" height="110" fill="#0d0d0d"/>

  <!-- Outer Bronze Border -->
  <rect x="10" y="10" width="880" height="90" fill="none" stroke="#3a2f1f" stroke-width="3"/>

  <!-- Inner Gold Inscription Border -->
  <rect x="18" y="18" width="864" height="74" fill="none" stroke="#c9a876" stroke-width="1" opacity="0.7"/>

  <!-- Stepped Golden Corner Rivets -->
  <rect x="10" y="10" width="8" height="8" fill="#c9a876"/>
  <rect x="882" y="10" width="8" height="8" fill="#c9a876"/>
  <rect x="10" y="92" width="8" height="8" fill="#c9a876"/>
  <rect x="882" y="92" width="8" height="8" fill="#c9a876"/>

  <!-- Top Center Crest / Roman Numeral Badge -->
  <rect x="430" y="4" width="40" height="20" fill="#0d0d0d"/>
  <polygon class="blink-diamond" points="450,8 456,14 450,20 444,14" fill="#f4a742"/>
  <text x="450" y="32" font-family="'Press Start 2P', ui-monospace, monospace" font-size="9" fill="#c9a876" text-anchor="middle">${escXml(p.numeral)}</text>

  <!-- Left Flanking Pixel Diamond -->
  <g transform="translate(260, 56)">
    <polygon points="0,-8 8,0 0,8 -8,0" fill="#c9a876"/>
    <polygon points="0,-4 4,0 0,4 -4,0" fill="#fff5cc"/>
    <line x1="-30" y1="0" x2="-14" y2="0" stroke="#8a7455" stroke-width="1.5"/>
  </g>

  <!-- Main Section Title -->
  <text x="450" y="62" font-family="'Press Start 2P', ui-monospace, monospace" font-size="16" letter-spacing="4" fill="#f4a742" text-anchor="middle">${escXml(p.title)}</text>

  <!-- Right Flanking Pixel Diamond -->
  <g transform="translate(640, 56)">
    <polygon points="0,-8 8,0 0,8 -8,0" fill="#c9a876"/>
    <polygon points="0,-4 4,0 0,4 -4,0" fill="#fff5cc"/>
    <line x1="14" y1="0" x2="30" y2="0" stroke="#8a7455" stroke-width="1.5"/>
  </g>

  <!-- Subtitle Caption -->
  <text x="450" y="82" font-family="'Press Start 2P', ui-monospace, monospace" font-size="8" letter-spacing="3" fill="#8a7455" text-anchor="middle">${escXml(p.subtitle)}</text>
</svg>
`;

  writeFileSync(join(PLATES_DIR, p.filename), svg);
  console.log(`Generated ${p.filename}`);
}

console.log('✨ All new gothic plates generated successfully!');
