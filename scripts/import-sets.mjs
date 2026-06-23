#!/usr/bin/env node
/**
 * Import Set-1..4 HTML → public/data/questions-setN.json
 * On Vercel (no source HTML) — skips if JSON already committed.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EXAM_ROOT = join(ROOT, '..', 'Platform Integration Architect', 'Latest Exam');
const OUT_DIR = join(ROOT, 'public', 'data');

if (!existsSync(join(EXAM_ROOT, 'Set-1', 'Set-1.html'))) {
  const hasJson = existsSync(join(OUT_DIR, 'questions-set1.json'));
  if (hasJson) {
    console.log('Source HTML not found — using committed JSON in public/data/ (Vercel build).');
    process.exit(0);
  }
  console.error('No source HTML and no questions-set1.json. Run import locally first.');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const SECTION_RULES = [
  { id: 'security', keywords: ['oauth', 'ssl', 'tls', 'encryption', 'shield', 'credential', 'authentication', 'sso', 'saml', 'identity', 'security', 'certificate'] },
  { id: 'api-design', keywords: ['rest api', 'soap', 'composite', 'bulk api', 'wsdl', 'raml', 'openapi', 'api limit', 'apievent', 'callout', 'endpoint'] },
  { id: 'data', keywords: ['etl', 'cdc', 'change data capture', 'platform event', 'streaming', 'pushtopic', 'sync', 'virtualization', 'odata', 'salesforce connect', 'external object', 'replay'] },
  { id: 'architecture', keywords: ['esb', 'middleware', 'mule', 'microservice', 'api gateway', 'pattern', 'fire and forget', 'request and reply', 'remote call'] },
  { id: 'operations', keywords: ['monitor', 'limit', 'batch', 'error', 'retry', 'performance', 'debug', 'test', 'mock'] },
  { id: 'fundamentals', keywords: [] },
];

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function detectSection(text) {
  const lower = text.toLowerCase();
  let best = 'fundamentals';
  let bestScore = 0;
  for (const rule of SECTION_RULES) {
    if (rule.id === 'fundamentals') continue;
    const score = rule.keywords.reduce((n, kw) => n + (lower.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = rule.id;
    }
  }
  return best;
}

function detectType(sub, options) {
  const s = sub.toLowerCase();
  if (s.includes('which two') || s.includes('select two') || s.includes('choose two')) return 'multi';
  if (options.length > 3) return 'multi';
  return 'single';
}

function parseSetHtml(html, setId) {
  const cards = html.match(/<div class="question-card">[\s\S]*?<\/div>\s*(?=<div class="question-card">|<\/main>)/g) || [];
  return cards.map((card, idx) => {
    const numMatch = card.match(/Question (\d+) of/);
    const setQuestionNumber = numMatch ? parseInt(numMatch[1], 10) : idx + 1;

    const paragraphs = [...card.matchAll(/<p class="q-text">([\s\S]*?)<\/p>/g)].map((m) => stripHtml(m[1]));
    const subMatch = card.match(/<p class="q-sub">([\s\S]*?)<\/p>/);
    const sub = subMatch ? stripHtml(subMatch[1]) : '';

    const noteMatch = card.match(/<p class="q-note">([\s\S]*?)<\/p>/);
    const diagramNote = noteMatch ? stripHtml(noteMatch[1]) : undefined;

    let context;
    const ctxOl = card.match(/<div class="q-context"><ol>([\s\S]*?)<\/ol><\/div>/);
    const ctxUl = card.match(/<div class="q-context"><ul>([\s\S]*?)<\/ul><\/div>/);
    if (ctxOl) {
      const items = [...ctxOl[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => stripHtml(m[1]));
      context = { type: 'ol', items };
    } else if (ctxUl) {
      const items = [...ctxUl[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => stripHtml(m[1]));
      context = { type: 'ul', items };
    }

    const options = [...card.matchAll(/<li><span class="opt-label">([A-Z])\.<\/span>\s*([\s\S]*?)<\/li>/g)].map((m) => ({
      id: m[1],
      text: stripHtml(m[2]),
    }));

    const fullText = [...paragraphs, sub, ...(context?.items || []), ...options.map((o) => o.text)].join(' ');
    const sectionId = detectSection(fullText);
    const type = detectType(sub, options);

    return {
      id: `set${setId}-q${setQuestionNumber}`,
      setId,
      setQuestionNumber,
      sectionId,
      tags: [],
      type,
      paragraphs,
      sub,
      context,
      diagramNote,
      hasDiagram: Boolean(diagramNote),
      options,
      correctAnswer: [],
      explanation: {
        summary: '',
        correct: '',
        incorrect: {},
        examTip: '',
        relatedTheoryIds: [sectionId],
        status: 'pending',
      },
    };
  });
}

for (let setId = 1; setId <= 4; setId++) {
  const htmlPath = join(EXAM_ROOT, `Set-${setId}`, `Set-${setId}.html`);
  const html = readFileSync(htmlPath, 'utf-8');
  const questions = parseSetHtml(html, setId);
  const outPath = join(OUT_DIR, `questions-set${setId}.json`);
  writeFileSync(outPath, JSON.stringify({ setId, count: questions.length, questions }, null, 2));
  console.log(`Set ${setId}: ${questions.length} questions → ${outPath}`);
}

console.log('Done.');
