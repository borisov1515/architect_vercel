#!/usr/bin/env node
/** Save Trailhead unit markdown from stdin JSON: { title, url, text, moduleDir, unitFile } */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

const input = JSON.parse(await new Promise((r) => {
  let d = '';
  process.stdin.on('data', (c) => (d += c));
  process.stdin.on('end', () => r(d));
}));

const { title, url, text, moduleDir, unitFile } = input;
const dir = join(dirname(new URL(import.meta.url).pathname), 'trailhead', moduleDir);
mkdirSync(dir, { recursive: true });
const body = `# ${title}

**Source:** ${url}  
**Saved:** browser extraction (logged-in session)

---

${text}
`;
writeFileSync(join(dir, unitFile), body, 'utf-8');
console.log(`saved ${moduleDir}/${unitFile} (${body.length} bytes)`);
