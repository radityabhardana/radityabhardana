/**
 * scripts/generate-banner.mjs
 * Generates a sleek, cinematic Dark Souls title banner:
 * - Replaces the huge clunky 220px box with a refined, widescreen aesthetic
 * - Transparent background, delicate tapering gold wings
 * - Majestic golden title & crisp subtitle
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'assets', 'scenes', 'banner.svg');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="96" viewBox="0 0 900 96" shape-rendering="crispEdges">
  <title>Raditya Bagus Hardana — Dark Souls Header</title>
  <defs>
    <!-- Left Tapering Wing -->
    <linearGradient id="bFadeL" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="60%" stop-color="#8a7455" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#f4a742" stop-opacity="1"/>
    </linearGradient>
    <!-- Right Tapering Wing -->
    <linearGradient id="bFadeR" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f4a742" stop-opacity="1"/>
      <stop offset="40%" stop-color="#8a7455" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
    <!-- Golden Title Gradient -->
    <linearGradient id="titleGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff8e7"/>
      <stop offset="40%" stop-color="#f4a742"/>
      <stop offset="100%" stop-color="#c9a876"/>
    </linearGradient>
  </defs>

  <style>
    .b-pulse { animation: bPulse 2.8s ease-in-out infinite; }
    @keyframes bPulse {
      0%, 100% { opacity: 0.65; }
      50% { opacity: 1; }
    }
  </style>

  <!-- Top Center Ornamental Crest -->
  <g class="b-pulse">
    <polygon points="450,6 456,12 450,18 444,12" fill="#f4a742"/>
    <polygon points="450,9 453,12 450,15 447,12" fill="#fff8e7"/>
  </g>

  <!-- Left Horizontal Ornamental Wing -->
  <line x1="50" y1="48" x2="200" y2="48" stroke="url(#bFadeL)" stroke-width="1.5"/>
  <rect x="204" y="47" width="3" height="3" fill="#f4a742"/>
  <rect x="210" y="46" width="5" height="5" fill="#c9a876"/>
  <rect x="218" y="45" width="7" height="7" fill="#f4a742"/>
  <line x1="228" y1="48" x2="248" y2="48" stroke="#f4a742" stroke-width="1.5"/>

  <!-- Right Horizontal Ornamental Wing -->
  <line x1="652" y1="48" x2="672" y2="48" stroke="#f4a742" stroke-width="1.5"/>
  <rect x="675" y="45" width="7" height="7" fill="#f4a742"/>
  <rect x="685" y="46" width="5" height="5" fill="#c9a876"/>
  <rect x="693" y="47" width="3" height="3" fill="#f4a742"/>
  <line x1="700" y1="48" x2="850" y2="48" stroke="url(#bFadeR)" stroke-width="1.5"/>

  <!-- Main Name Title (Cinematic Tracking) -->
  <text x="450" y="52" font-family="'Press Start 2P', ui-monospace, monospace" font-size="16" letter-spacing="5" fill="url(#titleGold)" text-anchor="middle">RADITYA BAGUS HARDANA</text>

  <!-- Subtle Accent Underline -->
  <line x1="320" y1="62" x2="580" y2="62" stroke="#3a2f1f" stroke-width="1"/>
  <rect x="448" y="60" width="4" height="4" fill="#c9a876"/>

  <!-- Subtitle (Clean & Professional) -->
  <text x="450" y="78" font-family="ui-monospace, Consolas, monospace" font-size="10" font-weight="bold" letter-spacing="4" fill="#8a7455" text-anchor="middle">FULL-STACK DEVELOPER · AUTOMATION SPECIALIST</text>
</svg>
`;

writeFileSync(OUT_FILE, svg);
console.log('✨ Sleek Dark Souls banner.svg generated successfully!');
