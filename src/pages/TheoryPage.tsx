import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Section {
  id: string;
  titleRu: string;
  theorySlug: string;
}

export default function TheoryPage() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch('/data/exam-blueprint.json')
      .then((r) => r.json())
      .then((d) => setSections(d.sections));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Теория</h1>
      <Link to="/theory/00-patterns-cheatsheet" className="block p-5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 font-semibold">
        📋 Шпаргалка паттернов интеграции
      </Link>
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link key={s.id} to={`/theory/${s.theorySlug}`} className="p-5 bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-100 dark:border-slate-800 hover:border-sf-blue transition">
            <h2 className="font-bold text-sf-blue">{s.titleRu}</h2>
            <p className="text-sm text-slate-500 mt-1">Вес на экзамене · практика по секции</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
