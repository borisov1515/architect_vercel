import type { SrsEntry } from '@/types';

const DAY_MS = 24 * 60 * 60 * 1000;

export function defaultSrsEntry(): SrsEntry {
  return { nextReview: Date.now(), interval: 0, ease: 2.5 };
}

export function updateSrs(entry: SrsEntry, quality: number): SrsEntry {
  // quality 0-5; <3 = fail
  let { interval, ease } = entry;
  if (quality < 3) {
    return { nextReview: Date.now() + DAY_MS, interval: 1, ease: Math.max(1.3, ease - 0.2) };
  }
  if (interval === 0) interval = 1;
  else if (interval === 1) interval = 3;
  else interval = Math.round(interval * ease);
  ease = Math.min(3, ease + 0.1);
  return { nextReview: Date.now() + interval * DAY_MS, interval, ease };
}

export function srsDueIds(srs: Record<string, SrsEntry>): string[] {
  const now = Date.now();
  return Object.entries(srs)
    .filter(([, e]) => e.nextReview <= now)
    .map(([id]) => id);
}

export function confidenceToQuality(confidence: number, correct: boolean): number {
  if (!correct) return 1;
  if (confidence <= 2) return 3;
  if (confidence <= 3) return 4;
  return 5;
}
