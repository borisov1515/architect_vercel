#!/usr/bin/env node
/**
 * Copy downloaded public docs into trailhead/ with manifest order prefixes.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MANIFEST = join(__dirname, 'trailmix-manifest.json');
const DOWNLOADED = join(__dirname, 'downloaded');
const TRAILHEAD = join(__dirname, 'trailhead');
const PROGRESS = join(TRAILHEAD, '_progress', 'index.json');

function slug(s) {
  return s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 80).toLowerCase();
}

function pad(n) {
  return String(n).padStart(3, '0');
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf-8'));
const downloadedIndex = existsSync(join(DOWNLOADED, '_index.json'))
  ? JSON.parse(readFileSync(join(DOWNLOADED, '_index.json'), 'utf-8'))
  : [];

const fileByUrl = new Map(downloadedIndex.map((e) => [e.url, e.file]));

mkdirSync(TRAILHEAD, { recursive: true });
mkdirSync(join(TRAILHEAD, '_progress'), { recursive: true });

const progress = existsSync(PROGRESS)
  ? JSON.parse(readFileSync(PROGRESS, 'utf-8'))
  : { startedAt: new Date().toISOString().slice(0, 10), completed: [], pending: [] };

const doneOrders = new Set(progress.completed.map((c) => c.order));
const completed = [...progress.completed];
let order = 0;

for (const sec of manifest.sections) {
  for (const item of sec.items) {
    order += 1;
    if (doneOrders.has(order)) continue;

    if (item.type === 'task' && item.title === 'Certification Exam Guide') {
      continue; // already saved as markdown
    }
    if (item.type === 'task' && item.title === 'Evaluate business needs') {
      completed.push({
        order,
        title: item.title,
        file: null,
        status: 'skipped',
        note: 'Trailmix section anchor — no standalone content',
      });
      continue;
    }

    if (item.offline === 'script' || item.offline?.includes('script')) {
      const srcName = fileByUrl.get(item.url);
      if (!srcName) {
        completed.push({ order, title: item.title, status: 'missing-download', url: item.url });
        continue;
      }
      const dest = `${pad(order)}-${slug(item.title)}.html`;
      copyFileSync(join(DOWNLOADED, srcName), join(TRAILHEAD, dest));
      completed.push({ order, title: item.title, file: dest, status: 'done', source: 'downloaded' });
      console.log(`${pad(order)} ✓ ${item.title}`);
      continue;
    }

    // trailhead modules/trails/projects — handled by browser crawl
    if (item.source === 'trailhead' && item.type !== 'task') {
      completed.push({ order, title: item.title, status: 'pending-trailhead', url: item.url, type: item.type });
    } else if (item.source === 'blog' || item.source === 'architect') {
      completed.push({ order, title: item.title, status: 'pending-fetch', url: item.url, type: item.type });
    }
  }
}

progress.completed = completed.sort((a, b) => a.order - b.order);
progress.pending = completed.filter((c) => c.status?.startsWith('pending'));
writeFileSync(PROGRESS, JSON.stringify(progress, null, 2));
console.log(`\nProgress: ${progress.completed.filter((c) => c.status === 'done').length} done, ${progress.pending.length} pending`);
