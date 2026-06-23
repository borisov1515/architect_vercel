import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { QuestionCard, ExplanationPanel } from '@/components/QuestionCard';
import type { QuizMode, SectionId } from '@/types';
import { multiSelectCount } from '@/services/quizEngine';
import { isPassed } from '@/services/scoring';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'fundamentals', label: 'Основы' },
  { id: 'architecture', label: 'Архитектура' },
  { id: 'api-design', label: 'API' },
  { id: 'security', label: 'Безопасность' },
  { id: 'data', label: 'Данные' },
  { id: 'operations', label: 'Эксплуатация' },
];

export default function QuizPage() {
  const { setId: setIdStr, mode: modeStr } = useParams();
  const setId = parseInt(setIdStr || '1', 10);
  const mode = (modeStr || 'sequential') as QuizMode;
  const navigate = useNavigate();

  const session = useAppStore((s) => s.session);
  const loading = useAppStore((s) => s.loading);
  const startSession = useAppStore((s) => s.startSession);
  const submitAnswer = useAppStore((s) => s.submitAnswer);
  const flashcardResult = useAppStore((s) => s.flashcardResult);
  const nextQuestion = useAppStore((s) => s.nextQuestion);
  const prevQuestion = useAppStore((s) => s.prevQuestion);
  const endSession = useAppStore((s) => s.endSession);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const setNote = useAppStore((s) => s.setNote);
  const getQuestions = useAppStore((s) => s.getQuestions);
  const bookmarks = useAppStore((s) => s.progress.bookmarks);
  const notes = useAppStore((s) => s.progress.notes);

  const [selected, setSelected] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [sectionId, setSectionId] = useState<SectionId | null>(null);
  const [sectionPicked, setSectionPicked] = useState(mode !== 'section');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [flashRevealed, setFlashRevealed] = useState(false);

  const startedRef = useRef(false);

  useEffect(() => {
    if (mode === 'section' && !sectionPicked) return;
    if (startedRef.current) return;
    startedRef.current = true;
    startSession(setId, mode === 'section' ? 'sequential' : mode, {
      sectionId: sectionId ?? undefined,
      shuffleQuestions: mode === 'shuffle' || mode === 'exam',
    });
  }, [setId, mode, sectionId, sectionPicked, startSession]);

  useEffect(() => {
    setSelected([]);
    setRevealed(false);
    setConfidence(null);
    setFlashRevealed(false);
  }, [session?.currentIndex]);

  useEffect(() => {
    if (!session?.examEndsAt) return;
    const tick = () => setTimeLeft(Math.max(0, session.examEndsAt! - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session?.examEndsAt]);

  const questions = getQuestions(setId);
  const qid = session?.questionIds[session.currentIndex];
  const question = questions.find((q) => q.id === qid);
  const options = qid && session ? session.optionMaps[qid] : [];
  const answered = qid ? session?.answers[qid] : undefined;
  const isBookmarked = qid ? bookmarks.includes(qid) : false;

  const handleSubmit = useCallback(() => {
    if (!selected.length || confidence !== null) {
      if (confidence === null && mode !== 'exam' && mode !== 'flashcard') return;
    }
    if (mode === 'flashcard') return;
    submitAnswer(selected, confidence ?? undefined);
    setRevealed(true);
  }, [selected, confidence, mode, submitAnswer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement) return;
      if (e.key >= '1' && e.key <= '5' && options.length) {
        const idx = parseInt(e.key, 10) - 1;
        const opt = options[idx];
        if (!opt || revealed) return;
        if (question?.type === 'multi') {
          setSelected((s) => s.includes(opt.displayKey) ? s.filter((k) => k !== opt.displayKey) : [...s, opt.displayKey]);
        } else {
          setSelected([opt.displayKey]);
        }
      }
      if (e.key === 'Enter' && !revealed && selected.length) handleSubmit();
      if (e.key === 'Enter' && revealed) nextQuestion();
      if (e.key === 'b' && qid) toggleBookmark(qid);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options, revealed, selected, handleSubmit, nextQuestion, qid, toggleBookmark, question?.type]);

  if (mode === 'section' && !sectionPicked) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Set {setId} — выбор секции</h1>
        <div className="grid sm:grid-cols-2 gap-3">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => { setSectionId(s.id); setSectionPicked(true); }}
              className="p-4 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sf-blue bg-white dark:bg-slate-900"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading || !session) return <p className="text-slate-500">Загрузка…</p>;

  if (session.completed) {
    const correct = Object.values(session.answers).filter((a) => a.correct).length;
    const total = session.questionIds.length;
    const passed = isPassed(correct, total);
    return (
      <div className="text-center space-y-6 py-12">
        <h1 className="text-3xl font-bold">{passed ? '✅ Сдано' : 'Результат'}</h1>
        <p className="text-5xl font-bold text-sf-blue">{correct}/{total}</p>
        <p className="text-slate-500">{Math.round((correct / total) * 100)}% · порог 68%</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button type="button" onClick={() => { endSession(); navigate('/sets'); }} className="px-6 py-2 bg-sf-blue text-white rounded-lg">К сетам</button>
          <Link to="/stats" className="px-6 py-2 border rounded-lg">Статистика</Link>
        </div>
      </div>
    );
  }

  if (!question) return <p>Вопрос не найден</p>;

  const need = multiSelectCount(question);
  const showExp = revealed || session.showExplanations || (mode === 'study' && answered);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
        <span className="font-medium capitalize">{mode} · Set {setId}</span>
        {timeLeft !== null && (
          <span className={`font-mono font-bold ${timeLeft < 600000 ? 'text-red-600' : ''}`}>
            ⏱ {Math.floor(timeLeft / 60000)}:{String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')}
          </span>
        )}
        <span className="text-slate-500">{session.currentIndex + 1} / {session.questionIds.length}</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
        <div className="bg-sf-blue h-2 rounded-full transition-all" style={{ width: `${((session.currentIndex + 1) / session.questionIds.length) * 100}%` }} />
      </div>

      <article className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow border border-slate-100 dark:border-slate-800">
        <div className="flex justify-end gap-2 mb-2">
          <button type="button" onClick={() => toggleBookmark(question.id)} className="text-xl" title="Закладка">{isBookmarked ? '★' : '☆'}</button>
          <Link to={`/theory/${question.sectionId === 'api-design' ? '03-api-design' : question.sectionId === 'architecture' ? '02-architecture' : question.sectionId === 'security' ? '04-security' : question.sectionId === 'data' ? '05-data' : question.sectionId === 'operations' ? '06-operations' : '01-fundamentals'}`} className="text-xs text-sf-blue underline">Теория</Link>
        </div>

        <QuestionCard question={question} index={session.currentIndex} total={session.questionIds.length} />

        {mode === 'flashcard' ? (
          <div className="mt-6 space-y-4">
            {!flashRevealed ? (
              <button type="button" onClick={() => setFlashRevealed(true)} className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-medium">Показать ответ</button>
            ) : (
              <>
                <ExplanationPanel question={question} />
                <div className="flex gap-3">
                  <button type="button" onClick={() => { flashcardResult(true); nextQuestion(); }} className="flex-1 py-3 bg-green-600 text-white rounded-lg">Знал ✓</button>
                  <button type="button" onClick={() => { flashcardResult(false); nextQuestion(); }} className="flex-1 py-3 bg-red-600 text-white rounded-lg">Не знал ✗</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <ul className="mt-6 space-y-2">
              {options.map((opt) => {
                const isSel = selected.includes(opt.displayKey);
                const wasSel = answered?.selected.includes(opt.originalId);
                let cls = 'border-slate-200 dark:border-slate-700 hover:border-sf-blue';
                if (showExp && wasSel) cls = answered?.correct ? 'border-green-500 bg-green-50 dark:bg-green-950/30' : 'border-red-500 bg-red-50 dark:bg-red-950/30';
                else if (isSel) cls = 'border-sf-blue bg-blue-50 dark:bg-slate-800';
                return (
                  <li key={opt.displayKey}>
                    <button
                      type="button"
                      disabled={!!showExp}
                      onClick={() => {
                        if (question.type === 'multi') {
                          setSelected((s) => s.includes(opt.displayKey) ? s.filter((k) => k !== opt.displayKey) : [...s, opt.displayKey]);
                        } else setSelected([opt.displayKey]);
                      }}
                      className={`w-full text-left p-4 rounded-lg border-2 flex gap-3 transition ${cls}`}
                    >
                      <span className="font-bold text-sf-blue w-6">{opt.displayKey}.</span>
                      <span className="text-sm">{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {question.type === 'multi' && <p className="text-xs text-slate-500 mt-2">Выберите {need} ответа</p>}

            {!showExp && (
              <div className="mt-6 space-y-4">
                {mode !== 'exam' && (
                  <div>
                    <p className="text-sm mb-2">Уверенность (1–5):</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => setConfidence(n)} className={`w-10 h-10 rounded-full border ${confidence === n ? 'bg-sf-blue text-white border-sf-blue' : 'border-slate-300'}`}>{n}</button>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  disabled={selected.length < (question.type === 'multi' ? need : 1) || (mode !== 'exam' && confidence === null)}
                  onClick={handleSubmit}
                  className="w-full py-3 bg-sf-blue text-white rounded-lg font-semibold disabled:opacity-40"
                >
                  Ответить
                </button>
              </div>
            )}

            {showExp && (
              <>
                <ExplanationPanel question={question} />
                <textarea
                  className="w-full mt-4 p-3 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Моя заметка…"
                  value={notes[question.id] || ''}
                  onChange={(e) => setNote(question.id, e.target.value)}
                  rows={2}
                />
                <div className="flex gap-3 mt-4">
                  {mode !== 'exam' && (
                    <button type="button" onClick={prevQuestion} className="px-4 py-2 border rounded-lg">← Назад</button>
                  )}
                  <button
                    type="button"
                    onClick={() => nextQuestion()}
                    className="flex-1 py-3 bg-sf-blue text-white rounded-lg font-semibold"
                  >
                    {session.currentIndex + 1 >= session.questionIds.length ? 'Завершить' : 'Далее →'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </article>

      <p className="text-xs text-slate-400 text-center">Клавиши: 1–3 выбор · Enter ответ/далее · B закладка</p>
    </div>
  );
}
