#!/usr/bin/env node
/**
 * Download public Help / Developer docs from Integration Architect trailmix.
 * Trailhead modules require login — use Trailhead GO or SingleFile manually.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MANIFEST = join(__dirname, 'trailmix-manifest.json');
const OUT = join(__dirname, 'downloaded');

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf-8'));

function slug(s) {
  return s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 80).toLowerCase();
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; IA-Trainer/1.0; personal study)',
      Accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const toFetch = [];
for (const sec of manifest.sections) {
  for (const item of sec.items) {
    if (item.offline === 'script' || item.offline?.includes('script')) {
      toFetch.push({ ...item, section: sec.title });
    }
  }
}

mkdirSync(OUT, { recursive: true });
const index = [];

console.log(`Fetching ${toFetch.length} public documentation pages…\n`);

for (const item of toFetch) {
  const name = `${slug(item.section)}__${slug(item.title)}.html`;
  const path = join(OUT, name);
  if (existsSync(path)) {
    console.log(`skip (exists): ${item.title}`);
    index.push({ ...item, file: name, status: 'cached' });
    continue;
  }
  try {
    process.stdout.write(`… ${item.title.slice(0, 50)}`);
    const html = await fetchPage(item.url);
    writeFileSync(path, html, 'utf-8');
    console.log(' ✓');
    index.push({ ...item, file: name, status: 'ok', bytes: html.length });
    await new Promise((r) => setTimeout(r, 800));
  } catch (e) {
    console.log(` ✗ ${e.message}`);
    index.push({ ...item, file: null, status: 'error', error: String(e) });
  }
}

writeFileSync(join(OUT, '_index.json'), JSON.stringify(index, null, 2));
console.log(`\nDone. Files in ${OUT}`);
