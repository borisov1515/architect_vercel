import { create } from 'zustand';
import type {
  Question,
  QuizMode,
  QuizSessionState,
  SectionId,
  UserProgress,
} from '@/types';
import { defaultProgress, loadProgress, saveProgress } from '@/services/storage';
import { loadQuestionSet } from '@/services/questions';
import {
  buildOptionMap,
  checkAnswer,
  createSessionQuestionIds,
} from '@/services/quizEngine';
import { shuffle } from '@/services/shuffle';
import { confidenceToQuality, defaultSrsEntry, srsDueIds, updateSrs } from '@/services/srs';
import { wrongQuestionIds } from '@/services/scoring';
import { EXAM_DURATION_MIN, EXAM_QUESTION_COUNT } from '@/types';
import type { OptionId } from '@/types';

interface AppState {
  progress: UserProgress;
  questionsBySet: Record<number, Question[]>;
  session: QuizSessionState | null;
  loading: boolean;
  init: () => void;
  loadSet: (setId: number) => Promise<Question[]>;
  toggleDark: () => void;
  toggleBookmark: (questionId: string) => void;
  setNote: (questionId: string, note: string) => void;
  startSession: (
    setId: number,
    mode: QuizMode,
    opts?: { sectionId?: SectionId; shuffleQuestions?: boolean },
  ) => Promise<void>;
  submitAnswer: (displayKeys: string[], confidence?: number) => void;
  flashcardResult: (knew: boolean) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  endSession: () => void;
  importProgress: (p: UserProgress) => void;
  getQuestions: (setId: number) => Question[];
}

function persist(progress: UserProgress) {
  saveProgress(progress);
}

export const useAppStore = create<AppState>((set, get) => ({
  progress: defaultProgress(),
  questionsBySet: {},
  session: null,
  loading: false,

  init() {
    const progress = loadProgress();
    set({ progress });
    if (progress.darkMode) document.documentElement.classList.add('dark');
  },

  async loadSet(setId) {
    const existing = get().questionsBySet[setId];
    if (existing) return existing;
    const file = await loadQuestionSet(setId);
    set((s) => ({ questionsBySet: { ...s.questionsBySet, [setId]: file.questions } }));
    return file.questions;
  },

  toggleDark() {
    const darkMode = !get().progress.darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
    const progress = { ...get().progress, darkMode };
    set({ progress });
    persist(progress);
  },

  toggleBookmark(questionId) {
    const { progress } = get();
    const bookmarks = progress.bookmarks.includes(questionId)
      ? progress.bookmarks.filter((id) => id !== questionId)
      : [...progress.bookmarks, questionId];
    const next = { ...progress, bookmarks };
    set({ progress: next });
    persist(next);
  },

  setNote(questionId, note) {
    const progress = { ...get().progress, notes: { ...get().progress.notes, [questionId]: note } };
    set({ progress });
    persist(progress);
  },

  async startSession(setId, mode, opts = {}) {
    set({ loading: true });
    const questions = await get().loadSet(setId);
    let pool = questions;
    if (opts.sectionId) pool = questions.filter((q) => q.sectionId === opts.sectionId);
    const allIds = pool.map((q) => q.id);
    const { progress } = get();
    const seed = Date.now();
    const wrongIds = wrongQuestionIds(progress.attempts);
    const srsIds = srsDueIds(progress.srs);
    const dailyKey = new Date().toISOString().slice(0, 10);
    let dailyIds = progress.dailyCompleted[dailyKey];
    if (mode === 'daily' && !dailyIds?.length) {
      dailyIds = shuffle(allIds, seed).slice(0, 10);
    }
    const questionIds = createSessionQuestionIds(allIds, mode, {
      shuffleQuestions: opts.shuffleQuestions ?? mode === 'shuffle',
      wrongIds,
      srsIds,
      bookmarkIds: progress.bookmarks,
      dailyIds,
      seed,
    });
    const optionMaps: QuizSessionState['optionMaps'] = {};
    const qMap = Object.fromEntries(questions.map((q) => [q.id, q]));
    for (const qid of questionIds) {
      optionMaps[qid] = buildOptionMap(qMap[qid], seed + qid.length);
    }
    const session: QuizSessionState = {
      id: crypto.randomUUID(),
      setId,
      mode,
      sectionId: opts.sectionId,
      questionIds,
      currentIndex: 0,
      optionMaps,
      answers: {},
      startedAt: Date.now(),
      showExplanations: mode === 'study' || mode === 'flashcard',
      examEndsAt:
        mode === 'exam' ? Date.now() + EXAM_DURATION_MIN * 60 * 1000 : undefined,
      completed: false,
    };
    if (mode === 'exam' && questionIds.length > EXAM_QUESTION_COUNT) {
      session.questionIds = questionIds.slice(0, EXAM_QUESTION_COUNT);
    }
    set({ session, loading: false });
  },

  submitAnswer(displayKeys, confidence) {
    const { session, progress, questionsBySet } = get();
    if (!session || session.completed) return;
    const qid = session.questionIds[session.currentIndex];
    const question = questionsBySet[session.setId]?.find((q) => q.id === qid);
    if (!question) return;
    const map = session.optionMaps[qid];
    const selected = displayKeys.map((dk) => map.find((o) => o.displayKey === dk)!.originalId);
    const correct = checkAnswer(question, selected);
    const attempt = {
      questionId: qid,
      setId: session.setId,
      timestamp: Date.now(),
      selectedAnswers: selected,
      correct,
      confidence: confidence as 1 | 2 | 3 | 4 | 5 | undefined,
      mode: session.mode,
      timeSpentSec: Math.round((Date.now() - session.startedAt) / 1000),
    };
    let srs = { ...progress.srs };
    const quality = confidenceToQuality(confidence ?? 3, correct);
    srs[qid] = updateSrs(srs[qid] ?? defaultSrsEntry(), quality);
    const attempts = [...progress.attempts, attempt];
    const answers = {
      ...session.answers,
      [qid]: { selected, correct, confidence },
    };
    const showNow = session.showExplanations || session.mode === 'study';
    set({
      progress: { ...progress, attempts, srs },
      session: { ...session, answers, showExplanations: showNow || session.mode !== 'exam' },
    });
    persist({ ...progress, attempts, srs });
  },

  flashcardResult(knew) {
    const { session, progress } = get();
    if (!session) return;
    const qid = session.questionIds[session.currentIndex];
    let srs = { ...progress.srs };
    srs[qid] = updateSrs(srs[qid] ?? defaultSrsEntry(), knew ? 4 : 1);
    const attempts = [
      ...progress.attempts,
      {
        questionId: qid,
        setId: session.setId,
        timestamp: Date.now(),
        selectedAnswers: [] as OptionId[],
        correct: knew,
        mode: session.mode,
        timeSpentSec: 0,
      },
    ];
    set({ progress: { ...progress, attempts, srs }, session: { ...session, showExplanations: true } });
    persist({ ...progress, attempts, srs });
  },

  nextQuestion() {
    const { session, progress } = get();
    if (!session) return;
    const next = session.currentIndex + 1;
    if (next >= session.questionIds.length) {
      const correct = Object.values(session.answers).filter((a) => a.correct).length;
      const total = session.questionIds.length;
      const record = {
        id: session.id,
        setId: session.setId,
        mode: session.mode,
        startedAt: session.startedAt,
        finishedAt: Date.now(),
        score: total ? correct / total : 0,
        total,
        passed: total ? correct / total >= 0.68 : false,
        durationSec: Math.round((Date.now() - session.startedAt) / 1000),
      };
      const sessions = [...progress.sessions, record];
      const updated = { ...progress, sessions };
      set({ session: { ...session, completed: true }, progress: updated });
      persist(updated);
      return;
    }
    set({ session: { ...session, currentIndex: next, showExplanations: session.mode === 'study' } });
  },

  prevQuestion() {
    const { session } = get();
    if (!session || session.mode === 'exam') return;
    if (session.currentIndex > 0) {
      set({ session: { ...session, currentIndex: session.currentIndex - 1 } });
    }
  },

  endSession() {
    const { session, progress } = get();
    if (!session) return;
    const correct = Object.values(session.answers).filter((a) => a.correct).length;
    const total = session.questionIds.length;
    const record = {
      id: session.id,
      setId: session.setId,
      mode: session.mode,
      startedAt: session.startedAt,
      finishedAt: Date.now(),
      score: total ? correct / total : 0,
      total,
      passed: total ? correct / total >= 0.68 : false,
      durationSec: Math.round((Date.now() - session.startedAt) / 1000),
    };
    const sessions = [...progress.sessions, record];
    set({ progress: { ...progress, sessions }, session: null });
    persist({ ...progress, sessions });
  },

  importProgress(p) {
    set({ progress: p });
    persist(p);
  },

  getQuestions(setId) {
    return get().questionsBySet[setId] ?? [];
  },
}));
