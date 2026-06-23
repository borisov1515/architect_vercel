import type { Question, QuestionSetFile } from '@/types';

const cache: Partial<Record<number, QuestionSetFile>> = {};

export async function loadQuestionSet(setId: number): Promise<QuestionSetFile> {
  if (cache[setId]) return cache[setId]!;
  const res = await fetch(`/data/questions-set${setId}.json`);
  if (!res.ok) throw new Error(`Failed to load set ${setId}`);
  const data = (await res.json()) as QuestionSetFile;
  cache[setId] = data;
  return data;
}

export async function loadAllSets(): Promise<Record<number, Question[]>> {
  const out: Record<number, Question[]> = {};
  for (let i = 1; i <= 4; i++) {
    const file = await loadQuestionSet(i);
    out[i] = file.questions;
  }
  return out;
}

export function questionMap(questions: Question[]): Record<string, Question> {
  return Object.fromEntries(questions.map((q) => [q.id, q]));
}

export function sectionMap(questions: Question[]): Record<string, string> {
  return Object.fromEntries(questions.map((q) => [q.id, q.sectionId]));
}
