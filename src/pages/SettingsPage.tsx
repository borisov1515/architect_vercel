import { useAppStore } from '@/stores/appStore';
import { exportProgress, importProgress, defaultProgress } from '@/services/storage';

export default function SettingsPage() {
  const progress = useAppStore((s) => s.progress);
  const importP = useAppStore((s) => s.importProgress);

  return (
    <div className="space-y-8 max-w-lg">
      <h1 className="text-2xl font-bold">Настройки</h1>

      <section className="space-y-3">
        <h2 className="font-semibold">Цель дня</h2>
        <p className="text-sm text-slate-500">Вопросов в день для streak: {progress.dailyGoal}</p>
        <input
          type="range"
          min={5}
          max={50}
          value={progress.dailyGoal}
          onChange={(e) => {
            const next = { ...progress, dailyGoal: parseInt(e.target.value, 10) };
            importP(next);
          }}
          className="w-full"
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Прогресс (localStorage)</h2>
        <p className="text-sm text-slate-500">Без облачной БД. Экспортируй JSON для бэкапа.</p>
        <button type="button" onClick={() => exportProgress(progress)} className="w-full py-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
          Экспорт прогресса
        </button>
        <label className="block w-full py-2 border rounded-lg text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
          Импорт прогресса
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const replace = confirm('Заменить текущий прогресс? OK = заменить, Cancel = объединить');
              const data = await importProgress(f, replace);
              importP(data);
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => { if (confirm('Сбросить весь прогресс?')) importP(defaultProgress()); }}
          className="w-full py-2 text-red-600 border border-red-200 rounded-lg"
        >
          Сбросить прогресс
        </button>
      </section>

      <section className="text-sm text-slate-500">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-2">Деплой на Vercel</h2>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Push репозиторий в GitHub</li>
          <li>vercel.com → Import Project</li>
          <li>Root: <code className="bg-slate-100 dark:bg-slate-800 px-1">result</code></li>
          <li>Build: <code className="bg-slate-100 dark:bg-slate-800 px-1">npm run build</code></li>
          <li>Output: <code className="bg-slate-100 dark:bg-slate-800 px-1">dist</code></li>
        </ol>
      </section>
    </div>
  );
}
