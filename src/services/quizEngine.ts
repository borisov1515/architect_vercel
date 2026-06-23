import type { OptionId, Question, QuizMode } from '@/types';
import { shuffle, shuffleOptions } from './shuffle';

function arraysEqual(a: OptionId[], b: OptionId[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

export function checkAnswer(question: Question, selected: OptionId[]): boolean {
  if (!question.correctAnswer.length) return false;
  return arraysEqual(selected, question.correctAnswer);
}

export function buildOptionMap(question: Question, seed: number) {
  return shuffleOptions(question.options, seed);
}

export function createSessionQuestionIds(
  allIds: string[],
  mode: QuizMode,
  opts: {
    shuffleQuestions?: boolean;
    wrongIds?: string[];
    srsIds?: string[];
    bookmarkIds?: string[];
    dailyIds?: string[];
    seed?: number;
  } = {},
): string[] {
  let ids = [...allIds];
  if (mode === 'wrong-only' && opts.wrongIds?.length) {
    ids = opts.wrongIds.filter((id) => allIds.includes(id));
  } else if (mode === 'srs' && opts.srsIds?.length) {
    ids = opts.srsIds.filter((id) => allIds.includes(id));
  } else if (mode === 'bookmarks' && opts.bookmarkIds?.length) {
    ids = opts.bookmarkIds.filter((id) => allIds.includes(id));
  } else if (mode === 'daily' && opts.dailyIds?.length) {
    ids = opts.dailyIds;
  }
  if (opts.shuffleQuestions || mode === 'shuffle' || mode === 'exam' || mode === 'daily') {
    ids = shuffle(ids, opts.seed);
  }
  if (mode === 'exam') {
    ids = ids.slice(0, 65);
  }
  return ids;
}

export function multiSelectCount(question: Question): number {
  if (question.type === 'multi') {
    const m = question.sub.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 2;
  }
  return 1;
}
