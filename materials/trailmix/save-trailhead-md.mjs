#!/usr/bin/env node
/**
 * Save Trailhead unit/module markdown from JSON file.
 * Usage: node save-trailhead-md.mjs <dir> <filename> <json-file>
 * JSON: { title, url, text }
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, 'trailhead');
const [dir, filename, jsonPath] = process.argv.slice(2);
const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
const outDir = join(base, dir);
mkdirSync(outDir, { recursive: true });
const content = `# ${data.title}

**Source:** ${data.url}  
**Saved:** browser extraction (logged-in session)

---

${data.text}
`;
const outPath = join(outDir, filename);
writeFileSync(outPath, content, 'utf-8');
console.log(outPath, content.length);
