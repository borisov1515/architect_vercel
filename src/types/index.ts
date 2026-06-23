export type SectionId =
  | 'fundamentals'
  | 'architecture'
  | 'api-design'
  | 'security'
  | 'data'
  | 'operations';

export type QuizMode =
  | 'sequential'
  | 'shuffle'
  | 'exam'
  | 'study'
  | 'flashcard'
  | 'wrong-only'
  | 'srs'
  | 'daily'
  | 'bookmarks'
  | 'section';

export type OptionId = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuestionOption {
  id: OptionId;
  text: string;
}

export interface QuestionContext {
  type: 'ul' | 'ol';
  items: string[];
}

export interface Explanation {
  summary: string;
  correct: string;
  incorrect: Partial<Record<OptionId, string>>;
  examTip: string;
  relatedTheoryIds: string[];
  status: 'pending' | 'draft' | 'reviewed';
}

export interface Question {
  id: string;
  setId: 1 | 2 | 3 | 4;
  setQuestionNumber: number;
  sectionId: SectionId;
  tags: string[];
  type: 'single' | 'multi';
  paragraphs: string[];
  sub: string;
  context?: QuestionContext;
  diagramNote?: string;
  hasDiagram: boolean;
  options: QuestionOption[];
  correctAnswer: OptionId[];
  explanation: Explanation;
}

export interface QuestionSetFile {
  setId: number;
  count: number;
  questions: Question[];
}

export interface ExamSection {
  id: SectionId;
  title: string;
  titleRu: string;
  weightPercent: number;
  descriptionRu: string;
  theorySlug: string;
}

export interface GlossaryEntry {
  term: string;
  termRu: string;
  definition: string;
  relatedSection: SectionId;
}

export interface QuestionAttempt {
  questionId: string;
  setId: number;
  timestamp: number;
  selectedAnswers: OptionId[];
  correct: boolean;
  confidence?: 1 | 2 | 3 | 4 | 5;
  mode: QuizMode;
  timeSpentSec: number;
}

export interface ExamSessionRecord {
  id: string;
  setId: number;
  mode: QuizMode;
  startedAt: number;
  finishedAt?: number;
  score?: number;
  total: number;
  passed?: boolean;
  durationSec?: number;
}

export interface SrsEntry {
  nextReview: number;
  interval: number;
  ease: number;
}

export interface UserProgress {
  attempts: QuestionAttempt[];
  bookmarks: string[];
  notes: Record<string, string>;
  srs: Record<string, SrsEntry>;
  streak: { current: number; lastDate: string };
  dailyGoal: number;
  dailyCompleted: Record<string, string[]>;
  sessions: ExamSessionRecord[];
  darkMode: boolean;
}

export interface ShuffledOption {
  displayKey: string;
  originalId: OptionId;
  text: string;
}

export interface QuizSessionState {
  id: string;
  setId: number;
  mode: QuizMode;
  sectionId?: SectionId;
  questionIds: string[];
  currentIndex: number;
  optionMaps: Record<string, ShuffledOption[]>;
  answers: Record<string, { selected: OptionId[]; correct?: boolean; confidence?: number }>;
  startedAt: number;
  showExplanations: boolean;
  examEndsAt?: number;
  completed: boolean;
}

export const SET_META: Record<number, { label: string; qualityNote?: string }> = {
  1: { label: 'Set 1' },
  2: { label: 'Set 2' },
  3: { label: 'Set 3' },
  4: { label: 'Set 4', qualityNote: 'Источник с артефактами text layer; Q40 без диаграммы в PDF' },
};

export const PASS_THRESHOLD = 0.68;
export const EXAM_DURATION_MIN = 105;
export const EXAM_QUESTION_COUNT = 65;
export const DAILY_QUIZ_COUNT = 10;
