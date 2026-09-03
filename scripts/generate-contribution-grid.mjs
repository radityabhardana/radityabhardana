/**
 * scripts/generate-contribution-grid.mjs
 * Fetches real GitHub daily contributions for radityabhardana and compiles
 * an authentic 53-week x 7-day contribution heatmap calendar SVG.
 * Features:
 * - 100% locally hosted in the repo: assets/scenes/contribution-grid.svg (never breaks or 503s!)
 * - Exact GitHub Dark aesthetic (#0d1117 / #161b22 / #30363d)
 * - Real 365-day commit data with months header, day labels, total count, and level legend
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'contribution-grid.svg');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching contributions for radityabhardana...');
  const data = await fetchJson('https://github-contributions-api.jogruber.de/v4/radityabhardana?y=last');
  
  const total = data.total?.lastYear ?? 0;
  const contributions = data.contributions ?? [];

  // Group into weeks (each week has up to 7 days, 0 = Sunday .. 6 = Saturday)
  const weeks = [];
  let currentWeek = [];

  for (const day of contributions) {
    const d = new Date(day.date);
    const dayOfWeek = d.getUTCDay();

    // If dayOfWeek is 0 (Sunday) and we already have days in currentWeek, start new week
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push({
      date: day.date,
      count: day.count,
      level: day.level,
      dayOfWeek,
      month: d.getUTCMonth(),
      dayOfMonth: d.getUTCDate(),
    });
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Dimensions
  const W = 890;
  const H = 168;
  const boxSize = 10.5;
  const boxGap = 3;
  const startX = 40;
  const startY = 52;

  // Colors (GitHub Dark classic contribution greens)
  const LEVEL_COLORS = [
    '#161b22', // Level 0 (no contribution)
    '#0e4429', // Level 1
    '#006d32', // Level 2
    '#26a641', // Level 3
    '#39d353', // Level 4
  ];

  // Month labels
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLabels = [];
  let lastMonth = -1;

  for (let w = 0; w < weeks.length; w++) {
    const week = weeks[w];
    const firstDay = week[0];
    if (firstDay && firstDay.month !== lastMonth) {
      lastMonth = firstDay.month;
      const x = startX + w * (boxSize + boxGap);
      monthLabels.push(`<text x="${x}" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#8b949e">${monthNames[lastMonth]}</text>`);
    }
  }

  // Day labels (Mon, Wed, Fri)
  const dayLabels = [
    `<text x="${startX - 8}" y="${startY + 1 * (boxSize + boxGap) + 9}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#8b949e">Mon</text>`,
    `<text x="${startX - 8}" y="${startY + 3 * (boxSize + boxGap) + 9}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#8b949e">Wed</text>`,
    `<text x="${startX - 8}" y="${startY + 5 * (boxSize + boxGap) + 9}" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#8b949e">Fri</text>`,
  ];

  // Rectangles for each day
  const rects = [];
  for (let w = 0; w < weeks.length; w++) {
    const week = weeks[w];
    for (const day of week) {
      const x = startX + w * (boxSize + boxGap);
      const y = startY + day.dayOfWeek * (boxSize + boxGap);
      const fill = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];
      const stroke = day.level === 0 ? 'stroke="#21262d" stroke-width="0.8"' : '';
      rects.push(`<rect x="${x}" y="${y}" width="${boxSize}" height="${boxSize}" rx="2" fill="${fill}" ${stroke}><title>${day.count} contributions on ${day.date}</title></rect>`);
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <title>GitHub Daily Contributions — radityabhardana</title>
  <defs>
    <linearGradient id="gridBg" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
    <linearGradient id="gridTopGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a876" stop-opacity="0"/>
      <stop offset="35%" stop-color="#c9a876" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#e3b341" stop-opacity="0.75"/>
      <stop offset="65%" stop-color="#c9a876" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#c9a876" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .cal-title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 14.5px;
      font-weight: 600;
      fill: #f0f6fc;
    }
    .cal-sub {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10.5px;
      fill: #8b949e;
    }
    .legend-text {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 9.5px;
      fill: #8b949e;
    }
  </style>

  <!-- Card Base Plate -->
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="6" fill="url(#gridBg)"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="6" fill="none" stroke="#30363d" stroke-width="1"/>
  <line x1="30" y1="1.5" x2="${W - 30}" y2="1.5" stroke="url(#gridTopGlow)" stroke-width="1.5"/>

  <!-- Header -->
  <text x="24" y="24" class="cal-title">${total.toLocaleString()} Contributions in the Last Year</text>
  <text x="${W - 24}" y="24" text-anchor="end" class="cal-sub">radityabhardana · Activity Log</text>

  <!-- Month Labels -->
  ${monthLabels.join('')}

  <!-- Day of Week Labels -->
  ${dayLabels.join('')}

  <!-- Day Contribution Squares (53 Weeks x 7 Days) -->
  ${rects.join('')}

  <!-- Footer Legend -->
  <g transform="translate(${W - 130}, ${H - 18})">
    <text x="-6" y="8" text-anchor="end" class="legend-text">Less</text>
    <rect x="0" y="0" width="9" height="9" rx="1.5" fill="${LEVEL_COLORS[0]}" stroke="#21262d" stroke-width="0.8"/>
    <rect x="12" y="0" width="9" height="9" rx="1.5" fill="${LEVEL_COLORS[1]}"/>
    <rect x="24" y="0" width="9" height="9" rx="1.5" fill="${LEVEL_COLORS[2]}"/>
    <rect x="36" y="0" width="9" height="9" rx="1.5" fill="${LEVEL_COLORS[3]}"/>
    <rect x="48" y="0" width="9" height="9" rx="1.5" fill="${LEVEL_COLORS[4]}"/>
    <text x="64" y="8" class="legend-text">More</text>
  </g>
</svg>
`;

  writeFileSync(OUT_FILE, svg, 'utf-8');
  console.log(`✨ Generated authentic contribution-grid.svg (${total} contributions) successfully!`);
}

main().catch(err => {
  console.error('Error generating contribution grid:', err);
  process.exit(1);
});
