/**
 * scripts/generate-repo-cards.mjs
 * Generates custom Dark Souls pixel-art Boss / Pinned Repo Cards.
 * Completely eliminates the ugly default Markdown table with blue links.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, '..', 'assets', 'cards');
mkdirSync(CARDS_DIR, { recursive: true });

const S = 3; // 1 pixel = 3x3 for icons

// Helper to convert pixel matrix
function renderMatrix(map, pal, startX, startY) {
  const rects = [];
  for (let r = 0; r < map.length; r++) {
    const line = map[r];
    let c = 0;
    while (c < line.length) {
      const ch = line[c];
      const color = pal[ch];
      if (!color) { c++; continue; }
      let len = 1;
      while (c + len < line.length && line[c + len] === ch) len++;
      rects.push(`<rect x="${startX + c * S}" y="${startY + r * S}" width="${len * S}" height="${S}" fill="${color}"/>`);
      c += len;
    }
  }
  return rects.join('');
}

// Pixel Icons (16x16)
const ICON_SPECTRE = [
  '.....KKKKKK.....',
  '...KKCCCCCCKK...',
  '..KCCCCCCCCCCK..',
  '.KCCWKKCCWKKCCK.',
  '.KCCWKKCCWKKCCK.',
  '.KCCCCCCCCCCCCK.',
  '.KCCCCCCCCCCCCK.',
  '..KCCKKKKKKCCK..',
  '..KCCKCCCCKCCK..',
  '...KKCCCCCCKK...',
  '....KCCCCCCK....',
  '...KCCCCCCCCK...',
  '..KC.CC..CC.CK..',
  '..K..CC..CC..K..',
  '.....CC..CC.....',
  '................',
];
const PAL_SPECTRE = { K: '#111927', C: '#38bdf8', W: '#ffffff' };

const ICON_ICARUS = [
  '.......YY.......',
  '......YYYY......',
  '.....YYWWYY.....',
  '....YYYYYYYY....',
  '...YY.YYYY.YY...',
  '..YY..YYYY..YY..',
  '.YY...YYYY...YY.',
  'YY....YYYY....YY',
  '......YYYY......',
  '......RRRR......',
  '.....RRRRRR.....',
  '.....GGGGGG.....',
  '......ssss......',
  '......ssss......',
  '......GGGG......',
  '................',
];
const PAL_ICARUS = { Y: '#f59e0b', W: '#ffffff', R: '#ef4444', G: '#c9a876', s: '#451a03' };

const ICON_BLACKBOX = [
  'KKKKKKKKKKKKKKKK',
  'KGGGGGGGGGGGGGGK',
  'KG............GK',
  'KG.GGGGGGGGGG.GK',
  'KG.G........G.GK',
  'KG.G..GGGG..G.GK',
  'KG.G..GWWG..G.GK',
  'KG.G..GWWG..G.GK',
  'KG.G..GGGG..G.GK',
  'KG.G........G.GK',
  'KG.GGGGGGGGGG.GK',
  'KG............GK',
  'KGGGGGGGGGGGGGGK',
  'KKKKKKKKKKKKKKKK',
  '....KGGGGGGK....',
  '....KKKKKKKK....',
];
const PAL_BLACKBOX = { K: '#091512', G: '#10b981', W: '#ecfdf5' };

const ICON_KALPINDO = [
  '..GGGGGGGGGGGG..',
  '.GGssGGssGGssGG.',
  'GGssssssssssssGG',
  'GGssWWssssWWssGG',
  'GGssssRRRRssssGG',
  'GGssssRRRRssssGG',
  'GGssssssssssssGG',
  '.GGssssssssssGG.',
  '..GGssssssssGG..',
  '...GGssssssGG...',
  '....GGssssGG....',
  '.....GGssGG.....',
  '......GGGG......',
  '.......GG.......',
  '................',
  '................',
];
const PAL_KALPINDO = { G: '#c9a876', s: '#272016', W: '#ffffff', R: '#b91c1c' };

const ICON_SMARTSTUDY = [
  '....GGGGGGGG....',
  '..GGWWWWWWWWGG..',
  '.GGWKKWKKWKKWGG.',
  'GGWKKWKKWKKWKWWG',
  'GGWWWWWWWWWWWWWG',
  'GGWKKWKKWKKWKWWG',
  'GGWWWWWWWWWWWWWG',
  'GGWKKWKKWKKWKWWG',
  'GGWWWWWWWWWWWWWG',
  'GGWKKWKKWKKWKWWG',
  'GGWWWWWWWWWWWWWG',
  '.GGWWWWWWWWWWGG.',
  '..GGGGGGGGGGGG..',
  '....GGssssGG....',
  '.....GGGGGG.....',
  '................',
];
const PAL_SMARTSTUDY = { G: '#a855f7', W: '#f3e8ff', K: '#3b0764', s: '#6b21a8' };

const projects = [
  {
    id: 'spectre',
    name: 'spectre_terminal',
    title: 'SPECTRE TERMINAL',
    lang: 'JavaScript',
    iconMatrix: ICON_SPECTRE,
    iconPal: PAL_SPECTRE,
    descLine1: 'Polymarket intelligence terminal with',
    descLine2: 'deterministic EV mathematical guardrails.',
  },
  {
    id: 'icarus',
    name: 'icarus-watermark-remover',
    title: 'ICARUS WATERMARK',
    lang: 'JavaScript',
    iconMatrix: ICON_ICARUS,
    iconPal: PAL_ICARUS,
    descLine1: 'AI-powered image editing suite for',
    descLine2: 'seamless watermark & object erasure.',
  },
  {
    id: 'blackbox',
    name: 'blackbox_signal_lost',
    title: 'BLACKBOX SIGNAL LOST',
    lang: 'TypeScript',
    iconMatrix: ICON_BLACKBOX,
    iconPal: PAL_BLACKBOX,
    descLine1: 'Browser OS detective simulation game',
    descLine2: 'set inside a fictional civic system.',
  },
  {
    id: 'kalpindo',
    name: 'Kalpindo',
    title: 'KALPINDO PORTAL',
    lang: 'Corporate Web',
    iconMatrix: ICON_KALPINDO,
    iconPal: PAL_KALPINDO,
    descLine1: 'Official company profile web platform for',
    descLine2: 'PT Kalibrasi Pengujian Indonesia.',
  },
  {
    id: 'smartstudy',
    name: 'smart_study',
    title: 'SMART STUDY AI',
    lang: 'TypeScript',
    iconMatrix: ICON_SMARTSTUDY,
    iconPal: PAL_SMARTSTUDY,
    descLine1: 'Intelligent AI-driven learning platform',
    descLine2: '& adaptive study companion application.',
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="130" viewBox="0 0 450 130" shape-rendering="crispEdges">
  <title>${escXml(p.title)} — Boss Defeated</title>
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#14110d"/>
      <stop offset="100%" stop-color="#090807"/>
    </linearGradient>
  </defs>

  <style>
    .card-border { stroke: #3a2e20; stroke-width: 1.5; }
    .card-glow { animation: cGlow 3.5s ease-in-out infinite; }
    @keyframes cGlow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  </style>

  <!-- Card Body -->
  <rect x="2" y="2" width="446" height="126" rx="2" fill="url(#bgGrad)"/>
  <rect class="card-border" x="2" y="2" width="446" height="126" rx="2" fill="none"/>
  <rect x="5" y="5" width="440" height="120" fill="none" stroke="#211910" stroke-width="1"/>

  <!-- Stepped Golden Corner Rivets -->
  <g fill="#c9a876">
    <rect x="2" y="2" width="6" height="2"/>
    <rect x="2" y="2" width="2" height="6"/>
    <rect x="442" y="2" width="6" height="2"/>
    <rect x="446" y="2" width="2" height="6"/>
    <rect x="2" y="126" width="6" height="2"/>
    <rect x="2" y="122" width="2" height="6"/>
    <rect x="442" y="126" width="6" height="2"/>
    <rect x="446" y="122" width="2" height="6"/>
  </g>

  <!-- Left Icon Frame -->
  <rect x="14" y="18" width="56" height="56" fill="#090807" stroke="#332719" stroke-width="1"/>
  <rect x="16" y="20" width="52" height="52" fill="#14110c"/>
  <!-- Relic / Boss Icon -->
  ${renderMatrix(p.iconMatrix, p.iconPal, 18, 22)}

  <!-- Title & Repo Name -->
  <text x="82" y="32" font-family="'Press Start 2P', ui-monospace, monospace" font-size="10" letter-spacing="1" fill="#f4a742">${escXml(p.title)}</text>

  <!-- Language Badge (Top Right) -->
  <rect x="330" y="18" width="104" height="18" rx="2" fill="#1b150f" stroke="#4a3620" stroke-width="1"/>
  <text x="382" y="30" font-family="ui-monospace, Consolas, monospace" font-size="9" font-weight="bold" letter-spacing="1" fill="#c9a876" text-anchor="middle">${escXml(p.lang)}</text>

  <!-- Description Lines -->
  <text x="82" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#d1cbc3">${escXml(p.descLine1)}</text>
  <text x="82" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#d1cbc3">${escXml(p.descLine2)}</text>

  <!-- Divider Line -->
  <line x1="14" y1="88" x2="436" y2="88" stroke="#2b2014" stroke-width="1"/>

  <!-- Footer Elements -->
  <!-- Status Badge (Left) -->
  <rect x="14" y="96" width="94" height="20" rx="2" fill="#6e0d0d" stroke="#a82828" stroke-width="1"/>
  <text x="61" y="110" font-family="'Press Start 2P', ui-monospace, monospace" font-size="7" letter-spacing="1" fill="#ffffff" text-anchor="middle">⚔️ DEFEATED</text>

  <!-- Action Prompt (Right) -->
  <text x="436" y="110" font-family="'Press Start 2P', ui-monospace, monospace" font-size="7" letter-spacing="1" fill="#c9a876" text-anchor="end">VIEW REMEMBRANCE ➔</text>
</svg>
`;

  writeFileSync(join(CARDS_DIR, `card-${p.id}.svg`), svg);
  console.log(`Generated card-${p.id}.svg`);
}

console.log('✨ All Dark Souls Boss Repo Cards generated successfully!');
