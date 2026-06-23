import { useAppStore } from '@/stores/appStore';

const MODE_LABELS: Record<string, string> = {
  sequential: 'Подряд',
  shuffle: 'Shuffle',
  exam: 'Экзамен',
  study: 'Учёба',
  flashcard: 'Flashcard',
  'wrong-only': 'Ошибки',
  srs: 'SRS',
  bookmarks: 'Закладки',
  daily: 'Daily',
};

export default function HistoryPage() {
  const sessions = useAppStore((s) => s.progress.sessions);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">История сессий</h1>
      {sessions.length === 0 && <p className="text-slate-500">Пока нет завершённых сессий</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="py-2 pr-4">Дата</th>
              <th className="py-2 pr-4">Set</th>
              <th className="py-2 pr-4">Режим</th>
              <th className="py-2 pr-4">Score</th>
              <th className="py-2">Время</th>
            </tr>
          </thead>
          <tbody>
            {[...sessions].reverse().map((s) => (
              <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4">{new Date(s.finishedAt || s.startedAt).toLocaleString('ru')}</td>
                <td className="py-3 pr-4">{s.setId}</td>
                <td className="py-3 pr-4">{MODE_LABELS[s.mode] || s.mode}</td>
                <td className="py-3 pr-4">
                  {s.score !== undefined ? (
                    <span className={s.passed ? 'text-green-600 font-semibold' : ''}>
                      {Math.round(s.score * 100)}% ({s.passed ? 'pass' : 'fail'})
                    </span>
                  ) : '—'}
                </td>
                <td className="py-3">{s.durationSec ? `${Math.floor(s.durationSec / 60)} мин` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
