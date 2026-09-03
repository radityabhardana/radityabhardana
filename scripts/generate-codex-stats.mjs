/**
 * scripts/generate-codex-stats.mjs
 * Generates an ultra-sleek, bespoke Dark Souls Engineering Codex summary card:
 * - Replaces the 3 generic, clashing Vercel stat widgets
 * - Exact Soft Dark Souls aesthetic: Obsidian slate (#161b22 -> #0d1117), border #30363d, top gold ember edge
 * - High-signal metrics: 679+ Contributions, 291+ Commits, High-Discipline Cadence, and Language Distribution
 * - Zero empty/0 stats, zero generic outlines, 100% harmonious
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'codex-stats.svg');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="890" height="150" viewBox="0 0 890 150">
  <title>Engineering Codex &amp; Activity Summary — radityabhardana</title>
  <defs>
    <!-- Card Background (Neutral GitHub Dark Slate) -->
    <linearGradient id="codexBg" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>

    <!-- Subtle Gold Ember Top Accent -->
    <linearGradient id="codexTopGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="25%" stop-color="#c9a876" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#e3b341" stop-opacity="0.8"/>
      <stop offset="75%" stop-color="#c9a876" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>

    <!-- Language Multi-Segment Bar Clip -->
    <clipPath id="langBarClip">
      <rect x="580" y="68" width="280" height="8" rx="4"/>
    </clipPath>
  </defs>

  <style>
    .header-title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 13.5px;
      font-weight: 600;
      letter-spacing: 0.3px;
      fill: #f0f6fc;
    }
    .header-tag {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10.5px;
      fill: #8b949e;
    }
    .stat-number {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      fill: #f0f6fc;
    }
    .stat-label {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      fill: #c9a876;
    }
    .stat-sub {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 11px;
      fill: #8b949e;
    }
    .lang-item {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10.5px;
      fill: #c9d1d9;
    }
    .lang-pct {
      fill: #8b949e;
      font-size: 9.5px;
    }
  </style>

  <!-- Base Plate: Neutral Dark Slate with 1px Clean Border -->
  <rect x="1" y="1" width="888" height="148" rx="6" fill="url(#codexBg)"/>
  <rect x="1" y="1" width="888" height="148" rx="6" fill="none" stroke="#30363d" stroke-width="1"/>

  <!-- Top Whisper-Thin Ember Line -->
  <line x1="30" y1="1.5" x2="860" y2="1.5" stroke="url(#codexTopGlow)" stroke-width="1.8"/>

  <!-- Header Row -->
  <g transform="translate(24, 20)">
    <!-- Small Crest Diamond -->
    <polygon points="0,5 5,0 10,5 5,10" fill="#e3b341"/>
    <text x="18" y="9" class="header-title">ENGINEERING ACTIVITY &amp; PRODUCTION CODEX</text>
    <text x="842" y="9" text-anchor="end" class="header-tag">radityabhardana · 2026 ARCHIVE</text>
  </g>

  <!-- Divider Line -->
  <line x1="24" y1="36" x2="866" y2="36" stroke="#21262d" stroke-width="1"/>

  <!-- ================= COLUMN 1: CONTRIBUTIONS ================= -->
  <g transform="translate(30, 48)">
    <text x="0" y="32" class="stat-number">679+</text>
    <text x="0" y="52" class="stat-label">TOTAL CONTRIBUTIONS</text>
    <text x="0" y="70" class="stat-sub">Annual commit &amp; system actions</text>
  </g>

  <!-- Vertical Divider 1 -->
  <line x1="210" y1="52" x2="210" y2="128" stroke="#21262d" stroke-width="1"/>

  <!-- ================= COLUMN 2: COMMITS ================= -->
  <g transform="translate(235, 48)">
    <text x="0" y="32" class="stat-number">291+</text>
    <text x="0" y="52" class="stat-label">PRODUCTION COMMITS</text>
    <text x="0" y="70" class="stat-sub">Deterministic backend pushes</text>
  </g>

  <!-- Vertical Divider 2 -->
  <line x1="395" y1="52" x2="395" y2="128" stroke="#21262d" stroke-width="1"/>

  <!-- ================= COLUMN 3: DISCIPLINE GRADE ================= -->
  <g transform="translate(420, 48)">
    <text x="0" y="32" class="stat-number">
      <tspan fill="#e3b341">A+</tspan>
      <tspan font-size="14" font-weight="normal" fill="#8b949e"> · TOP TIER</tspan>
    </text>
    <text x="0" y="52" class="stat-label">COMMIT CADENCE</text>
    <text x="0" y="70" class="stat-sub">Active daily repository rhythm</text>
  </g>

  <!-- Vertical Divider 3 -->
  <line x1="560" y1="52" x2="560" y2="128" stroke="#21262d" stroke-width="1"/>

  <!-- ================= COLUMN 4: LANGUAGE DISTRIBUTION ================= -->
  <g transform="translate(580, 48)">
    <!-- Column Title -->
    <text x="0" y="10" class="stat-label">PRIMARY ARSENAL SHARE</text>

    <!-- Language Distribution Bar (Clipped with Rounded Edges) -->
    <g clip-path="url(#langBarClip)">
      <!-- JavaScript 31% (86.8px) -->
      <rect x="580" y="68" width="87" height="8" fill="#f1e05a"/>
      <!-- TypeScript 25% (70px) -->
      <rect x="667" y="68" width="70" height="8" fill="#3178c6"/>
      <!-- CSS/UI 22% (61.6px) -->
      <rect x="737" y="68" width="62" height="8" fill="#563d7c"/>
      <!-- C# 13% (36.4px) -->
      <rect x="799" y="68" width="37" height="8" fill="#178600"/>
      <!-- PHP 9% (25.2px) -->
      <rect x="836" y="68" width="25" height="8" fill="#777bb4"/>
    </g>

    <!-- Legend Row 1 -->
    <g transform="translate(0, 44)">
      <circle cx="4" cy="0" r="3.5" fill="#f1e05a"/>
      <text x="12" y="3" class="lang-item">JS <tspan class="lang-pct">31%</tspan></text>

      <circle cx="84" cy="0" r="3.5" fill="#3178c6"/>
      <text x="92" y="3" class="lang-item">TS <tspan class="lang-pct">25%</tspan></text>

      <circle cx="164" cy="0" r="3.5" fill="#563d7c"/>
      <text x="172" y="3" class="lang-item">CSS <tspan class="lang-pct">22%</tspan></text>
    </g>

    <!-- Legend Row 2 -->
    <g transform="translate(0, 64)">
      <circle cx="4" cy="0" r="3.5" fill="#178600"/>
      <text x="12" y="3" class="lang-item">C# <tspan class="lang-pct">13%</tspan></text>

      <circle cx="84" cy="0" r="3.5" fill="#777bb4"/>
      <text x="92" y="3" class="lang-item">PHP <tspan class="lang-pct">9%</tspan></text>
    </g>
  </g>
</svg>
`;

writeFileSync(OUT_FILE, svg, 'utf-8');
console.log('✨ Generated ultra-sleek codex-stats.svg successfully!');
