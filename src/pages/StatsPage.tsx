import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { aggregateBySection, wrongQuestionIds, lowConfidenceIds } from '@/services/scoring';
import type { SectionId } from '@/types';

const LABELS: Record<SectionId, string> = {
  fundamentals: 'Основы',
  architecture: 'Архитектура',
  'api-design': 'API',
  security: 'Безопасность',
  data: 'Данные',
  operations: 'Эксплуатация',
};

export default function StatsPage() {
  const attempts = useAppStore((s) => s.progress.attempts);
  const questionsBySet = useAppStore((s) => s.questionsBySet);
  const [sections, setSections] = useState<{ id: SectionId; weightPercent: number }[]>([]);

  useEffect(() => {
    fetch('/data/exam-blueprint.json').then((r) => r.json()).then((d) => setSections(d.sections));
    for (let i = 1; i <= 4; i++) useAppStore.getState().loadSet(i);
  }, []);

  const sectionMap = useMemo(() => {
    const m: Record<string, SectionId> = {};
    for (const qs of Object.values(questionsBySet)) {
      for (const q of qs) m[q.id] = q.sectionId;
    }
    return m;
  }, [questionsBySet]);

  const stats = aggregateBySection(attempts, sectionMap);
  const weak = Object.entries(stats)
    .filter(([, s]) => s.total >= 3)
    .map(([id, s]) => ({ id: id as SectionId, pct: s.total ? s.correct / s.total : 0 }))
    .sort((a, b) => a.pct - b.pct);

  const wrong = wrongQuestionIds(attempts).length;
  const lowConf = lowConfidenceIds(attempts).length;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Статистика</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border">
          <p className="text-2xl font-bold text-red-600">{wrong}</p>
          <p className="text-sm text-slate-500">Вопросов с ошибками</p>
          <Link to="/sets" className="text-sm text-sf-blue">Режим «Только ошибки» →</Link>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border">
          <p className="text-2xl font-bold text-amber-600">{lowConf}</p>
          <p className="text-sm text-slate-500">Верно, но низкая уверенность</p>
        </div>
      </div>

      <section>
        <h2 className="font-bold mb-4">Слабые темы</h2>
        <div className="space-y-3">
          {weak.slice(0, 3).map((w) => (
            <div key={w.id} className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium">{LABELS[w.id]}</span>
              <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-3">
                <div className={`h-3 rounded-full ${w.pct < 0.7 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${w.pct * 100}%` }} />
              </div>
              <span className="text-sm w-12">{Math.round(w.pct * 100)}%</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-4">По секциям blueprint</h2>
        <div className="space-y-4">
          {sections.map((sec) => {
            const s = stats[sec.id];
            const pct = s?.total ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={sec.id} className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{LABELS[sec.id]}</span>
                  <span className="text-sm text-slate-500">вес {sec.weightPercent}%</span>
                </div>
                <div className="bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-sf-blue h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">{s?.correct ?? 0}/{s?.total ?? 0} · {pct}%</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
