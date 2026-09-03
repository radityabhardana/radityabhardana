/**
 * scripts/generate-repo-cards.mjs
 * Generates neutral-dark Soft Dark Souls Pinned Repo Cards:
 * 1. Flagship Hero Card: card-spectre-hero.svg (900x140px, full-width)
 * 2. Grid Cards: card-icarus.svg, card-blackbox.svg, card-kalpindo.svg, card-smartstudy.svg, card-spectre.svg (480x165px)
 * - Neutral GitHub Dark palette (#161b22, #0d1117, #30363d)
 * - Clean white titles (#f0f6fc), readable gray descriptions (#c9d1d9)
 * - Symmetrical 1 Hero + 2x2 Grid layout (eliminates lonely 5th orphan card!)
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, '..', 'assets', 'cards');
mkdirSync(CARDS_DIR, { recursive: true });

// 5 Refined Sigils for 46x46 icon box (Center is at 23, 23)
const SIGILS = {
  spectre: `
    <circle cx="23" cy="23" r="15" fill="none" stroke="#30363d" stroke-width="1.2"/>
    <path d="M9 23 C14 14, 32 14, 37 23 C32 32, 14 32, 9 23 Z" fill="none" stroke="#c9a876" stroke-width="1.5"/>
    <circle cx="23" cy="23" r="5.5" fill="#0d1117" stroke="#e3b341" stroke-width="1.3"/>
    <circle cx="23" cy="23" r="2" fill="#ffffff"/>
    <line x1="5" y1="23" x2="8" y2="23" stroke="#c9a876" stroke-width="1.5"/>
    <line x1="38" y1="23" x2="41" y2="23" stroke="#c9a876" stroke-width="1.5"/>
  `,

  icarus: `
    <path d="M13 35 C14 26, 20 16, 33 9 C29 18, 27 27, 20 32 C18 34, 15 35, 13 35 Z" fill="#161b22" stroke="#c9a876" stroke-width="1.5"/>
    <line x1="13" y1="35" x2="29" y2="15" stroke="#e3b341" stroke-width="1.4"/>
    <path d="M33 17 L35 21.5 L39.5 23.5 L35 25.5 L33 30 L31 25.5 L26.5 23.5 L31 21.5 Z" fill="#ffffff"/>
  `,

  blackbox: `
    <rect x="13" y="10" width="20" height="26" rx="2" fill="#161b22" stroke="#c9a876" stroke-width="1.5"/>
    <rect x="16" y="14" width="14" height="10" rx="1.5" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
    <path d="M18 19 L20.5 17 L23 21 L25.5 18.5 L28 19" fill="none" stroke="#e3b341" stroke-width="1.4"/>
    <circle cx="23" cy="30" r="2.5" fill="#c9a876"/>
    <path d="M8 18 C5 21, 5 25, 8 28" fill="none" stroke="#8b949e" stroke-width="1.4"/>
    <path d="M38 18 C41 21, 41 25, 38 28" fill="none" stroke="#8b949e" stroke-width="1.4"/>
  `,

  kalpindo: `
    <path d="M12 13 L34 13 L31.5 27 C30 32, 23 35, 23 35 C23 35, 16 32, 14.5 27 Z" fill="#161b22" stroke="#c9a876" stroke-width="1.5"/>
    <line x1="23" y1="15" x2="23" y2="30" stroke="#e3b341" stroke-width="1.4"/>
    <line x1="17" y1="19" x2="29" y2="19" stroke="#e3b341" stroke-width="1.4"/>
    <circle cx="17" cy="23" r="2" fill="#ffffff"/>
    <circle cx="29" cy="23" r="2" fill="#ffffff"/>
  `,

  smartstudy: `
    <path d="M23 29 C18 25, 12 25, 9 26 L9 13 C12 12, 18 12, 23 16 C28 12, 34 12, 37 13 L37 26 C34 25, 28 25, 23 29 Z" fill="#161b22" stroke="#c9a876" stroke-width="1.5"/>
    <line x1="23" y1="16" x2="23" y2="30" stroke="#e3b341" stroke-width="1.5"/>
    <polygon points="23,7 25,11 29,11 26,13.5 27,17.5 23,15 19,17.5 20,13.5 17,11 21,11" fill="#ffffff"/>
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
    sigilKey: 'icarus',
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
    sigilKey: 'blackbox',
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
    sigilKey: 'kalpindo',
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
    sigilKey: 'smartstudy',
    descLine1: 'Intelligent learning companion engineered with automated study planning,',
    descLine2: 'adaptive spaced-revision routines, and context-aware study tools.',
    tags: 'AI Tutor · Study Planner · EdTech',
  },
];

function escXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 1. Generate Standard Grid Cards (480x165px)
for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="165" viewBox="0 0 480 165">
  <title>${escXml(p.title)} — ${escXml(p.category)}</title>
  <defs>
    <linearGradient id="cardBg_${p.id}" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
    <linearGradient id="topGlow_${p.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="35%" stop-color="#c9a876" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#e3b341" stop-opacity="0.7"/>
      <stop offset="65%" stop-color="#c9a876" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .title-text {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 15.5px;
      font-weight: 600;
      letter-spacing: 0.2px;
      fill: #f0f6fc;
    }
    .repo-name {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      fill: #8b949e;
    }
    .desc-text {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 12.5px;
      line-height: 1.5;
      fill: #c9d1d9;
    }
    .meta-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10.5px;
      letter-spacing: 0.3px;
      fill: #8b949e;
    }
    .link-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      fill: #e3b341;
    }
  </style>

  <rect x="1" y="1" width="478" height="163" rx="6" fill="url(#cardBg_${p.id})"/>
  <rect x="1" y="1" width="478" height="163" rx="6" fill="none" stroke="#30363d" stroke-width="1"/>
  <line x1="24" y1="1.5" x2="456" y2="1.5" stroke="url(#topGlow_${p.id})" stroke-width="1.5"/>

  <g transform="translate(18, 20)">
    <rect width="46" height="46" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
    ${SIGILS[p.sigilKey]}
  </g>

  <text x="76" y="36" class="title-text">${escXml(p.title)}</text>
  <text x="76" y="54" class="repo-name">${escXml(p.name)}</text>

  <g transform="translate(460, 36)">
    <text text-anchor="end" class="meta-text">
      <tspan fill="${p.langColor}" font-size="13">● </tspan>${escXml(p.lang)}
    </text>
  </g>

  <text x="76" y="82" class="desc-text">${escXml(p.descLine1)}</text>
  <text x="76" y="102" class="desc-text">${escXml(p.descLine2)}</text>

  <line x1="18" y1="126" x2="462" y2="126" stroke="#21262d" stroke-width="1"/>

  <text x="18" y="146" class="meta-text">${escXml(p.tags)}</text>
  <text x="462" y="146" text-anchor="end" class="link-text">VIEW REPO ↗</text>
</svg>
`;

  writeFileSync(join(CARDS_DIR, `card-${p.id}.svg`), svg);
}

// 2. Generate Flagship Full-Width Hero Card: card-spectre-hero.svg (900x150px)
const heroProject = projects[0];
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="150" viewBox="0 0 900 150">
  <title>${escXml(heroProject.title)} — Flagship Repository</title>
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
    <linearGradient id="heroTopGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="25%" stop-color="#c9a876" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#e3b341" stop-opacity="0.8"/>
      <stop offset="75%" stop-color="#c9a876" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .h-title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.3px;
      fill: #f0f6fc;
    }
    .h-flag {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      fill: #e3b341;
    }
    .h-repo {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11.5px;
      fill: #8b949e;
    }
    .h-desc {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      fill: #c9d1d9;
    }
    .h-meta {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      fill: #8b949e;
    }
    .h-link {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.8px;
      fill: #e3b341;
    }
  </style>

  <rect x="1" y="1" width="898" height="148" rx="6" fill="url(#heroBg)"/>
  <rect x="1" y="1" width="898" height="148" rx="6" fill="none" stroke="#30363d" stroke-width="1"/>
  <line x1="30" y1="1.5" x2="870" y2="1.5" stroke="url(#heroTopGlow)" stroke-width="2"/>

  <!-- Left Sigil (46x46) -->
  <g transform="translate(24, 20)">
    <rect width="46" height="46" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
    ${SIGILS.spectre}
  </g>

  <!-- Title & Flagship Pill -->
  <text x="86" y="35" class="h-title">${escXml(heroProject.title)}</text>
  <rect x="250" y="22" width="145" height="18" rx="3" fill="#211d15" stroke="#4d3b1e" stroke-width="1"/>
  <text x="322" y="34" class="h-flag" text-anchor="middle">★ FEATURED SYSTEM</text>
  <text x="86" y="53" class="h-repo">${escXml(heroProject.name)}</text>

  <!-- Language (Top Right) -->
  <g transform="translate(876, 35)">
    <text text-anchor="end" class="h-meta">
      <tspan fill="${heroProject.langColor}" font-size="14">● </tspan>${escXml(heroProject.lang)}
    </text>
  </g>

  <!-- Description -->
  <text x="86" y="78" class="h-desc">${escXml(heroProject.descLine1)}</text>
  <text x="86" y="96" class="h-desc">${escXml(heroProject.descLine2)}</text>

  <line x1="24" y1="114" x2="876" y2="114" stroke="#21262d" stroke-width="1"/>

  <!-- Footer -->
  <text x="24" y="133" class="h-meta">${escXml(heroProject.tags)}</text>
  <text x="876" y="133" text-anchor="end" class="h-link">EXPLORE FLAGSHIP REPOSITORY ↗</text>
</svg>
`;

writeFileSync(join(CARDS_DIR, 'card-spectre-hero.svg'), heroSvg);
console.log('✨ Regenerated all cards + card-spectre-hero.svg successfully!');
