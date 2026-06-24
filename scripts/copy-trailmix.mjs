#!/usr/bin/env node
/** Copy offline trailmix into public/ for static deploy + build index JSON. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'materials/trailmix');
const dest = path.join(root, 'public/materials/trailmix');
const SKIP_DIRS = new Set(['_progress', '_scripts']);

function rmrf(p) {
  if (!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(from, to, { skipDirNames = SKIP_DIRS } = {}) {
  fs.mkdirSync(to, { recursive: true });
  for (const name of fs.readdirSync(from)) {
    if (skipDirNames.has(name)) continue;
    const sf = path.join(from, name);
    const dt = path.join(to, name);
    if (fs.statSync(sf).isDirectory()) copyDir(sf, dt, { skipDirNames });
    else fs.copyFileSync(sf, dt);
  }
}

function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...listFiles(full, base));
    else if (/\.(md|html)$/i.test(name)) {
      out.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return out.sort();
}

rmrf(dest);
copyDir(path.join(src, 'trailhead'), path.join(dest, 'trailhead'));
if (fs.existsSync(path.join(src, 'downloaded'))) {
  copyDir(path.join(src, 'downloaded'), path.join(dest, 'downloaded'), { skipDirNames: new Set() });
}

const progress = JSON.parse(
  fs.readFileSync(path.join(src, 'trailhead/_progress/index.json'), 'utf8')
);
const manifest = JSON.parse(fs.readFileSync(path.join(src, 'trailmix-manifest.json'), 'utf8'));

const items = progress.completed
  .filter((i) => i.status === 'done' && i.file)
  .map((item) => {
    const rel = item.file.replace(/\/$/, '');
    const fullDir = path.join(dest, 'trailhead', rel);
    const isFolder = item.file.endsWith('/');
    const children = isFolder ? listFiles(fullDir) : [];
    const ext = path.extname(rel).toLowerCase();
    return {
      order: item.order,
      title: item.title,
      path: `trailhead/${rel}${isFolder ? '' : ''}`,
      kind: isFolder ? 'folder' : ext === '.html' ? 'html' : 'markdown',
      units: item.units,
      steps: item.steps,
      children: children.map((c) => ({
        name: c,
        path: `trailhead/${rel}/${c}`,
        kind: c.endsWith('.html') ? 'html' : 'markdown',
      })),
    };
  });

const index = {
  title: manifest.title,
  source: manifest.source,
  generatedAt: new Date().toISOString().slice(0, 10),
  summary: progress.summary,
  items,
};

const outJson = path.join(root, 'public/data/trailmix-index.json');
fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(index, null, 2));

let files = 0;
function count(d) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name);
    if (n.isDirectory()) count(p);
    else files++;
  }
}
count(dest);
console.log('copy-trailmix:', files, 'files →', dest);
console.log('trailmix-index:', items.length, 'manifest items');
