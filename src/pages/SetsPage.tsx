import { Link } from 'react-router-dom';
import { SET_META } from '@/types';

const MODES = [
  { mode: 'sequential', label: 'Подряд', desc: 'Вопросы 1→65' },
  { mode: 'shuffle', label: 'Вперемешку', desc: 'Случайный порядок' },
  { mode: 'exam', label: 'Экзамен', desc: '65 вопросов, 105 мин' },
  { mode: 'study', label: 'Учёба', desc: 'Сразу с объяснением' },
  { mode: 'flashcard', label: 'Flashcard', desc: 'Знал / не знал' },
  { mode: 'wrong-only', label: 'Только ошибки', desc: 'Повтор слабых' },
  { mode: 'srs', label: 'SRS', desc: 'Интервальное повторение' },
  { mode: 'bookmarks', label: 'Закладки', desc: 'Отмеченные вопросы' },
  { mode: 'daily', label: 'Daily', desc: '10 вопросов в день' },
] as const;

export default function SetsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Выбор сета и режима</h1>
      <p className="text-slate-600 dark:text-slate-400">Сеты не смешиваются — каждый банк независим.</p>

      {[1, 2, 3, 4].map((setId) => {
        const meta = SET_META[setId];
        return (
          <section key={setId} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-sf-blue mb-1">{meta.label}</h2>
            {meta.qualityNote && <p className="text-xs text-amber-600 dark:text-amber-400 mb-4">⚠ {meta.qualityNote}</p>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {MODES.map(({ mode, label, desc }) => (
                <Link
                  key={mode}
                  to={`/quiz/${setId}/${mode}`}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sf-blue hover:bg-blue-50 dark:hover:bg-slate-800 transition text-sm"
                >
                  <span className="font-semibold block">{label}</span>
                  <span className="text-slate-500 text-xs">{desc}</span>
                </Link>
              ))}
              <Link
                to={`/quiz/${setId}/section`}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sf-blue hover:bg-blue-50 dark:hover:bg-slate-800 transition text-sm"
              >
                <span className="font-semibold block">По секции</span>
                <span className="text-slate-500 text-xs">Выбор темы blueprint</span>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
