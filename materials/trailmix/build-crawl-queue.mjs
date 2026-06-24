#!/usr/bin/env node
/**
 * Build crawl queue from trailmix manifest for Trailhead modules/projects.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(__dirname, 'trailmix-manifest.json'), 'utf-8'));

function pad(n) {
  return String(n).padStart(3, '0');
}

function slug(s) {
  return s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 80).toLowerCase();
}

const queue = [];
let order = 0;

for (const sec of manifest.sections) {
  for (const item of sec.items) {
    order += 1;
    if (item.source !== 'trailhead') continue;
    if (item.type === 'task') continue;
    queue.push({
      order,
      prefix: `${pad(order)}-${slug(item.title)}`,
      type: item.type,
      title: item.title,
      url: item.url,
    });
  }
}

writeFileSync(join(__dirname, 'trailhead-crawl-queue.json'), JSON.stringify(queue, null, 2));
console.log(`Queue: ${queue.length} Trailhead items`);
queue.forEach((q) => console.log(`${q.prefix} ${q.type} ${q.title}`));
