import { Link } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';

export default function HomePage() {
  const streak = useAppStore((s) => s.progress.streak);
  const dailyGoal = useAppStore((s) => s.progress.dailyGoal);
  const attempts = useAppStore((s) => s.progress.attempts);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = attempts.filter((a) => new Date(a.timestamp).toISOString().slice(0, 10) === today).length;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-sf-blue mb-2">Подготовка к Integration Architect</h1>
        <p className="text-slate-600 dark:text-slate-400">4 отдельных practice-сета · теория · 30 режимов обучения · без облачной БД</p>
      </section>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow border border-slate-100 dark:border-slate-800">
          <p className="text-2xl font-bold">{streak.current}</p>
          <p className="text-sm text-slate-500">Streak (дней)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow border border-slate-100 dark:border-slate-800">
          <p className="text-2xl font-bold">{todayCount}/{dailyGoal}</p>
          <p className="text-sm text-slate-500">Сегодня (цель)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow border border-slate-100 dark:border-slate-800">
          <p className="text-2xl font-bold">{attempts.length}</p>
          <p className="text-sm text-slate-500">Всего попыток</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/sets" className="block p-6 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md border-l-4 border-sf-blue transition">
          <h2 className="font-bold text-lg mb-1">Выбрать сет</h2>
          <p className="text-sm text-slate-500">Set 1–4, отдельные банки по 65 вопросов</p>
        </Link>
        <Link to="/theory/00-patterns-cheatsheet" className="block p-6 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md border-l-4 border-amber-400 transition">
          <h2 className="font-bold text-lg mb-1">Шпаргалка паттернов</h2>
          <p className="text-sm text-slate-500">Когда какой integration pattern</p>
        </Link>
        <Link to="/quiz/1/daily" className="block p-6 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md border-l-4 border-green-500 transition">
          <h2 className="font-bold text-lg mb-1">Daily Quiz</h2>
          <p className="text-sm text-slate-500">10 случайных вопросов (Set 1)</p>
        </Link>
        <Link to="/stats" className="block p-6 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md border-l-4 border-purple-500 transition">
          <h2 className="font-bold text-lg mb-1">Слабые темы</h2>
          <p className="text-sm text-slate-500">Статистика по секциям blueprint</p>
        </Link>
      </div>

      <p className="text-xs text-slate-400">Деплой: Vercel · данные в localStorage · объяснения заполняются по ходу</p>
    </div>
  );
}
