/**
 * scripts/generate-repo-cards.mjs
 * Generates truly elegant, Soft Dark Souls Pinned Repo Cards:
 * - Eliminates chunky cartoonish corner brackets and colorful arcade sprites
 * - Subtle obsidian/bronze slate with whisper-thin glowing ember top edge
 * - Unified antique gold & steel sigils for each repository
 * - Clean, comfortable champagne typography with generous whitespace
 * - Minimalist meta information without cluttered pill boxes
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, '..', 'assets', 'cards');
mkdirSync(CARDS_DIR, { recursive: true });

// 5 Unified Antique Gold Sigils (28x28 viewBox or drawn inside 36x36 alcove)
const SIGILS = {
  // Spectre Terminal: Occult Eye of Determinism / Horizon Scanner
  spectre: `
    <circle cx="18" cy="18" r="13" fill="none" stroke="#3a2e20" stroke-width="1.2"/>
    <path d="M7 18 C11 11, 25 11, 29 18 C25 25, 11 25, 7 18 Z" fill="none" stroke="#c9a876" stroke-width="1.4"/>
    <circle cx="18" cy="18" r="4.5" fill="#18130d" stroke="#f4a742" stroke-width="1.2"/>
    <circle cx="18" cy="18" r="1.8" fill="#fff5cc"/>
    <line x1="4" y1="18" x2="6" y2="18" stroke="#c9a876" stroke-width="1.5"/>
    <line x1="30" y1="18" x2="32" y2="18" stroke="#c9a876" stroke-width="1.5"/>
  `,

  // Icarus Watermark: Arcane Inpainting Feather & Sparkle
  icarus: `
    <path d="M10 27 C11 20, 16 12, 26 7 C23 14, 21 21, 16 25 C14 26.5, 11.5 27, 10 27 Z" fill="#241b12" stroke="#c9a876" stroke-width="1.3"/>
    <line x1="10" y1="27" x2="23" y2="11" stroke="#f4a742" stroke-width="1.2"/>
    <!-- Sparkle -->
    <path d="M26 13 L27.5 16.5 L31 18 L27.5 19.5 L26 23 L24.5 19.5 L21 18 L24.5 16.5 Z" fill="#fff5cc"/>
  `,

  // Blackbox Signal Lost: Vintage Radio Wave & Sealed Monolith
  blackbox: `
    <rect x="10" y="8" width="16" height="20" rx="1.5" fill="#14100c" stroke="#c9a876" stroke-width="1.4"/>
    <rect x="13" y="11" width="10" height="7" rx="1" fill="#090807" stroke="#3d2f1e" stroke-width="1"/>
    <!-- Waveform inside -->
    <path d="M14 14.5 L16 13 L18 16 L20 14 L22 14.5" fill="none" stroke="#f4a742" stroke-width="1.2"/>
    <!-- Dial / Beacon -->
    <circle cx="18" cy="23" r="2" fill="#c9a876"/>
    <!-- Radiating pulse arcs -->
    <path d="M6 14 C4 16, 4 20, 6 22" fill="none" stroke="#8a7455" stroke-width="1.2"/>
    <path d="M30 14 C32 16, 32 20, 30 22" fill="none" stroke="#8a7455" stroke-width="1.2"/>
  `,

  // Kalpindo: Precision Balance Scale & Heraldic Shield
  kalpindo: `
    <path d="M9 10 L27 10 L25 21 C24 25, 18 28, 18 28 C18 28, 12 25, 11 21 Z" fill="#18130d" stroke="#c9a876" stroke-width="1.3"/>
    <line x1="18" y1="12" x2="18" y2="24" stroke="#f4a742" stroke-width="1.2"/>
    <line x1="13" y1="15" x2="23" y2="15" stroke="#f4a742" stroke-width="1.2"/>
    <circle cx="13" cy="18" r="1.5" fill="#fff5cc"/>
    <circle cx="23" cy="18" r="1.5" fill="#fff5cc"/>
  `,

  // Smart Study AI: Arcane Grimoire / Celestial Study Tome
  smartstudy: `
    <!-- Open Book Wings -->
    <path d="M18 23 C14 20, 9 20, 7 21 L7 10 C9 9, 14 9, 18 12 C22 9, 27 9, 29 10 L29 21 C27 20, 22 20, 18 23 Z" fill="#19130c" stroke="#c9a876" stroke-width="1.3"/>
    <line x1="18" y1="12" x2="18" y2="24" stroke="#f4a742" stroke-width="1.4"/>
    <!-- Celestial star above spine -->
    <polygon points="18,5 19.5,8 22.5,8 20,10 21,13 18,11 15,13 16,10 13.5,8 16.5,8" fill="#fff5cc"/>
  `,
};

const projects = [
  {
    id: 'spectre',
    name: 'radityabhardana/spectre_terminal',
    title: 'Spectre Terminal',
    category: 'Fintech · EV Calculus',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    sigilKey: 'spectre',
    descLine1: 'Polymarket intelligence terminal with mathematical',
    descLine2: 'expected-value guardrails for deterministic decisions.',
    tags: 'Polymarket · EV Math · Terminal',
  },
  {
    id: 'icarus',
    name: 'radityabhardana/icarus-watermark-remover',
    title: 'Icarus Watermark Remover',
    category: 'AI · Computer Vision',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    sigilKey: 'icarus',
    descLine1: 'AI-assisted web canvas suite for intelligent watermark',
    descLine2: 'extraction and seam-carving object inpainting.',
    tags: 'AI Canvas · Inpainting · Browser Tool',
  },
  {
    id: 'blackbox',
    name: 'radityabhardana/blackbox_signal_lost',
    title: 'Blackbox: Signal Lost',
    category: 'Simulation · Browser OS',
    lang: 'TypeScript',
    langColor: '#3178c6',
    sigilKey: 'blackbox',
    descLine1: 'Atmospheric detective simulation game set within an',
    descLine2: 'enigmatic vintage civic operating system.',
    tags: 'Sim Game · Web Audio · Retro UI',
  },
  {
    id: 'kalpindo',
    name: 'radityabhardana/Kalpindo',
    title: 'Kalpindo Company Profile',
    category: 'Enterprise · Web Platform',
    lang: 'PHP / Web',
    langColor: '#8892bf',
    sigilKey: 'kalpindo',
    descLine1: 'Official corporate platform & testing service catalog',
    descLine2: 'for PT Kalibrasi Pengujian Indonesia.',
    tags: 'B2B Enterprise · Portal · Calibration',
  },
  {
    id: 'smartstudy',
    name: 'radityabhardana/smart_study',
    title: 'Smart Study AI',
    category: 'EdTech · Adaptive Learning',
    lang: 'TypeScript',
    langColor: '#3178c6',
    sigilKey: 'smartstudy',
    descLine1: 'Intelligent learning companion engineered with automated',
    descLine2: 'study routines and adaptive spaced-revision tools.',
    tags: 'AI Tutor · Study Planner · EdTech',
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="124" viewBox="0 0 450 124">
  <title>${escXml(p.title)} — ${escXml(p.category)}</title>
  <defs>
    <!-- Soft Obsidian Slate Gradient -->
    <linearGradient id="cardSlate_${p.id}" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#14110d"/>
      <stop offset="100%" stop-color="#0a0807"/>
    </linearGradient>
    <!-- Whisper-thin Top Ember Edge Glow -->
    <linearGradient id="topEmber_${p.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="30%" stop-color="#c9a876" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#f4a742" stop-opacity="0.75"/>
      <stop offset="70%" stop-color="#c9a876" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .repo-card {
      transition: all 0.3s ease;
    }
    .title-text {
      font-family: 'Cinzel', 'Palatino Linotype', 'Book Antiqua', Georgia, -apple-system, sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.8px;
      fill: #edd7b4;
    }
    .desc-text {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 11px;
      line-height: 1.45;
      fill: #a39b8f;
    }
    .meta-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 9px;
      letter-spacing: 0.5px;
      fill: #736758;
    }
    .link-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 9.5px;
      letter-spacing: 0.5px;
      fill: #c9a876;
    }
  </style>

  <!-- Card Base Plate (No Chunky Brackets) -->
  <rect x="1" y="1" width="448" height="122" rx="4" fill="url(#cardSlate_${p.id})"/>
  <!-- Whisper-thin Dark Bronze Outer Outline -->
  <rect x="1" y="1" width="448" height="122" rx="4" fill="none" stroke="#251d14" stroke-width="1"/>

  <!-- Top Ember Accent Edge (Subtle Dark Souls Glow) -->
  <line x1="20" y1="1.5" x2="430" y2="1.5" stroke="url(#topEmber_${p.id})" stroke-width="1.5"/>

  <!-- Left Sigil Alcove -->
  <g transform="translate(14, 16)">
    <rect width="36" height="36" rx="3" fill="#0d0a07" stroke="#2a2015" stroke-width="1"/>
    ${SIGILS[p.sigilKey]}
  </g>

  <!-- Title & Category Header -->
  <text x="60" y="27" class="title-text">${escXml(p.title)}</text>
  <text x="60" y="42" class="meta-text">${escXml(p.name)}</text>

  <!-- Language Indicator (Top Right, Clean & Unboxed) -->
  <g transform="translate(436, 27)">
    <text text-anchor="end" class="meta-text" fill="#9e9383">
      <tspan fill="${p.langColor}" font-size="12">● </tspan>${escXml(p.lang)}
    </text>
  </g>

  <!-- Description Lines -->
  <text x="60" y="62" class="desc-text">${escXml(p.descLine1)}</text>
  <text x="60" y="78" class="desc-text">${escXml(p.descLine2)}</text>

  <!-- Fine Horizontal Inscription Divider -->
  <line x1="14" y1="92" x2="436" y2="92" stroke="#1d160e" stroke-width="1"/>

  <!-- Footer Info -->
  <!-- Left: Domain Tags -->
  <text x="16" y="108" class="meta-text">${escXml(p.tags)}</text>

  <!-- Right: Explore Link -->
  <text x="434" y="108" text-anchor="end" class="link-text">VIEW REPO ↗</text>
</svg>
`;

  writeFileSync(join(CARDS_DIR, `card-${p.id}.svg`), svg);
  console.log(`Generated elegant card-${p.id}.svg`);
}

console.log('✨ All Soft Dark Souls repo cards regenerated with supreme elegance!');
