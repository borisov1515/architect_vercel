import type { QuestionAttempt, SectionId } from '@/types';
import { PASS_THRESHOLD } from '@/types';

export function calcScore(correct: number, total: number) {
  return total ? correct / total : 0;
}

export function isPassed(correct: number, total: number) {
  return calcScore(correct, total) >= PASS_THRESHOLD;
}

export function aggregateBySection(
  attempts: QuestionAttempt[],
  questionSectionMap: Record<string, SectionId>,
) {
  const stats: Record<SectionId, { total: number; correct: number }> = {
    fundamentals: { total: 0, correct: 0 },
    architecture: { total: 0, correct: 0 },
    'api-design': { total: 0, correct: 0 },
    security: { total: 0, correct: 0 },
    data: { total: 0, correct: 0 },
    operations: { total: 0, correct: 0 },
  };
  const latest = new Map<string, QuestionAttempt>();
  for (const a of attempts) {
    latest.set(a.questionId, a);
  }
  for (const [qid, a] of latest) {
    const sec = questionSectionMap[qid];
    if (!sec) continue;
    stats[sec].total++;
    if (a.correct) stats[sec].correct++;
  }
  return stats;
}

export function wrongQuestionIds(attempts: QuestionAttempt[]): string[] {
  const latest = new Map<string, boolean>();
  for (const a of attempts) latest.set(a.questionId, a.correct);
  return [...latest.entries()].filter(([, ok]) => !ok).map(([id]) => id);
}

export function lowConfidenceIds(attempts: QuestionAttempt[]): string[] {
  const out: string[] = [];
  const latest = new Map<string, QuestionAttempt>();
  for (const a of attempts) latest.set(a.questionId, a);
  for (const [id, a] of latest) {
    if (a.correct && a.confidence && a.confidence <= 2) out.push(id);
  }
  return out;
}
