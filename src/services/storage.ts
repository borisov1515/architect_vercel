import type { UserProgress } from '@/types';

const STORAGE_KEY = 'ia-trainer-progress-v1';

export const defaultProgress = (): UserProgress => ({
  attempts: [],
  bookmarks: [],
  notes: {},
  srs: {},
  streak: { current: 0, lastDate: '' },
  dailyGoal: 10,
  dailyCompleted: {},
  sessions: [],
  darkMode: false,
});

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: UserProgress) {
  const trimmed = {
    ...progress,
    attempts: progress.attempts.slice(-2000),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function exportProgress(progress: UserProgress) {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ia-trainer-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importProgress(file: File, replace: boolean): Promise<UserProgress> {
  const text = await file.text();
  const data = JSON.parse(text) as UserProgress;
  if (replace) return data;
  const current = loadProgress();
  return {
    ...current,
    attempts: [...current.attempts, ...(data.attempts || [])],
    bookmarks: [...new Set([...current.bookmarks, ...(data.bookmarks || [])])],
    notes: { ...current.notes, ...(data.notes || {}) },
    srs: { ...current.srs, ...(data.srs || {}) },
    sessions: [...current.sessions, ...(data.sessions || [])],
  };
}

export function updateStreak(progress: UserProgress, questionsToday: number): UserProgress {
  const today = new Date().toISOString().slice(0, 10);
  const { streak, dailyGoal } = progress;
  if (questionsToday < dailyGoal) return progress;
  if (streak.lastDate === today) return progress;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const current = streak.lastDate === yesterday ? streak.current + 1 : 1;
  return { ...progress, streak: { current, lastDate: today } };
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getDailyIds(
  allIds: string[],
  progress: UserProgress,
  count: number,
  seed: number,
): string[] {
  const key = todayKey();
  if (progress.dailyCompleted[key]?.length) return progress.dailyCompleted[key];
  const shuffled = [...allIds];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((s / 4294967296) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
