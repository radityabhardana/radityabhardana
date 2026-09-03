/**
 * scripts/generate-repo-cards.mjs
 * Generates custom Soft Dark Souls Pinned Repo Cards:
 * - Subtle, elegant gothic luxury aesthetics (no excessive cringe gaming hype)
 * - Sharp pixel-art domain icons in antique bronze frames
 * - Category domain badges, language indicators, crisp descriptions
 * - Professional repo metadata and clean interactive prompts
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, '..', 'assets', 'cards');
mkdirSync(CARDS_DIR, { recursive: true });

const S = 3; // 1 pixel = 3x3 for icons

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

// 16x16 Pixel Icons
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
  '..GGWWWWWWWWGG..',
  '...GGGGGGGGGG...',
  '....GGssssGG....',
  '.....GGGGGG.....',
  '................',
];
const PAL_SMARTSTUDY = { G: '#a855f7', W: '#f3e8ff', K: '#3b0764', s: '#6b21a8' };

const projects = [
  {
    id: 'spectre',
    name: 'radityabhardana/spectre_terminal',
    category: 'FINTECH · EV CALCULATOR',
    title: 'SPECTRE TERMINAL',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    iconMatrix: ICON_SPECTRE,
    iconPal: PAL_SPECTRE,
    descLine1: 'Polymarket intelligence terminal with mathematical',
    descLine2: 'expected-value guardrails for market decisions.',
    status: 'Active Project',
    tag: 'Fintech / EV',
  },
  {
    id: 'icarus',
    name: 'radityabhardana/icarus-watermark-remover',
    category: 'AI · COMPUTER VISION',
    title: 'ICARUS WATERMARK REMOVER',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    iconMatrix: ICON_ICARUS,
    iconPal: PAL_ICARUS,
    descLine1: 'AI-assisted web canvas suite for intelligent',
    descLine2: 'watermark cleaning and object inpainting.',
    status: 'Open Source',
    tag: 'AI / Image',
  },
  {
    id: 'blackbox',
    name: 'radityabhardana/blackbox_signal_lost',
    category: 'SIMULATION · BROWSER OS',
    title: 'BLACKBOX: SIGNAL LOST',
    lang: 'TypeScript',
    langColor: '#3178c6',
    iconMatrix: ICON_BLACKBOX,
    iconPal: PAL_BLACKBOX,
    descLine1: 'Atmospheric detective simulator set within an',
    descLine2: 'enigmatic vintage civic operating system.',
    status: 'Interactive Game',
    tag: 'Web OS / Audio',
  },
  {
    id: 'kalpindo',
    name: 'radityabhardana/Kalpindo',
    category: 'ENTERPRISE · WEB PLATFORM',
    title: 'KALPINDO PROFILE',
    lang: 'PHP / Web',
    langColor: '#4f5d95',
    iconMatrix: ICON_KALPINDO,
    iconPal: PAL_KALPINDO,
    descLine1: 'Official corporate web platform & service portal',
    descLine2: 'for PT Kalibrasi Pengujian Indonesia.',
    status: 'Production',
    tag: 'Company Profile',
  },
  {
    id: 'smartstudy',
    name: 'radityabhardana/smart_study',
    category: 'EDTECH · ADAPTIVE AI',
    title: 'SMART STUDY AI',
    lang: 'TypeScript',
    langColor: '#3178c6',
    iconMatrix: ICON_SMARTSTUDY,
    iconPal: PAL_SMARTSTUDY,
    descLine1: 'Intelligent learning companion designed with',
    descLine2: 'automated study planning and adaptive revision.',
    status: 'AI Platform',
    tag: 'Education / AI',
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="135" viewBox="0 0 450 135" shape-rendering="crispEdges">
  <title>${escXml(p.title)} — ${escXml(p.category)}</title>
  <defs>
    <linearGradient id="cardBg_${p.id}" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#14110d"/>
      <stop offset="100%" stop-color="#090807"/>
    </linearGradient>
  </defs>

  <!-- Card Background -->
  <rect x="2" y="2" width="446" height="131" rx="2" fill="url(#cardBg_${p.id})"/>
  <!-- Outer Bronze Border -->
  <rect x="2" y="2" width="446" height="131" rx="2" fill="none" stroke="#332719" stroke-width="1.5"/>
  <!-- Inner Muted Inscription Line -->
  <rect x="5" y="5" width="440" height="125" rx="1" fill="none" stroke="#1f1811" stroke-width="1"/>

  <!-- Antique Gold Corner Accents -->
  <g fill="#c9a876">
    <rect x="2" y="2" width="6" height="2"/>
    <rect x="2" y="2" width="2" height="6"/>
    <rect x="442" y="2" width="6" height="2"/>
    <rect x="446" y="2" width="2" height="6"/>
    <rect x="2" y="131" width="6" height="2"/>
    <rect x="2" y="127" width="2" height="6"/>
    <rect x="442" y="131" width="6" height="2"/>
    <rect x="446" y="127" width="2" height="6"/>
  </g>

  <!-- Left Icon Frame (Antique Stone Alcove) -->
  <rect x="14" y="18" width="56" height="56" rx="2" fill="#090807" stroke="#2b2014" stroke-width="1.5"/>
  <rect x="16" y="20" width="52" height="52" fill="#14100b"/>
  <!-- Pixel Art Relic Icon -->
  ${renderMatrix(p.iconMatrix, p.iconPal, 18, 22)}

  <!-- Category Tag (Top Subtitle) -->
  <text x="82" y="26" font-family="'Press Start 2P', ui-monospace, monospace" font-size="7" letter-spacing="1.5" fill="#8a7455">${escXml(p.category)}</text>

  <!-- Project Title -->
  <text x="82" y="44" font-family="'Press Start 2P', ui-monospace, monospace" font-size="10" letter-spacing="1" fill="#f4a742">${escXml(p.title)}</text>

  <!-- Language Badge (Top Right) -->
  <g transform="translate(330, 16)">
    <rect x="0" y="0" width="106" height="20" rx="3" fill="#120e0a" stroke="#2e2215" stroke-width="1"/>
    <!-- Language Circle -->
    <circle cx="12" cy="10" r="4" fill="${p.langColor}"/>
    <text x="22" y="13" font-family="ui-monospace, Consolas, monospace" font-size="9" font-weight="bold" fill="#cfcfcf">${escXml(p.lang)}</text>
  </g>

  <!-- Description (2 Lines, Clean & Informative) -->
  <text x="82" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#d4cec7">${escXml(p.descLine1)}</text>
  <text x="82" y="79" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#d4cec7">${escXml(p.descLine2)}</text>

  <!-- Subtle Inscription Divider Line -->
  <line x1="14" y1="94" x2="436" y2="94" stroke="#21180f" stroke-width="1"/>

  <!-- Footer Elements -->
  <!-- Status Pill (Soft Dark Souls touch: embered status) -->
  <g transform="translate(14, 103)">
    <rect x="0" y="0" width="112" height="20" rx="3" fill="#1a140d" stroke="#3d2c19" stroke-width="1"/>
    <circle cx="10" cy="10" r="3" fill="#10b981"/>
    <text x="20" y="13.5" font-family="ui-monospace, Consolas, monospace" font-size="9" fill="#c9a876">${escXml(p.status)}</text>
  </g>

  <!-- Tag Chip (Middle) -->
  <g transform="translate(136, 103)">
    <rect x="0" y="0" width="94" height="20" rx="3" fill="#120e0a" stroke="#261c11" stroke-width="1"/>
    <text x="47" y="13.5" font-family="ui-monospace, Consolas, monospace" font-size="8.5" fill="#8a7455" text-anchor="middle">${escXml(p.tag)}</text>
  </g>

  <!-- Action Prompt (Right) -->
  <text x="436" y="117" font-family="ui-monospace, Consolas, monospace" font-size="10" font-weight="bold" letter-spacing="1" fill="#c9a876" text-anchor="end">VIEW ON GITHUB ↗</text>
</svg>
`;

  writeFileSync(join(CARDS_DIR, `card-${p.id}.svg`), svg);
  console.log(`Generated card-${p.id}.svg`);
}

console.log('✨ All Soft Dark Souls Repo Cards generated successfully!');
