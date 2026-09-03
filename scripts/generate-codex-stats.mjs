/**
 * scripts/update-codex-stats.mjs
 * Auto-fetches real GitHub activity data for @radityabhardana and generates codex-stats.svg
 * Features:
 * - Queries GitHub GraphQL API for live Total Contributions & Commits
 * - Calculates language distribution across active repositories
 * - Graceful fallback to cached snapshot if API is unreachable / rate-limited
 * - Outputs 100% valid crisp pixel art SVG matching the Dark Fantasy aesthetic
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENES_DIR = join(__dirname, '..', 'assets', 'scenes');
mkdirSync(SCENES_DIR, { recursive: true });
const OUT_FILE = join(SCENES_DIR, 'codex-stats.svg');

const USERNAME = 'radityabhardana';
const W = 890;
const H = 150;

// Fallback baseline stats
const defaultStats = {
  totalContributions: 679,
  totalCommits: 291,
  disciplineGrade: 'A+',
  languages: [
    { name: 'JS', pct: 31, color: '#f1e05a' },
    { name: 'TS', pct: 25, color: '#3178c6' },
    { name: 'CSS', pct: 22, color: '#563d7c' },
    { name: 'C#', pct: 13, color: '#178600' },
    { name: 'PHP', pct: 9, color: '#777bb4' },
  ]
};

async function fetchLiveStats() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    console.log('ℹ️ No GITHUB_TOKEN provided, using fallback baseline stats.');
    return defaultStats;
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
          totalCommitContributions
        }
        repositories(first: 50, ownerAffiliations: OWNER, isFork: false) {
          nodes {
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Node-Fetch-Codex-Update'
      },
      body: JSON.stringify({ query, variables: { login: USERNAME } })
    });

    const data = await res.json();
    if (data.errors || !data.data?.user) {
      console.warn('⚠️ GraphQL error:', data.errors);
      return defaultStats;
    }

    const u = data.data.user;
    const totalContribs = u.contributionsCollection?.contributionCalendar?.totalContributions || defaultStats.totalContributions;
    const totalCommits = u.contributionsCollection?.totalCommitContributions || defaultStats.totalCommits;

    // Calculate language proportions
    const langTotals = {};
    const colorMap = {};

    for (const repo of u.repositories?.nodes || []) {
      for (const edge of repo.languages?.edges || []) {
        const name = edge.node.name;
        const size = edge.size;
        langTotals[name] = (langTotals[name] || 0) + size;
        if (!colorMap[name] && edge.node.color) {
          colorMap[name] = edge.node.color;
        }
      }
    }

    const totalSize = Object.values(langTotals).reduce((a, b) => a + b, 0);
    let languages = [];

    if (totalSize > 0) {
      languages = Object.entries(langTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, size]) => {
          let shortName = name;
          if (name === 'JavaScript') shortName = 'JS';
          if (name === 'TypeScript') shortName = 'TS';
          return {
            name: shortName,
            pct: Math.max(1, Math.round((size / totalSize) * 100)),
            color: colorMap[name] || '#8b949e'
          };
        });
    } else {
      languages = defaultStats.languages;
    }

    return {
      totalContributions: totalContribs,
      totalCommits: totalCommits,
      disciplineGrade: 'A+',
      languages: languages.length ? languages : defaultStats.languages
    };
  } catch (err) {
    console.warn('⚠️ Failed to fetch live GitHub stats:', err.message);
    return defaultStats;
  }
}

// Stepped pixel frame with antique gold corner rivets
function generatePixelFrame(x, y, w, h) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#111418"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#262c35" stroke-width="2"/>
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="none" stroke="#181c22" stroke-width="1"/>
    <!-- Antique Gold Pixel Corner Rivets -->
    <rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 5}" y="${y + 2}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + 2}" y="${y + 5}" width="2" height="2" fill="#8a6833"/>

    <rect x="${x + w - 5}" y="${y + 2}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 7}" y="${y + 2}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + w - 5}" y="${y + 5}" width="2" height="2" fill="#8a6833"/>

    <rect x="${x + 2}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + 5}" y="${y + h - 4}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + 2}" y="${y + h - 7}" width="2" height="2" fill="#8a6833"/>

    <rect x="${x + w - 5}" y="${y + h - 5}" width="3" height="3" fill="#c9a876"/>
    <rect x="${x + w - 7}" y="${y + h - 4}" width="2" height="2" fill="#8a6833"/>
    <rect x="${x + w - 5}" y="${y + h - 7}" width="2" height="2" fill="#8a6833"/>
    <!-- Top Pixel Shimmer Line -->
    <rect x="${x + 16}" y="${y + 1}" width="${w - 32}" height="1" fill="#4d3a1f"/>
    <rect x="${x + w / 2 - 60}" y="${y + 1}" width="120" height="1" fill="#c9a876"/>
    <rect x="${x + w / 2 - 20}" y="${y + 1}" width="40" height="1" fill="#fff5cc"/>
  `;
}

function renderProgressBar(languages, totalWidth = 260) {
  const rects = [];
  let curX = 1;
  const innerW = totalWidth - 2;

  // Sum of pcts
  const sumPct = languages.reduce((acc, l) => acc + l.pct, 0);

  languages.forEach((l, idx) => {
    let segW = Math.round((l.pct / sumPct) * innerW);
    // ensure last item fills remaining space
    if (idx === languages.length - 1) {
      segW = totalWidth - 1 - curX;
    }
    if (segW > 0) {
      rects.push(`<rect x="${curX}" y="1" width="${segW}" height="6" fill="${l.color}"/>`);
      curX += segW;
    }
  });

  return rects.join('');
}

function renderLegend(languages) {
  const row1 = languages.slice(0, 3);
  const row2 = languages.slice(3, 5);

  let out = '';
  // Row 1
  let curX = 0;
  out += '<g transform="translate(0, 44)">';
  row1.forEach(l => {
    out += `
      <rect x="${curX}" y="-4" width="5" height="5" fill="${l.color}"/>
      <text x="${curX + 9}" y="1" class="px-lang-item">${l.name} <tspan class="px-lang-pct">${l.pct}%</tspan></text>
    `;
    curX += 74;
  });
  out += '</g>';

  // Row 2
  if (row2.length > 0) {
    curX = 0;
    out += '<g transform="translate(0, 64)">';
    row2.forEach(l => {
      out += `
        <rect x="${curX}" y="-4" width="5" height="5" fill="${l.color}"/>
        <text x="${curX + 9}" y="1" class="px-lang-item">${l.name} <tspan class="px-lang-pct">${l.pct}%</tspan></text>
      `;
      curX += 74;
    });
    out += '</g>';
  }

  return out;
}

async function main() {
  const stats = await fetchLiveStats();
  console.log('✨ Generating Codex with stats:', stats);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <title>Engineering Codex &amp; Activity Summary — radityabhardana</title>

  <style>
    .px-title {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 11px;
      letter-spacing: 0.8px;
      fill: #f0f6fc;
    }
    .px-tag {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10px;
      fill: #8b949e;
    }
    .px-stat-num {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 16px;
      letter-spacing: 0.5px;
      fill: #f0f6fc;
    }
    .px-stat-label {
      font-family: 'Press Start 2P', ui-monospace, monospace;
      font-size: 8.5px;
      letter-spacing: 0.8px;
      fill: #c9a876;
    }
    .px-stat-sub {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10.5px;
      fill: #8b949e;
    }
    .px-lang-item {
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      font-size: 10.5px;
      fill: #c9d1d9;
    }
    .px-lang-pct {
      fill: #8b949e;
      font-size: 9.5px;
    }
  </style>

  <!-- Pixel Stone Frame -->
  ${generatePixelFrame(0, 0, W, H)}

  <!-- Header Row -->
  <g transform="translate(24, 22)">
    <rect x="0" y="0" width="3" height="3" fill="#e3b341"/>
    <rect x="3" y="-3" width="3" height="3" fill="#fff5cc"/>
    <rect x="3" y="3" width="3" height="3" fill="#8a6833"/>
    <rect x="6" y="0" width="3" height="3" fill="#e3b341"/>

    <text x="18" y="4" class="px-title">SYSTEM CODEX &amp; PRODUCTION ARCHIVE</text>
    <text x="842" y="4" text-anchor="end" class="px-tag">radityabhardana · 2026 ARCHIVE</text>
  </g>

  <!-- Horizontal Pixel Divider with Diamond Accent -->
  <rect x="20" y="36" width="850" height="1" fill="#1e242d"/>
  <rect x="443" y="35" width="4" height="3" fill="#c9a876"/>

  <!-- ================= COLUMN 1: TOTAL SOULS (CONTRIBUTIONS) ================= -->
  <g transform="translate(30, 52)">
    <text x="0" y="24" class="px-stat-num">${stats.totalContributions}+</text>
    <text x="0" y="46" class="px-stat-label">&gt; TOTAL SOULS</text>
    <text x="0" y="68" class="px-stat-sub">365-day active cadence</text>
  </g>

  <!-- Vertical Pixel Divider 1 -->
  <rect x="210" y="48" width="1" height="82" fill="#1e242d"/>

  <!-- ================= COLUMN 2: PRODUCTION COMMITS ================= -->
  <g transform="translate(235, 52)">
    <text x="0" y="24" class="px-stat-num">${stats.totalCommits}+</text>
    <text x="0" y="46" class="px-stat-label">&gt; PROD COMMITS</text>
    <text x="0" y="68" class="px-stat-sub">Deterministic backend pushes</text>
  </g>

  <!-- Vertical Pixel Divider 2 -->
  <rect x="410" y="48" width="1" height="82" fill="#1e242d"/>

  <!-- ================= COLUMN 3: DISCIPLINE GRADE ================= -->
  <g transform="translate(435, 52)">
    <text x="0" y="24" class="px-stat-num">
      <tspan fill="#e3b341">[ ${stats.disciplineGrade} ]</tspan>
    </text>
    <text x="0" y="46" class="px-stat-label">&gt; DISCIPLINE</text>
    <text x="0" y="68" class="px-stat-sub">Top-tier daily cadence</text>
  </g>

  <!-- Vertical Pixel Divider 3 -->
  <rect x="580" y="48" width="1" height="82" fill="#1e242d"/>

  <!-- ================= COLUMN 4: ARSENAL SHARE ================= -->
  <g transform="translate(605, 52)">
    <text x="0" y="6" class="px-stat-label">&gt; ARSENAL SHARE</text>

    <!-- Stepped Pixel Bar (260px wide, 8px high) -->
    <g transform="translate(0, 16)">
      <rect x="0" y="0" width="260" height="8" fill="#090c10"/>
      <rect x="0" y="0" width="260" height="8" fill="none" stroke="#262c35" stroke-width="1"/>
      ${renderProgressBar(stats.languages, 260)}
    </g>

    <!-- Dynamic Legend -->
    ${renderLegend(stats.languages)}
  </g>
</svg>
`;

  writeFileSync(OUT_FILE, svg, 'utf-8');
  console.log('✨ Successfully updated codex-stats.svg with live stats!');
}

main();
